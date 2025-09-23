export const assetInventoryConfig = {
  id: 'asset-inventory-app',
  name: '资产盘点设备APP',
  version: '1.0.0',
  description: '金域医学资产设备盘点管理应用',
  fullDescription: '资产盘点设备APP是专为医院和实验室设计的固定资产RFID盘点系统，支持科室选择、资产设备管理、RFID扫描盘点等功能。',
  category: 'APP软件',
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
      description: '用户登录系统的入口页面，包含子公司地区选择和科室输入功能',
      technicalSpecs: {
        authentication: '账号 + 密码 + 验证码',
        networkOptions: '生产环境(内网)、开发环境(外网)',
        regionSelection: '子公司地区选择，如广州、上海等',
        departmentInput: '科室输入，如检验科、放射科等'
      },
      details: [
        '账号输入：用户登录账号',
        '密码输入：用户登录密码',
        '验证码输入：图形验证码',
        '网络环境选择：生产环境(内网)为默认选择',
        '子公司地区选择：支持输入子公司地区，如广州',
        '科室输入：支持输入具体科室，如检验科',
        '登录验证：点击登录按键进行身份验证'
      ],
      image: '/images/asset-inventory/login-page.svg'
    },
    {
      id: 'department-selection',
      title: '2、选择科室页面',
      priority: 'high',
      status: 'stable',
      description: '登录成功后进入的科室选择页面，显示所有可选择的科室',
      technicalSpecs: {
        departmentTypes: '检验科、放射科、病理科、药房等',
        selectionMode: '单选模式',
        navigation: '点击进入资产盘点页面'
      },
      details: [
        '科室列表显示：',
        '  - 检验科：临床检验相关设备',
        '  - 放射科：影像设备',
        '  - 病理科：病理检测设备',
        '  - 药房：药品管理设备',
        '  - 其他科室：根据实际配置显示',
        '科室信息：',
        '  - 科室名称：清晰标识不同科室',
        '  - 资产数量：该科室待盘点设备总数',
        '选择操作：',
        '  - 点击科室：进入对应科室的资产盘点页面',
        '  - 返回按键：返回登录页面'
      ],
      image: '/images/asset-inventory/department-selection.svg'
    },
    {
      id: 'asset-inventory',
      title: '3、资产设备盘点页面',
      priority: 'high',
      status: 'stable',
      description: '资产设备盘点主页面，显示科室资产列表和盘点状态',
      technicalSpecs: {
        dataSync: '实时同步资产管理系统',
        statusTypes: '未确认、已开始、已结束',
        assetTypes: '医疗设备、办公设备、实验设备等'
      },
      details: [
        '资产列表展示：',
        '  - 标题：资产设备名称，如"全自动生化分析仪"',
        '  - 盘点单号：唯一标识，如ASSET-20240815001',
        '  - 盘点单状态：未确认/已开始/已结束',
        '  - 开始盘点时间：如24-08-26 11:37',
        '  - 结束盘点时间：如24-08-29 14:11',
        '  - 待盘RFID总容量：如RFID:50',
        '  - 目视盘点容量：如目视:30',
        '  - 扫描RFID容量：如盘点:0',
        '状态限制：',
        '  - 已结束状态：提示"该盘点单已经进入已结束状态，请选择未确认或者已开始的盘点单"',
        '  - 未确认/已开始状态：可以直接点击进入盘点状态',
        '资产信息：',
        '  - 设备编号：资产唯一编码',
        '  - 设备型号：设备具体型号',
        '  - 使用科室：设备所属科室',
        '  - 购置日期：设备购买时间',
        '  - 资产价值：设备账面价值'
      ],
      image: '/images/asset-inventory/asset-inventory.svg'
    },
    {
      id: 'scanning-process',
      title: '4、盘点扫描',
      priority: 'high',
      status: 'stable',
      description: 'RFID扫描盘点过程，支持资产设备RFID标签识别',
      technicalSpecs: {
        rfidSupport: 'UHF RFID 860-960MHz',
        assetTracking: '固定资产RFID标签',
        resumeSupport: '断点续盘功能'
      },
      details: [
        '开始盘点确认：',
        '  - 提示信息："确定要开始盘点吗？"',
        '  - 操作说明："点击确定，将开始本次盘点"',
        '  - 使用提示："请使用设备的扳机按键进行扫描"',
        '  - 续盘支持："在完成盘点前，可以支持断点续盘"',
        'RFID扫描功能：',
        '  - 自动识别：扫描到资产RFID标签自动识别',
        '  - 资产匹配：与资产管理系统中的设备信息匹配',
        '  - 数量累加：匹配成功的资产扫描数量自动+1',
        '  - 进度显示：实时显示盘点进度',
        '资产信息显示：',
        '  - 设备名称：扫描到的资产设备名称',
        '  - 设备编号：资产唯一编号',
        '  - 使用状态：设备当前使用状态',
        '  - 盘点状态：显示是否已完成盘点'
      ],
      image: '/images/asset-inventory/scanning-process.svg'
    },
    {
      id: 'complete-inventory',
      title: '5、结束盘点',
      priority: 'high',
      status: 'stable',
      description: '完成资产盘点操作，提交盘点结果到云平台系统',
      technicalSpecs: {
        dataSubmission: '一键提交到资产管理系统',
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
        '  - 数据提交：将盘点结果提交到资产管理系统',
        '  - 状态更新：盘点单状态更新为"已结束"',
        '  - 云平台同步：数据实时同步到云平台',
        '资产报告：',
        '  - 生成资产盘点详细报告',
        '  - 盘盈盘亏统计分析',
        '  - 资产使用状态更新'
      ],
      image: '/images/asset-inventory/complete-inventory.svg'
    }
  ],
  technicalSpecs: {
    platform: 'Android PDA',
    rfidSupport: 'UHF RFID 860-960MHz',
    networkRequirement: '主要使用生产环境内网',
    dataSync: '资产管理系统实时同步',
    assetTypes: '支持所有类型的固定资产',
    offlineMode: '断点续盘支持',
    cloudIntegration: '云平台数据同步'
  },
  keyFeatures: [
    '科室选择管理',
    '资产设备RFID盘点',
    '固定资产状态跟踪',
    '断点续盘功能',
    '资产盘点报告',
    '实时数据同步',
    '云平台集成'
  ]
}