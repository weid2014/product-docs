export const smartFridgeConfig = {
  id: 'smart-fridge-app',
  name: '智能冰箱APP',
  version: '1.0.0',
  description: '智能冰箱管理应用',
  fullDescription: '智能冰箱APP是专为医疗机构设计的RFID物料管理系统，提供激活配置、物料盘点、库存管理、报表分析等功能，支持RFID、NFC和电子锁控制板等多种硬件设备。',
  category: 'APP软件',
  platform: ['Android', 'iOS'],
  minVersion: {
    android: '7.0',
    ios: '12.0'
  },
  features: [
    {
      id: 'activation',
      title: '1. 激活页面',
      priority: 'high',
      status: 'stable',
      description: '系统激活和设备配置的入口页面，包含Token验证、设备信息确认和硬件连接配置功能。',
      technicalSpecs: {
        tokenLength: '24位字符',
        rfidSupport: 'UHF RFID 860-960MHz',
        nfcSupport: 'NFC 13.56MHz',
        antennaRange: '1-33功率等级'
      },
      details: [
        '激活流程：',
        '  Step 1: Token输入',
        '    - 输入24位系统生成的令牌(Token)',
        '    - 可联系售后获取激活令牌',
        '    - 支持Token格式验证',
        '    - 点击"下一步"进行验证',
        '  Step 2: 设备信息确认',
        '    - 验证成功后显示冰箱详细信息',
        '    - 产品序列号：设备唯一标识',
        '    - 设备别名：用户自定义名称',
        '    - 设备库位：物理位置信息',
        '    - Http设置：服务器连接配置',
        '    - 管理员密码：系统管理权限',
        '    - 冰箱类型设置：设备型号选择',
        '  Step 3: 硬件连接配置',
        '    - RFID扫描天线连接：',
        '      * 下拉选择串口连接方式',
        '      * 点击"连接"按键测试连接',
        '      * 连接成功提示"连接成功"',
        '      * 点击"版本号"获取天线版本信息',
        '      * 点击"获取天线功率"查看当前功率',
        '      * 天线强度设置(范围1-33)',
        '      * 点击"保存功率"应用设置',
        '    - NFC连接配置：',
        '      * 下拉选择NFC串口连接',
        '      * 连接状态检测和版本获取',
        '      * NFC通信测试功能',
        '    - 电子锁控制板连接：',
        '      * 串口连接方式配置',
        '      * 控制板通信测试',
        '      * 电子锁状态监控',
        '    - RFID扫描测试：',
        '      * 扫描时长设置(秒为单位)',
        '      * 点击"扫描"测试天线功能',
        '      * 扫描结果显示在按键上',
        '      * 支持多设备扫描'
      ],
      image: '/images/smart-fridge/activation-step1.svg',
      screenshots: [
        '/images/smart-fridge/activation-step1.svg',
        '/images/smart-fridge/activation-step2.svg',
        '/images/smart-fridge/activation-step3.svg'
      ]
    },
    {
      id: 'homepage',
      title: '2. 首页',
      priority: 'high',
      status: 'stable',
      description: '主功能界面，提供报表、盘点、列表三大核心功能入口，实时显示物料状态信息。',
      technicalSpecs: {
        inventoryRounds: '10轮盘点',
        materialStatus: '4种状态分类',
        realTimeUpdate: '实时数据更新'
      },
      details: [
        '顶部功能按键：',
        '  - 报表按键：点击跳转到BI报表页面',
        '  - 盘点按键：启动全盘功能',
        '    * 冰箱盘点10轮自动执行',
        '    * 最后汇总结果并更新库存',
        '    * 盘点过程中显示扫描动画',
        '  - 列表按键：跳转到详细列表页面',
        '    * 查看冰箱内详细物料信息',
        '    * 支持多种查询和筛选',
        '显示选项：',
        '  - 物料全称显示：可勾选是否显示完整物料名称',
        '  - 物料状态分类：',
        '    * 过期物料：背景红色显示',
        '    * 临期物料：背景橙色(30天内过期)',
        '    * 呆滞物料：背景蓝色(在冰箱内放置超过90天)',
        '    * 常规物料：背景白色显示',
        '实时状态：',
        '  - 物料信息实时更新',
        '  - 盘点进度动画显示',
        '  - 右上方扫描状态指示',
        '  - 物料数量统计信息'
      ],
      image: '/images/smart-fridge/homepage-overview.svg',
      screenshots: [
        '/images/smart-fridge/homepage-overview.svg'
      ]
    },
    {
      id: 'reports',
      title: '3. 报表页面',
      priority: 'medium',
      status: 'stable',
      description: 'BI报表分析页面，直观展示物料统计信息。',
      technicalSpecs: {
        chartTypes: 'ECharts图表库',
        dataRefresh: '实时数据刷新',
        exportFormat: ''
      },
      details: [
        'BI报表功能：',
        '  - 临期物料统计：',
        '    * 30天内即将过期的物料',
        '    * 按物料类型分类统计',
        '    * 临期物料排名列表',
        '    * 过期风险预警',
        '  - 过期物料统计：',
        '    * 已过期物料数量统计',
        '    * 过期物料处理状态',
        '    * 过期损失分析',
        '  - 物料总数统计：',
        '    * 当前库存物料总量',
        '    * 实时数据更新',
        '    * 按类别分组统计',
        '  - 物料种类统计：',
        '    * 物料分类信息',
        '    * 各类别占比分析',
        '数据可视化：',
        '  - 图表展示：饼图',
        '  - 颜色编码：不同状态用不同颜色区分',
        '  - 交互功能：点击查看详细信息',
      ],
      image: '/images/smart-fridge/reports-dashboard.svg',
      screenshots: [
        '/images/smart-fridge/reports-dashboard.svg'
      ]
    },
    {
      id: 'list-page',
      title: '4. 列表页面',
      priority: 'high',
      status: 'stable',
      description: '详细的物料管理页面，包含库存列表、操作记录、设置等多个子功能。',
      technicalSpecs: {
        subPages: '3个子页面',
        sortOptions: '多种排序方式',
        searchEngine: '模糊查询支持'
      },
      details: [
        '页面结构：',
        '  - 库存列表子页面：',
        '    * 查看物料详细信息',
        '    * 默认按效期排序',
        '    * 支持物料模糊查询',
        '    * 物料规格、批号、厂家信息',
        '    * 库存数量实时显示',
        '  - 操作记录子页面：',
        '    * 查看冰箱领出存入记录',
        '    * 操作时间、数量统计',
        '    * 操作人员信息',
        '    * 操作状态跟踪',
        '    * 领出和存入记录分类显示',
        '  - 设置子页面：',
        '    * 服务器地址配置',
        '    * 冰箱天线IP设置',
        '    * 系统参数调整',
        '    * 用户权限管理',
        '特殊功能：',
        '  - 摆放说明按键：',
        '    * 点击查看物料摆放说明',
        '    * RFID应用说明展示',
        '    * 标签不可直接贴至金属/铝箔包装上',
        '    * 正确的标签贴附方法指导',
        '  - 返回首页：快速导航回主页面',
        '  - 页面切换：三个子页面间快速切换'
      ],
      image: '/images/smart-fridge/list-inventory.svg',
      screenshots: [
        '/images/smart-fridge/list-inventory.svg',
        '/images/smart-fridge/rfid-instructions.svg'
      ]
    }
  ],
  technicalInfo: {
    architecture: 'React Native + RFID SDK',
    rfidTechnology: 'UHF RFID 860-960MHz + NFC 13.56MHz',
    connectivity: 'WiFi + Ethernet + 串口通信',
    database: 'SQLite + Cloud Sync',
    security: 'Token认证 + 数据加密',
    hardwareSupport: 'RFID天线 + NFC + 电子锁控制板'
  },
  supportInfo: {
    documentation: '/docs/smart-fridge/',
    training: '/training/smart-fridge/',
    support: 'support@smartfridge.com',
    updateFrequency: '季度更新'
  }
}