const Koa = require('koa')
const session = require('koa-session-minimal')
const redisStore = require('koa-redis')

const app = new Koa()

app.use(session({
  store: redisStore()
}))

// count middleware, increment when url = /add
app.use(async (ctx, next) => {
  ctx.session.count = ctx.session.count || 0
  if (ctx.path === '/add') ctx.session.count++

  await next()

  ctx.body = ctx.session.count
})

app.listen(5000)
