// ============================================================
// 刺玫会 Wiki · 图标短代码映射表
// 维护说明：新增图标时在此文件中添加对应条目即可
// 调用方式：[icon:中文名]
// ============================================================

var iconMap = {
    '附魔台': 'Enchanting_Table.gif',
    '附魔台2': 'Enchanting_Table_2.png',
    '讲台': 'Lectern_Book.png',
    '书': 'Book.png',
    '书架': 'Bookshelf.png',
    '成书': 'Written_Book.png',
    '铁镐': 'Iron_Pickaxe.png',
    '结构方块': 'Structure_Block_1.png',
    '结构方块保存': 'Structure_Block_2.png',
    '结构方块加载': 'Structure_Block_3.png',
    '信标': 'Beacon.png',
    '龙蛋': 'Dragon_Egg.png',
    '龙首': 'Dragon_Head.png',
    '爬行者头颅': 'Creeper_Head.png',
    '玩家头颅': 'Player_Head.png',
    '基岩': 'Bedrock.png',
    '工作台': 'Crafting_Table.png',
    '熔炉': 'Furnace.png',
    '燃烧熔炉': 'Lit_Furnace.png',
    '合金升级': 'NUST.png',
    '书与笔': 'Book_and_Quill.png',
    '命令方块': 'Command_Block.png',
    '连锁命令方块': 'Chain_Command_Block.png',
    '循环命令方块': 'Repeating_Command_Block.png'
};

// ============================================================
// 图标渲染函数
// 用法：renderIcons(container)
// 将指定容器内的 [icon:中文名] 替换为对应的图片
// ============================================================
function renderIcons(container) {
    if (!container) container = document.body;
    var html = container.innerHTML;
    container.innerHTML = html.replace(
        /\[icon:([^\]]+)\]/g,
        function(match, name) {
            var fileName = iconMap[name.trim()];
            if (fileName) {
                return '<img src="/assets/icons/' + fileName + '" alt="' + name + '" style="width:24px;height:24px;vertical-align:middle;image-rendering:pixelated;" />';
            }
            console.warn('[图标映射] 未找到图标: ' + name);
            return match;
        }
    );
}
