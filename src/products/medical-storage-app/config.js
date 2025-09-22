export const medicalStorageConfig = {
  id: 'medical-storage-app',
  name: '医智储APP',
  version: '1.0.20250915',
  description: '医院智能物料管理应用，支持RFID和二维码领用、盘点功能',
  fullDescription: '医智储APP是专为医院物料管理设计的移动应用程序，支持PDA7100设备，提供RFID和二维码双模式领用、智能盘点管理等功能。',
  category: 'APP软件',
  platform: ['Android'],
  minVersion: {
    android: '7.0'
  },
  features: [
    {
      id: 'function-menu',
      title: '1、功能页面',
      priority: 'high',
      status: 'stable',
      description: '主功能菜单页面，包含四个核心功能模块',
      details: [
        '功能按键布局：四个主要功能入口',
        'RFID 院内领用：支持RFID标签感应领用',
        '二维码 院内领用：支持二维码扫描领用', 
        'RFID 盘点：库存盘点管理功能',
        '设置：应用配置和系统设置'
      ],
      image: '/images/medical-storage/function-menu.svg'
    },
    {
      id: 'rfid-requisition',
      title: '2、RFID 院内领用',
      priority: 'high',
      status: 'stable',
      description: '使用PDA7100感应RFID标签进行物料领用',
      details: [
        '设备支持：PDA7100盘点枪RFID感应',
        '自动查询：RFID标签结果自动输入查询栏',
        '库存验证：显示对应物料库存信息',
        '领用流程：选择操作人和用途（如张三-检验科）',
        '确认机制：弹窗确认"确认出库"和"取消"',
        '成功提示：Toast提示"该物料RFIDXXXXXXX领用成功"'
      ],
      image: '/images/medical-storage/rfid-requisition.svg'
    },
    {
      id: 'qrcode-requisition', 
      title: '3、二维码 院内领用',
      priority: 'high',
      status: 'stable',
      description: '使用盘点枪扫描二维码进行物料领用',
      details: [
        '扫描功能：启动盘点枪二维码扫描',
        '自动查询：二维码结果自动输入查询栏',
        '库存验证：显示对应物料库存信息',
        '领用流程：选择操作人和用途（如张三-检验科）',
        '确认机制：弹窗确认"确认出库"和"取消"',
        '成功提示：Toast提示"该物料RFIDXXXXXXX领用成功"'
      ],
      image: '/images/medical-storage/qrcode-requisition.svg'
    },
    {
      id: 'rfid-inventory',
      title: '4、RFID 盘点',
      priority: 'high',
      status: 'stable',
      description: 'RFID盘点管理，支持历史盘点单和新建盘点功能',
      details: [
        '历史盘点单：按最近时间排序显示盘点记录',
        '盘点单选择：点击选中盘点单（蓝色背景边框）',
        '新建盘点单：弹窗确认创建新的盘点任务',
        '开始盘点：使用PDA7100进行RFID扫描盘点',
        '自动计数：扫描到标签自动+1，显示扫描进度',
        '完成状态：扫描齐全显示"已完成"状态',
        '目视补齐：手动输入实际数量补齐差异',
        '实时同步：与平台物料数据实时比对'
      ],
      image: '/images/medical-storage/rfid-inventory.svg'
    },
    {
      id: 'settings',
      title: '5、设置页面',
      priority: 'medium',
      status: 'stable',
      description: '应用配置管理，包含版本、更新、服务器设置',
      details: [
        '版本信息：显示当前APP版本号（如1.0.20250915）',
        '应用更新设置：配置APP更新地址，支持编辑修改',
        '服务器设置：配置平台服务器地址',
        '内网环境：需与服务器在同个局域网（同WiFi）',
        '地址编辑：支持点击"编辑"按键修改服务器地址',
        '配置保存：设置修改后自动保存配置'
      ],
      image: '/images/medical-storage/settings.svg'
    }
  ],
  technicalSpecs: {
    platform: 'Android PDA',
    device: 'PDA7100盘点枪',
    rfidSupport: 'UHF RFID 860-960MHz',
    qrcodeSupport: '一维码/二维码扫描',
    networkRequirement: '内网环境，与服务器同局域网',
    dataSync: '实时数据同步',
    storageManagement: '物料库存管理',
    userManagement: '操作人员管理',
    departmentManagement: '科室用途管理'
  },
  keyFeatures: [
    'PDA7100设备集成',
    'RFID标签感应领用',
    '二维码扫描领用',
    '智能盘点管理',
    '实时库存同步',
    '操作记录追踪',
    '多科室支持',
    '离线数据缓存'
  ]
}