
export type Outline = Array<{
  desc: string,
  id: string,
  sort: Array<{
    desc: string,
    id: string,
    list: Array<{
      desc: string,
      id: string,
      number:string
      source: Array<{
        desc: string,
        id: string,
        number:string
        pathName: string,
        notePath: string
      }>
    }>
  }>
}>

export const outline = [
  {
    desc: "前端",
    id: "front",
    sort: [
    {
      desc: "JS",
      id: "js",
      list: [
      {
        desc: "环境",
        id: "env",
        number: "1",
        source: [
        {
          desc: "上下文",
          id: "context",
          number: "1-1",
          pathName: "front--js--env--context",
          notePath: "[1][前端][front]/[1][JS][js]/[1][环境][env]/[1-1][上下文][context].vue"
        },
        {
          desc: "事件循环",
          id: "loop",
          number: "1-2",
          pathName: "front--js--env--loop",
          notePath: "[1][前端][front]/[1][JS][js]/[1][环境][env]/[1-2][事件循环][loop].vue"
        },
        {
          desc: "模块化",
          id: "module",
          number: "1-3",
          pathName: "front--js--env--module",
          notePath: "[1][前端][front]/[1][JS][js]/[1][环境][env]/[1-3][模块化][module].vue"
        },
        ]
      },
      {
        desc: "数据",
        id: "data",
        number: "2",
        source: [
        {
          desc: "类型",
          id: "type",
          number: "2-1",
          pathName: "front--js--data--type",
          notePath: "[1][前端][front]/[1][JS][js]/[2][数据][data]/[2-1][类型][type].vue"
        },
        {
          desc: "原型链",
          id: "prototype",
          number: "2-2",
          pathName: "front--js--data--prototype",
          notePath: "[1][前端][front]/[1][JS][js]/[2][数据][data]/[2-2][原型链][prototype].vue"
        },
        {
          desc: "构造函数",
          id: "constructor",
          number: "2-3",
          pathName: "front--js--data--constructor",
          notePath: "[1][前端][front]/[1][JS][js]/[2][数据][data]/[2-3][构造函数][constructor].vue"
        },
        {
          desc: "Class",
          id: "class",
          number: "2-4",
          pathName: "front--js--data--class",
          notePath: "[1][前端][front]/[1][JS][js]/[2][数据][data]/[2-4][Class][class].vue"
        },
        {
          desc: "Object",
          id: "object",
          number: "2-5",
          pathName: "front--js--data--object",
          notePath: "[1][前端][front]/[1][JS][js]/[2][数据][data]/[2-5][Object][object].vue"
        },
        {
          desc: "Function",
          id: "function",
          number: "2-6",
          pathName: "front--js--data--function",
          notePath: "[1][前端][front]/[1][JS][js]/[2][数据][data]/[2-6][Function][function].vue"
        },
        {
          desc: "Array",
          id: "array",
          number: "2-7",
          pathName: "front--js--data--array",
          notePath: "[1][前端][front]/[1][JS][js]/[2][数据][data]/[2-7][Array][array].vue"
        },
        {
          desc: "String",
          id: "string",
          number: "2-8",
          pathName: "front--js--data--string",
          notePath: "[1][前端][front]/[1][JS][js]/[2][数据][data]/[2-8][String][string].vue"
        },
        {
          desc: "RegExp",
          id: "regexp",
          number: "2-9",
          pathName: "front--js--data--regexp",
          notePath: "[1][前端][front]/[1][JS][js]/[2][数据][data]/[2-9][RegExp][regexp].vue"
        },
        {
          desc: "Number",
          id: "number",
          number: "2-10",
          pathName: "front--js--data--number",
          notePath: "[1][前端][front]/[1][JS][js]/[2][数据][data]/[2-10][Number][number].vue"
        },
        {
          desc: "Math",
          id: "math",
          number: "2-11",
          pathName: "front--js--data--math",
          notePath: "[1][前端][front]/[1][JS][js]/[2][数据][data]/[2-11][Math][math].vue"
        },
        {
          desc: "Symbol",
          id: "symbol",
          number: "2-12",
          pathName: "front--js--data--symbol",
          notePath: "[1][前端][front]/[1][JS][js]/[2][数据][data]/[2-12][Symbol][symbol].vue"
        },
        {
          desc: "Map",
          id: "map",
          number: "2-13",
          pathName: "front--js--data--map",
          notePath: "[1][前端][front]/[1][JS][js]/[2][数据][data]/[2-13][Map][map].vue"
        },
        {
          desc: "Set",
          id: "set",
          number: "2-14",
          pathName: "front--js--data--set",
          notePath: "[1][前端][front]/[1][JS][js]/[2][数据][data]/[2-14][Set][set].vue"
        },
        {
          desc: "Promise",
          id: "promise",
          number: "2-15",
          pathName: "front--js--data--promise",
          notePath: "[1][前端][front]/[1][JS][js]/[2][数据][data]/[2-15][Promise][promise].vue"
        },
        ]
      },
      ]
    },
    {
      desc: "CSS",
      id: "css",
      list: [
      {
        desc: "基本",
        id: "base",
        number: "1",
        source: [
        {
          desc: "选择器",
          id: "selector",
          number: "1-1",
          pathName: "front--css--base--selector",
          notePath: "[1][前端][front]/[2][CSS][css]/[1][基本][base]/[1-1][选择器][selector].vue"
        },
        ]
      },
      {
        desc: "预处理器",
        id: "preprocessor",
        number: "2",
        source: [
        {
          desc: "Less",
          id: "less",
          number: "2-1",
          pathName: "front--css--preprocessor--less",
          notePath: "[1][前端][front]/[2][CSS][css]/[2][预处理器][preprocessor]/[2-1][Less][less].vue"
        },
        ]
      },
      ]
    },
    {
      desc: "Html",
      id: "html",
      list: [
      {
        desc: "元素",
        id: "element",
        number: "1",
        source: [
        {
          desc: "描述",
          id: "desc",
          number: "1-1",
          pathName: "front--html--element--desc",
          notePath: "[1][前端][front]/[3][Html][html]/[1][元素][element]/[1-1][描述][desc].vue"
        },
        {
          desc: "表单",
          id: "form",
          number: "1-2",
          pathName: "front--html--element--form",
          notePath: "[1][前端][front]/[3][Html][html]/[1][元素][element]/[1-2][表单][form].vue"
        },
        {
          desc: "媒体",
          id: "media",
          number: "1-3",
          pathName: "front--html--element--media",
          notePath: "[1][前端][front]/[3][Html][html]/[1][元素][element]/[1-3][媒体][media].vue"
        },
        {
          desc: "样式",
          id: "style",
          number: "1-4",
          pathName: "front--html--element--style",
          notePath: "[1][前端][front]/[3][Html][html]/[1][元素][element]/[1-4][样式][style].vue"
        },
        {
          desc: "区域",
          id: "area",
          number: "1-5",
          pathName: "front--html--element--area",
          notePath: "[1][前端][front]/[3][Html][html]/[1][元素][element]/[1-5][区域][area].vue"
        },
        ]
      },
      {
        desc: "交互",
        id: "operation",
        number: "2",
        source: [
        {
          desc: "事件",
          id: "event",
          number: "2-1",
          pathName: "front--html--operation--event",
          notePath: "[1][前端][front]/[3][Html][html]/[2][交互][operation]/[2-1][事件][event].vue"
        },
        ]
      },
      ]
    },
    {
      desc: "浏览器",
      id: "browser",
      list: [
      {
        desc: "请求",
        id: "request",
        number: "1",
        source: [
        {
          desc: "原理",
          id: "theory",
          number: "1-1",
          pathName: "front--browser--request--theory",
          notePath: "[1][前端][front]/[4][浏览器][browser]/[1][请求][request]/[1-1][原理][theory].vue"
        },
        ]
      },
      {
        desc: "身份",
        id: "identity].vu",
        number: "2",
        source: [
        {
          desc: "Cookie",
          id: "cookie",
          number: "2-1",
          pathName: "front--browser--identity].vu--cookie",
          notePath: "[1][前端][front]/[4][浏览器][browser]/[2][身份][identity].vue/[2-1][Cookie][cookie].vue"
        },
        ]
      },
      ]
    },
    ]
  },
  {
    desc: "服务器",
    id: "server",
    sort: [
    {
      desc: "Node",
      id: "node",
      list: [
      {
        desc: "node-js",
        id: "node-js",
        number: "1",
        source: [
        {
          desc: "搭建服务",
          id: "build",
          number: "1-1",
          pathName: "server--node--node-js--build",
          notePath: "[2][服务器][server]/[1][Node][node]/[1][node-js][node-js]/[1-1][搭建服务][build].vue"
        },
        ]
      },
      {
        desc: "express",
        id: "express",
        number: "2",
        source: [
        {
          desc: "搭建服务",
          id: "build",
          number: "1-1",
          pathName: "server--node--express--build",
          notePath: "[2][服务器][server]/[1][Node][node]/[2][express][express]/[1-1][搭建服务][build].vue"
        },
        ]
      },
      ]
    },
    {
      desc: "数据库",
      id: "db",
      list: [
      {
        desc: "MySQL",
        id: "sql",
        number: "1",
        source: [
        {
          desc: "安装",
          id: "install",
          number: "1-1",
          pathName: "server--db--sql--install",
          notePath: "[2][服务器][server]/[2][数据库][db]/[1][MySQL][sql]/[1-1][安装][install].vue"
        },
        ]
      },
      {
        desc: "MongoDB",
        id: "mongodb",
        number: "2",
        source: [
        {
          desc: "安装",
          id: "install",
          number: "1-1",
          pathName: "server--db--mongodb--install",
          notePath: "[2][服务器][server]/[2][数据库][db]/[2][MongoDB][mongodb]/[1-1][安装][install].vue"
        },
        ]
      },
      ]
    },
    {
      desc: "网站部署",
      id: "deploy-site",
      list: [
      {
        desc: "Docker",
        id: "docker",
        number: "1",
        source: [
        {
          desc: "介绍",
          id: "desc",
          number: "1-1",
          pathName: "server--deploy-site--docker--desc",
          notePath: "[2][服务器][server]/[3][网站部署][deploy-site]/[1][Docker][docker]/[1-1][介绍][desc].vue"
        },
        {
          desc: "描述文件",
          id: "docker-file",
          number: "1-2",
          pathName: "server--deploy-site--docker--docker-file",
          notePath: "[2][服务器][server]/[3][网站部署][deploy-site]/[1][Docker][docker]/[1-2][描述文件][docker-file].vue"
        },
        {
          desc: "容器编排",
          id: "docker-compose",
          number: "1-3",
          pathName: "server--deploy-site--docker--docker-compose",
          notePath: "[2][服务器][server]/[3][网站部署][deploy-site]/[1][Docker][docker]/[1-3][容器编排][docker-compose].vue"
        },
        {
          desc: "Yaml",
          id: "yaml",
          number: "1-4",
          pathName: "server--deploy-site--docker--yaml",
          notePath: "[2][服务器][server]/[3][网站部署][deploy-site]/[1][Docker][docker]/[1-4][Yaml][yaml].vue"
        },
        {
          desc: "问题汇总",
          id: "solution",
          number: "1-5",
          pathName: "server--deploy-site--docker--solution",
          notePath: "[2][服务器][server]/[3][网站部署][deploy-site]/[1][Docker][docker]/[1-5][问题汇总][solution].vue"
        },
        ]
      },
      {
        desc: "集成部署",
        id: "cicd",
        number: "2",
        source: [
        {
          desc: "介绍",
          id: "desc",
          number: "2-1",
          pathName: "server--deploy-site--cicd--desc",
          notePath: "[2][服务器][server]/[3][网站部署][deploy-site]/[2][集成部署][cicd]/[2-1][介绍][desc].vue"
        },
        {
          desc: "Webhook",
          id: "webhook",
          number: "2-2",
          pathName: "server--deploy-site--cicd--webhook",
          notePath: "[2][服务器][server]/[3][网站部署][deploy-site]/[2][集成部署][cicd]/[2-2][Webhook][webhook].vue"
        },
        {
          desc: "Github Action",
          id: "github-action",
          number: "2-3",
          pathName: "server--deploy-site--cicd--github-action",
          notePath: "[2][服务器][server]/[3][网站部署][deploy-site]/[2][集成部署][cicd]/[2-3][Github Action][github-action].vue"
        },
        ]
      },
      ]
    },
    ]
  },
  {
    desc: "游戏",
    id: "game",
    sort: [
    {
      desc: "C-Sharp",
      id: "c-sharp",
      list: [
      {
        desc: "环境",
        id: "env",
        number: "1",
        source: [
        {
          desc: "启动",
          id: "start",
          number: "1-1",
          pathName: "game--c-sharp--env--start",
          notePath: "[3][游戏][game]/[1][C-Sharp][c-sharp]/[1][环境][env]/[1-1][启动][start].vue"
        },
        ]
      },
      {
        desc: "数据",
        id: "data",
        number: "2",
        source: [
        {
          desc: "类型",
          id: "type",
          number: "1-1",
          pathName: "game--c-sharp--data--type",
          notePath: "[3][游戏][game]/[1][C-Sharp][c-sharp]/[2][数据][data]/[1-1][类型][type].vue"
        },
        ]
      },
      ]
    },
    {
      desc: "Unity",
      id: "unity",
      list: [
      {
        desc: "基本",
        id: "base",
        number: "1",
        source: [
        {
          desc: "安装",
          id: "install",
          number: "1-1",
          pathName: "game--unity--base--install",
          notePath: "[3][游戏][game]/[2][Unity][unity]/[1][基本][base]/[1-1][安装][install].vue"
        },
        ]
      },
      {
        desc: "组件",
        id: "component",
        number: "2",
        source: [
        {
          desc: "触发器",
          id: "trigger",
          number: "2-1",
          pathName: "game--unity--component--trigger",
          notePath: "[3][游戏][game]/[2][Unity][unity]/[2][组件][component]/[2-1][触发器][trigger].vue"
        },
        ]
      },
      ]
    },
    ]
  },
  {
    desc: "好玩的",
    id: "fun",
    sort: [
    {
      desc: "分享",
      id: "share",
      list: [
      {
        desc: "工具",
        id: "tool",
        number: "1",
        source: [
        {
          desc: "前端",
          id: "front",
          number: "1-1",
          pathName: "fun--share--tool--front",
          notePath: "[4][好玩的][fun]/[1][分享][share]/[1][工具][tool]/[1-1][前端][front].vue"
        },
        {
          desc: "绘图",
          id: "draw",
          number: "1-2",
          pathName: "fun--share--tool--draw",
          notePath: "[4][好玩的][fun]/[1][分享][share]/[1][工具][tool]/[1-2][绘图][draw].vue"
        },
        ]
      },
      {
        desc: "插件",
        id: "plugin",
        number: "2",
        source: [
        {
          desc: "浏览器",
          id: "browser",
          number: "2-1",
          pathName: "fun--share--plugin--browser",
          notePath: "[4][好玩的][fun]/[1][分享][share]/[2][插件][plugin]/[2-1][浏览器][browser].vue"
        },
        {
          desc: "vscode",
          id: "vscode",
          number: "2-2",
          pathName: "fun--share--plugin--vscode",
          notePath: "[4][好玩的][fun]/[1][分享][share]/[2][插件][plugin]/[2-2][vscode][vscode].vue"
        },
        ]
      },
      {
        desc: "AI",
        id: "ai",
        number: "3",
        source: [
        {
          desc: "GPT",
          id: "gpt",
          number: "3-1",
          pathName: "fun--share--ai--gpt",
          notePath: "[4][好玩的][fun]/[1][分享][share]/[3][AI][ai]/[3-1][GPT][gpt].vue"
        },
        {
          desc: "绘图",
          id: "draw",
          number: "3-2",
          pathName: "fun--share--ai--draw",
          notePath: "[4][好玩的][fun]/[1][分享][share]/[3][AI][ai]/[3-2][绘图][draw].vue"
        },
        ]
      },
      ]
    },
    {
      desc: "整活",
      id: "interest",
      list: [
      {
        desc: "爬虫",
        id: "spider",
        number: "1",
        source: [
        {
          desc: "原理",
          id: "theory",
          number: "1-1",
          pathName: "fun--interest--spider--theory",
          notePath: "[4][好玩的][fun]/[2][整活][interest]/[1][爬虫][spider]/[1-1][原理][theory].vue"
        },
        ]
      },
      {
        desc: "QQ机器人",
        id: "qq-bot",
        number: "2",
        source: [
        {
          desc: "原理",
          id: "theory",
          number: "1-1",
          pathName: "fun--interest--qq-bot--theory",
          notePath: "[4][好玩的][fun]/[2][整活][interest]/[2][QQ机器人][qq-bot]/[1-1][原理][theory].vue"
        },
        ]
      },
      ]
    },
    ]
  },
  {
    desc: "绘画",
    id: "draw",
    sort: [
    {
      desc: "概念",
      id: "conception",
      list: [
      {
        desc: "透视",
        id: "perspective",
        number: "1",
        source: [
        {
          desc: "视平线",
          id: "apparent-horizon",
          number: "1-1",
          pathName: "draw--conception--perspective--apparent-horizon",
          notePath: "[4][绘画][draw]/[1][概念][conception]/[1][透视][perspective]/[1-1][视平线][apparent-horizon].vue"
        },
        ]
      },
      {
        desc: "色彩",
        id: "color",
        number: "2",
        source: [
        {
          desc: "原理",
          id: "theory",
          number: "2-1",
          pathName: "draw--conception--color--theory",
          notePath: "[4][绘画][draw]/[1][概念][conception]/[2][色彩][color]/[2-1][原理][theory].vue"
        },
        ]
      },
      ]
    },
    {
      desc: "人体",
      id: "body",
      list: [
      {
        desc: "骨骼",
        id: "skeleton",
        number: "1",
        source: [
        {
          desc: "头骨",
          id: "head",
          number: "1-1",
          pathName: "draw--body--skeleton--head",
          notePath: "[4][绘画][draw]/[2][人体][body]/[1][骨骼][skeleton]/[1-1][头骨][head].vue"
        },
        ]
      },
      {
        desc: "肌肉",
        id: "muscles",
        number: "2",
        source: [
        {
          desc: "腹部",
          id: "abdomen",
          number: "1-1",
          pathName: "draw--body--muscles--abdomen",
          notePath: "[4][绘画][draw]/[2][人体][body]/[2][肌肉][muscles]/[1-1][腹部][abdomen].vue"
        },
        ]
      },
      ]
    },
    ]
  }
];
