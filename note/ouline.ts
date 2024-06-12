
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
          desc: "作用域",
          id: "scope",
          number: "1-2",
          pathName: "front--js--env--scope",
          notePath: "[1][前端][front]/[1][JS][js]/[1][环境][env]/[1-2][作用域][scope].vue"
        },
        ]
      },
      {
        desc: "数据",
        id: "data",
        number: "2",
        source: [
        {
          desc: "基本类型",
          id: "type",
          number: "2-1",
          pathName: "front--js--data--type",
          notePath: "[1][前端][front]/[1][JS][js]/[2][数据][data]/[2-1][基本类型][type].vue"
        },
        {
          desc: "原型链",
          id: "prototype",
          number: "2-2",
          pathName: "front--js--data--prototype",
          notePath: "[1][前端][front]/[1][JS][js]/[2][数据][data]/[2-2][原型链][prototype].vue"
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
      ]
    },
    ]
  },
  {
    desc: "绘画",
    id: "draw",
    sort: [
    ]
  },
  {
    desc: "游戏",
    id: "game",
    sort: [
    ]
  }
];
