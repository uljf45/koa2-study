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
  if ( ctx.url === '/index' ) {
    ctx.cookies.set(
      'cid',
      'hello world',
      {
        domain: 'localhost',
        path: '/',
        maxAge: 10 * 60 * 1000, //cookie有效时长
        expires: new Date('2018-09-09'), //cookies失效时间
        httpOnly: false, //是否只用于http请求中获取
        overwrite: false //是否允许重写
      }
    )
    ctx.body = 'cookie is ok'
  } else {
    ctx.body= 'hello world'
  }
})

app.listen(3000)
console.log('the server is starting at port 3000')
