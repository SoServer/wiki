// ============================================================
// 刺玫会 Wiki · 短代码解析器
// 版本：V2.1
// 日期：2026年9月15日
// 功能：图标、文字样式、模板框、视口触发、自定义对齐
// ============================================================

// ============================================================
// 标准颜色映射表
// ============================================================
var COLOR_MAP = {
    'white': '#ffffff',
    'black': '#1a1a1a',
    'red': '#e74c3c',
    'green': '#27ae60',
    'blue': '#3498db',
    'yellow': '#f1c40f',
    'orange': '#e67e22',
    'purple': '#9b59b6',
    'pink': '#fd79a8',
    'gray': '#8a8a8a',
    'grey': '#8a8a8a',
    'brown': '#8B4513',
    'cyan': '#1abc9c',
    'gold': '#f39c12'
};

// ============================================================
// 图标映射表
// ============================================================
var ICON_MAP = {
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
// 缓动函数映射
// ============================================================
var EASE_MAP = {
    'linear': 'linear',
    'ease': 'ease',
    'ease-in': 'ease-in',
    'ease-out': 'ease-out',
    'ease-in-out': 'ease-in-out',
    'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)'
};

// ============================================================
// 解析颜色
// ============================================================
function parseColor(value) {
    if (!value) return '';
    var lower = value.toLowerCase().trim();
    return COLOR_MAP[lower] || value;
}

// ============================================================
// 解析样式参数
// ============================================================
function parseStyleParams(params) {
    var style = {};

    for (var i = 0; i < params.length; i++) {
        var p = params[i].trim();

        if (p.startsWith('size=')) {
            style['font-size'] = p.replace('size=', '') + 'px';
        } else if (p.startsWith('color=')) {
            style['color'] = parseColor(p.replace('color=', ''));
        } else if (p.startsWith('bg=')) {
            style['background'] = parseColor(p.replace('bg=', ''));
        } else if (p.startsWith('line-height=')) {
            style['line-height'] = p.replace('line-height=', '');
        } else if (p.startsWith('letter-spacing=')) {
            style['letter-spacing'] = p.replace('letter-spacing=', '') + 'px';
        } else if (p.startsWith('opacity=')) {
            style['opacity'] = p.replace('opacity=', '');
        } else if (p.startsWith('align=')) {
            style['text-align'] = p.replace('align=', '');
        } else if (p.startsWith('width=')) {
            style['width'] = p.replace('width=', '');
        } else if (p.startsWith('margin=')) {
            style['margin'] = p.replace('margin=', '');
        } else if (p.startsWith('padding=')) {
            style['padding'] = p.replace('padding=', '');
        } else if (p.startsWith('weight=')) {
            style['font-weight'] = p.replace('weight=', '');
        } else if (p.startsWith('font=')) {
            style['font-family'] = "'" + p.replace('font=', '') + "', var(--font-pixel)";
        } else if (p.startsWith('gradient=')) {
            var colors = p.replace('gradient=', '').split(',');
            var dir = 'to bottom';
            for (var j = 0; j < params.length; j++) {
                if (params[j].startsWith('gradient-dir=')) {
                    dir = params[j].replace('gradient-dir=', '');
                }
            }
            style['background'] = 'linear-gradient(' + dir + ', ' + colors.join(', ') + ')';
            style['-webkit-background-clip'] = 'text';
            style['-webkit-text-fill-color'] = 'transparent';
            style['background-clip'] = 'text';
        } else if (p === 'bold') {
            style['font-weight'] = '700';
        } else if (p === 'center') {
            style['text-align'] = 'center';
        } else if (p === 'right') {
            style['text-align'] = 'right';
        } else if (p === 'vertical') {
            style['writing-mode'] = 'vertical-rl';
            style['text-orientation'] = 'mixed';
        } else if (p.startsWith('rotate=')) {
            style['transform'] = 'rotate(' + p.replace('rotate=', '') + 'deg)';
        }
    }

    return style;
}

// ============================================================
// 样式对象转字符串
// ============================================================
function styleToString(style) {
    var parts = [];
    for (var key in style) {
        if (style.hasOwnProperty(key)) {
            parts.push(key + ':' + style[key]);
        }
    }
    return parts.join(';');
}

// ============================================================
// 解析对齐方式
// ============================================================
function parseAlign(value) {
    var map = {
        'top': 'top',
        'bottom': 'bottom',
        'middle': 'middle',
        'center': 'middle',
        'baseline': 'baseline',
        'text-top': 'text-top',
        'text-bottom': 'text-bottom'
    };
    return map[value] || 'middle';
}

// ============================================================
// 短代码处理器
// ============================================================
var SHORTCODE_HANDLERS = {

    // ========== 标题 ==========
    'h1': function(params, content) { return '<h1>' + content + '</h1>'; },
    'h2': function(params, content) { return '<h2>' + content + '</h2>'; },
    'h3': function(params, content) { return '<h3>' + content + '</h3>'; },
    'h4': function(params, content) { return '<h4>' + content + '</h4>'; },

    // ========== 文本 ==========
    'p': function(params, content) {
        var style = parseStyleParams(params);
        var s = styleToString(style);
        return '<p' + (s ? ' style="' + s + '"' : '') + '>' + content + '</p>';
    },
    'bold': function(params, content) { return '<strong>' + content + '</strong>'; },
    'italic': function(params, content) { return '<em>' + content + '</em>'; },
    'code': function(params, content) { return '<code>' + content + '</code>'; },
    'quote': function(params, content) { return '<blockquote>' + content + '</blockquote>'; },
    'br': function() { return '<br />'; },
    'hr': function() { return '<hr />'; },

    // ========== 列表 ==========
    'ul': function(params, content) { return '<ul>' + content + '</ul>'; },
    'ol': function(params, content) { return '<ol>' + content + '</ol>'; },
    'li': function(params, content) { return '<li>' + content + '</li>'; },

    // ========== 链接 ==========
    'link': function(params, content) {
        var url = params[0] || '#';
        var target = params.indexOf('blank') !== -1 ? ' target="_blank"' : '';
        return '<a href="' + url + '"' + target + '>' + content + '</a>';
    },

    // ========== 图片（支持对齐） ==========
    'img': function(params) {
        var src = params[0] || '';
        var alt = '';
        var size = '';
        var align = 'middle';

        for (var i = 1; i < params.length; i++) {
            var p = params[i];
            if (p.startsWith('size=')) {
                size = p.replace('size=', '');
            } else if (p.startsWith('alt=')) {
                alt = p.replace('alt=', '');
            } else if (p.startsWith('align=')) {
                align = parseAlign(p.replace('align=', ''));
            }
        }

        var style = 'vertical-align:' + align + ';';
        if (size) {
            style += 'width:' + size + 'px;height:' + size + 'px;';
        }
        style += 'image-rendering:pixelated;';

        return '<img src="' + src + '" alt="' + alt + '" style="' + style + '" />';
    },

    // ========== 提示框 ==========
    'msgbox': function(params, content) {
        var type = params[0] || 'info';
        var title = params[1] || '';
        var html = '<div class="msgbox ' + type + '">';
        if (title) {
            html += '<span class="msgbox-title">' + title + '</span>';
        }
        html += content + '</div>';
        return html;
    },

    // ========== 高亮框 ==========
    'highlight': function(params, content) {
        return '<div class="highlight-box">' + content + '</div>';
    },

    // ========== 信息网格 ==========
    'infogrid': function(params, content) {
        return '<div class="info-grid">' + content + '</div>';
    },
    'infogrid-item': function(params, content) {
        return '<span>' + content + '</span>';
    },

    // ========== 页脚 ==========
    'footnote': function(params, content) {
        return '<div class="footnote">' + content + '</div>';
    },

    // ========== 内联标签 ==========
    'tag': function(params, content) {
        var type = params[0] || 'info';
        return '<span class="tag ' + type + '">' + content + '</span>';
    },

    // ========== 表格 ==========
    'table': function(params, content) { return '<table>' + content + '</table>'; },
    'tr': function(params, content) { return '<tr>' + content + '</tr>'; },
    'th': function(params, content) {
        var style = parseStyleParams(params);
        var s = styleToString(style);
        return '<th' + (s ? ' style="' + s + '"' : '') + '>' + content + '</th>';
    },
    'td': function(params, content) {
        var style = parseStyleParams(params);
        var s = styleToString(style);
        return '<td' + (s ? ' style="' + s + '"' : '') + '>' + content + '</td>';
    },

    // ========== 图标 ==========
    'icon': function(params) {
        var name = params[0] || '';
        var size = '24';
        var align = 'middle';

        for (var i = 1; i < params.length; i++) {
            var p = params[i];
            if (p.startsWith('size=')) {
                size = p.replace('size=', '');
            } else if (p.startsWith('align=')) {
                align = parseAlign(p.replace('align=', ''));
            } else if (!isNaN(parseInt(p))) {
                size = p;
            }
        }

        var fileName = ICON_MAP[name];
        if (fileName) {
            return '<img src="assets/icons/' + fileName + '" alt="' + name + '" style="width:' + size + 'px;height:' + size + 'px;vertical-align:' + align + ';image-rendering:pixelated;" />';
        }
        return '{{icon|' + name + '}}';
    },

    // ========== 文字样式（含视口触发） ==========
    'text': function(params, content) {
        var textContent = content || params[0] || '';
        var styleParams = [];
        var time = 0.5;
        var delay = 0;
        var ease = 'ease';
        var margin = 0;
        var charMode = false;
        var interval = 0.08;

        for (var i = 0; i < params.length; i++) {
            var p = params[i];
            if (p.startsWith('time=')) {
                time = parseFloat(p.replace('time=', '')) || 0.5;
            } else if (p.startsWith('delay=')) {
                delay = parseFloat(p.replace('delay=', '')) || 0;
            } else if (p.startsWith('ease=')) {
                var easeVal = p.replace('ease=', '');
                ease = EASE_MAP[easeVal] || easeVal;
            } else if (p.startsWith('margin=')) {
                margin = parseInt(p.replace('margin=', '')) || 0;
            } else if (p === 'char') {
                charMode = true;
            } else if (p.startsWith('interval=')) {
                interval = parseFloat(p.replace('interval=', '')) || 0.08;
            } else {
                styleParams.push(p);
            }
        }

        var style = parseStyleParams(styleParams);
        var styleStr = styleToString(style);

        // 逐字模式
        if (charMode && textContent.length > 1) {
            var html = '';
            for (var c = 0; c < textContent.length; c++) {
                var charDelay = delay + c * interval;
                html += '<span style="display:inline-block;opacity:0;animation:fadeInText ' + time + 's ' + ease + ' ' + charDelay + 's forwards;' + styleStr + '">' + textContent[c] + '</span>';
            }
            return '<span data-text-margin="' + margin + '" style="display:inline-block;">' + html + '</span>';
        }

        // 整段模式
        return '<span data-text-margin="' + margin + '" style="display:inline-block;opacity:0;animation:fadeInText ' + time + 's ' + ease + ' ' + delay + 's forwards;' + styleStr + '">' + textContent + '</span>';
    },

    // ========== 逐字渐显 ==========
    'charlist': function(params, content) {
        var text = content || params[0] || '';
        var interval = 0.08;
        var time = 0.5;
        var delay = 0;
        var margin = 0;

        for (var i = 0; i < params.length; i++) {
            var p = params[i];
            if (p.startsWith('interval=')) {
                interval = parseFloat(p.replace('interval=', '')) || 0.08;
            } else if (p.startsWith('time=')) {
                time = parseFloat(p.replace('time=', '')) || 0.5;
            } else if (p.startsWith('delay=')) {
                delay = parseFloat(p.replace('delay=', '')) || 0;
            } else if (p.startsWith('margin=')) {
                margin = parseInt(p.replace('margin=', '')) || 0;
            }
        }

        var styleParams = [];
        for (var j = 0; j < params.length; j++) {
            if (params[j].indexOf('=') === -1 && params[j] !== 'char') {
                styleParams.push(params[j]);
            }
        }
        var style = parseStyleParams(styleParams);
        var styleStr = styleToString(style);

        var html = '';
        for (var c = 0; c < text.length; c++) {
            var charDelay = delay + c * interval;
            html += '<span style="display:inline-block;opacity:0;animation:fadeInText ' + time + 's ease ' + charDelay + 's forwards;' + styleStr + '">' + text[c] + '</span>';
        }
        return '<span data-text-margin="' + margin + '" style="display:inline-block;">' + html + '</span>';
    },

    // ========== 自定义容器 ==========
    'div': function(params, content) {
        var style = parseStyleParams(params);
        var className = '';
        for (var i = 0; i < params.length; i++) {
            if (params[i].startsWith('class=')) {
                className = params[i].replace('class=', '');
            }
        }
        var s = styleToString(style);
        return '<div' + (className ? ' class="' + className + '"' : '') + (s ? ' style="' + s + '"' : '') + '>' + content + '</div>';
    },

    // ========== 自定义 Span ==========
    'span': function(params, content) {
        var style = parseStyleParams(params);
        var s = styleToString(style);
        return '<span' + (s ? ' style="' + s + '"' : '') + '>' + content + '</span>';
    }
};

// ============================================================
// 注入动画关键帧
// ============================================================
var animationInjected = false;

function injectShortcodeAnimation() {
    if (animationInjected) return;
    animationInjected = true;
    var style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInText {
            0% { opacity: 0; transform: translateY(12px) scale(0.96); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// ============================================================
// 解析短代码
// ============================================================
function renderShortcodes(html) {
    if (!html) return html;

    injectShortcodeAnimation();

    var maxIterations = 10;
    var iteration = 0;

    while (iteration < maxIterations) {
        var before = html;

        html = html.replace(
            /\{\{([a-zA-Z0-9_-]+)((?:\|[^{}]*)*)\}\}/g,
            function(match, name, paramStr) {
                var handler = SHORTCODE_HANDLERS[name];
                if (!handler) return match;

                var params = [];
                if (paramStr) {
                    params = paramStr.split('|').map(function(p) {
                        return p.trim();
                    });
                }

                var content = '';
                if (handler.length >= 2) {
                    if (params.length > 0) {
                        var lastParam = params[params.length - 1];
                        var isKeyword = ['bold', 'center', 'right', 'vertical', 'blank'].indexOf(lastParam) !== -1;
                        var isParam = lastParam.indexOf('=') !== -1;
                        if (!isKeyword && !isParam && params.length > 1) {
                            content = params.pop();
                        } else if (params.length === 1 && !isKeyword && !isParam) {
                            content = params[0];
                            params = [];
                        }
                    }
                }

                return handler(params, content);
            }
        );

        if (html === before) break;
        iteration++;
    }

    return html;
}

// ============================================================
// 视口触发监听器
// ============================================================
var textObserverInitialized = false;

function initTextObservers() {
    if (textObserverInitialized) return;
    textObserverInitialized = true;

    var elements = document.querySelectorAll('[data-text-margin]');

    for (var j = 0; j < elements.length; j++) {
        var el = elements[j];
        var margin = parseInt(el.dataset.textMargin) || 0;
        var rootMargin = margin >= 0 ? '0px 0px -' + margin + 'px 0px' : '0px 0px ' + Math.abs(margin) + 'px 0px';

        var observer = new IntersectionObserver(function(entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    var target = entries[i].target;
                    // 恢复动画播放
                    var spans = target.querySelectorAll('span');
                    spans.forEach(function(span) {
                        var anim = span.style.animation;
                        if (anim) {
                            span.style.animation = '';
                            void span.offsetWidth;
                            span.style.animation = anim;
                        }
                    });
                    observer.unobserve(target);
                }
            }
        }, {
            threshold: 0.1,
            rootMargin: rootMargin
        });

        observer.observe(el);
    }
}

// ============================================================
// 主入口
// ============================================================
function renderAllShortcodes(container) {
    if (!container) container = document.body;

    // 1. 先处理短代码
    var html = container.innerHTML;
    var rendered = renderShortcodes(html);
    if (rendered !== html) {
        container.innerHTML = rendered;
    }

    // 2. 递归处理嵌套短代码
    var hasNewShortcodes = false;
    container.querySelectorAll('*').forEach(function(el) {
        if (el.children.length === 0 && el.innerHTML.indexOf('{{') !== -1) {
            hasNewShortcodes = true;
        }
    });
    if (hasNewShortcodes) {
        container.innerHTML = renderShortcodes(container.innerHTML);
    }

    // 3. 初始化视口监听
    setTimeout(initTextObservers, 100);
}

// ============================================================
// 导出
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        renderShortcodes: renderShortcodes,
        renderAllShortcodes: renderAllShortcodes,
        COLOR_MAP: COLOR_MAP,
        ICON_MAP: ICON_MAP
    };
}
