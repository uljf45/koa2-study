const Koa = require('koa') // koa v2
const path = require('path')
const content = require('./util/content')
const mimes = require('./util/mimes') 

const app = new Koa()

//静态资源目录
const staticPath = './static'

//解析资源类型
function parseMime( url ) {
  let extName = path.extname( url )
  console.log(`extName: ${extName}`)
  extName = extName ? extName.slice(1) : 'unkown'
  console.log(`extName: ${extName}`)
  console.log(mimes['css'])
  return mimes[ extName ]
}

app.use( async ( ctx ) => {
  //静态资源在本地的绝对路径
  let fullStaticPath = path.join(__dirname, staticPath)

  //获取静态资源内容, 有可能是文件内容, 目录, 或404
  let _content = await content( ctx, fullStaticPath )

  //解析请求内容的类型
  let _mime = parseMime( ctx.url )
  console.log(`url: ${ctx.url}`)
  console.log(`mime: ${_mime}`) 
  if ( _mime ) {
    ctx.type = _mime
  }

  if ( _mime && _mime.indexOf('image/') >= 0 ) {
    //如果是图片
    ctx.res.writeHead(200)
    ctx.res.write(_content, 'binary')
    ctx.res.end()
  } else {
    ctx.body = _content
  }
})

app.listen(3000)
console.log('the server is starting at port 3000')
