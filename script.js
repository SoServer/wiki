// ============================================================
// 刺玫会 Wiki · 侧边栏与交互脚本
// 版本：V2.0
// 日期：2026年8月30日
// ============================================================

// ============================================================
// 1. 渲染侧边栏（桌面端和移动端共用）
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

    // 恢复侧边栏状态（延迟执行，等待渲染完成）
    setTimeout(restoreSidebarState, 100);

    // 在切换侧边栏时保存状态
    document.addEventListener('click', function(e) {
        if (e.target.closest('.category-toggle')) {
            setTimeout(saveSidebarState, 50);
        }
    });
});

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
    if (results.length === 0) {
        container.innerHTML = '<div class="no-result">未找到相关页面</div>';
        container.classList.add('show');
        return;
    }
    var html = '';
    for (var i = 0; i < results.length; i++) {
        var r = results[i];
        html += '<div class="result-item" data-key="' + r.key + '">';
        html += '<span class="result-title">' + r.title + '</span>';
        if (r.category) {
            html += '<span class="result-category">' + r.category + '</span>';
        }
        if (r.summary) {
            html += '<span class="result-summary">' + r.summary + '</span>';
        }
        html += '</div>';
    }
    container.innerHTML = html;
    container.classList.add('show');

    var items = container.querySelectorAll('.result-item');
    for (var j = 0; j < items.length; j++) {
        items[j].addEventListener('click', function() {
            var key = this.dataset.key;
            if (key && typeof loadPage === 'function') {
                loadPage(key);
                closeSearch();
            }
        });
    }
}

function closeSearch() {
    var container = document.getElementById('searchResults');
    if (container) {
        container.classList.remove('show');
    }
    var input = document.getElementById('searchInput');
    if (input) {
        input.blur();
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
        btn.addEventListener('click', function() {
            var results = performSearch(input.value);
            renderSearchResults(results);
        });
    }

    document.addEventListener('click', function(e) {
        var wrapper = document.querySelector('.search-wrapper');
        if (wrapper && !wrapper.contains(e.target) && container) {
            container.classList.remove('show');
        }
    });

    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            input.focus();
            input.select();
        }
        if (e.key === 'Escape') {
            closeSearch();
        }
    });
}
