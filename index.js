const Koa = require('koa') // koa v2
const path = require('path')
const views = require('koa-views')
const app = new Koa()

app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

app.use( async ( ctx, next ) => {
  let title = 'hello koa2'
  await ctx.render('index', {
    title,
  })
  await next()
})

app.use( async ( ctx ) => {
  if ( ctx.url === '/set' ) {
    ctx.body = 'set' 
  } else if ( ctx.url === '/get') {
    ctx.body = 'get'
  }
})

app.listen(3000)
console.log('the server is starting at port 3000')
