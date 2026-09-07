// ============================================================
// 文字样式短代码渲染
// ============================================================

// 默认样式配置
var defaultTextStyle = {
    size: 24,
    color: 'var(--text-primary)',
    time: 0.5,
    delay: 0,
    ease: 'ease',
    font: null,
    gradient: null,
    vertical: false,
    rotate: 0
};

// 支持的字体列表（用于预加载检查）
var availableFonts = ['FusionPixel', 'PixelifySans'];

// 解析参数
function parseTextParams(params) {
    var config = {};
    for (var i = 0; i < params.length; i++) {
        var p = params[i].trim();
        if (p === 'vertical') {
            config.vertical = true;
        } else if (p.startsWith('size=')) {
            config.size = parseInt(p.replace('size=', '')) || 24;
        } else if (p.startsWith('color=')) {
            config.color = p.replace('color=', '');
        } else if (p.startsWith('time=')) {
            config.time = parseFloat(p.replace('time=', '')) || 0.5;
        } else if (p.startsWith('delay=')) {
            config.delay = parseFloat(p.replace('delay=', '')) || 0;
        } else if (p.startsWith('ease=')) {
            config.ease = p.replace('ease=', '');
        } else if (p.startsWith('font=')) {
            config.font = p.replace('font=', '');
        } else if (p.startsWith('gradient=')) {
            config.gradient = p.replace('gradient=', '').split(',').map(function(s) { return s.trim(); });
        } else if (p.startsWith('rotate=')) {
            config.rotate = parseFloat(p.replace('rotate=', '')) || 0;
        }
    }
    return config;
}

// 渲染文字样式
function renderTextStyles(container) {
    if (!container) container = document.body;
    var html = container.innerHTML;

    // 匹配 [text:内容:参数1:参数2:...]
    container.innerHTML = html.replace(
        /\[text:([^:\]]+)(?::([^\]]*))?\]/g,
        function(match, text, paramStr) {
            var params = paramStr ? paramStr.split(':') : [];
            var config = parseTextParams(params);

            // 合并默认值
            var size = config.size || defaultTextStyle.size;
            var color = config.color || defaultTextStyle.color;
            var time = config.time || defaultTextStyle.time;
            var delay = config.delay || defaultTextStyle.delay;
            var ease = config.ease || defaultTextStyle.ease;
            var font = config.font || defaultTextStyle.font;
            var gradient = config.gradient || defaultTextStyle.gradient;
            var vertical = config.vertical || false;
            var rotate = config.rotate || 0;

            var styles = [];
            styles.push('display:inline-block');
            styles.push('font-size:' + size + 'px');
            styles.push('animation:fadeInText ' + time + 's ' + ease + ' ' + delay + 's forwards');
            styles.push('opacity:0');
            if (rotate !== 0) {
                styles.push('transform:rotate(' + rotate + 'deg)');
            }
            if (vertical) {
                styles.push('writing-mode:vertical-rl');
                styles.push('text-orientation:mixed');
            }
            if (font) {
                styles.push('font-family:\'' + font + '\', var(--font-pixel)');
            }
            if (gradient && gradient.length >= 2) {
                var gradientStr = 'linear-gradient(' + gradient.join(', ') + ')';
                styles.push('background:' + gradientStr);
                styles.push('-webkit-background-clip:text');
                styles.push('-webkit-text-fill-color:transparent');
                styles.push('background-clip:text');
            } else {
                styles.push('color:' + color);
            }

            // 额外兼容：如果是渐变，文字颜色用透明
            var textColorStyle = (gradient && gradient.length >= 2) ? '' : 'color:' + color + ';';

            // 生成唯一类名（用于动画）
            var uid = 'text-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4);

            // 将动画定义注入到页面（只注入一次）
            injectTextAnimation();

            return '<span class="text-style-' + uid + '" style="' + styles.join(';') + ';">' + text + '</span>';
        }
    );
}

// 注入动画定义（只执行一次）
var textAnimationInjected = false;

function injectTextAnimation() {
    if (textAnimationInjected) return;
    textAnimationInjected = true;
    var style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInText {
            0% { opacity: 0; transform: translateY(10px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        /* 默认兼容：即使不写任何参数，也能有淡入效果 */
        .text-style-base {
            display: inline-block;
            animation: fadeInText 0.5s ease forwards;
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
}
