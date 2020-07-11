/**
 * 错误处理中间件
 */

const errHandler = async (ctx, next) => {
  try {
    await next()
    // 设置所有get请求头不缓存
    if (ctx.method === 'GET') {
      ctx.set('Cache-Control', 'no-cache')
    }
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = {
      code: err.code || 0,
      message: err.message
    }
    ctx.app.emit('error', err, ctx)
  }
}

module.exports = errHandler
