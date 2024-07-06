import fs from 'fs'
import path from 'path'
import { IndentationText, Project, SyntaxKind, VariableDeclarationKind } from 'ts-morph'

// 想法 ==>
// 搞一个命令行 比如 npm build，一旦执行这命令就自动把笔记文件夹内的所有目录拿到，然后去更新前端路由以及其他文件的Ts代码更新
// 首先需要拿到笔记的目录结构

// 笔记结构目前选用对象结构而非数组结构，因为无法保证读取遍历的文件夹顺序，如果是按名字，那不同的笔记名字应该也会有顺序之分，如果直接按直接读取拿到的顺序，可能会有问题，因此直接选用对象结构
// 目前还需确定笔记需要多少个层级来确定，以及不同的笔记需要规划展示顺序，以及路由和标题的展示问题
// 目前可能的一个笔记文件暂定名字：比如 [1][front][前端] ===>>子文件===>> [1-1][css][样式] ===>>子文件===>> [1-1-1][flex][flex布局] 这种感觉，一个名字直接控制顺序-英文路由-中文介绍这种


/** --------------------------------------------------------------- */
// 根据目录结构解析出想要的笔记目录信息结构
const formatNoteFileName = (fileName: string) => {
  // "[1-1][基本][base]" => ['1-1','基本','base']
  return fileName.slice(1,-1).split('][')
}

const getNoteOutline = () => {
  // 层级结构可知为4层，因此不用递归了,方便拿不同层级的数据
  const notePath = path.join(__dirname, '../../note')
  const noteOutline = []

  const dir = fs.readdirSync(notePath, { withFileTypes: true })

  dir.forEach((firstFile) => {
    if(firstFile.isDirectory()) {
      const firstFormat = formatNoteFileName(firstFile.name)
      const sort = []
      noteOutline.push({
        desc: firstFormat[1],
        id: firstFormat[2],
        sort
      })
      

      // 第二层
      const secondDirPath = path.join(notePath, firstFile.name)
      const dir = fs.readdirSync(secondDirPath, { withFileTypes: true })
      dir.forEach((secondFile) => {
        const secondFormat = formatNoteFileName(secondFile.name)
        const list = []
        sort.push({
          desc: secondFormat[1],
          id: secondFormat[2],
          list
        })

        // 第三层
        const thirdDirPath = path.join(secondDirPath, secondFile.name)
        const dir = fs.readdirSync(thirdDirPath, { withFileTypes: true })
        dir.forEach((thridFile) => {
          const thirdFormat = formatNoteFileName(thridFile.name)   // 去掉.vue后缀名
          const source = []
          list.push({
            desc: thirdFormat[1],
            id: thirdFormat[2],
            number: thirdFormat[0],
            source
          })


          // 第四层
          const fourthPath = path.join(thirdDirPath, thridFile.name)
          const dir = fs.readdirSync(fourthPath, { withFileTypes: true })

          dir.forEach((fourthFile) => {
            const fourthFormat = formatNoteFileName(fourthFile.name.slice(0,-4))   // 去掉.vue后缀名
            source.push({
              desc: fourthFormat[1],
              id: fourthFormat[2],
              number: fourthFormat[0],
              pathName: `${firstFormat[2]}--${secondFormat[2]}--${thirdFormat[2]}--${fourthFormat[2]}`,
              notePath: `${firstFile.name}/${secondFile.name}/${thridFile.name}/${fourthFile.name}`,
            })
          })

    
        })
      })
    }
  })

  // 按默认文件名排序会有问题，如2-10会排在2-1之前，因此这里手动排序一下
  noteOutline.forEach((type) => {
    type.sort.forEach((sort) => {
      sort.list.forEach((list) => {
        list.source.sort((a, b) => {
          const numberA = a.number.split('-')[1]
          const numberB = b.number.split('-')[1]
          return numberA - numberB
        })
      })
    })
  })
  
  return noteOutline
}

// 将最新笔记目录的结构改动写入outline.ts文件
const noteOutline = getNoteOutline()

const sourceFilePath = path.join(__dirname, '../../note/ouline.ts')

const project = new Project({
  manipulationSettings: { indentationText: IndentationText.TwoSpaces }
})

const sourceFile = project.addSourceFileAtPath(sourceFilePath)
let targetStatement = sourceFile.getVariableStatement('outline')

if (targetStatement) {
  targetStatement.remove()
}

const targetArrStatement = sourceFile.addVariableStatement({
  declarationKind: VariableDeclarationKind.Const,
  declarations: [{
    name: 'outline',
    initializer: '[]'
  }]
})

const oulineArr = targetArrStatement
  ?.getFirstChildByKind(SyntaxKind.VariableDeclarationList)
  ?.getFirstChildByKind(SyntaxKind.VariableDeclaration)
  ?.getFirstChildByKind(SyntaxKind.ArrayLiteralExpression)


// 这里就是为了可视化更好看点
oulineArr.addElement((wirter) => {
  wirter.blankLine()
})

noteOutline.forEach((note) => {
  oulineArr.addElement((writer) => {
    writer.inlineBlock(() => {
      writer.write('desc: ').quote(note.desc)
      writer.write(',')
      writer.newLine()
      writer.write('id: ').quote(note.id)
      writer.write(',')
      writer.newLine()
      writer.write('sort: [')
      writer.newLine()
      note.sort.forEach((sort) => {
        writer.inlineBlock(() => {
          writer.write('desc: ').quote(sort.desc)
          writer.write(',')
          writer.newLine()
          writer.write('id: ').quote(sort.id)
          writer.write(',')
          writer.newLine()
          writer.write('list: [')
          writer.newLine()
          sort.list.forEach((list) => {
            writer.inlineBlock(() => {
              writer.write('desc: ').quote(list.desc)
              writer.write(',')
              writer.newLine()
              writer.write('id: ').quote(list.id)
              writer.write(',')
              writer.newLine()
              writer.write('number: ').quote(list.number)
              writer.write(',')
              writer.newLine()
              writer.write('source: [')
              writer.newLine()
              list.source.forEach((source) => {
                writer.inlineBlock(() => {
                  writer.write('desc: ').quote(source.desc)
                  writer.write(',')
                  writer.newLine()
                  writer.write('id: ').quote(source.id)
                  writer.write(',')
                  writer.newLine()
                  writer.write('number: ').quote(source.number)
                  writer.write(',')
                  writer.newLine()
                  writer.write('pathName: ').quote(source.pathName)
                  writer.write(',')
                  writer.newLine()
                  writer.write('notePath: ').quote(source.notePath)
                })
                writer.write(',')
                writer.newLine()
              })
              writer.write(']')
            })
            writer.write(',')
            writer.newLine()
          })
          writer.write(']')
        })
        writer.write(',')
        writer.newLine()
      })
      writer.write(']')
    })
    
  })
})

targetArrStatement.setIsExported(true)

console.log('更新笔记目录成功~')
sourceFile.saveSync()
