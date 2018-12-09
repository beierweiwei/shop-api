'user static'

//设置环境变量
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
// process.env.TZ = 'Asia/Shanghai' 

console.log(new Date().getHours())
const Koa = require('koa')
const config = require('./config/env')
const logger = require('./util/logs')
const errorHandleMiddle = require('./util/error')
const mongoose = require('./connect')
const createRes = require('./util/createRes')
const app = new Koa()
require('./util/Date')

// 初始化数据
if (config.seedDB) {
	const initData = require('./config/seed')
	initData()
}

app.use(async(ctx, next) => {
	// 附加方法
	ctx.logger = logger
	ctx.createRes = createRes
	await next()
})

//错误处理中间件
app.use(errorHandleMiddle())
require('./config/koa')(app)
require('./routes')(app)

//错误监听
app.on('error', (err, ctx) => {
	if (process.env.NODE_ENV !== 'development') {
		console.error('error', err)
	}
})

module.exports = app