const Koa = require('koa') // koa v2
const fs = require('fs')
const loggerAsync  = require('./middleware/logger-async')
const app = new Koa()
const Router = require('koa-router')

let home = new Router()

//子路由1
home.get('/', async ( ctx ) => {
  let url = ctx.url
  //从上下文的request对象中获取
  let request = ctx.request
  let req_query = request.query
  let req_querystring = request.querystring

  //从上下文中直接获取
  let ctx_query = ctx.query
  let ctx_querystring = ctx.querystring

  let html = `
    <div>
      <p>${req_querystring}</p>
      <p>${JSON.stringify(req_query)}</p>
      <p>${req_querystring}</p>
    </div>
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `
  ctx.body = html
})

//子路由2
let page = new Router()
page.get('/404', async ( ctx ) => {
  ctx.body = '404 page!'
}).get('/helloworld', async ( ctx ) => {
  ctx.body = 'helloworld page!'
})

//装载所有子路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
console.log('the server is starting at port 3000')
