import { Router }  from 'express'
import { exec } from 'child_process'




const router = Router()

router.post('/webhook', async(req, res) => {
  const payload = req.body

  // 推送到main分支才触发
  if (payload?.ref === 'refs/head/main') {
    exec('cd /project/morgiana && git pull && ./update-docker.sh', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error executing command: ${stderr}`)
        return res.status(500).send(`Error: ${stderr}`)
      }
  
      console.log(`Command output: ${stdout}`);
      res.status(200).send('Success')
    })
  } else {
    res.status(200).send('Not a push to the main branch')
  }
  
})

export default router