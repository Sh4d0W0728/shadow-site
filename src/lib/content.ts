export const REPO_URL = "https://github.com/Sh4d0W0728/shadow"
export const DOWNLOAD_URL =
  "https://github.com/Sh4d0W0728/shadow/releases/latest/download/shadow.zip"
export const RELEASES_URL = "https://github.com/Sh4d0W0728/shadow/releases"
export const VERSION = "v2.4.0"
export const INSTALL_CMD = `codex plugin marketplace add https://github.com/Sh4d0W0728/shadow.git --ref main
codex plugin add shadow@shadow`

export const stats = [
  { value: 20, label: "剪辑领域", hint: "按成片目的选流程" },
  { value: 12, label: "基础配方", hint: "开场、发展、转折、收束" },
  { value: 56, label: "技巧卡片", hint: "何时用 · 怎样做 · 怎样查" },
  { value: 18, label: "方法专题", hint: "公开教学到剪辑决定" },
]

export type Stage = {
  id: string
  index: string
  title: string
  en: string
  summary: string
  detail: string
  outputs: string[]
  hue: number
}

export const stages: Stage[] = [
  {
    id: "organize",
    index: "01",
    title: "素材整理",
    en: "INGEST",
    summary: "递归扫描、真实抽帧、按内容分类编号。",
    detail:
      "Codex 实际查看采样画面，写下内容摘要与标签，再把原片复制到目标目录。原片不动，疑难项单列待复核。",
    outputs: ["分类编号副本", "CSV 原名对照", "HTML 素材目录", "SHA-256 校验"],
    hue: 262,
  },
  {
    id: "source",
    index: "02",
    title: "搜索补材",
    en: "SOURCE",
    summary: "按镜头缺口写检索词，包图网会员下载归档。",
    detail:
      "主体、动作、景别、运镜、色调、横竖版一起写进检索词。复用你的登录会话，不读取、不保存密码与 Cookie。",
    outputs: ["镜头缺口清单", "原片 / 预览分开记录", "授权附件归档"],
    hue: 200,
  },
  {
    id: "cut",
    index: "03",
    title: "创建剪辑",
    en: "CUT",
    summary: "叙事选片、自然转场、可校验的时间线。",
    detail:
      "每个重要剪点记录：源时间 → 新增信息或情绪 → 与前镜关系 → 切换理由。转场默认硬切，叠化必须有理由。",
    outputs: ["edit-plan.md", "timeline.json", "风格小样"],
    hue: 150,
  },
  {
    id: "subtitle",
    index: "04",
    title: "字幕标题",
    en: "CAPTION",
    summary: "序列音频识别，文稿校对，UTF-8 SRT。",
    detail:
      "本地 faster-whisper 从剪辑后的序列音频取时间戳，再用文稿校正术语。人名、数字、否定和歌词单独复核。",
    outputs: ["识别 JSON", "校正报告", "SRT / ASS", "片头与人物条"],
    hue: 40,
  },
  {
    id: "deliver",
    index: "05",
    title: "Premiere 交付",
    en: "DELIVER",
    summary: "XML、独立 SRT、成片核验，一起交给你。",
    detail:
      "结构校验通过后生成 XML 与预览；具备桌面控制时在 PR 导入、播放、保存并重开，才算验证通过。",
    outputs: ["Premiere XML", "成片", ".prproj（实测后）", "核验报告"],
    hue: 320,
  },
]

export type Domain = {
  id: string
  name: string
  focus: string
  rhythm: number[]
}

export type DomainFamily = {
  id: string
  name: string
  en: string
  lead: string
  domains: Domain[]
}

export const domainFamilies: DomainFamily[] = [
  {
    id: "promo",
    name: "宣传推广",
    en: "PROMOTION",
    lead: "把价值主张与真实证据对应起来。",
    domains: [
      { id: "promo-brand", name: "品牌故事与形象片", focus: "品牌价值、关系和情绪辨识度，具体行动与证据支撑承诺。", rhythm: [5, 3, 4, 2, 6, 3, 2, 5, 4, 7] },
      { id: "promo-corporate", name: "企业能力与机构介绍", focus: "业务、能力、过程和可信事实。每项能力都要有相应证据。", rhythm: [4, 4, 3, 5, 3, 4, 4, 3, 5, 4] },
      { id: "promo-product", name: "产品功能与卖点展示", focus: "外观、功能、使用价值，公平且可验证的比较。", rhythm: [3, 2, 4, 2, 3, 5, 2, 3, 2, 6] },
      { id: "promo-tourism", name: "文旅目的地推广", focus: "真实目的地、地方文化与可体验价值，地点与素材归属正确。", rhythm: [7, 5, 3, 6, 4, 8, 3, 5, 6, 4] },
      { id: "promo-service", name: "服务体验与课程招生", focus: "选择问题 → 真实流程 → 结果证据 → 可执行的下一步。", rhythm: [4, 3, 5, 3, 4, 3, 6, 3, 4, 5] },
    ],
  },
  {
    id: "event",
    name: "活动与会议",
    en: "EVENT",
    lead: "截止时间、流程覆盖、讲话完整，各自优先。",
    domains: [
      { id: "event-same-day", name: "活动当天快剪", focus: "截止时间优先，按已核验镜头先出小样，记录尚未收到的素材。", rhythm: [2, 1, 2, 1, 3, 1, 2, 1, 2, 4] },
      { id: "event-recap", name: "活动完整回顾", focus: "阶段、人物关系与情绪发展，约定必留内容全部覆盖。", rhythm: [4, 3, 5, 4, 3, 6, 4, 3, 5, 6] },
      { id: "conference-talk", name: "会议演讲与报告记录", focus: "连续原声、幻灯片与问答，不按音乐节拍切断论证。", rhythm: [12, 9, 14, 10] },
    ],
  },
  {
    id: "edu",
    name: "网络教学",
    en: "EDUCATION",
    lead: "保留知识递进、关键步骤与可复现结果。",
    domains: [
      { id: "education-course", name: "系统网络课程", focus: "章节依赖、概念到练习的递进；按章成片与最终时轴 SRT。", rhythm: [8, 6, 9, 7, 8, 6] },
      { id: "education-micro", name: "单知识点微课", focus: "一个独立、可检验的学习结果，最少前提 + 解释 + 示例。", rhythm: [6, 5, 7, 6, 8] },
      { id: "education-screen", name: "屏幕操作教程", focus: "操作链、参数、反馈与保存位置，让观众能复现。", rhythm: [5, 4, 6, 5, 4, 7, 5] },
    ],
  },
  {
    id: "doc",
    name: "采访与纪实",
    en: "DOCUMENTARY",
    lead: "从观点、行动与现场关系组织内容。",
    domains: [
      { id: "interview-profile", name: "人物采访与观点访谈", focus: "采访原意优先，B-roll 辅助而不替代缺失的证据。", rhythm: [9, 4, 10, 3, 8, 5] },
      { id: "documentary-observational", name: "观察式纪录", focus: "现场行动与真实时空关系，保留不确定性。", rhythm: [11, 8, 13, 7, 10] },
    ],
  },
  {
    id: "music",
    name: "音乐与影视",
    en: "MUSIC & FILM",
    lead: "由情绪、节拍或人物关系推动选镜。",
    domains: [
      { id: "mv-lyric-story", name: "歌词叙事 MV", focus: "歌曲含义与情绪段落主导，意象呼应而非逐字拼画面。", rhythm: [6, 4, 7, 3, 5, 8, 4, 6] },
      { id: "mv-beat-action", name: "卡点动作混剪", focus: "强拍与动作峰值，方向连贯，递进之后有释放。", rhythm: [1, 1, 2, 1, 1, 1, 2, 1, 1, 3, 1, 1, 2, 5] },
      { id: "character-fanedit", name: "影视人物混剪", focus: "角色处境、关系、选择与变化，台词归属可追溯。", rhythm: [5, 3, 6, 2, 4, 7, 2, 3, 8] },
    ],
  },
  {
    id: "life",
    name: "生活与社交",
    en: "LIFE & SOCIAL",
    lead: "围绕人物、信息、行动目标与真实体验。",
    domains: [
      { id: "wedding-story", name: "婚礼故事", focus: "新人关系、家人、誓词与真实仪式情绪。", rhythm: [6, 4, 8, 5, 9, 4, 7] },
      { id: "social-info", name: "信息与观点短视频", focus: "首屏即主信息，必要内容无声也能看懂。", rhythm: [2, 3, 2, 4, 2, 3, 2, 3] },
      { id: "social-sales", name: "商品推广转化短片", focus: "一个真实利益点、证据与可执行的行动路径。", rhythm: [2, 2, 3, 2, 4, 2, 2, 5] },
      { id: "travel-personal", name: "个人旅行 Vlog", focus: "真实路线、人物互动和空间变化，保留现场感。", rhythm: [5, 3, 6, 4, 3, 7, 5, 4] },
    ],
  },
]

export type Session = {
  id: string
  label: string
  prompt: string
  steps: { kind: "run" | "ok" | "note" | "file"; text: string }[]
}

export const sessions: Session[] = [
  {
    id: "organize",
    label: "整理原片",
    prompt:
      "$shadow 整理 D:\\拍摄原片，放到 E:\\项目\\整理素材。识别实际内容，按人物、场地、产品、活动分类编号，保留原片。",
    steps: [
      { kind: "run", text: "organize.py scan D:\\拍摄原片 --recursive" },
      { kind: "ok", text: "读入 186 个视频 · 3 组重复内容已合并，保留全部来源" },
      { kind: "run", text: "抽取带时间点的采样帧 → 实际查看画面" },
      { kind: "note", text: "C0042.MP4  00:00:12  主讲人在展台前讲解新品，手持样机" },
      { kind: "note", text: "DJI_0007.MP4  00:00:03  园区航拍，清晨，侧逆光" },
      { kind: "ok", text: "10 个内容分类 · 7 个进入 99_待复核" },
      { kind: "file", text: "E:\\项目\\整理素材\\03_产品\\03-014_样机特写_手持.mp4" },
      { kind: "file", text: "原名对照.csv · 素材目录.html · sha256 全部一致" },
    ],
  },
  {
    id: "promo",
    label: "企业宣传片",
    prompt:
      "$shadow 用这些素材剪一条企业宣传片，面向客户，90 秒，16:9，25fps。先整理真实业务镜头，再列需要补的氛围素材。",
    steps: [
      { kind: "run", text: "profiles.py select → promo-corporate（企业能力与机构介绍）" },
      { kind: "ok", text: "brief.json 已创建 · 结构：业务 → 能力 → 证据 → 收束" },
      { kind: "note", text: "缺口：清晨园区全景、客户现场交付特写 → 包图网检索 4 组" },
      { kind: "run", text: "timeline v2 · 2250 帧 @25fps · 硬切为主，章节处 0.5s 叠化" },
      { kind: "ok", text: "shadow.py validate 通过 · 媒体、入出点、总帧数正确" },
      { kind: "run", text: "subtitles.py transcribe（序列音频）→ 文稿校正 6 处" },
      { kind: "file", text: "企业宣传片_v1.mp4 · 企业宣传片.xml · 企业宣传片.srt" },
      { kind: "note", text: "待人工复核：片尾 Logo 停留时长、两处人名读音" },
    ],
  },
  {
    id: "event",
    label: "活动当天快剪",
    prompt:
      "$shadow 今天活动结束后要发一条 45 秒竖屏快剪。保留开场、核心发言一句、观众反应和合影。先检查缺少的素材。",
    steps: [
      { kind: "run", text: "profiles.py select → event-same-day（活动当天快剪）" },
      { kind: "ok", text: "必留清单：开场 ✓  核心发言 ✓  观众反应 ✓  合影 · 尚未传输" },
      { kind: "note", text: "先用已核验镜头出 45s 小样，合影到达后替换收尾" },
      { kind: "run", text: "9:16 · 1080×1920 · 剪口跟随音乐段落，发言保留完整语意" },
      { kind: "ok", text: "小样渲染完成 · 首尾、剪口、字幕抽查通过" },
      { kind: "file", text: "活动快剪_竖屏_小样.mp4 · 未覆盖记录.md" },
    ],
  },
  {
    id: "course",
    label: "系统网络课程",
    prompt:
      "$shadow 把这套录屏和讲稿整理成网络课程。按知识点分章，保留操作因果，结合音频识别与讲稿校正字幕。",
    steps: [
      { kind: "run", text: "profiles.py select → education-course（系统网络课程）" },
      { kind: "ok", text: "识别 6 个知识点 · 章节依赖图已生成" },
      { kind: "note", text: "第 3 章缺少保存位置的画面 → 标记为内容缺口，不擅自补拍" },
      { kind: "run", text: "faster-whisper · 按剪辑后序列音频重新取时间戳" },
      { kind: "ok", text: "讲稿对照：术语 11 处、数字 3 处已校正" },
      { kind: "file", text: "第01课.mp4 … 第06课.mp4 · 每课独立 SRT · 系列 XML" },
    ],
  },
]

export const principles = [
  {
    take: "01",
    title: "没看过的画面，标为未验证",
    body: "文件名、ffprobe 与场景检测都只是线索。语义来自 Codex 实际查看的采样帧。",
  },
  {
    take: "02",
    title: "不用字数平均冒充识别",
    body: "字幕时间戳来自剪辑后的序列音频；在原素材上识别必须按入出点重新映射。",
  },
  {
    take: "03",
    title: "不改扩展名冒充原生工程",
    body: "只有在 Premiere 里实际导入、播放、保存并重开，才报告 .prproj 验证通过。",
  },
  {
    take: "04",
    title: "候选不等于剪点",
    body: "场景变化候选不当作已确认剪点，音轨电平不当作听感验收。",
  },
  {
    take: "05",
    title: "不碰你的密码与 Cookie",
    body: "包图网登录由你完成。会员素材、凭据与模型都不进安装包。",
  },
  {
    take: "06",
    title: "原片永远保留",
    body: "整理默认复制；输出新文件，保留原素材与原工程。同名冲突直接停止。",
  },
]

export const knowledge = [
  {
    group: "叙事与剪口",
    count: 4,
    items: ["带时间码的选片", "采访原意", "动作接剪", "声音桥与有意义的停顿"],
  },
  {
    group: "Premiere 精修",
    count: 6,
    items: ["三点编辑", "多机位", "色彩匹配", "对白修复", "音乐闪避", "字幕与标题"],
  },
  {
    group: "影视飓风学习卡",
    count: 8,
    items: [
      "镜头意义与因果",
      "时间压缩与母题",
      "受众任务与情绪标记",
      "密度变化与停顿",
      "动态与压缩",
      "音乐闪避与试听",
      "源包、工作副本与命名",
      "校验、归档与母版",
    ],
  },
]

export const films = [
  { code: "F01", title: "5G", author: "何同学", note: "先给观众证据，再换一个更大的问题" },
  { code: "F02", title: "毕业作品", author: "何同学", note: "情绪先有经历，再有回望和行动" },
  { code: "F03", title: "盛世中华", author: "8KRAW", note: "宏观建立、密度变化与图形呼应" },
  { code: "F04", title: "冰岛旅行片", author: "Links", note: "用行动带出风景，让结果有来由" },
  { code: "F05", title: "小蒜头", author: "Apple", note: "节奏随人物状态变化，反应值得停留" },
]
