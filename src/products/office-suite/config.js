export const officeSuiteConfig = {
  id: 'office-suite',
  name: '办公套件',
  version: '2023.1',
  description: '企业办公软件套装',
  fullDescription: '集成文档处理、表格计算、演示制作等功能的综合办公软件，提供完整的办公解决方案。',
  category: 'PC软件',
  platform: ['Windows', 'macOS', 'Linux'],
  features: [
    {
      id: 'word-processor',
      title: '1. 文档处理',
      description: '专业的文档编辑和排版功能。',
      details: [
        '文本编辑：丰富的文本格式化选项，支持多种字体和样式',
        '模板库：内置多种文档模板，包括报告、简历、信函等',
        '协作编辑：多人同时编辑文档，实时同步修改',
        '版本控制：文档修改历史记录，支持版本回退',
        '导出功能：支持PDF、Word、HTML等多种格式导出'
      ]
    },
    {
      id: 'spreadsheet',
      title: '2. 表格计算',
      description: '强大的数据处理和分析工具。',
      details: [
        '数据处理：支持大量数据的导入、编辑和计算',
        '公式函数：内置数百种计算函数和公式',
        '图表制作：多种图表类型，数据可视化',
        '数据透视表：复杂数据分析和汇总',
        '宏编程：支持VBA宏编程，自动化处理'
      ]
    }
  ]
}