# shadow — 宣传网页

[shadow](https://github.com/Sh4d0W0728/shadow) 是一个面向 Codex 与 Premiere Pro 的影视剪辑 skill。这个仓库是它的宣传网页：把页面本身做成“一部片子”——片头倒计时开幕、取景器 Hero、随滚动归档的原片、Premiere 风格时间线、可交互的领域路由和 Codex 会话演示。

## 页面结构

| 段落 | 内容 |
| :--- | :--- |
| 片头 | 胶片倒计时 3·2·1，黑边开幕（可点击跳过，尊重“减少动态效果”设置） |
| Hero | 巨型 `shadow.` 字标随光源投下长影；鼠标移动即光源，无鼠标时自动环绕 |
| 宣言 | 随滚动逐字点亮 |
| 01 原片整理 | 滚动驱动：散乱素材 → 扫描识别 → 分类编号 → SHA-256 核验 |
| 02 五个阶段 | 吸顶的节目监视器 + 时间线，滚动即拖动播放头，可点击片段跳转 |
| 03 20 个领域 | 输入一句需求，本地模拟 `profiles.py select` 选主领域；每个领域带“剪辑节奏指纹” |
| 04 演示 | Codex 会话打字回放：整理原片 / 企业宣传片 / 活动快剪 / 网络课程 |
| 05 方法库 | 18 个专题、参考片分析器示意、5 部成片案例 |
| 06 原则 | 场记板卡片：不冒充识别、不冒充工程、不碰凭据 |
| 07 安装 | 三步安装、终端命令一键复制 |
| 片尾 | 演职员表 + FADE OUT |

## 技术栈

Next.js 16（App Router）· TypeScript · Tailwind CSS v4 · shadcn/ui · Motion · lucide-react。无后端、无数据库、无需任何密钥。

## 本地运行

需要 Node.js 20+。

```bash
npm install
npm run dev -- -p 4317
```

打开 <http://localhost:4317>。

生产构建：

```bash
npm run build
npm run start -- -p 4317
```

## 修改文案

所有文案与数据集中在 `src/lib/content.ts`（版本号、下载链接、阶段、领域、演示会话、原则等）。各段落组件位于 `src/components/site/`。
