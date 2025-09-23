export const kspdAppConfig = {
  id: 'kspd-app',
  name: 'KSPD APP',
  version: '2.1.0',
  description: '金域KSPD移动应用',
  fullDescription: '金域KSPD APP是专为医院物料管理设计的移动应用程序，提供便捷的物料领用、库存管理等功能。',
  versionHistory: [
    {
      version: '2.1.0',
      date: '2025-09-15',
      changes: [
        '【1】新增安卓设备扫码支持，兼容SUNMI L2S等专业设备',
        '【2】新增BI报表功能，支持数据可视化',
        '【3】调整领用单查看，作废逻辑',
        '【4】优化界面，调整为卡片布局，调整部分间距等',
      ]
    },
    {
      version: '1.0.3',
      date: '2025-02-14',
      changes: [
        '【1】新增领用成功或者失败的原因说明：如该物料未关联医院等等',
        '【2】修复验证码获取失败问题;',
        '【3】优化领取领用含有小数点的库存物料的相关细节(支持小数点后四位)',
        '【4】新增领用界面-所属学科-条件选择;'
      ]
    },
    {
      version: '1.0.2',
      date: '2024-11-29',
      changes: [
        '【1】单个领用新增名称查询，手动查询功能，增加领出默认值，增加超出库存提示,',
        '【2】优化其他细节，领用为0的单号字体标红提示(失败单号)',
        '【3】优化其他细节，隐藏库存为0的物料',
      ]
    },
    {
      version: '1.0.1',
      date: '2024-11-08',
      changes: [
        '【1】新增软件内部更新功能，每次登录会自动检查app版本，可以选择升级或者不升级，也可以在设置里面点击获取最新版本',
        '【2】新增单个院内领用，点击“新建领用(单个)”进入功能界面，扫码后会自动识别查询二维码对应的物料信息并展示，输入领用数量后点击领用即可',
        '【3】优化二维码扫描的精确问题，使用pda扫描功能会精确匹配对应的物料信息，与之前的模糊查询区分',
        '【4】优化页面布局，调整字体大小，弹窗提示等'
      ]
    }
  ],
  category: 'APP软件',
  tags: ['手持终端PDA', 'Android 手机'],
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
        '账号输入：支持用户名，自动记忆上次登录账号',
        '密码输入：安全密码输入框',
        '验证码输入：图形验证码，防止恶意登录',
        '网络选择：通常选择生产环境（外网），支持内网环境切换',
      ],
      screenshots: [
        '/images/kspd/login-interface.svg',
        '/images/kspd/login-main.svg'
      ],
      image: '/images/kspd/login-interface.svg',
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
        '  - 临期物料统计：即将过期的物料数量和详情',
        '  - 过期物料统计：已过期物料的数量和详情',
        '  - 物料总数：当前库存物料的总体数量，实时更新',
        '  - 物料种类：物料分类统计信息',
        '功能按键：',
        '  - 院内领用功能：快速进入物料领用流程',
        '  - 库存：查看当前库存状态',
        '  - 设置：系统参数设置',
        '  - 报表：详细的统计报表功能',
        '快捷操作：',
        '  - 快速搜索：顶部搜索框支持物料快速查找',
        '  - 扫码功能：支持二维码扫描',
      ],
      screenshots: [
        '/images/kspd/dashboard-overview.svg',
        '/images/kspd/dashboard-compact.svg'
      ],
      image: '/images/kspd/dashboard-overview.svg'
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
        exportFormat: ''
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
        '操作功能：',
        '  - 查看按键：点击可查看该领用单的详细信息',
        '  - 搜索功能：支持按单号、时间等条件搜索',
        '  - 排序功能：支持按时间、数量等字段排序',
      ],
      screenshots: [
        '/images/kspd/history-list-detail.svg',
        '/images/kspd/history-list.svg'
      ],
      image: '/images/kspd/history-list-detail.svg'
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
        '  2. 点击作废按键后弹出确认对话框',
        '  3. 对话框显示"是否作废该领用单"和作废原因选择',
        '  4. 点击确认按钮完成作废操作',
        '  5. 可在系统内查看作废记录',
        '作废限制：',
        '  - 只有"已成功"状态的领用单可以作废',
        '  - 需要相应的操作权限（管理员或申请人）',
        '  - 已发放的物料不能直接作废，需要退库流程',
        '权限控制：',
        '  - 申请人：可作废自己的已审批单据',
        '  - 管理员：可作废任何符合条件的单据',
        '审计功能：',
        '  - 记录作废操作的时间、操作人',
        '  - 保留作废前的完整单据信息',
      ],
      screenshots: [
        '/images/kspd/cancel-dialog.svg',
        '/images/kspd/cancel-confirm.svg'
      ],
      image: '/images/kspd/cancel-dialog.svg'
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
        offlineMode: ''
      },
      details: [
        '界面组成：',
        '  - 搜索栏：支持物料名称或编码查询',
        '  - 查询按键：执行搜索操作',
        '  - 扫码按键：快速扫描物料条码',
        '  - 列表页面：展示搜索结果',,
        '物料信息展示：',
        '  - 物料名称：物料的标准名称',
        '  - 物料编码：唯一的物料标识码',
        '  - 物料批号：生产批次信息，支持批号选择',
        '  - 效期：物料的有效期限',
        '  - 生产厂家：物料制造商信息',
        '  - 库存：当前可用库存数量',
        '  - 单位：物料的计量单位',
        '  - 价格：物料的单价信息（如有权限）',
        '  - 存储位置：物料在库房中的具体位置',
        '操作功能：',
        '  - 领用数量输入栏：输入具体的领用数值',
        '  - 创建院内领用单按键：生成正式的领用申请',
        '  - 批量选择：支持同时选择多个物料',
        '  - 数量验证：确保领用数量不超过库存',
      ],
      screenshots: [
        '/images/kspd/requisition-material-list.svg',
        '/images/kspd/requisition-search.svg',
        '/images/kspd/requisition-confirm.svg'
      ],
      image: '/images/kspd/requisition-material-list.svg'
    },
    {
      id: 'qr-scan',
      title: '6. 二维码扫描',
      priority: 'high',
      status: 'stable',
      description: '支持PDA手簿和安卓手机两种扫码方式，快速识别物料信息。',
      technicalSpecs: {
        scanEngine: '支持一维码、二维码识别',
        compatibility: 'PDA设备 + Android摄像头',
        accuracy: '识别准确率 > 99%'
      },
      details: [
        '扫码方式：',
        '  - PDA手簿扫码：使用专用扫码按键，如SUNMI L2S等设备',
        '  - 安卓手机扫码：点击搜索栏左侧的二维码扫描图标',
        '  - 自动对焦：支持自动对焦和手动调节',
        '扫码功能：',
        '  - 物料识别：扫描物料条码自动填充物料信息',
        '  - 批号识别：自动识别物料批号和有效期',
        '  - 库存查询：扫码后立即显示当前库存状态',
        '  - 错误提示：无效条码或库存不足时给出提示',
        '  - 历史记录：保存最近扫描的物料记录',
        '使用场景：',
        '  - 院内领用：扫码快速添加需要领用的物料',
        '  - 库存盘点：扫码核对物料信息和数量',
        '  - 出库确认：物料出库时扫码确认',
        '设备兼容：',
        '  - PDA设备：SUNMI L2S、霍尼韦尔等专业设备',
        '  - 安卓手机：支持摄像头的Android 7.0+设备',
        '  - 平板电脑：支持大屏幕平板设备操作'
      ],
      screenshots: [
        '/images/kspd/pda-device.svg',
        '/images/kspd/inventory-scan.svg',
        '/images/kspd/pda-scan.svg'
      ],
      image: '/images/kspd/pda-device.svg'
    }
  ],
  technicalInfo: {
    architecture: 'React Native + Redux',
    backend: 'Node.js + MongoDB',
    security: 'OAuth 2.0 + JWT + AES-256',
    offline: '',
    performance: '启动时间 < 3秒，响应时间 < 1秒'
  },
  supportInfo: {
    documentation: '/docs/kspd-app/',
    training: '/training/kspd-app/',
    support: 'support@kspd.com',
    updateFrequency: '每月更新'
  }
}