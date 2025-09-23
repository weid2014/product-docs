<template>
  <div class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>账号管理</h2>
        <button @click="$emit('close')" class="close-btn">×</button>
      </div>
      
      <div class="modal-body">
        <div class="add-account">
          <h3>添加新账号</h3>
          <div class="form-row">
            <input
              v-model="newAccount.username"
              type="text"
              placeholder="账号"
              class="admin-input"
            >
            <input
              v-model="newAccount.password"
              type="password"
              placeholder="密码"
              class="admin-input"
            >
            <button @click="addAccount" class="add-btn">添加</button>
          </div>
        </div>
        
        <div class="accounts-list">
          <h3>现有账号 ({{ accounts.length }}个)</h3>
          <div v-if="accounts.length === 0" class="no-accounts">
            暂无账号，请添加账号
          </div>
          <div v-else class="account-item" v-for="(account, index) in accounts" :key="index">
            <span class="account-info">
              <strong>{{ account.username }}</strong>
              <span class="password-display">{{ showPasswords[index] ? account.password : '••••••••' }}</span>
            </span>
            <div class="account-actions">
              <button @click="togglePasswordVisibility(index)" class="toggle-btn">
                {{ showPasswords[index] ? '隐藏' : '显示' }}
              </button>
              <button @click="deleteAccount(index)" class="delete-btn">删除</button>
            </div>
          </div>
        </div>
        
        <div class="admin-actions">
          <button @click="exportAccounts" class="export-btn">导出账号</button>
          <button @click="clearAllAccounts" class="clear-btn">清空所有账号</button>
        </div>

        <!-- 云端同步状态 -->
        <div class="cloud-sync-section">
          <h3>☁️ 自动云端同步</h3>
          <div v-if="!cloudSync.isConfigured()" class="sync-setup">
            <p class="sync-description">
              配置云端同步后，账号数据可以在不同浏览器间自动同步。
              <br>使用GitHub Gist作为免费存储服务。
            </p>
            
            <div class="setup-steps">
              <div class="step">
                <strong>步骤1:</strong> 
                <a href="https://github.com/settings/tokens" target="_blank" class="link">
                  创建GitHub Personal Access Token
                </a>
                <br>
                <small>权限选择: gist (创建和编辑gist)</small>
              </div>
              
              <div class="step">
                <strong>步骤2:</strong> 输入访问令牌
                <div class="form-row">
                  <input 
                    v-model="setupForm.token" 
                    type="password" 
                    placeholder="粘贴GitHub访问令牌"
                    class="admin-input"
                  >
                  <button @click="setupCloudSync" class="add-btn" :disabled="!setupForm.token">
                    配置同步
                  </button>
                </div>
              </div>

              <div class="step">
                <strong>或者连接现有数据:</strong>
                <div class="form-row">
                  <input 
                    v-model="setupForm.gistId" 
                    type="text" 
                    placeholder="输入Gist ID"
                    class="admin-input"
                  >
                  <button @click="connectToExistingGist" class="toggle-btn" :disabled="!setupForm.gistId">
                    连接
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="sync-configured">
            <div class="sync-status">
              <span class="status-indicator">✅</span>
              <span>云端同步已配置</span>
              <small>Gist ID: {{ cloudSync.getConfig().gistId?.substring(0, 8) }}...</small>
            </div>
            
            <div class="sync-actions">
              <button @click="uploadToCloud" class="sync-btn" :disabled="syncLoading">
                <span v-if="syncLoading">上传中...</span>
                <span v-else>📤 上传到云端</span>
              </button>
              
              <button @click="downloadFromCloud" class="sync-btn" :disabled="syncLoading">
                <span v-if="syncLoading">下载中...</span>
                <span v-else>📥 从云端下载</span>
              </button>
              
              <button @click="clearCloudConfig" class="clear-btn">
                清除配置
              </button>
            </div>
            
            <div v-if="lastSyncTime" class="last-sync">
              最后同步: {{ formatTime(lastSyncTime) }}
            </div>
          </div>

          <div v-if="syncMessage" class="sync-message" :class="syncMessage.type">
            {{ syncMessage.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { cloudSync } from '../utils/cloudSync.js'
import { getAccounts, saveAccounts } from '../utils/auth.js'

const emit = defineEmits(['close'])

// 状态管理
const showPasswords = ref([])

// 新账号表单
const newAccount = reactive({
  username: '',
  password: ''
})

// 云端同步设置表单
const setupForm = reactive({
  token: '',
  gistId: ''
})

// 云端同步状态
const syncLoading = ref(false)
const lastSyncTime = ref(null)
const syncMessage = ref(null)

// 账号列表
const accounts = ref([])

// 本地存储键名
const STORAGE_KEYS = {
  ACCOUNTS: 'product_docs_accounts'
}

// 初始化
onMounted(async () => {
  await loadAccounts()
})

// 加载账号列表（支持云端同步）
const loadAccounts = async () => {
  try {
    accounts.value = await getAccounts()
    showPasswords.value = new Array(accounts.value.length).fill(false)
  } catch (error) {
    console.error('加载账号失败:', error)
    showSyncMessage('加载账号数据失败', 'error')
  }
}

// 保存账号列表（自动同步到云端）
const saveAccountsLocal = async () => {
  try {
    await saveAccounts(accounts.value)
    showPasswords.value = new Array(accounts.value.length).fill(false)
    showSyncMessage('账号数据已自动同步到云端', 'success')
  } catch (error) {
    console.error('保存账号失败:', error)
    showSyncMessage('保存失败，请重试', 'error')
  }
}

// 添加账号
const addAccount = async () => {
  if (!newAccount.username || !newAccount.password) {
    alert('请输入账号和密码')
    return
  }
  
  // 检查账号是否已存在
  if (accounts.value.some(account => account.username === newAccount.username)) {
    alert('账号已存在')
    return
  }
  
  accounts.value.push({
    username: newAccount.username,
    password: newAccount.password
  })
  
  await saveAccountsLocal()
  
  // 清空表单
  newAccount.username = ''
  newAccount.password = ''
  
  showSyncMessage('账号添加成功并已同步到云端', 'success')
}

// 删除账号
const deleteAccount = async (index) => {
  if (confirm('确定要删除这个账号吗？')) {
    accounts.value.splice(index, 1)
    await saveAccountsLocal()
  }
}

// 切换密码显示
const togglePasswordVisibility = (index) => {
  showPasswords.value[index] = !showPasswords.value[index]
}

// 导出账号
const exportAccounts = () => {
  const dataStr = JSON.stringify(accounts.value, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'accounts.json'
  link.click()
  URL.revokeObjectURL(url)
}

// 清空所有账号
const clearAllAccounts = async () => {
  if (confirm('确定要清空所有账号吗？此操作不可恢复！')) {
    accounts.value = []
    await saveAccountsLocal()
    showSyncMessage('所有账号已清空并同步到云端', 'info')
  }
}

// 处理遮罩层点击
const handleOverlayClick = () => {
  emit('close')
}

// 显示同步消息
const showSyncMessage = (text, type = 'info') => {
  syncMessage.value = { text, type }
  setTimeout(() => {
    syncMessage.value = null
  }, 3000)
}

// 格式化时间
const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleString('zh-CN')
}

// 配置云端同步
const setupCloudSync = async () => {
  if (!setupForm.token) {
    alert('请输入GitHub访问令牌')
    return
  }

  syncLoading.value = true
  try {
    cloudSync.setAccessToken(setupForm.token)
    const result = await cloudSync.uploadAccounts(accounts.value)
    
    if (result.success) {
      showSyncMessage('云端同步配置成功！', 'success')
      lastSyncTime.value = Date.now()
      setupForm.token = ''
    }
  } catch (error) {
    showSyncMessage(`配置失败: ${error.message}`, 'error')
  } finally {
    syncLoading.value = false
  }
}

// 连接到现有Gist
const connectToExistingGist = async () => {
  if (!setupForm.gistId) {
    alert('请输入Gist ID')
    return
  }

  syncLoading.value = true
  try {
    const result = await cloudSync.connectToGist(setupForm.gistId)
    
    if (result.success) {
      // 询问是否要合并账号数据
      const shouldMerge = confirm(
        `找到云端数据 (${result.accounts.length}个账号)，是否要合并到本地账号？
` +
        `点击"确定"合并，点击"取消"替换本地数据`
      )
      
      if (shouldMerge) {
        // 合并账号，避免重复
        const existingUsernames = accounts.value.map(acc => acc.username)
        const newAccounts = result.accounts.filter(acc => !existingUsernames.includes(acc.username))
        accounts.value.push(...newAccounts)
      } else {
        // 替换本地数据
        accounts.value = result.accounts
      }
      
      saveAccounts()
      showSyncMessage('成功连接到云端数据！', 'success')
      lastSyncTime.value = Date.now()
      setupForm.gistId = ''
    }
  } catch (error) {
    showSyncMessage(`连接失败: ${error.message}`, 'error')
  } finally {
    syncLoading.value = false
  }
}

// 上传到云端
const uploadToCloud = async () => {
  syncLoading.value = true
  try {
    const result = await cloudSync.uploadAccounts(accounts.value)
    
    if (result.success) {
      showSyncMessage('账号数据已上传到云端', 'success')
      lastSyncTime.value = Date.now()
    }
  } catch (error) {
    showSyncMessage(`上传失败: ${error.message}`, 'error')
  } finally {
    syncLoading.value = false
  }
}

// 从云端下载并合并
const downloadFromCloud = async () => {
  if (!confirm('从云端下载数据并与本地账号合并，确定继续吗？')) {
    return
  }

  syncLoading.value = true
  try {
    const result = await cloudSync.downloadAccounts()
    
    if (result.success && result.accounts) {
      // 智能合并：保留本地和云端的所有账号，避免重复
      const currentAccounts = [...accounts.value]
      const cloudAccounts = result.accounts
      const currentUsernames = currentAccounts.map(acc => acc.username)
      
      // 添加云端独有的账号
      cloudAccounts.forEach(cloudAcc => {
        if (!currentUsernames.includes(cloudAcc.username)) {
          currentAccounts.push(cloudAcc)
        } else {
          // 如果用户名相同，更新密码（云端数据优先）
          const localIndex = currentAccounts.findIndex(acc => acc.username === cloudAcc.username)
          if (localIndex !== -1) {
            currentAccounts[localIndex] = cloudAcc
          }
        }
      })
      
      accounts.value = currentAccounts
      await saveAccountsLocal()
      showSyncMessage(`已从云端合并 ${cloudAccounts.length} 个账号`, 'success')
      lastSyncTime.value = Date.now()
    }
  } catch (error) {
    showSyncMessage(`下载失败: ${error.message}`, 'error')
  } finally {
    syncLoading.value = false
  }
}

// 手动同步
const manualSync = async () => {
  syncLoading.value = true
  try {
    await cloudSync.autoUpload(accounts.value)
    showSyncMessage('手动同步完成', 'success')
    lastSyncTime.value = Date.now()
  } catch (error) {
    showSyncMessage(`同步失败: ${error.message}`, 'error')
  } finally {
    syncLoading.value = false
  }
}

// 清除云端配置
const clearCloudConfig = () => {
  if (confirm('确定要清除云端同步配置吗？')) {
    cloudSync.clearConfig()
    showSyncMessage('云端同步配置已清除', 'info')
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #333;
}

.modal-body {
  padding: 20px;
}

.add-account h3,
.accounts-list h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
  font-size: 16px;
}

.form-row {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.admin-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.add-btn, .toggle-btn, .delete-btn, .export-btn, .clear-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s ease;
}

.add-btn {
  background: #28a745;
  color: white;
}

.toggle-btn {
  background: #17a2b8;
  color: white;
}

.delete-btn {
  background: #dc3545;
  color: white;
}

.export-btn {
  background: #6c757d;
  color: white;
}

.clear-btn {
  background: #dc3545;
  color: white;
}

.accounts-list {
  margin-bottom: 20px;
}

.no-accounts {
  color: #999;
  font-style: italic;
  text-align: center;
  padding: 20px;
}

.account-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 8px;
}

.account-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.password-display {
  font-size: 12px;
  color: #666;
  font-family: monospace;
}

.account-actions {
  display: flex;
  gap: 8px;
}

.admin-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

/* 云端同步样式 */
.cloud-sync-section {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px solid #e3f2fd;
}

.cloud-sync-section h3 {
  color: #1976d2;
  margin-bottom: 15px;
}

.sync-description {
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
  line-height: 1.5;
}

.setup-steps {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
}

.step {
  margin-bottom: 15px;
  padding: 10px 0;
}

.step:last-child {
  margin-bottom: 0;
}

.step strong {
  color: #333;
}

.step small {
  color: #666;
  font-size: 12px;
}

.link {
  color: #2196f3;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.sync-configured {
  background: #e8f5e8;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #4caf50;
}

.sync-status {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.status-indicator {
  font-size: 16px;
}

.sync-status small {
  color: #666;
  font-size: 12px;
  margin-left: auto;
}

.sync-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.sync-btn {
  background: #2196f3;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s ease;
}

.sync-btn:hover:not(:disabled) {
  background: #1976d2;
}

.sync-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.last-sync {
  font-size: 12px;
  color: #666;
  text-align: center;
}

.sync-message {
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
}

.sync-message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.sync-message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.sync-message.info {
  background: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}
</style>