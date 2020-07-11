const router = require('koa-router')()
const { sendMsg, sendGroupMsg } = require('../request/api')
const { robotTalk } = require('../request//txRobot')



// 发送好友消息
router.post('/sendMsg', async (ctx, next) => {
  let body = ctx.request.body
  if (body.toUser) {

    sendMsg(body).then(res => {
      ctx.body = { message: '发送成功', data: res.data }
      ctx.status = 200
    }).catch(err => {
      ctx.throw(500, { message: '发送失败', err })
    })

  } else {
    ctx.throw(500, { message: 'toUser不能为空！' })
  }

})

// 发送群消息
router.post('/sendGroupMsg', async (ctx, next) => {
  let body = ctx.request.body
  if (body.toGroup) {

    sendGroupMsg(body).then(res => {
      ctx.body = { message: '发送成功', data: res.data }
      ctx.status = 200
    }).catch(err => {
      ctx.throw(500, { message: '发送失败', err })
    })

  } else {
    ctx.throw(500, { message: 'toGroup不能为空！' })
  }

})


module.exports = router