<template>
  <div id="app">
    <Header :categories="categories" @category-change="handleCategoryChange" @category-toggle="handleCategoryToggle" />
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Content from './components/Content.vue'
import { productData } from './data/products.js'

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
}

// 初始化
activeProduct.value = currentProducts.value[0] || null
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
}
</style>