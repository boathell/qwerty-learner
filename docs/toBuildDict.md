# 如何导入新的词典 📚

注意，我们的词典主要来源于社区贡献。当你想要导入新的词典时，最好准备好词典的源文件，以便我们能够更好的帮助你。

## 0. 交给我们！🤝

### 0.1 如果你没有任何编程基础 🚫💻

我们推荐你加入 qwerty learner 社区群，在群中反映你的需求，我们的开发者会帮助你导入词典。

![groupQRcode](../public/weChat-group.jpg)

### 0.2 如果你不会编程，但会使用 github🐙

我们推荐你以“Dictionary Request”为开头发起 Issue，描述你的词典需求并提供词典来源。

## 1. 亲自动手！🛠️

### 1.1 词典的目标文件格式 📄

词典的文件格式是 `词典名.json` ，其内容结构应当是:

```json
[
    {
        "name" : "xxx" ,
        "trans" : ["xxx", "xxx",...]
    },
    ...
]
```

例如:

```json
  { "name": "file", "trans": ["n. 档案,公文箱,锉刀,[计算机] 文件 vt. 列队行进,归档,申请"] },
  {
    "name": "command",
    "trans": [
      "n.命令，指挥； 司令部，指挥部； [计算机]指令； 控制力 vt.指挥，控制，命令； 命令； 应得，值得 vi.给出命令； 命令，指令 adj.指挥的，根据命令（或要求）而作的"
    ]
  },
  { "name": "use", "trans": ["n. 运用,用法,使用权,适用 vt. 使用,利用,对待 vi. 吸毒"] },
  { "name": "program", "trans": ["n. 节目(单),程序,计划 vt. 规划,拟定计划,制作节目"] },
  { "name": "line", "trans": ["n. 行,线,航线,场界,皱纹,家族 vt. &vi. 用做衬里,排成一行,顺...排列 vi. 排成一行,顺...排列,划线于"] },
  { "name": "if", "trans": ["conj. 如果，是否，即使 n. 条件,设想"] },

```

#### 1.1.0 如何将词典的源文件转换为目标文件格式？🔄

由于词典的源文件格式、来源各异，我们无法为你提供统一的转换方法，但是我们可以提供一些思路：

#### 1.1.1 你可以将部分词典源文件的内容发送给 ChatGPT 并描述需求，让 ChatGPT 生成转换脚本 🤖

#### 1.1.2 你也可以使用在线工具将词典源文件转换为目标文件格式，此类在线工具有很多，如 <https://csvjson.com/csv2json> 🔧

#### 1.1.3 如果内容不多，你也可以手动将词典源文件转换为目标文件格式，或批量交给 ChatGPT 生成 ✍️

#### 1.1.4 如果你卡在了这一步，可以回到 0 部分，交给我们来帮你完成这一步 🔄

### 1.2 词典的目标文件位置 📍

词典的目标文件位置是 `/public/dicts/`，请将处理好的词典文件放置在该目录下

### 1.3 词典的索引建立 🔍

词典的索引建立是在 `/resources/dictionary.ts` 中完成的，你需要在该文件中添加一行代码，格式如下：

```json
{
    "id": "xxx",
    "name": "xxx",
    "description": "xxx",
    "category": "xxx",
    "url": "./dicts/xxx.json",
    "length": xxx
}
```

例如:

```json
  {
    "id": "cet4",
    "name": "CET-4",
    "description": "大学英语四级词库",
    "category": "英语学习",
    "url": "/dicts/CET4_T.json",
    "length": 2607,
    "language": "en",
  },
  {
    "id": "cet6",
    "name": "CET-6",
    "description": "大学英语六级词库",
    "category": "英语学习",
    "url": "/dicts/CET6_T.json",
    "length": 2345,
    "language": "en",
  },
```

其中,  
`id` 需要是所有词典中唯一的  
`name` 是展示给所有用户的词典名  
`description` 是词典描述  
`category` 是词典分类（你可以事先阅读所有已存在的词典分类，来为新的词典选择合适的分类）  
`url` 是词典的目标文件位置  
`length` 是词典的单词数量（可以通过运行脚本 `scripts/update-dict-size.js` 来自动计算）  
`language` 表示词典的语言

### 1.4 测试 🧪

使用 yarn 指令安装依赖，然后使用 yarn dev 启动开发服务器，访问 "http://localhost:5173"

如果你的词典已经成功导入，你将在词典列表中看到你的词典。🎉

### 1.5 提交 PR 📝

现在你可以提交 PR 了，我们会尽快 review 你的代码，如果一切顺利，你的词典将会在下一个版本中发布。🎉

## 2. PEP 初中英语教材词表导入流程

适用于从人教版 7、8、9 年级英语教材 PDF 中提取 `Vocabulary in Each Unit` 单元词汇表，并导入到系统词典。

### 2.1 输入信息

每次处理前需要确认：

- PDF 文件名。
- 词表页码范围，按 PDF 物理页码处理。
- 对应系统入口，例如 `qi1`、`qi2`、`ba1`、`ba2`、`jiu`。
- 是否替换已有入口。默认替换对应年级入口，不新增 2026 入口。

### 2.2 提取步骤

1. 先用 `pdftotext` 检查 PDF 是否有文本层。
2. 如果文本层为空或乱码，将指定页渲染为高分辨率图片。
3. 用 OCR 识别每页图片。
4. 词表通常是双栏排版，先按左右栏拆分，再按每栏从上到下的顺序合并。
5. 按条目开头识别单词、短语、人名、地名和书名，续行合并到上一条。
6. PDF 中只有一个音标时，同时写入 `usphone` 和 `ukphone`。

目标 JSON 格式：

```json
[
  {
    "name": "calligraphy",
    "trans": ["书法"],
    "usphone": "ka\"lgrafi",
    "ukphone": "ka\"lgrafi"
  }
]
```

### 2.3 清洗要点

OCR 常见问题：

- `v.` 被识别成 `1.`。
- `adj.`、`adv.` 被识别成 `acj.`、`adu.`、`adw.`。
- 页码 `p.73`、词性 `n.`、`v.` 被误识别成独立词条。
- 页首或栏首可能只剩释义，漏掉词条名。
- 跨行短语、作品名、人名容易被拆成多个条目。
- 双栏如果直接按整页顺序读，会打乱原教材顺序。

清洗原则：

- 保留教材词表原始顺序。
- 人名、地名、短语、作品名都按 PDF 词表纳入。
- 词条名和中文释义优先保证准确。
- 音标尽量保留 OCR 结果；若 PDF 只有一个音标，同步写入 `usphone` / `ukphone`。
- 删除 OCR 产生的空释义、重复词条和明显伪词条。

### 2.4 文件命名

2026 版 PEP 初中英语词表建议使用：

```text
PEPChuZhong7_1_2026.json
PEPChuZhong7_2_2026.json
PEPChuZhong8_1_2026.json
PEPChuZhong8_2_2026.json
PEPChuZhong9_1_2026.json
```

文件放在：

```text
public/dicts/
```

### 2.5 更新入口

修改：

```text
src/resources/dictionary.ts
```

只更新对应入口的：

- `url`
- `length`

例如：

```ts
{
  id: 'ba2',
  name: '八年级下',
  description: '人教版八年级下册',
  category: '青少年英语',
  tags: ['人教版'],
  url: '/dicts/PEPChuZhong8_2_2026.json',
  length: 598,
  language: 'en',
  languageCategory: 'en',
}
```

不要提交教材 PDF，只提交生成的 JSON 和 `dictionary.ts` 修改。

### 2.6 校验清单

```bash
jq empty public/dicts/PEPChuZhong8_2_2026.json
jq length public/dicts/PEPChuZhong8_2_2026.json
curl -s -o /tmp/dict.json -w '%{http_code}\n' http://localhost:5173/dicts/PEPChuZhong8_2_2026.json
jq length /tmp/dict.json
```

还需要人工抽查：

- 第一页开头词。
- 每个单元开头词。
- 中间页跨栏词。
- 最后一页末尾词。
- 词典页展示的词数是否等于 JSON 实际长度。
- 选择对应年级后，首页加载的是否是新版词表。

## 别忘了，在任何步骤遇到困难时，你都可以转向 qwerty learner 社区寻求帮助。我们是一个非常友好的社区，随时欢迎你的加入！🤝
