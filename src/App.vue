<template>
  <div id="app">
    <Header :categories="categories" @category-change="handleCategoryChange" />
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