<template>
  <aside v-if="activeCategory !== 'PC软件'" class="sidebar">
    <div class="sidebar-header">
      <h3>产品列表</h3>
    </div>
    <div class="product-list">
      <div 
        v-for="product in products" 
        :key="product.id"
        :class="['product-item', { active: activeProduct?.id === product.id }]"
        @click="selectProduct(product)"
      >
        <div class="product-icon">
          <i class="icon">📱</i>
        </div>
        <div class="product-info">
          <h4>{{ product.name }}</h4>
          <p>{{ product.description }}</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
const props = defineProps({
  products: Array,
  activeProduct: Object,
  activeCategory: String
})

const emit = defineEmits(['product-change'])

const selectProduct = (product) => {
  emit('product-change', product)
}
</script>

<style scoped>
.sidebar {
  width: 280px;
  background: #f8f9fa;
  border-right: 1px solid #e9ecef;
  overflow-y: auto;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  background: white;
}

.sidebar-header h3 {
  color: #333;
  font-size: 16px;
  margin: 0;
}

.product-list {
  padding: 10px;
}

.product-item {
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 8px;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
}

.product-item:hover {
  background: #f0f8ff;
  border-color: #007bff;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.1);
}

.product-item.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.product-icon {
  margin-right: 12px;
}

.icon {
  font-size: 24px;
}

.product-info h4 {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
}

.product-info p {
  margin: 0;
  font-size: 12px;
  opacity: 0.8;
}

.product-item.active .product-info p {
  opacity: 0.9;
}
</style>