// ============================================================
// 刺玫会 Wiki · 侧边栏菜单数据
// 版本：V2.2
// 日期：2026年8月31日
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
        title: '人物志',
        icon: 'fa-user',
        items: ['南极洲丶刺玫', '弘桀孤影行', '小草zombie', '赤月', '曾面正面', '方解石', '野人偷吃保险']
    },
    {
        title: '公会档案',
        icon: 'fa-flag',
        items: ['公会档案', '末影秩序', '刺枚教']
    },
    {
        title: '处理报告',
        icon: 'fa-gavel',
        items: ['禺密封禁报告', '对方解石回应', '方解石观察期', '三体人团伙封禁报告', '方解石举报曾面正面案', '12457878哈封禁报告']
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
        items: ['刺玫本设', '管理组介绍', '加入我们']
    },
    {
        title: 'Wiki',
        icon: 'fa-book-open',
        items: ['关于Wiki', '教学文档', '净标计划', '更新日志']
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
    { title: '人物志', icon: 'fa-user', items: ['南极洲丶刺玫', '弘桀孤影行', '小草zombie', '赤月', '曾面正面', '方解石', '野人偷吃保险'] },
    { title: '公会档案', icon: 'fa-flag', items: ['公会档案', '末影秩序', '刺枚教'] },
    { title: '处理报告', icon: 'fa-gavel', items: ['禺密封禁报告', '对方解石回应', '方解石观察期', '三体人团伙封禁报告', '方解石举报曾面正面案', '12457878哈封禁报告'] },
    { title: '管理规定', icon: 'fa-book', items: ['游玩规定V2.0', '商店运营指导建议'] },
    { title: '工作日志', icon: 'fa-clipboard-list', items: ['8.25', '8.26', '8.27', '8.28', '8.29', '8.30'] },
    { title: '关于', icon: 'fa-info-circle', items: ['教学文档', '刺玫本设', '管理组介绍', '加入我们'] },
    { title: 'Wiki', icon: 'fa-book-open', items: ['关于Wiki', '教学文档', '净标计划', '更新日志'] }
];

// ============================================================
// 页面路径映射表
// ============================================================
var pagePathMap = {
    '游玩规定V2.0': 'pages/announcements/游玩规定V2.0.html',
    '服务器性质通告': 'pages/announcements/服务器性质通告.html',
    '南极洲丶刺玫': 'pages/characters/南极洲刺玫.html',
    '弘桀孤影行': 'pages/characters/弘桀孤影行.html',
    '小草zombie': 'pages/characters/小草zombie.html',
    '赤月': 'pages/characters/赤月.html',
    '曾面正面': 'pages/characters/曾面正面.html',
    '方解石': 'pages/characters/方解石.html',
    '野人偷吃保险': 'pages/characters/野人偷吃保险.html',
    '公会档案': 'pages/guilds/公会档案.html',
    '末影秩序': 'pages/guilds/末影秩序.html',
    '刺枚教': 'pages/guilds/刺枚教.html',
    '禺密封禁报告': 'pages/reports/禺密封禁报告.html',
    '对方解石回应': 'pages/reports/对方解石回应.html',
    '方解石观察期': 'pages/reports/方解石观察期.html',
    '三体人团伙封禁报告': 'pages/reports/三体人团伙封禁报告.html',
    '方解石举报曾面正面案': 'pages/reports/方解石举报曾面正面案.html',
    '12457878哈封禁报告': 'pages/reports/12457878哈封禁报告.html',
    '商店运营指导建议': 'pages/rules/商店运营指导建议.html',
    '8.25': 'pages/logs/8.25.html',
    '8.26': 'pages/logs/8.26.html',
    '8.27': 'pages/logs/8.27.html',
    '8.28': 'pages/logs/8.28.html',
    '8.29': 'pages/logs/8.29.html',
    '8.30': 'pages/logs/8.30.html',
    '乱写文档': 'pages/wiki/乱写文档.html',
    '刺玫本设': 'pages/about/刺玫本设.html',
    '管理组介绍': 'pages/about/管理组介绍.html',
    '加入我们': 'pages/about/加入我们.html',
    '关于Wiki': 'pages/wiki/关于Wiki.html',
    '教学文档': 'pages/wiki/教学文档.html',
    '净标计划': 'pages/wiki/净标计划.html',
    '更新日志': 'pages/wiki/更新日志.html',
};

// ============================================================
// 显示名称映射表（显示名 = 文件名，不需要映射）
// ============================================================
var displayNames = {};
