var http = require('http'),
      inspect = require('util').inspect;
      path = require('path'),
      os = require('os'),
      fs = require('fs');


var Koa = require('koa')
var app = new Koa() 
var Busboy = require('busboy');
 
// http.createServer(function(req, res) {
//   if (req.method === 'POST') {
//     var busboy = new Busboy({ headers: req.headers });
//     busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
//       var saveTo = path.join(process.cwd(), 'upload', path.basename(filename));
//       file.pipe(fs.createWriteStream(saveTo));
//     });
//     busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
//       console.log('Field [' + fieldname + ']: value: ' + inspect(val));
//     });
//     busboy.on('finish', function() {
//       res.writeHead(200, { 'Connection': 'close' });
//       res.end("That's all folks!");
//     });
//     req.pipe(busboy);
//   }
// }).listen(9000, function() {
//   console.log('Listening for requests');
// });
// app.use(function (ctx, next) {
//   if (ctx.req.method === 'POST') {
//     var busboy = new Busboy({ headers: ctx.req.headers });
//     busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
//       var saveTo = path.join(process.cwd(), 'upload', path.basename(filename));
//       file.pipe(fs.createWriteStream(saveTo));
//     });
//     busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
//       console.log('Field [' + fieldname + ']: value: ' + inspect(val));
//     });
//     busboy.on('finish', function() {
//       ctx.res.writeHead(200, { 'Connection': 'close' });
//       ctx.res.end("That's all folks!");
//     });
//     ctx.req.pipe(busboy);
//   }
// }).listen(9000, function () {
//   console.log('listening for request')
// })

function uploadFile( ctx) {
  let req = ctx.req
  let res = ctx.res
  let busboy = new Busboy({headers: req.headers})

  // // 获取类型
  // let fileType = options.fileType || 'common'
  // let filePath = path.join( options.path,  fileType)
  // let mkdirResult = mkdirsSync( filePath )

  return new Promise((resolve, reject) => {
    console.log('文件上传中...')
    let result = { 
      success: false,
      formData: {},
    }

    // 解析请求文件事件
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      //let fileName = Math.random().toString(16).substr(2) + filename
      let saveTo = path.join(process.cwd(), 'upload', path.basename(filename))
      
      // 文件保存到制定路径
      file.pipe(fs.createWriteStream(saveTo))

      // 文件写入事件结束
      file.on('end', function() {
        result.success = true
        result.message = '文件上传成功'

        console.log('文件上传成功！')
        resolve(result)
      })
    })

    // 解析表单中其他字段信息
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log('表单字段数据 [' + fieldname + ']: value: ' + inspect(val));
      result.formData[fieldname] = inspect(val);
    });

    // 解析结束事件
    busboy.on('finish', function( ) {
      console.log('文件上结束')
      resolve(result)
    })

    // 解析错误事件
    busboy.on('error', function(err) {
      console.log('文件上出错')
      reject(result)
    })
  req.pipe(busboy)
  })
} 

app.use(async function (ctx, next) {
  if (ctx.method == 'POST') {
    console.log('xxxxxxxxxxxxxxxxx')
    const res = await uploadFile(ctx)
    if (res) {
      ctx.body = res
    }

  }
  
}).listen(9000, function () {
  console.log('listening for request')
})
