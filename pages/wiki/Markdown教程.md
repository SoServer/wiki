<div class="doc-content">
    <h1>Markdown 编写教程</h1>
    <p style="color:var(--text-secondary);">刺玫会 Wiki · 内容创作指南</p>
    <p style="color:var(--text-muted);font-size:0.9rem;">最后更新：二〇二六年九月五日</p>

    <div class="msgbox info">
        <span class="msgbox-title">说明</span>
        本教程面向希望参与刺玫会 Wiki 内容编写的玩家。Markdown 是一种轻量级标记语言，比 HTML 更易上手，适合快速撰写文档。
    </div>

    <h2>一、什么是 Markdown</h2>

    <p>Markdown 是一种用纯文本编写文档的标记语言。它比 HTML 更简洁，阅读和编写都更轻松。刺玫会 Wiki 已支持 Markdown 渲染，玩家可以用 Markdown 编写内容，由系统自动转换为 HTML 页面。</p>

    <p>本教程涵盖 Markdown 基础语法及刺玫会 Wiki 特有的扩展功能。</p>

    <h2>二、基础语法</h2>

    <h3>1. 标题</h3>
    <p>使用 <code>#</code> 到 <code>###</code> 表示三级标题，对应 Wiki 的 h1 到 h3：</p>
    <div class="code-block">
        <pre># 一级标题
## 二级标题
### 三级标题</pre>
    </div>

    <h3>2. 段落与换行</h3>
    <p>直接写文字即为段落，段落之间用空行分隔：</p>
    <div class="code-block">
        <pre>这是第一段内容。

这是第二段内容，中间有空行。</pre>
    </div>

    <h3>3. 加粗与斜体</h3>
    <div class="code-block">
        <pre>**这是加粗文字**
*这是斜体文字*</pre>
    </div>

    <h3>4. 列表</h3>
    <p><strong>无序列表</strong>（使用 <code>-</code>）：</p>
    <div class="code-block">
        <pre>- 第一项
- 第二项
- 第三项</pre>
    </div>
    <p><strong>有序列表</strong>（使用 <code>1.</code> <code>2.</code>）：</p>
    <div class="code-block">
        <pre>1. 第一步
2. 第二步
3. 第三步</pre>
    </div>

    <h3>5. 链接</h3>
    <p><strong>内部链接</strong>（链接到 Wiki 其他页面）：</p>
    <div class="code-block">
        <pre>[显示文字](#page-页面Key)</pre>
    </div>
    <p>示例：<code>[关于Wiki](#page-关于Wiki)</code></p>
    <p><strong>外部链接</strong>：</p>
    <div class="code-block">
        <pre>[显示文字](https://example.com)</pre>
    </div>

    <h3>6. 行内代码</h3>
    <p>使用反引号 <code>`</code> 包裹：</p>
    <div class="code-block">
        <pre>使用 `/give @s diamond` 指令获取钻石。</pre>
    </div>

    <h3>7. 引用</h3>
    <p>使用 <code>&gt;</code> 开头：</p>
    <div class="code-block">
        <pre>> 这是一段引用内容。</pre>
    </div>

    <h3>8. 代码块</h3>
    <p>使用三个反引号 <code>```</code> 包裹：</p>
    <div class="code-block">
        <pre>```
/execute as @a at @s run say 你好
```</pre>
    </div>

    <h2>三、Wiki 特有扩展</h2>

    <h3>1. 图标短代码</h3>
    <p>使用 <code>[icon:中文名]</code> 快速插入 Minecraft 风格图标：</p>
    <div class="code-block">
        <pre>[icon:工作台] 是合成核心
[icon:命令方块] 用于执行指令
[icon:附魔台] 用于附魔装备</pre>
    </div>
    <p>支持的图标名称见 <code>icons.js</code> 中的 <code>iconMap</code> 映射表。</p>

    <h3>2. 提示框</h3>
    <p>在 Markdown 中直接使用 HTML 标签：</p>
    <div class="code-block">
        <pre>&lt;div class="msgbox info"&gt;
    &lt;span class="msgbox-title"&gt;说明&lt;/span&gt;
    这是一条普通提示信息。
&lt;/div&gt;

&lt;div class="msgbox warning"&gt;
    &lt;span class="msgbox-title"&gt;注意&lt;/span&gt;
    这是一条警告信息。
&lt;/div&gt;

&lt;div class="msgbox important"&gt;
    &lt;span class="msgbox-title"&gt;重要&lt;/span&gt;
    这是一条重要信息。
&lt;/div&gt;</pre>
    </div>

    <h3>3. 高亮框</h3>
    <div class="code-block">
        <pre>&lt;div class="highlight-box"&gt;
    &lt;p&gt;&lt;strong&gt;要点总结&lt;/strong&gt;&lt;/p&gt;
    &lt;p&gt;这是被高亮的重要内容。&lt;/p&gt;
&lt;/div&gt;</pre>
    </div>

    <h3>4. 信息网格</h3>
    <div class="code-block">
        <pre>&lt;div class="info-grid"&gt;
    &lt;span&gt;&lt;strong&gt;身份：&lt;/strong&gt;管理员&lt;/span&gt;
    &lt;span&gt;&lt;strong&gt;入服时间：&lt;/strong&gt;二〇二六年七月&lt;/span&gt;
&lt;/div&gt;</pre>
    </div>

    <h3>5. 页脚</h3>
    <p>每个页面末尾必须包含页脚：</p>
    <div class="code-block">
        <pre>&lt;div class="footnote"&gt;
    &lt;p&gt;刺玫会管理组&lt;/p&gt;
    &lt;p&gt;二〇二六年九月五日&lt;/p&gt;
&lt;/div&gt;</pre>
    </div>

    <h2>四、净标计划</h2>

    <div class="msgbox important">
        <span class="msgbox-title">净标计划</span>
        所有 Wiki 页面<strong>禁止使用 Emoji</strong>，统一使用 FontAwesome 图标（<code>&lt;i class="fas fa-xxx"&gt;&lt;/i&gt;</code>）或纯文字替代。
    </div>

    <p><strong>正确示例：</strong></p>
    <div class="code-block">
        <pre>&lt;i class="fas fa-bullhorn"&gt;&lt;/i&gt; 公告</pre>
    </div>

    <p><strong>错误示例：</strong></p>
    <div class="code-block">
        <pre>📢 公告</pre>
    </div>

    <h2>五、如何提交内容</h2>

    <ul>
        <li><strong>纯文本提交：</strong>将内容以纯文本形式发送给弘桀孤影行，由管理组整理为 HTML 后发布。</li>
        <li><strong>Markdown 提交：</strong>自行编写 <code>.md</code> 文件，提交给管理组审核。审核通过后上传至对应目录。</li>
        <li><strong>HTML 提交：</strong>自行编写符合规范的 HTML 文件，提交后由管理组审核，审核通过后直接上传。</li>
    </ul>

    <p>提交渠道：QQ 群内联系管理员，或私信弘桀孤影行。</p>

    <h2>六、完整示例</h2>

    <p>以下是一个完整的 Markdown 页面示例：</p>

    <div class="code-block">
        <pre># 页面标题

这是一段正文内容。

## 第一章 概述

- 项目一
- 项目二
- 项目三

&lt;div class="msgbox info"&gt;
    &lt;span class="msgbox-title"&gt;说明&lt;/span&gt;
    这是一条提示信息。
&lt;/div&gt;

[icon:工作台] 是合成核心。

&lt;div class="footnote"&gt;
    &lt;p&gt;刺玫会管理组&lt;/p&gt;
    &lt;p&gt;二〇二六年九月五日&lt;/p&gt;
&lt;/div&gt;</pre>
    </div>

    <div class="msgbox success">
        <span class="msgbox-title">提示</span>
        编写完成后，可以先用「自定义内容」板块进行测试，确认渲染效果无误后再正式提交。
    </div>

    <div class="footnote">
        <p>刺玫会 · Wiki</p>
        <p>二〇二六年九月五日</p>
    </div>
</div>
