<template>
  <main class="content">
    <div v-if="product" class="content-wrapper">
      <div class="content-header">
        <h2>{{ product.name }}功能说明</h2>
        <p class="product-desc">{{ product.fullDescription }}</p>
        
        <!-- 历史版本更新内容 -->
        <div v-if="product.versionHistory" class="version-history-section">
          <div 
            class="version-history-header"
            @click="toggleVersionHistory"
          >
            <h3>历史版本更新内容</h3>
            <span class="toggle-icon" :class="{ expanded: showVersionHistory }">
              ▼
            </span>
          </div>
          
          <div v-show="showVersionHistory" class="version-history-content">
            <div 
              v-for="version in product.versionHistory" 
              :key="version.version"
              class="version-item"
            >
              <div class="version-header">
                <span class="version-number">v{{ version.version }}</span>
                <span class="version-date">{{ version.date }}</span>
              </div>
              <ul class="version-changes">
                <li v-for="change in version.changes" :key="change">
                  {{ change }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div class="features-list">
        <div 
          v-for="(feature, index) in features" 
          :key="feature.id"
          class="feature-item"
        >
          <div 
            class="feature-header"
            @click="toggleFeature(index)"
          >
            <h3>{{ feature.title }}</h3>
            <span class="toggle-icon" :class="{ expanded: expandedFeatures[index] }">
              ▼
            </span>
          </div>
          
          <div 
            v-show="expandedFeatures[index]" 
            class="feature-content"
          >
            <div class="feature-description">
              {{ feature.description }}
            </div>
            
            <div v-if="feature.details" class="feature-details">
              <ul>
                <li v-for="detail in feature.details" :key="detail">
                  {{ detail }}
                </li>
              </ul>
            </div>
            
            <div v-if="feature.image" class="feature-image">
              <img :src="feature.image" :alt="feature.title" />
            </div>
            
            <button class="back-btn" @click="collapseFeature(index)">
              折叠
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="empty-state">
      <h3>请选择一个产品查看详细信息</h3>
    </div>
  </main>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  product: Object,
  features: Array
})

const expandedFeatures = ref({})
const showVersionHistory = ref(false)

const toggleFeature = (index) => {
  expandedFeatures.value[index] = !expandedFeatures.value[index]
}

const collapseFeature = (index) => {
  expandedFeatures.value[index] = false
}

const toggleVersionHistory = () => {
  showVersionHistory.value = !showVersionHistory.value
}

// 当产品切换时重置展开状态
watch(() => props.product, () => {
  expandedFeatures.value = {}
  showVersionHistory.value = false
})
</script>

<style scoped>
.content {
  flex: 1;
  background: white;
  overflow-y: auto;
}

.content-wrapper {
  padding: 30px;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

.content-header {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
}

.content-header h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

.product-desc {
  color: #666;
  font-size: 16px;
  line-height: 1.6;
}

.features-list {
  space-y: 15px;
}

.feature-item {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.feature-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.feature-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.feature-header:hover {
  background: #e9ecef;
}

.feature-header h3 {
  margin: 0;
  color: #333;
  font-size: 18px;
}

.toggle-icon {
  font-size: 12px;
  color: #666;
  transition: transform 0.3s ease;
}

.toggle-icon.expanded {
  transform: rotate(180deg);
}

.feature-content {
  padding: 20px;
  background: white;
  border-top: 1px solid #e9ecef;
}

.feature-description {
  color: #555;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 15px;
}

.feature-details ul {
  list-style: none;
  padding: 0;
}

.feature-details li {
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  color: #666;
}

.feature-details li:last-child {
  border-bottom: none;
}

.feature-image {
  margin: 20px 0;
  text-align: center;
}

.feature-image img {
  max-width: 300px;
  width: auto;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.back-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 15px;
  transition: background-color 0.3s ease;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.back-btn:hover {
  background: #0056b3;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
}

/* 版本历史样式 */
.version-history-section {
  margin-top: 20px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
}

.version-history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #f8f9fa;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-bottom: 1px solid #e9ecef;
}

.version-history-header:hover {
  background: #e9ecef;
}

.version-history-header h3 {
  margin: 0;
  color: #333;
  font-size: 16px;
  font-weight: 600;
}

.version-history-content {
  padding: 0;
  background: white;
}

.version-item {
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.version-item:last-child {
  border-bottom: none;
}

.version-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.version-number {
  font-weight: bold;
  color: #007bff;
  font-size: 16px;
}

.version-date {
  color: #666;
  font-size: 14px;
}

.version-changes {
  list-style: none;
  padding: 0;
  margin: 0;
}

.version-changes li {
  padding: 6px 0;
  color: #555;
  font-size: 14px;
  line-height: 1.5;
  position: relative;
  padding-left: 20px;
}

.version-changes li:before {
  content: "•";
  color: #007bff;
  font-weight: bold;
  position: absolute;
  left: 0;
}
</style>