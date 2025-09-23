# 产品说明文档系统

1基于Vue3构建的产品说明文档展示系统，提供三级目录结构的产品功能说明。

## 项目结构

```
product-docs/
├── src/
│   ├── components/          # 组件目录
│   │   ├── Header.vue      # 顶部导航栏
│   │   ├── Sidebar.vue     # 左侧产品列表
│   │   └── Content.vue     # 主内容区
│   ├── products/           # 产品配置目录
│   │   ├── kspd-app/       # KSPD APP配置
│   │   ├── smart-fridge-app/ # 智能冰箱APP配置
│   │   ├── office-suite/   # 办公套件配置
│   │   └── cms-system/     # CMS系统配置
│   ├── data/
│   │   └── products.js     # 产品数据汇总
│   ├── App.vue             # 主应用组件
│   ├── main.js             # 应用入口
│   └── style.css           # 全局样式
├── public/                 # 静态资源
└── README.md              # 项目说明
```

## 功能特性

### 三级目录结构
1. **第一级目录（顶部红色区域）**: 产品分类
   - APP软件
   - PC软件  
   - WEB软件

2. **第二级目录（左侧边栏）**: 具体产品
   - KSPD APP
   - 智能冰箱APP
   - 办公套件
   - 内容管理系统

3. **第三级目录（主内容区）**: 功能点详情
   - 每个功能点默认只显示标题
   - 点击展开显示详细内容
   - 支持返回功能

### 核心功能

- **响应式设计**: 适配不同屏幕尺寸
- **模块化架构**: 每个产品独立配置文件
- **交互式展示**: 点击展开/收起功能详情
- **美观界面**: 现代化UI设计
- **易于维护**: 清晰的目录结构

## 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **样式**: CSS3 + 自定义样式系统
- **图标**: Unicode表情符号

## 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 产品配置

### 添加新产品

1. 在 `src/products/` 目录下创建新的产品文件夹
2. 创建 `config.js` 配置文件
3. 在 `src/data/products.js` 中引入新产品配置

### 配置文件结构

```javascript
export const productConfig = {
  id: 'product-id',
  name: '产品名称',
  description: '简短描述',
  fullDescription: '详细描述',
  category: '产品分类',
  features: [
    {
      id: 'feature-id',
      title: '功能标题',
      description: '功能描述',
      details: ['详细说明1', '详细说明2']
    }
  ]
}
```

## KSPD APP 功能说明

### 1. 登录页面
- 账号密码输入
- 验证码验证
- 网络环境选择
- 安全认证

### 2. 功能页面
- BI报表展示
- 物料统计
- 快捷功能入口

### 3. 历史领用清单
- 领用记录查询
- 详细信息查看
- 数据导出功能

### 4. 领用单作废
- 权限控制
- 作废流程
- 审计日志

### 5. 院内领用功能
- 物料搜索
- 批量选择
- 领用单创建

## 开发指南

### 组件开发
- 使用Vue 3 Composition API
- 遵循单一职责原则
- 保持组件的可复用性

### 样式规范
- 使用CSS变量定义主题色彩
- 响应式设计优先
- 保持一致的视觉风格

### 数据管理
- 产品配置独立管理
- 支持动态加载
- 便于扩展维护

## 浏览器支持

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88

## 许可证

MIT License