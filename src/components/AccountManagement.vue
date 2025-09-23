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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const emit = defineEmits(['close'])

// 状态管理
const showPasswords = ref([])

// 新账号表单
const newAccount = reactive({
  username: '',
  password: ''
})

// 账号列表
const accounts = ref([])

// 本地存储键名
const STORAGE_KEYS = {
  ACCOUNTS: 'product_docs_accounts'
}

// 初始化
onMounted(() => {
  loadAccounts()
})

// 加载账号列表
const loadAccounts = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.ACCOUNTS)
  if (stored) {
    accounts.value = JSON.parse(stored)
    showPasswords.value = new Array(accounts.value.length).fill(false)
  }
}

// 保存账号列表
const saveAccounts = () => {
  localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts.value))
  showPasswords.value = new Array(accounts.value.length).fill(false)
}

// 添加账号
const addAccount = () => {
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
  
  saveAccounts()
  
  // 清空表单
  newAccount.username = ''
  newAccount.password = ''
  
  alert('账号添加成功')
}

// 删除账号
const deleteAccount = (index) => {
  if (confirm('确定要删除这个账号吗？')) {
    accounts.value.splice(index, 1)
    saveAccounts()
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
const clearAllAccounts = () => {
  if (confirm('确定要清空所有账号吗？此操作不可恢复！')) {
    accounts.value = []
    saveAccounts()
    alert('所有账号已清空')
  }
}

// 处理遮罩层点击
const handleOverlayClick = () => {
  emit('close')
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
</style>