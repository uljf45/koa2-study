const Koa = require('koa') // koa v2
const path = require('path')
const static = require('koa-static')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')

const app = new Koa()

//配置存储session信息的mysql
let store = new MysqlSession({
  user: 'root',
  password: 'abc1234!',
  database: 'koa_demo',
  host: 'localhost'
})

//存放sessionId的cookie配置
let cookie = {
  maxAge: '',
  expires: '',
  path: '',
  domain: '',
  httpOnly: '',
  overwrite: '',//是否允许重写
  secure: '',
  sameSite: '',
  signed: ''
}

app.use(session({
  key: 'SESSION_ID',
  store: store,
  cookie: cookie
}))

//静态资源目录
const staticPath = './static'

app.use(static(
  path.join( __dirname, staticPath)
))

app.use( async ( ctx ) => {
  if ( ctx.url === '/set' ) {
    ctx.session = {
      user_id: Math.random().toString(36).substr(2),
      count: 0
    }
    ctx.body = ctx.session
  } else if ( ctx.url === '/get') {
    ctx.session.count = ctx.session.count + 1
    ctx.body = ctx.session
  }
})

app.listen(3000)
console.log('the server is starting at port 3000')
