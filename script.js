// ============================================================
// 刺玫会 Wiki · 侧边栏与交互脚本
// 版本：V2.4
// 日期：2026年9月10日
// ============================================================

// ============================================================
// 1. 侧边栏（双端）
// ============================================================
function renderSidebar() {
    var desktopSidebar = document.getElementById('desktopSidebar');
    var mobileMenuList = document.getElementById('mobileMenuList');

    if (!desktopSidebar || !mobileMenuList) {
        console.warn('[刺玫会 Wiki] 侧边栏容器未找到');
        return;
    }

    var html = '';
    sidebarMenu.forEach(function(category) {
        var items = getMenuItems(category);
        html += '<li class="category">';
        html += '<span class="category-toggle"><i class="fas ' + category.icon + '"></i> ' + category.title + '</span>';
        html += '<ul class="sub-menu">';
        items.forEach(function(item) {
            var displayName = item.display || displayNames[item.name] || item.name;
            var indent = item.indent || 0;
            var style = indent > 0 ? 'padding-left:' + (1.2 + (indent - 1) * 0.8) + 'rem;font-size:clamp(0.8rem, 0.9vw, 0.9rem);color:var(--text-muted);' : '';
            html += '<li style="' + style + '"><a href="#page-' + item.name + '">' + displayName + '</a></li>';
        });
        html += '</ul></li>';
    });

    desktopSidebar.innerHTML = '<nav class="sidebar-nav"><ul>' + html + '</ul></nav>';
    mobileMenuList.innerHTML = html;

    initSidebarEvents();
    initHashHighlight();
}

// ============================================================
// 2. 侧边栏展开/折叠事件
// ============================================================
function initSidebarEvents() {
    document.querySelectorAll('.category-toggle').forEach(function(toggle) {
        toggle.removeEventListener('click', handleToggle);
        toggle.addEventListener('click', handleToggle);
    });

    document.querySelectorAll('.sub-menu a').forEach(function(link) {
        link.removeEventListener('click', handleLinkClick);
        link.addEventListener('click', handleLinkClick);
    });
}

function handleToggle(e) {
    e.stopPropagation();
    var parent = this.closest('.category');
    var sub = parent.querySelector('.sub-menu');
    if (sub) {
        sub.classList.toggle('open');
        this.classList.toggle('open');
    }
}

function handleLinkClick(e) {
    var href = this.getAttribute('href');
    if (href && href.startsWith('#page-')) {
        e.preventDefault();
        if (typeof window.loadPage === 'function') {
            window.loadPage(href.replace('#page-', ''));
        }
        closeSidebarIfMobile();
    }
}

// ============================================================
// 3. 移动端侧边栏控制（汉堡菜单）
// ============================================================
function closeSidebarIfMobile() {
    if (window.innerWidth < 769) {
        var sidebar = document.getElementById('mobileSidebar');
        var hamburger = document.getElementById('hamburgerBtn');
        var overlay = document.getElementById('mobileOverlay');
        if (sidebar) sidebar.classList.remove('open');
        if (hamburger) hamburger.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function initHamburger() {
    var hamburger = document.getElementById('hamburgerBtn');
    var sidebar = document.getElementById('mobileSidebar');
    var overlay = document.getElementById('mobileOverlay');

    if (!hamburger || !sidebar || !overlay) {
        console.warn('[刺玫会 Wiki] 汉堡菜单元素未找到');
        return;
    }

    function toggleSidebar(e) {
        e.stopPropagation();
        var isOpen = sidebar.classList.toggle('open');
        hamburger.classList.toggle('open');
        overlay.classList.toggle('active');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        hamburger.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.removeEventListener('click', toggleSidebar);
    hamburger.addEventListener('click', toggleSidebar);

    overlay.removeEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    window.removeEventListener('resize', handleResize);
    window.addEventListener('resize', handleResize);
}

function handleResize() {
    if (window.innerWidth >= 769) {
        var sidebar = document.getElementById('mobileSidebar');
        var hamburger = document.getElementById('hamburgerBtn');
        var overlay = document.getElementById('mobileOverlay');
        if (sidebar) sidebar.classList.remove('open');
        if (hamburger) hamburger.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================================
// 4. URL 哈希与侧边栏高亮同步
// ============================================================
function initHashHighlight() {
    var hash = window.location.hash;
    if (hash && hash.startsWith('#page-')) {
        var pageId = decodeURIComponent(hash.replace('#page-', ''));
        updateActiveState(pageId);
    }
}

function updateActiveState(pageId) {
    document.querySelectorAll('.sub-menu a, .card-list li').forEach(function(el) {
        el.classList.remove('active');
    });
    document.querySelectorAll('.sub-menu a[href="#page-' + pageId + '"]').forEach(function(el) {
        el.classList.add('active');
        var parentSub = el.closest('.sub-menu');
        if (parentSub) {
            parentSub.classList.add('open');
            var parentToggle = parentSub.closest('.category').querySelector('.category-toggle');
            if (parentToggle) {
                parentToggle.classList.add('open');
            }
        }
    });
    document.querySelectorAll('.card-list li[data-page="' + pageId + '"]').forEach(function(el) {
        el.classList.add('active');
    });
}

window.addEventListener('hashchange', function() {
    var hash = window.location.hash;
    if (hash && hash.startsWith('#page-')) {
        var pageId = decodeURIComponent(hash.replace('#page-', ''));
        updateActiveState(pageId);
    } else {
        document.querySelectorAll('.sub-menu a, .card-list li').forEach(function(el) {
            el.classList.remove('active');
        });
    }
});

// ============================================================
// 5. 登录状态同步（顶部栏 + 侧边栏）
// ============================================================
function updateAuthUI() {
    var token = localStorage.getItem('token');
    var username = localStorage.getItem('username');

    var loginBtn = document.getElementById('loginBtn');
    var logoutBtn = document.getElementById('logoutBtn');
    var userDisplay = document.getElementById('userDisplay');
    var usernameDisplay = document.getElementById('usernameDisplay');

    var sidebarUser = document.getElementById('sidebarUser');
    var sidebarUsername = document.getElementById('sidebarUsername');
    var sidebarLoginBtn = document.getElementById('sidebarLoginBtn');
    var sidebarLogoutBtn = document.getElementById('sidebarLogoutBtn');

    if (token && username) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline-flex';
        if (userDisplay) userDisplay.style.display = 'inline-block';
        if (usernameDisplay) usernameDisplay.textContent = username;

        if (sidebarUser) sidebarUser.style.display = 'flex';
        if (sidebarUsername) sidebarUsername.textContent = username;
        if (sidebarLoginBtn) sidebarLoginBtn.style.display = 'none';
        if (sidebarLogoutBtn) sidebarLogoutBtn.style.display = 'inline';
    } else {
        if (loginBtn) loginBtn.style.display = 'inline-flex';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (userDisplay) userDisplay.style.display = 'none';

        if (sidebarUser) sidebarUser.style.display = 'none';
        if (sidebarLoginBtn) sidebarLoginBtn.style.display = 'inline';
        if (sidebarLogoutBtn) sidebarLogoutBtn.style.display = 'none';
    }
}

// ============================================================
// 6. 房间号显示逻辑
// ============================================================
function initRoomStatus() {
    var banner = document.getElementById('roomBanner');
    var roomNumberDisplay = document.getElementById('roomNumberDisplay');

    if (!banner || !roomNumberDisplay) {
        console.warn('[刺玫会 Wiki] 房间号元素未找到');
        return;
    }

    fetch('room_number.txt?' + Date.now())
        .then(function(response) {
            if (!response.ok) throw new Error('文件不存在');
            return response.text();
        })
        .then(function(text) {
            var match = text.match(/setroomnumber:"([^"]+)"/);
            if (match && match[1]) {
                roomNumberDisplay.textContent = match[1];
                banner.classList.add('show');
            } else {
                banner.classList.remove('show');
                console.log('[刺玫会 Wiki] room_number.txt 格式错误，未找到有效房间号');
            }
        })
        .catch(function() {
            banner.classList.remove('show');
            console.log('[刺玫会 Wiki] room_number.txt 未找到，房间号横幅已隐藏');
        });
}

// ============================================================
// 7. 页面加载时保持侧边栏状态（保持展开/折叠记忆）
// ============================================================
function restoreSidebarState() {
    var state = sessionStorage.getItem('sidebar_state');
    if (!state) return;

    try {
        var data = JSON.parse(state);
        data.forEach(function(item) {
            var toggles = document.querySelectorAll('.category-toggle');
            toggles.forEach(function(toggle) {
                var parent = toggle.closest('.category');
                var sub = parent.querySelector('.sub-menu');
                if (sub && sub.id === item.id) {
                    if (item.open) {
                        sub.classList.add('open');
                        toggle.classList.add('open');
                    }
                }
            });
        });
    } catch (e) {
        // 忽略解析错误
    }
}

// 在切换侧边栏时保存状态
function saveSidebarState() {
    var items = [];
    document.querySelectorAll('.category').forEach(function(cat) {
        var sub = cat.querySelector('.sub-menu');
        var toggle = cat.querySelector('.category-toggle');
        if (sub) {
            items.push({
                id: sub.id || 'sub-' + Math.random().toString(36).substr(2, 6),
                open: sub.classList.contains('open')
            });
            if (!sub.id) {
                sub.id = items[items.length - 1].id;
            }
        }
    });
    sessionStorage.setItem('sidebar_state', JSON.stringify(items));
}

// ============================================================
// 搜索功能
// ============================================================

function performSearch(query) {
    if (!query || query.trim() === '') {
        return [];
    }
    query = query.trim().toLowerCase();
    var results = [];
    for (var i = 0; i < searchIndex.length; i++) {
        var item = searchIndex[i];
        var score = 0;
        var titleLower = item.title.toLowerCase();
        var summaryLower = (item.summary || '').toLowerCase();
        if (titleLower.includes(query)) {
            score += 10;
        }
        if (summaryLower.includes(query)) {
            score += 3;
        }
        if (item.keywords) {
            for (var j = 0; j < item.keywords.length; j++) {
                if (item.keywords[j].toLowerCase().includes(query)) {
                    score += 5;
                    break;
                }
            }
        }
        if (score > 0) {
            results.push({
                key: item.key,
                title: item.title,
                category: item.category || '',
                summary: item.summary || '',
                score: score
            });
        }
    }
    results.sort(function(a, b) {
        return b.score - a.score;
    });
    return results;
}

function renderSearchResults(results) {
    var container = document.getElementById('searchResults');
    if (!container) return;

    var isMobile = window.innerWidth < 769;

    // 清空容器
    container.innerHTML = '';

    // 手机端：添加头部搜索框
    if (isMobile) {
        var header = document.createElement('div');
        header.className = 'search-mobile-header';
        header.id = 'searchMobileHeader';
        header.innerHTML = `
            <div class="search-wrapper mobile-search-wrapper">
                <input type="text" id="searchMobileInput" placeholder="搜索 Wiki..." />
                <button id="searchMobileBtn"><i class="fas fa-search"></i></button>
            </div>
            <button class="search-mobile-close" id="searchMobileClose">
                <i class="fas fa-times"></i>
            </button>
        `;
        container.appendChild(header);

        // 手机端输入框与主输入框同步
        var mobileInput = document.getElementById('searchMobileInput');
        var mainInput = document.getElementById('searchInput');
        var mobileClose = document.getElementById('searchMobileClose');

        if (mobileInput && mainInput) {
            // 初始同步
            mobileInput.value = mainInput.value;
            // 手机端输入时同步到主输入框并触发搜索
            mobileInput.addEventListener('input', function() {
                mainInput.value = this.value;
                var event = new Event('input', { bubbles: true });
                mainInput.dispatchEvent(event);
            });
        }

        if (mobileClose) {
            mobileClose.addEventListener('click', function() {
                closeSearch();
            });
        }

        // 自动聚焦到主输入框（手机端会弹出键盘）
        setTimeout(function() {
            if (mainInput) {
                mainInput.focus();
                mainInput.select();
            }
        }, 100);
    }

// 渲染结果（电脑端和手机端共用）
if (results.length === 0) {
    var noResult = document.createElement('div');
    noResult.className = 'no-result';
    noResult.textContent = '未找到相关页面';
    container.appendChild(noResult);
    container.classList.add('show');
    if (isMobile) {
        document.body.style.overflow = 'hidden';
    }
    return;
}

for (var i = 0; i < results.length; i++) {
    var r = results[i];
    var item = document.createElement('div');
    item.className = 'result-item';
    item.dataset.key = r.key;
    item.innerHTML = '<span class="result-title">' + r.title + '</span>' +
        (r.category ? '<span class="result-category">' + r.category + '</span>' : '') +
        (r.summary ? '<span class="result-summary">' + r.summary + '</span>' : '');
    container.appendChild(item);

    item.addEventListener('click', function() {
        var key = this.dataset.key;
        if (key && typeof loadPage === 'function') {
            loadPage(key);
            closeSearch();
        }
    });
}
container.classList.add('show');
if (isMobile) {
    document.body.style.overflow = 'hidden';
}
}

function closeSearch() {
    var container = document.getElementById('searchResults');
    if (container) {
        container.classList.remove('show');
    }
    document.body.style.overflow = '';
    var input = document.getElementById('searchInput');
    if (input) {
        input.blur();
    }
    var mobileInput = document.getElementById('searchMobileInput');
    if (mobileInput) {
        mobileInput.blur();
    }
}

function initSearch() {
    var input = document.getElementById('searchInput');
    var btn = document.getElementById('searchBtn');
    var container = document.getElementById('searchResults');

    if (!input) return;

    input.addEventListener('input', function() {
        var results = performSearch(this.value);
        renderSearchResults(results);
    });

    if (btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            var results = performSearch(input.value);
            renderSearchResults(results);
        });
    }

    document.addEventListener('click', function(e) {
        var wrapper = document.querySelector('.search-wrapper');
        var mobileHeader = document.getElementById('searchMobileHeader');
        var isClickInside = (wrapper && wrapper.contains(e.target)) ||
                            (mobileHeader && mobileHeader.contains(e.target));
        if (!isClickInside && container) {
            container.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            var isMobile = window.innerWidth < 769;
            if (isMobile) {
                input.focus();
                input.select();
                var results = performSearch(input.value);
                renderSearchResults(results);
            } else if (input) {
                input.focus();
                input.select();
            }
        }
        if (e.key === 'Escape') {
            closeSearch();
        }
    });
}

// ============================================================
// 8. DOM 就绪初始化
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    if (typeof sidebarMenu !== 'undefined' && typeof getMenuItems === 'function') {
        renderSidebar();
    } else {
        console.warn('[刺玫会 Wiki] sidebarMenu 或 getMenuItems 未定义，请确保 data.js 已加载');
    }

    initHamburger();
    initRoomStatus();
    updateAuthUI();

    if (typeof initSearch === 'function') {
        initSearch();
    }

    setTimeout(restoreSidebarState, 100);

    document.addEventListener('click', function(e) {
        if (e.target.closest('.category-toggle')) {
            setTimeout(saveSidebarState, 50);
        }
    });
});

// 热门搜索数据（手动维护）
var SLIDER_INTERVAL = 5000;

var hotSearches = [
    { key: '游玩规定V2.0', label: '游玩规定 V2.0', icon: 'fa-gavel' },
    { key: '加入我们', label: '加入我们', icon: 'fa-info-circle' },
    { key: '管理组介绍', label: '管理组介绍', icon: 'fa-users' },
    { key: '公会档案', label: '公会档案', icon: 'fa-flag' },
    { key: '南极洲丶刺玫', label: '南极洲丶刺玫', icon: 'fa-user' }
];

// 通用轮播渲染器
function renderSlider(containerId, trackId, dotsId, items, getItemHtml) {
    var container = document.getElementById(containerId);
    var track = document.getElementById(trackId);
    var dotsContainer = document.getElementById(dotsId);
    if (!container || !track) return;

    if (!items || items.length === 0) {
        track.innerHTML = '<div class="info-slider-item"><span style="color:var(--text-muted);">暂无内容</span></div>';
        if (dotsContainer) dotsContainer.innerHTML = '';
        return;
    }

    var html = '';
    for (var i = 0; i < items.length; i++) {
        html += '<div class="info-slider-item" data-key="' + (items[i].key || '') + '" style="cursor:pointer;">' + getItemHtml(items[i]) + '</div>';
    }
    track.innerHTML = html;

    // 为每个条目绑定点击事件
    track.querySelectorAll('.info-slider-item').forEach(function(el) {
        el.addEventListener('click', function() {
            var key = this.dataset.key;
            if (key && typeof loadPage === 'function') {
                loadPage(key);
            }
        });
    });

    if (dotsContainer) {
        var dotsHtml = '';
        for (var j = 0; j < items.length; j++) {
            dotsHtml += '<span class="dot' + (j === 0 ? ' active' : '') + '" data-index="' + j + '"></span>';
        }
        dotsContainer.innerHTML = dotsHtml;

        dotsContainer.querySelectorAll('.dot').forEach(function(dot) {
            dot.addEventListener('click', function() {
                var index = parseInt(this.dataset.index);
                var card = this.closest('.info-slider-card');
                var track = card.querySelector('.info-slider-track');
                var container = card.querySelector('.info-slider-container');
                var dotsId = card.querySelector('.slider-dots').id;
                if (track) {
                    goToSlide(track.id, dotsId, index);
                    container.dataset.current = String(index);
                    // 重置定时器
                    if (container._sliderTimer) {
                        clearInterval(container._sliderTimer);
                        container._sliderTimer = setInterval(function() {
                        var total = parseInt(container.dataset.total);
                        var current = parseInt(container.dataset.current);
                        var next = (current + 1) % total;
                        var track = container.querySelector('.info-slider-track');
                        var dotsId = container.parentElement.querySelector('.slider-dots')?.id || '';
                        if (track) {
                            goToSlide(track.id, dotsId, next);
                            container.dataset.current = String(next);
                        }
                    }, SLIDER_INTERVAL);
                    }
                }
            });
        });
    }

    container.dataset.total = items.length;
    container.dataset.current = '0';

    if (container._sliderTimer) {
        clearInterval(container._sliderTimer);
    }

    container._sliderTimer = setInterval(function() {
        var total = parseInt(container.dataset.total);
        var current = parseInt(container.dataset.current);
        var next = (current + 1) % total;
        var track = container.querySelector('.info-slider-track');
        var dotsId = container.parentElement.querySelector('.slider-dots')?.id || '';
        if (track) {
            goToSlide(track.id, dotsId, next);
            container.dataset.current = String(next);
        }
    }, SLIDER_INTERVAL);
}

function goToSlide(trackId, dotsId, index) {
    var track = document.getElementById(trackId);
    var dotsContainer = document.getElementById(dotsId);
    if (!track) return;

    track.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1)';
    track.style.transform = 'translateX(-' + (index * 100) + '%)';

    if (dotsContainer) {
        dotsContainer.querySelectorAll('.dot').forEach(function(dot, i) {
            dot.classList.toggle('active', i === index);
        });
    }

    var container = track.closest('.info-slider-container');
    if (container) {
        container.dataset.current = String(index);
    }
}

// 获取板块图标
function getCategoryIcon(key) {
    var iconMap = {
        '游玩规定V2.0': 'fa-gavel',
        '服务器性质通告': 'fa-bullhorn',
        '重要通知': 'fa-bullhorn',
        '商店运营指导建议': 'fa-store',
        '管理员学习手册': 'fa-book',
        '管理组介绍': 'fa-info-circle',
        '加入我们': 'fa-users',
        '刺玫本设': 'fa-paintbrush',
        '关于Wiki': 'fa-info-circle',
        '方针': 'fa-book',
        '教学文档': 'fa-book',
        'Markdown教程': 'fa-book',
        '乱写文档': 'fa-flask',
        '净标计划': 'fa-broom',
        '更新日志': 'fa-clock-rotate-left'
    };
    return iconMap[key] || 'fa-file-alt';
}

// 时间显示辅助函数
function getTimeAgo(date) {
    var now = new Date();
    var diffMs = now - date;
    var diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return '刚刚';
    if (diffMins < 60) return diffMins + ' 分钟前';
    var diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return diffHours + ' 小时前';
    var diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return diffDays + ' 天前';
    return date.toLocaleDateString('zh-CN');
}

// 初始化轮播
function initSliders() {
    // 热门搜索
    renderSlider(
        'hotSearchContainer',
        'hotSearchTrack',
        'hotSearchDots',
        hotSearches,
        function(item) {
            var icon = item.icon || 'fa-fire';
            return '<span class="slider-icon"><i class="fas ' + icon + '"></i></span>' +
                   '<span class="slider-text"><a href="#page-' + item.key + '" style="color:var(--text-primary);text-decoration:none;font-size:1.1rem;">' + item.label + '</a></span>';
        }
    );

    var recentData = sessionStorage.getItem('recent_updates_full');
    if (recentData) {
        try {
            var items = JSON.parse(recentData);
            renderRecentSlider(items);
        } catch (e) {
            fetchRecentUpdatesForSlider();
        }
    } else {
        fetchRecentUpdatesForSlider();
    }

    // 悬停暂停轮播
    var cards = document.querySelectorAll('.info-slider-card');
    cards.forEach(function(card) {
        var container = card.querySelector('.info-slider-container');
        if (!container) return;

        card.addEventListener('mouseenter', function() {
            if (container._sliderTimer) {
                clearInterval(container._sliderTimer);
                container._sliderTimer = null;
            }
        });
        card.addEventListener('mouseleave', function() {
            if (!container._sliderTimer) {
                var total = parseInt(container.dataset.total) || 0;
                if (total === 0) return;
                var current = parseInt(container.dataset.current) || 0;
                container._sliderTimer = setInterval(function() {
                    var total = parseInt(container.dataset.total);
                    var current = parseInt(container.dataset.current);
                    var next = (current + 1) % total;
                    var track = container.querySelector('.info-slider-track');
                    var dotsId = container.parentElement.querySelector('.slider-dots')?.id || '';
                    if (track) {
                        goToSlide(track.id, dotsId, next);
                        container.dataset.current = String(next);
                    }
                }, SLIDER_INTERVAL);
            }
        });
    });
}

function renderRecentSlider(items) {
    if (!items || items.length === 0) {
        items = [{ key: '暂无更新', label: '暂无更新记录', date: null }];
    }

    renderSlider(
        'recentUpdateContainer',
        'recentUpdateTrack',
        'recentUpdateDots',
        items,
        function(item) {
            var icon = getCategoryIcon(item.key);
            var timeHtml = item.date ? '<span class="slider-meta">' + getTimeAgo(item.date) + '</span>' : '';
            return '<span class="slider-icon" style="font-size:1.2rem;width:32px;height:32px;"><i class="fas ' + icon + '"></i></span>' +
                   '<span class="slider-text" style="font-size:1.15rem;"><a href="#page-' + item.key + '" style="color:var(--text-primary);text-decoration:none;">' + item.label + '</a></span>' +
                   timeHtml;
        }
    );
}

function fetchRecentUpdatesForSlider() {
    var paths = [];
    for (var key in pagePathMap) {
        var path = pagePathMap[key];
        if (path && path.startsWith('pages/')) {
            paths.push({ key: key, path: path });
        }
    }

    if (paths.length === 0) {
        renderRecentSlider([]);
        return;
    }

    function fetchWithTimeout(url, timeout) {
        timeout = timeout || 5000;
        return new Promise(function(resolve) {
            var timer = setTimeout(function() { resolve(null); }, timeout);
            fetch(url)
                .then(function(response) {
                    clearTimeout(timer);
                    if (!response.ok) { resolve(null); return; }
                    response.json().then(function(data) { resolve(data); })
                        .catch(function() { resolve(null); });
                })
                .catch(function() { clearTimeout(timer); resolve(null); });
        });
    }

    var batchSize = 5;
    var allValid = [];

    function processBatch(startIndex) {
        var batch = paths.slice(startIndex, startIndex + batchSize);
        if (batch.length === 0) {
            allValid.sort(function(a, b) { return b.date - a.date; });
            allValid = allValid.slice(0, 5);
            sessionStorage.setItem('recent_updates_full', JSON.stringify(allValid));
            renderRecentSlider(allValid);
            return;
        }

        var promises = batch.map(function(item) {
            var apiUrl = 'https://api.github.com/repos/SoServer/wiki/commits?path=' + encodeURIComponent(item.path) + '&page=1&per_page=1';
            return fetchWithTimeout(apiUrl, 5000)
                .then(function(data) {
                    if (data && data.length > 0) {
                        return {
                            key: item.key,
                            path: item.path,
                            date: new Date(data[0].commit.committer.date),
                            label: displayNames[item.key] || item.key
                        };
                    }
                    return null;
                });
        });

        Promise.all(promises)
            .then(function(batchResults) {
                batchResults.forEach(function(r) {
                    if (r !== null) allValid.push(r);
                });
                processBatch(startIndex + batchSize);
            })
            .catch(function() {
                processBatch(startIndex + batchSize);
            });
    }

    processBatch(0);
}
