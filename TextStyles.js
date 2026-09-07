// ============================================================
// 刺玫会 Wiki · 文字样式短代码渲染
// 版本：V1.0
// 日期：2026年9月7日
// ============================================================

// ============================================================
// 默认样式配置
// ============================================================
var defaultTextStyle = {
    size: 24,
    color: 'var(--text-primary)',
    time: 0.5,
    delay: 0,
    ease: 'ease',
    font: null,
    gradient: null,
    vertical: false,
    rotate: 0,
    margin: 0
};

// ============================================================
// 解析短代码参数
// ============================================================
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
        } else if (p.startsWith('margin=')) {
            config.margin = parseInt(p.replace('margin=', '')) || 0;
        }
    }
    return config;
}

// ============================================================
// 注入动画关键帧（只执行一次）
// ============================================================
var textAnimationInjected = false;

function injectTextAnimation() {
    if (textAnimationInjected) return;
    textAnimationInjected = true;
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
// 渲染文字样式短代码
// ============================================================
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
            var margin = config.margin || 0;

            var styles = [];
            styles.push('display:inline-block');
            styles.push('font-size:' + size + 'px');
            styles.push('opacity:0');  // 初始隐藏，由 Observer 触发显示

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

            var uid = 'text-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6);

            injectTextAnimation();

            var dataAttrs = 'data-text-uid="' + uid + '" ' +
                            'data-text-time="' + time + '" ' +
                            'data-text-delay="' + delay + '" ' +
                            'data-text-ease="' + ease + '" ' +
                            'data-text-margin="' + margin + '"';

            return '<span class="text-style-' + uid + '" ' + dataAttrs + ' style="' + styles.join(';') + ';">' + text + '</span>';
        }
    );

    // 初始化视口监听
    initTextObservers();
}

// ============================================================
// 视口监听器 - 为每个元素独立控制触发时机
// ============================================================
var textObserverInitialized = false;

function initTextObservers() {
    if (textObserverInitialized) return;
    textObserverInitialized = true;

    var elements = document.querySelectorAll('[data-text-uid]');

    for (var j = 0; j < elements.length; j++) {
        var el = elements[j];
        var margin = parseInt(el.dataset.textMargin) || 0;
        // margin 正值 = 提前触发（减去 px），负值 = 延后触发（加上 px）
        var rootMargin = margin >= 0 ? '0px 0px -' + margin + 'px 0px' : '0px 0px ' + Math.abs(margin) + 'px 0px';

        var observer = new IntersectionObserver(function(entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    var target = entries[i].target;
                    var time = parseFloat(target.dataset.textTime) || 0.5;
                    var delay = parseFloat(target.dataset.textDelay) || 0;
                    var ease = target.dataset.textEase || 'ease';

                    target.style.animation = 'fadeInText ' + time + 's ' + ease + ' ' + delay + 's forwards';
                    target.style.opacity = '';
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
