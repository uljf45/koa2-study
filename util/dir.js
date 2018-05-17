const url = require('url')
const fs = require('fs')
const path = require('path')

//遍历读取目录内容方法
const walk = require('./walk')

function dir ( url, reqPath ) {
  let contentList = walk( reqPath ) //遍历读取当前目录下的文件、子目录

  let html = `<ul>`
  for ( let [ index, item ] of contentList.entries() ) {
    html = `${html}<li><a href="${url === '/' ? '' : url}/${item}">${item}</a>`
  }
  html = `${html}</ul>`

  return html
}

module.exports = dir
