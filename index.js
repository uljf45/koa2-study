const Koa = require('koa') // koa v2
const views = require('koa-views')
const path = require('path')
const static = require('koa-static')
const app = new Koa()

const { uploadFile } = require('./util/upload')

app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

const staticPath = './static'

app.use(static(
  path.join( __dirname, staticPath)
))

app.use( async ( ctx ) => {
  if ( ctx.method === 'GET' ) {
    let title = 'upload pic async'
    await ctx.render('index', {
      title
    })
  } else if ( ctx.url === '/api/picture/upload.json' && ctx.method === 'POST' ) {
    //上传文件请求处理
    let result = { success: false }
    let serverFilePath = path.join(__dirname, 'static/image' )

    //上传文件事件
    result = await uploadFile ( ctx, {
      fileType: 'album', // common or album
      path: serverFilePath
    })
    ctx.body = result
  } else {
    ctx.body = '<h1>404!!!</h1>'
  }
})

app.listen(3000)
console.log('the server is starting at port 3000')
