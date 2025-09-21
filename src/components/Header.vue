<template>
  <header class="header">
    <div class="header-content">
      <h1 class="logo">产品说明文档</h1>
      <nav class="nav">
        <button 
          v-for="category in categories" 
          :key="category"
          :class="['nav-item', { active: activeCategory === category }]"
          @click="selectCategory(category)"
        >
          {{ category }}
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  categories: Array
})

const emit = defineEmits(['category-change'])

const activeCategory = ref('APP软件')

const selectCategory = (category) => {
  activeCategory.value = category
  emit('category-change', category)
}
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #ff4757, #ff3838);
  color: white;
  height: 60px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.nav {
  display: flex;
  gap: 10px;
}

.nav-item {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.3);
  font-weight: bold;
}
</style>