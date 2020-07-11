'use strict'

const path = require('path')
const fs = require('fs')
const router = require('koa-router')()

module.exports = function (app) {

  router.get('/', async (ctx, next) => {
    const data = fs.readFileSync(path.join(__dirname, '../views/index.html'))

    ctx.type = 'text/html; charset=utf-8'
    ctx.body = data

  })
  router.use('/api', require('./send').routes(), require('./send').allowedMethods())


  app.use(router.routes(), router.allowedMethods())

}