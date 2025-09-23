<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <div class="login-logo">
          <img src="/images/company-logo-login.png" alt="易联捷" class="logo-img">
        </div>
        <h2>易联捷产品说明文档</h2>
        <p>请登录以查看产品文档</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">账号</label>
          <input
            id="username"
            v-model="loginForm.username"
            type="text"
            placeholder="请输入账号"
            required
            autocomplete="username"
          >
        </div>
        
        <div class="form-group">
          <label for="password">密码</label>
          <input
            id="password"
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            required
            autocomplete="current-password"
          >
        </div>
        
        <div class="form-options">
          <label class="checkbox-label">
            <input
              v-model="loginForm.rememberMe"
              type="checkbox"
            >
            <span class="checkmark"></span>
            记住密码
          </label>
        </div>
        
        <button type="submit" class="login-btn" :disabled="isLoading">
          <span v-if="isLoading">登录中...</span>
          <span v-else>登录</span>
        </button>
        
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </form>
      

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getAccounts } from '../utils/auth.js'

const emit = defineEmits(['login-success'])

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: '',
  rememberMe: false
})

// 状态管理
const isLoading = ref(false)
const errorMessage = ref('')

// 账号列表
const accounts = ref([])

// 本地存储键名
const STORAGE_KEYS = {
  ACCOUNTS: 'product_docs_accounts',
  REMEMBERED_USER: 'product_docs_remembered_user',
  LOGIN_STATUS: 'product_docs_login_status'
}

// 初始化
onMounted(async () => {
  await loadAccounts()
  loadRememberedUser()
})

// 加载账号列表（支持云端同步）
const loadAccounts = async () => {
  try {
    isLoading.value = true
    accounts.value = await getAccounts()
  } catch (error) {
    console.error('加载账号失败:', error)
    errorMessage.value = '加载账号数据失败，请刷新页面重试'
  } finally {
    isLoading.value = false
  }
}

// 加载记住的用户信息
const loadRememberedUser = () => {
  const remembered = localStorage.getItem(STORAGE_KEYS.REMEMBERED_USER)
  if (remembered) {
    const user = JSON.parse(remembered)
    loginForm.username = user.username
    loginForm.password = user.password
    loginForm.rememberMe = true
  }
}

// 保存账号列表
const saveAccounts = () => {
  localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts.value))
}

// 处理登录
const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''
  
  // 模拟登录延迟
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // 验证账号密码
  const user = accounts.value.find(
    account => account.username === loginForm.username && account.password === loginForm.password
  )
  
  if (user) {
    // 登录成功
    if (loginForm.rememberMe) {
      localStorage.setItem(STORAGE_KEYS.REMEMBERED_USER, JSON.stringify({
        username: loginForm.username,
        password: loginForm.password
      }))
    } else {
      localStorage.removeItem(STORAGE_KEYS.REMEMBERED_USER)
    }
    
    // 设置登录状态
    localStorage.setItem(STORAGE_KEYS.LOGIN_STATUS, JSON.stringify({
      isLoggedIn: true,
      username: loginForm.username,
      loginTime: Date.now()
    }))
    
    emit('login-success', user)
  } else {
    errorMessage.value = '账号或密码错误'
  }
  
  isLoading.value = false
}


</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-box {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 40px;
  width: 100%;
  max-width: 500px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-logo {
  max-width: 200px;
  width: auto;
  height: auto;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(15px);
  border: 3px solid rgba(255, 255, 255, 0.4);
  padding: 20px;
}

.logo-img {
  max-width: 160px;
  max-height: 80px;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));
}

.login-header h2 {
  color: #333;
  margin-bottom: 8px;
  font-size: 24px;
}

.login-header p {
  color: #666;
  font-size: 14px;
}

.login-form {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
}

.form-options {
  margin-bottom: 25px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #666;
}

.checkbox-label input[type="checkbox"] {
  margin-right: 8px;
}

.login-btn {
  width: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}


</style>