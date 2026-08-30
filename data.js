// ============================================================
// 刺玫会 Wiki · 侧边栏菜单数据
// 版本：V2.1
// 日期：2026年8月30日
// ============================================================

// ============================================================
// 侧边栏菜单数据
// ============================================================
var sidebarMenu = [
    {
        title: '公告',
        icon: 'fa-bullhorn',
        items: ['游玩规定V2.0', '服务器性质通告']
    },
    {
        title: '处理报告',
        icon: 'fa-gavel',
        items: ['禺密封禁报告', '对方解石回应', '方解石观察期', '三体人团伙封禁报告', '方解石举报曾面正面案']
    },
    {
        title: '管理规定',
        icon: 'fa-book',
        items: ['游玩规定V2.0', '商店运营指导建议']
    },
    {
        title: '工作日志',
        icon: 'fa-clipboard-list',
        items: ['8.25', '8.26', '8.27', '8.28', '8.29', '8.30']
    },
    {
        title: '关于',
        icon: 'fa-info-circle',
        items: ['管理组介绍', '加入我们']
    }
];

function getMenuItems(category) {
    if (category.items.length > 0 && typeof category.items[0] === 'object') {
        return category.items;
    }
    return category.items.map(function(name) {
        return { name: name, indent: 0, display: displayNames[name] || name };
    });
}

// ============================================================
// 卡片数据
// ============================================================
var cardData = [
    { title: '公告', icon: 'fa-bullhorn', items: ['游玩规定V2.0', '服务器性质通告'] },
    { title: '处理报告', icon: 'fa-gavel', items: ['禺密封禁报告', '对方解石回应', '方解石观察期', '三体人团伙封禁报告', '方解石举报曾面正面案'] },
    { title: '管理规定', icon: 'fa-book', items: ['游玩规定V2.0', '商店运营指导建议'] },
    { title: '工作日志', icon: 'fa-clipboard-list', items: ['8.25', '8.26', '8.27', '8.28', '8.29', '8.30'] },
    { title: '关于', icon: 'fa-info-circle', items: ['管理组介绍', '加入我们'] }
];

// ============================================================
// 页面路径映射表
// ============================================================
var pagePathMap = {
    '游玩规定V2.0': 'pages/announcements/游玩规定V2.0.md',
    '服务器性质通告': 'pages/announcements/服务器性质通告.md',
    '禺密封禁报告': 'pages/reports/禺密封禁报告.md',
    '方解石回应': 'pages/reports/方解石回应.md',
    '方解石观察期': 'pages/reports/方解石观察期.md',
    '三体人涂蜡周三鼠封禁报告': 'pages/reports/三体人涂蜡周三鼠封禁报告.md',
    '方解石举报曾面正面案': 'pages/reports/方解石举报曾面正面案.md',
    '商店运营指导建议': 'pages/rules/商店运营指导建议.md',
    '8.25': 'pages/logs/8.25.md',
    '8.26': 'pages/logs/8.26.md',
    '8.27': 'pages/logs/8.27.md',
    '8.28': 'pages/logs/8.28.md',
    '8.29': 'pages/logs/8.29.md',
    '8.30': 'pages/logs/8.30.md',
    '管理组介绍': 'pages/about/管理组介绍.md',
    '加入我们': 'pages/about/加入我们.md'
};

// ============================================================
// 显示名称映射表（显示名 = 文件名，不需要映射）
// ============================================================
var displayNames = {};
