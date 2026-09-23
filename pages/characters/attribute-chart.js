// ============================================================
// 刺玫会 Wiki · 人物志六维属性图
// 版本：V2.0
// 日期：2026年9月23日
// 逻辑：找到 .attribute-chart 占位符，替换为雷达图
// ============================================================

(function() {
    var DEFAULT_ATTRIBUTES = ['拆家', '特性', 'PVP', '红石', '建筑', '肝度'];
    var cachedData = null;

    // 加载 JSON（缓存，避免重复请求）
    function loadAttributes() {
        if (cachedData) return Promise.resolve(cachedData);
        return fetch('pages/characters/attributes.json?' + Date.now())
            .then(function(response) {
                if (!response.ok) throw new Error('JSON 加载失败');
                return response.json();
            })
            .then(function(data) {
                cachedData = data;
                return data;
            })
            .catch(function(error) {
                console.warn('[属性图] JSON 加载失败:', error);
                return null;
            });
    }

    // 解析属性名
    function parseAttributes(data) {
        if (!data) return null;
        if (data.attributes) {
            if (Array.isArray(data.attributes) && data.attributes.length === 6) {
                return data.attributes;
            }
            console.warn('[属性图] attributes 定义不完整，静默失效');
            return null;
        }
        return DEFAULT_ATTRIBUTES;
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

        var style = getComputedStyle(document.documentElement);
        var accent = style.getPropertyValue('--accent').trim() || '#8B4513';
        var textPrimary = style.getPropertyValue('--text-primary').trim() || '#1a1a1a';

        var accentRgb = hexToRgb(accent);
        var gridColor = 'rgba(' + accentRgb + ', 0.15)';
        var fillColor = 'rgba(' + accentRgb + ', 0.25)';

        var center = size / 2;
        var radius = size * 0.35;
        var count = labels.length;
        var angleStep = (Math.PI * 2) / count;
        var startAngle = -Math.PI / 2;

        // 网格
        for (var l = 1; l <= 5; l++) {
            var r = (radius * l) / 5;
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

        // 轴线
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

        // 数据区域
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

        // 数据点
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

        // 标签
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

    // 渲染所有占位符
    function renderCharts() {
        var placeholders = document.querySelectorAll('.attribute-chart');
        if (placeholders.length === 0) return;

        loadAttributes().then(function(data) {
            if (!data) return;

            var labels = parseAttributes(data);
            if (!labels) return;

            placeholders.forEach(function(placeholder) {
                var key = placeholder.getAttribute('data-attr');
                if (!key) return;

                var values = data[key];
                if (!values || !Array.isArray(values) || values.length !== 6) {
                    console.warn('[属性图] 未找到数据:', key);
                    return;
                }

                // 清空占位符
                placeholder.innerHTML = '';

                // 创建 canvas
                var canvas = document.createElement('canvas');
                placeholder.appendChild(canvas);

                // 绘制
                drawChart(canvas, labels, values);
            });
        });
    }

    // 暴露给外部调用
    window.renderAttributeChart = renderCharts;

    // 首次加载时也执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(renderCharts, 300);
        });
    } else {
        setTimeout(renderCharts, 300);
    }
})();
