export const smartFridgeConfig = {
  id: 'smart-fridge-app',
  name: '智能冰箱APP',
  version: '1.5.2',
  description: '智能冰箱控制应用',
  fullDescription: '智能冰箱APP提供远程控制、温度监控、食材管理等智能化功能，让您的冰箱更加智能便捷。',
  category: 'APP软件',
  platform: ['iOS', 'Android'],
  features: [
    {
      id: 'remote-control',
      title: '1. 远程控制',
      description: '通过手机远程控制冰箱的各项功能。',
      details: [
        '温度调节：远程设置冷藏、冷冻室温度',
        '模式切换：节能模式、速冻模式、假期模式',
        '开关控制：远程开关冰箱电源',
        '定时功能：设置定时开关机',
        '智能诊断：远程检测冰箱运行状态'
      ]
    },
    {
      id: 'food-management',
      title: '2. 食材管理',
      description: '智能管理冰箱内的食材信息。',
      details: [
        '食材录入：扫码或手动添加食材信息',
        '保质期提醒：临期食材自动提醒',
        '营养分析：食材营养成分分析',
        '购物清单：根据库存生成购物建议',
        '菜谱推荐：基于现有食材推荐菜谱'
      ]
    }
  ]
}