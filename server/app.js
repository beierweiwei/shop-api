'user static'

//设置环境变量
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const Koa = require('Koa')
const config = require('./config/env')
const logger = require('./util/logs')
const errorHandleMiddle = require('./util/error')
const mongoose = require('./connect')
const app = new Koa()

// 初始化数据
if (config.seedDB) {
	const initData = require('./config/seed')
	initData()
}

// log记录

// routes
app.use(async(ctx, next) => {
	ctx.logger = logger
	await next()
})

//错误处理中间件
app.use(errorHandleMiddle())
require('./config/koa')(app)
require('./routes')(app)


//错误监听
app.on('error', (err, ctx) => {
	if (process.env.NODE_ENV !== 'test') {
		console.error('error', err)
	}
})

module.exports = app