const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
const config = require('./config/env')

//连接数据库
const result =  mongoose.connect(config.mongo.uri, config.mongo.options)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => console.log.bind(console, 'connect success!'))
const modelsPath = path.join(__dirname, 'model')
fs.readdirSync(modelsPath).forEach(function (file) {
	if (/(.*)\.(js$|coffee$)/.test(file)) {
		require(modelsPath + '/' + file)
	}
})

mongoose.Promise = global.Promise

module.exports = mongoose