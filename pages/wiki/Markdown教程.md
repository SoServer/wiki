# Markdown 编写教程

刺玫会 Wiki · 内容创作指南

最后更新：二〇二六年九月五日

<div class="msgbox info">
    <span class="msgbox-title">说明</span>
    本教程面向希望参与刺玫会 Wiki 内容编写的玩家。Markdown 是一种轻量级标记语言，比 HTML 更易上手，适合快速撰写文档。
</div>

## 一、什么是 Markdown

Markdown 是一种用纯文本编写文档的标记语言。它比 HTML 更简洁，阅读和编写都更轻松。刺玫会 Wiki 已支持 Markdown 渲染，玩家可以用 Markdown 编写内容，由系统自动转换为 HTML 页面。

本教程涵盖 Markdown 基础语法及刺玫会 Wiki 特有的扩展功能。

## 二、基础语法

### 1. 标题

使用 `#` 到 `###` 表示三级标题，对应 Wiki 的 h1 到 h3：

# 一级标题

## 二级标题

### 三级标题


### 2. 段落与换行

直接写文字即为段落，段落之间用空行分隔：

```
这是第一段内容。

这是第二段内容，中间有空行。
```

### 3. 加粗与斜体

```
*这是斜体文字*

**这是加粗文字**
```

### 4. 列表

**无序列表**（使用 `-`）：

- 苹果
- 香蕉
- 橙子

**有序列表**（使用数字 + 英文句号）：

1. 第一步：打开冰箱门
2. 第二步：把大象放进去
3. 第三步：关上冰箱门

### 5. 链接

**内部链接**（链接到 Wiki 其他页面）：
内部链接（链接到 Wiki 其他页面）：

```
[显示的文字](#page-页面Key)
```

示例：[关于Wiki](#page-关于Wiki)

外部链接：

```
[显示的文字](https://github.com)
```

### 6. 行内代码

使用反引号 `` ` `` 包裹：

### 7. 引用

使用 `>` 开头：


### 8. 代码块

使用三个反引号 ``` `` ``` 包裹：


## 三、Wiki 特有扩展

### 1. 图标短代码

使用 `[icon:中文名]` 快速插入 Minecraft 风格图标：

```
[icon:工作台] 是合成核心
[icon:命令方块] 用于执行指令
[icon:附魔台] 用于附魔装备
```

支持的图标名称见 `icons.js` 中的 `iconMap` 映射表。

### 2. 提示框

在 Markdown 中直接使用 HTML 标签：

```
<div class="msgbox info">
    <span class="msgbox-title">说明</span>
    这是一条普通提示信息。
</div>

<div class="msgbox warning">
    <span class="msgbox-title">注意</span>
    这是一条警告信息。
</div>

<div class="msgbox important">
    <span class="msgbox-title">重要</span>
    这是一条重要信息。
</div>
```

### 3. 高亮框

```
<div class="highlight-box">
    <p><strong>要点总结</strong></p>
    <p>这是被高亮的重要内容。</p>
</div>
```

### 4. 信息网格

```
<div class="info-grid">
    <span><strong>身份：</strong>管理员</span>
    <span><strong>入服时间：</strong>二〇二六年七月</span>
</div>
```

### 5. 页脚

每个页面末尾必须包含页脚：

```
<div class="footnote">
    <p>刺玫会管理组</p>
    <p>二〇二六年九月五日</p>
</div>
```

## 四、净标计划

<div class="msgbox important">
    <span class="msgbox-title">净标计划</span>
    所有 Wiki 页面**禁止使用 Emoji**，统一使用 FontAwesome 图标（`<i class="fas fa-xxx"></i>`）或纯文字替代。
</div>

**正确示例：**

```
<i class="fas fa-bullhorn"></i> 公告
```

**错误示例：**

```
📢 公告
```

## 五、如何提交内容

- **纯文本提交：** 将内容以纯文本形式发送给弘桀孤影行，由管理组整理为 HTML 后发布。
- **Markdown 提交：** 自行编写 `.md` 文件，提交给管理组审核。审核通过后上传至对应目录。
- **HTML 提交：** 自行编写符合规范的 HTML 文件，提交后由管理组审核，审核通过后直接上传。

提交渠道：QQ 群内联系管理员，或私信弘桀孤影行。

## 六、完整示例

以下是一个完整的 Markdown 页面示例：

```
# 页面标题

这是一段正文内容。

## 第一章 概述

- 项目一
- 项目二
- 项目三

<div class="msgbox info">
    <span class="msgbox-title">说明</span>
    这是一条提示信息。
</div>

[icon:工作台] 是合成核心。

<div class="footnote">
    <p>刺玫会管理组</p>
    <p>二〇二六年九月五日</p>
</div>
```

<div class="msgbox success">
    <span class="msgbox-title">提示</span>
    编写完成后，可以先用「自定义内容」板块进行测试，确认渲染效果无误后再正式提交。
</div>

<div class="footnote">
    <p>刺玫会 · Wiki</p>
    <p>二〇二六年九月五日</p>
</div>
