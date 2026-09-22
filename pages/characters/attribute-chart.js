// ============================================================
// 刺玫会 Wiki · 人物志六维属性图
// 版本：V1.0
// 日期：2026年9月22日
// ============================================================

(function() {
    // 默认属性
    var DEFAULT_ATTRIBUTES = ['拆家', '特性', 'PVP', '红石', '建筑', '肝度'];

    // 从 URL 获取当前页面 key
    function getCurrentPageKey() {
        var hash = window.location.hash;
        if (hash && hash.startsWith('#page-')) {
            return decodeURIComponent(hash.replace('#page-', ''));
        }
        return null;
    }

    // 加载 JSON
    function loadAttributes() {
        return fetch('pages/characters/attributes.json?' + Date.now())
            .then(function(response) {
                if (!response.ok) throw new Error('JSON 加载失败');
                return response.json();
            })
            .catch(function(error) {
                console.warn('[属性图] JSON 加载失败:', error);
                return null;
            });
    }

    // 解析属性
    function parseAttributes(data) {
        if (!data) return null;

        var attributes = DEFAULT_ATTRIBUTES;

        // 如果定义了 attributes 字段
        if (data.attributes) {
            if (Array.isArray(data.attributes) && data.attributes.length === 6) {
                attributes = data.attributes;
            } else {
                // 定义不全，静默失效
                console.warn('[属性图] attributes 定义不完整，静默失效');
                return null;
            }
        }

        return attributes;
    }

    // 绘制雷达图
    function drawChart(canvas, labels, values) {
        var ctx = canvas.getContext('2d');
        var dpr = window.devicePixelRatio || 1;
        var size = 360;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        canvas.style.width = size + 'px';
        canvas.style.height = size + 'px';
        ctx.scale(dpr, dpr);

        // 读取主题色
        var style = getComputedStyle(document.documentElement);
        var accent = style.getPropertyValue('--accent').trim() || '#8B4513';
        var textPrimary = style.getPropertyValue('--text-primary').trim() || '#1a1a1a';
        var borderColor = style.getPropertyValue('--border-color').trim() || '#d0d0c8';

        // 解析 accent 为 rgba
        var accentRgb = hexToRgb(accent);
        var gridColor = 'rgba(' + accentRgb + ', 0.15)';
        var fillColor = 'rgba(' + accentRgb + ', 0.25)';

        var center = size / 2;
        var radius = size * 0.35;
        var count = labels.length;
        var angleStep = (Math.PI * 2) / count;
        var startAngle = -Math.PI / 2;

        // 画网格
        var levels = 5;
        for (var l = 1; l <= levels; l++) {
            var r = (radius * l) / levels;
            ctx.beginPath();
            for (var i = 0; i < count; i++) {
                var angle = startAngle + i * angleStep;
                var x = center + r * Math.cos(angle);
                var y = center + r * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.strokeStyle = gridColor;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // 画轴线
        for (var i = 0; i < count; i++) {
            var angle = startAngle + i * angleStep;
            var x = center + radius * Math.cos(angle);
            var y = center + radius * Math.sin(angle);
            ctx.beginPath();
            ctx.moveTo(center, center);
            ctx.lineTo(x, y);
            ctx.strokeStyle = gridColor;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // 画数据区域
        ctx.beginPath();
        for (var i = 0; i < count; i++) {
            var angle = startAngle + i * angleStep;
            var r = (radius * values[i]) / 100;
            var x = center + r * Math.cos(angle);
            var y = center + r * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.strokeStyle = accent;
        ctx.lineWidth = 2;
        ctx.stroke();

        // 画数据点
        for (var i = 0; i < count; i++) {
            var angle = startAngle + i * angleStep;
            var r = (radius * values[i]) / 100;
            var x = center + r * Math.cos(angle);
            var y = center + r * Math.sin(angle);
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = accent;
            ctx.fill();
        }

        // 画标签
        ctx.font = '14px -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif';
        ctx.fillStyle = textPrimary;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (var i = 0; i < count; i++) {
            var angle = startAngle + i * angleStep;
            var labelRadius = radius + 28;
            var x = center + labelRadius * Math.cos(angle);
            var y = center + labelRadius * Math.sin(angle);
            ctx.fillText(labels[i], x, y);
        }
    }

    // hex 转 rgb
    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        if (hex.length === 3) {
            hex = hex.split('').map(function(c) { return c + c; }).join('');
        }
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);
        return r + ',' + g + ',' + b;
    }

    // 插入属性图到页面
    function insertChart(labels, values) {
        // 找到简介部分
        var docContent = document.querySelector('.doc-content');
        if (!docContent) return;

        // 查找 "简介" 标题
        var headings = docContent.querySelectorAll('h2');
        var introHeading = null;
        for (var i = 0; i < headings.length; i++) {
            if (headings[i].textContent.trim() === '简介') {
                introHeading = headings[i];
                break;
            }
        }
        if (!introHeading) return;

        // 创建属性图容器
        var wrapper = document.createElement('div');
        wrapper.className = 'attribute-chart-wrapper';

        var canvas = document.createElement('canvas');
        canvas.id = 'attrChart';
        wrapper.appendChild(canvas);

        // 插入到"简介"标题之后
        introHeading.parentNode.insertBefore(wrapper, introHeading.nextSibling);

        // 绘制
        drawChart(canvas, labels, values);
    }

    // 主流程
    function init() {
        var pageKey = getCurrentPageKey();
        if (!pageKey) return;

        // 只在人物志页面运行
        if (!window.location.hash.startsWith('#page-')) return;

        loadAttributes().then(function(data) {
            if (!data) return;

            var labels = parseAttributes(data);
            if (!labels) return;

            var values = data[pageKey];
            if (!values || !Array.isArray(values) || values.length !== 6) return;

            insertChart(labels, values);
        });
    }

    window.renderAttributeChart = init;

    // 首次加载时也执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 500);
    });
})();
