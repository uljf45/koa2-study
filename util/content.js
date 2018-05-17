//读取请求内容.js
const path = require('path')
const fs = require('fs')

// 封装读取目录内容方法
const dir = require('./dir')
const file = require('./file')

async function content( ctx, fullStaticPath ) {
  let reqPath = path.join(fullStaticPath, ctx.url)

  let exist = fs.existsSync( reqPath )

  let content = ''

  if ( !exist ) {
    content = '404 Not Found!'
  } else {
    let stat = fs.statSync( reqPath )

    if ( stat.isDirectory() ) {
      content = dir( ctx.url, reqPath )
    } else {
      content = await file( reqPath )
    }
  }
  return content
}

module.exports = content
