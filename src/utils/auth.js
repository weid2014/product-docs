// 认证工具函数
import { cloudSync } from './cloudSync.js'

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

// 获取账号列表（支持云端同步）
export const getAccounts = async () => {
  // 先获取本地数据
  const localStored = localStorage.getItem(STORAGE_KEYS.ACCOUNTS)
  let localAccounts = []
  
  if (localStored) {
    try {
      localAccounts = JSON.parse(localStored)
    } catch (error) {
      console.error('解析本地账号数据失败:', error)
      localAccounts = []
    }
  }
  
  // 如果本地没有数据，使用默认账号
  if (localAccounts.length === 0) {
    localAccounts = [
      { username: 'admin', password: 'Jinghe233' },
      { username: 'Jinghe', password: 'Jinghe123' },
      { username: 'lineae', password: 'ylj2025' }
    ]
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(localAccounts))
  }
  
  try {
    // 尝试从云端获取数据进行合并
    const cloudResult = await cloudSync.autoInitialize()
    
    if (cloudResult.success && cloudResult.accounts && Array.isArray(cloudResult.accounts)) {
      // 智能合并：保留所有不重复的账号
      const mergedAccounts = [...localAccounts]
      const localUsernames = localAccounts.map(acc => acc.username)
      
      // 添加云端独有的账号
      cloudResult.accounts.forEach(cloudAcc => {
        if (!localUsernames.includes(cloudAcc.username)) {
          mergedAccounts.push(cloudAcc)
        } else {
          // 如果用户名相同，更新密码（云端数据优先）
          const localIndex = mergedAccounts.findIndex(acc => acc.username === cloudAcc.username)
          if (localIndex !== -1) {
            mergedAccounts[localIndex] = cloudAcc
          }
        }
      })
      
      // 只有在合并后数据有变化时才保存和上传
      if (JSON.stringify(mergedAccounts) !== JSON.stringify(localAccounts)) {
        localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(mergedAccounts))
        
        // 如果合并后的数据比云端数据多，上传到云端
        if (mergedAccounts.length > cloudResult.accounts.length) {
          cloudSync.autoUpload(mergedAccounts)
        }
      }
      
      return mergedAccounts
    }
  } catch (error) {
    console.warn('云端同步失败，使用本地数据:', error)
  }
  
  // 如果云端同步失败或没有云端数据，返回本地数据
  return localAccounts
}

// 保存账号列表（自动同步到云端）
export const saveAccounts = async (accounts) => {
  localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts))
  
  // 自动上传到云端
  try {
    await cloudSync.autoUpload(accounts)
  } catch (error) {
    console.warn('自动上传到云端失败:', error)
  }
}