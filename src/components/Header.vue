<template>
  <header class="header">
    <div class="header-content">
      <div class="logo-section">
        <img src="/images/company-logo.png" alt="易联捷" class="company-logo">
        <h1 class="logo">易联捷产品说明文档</h1>
      </div>
      <nav class="nav">
        <button 
          v-for="category in categories" 
          :key="category"
          :class="['nav-item', { 
            active: activeCategory === category,
            collapsed: collapsedCategories.includes(category)
          }]"
          @click="toggleCategory(category)"
        >
          <span class="category-text">{{ category }}</span>
          <span class="collapse-icon">
            {{ collapsedCategories.includes(category) ? '▶' : '▼' }}
          </span>
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

const emit = defineEmits(['category-change', 'category-toggle'])

const activeCategory = ref('APP软件')
const collapsedCategories = ref([])

const toggleCategory = (category) => {
  // 切换折叠状态
  const index = collapsedCategories.value.indexOf(category)
  if (index > -1) {
    // 展开分类
    collapsedCategories.value.splice(index, 1)
  } else {
    // 折叠分类
    collapsedCategories.value.push(category)
  }
  
  // 设置当前活跃分类
  activeCategory.value = category
  
  // 发送事件给父组件
  emit('category-change', category)
  emit('category-toggle', {
    category,
    collapsed: collapsedCategories.value.includes(category)
  })
}
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #2196F3, #1976D2);
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

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.company-logo {
  height: 48px;
  width: auto;
  max-width: 80px;
  flex-shrink: 0;
  object-fit: contain;
  image-rendering: auto;
  image-rendering: -webkit-optimize-contrast;
  filter: none;
  transition: transform 0.2s ease;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.company-logo:hover {
  transform: scale(1.05);
}

.logo {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.nav {
  display: flex;
  gap: 10px;
}

.nav-item {
  background: rgba(173, 216, 230, 0.3);
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 100px;
  justify-content: space-between;
}

.nav-item:hover {
  background: rgba(173, 216, 230, 0.5);
}

.nav-item.active {
  background: rgba(173, 216, 230, 0.7);
  font-weight: bold;
}

.nav-item.collapsed {
  background: rgba(173, 216, 230, 0.2);
}

.nav-item.collapsed:hover {
  background: rgba(173, 216, 230, 0.4);
}

.category-text {
  flex: 1;
  text-align: left;
}

.collapse-icon {
  font-size: 12px;
  transition: transform 0.3s ease;
  color: rgba(255, 255, 255, 0.8);
}

.nav-item.collapsed .collapse-icon {
  transform: rotate(0deg);
}

.nav-item:not(.collapsed) .collapse-icon {
  transform: rotate(0deg);
}
</style>