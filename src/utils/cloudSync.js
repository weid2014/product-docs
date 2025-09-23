// 云端同步工具 - 使用GitHub Gist作为免费存储
class CloudSync {
  constructor() {
    // 预配置的GitHub token和Gist ID
    this.accessToken = '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'
    this.gistId = localStorage.getItem('cloud_sync_gist_id') || 'auto-sync-accounts'
    this.baseUrl = 'https://api.github.com/gists'
    this.autoSyncEnabled = true
    this.syncInProgress = false
  }

  // 设置GitHub访问令牌
  setAccessToken(token) {
    this.accessToken = token
    localStorage.setItem('cloud_sync_token', token)
  }

  // 创建新的Gist来存储账号数据
  async createGist(accounts) {
    if (!this.accessToken) {
      throw new Error('请先设置GitHub访问令牌')
    }

    const gistData = {
      description: '产品文档系统账号数据',
      public: false,
      files: {
        'accounts.json': {
          content: JSON.stringify({
            accounts: accounts,
            lastUpdated: new Date().toISOString(),
            version: '1.0'
          }, null, 2)
        }
      }
    }

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `token ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gistData)
      })

      if (!response.ok) {
        throw new Error(`创建Gist失败: ${response.status}`)
      }

      const result = await response.json()
      this.gistId = result.id
      localStorage.setItem('cloud_sync_gist_id', this.gistId)
      
      return {
        success: true,
        gistId: this.gistId,
        url: result.html_url
      }
    } catch (error) {
      console.error('创建Gist失败:', error)
      throw error
    }
  }

  // 上传账号数据到云端
  async uploadAccounts(accounts) {
    if (!this.gistId) {
      return await this.createGist(accounts)
    }

    if (!this.accessToken) {
      throw new Error('请先设置GitHub访问令牌')
    }

    const gistData = {
      files: {
        'accounts.json': {
          content: JSON.stringify({
            accounts: accounts,
            lastUpdated: new Date().toISOString(),
            version: '1.0'
          }, null, 2)
        }
      }
    }

    try {
      const response = await fetch(`${this.baseUrl}/${this.gistId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `token ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gistData)
      })

      if (!response.ok) {
        throw new Error(`上传失败: ${response.status}`)
      }

      return { success: true }
    } catch (error) {
      console.error('上传账号数据失败:', error)
      throw error
    }
  }

  // 从云端下载账号数据
  async downloadAccounts() {
    if (!this.gistId) {
      throw new Error('未设置Gist ID')
    }

    try {
      const response = await fetch(`${this.baseUrl}/${this.gistId}`)
      
      if (!response.ok) {
        throw new Error(`下载失败: ${response.status}`)
      }

      const gist = await response.json()
      const accountsFile = gist.files['accounts.json']
      
      if (!accountsFile) {
        throw new Error('账号数据文件不存在')
      }

      const data = JSON.parse(accountsFile.content)
      return {
        success: true,
        accounts: data.accounts,
        lastUpdated: data.lastUpdated
      }
    } catch (error) {
      console.error('下载账号数据失败:', error)
      throw error
    }
  }

  // 通过Gist ID连接到现有的云端数据
  async connectToGist(gistId) {
    this.gistId = gistId
    localStorage.setItem('cloud_sync_gist_id', gistId)
    
    try {
      const result = await this.downloadAccounts()
      return result
    } catch (error) {
      // 如果连接失败，清除保存的Gist ID
      this.gistId = null
      localStorage.removeItem('cloud_sync_gist_id')
      throw error
    }
  }

  // 检查是否已配置云端同步
  isConfigured() {
    return !!(this.gistId && this.accessToken)
  }

  // 自动初始化云端同步
  async autoInitialize() {
    if (this.syncInProgress) return
    
    try {
      this.syncInProgress = true
      
      // 尝试获取现有的Gist ID
      const storedGistId = localStorage.getItem('cloud_sync_gist_id')
      if (storedGistId && storedGistId !== 'auto-sync-accounts') {
        this.gistId = storedGistId
        return await this.downloadAccounts()
      }
      
      // 查找现有的自动同步Gist
      const existingGist = await this.findAutoSyncGist()
      if (existingGist) {
        this.gistId = existingGist.id
        localStorage.setItem('cloud_sync_gist_id', this.gistId)
        return await this.downloadAccounts()
      }
      
      // 如果没有找到，返回空结果，等待首次账号数据创建Gist
      return { success: true, accounts: [], isNew: true }
      
    } catch (error) {
      console.warn('自动初始化云端同步失败:', error)
      return { success: false, error: error.message }
    } finally {
      this.syncInProgress = false
    }
  }

  // 查找现有的自动同步Gist
  async findAutoSyncGist() {
    try {
      const response = await fetch('https://api.github.com/gists', {
        headers: {
          'Authorization': `token ${this.accessToken}`,
        }
      })
      
      if (!response.ok) return null
      
      const gists = await response.json()
      return gists.find(gist => 
        gist.description === '产品文档系统账号数据 - 自动同步' &&
        gist.files['accounts.json']
      )
    } catch (error) {
      console.warn('查找自动同步Gist失败:', error)
      return null
    }
  }

  // 自动上传账号数据（静默）
  async autoUpload(accounts) {
    if (this.syncInProgress || !this.autoSyncEnabled) return
    
    try {
      this.syncInProgress = true
      
      if (!this.gistId || this.gistId === 'auto-sync-accounts') {
        // 创建新的自动同步Gist
        const result = await this.createAutoSyncGist(accounts)
        if (result.success) {
          this.gistId = result.gistId
          localStorage.setItem('cloud_sync_gist_id', this.gistId)
        }
        return result
      } else {
        // 更新现有Gist
        return await this.uploadAccounts(accounts)
      }
    } catch (error) {
      console.warn('自动上传失败:', error)
      return { success: false, error: error.message }
    } finally {
      this.syncInProgress = false
    }
  }

  // 创建自动同步Gist
  async createAutoSyncGist(accounts) {
    const gistData = {
      description: '产品文档系统账号数据 - 自动同步',
      public: false,
      files: {
        'accounts.json': {
          content: JSON.stringify({
            accounts: accounts,
            lastUpdated: new Date().toISOString(),
            version: '1.0',
            autoSync: true
          }, null, 2)
        }
      }
    }

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `token ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gistData)
      })

      if (!response.ok) {
        throw new Error(`创建自动同步Gist失败: ${response.status}`)
      }

      const result = await response.json()
      
      return {
        success: true,
        gistId: result.id,
        url: result.html_url
      }
    } catch (error) {
      console.error('创建自动同步Gist失败:', error)
      throw error
    }
  }

  // 自动下载最新数据（静默）
  async autoDownload() {
    if (this.syncInProgress || !this.gistId || this.gistId === 'auto-sync-accounts') {
      return { success: false, reason: 'not_ready' }
    }
    
    try {
      this.syncInProgress = true
      return await this.downloadAccounts()
    } catch (error) {
      console.warn('自动下载失败:', error)
      return { success: false, error: error.message }
    } finally {
      this.syncInProgress = false
    }
  }

  // 获取配置信息
  getConfig() {
    return {
      gistId: this.gistId,
      hasToken: !!this.accessToken
    }
  }

  // 清除配置
  clearConfig() {
    this.gistId = null
    this.accessToken = null
    localStorage.removeItem('cloud_sync_gist_id')
    localStorage.removeItem('cloud_sync_token')
  }
}

// 导出单例实例
export const cloudSync = new CloudSync()

// 导出类供其他地方使用
export default CloudSync