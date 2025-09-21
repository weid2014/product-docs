export const cmsSystemConfig = {
  id: 'cms-system',
  name: '内容管理系统',
  version: '3.2.1',
  description: '企业级CMS平台',
  fullDescription: '提供内容创建、发布、管理的一站式解决方案，支持多站点管理和个性化定制。',
  category: 'WEB软件',
  platform: ['Web Browser'],
  features: [
    {
      id: 'content-editor',
      title: '1. 内容编辑器',
      description: '所见即所得的内容编辑功能。',
      details: [
        '富文本编辑：支持图文混排，所见即所得编辑',
        '媒体管理：图片、视频上传管理，支持CDN加速',
        'SEO优化：内置SEO优化工具，提升搜索排名',
        '多语言支持：国际化内容管理，多语言站点',
        '模板系统：灵活的模板系统，快速建站'
      ]
    },
    {
      id: 'user-management',
      title: '2. 用户管理',
      description: '完善的用户权限管理系统。',
      details: [
        '角色权限：基于角色的权限控制系统',
        '用户组织：支持部门、组织架构管理',
        '单点登录：支持SSO单点登录集成',
        '审批流程：内容发布审批工作流',
        '操作日志：完整的用户操作审计日志'
      ]
    }
  ]
}