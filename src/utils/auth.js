// 认证工具函数

const STORAGE_KEYS = {
  ACCOUNTS: 'product_docs_accounts',
  REMEMBERED_USER: 'product_docs_remembered_user',
  LOGIN_STATUS: 'product_docs_login_status'
}

// 检查是否已登录
export const isLoggedIn = () => {
  const loginStatus = localStorage.getItem(STORAGE_KEYS.LOGIN_STATUS)
  if (!loginStatus) return false
  
  try {
    const status = JSON.parse(loginStatus)
    // 检查登录状态是否有效（24小时内）
    const now = Date.now()
    const loginTime = status.loginTime || 0
    const isValid = status.isLoggedIn && (now - loginTime < 24 * 60 * 60 * 1000)
    
    if (!isValid) {
      logout()
      return false
    }
    
    return true
  } catch (error) {
    console.error('解析登录状态失败:', error)
    return false
  }
}

// 获取当前登录用户
export const getCurrentUser = () => {
  const loginStatus = localStorage.getItem(STORAGE_KEYS.LOGIN_STATUS)
  if (!loginStatus) return null
  
  try {
    const status = JSON.parse(loginStatus)
    return status.username || null
  } catch (error) {
    console.error('获取当前用户失败:', error)
    return null
  }
}

// 登出
export const logout = () => {
  localStorage.removeItem(STORAGE_KEYS.LOGIN_STATUS)
  // 可选择是否保留记住的用户信息
  // localStorage.removeItem(STORAGE_KEYS.REMEMBERED_USER)
}

// 延长登录时间
export const extendLogin = () => {
  const loginStatus = localStorage.getItem(STORAGE_KEYS.LOGIN_STATUS)
  if (!loginStatus) return false
  
  try {
    const status = JSON.parse(loginStatus)
    if (status.isLoggedIn) {
      status.loginTime = Date.now()
      localStorage.setItem(STORAGE_KEYS.LOGIN_STATUS, JSON.stringify(status))
      return true
    }
  } catch (error) {
    console.error('延长登录时间失败:', error)
  }
  
  return false
}