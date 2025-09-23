<template>
  <div id="app">
    <!-- 登录页面 -->
    <Login v-if="!isAuthenticated" @login-success="handleLoginSuccess" />
    
    <!-- 主应用界面 -->
    <template v-else>
      <Header 
        :categories="categories" 
        :currentUser="currentUser"
        @category-change="handleCategoryChange" 
        @category-toggle="handleCategoryToggle"
        @logout="handleLogout"
        @account-management="handleAccountManagement"
      />
      <div class="main-container">
        <Sidebar 
          :products="currentProducts" 
          :activeProduct="activeProduct"
          @product-change="handleProductChange" 
        />
        <Content 
          :product="activeProduct"
          :features="currentFeatures"
        />
      </div>
      
      <!-- 账号管理弹窗 -->
      <AccountManagement 
        v-if="showAccountManagement" 
        @close="showAccountManagement = false" 
      />
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Content from './components/Content.vue'
import Login from './components/Login.vue'
import AccountManagement from './components/AccountManagement.vue'
import { productData } from './data/products.js'
import { isLoggedIn, getCurrentUser, logout, extendLogin } from './utils/auth.js'

// 认证状态
const isAuthenticated = ref(false)
const currentUser = ref('')
const showAccountManagement = ref(false)

// 应用状态
const activeCategory = ref('APP软件')
const activeProduct = ref(null)
const collapsedCategories = ref([])

const categories = ['APP软件', 'PC软件', 'WEB软件']

const currentProducts = computed(() => {
  return productData[activeCategory.value] || []
})

const currentFeatures = computed(() => {
  return activeProduct.value ? activeProduct.value.features : []
})

const handleCategoryChange = (category) => {
  activeCategory.value = category
  activeProduct.value = currentProducts.value[0] || null
}

const handleCategoryToggle = (toggleData) => {
  const { category, collapsed } = toggleData
  console.log(`分类 ${category} ${collapsed ? '已折叠' : '已展开'}`)
  
  // 这里可以添加折叠逻辑，比如隐藏/显示对应的产品列表
  if (collapsed) {
    collapsedCategories.value.push(category)
  } else {
    const index = collapsedCategories.value.indexOf(category)
    if (index > -1) {
      collapsedCategories.value.splice(index, 1)
    }
  }
}

const handleProductChange = (product) => {
  activeProduct.value = product
  // 用户活动时延长登录时间
  extendLogin()
}

// 认证相关方法
const handleLoginSuccess = (user) => {
  isAuthenticated.value = true
  currentUser.value = user.username
  // 初始化产品数据
  activeProduct.value = currentProducts.value[0] || null
}

const handleLogout = () => {
  logout()
  isAuthenticated.value = false
  currentUser.value = ''
  activeProduct.value = null
  showAccountManagement.value = false
}

const handleAccountManagement = () => {
  showAccountManagement.value = true
}

// 检查认证状态
const checkAuthStatus = () => {
  if (isLoggedIn()) {
    isAuthenticated.value = true
    currentUser.value = getCurrentUser() || ''
    activeProduct.value = currentProducts.value[0] || null
  } else {
    isAuthenticated.value = false
    currentUser.value = ''
  }
}

// 初始化
onMounted(() => {
  checkAuthStatus()
})

// 监听用户活动，延长登录时间
const handleUserActivity = () => {
  if (isAuthenticated.value) {
    extendLogin()
  }
}

// 添加用户活动监听
onMounted(() => {
  const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
  events.forEach(event => {
    document.addEventListener(event, handleUserActivity, { passive: true })
  })
})
</script>

<style>
@import './style.css';

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-container {
  display: flex;
  flex: 1;
  height: calc(100vh - 60px);
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}
</style>