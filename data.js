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
        items: ['重要通知', '游玩规定V2.0', '服务器性质通告']
    },
    {
        title: '人物志',
        icon: 'fa-user',
        items: ['南极洲丶刺玫', '弘桀孤影行', '小草zombie', '赤月', '曾面正面', '方解石', '野人偷吃保险', '小王不嘻嘻', '与枝沐霜']
    },
    {
        title: '公会档案',
        icon: 'fa-flag',
        items: ['公会档案', '末影秩序', '刺枚教', '逆熵']
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
        items: ['8.25', '8.26', '8.27', '8.28', '8.29', '8.30', '8.31', '9.1', '9.2', '9.3']
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
    { title: '公告', icon: 'fa-bullhorn', items: ['重要通知', '游玩规定V2.0', '服务器性质通告'] },
    { title: '人物志', icon: 'fa-user', items: ['南极洲丶刺玫', '弘桀孤影行', '小草zombie', '赤月', '曾面正面', '方解石', '野人偷吃保险', '小王不嘻嘻', '与枝沐霜'] },
    { title: '公会档案', icon: 'fa-flag', items: ['公会档案', '末影秩序', '刺枚教','逆熵'] },
    { title: '处理报告', icon: 'fa-gavel', items: ['禺密封禁报告', '对方解石回应', '方解石观察期', '三体人团伙封禁报告', '方解石举报曾面正面案', '12457878哈封禁报告'] },
    { title: '管理规定', icon: 'fa-book', items: ['游玩规定V2.0', '商店运营指导建议'] },
    { title: '工作日志', icon: 'fa-clipboard-list', items: ['8.25', '8.26', '8.27', '8.28', '8.29', '8.30', '8.31', '9.1', '9.2', '9.3'] },
    { title: '关于', icon: 'fa-info-circle', items: ['教学文档', '刺玫本设', '管理组介绍', '加入我们'] },
    { title: 'Wiki', icon: 'fa-book-open', items: ['关于Wiki', '教学文档', '净标计划', '更新日志'] }
];

// ============================================================
// 页面路径映射表
// ============================================================
var pagePathMap = {
    '重要通知': 'pages/announcements/重要通知.html',
    '游玩规定V2.0': 'pages/announcements/游玩规定V2.0.html',
    '服务器性质通告': 'pages/announcements/服务器性质通告.html',
    '南极洲丶刺玫': 'pages/characters/南极洲刺玫.html',
    '弘桀孤影行': 'pages/characters/弘桀孤影行.html',
    '小草zombie': 'pages/characters/小草zombie.html',
    '赤月': 'pages/characters/赤月.html',
    '曾面正面': 'pages/characters/曾面正面.html',
    '方解石': 'pages/characters/方解石.html',
    '野人偷吃保险': 'pages/characters/野人偷吃保险.html',
    '小王不嘻嘻': 'pages/characters/小王不嘻嘻.html',
    '与枝沐霜': 'pages/characters/与枝沐霜.html',
    '公会档案': 'pages/guilds/公会档案.html',
    '末影秩序': 'pages/guilds/末影秩序.html',
    '刺枚教': 'pages/guilds/刺枚教.html',
    '逆熵': 'pages/guilds/逆熵.html',
    '禺密封禁报告': 'pages/reports/禺密封禁报告.html',
    '对方解石回应': 'pages/reports/对方解石回应.html',
    '方解石观察期': 'pages/reports/方解石观察期.html',
    '三体人团伙封禁报告': 'pages/reports/三体人团伙封禁报告.html',
    '方解石举报曾面正面案': 'pages/reports/方解石举报曾面正面案.html',
    '12457878哈封禁报告': 'pages/reports/12457878哈封禁报告.html',
    '商店运营指导建议': 'pages/rules/商店运营指导建议.html',
    '管理员学习手册': 'pages/rules/管理员学习手册.html',
    '8.25': 'pages/logs/8.25.html',
    '8.26': 'pages/logs/8.26.html',
    '8.27': 'pages/logs/8.27.html',
    '8.28': 'pages/logs/8.28.html',
    '8.29': 'pages/logs/8.29.html',
    '8.30': 'pages/logs/8.30.html',
    '8.31': 'pages/logs/8.31.html',
    '9.1': 'pages/logs/9.1.html',
    '9.2': 'pages/logs/9.2.html',
    '9.3': 'pages/logs/9.3.html',
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

// ============================================================
// 搜索索引
// ============================================================
var searchIndex = [
    { key: '游玩规定V2.0', title: '游玩规定 V2.0', category: '公告', summary: '刺玫会服务器游玩规定修订版' },
    { key: '服务器性质通告', title: '服务器性质通告', category: '公告', summary: '关于服务器性质与游玩规定的强调' },
    { key: '禺密封禁报告', title: '禺密封禁报告', category: '处理报告', summary: '玩家禺密涉嫌使用作弊程序及异常财富积累' },
    { key: '三体人团伙封禁报告', title: '三体人团伙封禁报告', category: '处理报告', summary: '三体人涂蜡周三鼠利用漏洞刷取游戏资源' },
    { key: '12457878哈封禁报告', title: '12457878哈封禁报告', category: '处理报告', summary: '玩家12457878哈使用矿透作弊程序' },
    { key: '商店运营指导建议', title: '商店运营指导建议', category: '管理规定', summary: '服务器商店布局、定价及交易物品指导' },
    { key: '弘桀孤影行', title: '弘桀孤影行', category: '人物志', summary: '刺玫会管理员，负责制度建设与日常运营' },
    { key: '南极洲丶刺玫', title: '南极洲丶刺玫', category: '人物志', summary: '刺玫会服主，服务器创建者与主城建设者' },
    { key: '赤月', title: '赤月', category: '人物志', summary: '刺玫会管理员，服务器早期建设参与者' },
    { key: '小草zombie', title: '小草zombie', category: '人物志', summary: '刺玫会管理员，制作宣传视频与指令系统' },
    { key: '曾面正面', title: '曾面正面', category: '人物志', summary: '刺玫会前管理员' },
    { key: '方解石', title: '方解石', category: '人物志', summary: '刺玫教副会长，曾参与管理员竞选' },
    { key: '上坡上的土', title: '上坡上的土', category: '人物志', summary: '刺枚教会长' },
    { key: '野人偷吃保险', title: '野人偷吃保险', category: '人物志', summary: '服务器争议玩家' },
    { key: '管理组介绍', title: '管理组介绍', category: '关于', summary: '刺玫会管理团队介绍与管理原则' },
    { key: '加入我们', title: '加入我们', category: '关于', summary: '服务器入服指南与联系方式' },
    { key: '刺玫本设', title: '刺玫本设', category: '关于', summary: '服主南极洲丶刺玫的漫风画作设定' },
    { key: '公会档案', title: '公会档案', category: '公会档案', summary: '服务器所有公会总览' },
    { key: '末影秩序', title: '末影秩序', category: '公会档案', summary: '服务器首个公会，已隐退' },
    { key: '刺枚教', title: '刺枚教', category: '公会档案', summary: '服务器大型公会，拥有庞大基地与物资' },
    { key: '关于Wiki', title: '关于Wiki', category: 'Wiki', summary: '刺玫会Wiki项目定位、内容范围与技术信息' },
    { key: '教学文档', title: '教学文档', category: 'Wiki', summary: 'Wiki内容编写教学与HTML组件指南' },
    { key: '乱写文档', title: '乱写文档', category: 'Wiki', summary: 'CSS功能与渲染测试页面' },
    { key: '净标计划', title: '净标计划', category: 'Wiki', summary: 'Wiki视觉规范化项目，禁止使用Emoji' },
    { key: '更新日志', title: '更新日志', category: 'Wiki', summary: 'Wiki建站以来的所有版本更新记录' }
];
