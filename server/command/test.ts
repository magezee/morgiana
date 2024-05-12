import { IndentationText, Project, SyntaxKind, VariableDeclarationKind } from 'ts-morph'
import path from 'path'

const sourceFilePath = path.join(__dirname, './file.ts')

const project = new Project({
  manipulationSettings: { indentationText: IndentationText.TwoSpaces }
})

const sourceFile = project.addSourceFileAtPath(sourceFilePath)

// const arrayLiteral = sourceFile.addVariableStatement({
//   declarationKind: VariableDeclarationKind.Const,
//   declarations: [{
//       name: "myArray",
//       initializer: "[]"
//   }]
// })


let targetStatement = sourceFile.getVariableStatement('obj')

if (targetStatement) {
  targetStatement.remove()
}

targetStatement = sourceFile.addVariableStatement({
  declarationKind: VariableDeclarationKind.Const,
  declarations: [{
    name: "obj",
    initializer: "{}"
  }]
})

const declarationList = targetStatement.getFirstChildByKind(SyntaxKind.VariableDeclarationList)
const variableDeclaration = declarationList.getFirstChildByKind(SyntaxKind.VariableDeclaration)
const objectLiteralExpression = variableDeclaration.getFirstChildByKind(SyntaxKind.ObjectLiteralExpression)
const str = JSON.stringify({ x:1 , name: 'dd', children: [ { id: '1-2', name: 'cc' } ] }) 

objectLiteralExpression.addPropertyAssignment({ name: '1', initializer: str })

const targetArrStatement = sourceFile.addVariableStatement({
  declarationKind: VariableDeclarationKind.Const,
  declarations: [{
    name: 'arr',
    initializer: '[]'
  }]
})

const arr = targetArrStatement
  ?.getFirstChildByKind(SyntaxKind.VariableDeclarationList)
  ?.getFirstChildByKind(SyntaxKind.VariableDeclaration)
  ?.getFirstChildByKind(SyntaxKind.ArrayLiteralExpression)


const object = JSON.stringify({
  x: 1,
  y: 2
}) 
arr.addElement(object)

sourceFile.saveSync()