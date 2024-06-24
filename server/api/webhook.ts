import { Router }  from 'express'
import { exec } from 'child_process'

const router = Router()

router.post('/webhook', async(req, res) => {
  const payload = req.body

  // 推送到main分支才触发
  if (payload?.ref === 'refs/heads/main') {
    // 由于docker更新太慢，因此必定会返回504超时，为了好看先手动返回成功码，就不先监听如果报错的错误报错了
    res.status(200).send('开始同步更新docker容器...')
    exec('cd /project/morgiana && git pull && ./update-docker.sh')
    
  } else {
    res.status(200).send('Not a push to the main branch')
  }
  
})

export default router

/**
 * @description: 111
 * @param: 
 * @returns 11333
 */
const a = () => {}