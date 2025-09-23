export const inventoryAppConfig = {
  id: 'inventory-app',
  name: '物料盘点APP',
  version: '2.1.0',
  description: '金域医学物料盘点管理应用',
  fullDescription: '物料盘点APP是专为医院和实验室设计的RFID物料盘点系统，支持WMS盘点单管理、多把盘点枪协同作业、实时数据同步等功能。',
  versionHistory: [
    {
      version: '2.1.0',
      date: '2025-08-29',
      changes: [
        '【1】新增多把盘点枪协同作业功能',
        '【2】优化WMS系统集成，提升数据同步效率',
        '【3】增加盘盈自动检测功能',
        '【4】改进目视补齐机制，支持差异自动计算',
        '【5】优化用户界面，提升操作便捷性'
      ]
    },
    {
      version: '2.0.8',
      date: '2024-06-15',
      changes: [
        '【1】修复库区选择页面的显示问题',
        '【2】优化RFID扫描算法，提升识别速度',
        '【3】增加盘点进度实时显示',
        '【4】改进网络异常处理机制'
      ]
    },
    {
      version: '2.0.0',
      date: '2024-04-20',
      changes: [
        '【1】重大版本更新，全面支持WMS系统',
        '【2】新增断点续盘功能',
        '【3】实现云平台数据同步',
        '【4】优化盘点流程，支持批量操作',
        '【5】增加详细的操作日志记录'
      ]
    },
  ],
  category: 'APP软件',
  tags: ['手持终端PDA'],
  platform: ['Android'],
  minVersion: {
    android: '7.0'
  },
  features: [
    {
      id: 'login',
      title: '1、登录页面',
      priority: 'high',
      status: 'stable',
      description: '用户登录系统的入口页面，包含完整的身份验证和网络环境选择功能',
      technicalSpecs: {
        authentication: 'PDA编号 + 密码验证',
        networkOptions: '生产环境(外网)、开发环境(外网)、测试环境(内网)',
        encryption: 'AES-256加密传输'
      },
      details: [
        'PDA编号输入：设备唯一标识，如EA0000000000000002',
        'PDA密码输入：6位数字密码，如123456',
        '子公司仓库选择：如广州生物岛-实验室',
        '网络环境选择：',
        '  - 生产环境：内网（默认选择）',
        '  - 开发环境：外网',
        '  - 测试环境：内网',
        '登录验证：点击登录按键进行身份验证',
        '自动记忆：保存上次登录的PDA编号和仓库信息'
      ],
      image: '/images/inventory/login-page.svg'
    },
    {
      id: 'inventory-list',
      title: '2、盘点单页面',
      priority: 'high',
      status: 'stable',
      description: '登录后直接进入的WMS盘点单列表页面，显示所有可用的盘点任务',
      technicalSpecs: {
        dataSync: '实时同步WMS系统',
        statusTypes: '未确认、已开始、待审核、已审核',
        refreshRate: '每30秒自动刷新'
      },
      details: [
        '盘点单列表展示：',
        '  - 标题：盘点单名称，如"广州金域非销售仓(2024-05-11)"',
        '  - 盘点单号：唯一标识，如INVENTORY-20240815004',
        '  - 盘点单状态：未确认/已开始/待审核/已审核',
        '  - 开始盘点时间：如24-08-26 11:37',
        '  - 最后更新时间：如24-08-29 14:11',
        '  - 待盘RFID总容量：如EAS:90',
        '  - 目视盘点容量：如目视:70',
        '  - 扫描RFID容量：如盘点:0',
        '状态限制：',
        '  - 待审核/已审核状态：提示"该盘点单已经进入待审核或者已审核状态，请选择未确认或者已开始的盘点单"',
        '  - 未确认/已开始状态：可以点击进入库区选择页面',
        '自动刷新：定时同步最新的盘点单状态'
      ],
      image: '/images/inventory/inventory-list.svg'
    },
    {
      id: 'warehouse-selection',
      title: '3、库区选择列表页面',
      priority: 'high',
      status: 'stable',
      description: '选择盘点单后进入的库区选择界面，显示该盘点单包含的所有库区',
      technicalSpecs: {
        warehouseTypes: '冷藏库、常温库、危险品库等',
        selectionMode: '单选模式',
        dataValidation: '库区权限验证'
      },
      details: [
        '库区列表显示：',
        '  - 广州-冷藏库：低温存储区域',
        '  - 广州-冷藏库II：备用冷藏区域',
        '  - 其他库区：根据实际配置显示',
        '库区信息：',
        '  - 库区名称：清晰标识不同存储区域',
        '  - 库区状态：显示是否可用',
        '  - 物料数量：该库区待盘点物料总数',
        '选择操作：',
        '  - 点击库区：进入对应库区的盘点页面',
        '  - 返回按键：返回盘点单列表',
        '权限验证：确保用户有权限访问选择的库区'
      ],
      image: '/images/inventory/warehouse-selection.svg'
    },
    {
      id: 'wms-inventory',
      title: '4、WMS盘点页面',
      priority: 'high',
      status: 'stable',
      description: '正式的盘点操作页面，显示货位和物料信息，支持RFID扫描盘点',
      technicalSpecs: {
        rfidSupport: 'UHF RFID 860-960MHz',
        scanningMode: '多把盘点枪协同作业',
        dataUpdate: '实时更新盘点进度'
      },
      details: [
        '货位展示：',
        '  - 货位编号：如LC-A-01、LC-A-02、LC-B-01',
        '  - 货位状态：显示盘点完成情况',
        '物料信息：',
        '  - 物料名称：如人参皂苷F1、OR-46.150.0510 Obelise R Column',
        '  - 批号：如20231201、20230317',
        '  - 效期：如2024-12-01、2024-03-17',
        '  - 物料编码：如04.02.0033.10277.00001',
        '  - 货位：物料存放位置',
        '  - 待盘数量：系统中的理论库存',
        '  - 已盘数量：实际扫描到的数量',
        '  - EAS数量：电子标签总数',
        '盘点状态：',
        '  - 完成：绿色显示，盘点数量与系统一致',
        '  - 待盘：红色显示，尚未完成盘点',
        '功能按键：',
        '  - 货位查询：支持按货位编号过滤',
        '  - 开始盘点：启动RFID扫描功能'
      ],
      image: '/images/inventory/wms-inventory.svg'
    },
    {
      id: 'scanning-process',
      title: '5、盘点扫描',
      priority: 'high',
      status: 'stable',
      description: 'RFID扫描盘点过程，支持多设备协同和断点续盘功能',
      technicalSpecs: {
        multiDevice: '支持多把盘点枪同时作业',
        resumeSupport: '断点续盘功能',
        realTimeSync: '实时数据同步'
      },
      details: [
        '开始盘点确认：',
        '  - 提示信息："确定要开始盘点吗？"',
        '  - 操作说明："点击确定，将开始本次盘点"',
        '  - 使用提示："请使用设备的扳机按键进行扫描"',
        '  - 续盘支持："在完成盘点前，可以支持断点续盘"',
        'RFID扫描功能：',
        '  - 自动识别：扫描到标签自动与平台物料比对',
        '  - 数量累加：匹配成功的物料扫描数量自动+1',
        '  - 进度显示：如3/3表示已扫描3个，总共3个',
        '  - 完成标识：全部扫描完成显示"已完成"状态',
        '目视补齐功能：',
        '  - 目视按键：手动输入实际看到的数量',
        '  - 差异补齐：如库存5个，扫描2个，目视输入3个',
        '  - 自动计算：系统自动补齐总数量',
        '多设备协同：',
        '  - 支持多把盘点枪同时扫描',
        '  - 实时同步各设备的扫描结果',
        '  - 避免重复扫描同一物料'
      ],
      image: '/images/inventory/scanning-process.svg'
    },
    {
      id: 'complete-inventory',
      title: '6、结束盘点',
      priority: 'high',
      status: 'stable',
      description: '完成盘点操作，提交盘点结果到云平台系统',
      technicalSpecs: {
        dataSubmission: '一键提交到WMS系统',
        resultValidation: '盘点结果验证',
        cloudSync: '云平台数据同步'
      },
      details: [
        '完成盘点操作：',
        '  - 完成按键：页面右下角打钩按键',
        '  - 确认提示："完成盘点"',
        '  - 操作说明："点击确定，将结束本次盘点，请至云平台查看盘点单"',
        '  - 按键选择：确定/取消',
        '盘点结果：',
        '  - 数据提交：将盘点结果提交到WMS系统',
        '  - 状态更新：盘点单状态更新为"待审核"',
        '  - 云平台同步：数据实时同步到云平台',
        '后续流程：',
        '  - 云平台查看：管理员可在云平台查看详细盘点报告',
        '  - 差异分析：系统自动分析盘盈盘亏情况',
        '  - 审核流程：进入盘点单审核环节'
      ],
      image: '/images/inventory/complete-inventory.svg'
    },
    {
      id: 'surplus-inventory',
      title: '7、盘盈界面',
      priority: 'medium',
      status: 'stable',
      description: '显示盘点过程中发现的额外RFID标签，即不在本次盘点单中的物料',
      technicalSpecs: {
        surplusDetection: '自动检测盘盈物料',
        rfidValidation: 'RFID标签有效性验证',
        reportGeneration: '盘盈报告生成'
      },
      details: [
        '盘盈检测：',
        '  - 无效RFID列表：显示不在盘点单中的RFID标签',
        '  - 标签总数：如"无效RFID列表共：19个"',
        '  - 单品码显示：完整的RFID标签编码',
        'RFID信息：',
        '  - 标签格式：如E123456700000000002DDC3',
        '  - 编码规则：符合EPC标准的RFID编码',
        '  - 数量统计：实时统计盘盈物料数量',
        '处理功能：',
        '  - 全部查看：显示所有盘盈的RFID标签',
        '  - 盘盈统计：如"20/70"表示盘盈20个，总扫描70个',
        '  - 报告生成：生成盘盈物料详细报告',
        '数据分析：',
        '  - 盘盈原因：分析可能的盘盈原因',
        '  - 物料追溯：追溯盘盈物料的来源',
        '  - 处理建议：提供盘盈物料的处理建议'
      ],
      image: '/images/inventory/surplus-inventory.svg'
    }
  ],
  technicalSpecs: {
    platform: 'Android PDA',
    rfidSupport: 'UHF RFID 860-960MHz',
    networkRequirement: '支持内网和外网环境',
    dataSync: 'WMS系统实时同步',
    multiDevice: '多设备协同作业',
    offlineMode: '断点续盘支持',
    cloudIntegration: '云平台数据同步'
  },
  keyFeatures: [
    'WMS盘点单管理',
    'RFID自动识别',
    '多把盘点枪协同',
    '断点续盘功能',
    '目视补齐机制',
    '盘盈自动检测',
    '实时数据同步',
    '云平台集成'
  ]
}