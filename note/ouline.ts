
export type Outline = Array<{
  desc: string,
  id: string,
  sort: Array<{
    desc: string,
    id: string,
    source: Array<{
      desc: string,
      id: string,
      pathName: string,
      notePath: string
    }>
  }>
}>

export const outline = [
  {
    desc: "前端",
    id: "前端",
    sort: [
      {
        desc: "环境",
        id: "1",
        source: [
          {
            desc: "上下文",
            id: "1-1",
            pathName: "front--env--context",
            notePath: "C:\\Users\\Admin\\Desktop\\morgiana\\note\\[前端][front]\\[1][环境][env]\\[1-1][上下文][context].vue",
          },
          {
            desc: "作用域",
            id: "1-2",
            pathName: "front--env--scope",
            notePath: "C:\\Users\\Admin\\Desktop\\morgiana\\note\\[前端][front]\\[1][环境][env]\\[1-2][作用域][scope].vue",
          },
        ]
      },
      {
        desc: "数据",
        id: "2",
        source: [
          {
            desc: "基本类型",
            id: "2-1",
            pathName: "front--data--type",
            notePath: "C:\\Users\\Admin\\Desktop\\morgiana\\note\\[前端][front]\\[2][数据][data]\\[2-1][基本类型][type].vue",
          },
          {
            desc: "原型链",
            id: "2-2",
            pathName: "front--data--prototype",
            notePath: "C:\\Users\\Admin\\Desktop\\morgiana\\note\\[前端][front]\\[2][数据][data]\\[2-2][原型链][prototype].vue",
          },
        ]
      },
    ]
  },
  {
    desc: "游戏",
    id: "游戏",
    sort: [
    ]
  },
  {
    desc: "绘画",
    id: "绘画",
    sort: [
    ]
  }
];
