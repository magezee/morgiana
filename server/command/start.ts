import inquirer, { type QuestionCollection } from 'inquirer' 
import { spawn, execSync } from 'child_process'

const question:QuestionCollection = [
  { 
    type: 'list',
    name: 'startType',
    message: 'link startto ~ 选择启动类型',
    choices: ['调试页面', '更新目录']
  },
]

inquirer
  .prompt(question)
  .then((answers) => {
    const { startType } = answers
    switch (startType) {
      case '调试页面':
        spawn(`npm`, ['run', 'dev:page'], { shell: true, stdio: 'inherit' })
        break
      case '更新目录':
        spawn(`npm`, ['run', 'update'], { shell: true, stdio: 'inherit' })
        break
    } 
  })
  .catch((err) => {
    if (err.isTryError) {
      console.log("Prompt couldn't be rendered in the current environment")
    } else {
      console.log(err)
    }
  })