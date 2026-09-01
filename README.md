# 刺玫会服务器 · Wiki

本仓库为刺玫会服务器的官方 Wiki 项目，托管于 GitHub Pages，用于存档服务器制度文件、处理报告、人物志、公会档案等公开信息。


## 项目简介

刺玫会 Wiki 是刺玫会服务器的信息存档与展示平台。本项目采用纯静态 HTML + CSS + JavaScript 构建，通过 GitHub Pages 部署，无需后端服务，所有内容以 HTML 文件形式存储于仓库中。


## 项目结构

/
├── index.html                网站首页（单页应用入口）
├── style.css                 全局样式表
├── script.js                 核心交互脚本（侧边栏、页面加载等）
├── data.js                   内容数据（侧边栏菜单、卡片数据、页面路径映射）
├── icons.js                  图标短代码映射表
├── verse.js                  语录轮播数据
├── favicon.png               网站图标（工作台图案）
├── room_number.txt           服务器房间号配置（可选）
├── version.txt               版本号配置
├── assets/
│   └── icons/                图标资源目录
│       ├── Crafting_Table.png
│       ├── Command_Block.png
│       └── ...（其余图标文件）
└── pages/
    ├── announcements/        公告页面
    ├── reports/              处理报告页面
    ├── rules/                管理规定页面
    ├── logs/                 工作日志页面
    ├── characters/           人物志页面
    ├── guilds/               公会档案页面
    ├── about/                关于页面
    └── wiki/                 Wiki文档页面


## 内容板块

| 板块 | 说明 | 目录 |
|------|------|------|
| 公告 | 服务器通知、游玩规定等 | `pages/announcements/` |
| 处理报告 | 违规玩家调查与处理记录 | `pages/reports/` |
| 管理规定 | 服务器运营规范与指导文件 | `pages/rules/` |
| 工作日志 | 管理组日常工作记录 | `pages/logs/` |
| 人物志 | 核心成员人物介绍 | `pages/characters/` |
| 公会档案 | 服务器公会历史记录 | `pages/guilds/` |
| 关于 | 管理组介绍、加入方式等 | `pages/about/` |
| Wiki | Wiki自身文档 | `pages/wiki/` |


## 页面编写规范

### 基本结构

每个页面必须包含以下结构：

```html
<div class="doc-content">
    <h1>页面标题</h1>
    <p style="color:var(--text-secondary);">副标题或页面描述</p>
    <p style="color:var(--text-muted);font-size:0.9rem;">发布日期</p>
    <p style="color:var(--text-muted);font-size:0.9rem;">发布单位</p>

    <!-- 正文内容 -->

    <div class="footnote">
        <p>发布单位</p>
        <p>日期</p>
    </div>
</div>
```

## 常用样式组件

### 提示框：
div class="msgbox info" 普通提示 /div
div class="msgbox warning" 警告 /div
div class="msgbox important" 重要 /div
div class="msgbox success" 成功 /div

### 高亮框：
div class="highlight-box" 内容 /div

### 信息网格：
div class="info-grid" 内容 /div

### 内联标签：
span class="tag info" 信息 /span
span class="tag warning" 警告 /span
span class="tag important" 重要 /span
span class="tag success" 成功 /span
span class="tag todo" 待办 /span
span class="tag vanilla" 普通 /span

### 页脚：
div class="footnote" 内容 /div

## 图标短代码

在页面内容中可使用 [icon:中文名] 快速插入图标。

示例：
[icon:工作台] 是合成核心
[icon:命令方块] 用于执行指令

支持的图标名称见 icons.js 中的 iconMap 映射表。

## 内部链接

链接到 Wiki 内其他页面的格式：
a href="#page-页面Key" 显示文字 /a

页面 Key 在 data.js 的 pagePathMap 中定义。

## 外部链接

a href="https://example.com" target="_blank" 外部链接 /a


## 数据配置

data.js 包含四个核心配置：

sidebarMenu：侧边栏菜单结构（分类 + 页面列表）
cardData：首页卡片数据（与侧边栏同步）
pagePathMap：页面 Key 与实际 HTML 文件路径的映射
displayNames：页面显示名称映射（可选）

## 新增页面步骤：

第一步，在 pages/ 对应目录下创建 HTML 文件。
第二步，在 pagePathMap 中添加 Key 到文件路径的映射。
第三步，在 sidebarMenu 和 cardData 的对应分类中添加 Key。
第四步，可选：在 displayNames 中添加显示名称映射。


## 技术栈

托管平台：GitHub Pages
前端语言：HTML5 + CSS3 + JavaScript（原生）
字体：Pixelify Sans（像素风格）
图标库：Font Awesome 6
图标资源：Minecraft 原版风格 PNG/GIF


## 维护者

项目负责人：弘桀孤影行
GitHub：SoServer
仓库地址：https://github.com/SoServer/SoServer.github.io


## 许可证

本项目的文字内容（页面中的制度文件、报告、人物志等）归刺玫会服务器所有，未经允许不得转载或用于商业用途。

本项目代码部分（HTML/CSS/JS 框架）基于开源协议发布，具体以各文件中的声明为准。
