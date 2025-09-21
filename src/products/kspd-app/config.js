export const kspdAppConfig = {
  id: 'kspd-app',
  name: 'KSPD APP',
  version: '2.1.0',
  description: '金域KSPD移动应用',
  fullDescription: '金域KSPD APP是专为医院物料管理设计的移动应用程序，提供便捷的物料领用、库存管理等功能。支持离线操作，确保在网络不稳定的环境下也能正常使用。',
  category: 'APP软件',
  platform: ['iOS', 'Android'],
  minVersion: {
    ios: '12.0',
    android: '7.0'
  },
  features: [
    {
      id: 'login',
      title: '1. 登录页面',
      priority: 'high',
      status: 'stable',
      description: '用户登录系统的入口页面，包含完整的身份验证功能。',
      technicalSpecs: {
        authentication: 'OAuth 2.0 + JWT',
        encryption: 'AES-256',
        sessionTimeout: '30分钟'
      },
      details: [
        '账号输入：支持用户名或邮箱登录，自动记忆上次登录账号',
        '密码输入：安全密码输入框，支持显示/隐藏密码，支持生物识别',
        '验证码输入：图形验证码，防止恶意登录，支持语音验证码',
        '网络选择：通常选择生产环境（外网），支持内网环境切换',
        '记住密码：可选择记住登录状态，支持自动登录',
        '忘记密码：提供密码重置功能，支持短信和邮箱重置',
        '多语言支持：中文、英文界面切换',
        '安全提示：显示上次登录时间和地点'
      ],
      screenshots: [
        '/images/kspd/login-main.png',
        '/images/kspd/login-forgot.png'
      ],
      userFlow: [
        '用户打开APP',
        '输入账号密码',
        '选择网络环境',
        '输入验证码',
        '点击登录',
        '验证成功后跳转主页'
      ]
    },
    {
      id: 'dashboard',
      title: '2. 功能页面',
      priority: 'high',
      status: 'stable',
      description: '登录后的主功能界面，提供BI报表和核心功能入口。',
      technicalSpecs: {
        dataRefresh: '实时更新',
        cacheStrategy: '本地缓存30分钟',
        chartLibrary: 'ECharts'
      },
      details: [
        'BI报表展示：',
        '  - 临期物料统计：即将过期的物料数量和详情，支持时间筛选',
        '  - 过期物料统计：已过期物料的处理状态，支持批量处理',
        '  - 物料总数：当前库存物料的总体数量，实时更新',
        '  - 物料种类：物料分类统计信息，支持钻取查看',
        '  - 趋势分析：物料使用趋势图表',
        '  - 预警提醒：库存不足、临期预警',
        '功能按键：',
        '  - 院内领用功能：快速进入物料领用流程',
        '  - 库存：查看和管理当前库存状态',
        '  - 设置：系统参数和个人偏好设置',
        '  - 报表：详细的统计报表功能',
        '  - 消息中心：系统通知和提醒',
        '快捷操作：',
        '  - 快速搜索：顶部搜索框支持物料快速查找',
        '  - 扫码功能：支持条码和二维码扫描',
        '  - 语音输入：支持语音搜索物料'
      ],
      screenshots: [
        '/images/kspd/dashboard-main.png',
        '/images/kspd/dashboard-charts.png'
      ]
    },
    {
      id: 'history',
      title: '3. 历史领用清单页面',
      priority: 'medium',
      status: 'stable',
      description: '查看和管理历史领用记录的页面。',
      technicalSpecs: {
        pagination: '分页加载，每页20条',
        searchEngine: 'Elasticsearch',
        exportFormat: 'Excel, PDF'
      },
      details: [
        '领用清单列表显示：',
        '  - 单号：每个领用单的唯一标识，支持点击复制',
        '  - 领用时间：物料领用的具体时间，精确到分钟',
        '  - 更新时间：记录最后更新的时间',
        '  - 成功领用数量：实际成功领用的物料数量',
        '  - 申领数量：原始申请的物料数量',
        '  - 领用人：执行领用操作的人员信息',
        '  - 审批状态：待审批、已审批、已拒绝等状态',
        '  - 领用科室：申请领用的科室信息',
        '操作功能：',
        '  - 查看按键：点击可查看该领用单的详细信息',
        '  - 搜索功能：支持按单号、时间、领用人等条件搜索',
        '  - 筛选功能：按状态、时间范围、科室等筛选记录',
        '  - 排序功能：支持按时间、数量等字段排序',
        '  - 导出功能：支持导出Excel和PDF格式',
        '  - 批量操作：支持批量审批、批量导出',
        '高级功能：',
        '  - 统计分析：领用趋势分析',
        '  - 异常检测：异常领用行为提醒',
        '  - 自动归档：历史数据自动归档'
      ],
      screenshots: [
        '/images/kspd/history-list.png',
        '/images/kspd/history-detail.png'
      ]
    },
    {
      id: 'cancel',
      title: '4. 领用单作废',
      priority: 'medium',
      status: 'stable',
      description: '在历史领用单详情页面进行作废操作。',
      technicalSpecs: {
        authorization: '基于角色的权限控制',
        auditLog: '完整的操作审计日志',
        workflow: '多级审批流程'
      },
      details: [
        '作废流程：',
        '  1. 在历史领用单详情页面找到作废按键',
        '  2. 系统检查当前用户是否有作废权限',
        '  3. 点击作废按键后弹出确认对话框',
        '  4. 对话框显示"是否作废该领用单"和作废原因选择',
        '  5. 填写作废原因（必填）',
        '  6. 点击确认按钮完成作废操作',
        '  7. 系统发送作废通知给相关人员',
        '作废限制：',
        '  - 只有"待审批"和"已审批"状态的领用单可以作废',
        '  - 需要相应的操作权限（管理员或申请人）',
        '  - 已发放的物料不能直接作废，需要退库流程',
        '  - 作废后的记录会保留但标记为无效状态',
        '权限控制：',
        '  - 申请人：可作废自己的待审批单据',
        '  - 审批人：可作废已审批但未发放的单据',
        '  - 管理员：可作废任何符合条件的单据',
        '审计功能：',
        '  - 记录作废操作的时间、操作人、原因',
        '  - 保留作废前的完整单据信息',
        '  - 支持作废操作的撤销（限定时间内）'
      ],
      screenshots: [
        '/images/kspd/cancel-confirm.png',
        '/images/kspd/cancel-reason.png'
      ]
    },
    {
      id: 'requisition',
      title: '5. 院内领用功能',
      priority: 'high',
      status: 'stable',
      description: '核心的物料领用功能界面，支持物料搜索、选择和领用单创建。',
      technicalSpecs: {
        searchEngine: '全文检索 + 模糊匹配',
        barcodeSupport: 'Code128, QR Code, EAN13',
        offlineMode: '支持离线操作'
      },
      details: [
        '界面组成：',
        '  - 搜索栏：支持物料名称或编码查询，智能提示',
        '  - 查询按键：执行搜索操作，支持语音搜索',
        '  - 扫码按键：快速扫描物料条码',
        '  - 列表页面：展示搜索结果，支持多种视图',
        '  - 购物车：已选择的物料临时存储',
        '物料信息展示：',
        '  - 物料名称：物料的标准名称，支持别名显示',
        '  - 物料编码：唯一的物料标识码',
        '  - 物料批号：生产批次信息，支持批号选择',
        '  - 效期：物料的有效期限，临期物料特殊标识',
        '  - 生产厂家：物料制造商信息',
        '  - 库存：当前可用库存数量，实时更新',
        '  - 单位：物料的计量单位',
        '  - 价格：物料的单价信息（如有权限）',
        '  - 存储位置：物料在库房中的具体位置',
        '操作功能：',
        '  - 领用数量输入栏：输入具体的领用数值，支持快捷数量选择',
        '  - 创建院内领用单按键：生成正式的领用申请',
        '  - 批量选择：支持同时选择多个物料',
        '  - 数量验证：确保领用数量不超过库存',
        '  - 预约领用：支持预约未来时间领用',
        '  - 紧急领用：紧急情况下的快速领用流程',
        '高级功能：',
        '  - 智能推荐：根据历史领用推荐相关物料',
        '  - 替代品提示：缺货时推荐替代物料',
        '  - 批量导入：支持Excel批量导入领用清单',
        '  - 模板保存：常用领用组合保存为模板',
        '  - 科室预算：显示科室剩余预算（如启用）'
      ],
      screenshots: [
        '/images/kspd/requisition-search.png',
        '/images/kspd/requisition-list.png',
        '/images/kspd/requisition-cart.png'
      ]
    }
  ],
  technicalInfo: {
    architecture: 'React Native + Redux',
    backend: 'Node.js + MongoDB',
    security: 'OAuth 2.0 + JWT + AES-256',
    offline: '支持离线操作，数据同步',
    performance: '启动时间 < 3秒，响应时间 < 1秒'
  },
  supportInfo: {
    documentation: '/docs/kspd-app/',
    training: '/training/kspd-app/',
    support: 'support@kspd.com',
    updateFrequency: '每月更新'
  }
}