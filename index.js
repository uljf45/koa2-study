const Koa = require('koa') // koa v2
const path = require('path')
const static = require('koa-static')

const app = new Koa()

//静态资源目录
const staticPath = './static'

app.use(static(
  path.join( __dirname, staticPath)
))

app.use( async ( ctx ) => {
  ctx.body = 'hello world'
})

app.listen(3000)
console.log('the server is starting at port 3000')
