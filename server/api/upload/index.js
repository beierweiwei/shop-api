const Busboy = require('busboy')
const Router = require('koa-router')()
const inspect = require('util').inspect
const path = require('path')
const fs = require('fs');



const Upload = async (ctx, next) => {
	function uploadFile(ctx) {
		const busboy = new Busboy({ headers: ctx.req.headers })
		return new Promise((resolve, reject) => {
			const result = {
				success: false
			}
			// todo on data 无效
	    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
	    	const fileName = Math.random().toString(16).substr(2) + '_' + filename
	    	const serverPath = path.join('/upload', fileName)
	    	result.fileName = fileName
	    	result.serverPath = serverPath
	    	console.log(serverPath)
	      var saveTo = path.join(process.cwd(), 'static','upload', path.basename(fileName));
	      file.pipe(fs.createWriteStream(saveTo));
	    });
	    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
	      console.log('Field [' + fieldname + ']: value: ' + inspect(val));
	    })
	    // busboy.on('end', function() {
	    // 	result.success = true
	    // 	resolve(true)
	    // })
	    busboy.on('finish', function() {
				result.success = true
				resolve(result)  	
	    })

	    busboy.on('error', function(err) {
	      console.log('文件上出错')
	      reject(result)
	    })
	    ctx.req.pipe(busboy)
		})
	}
	let result
	result = await uploadFile(ctx)
	if (result.success) {
		ctx.body = ctx.createRes(200, result)
	} else {
		ctx.body = ctx.createRes(500)
	}
}

Router.post('upload', Upload)

module.exports = Router