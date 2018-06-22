#项目笔记

#开发配置
#数据库（mongodb）
##安装
##启动
##mongoose

##可视化工具
[https://www.cnblogs.com/ljhdo/p/5793120.html](https://www.cnblogs.com/ljhdo/p/5793120.html)
#redius
##安装
[http://www.runoob.com/redis/redis-install.html](http://www.runoob.com/redis/redis-install.html)

##启动
[http://www.runoob.com/redis/redis-install.html](http://www.runoob.com/redis/redis-install.html)

*注意：启动时，需要使用cmd启动 `redis-server.exe redis.windows.conf`*

#项目结构
```
├─bin
├─coverage
│  └─server
│      ├─api
│      │  ├─article
│      │  ├─comment
│      │  ├─logs
│      │  ├─mobile
│      │  ├─tags
│      │  └─users
│      ├─auth
│      │  ├─github
│      │  ├─local
│      │  ├─qq
│      │  └─weibo
│      ├─config
│      │  └─env
│      ├─model
│      └─util
│          ├─debug
│          ├─error
│          ├─logs
│          ├─qiniu
│          ├─redis
│          └─tools
├─logs
├─server
│  ├─api
│  │  ├─article
│  │  ├─comment
│  │  ├─logs
│  │  ├─mobile
│  │  ├─tags
│  │  └─users
│  ├─auth
│  │  ├─github
│  │  ├─local
│  │  ├─qq
│  │  └─weibo
│  ├─config
│  │  └─env
│  │      └─private
│  ├─model
│  ├─services
│  └─util
│      ├─debug
│      ├─error
│      ├─logs
│      ├─qiniu
│      ├─redis
│      └─tools
├─test
│  ├─api
│  ├─auth
│  ├─helpers
│  └─utils
└─uploads
```

## 入口文件
`./server/app.js`
```js 
'use strict'

// 设置默认环境变量
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const Koa = require('koa')
const app = new Koa()
const config = require('./config/env')
const logger = require('./util/logs')
const errorHandleMiddle = require('./util/error')
const mongoose = require('./connect')

// 初始化数据
if(config.seedDB) { 
    const initData = require('./config/seed') 
    initData()
}

//log记录
//router use : this.logger.error('msg')
app.use(async (ctx, next) => {
    ctx.logger = logger
    await next()
})
//错误处理中间件
app.use(errorHandleMiddle())
require('./config/koa')(app)
require('./routes')(app)
//错误监听
app.on('error',(err,ctx)=>{
    if (process.env.NODE_ENV != 'test') {
        console.error('error', err)
    }
})

module.exports = app 
```

##数据库连接配置
`./server/connect.js`

```js 
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
const config = require('./config/env')

// 连接数据库.
mongoose.connect(config.mongo.uri, config.mongo.options)
const modelsPath = path.join(__dirname, 'model')
fs.readdirSync(modelsPath).forEach(function (file) {
    if (/(.*)\.(js$|coffee$)/.test(file)) {
        require(modelsPath + '/' + file)
    }
})
//mongoose promise 风格 [mongoose.Promise = require('bluebird')]
mongoose.Promise = global.Promise

module.exports = mongoose
```

##router配置
`./server/router.js`

```js
const Router = require('koa-router')()
const logs = require('./api/logs')
const users = require('./api/users')
const tags = require('./api/tags')
const article = require('./api/article')
const comment = require('./api/comment')
const mobile = require('./api/mobile')
const auth = require('./auth')

module.exports = function(app) {
  Router.use('/users',users.routes(),users.allowedMethods())
    Router.use('/auth',auth.routes(),auth.allowedMethods())
    Router.use('/tags',tags.routes(),tags.allowedMethods())
  Router.use('/article',article.routes(),article.allowedMethods())
    Router.use('/comment',comment.routes(),comment.allowedMethods())
    Router.use('/logs',logs.routes(),logs.allowedMethods())
    Router.use('/mobile',mobile.routes(),mobile.allowedMethods())
    Router.get('/*', (ctx,next)=> {
        ctx.body = {status:'success',data:'台湾是中国不可分割的一部分.'}
    })
    app.use(Router.routes())
}

```

##配置文件
目录：`./server/config`

###环境配置
`./server/config/env/index.js`

```js
'use strict'

var path = require('path')
var _ = require('lodash')
var fs = require('fs')

var all = {
  env: process.env.NODE_ENV,
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 9000,
  //mongodb配置
  mongo: {
    options: {
      useMongoClient: true,
      // user: process.env.MONGO_USERNAME || '', 
      // pass: process.env.MONGO_PASSWORD || ''
    }
  },
  //redis 配置
  redis: {
    host: process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1',
    port: process.env.REDIS_PORT_6379_TCP_PORT || 6379,
    password: process.env.REDIS_PASSWORD || ''
  },
  //是否初始化数据
  seedDB: process.env.INITDATA || false,
  session:{
    secrets: 'jackblog-secret',
  },
  //用户角色种类
  userRoles: ['user', 'admin'],
  //七牛配置
  qiniu:{
    app_key: process.env.QINIU_APP_KEY || '',
    app_secret: process.env.QINIU_APP_SECRET || '',
    domain: process.env.QINIU_APP_DOMAIN || '',          //七牛配置域名
    bucket: process.env.QINIU_APP_BUCKET || ''           //七牛空间名称  
  },
  //默认首页图片.
  defaultIndexImage: 'https://upload.jackhu.top/blog/index/default.jpg-600x1500q80',
  //第三方登录配置
  github:{
    clientID: process.env.GITHUB_CLIENT_ID || 'clientID',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'clientSecret',
    callbackURL: process.env.GITHUB_CALLBACK_URL || '',
  },
  weibo:{
    clientID: process.env.WEIBO_CLIENT_ID || 'clientID',
    clientSecret: process.env.WEIBO_CLIENT_SECRET || 'clientSecret',
    callbackURL: process.env.WEIBO_CALLBACK_URL || '',
  },
  qq:{
    clientID: process.env.QQ_CLIENT_ID || 'clientID',
    clientSecret: process.env.QQ_CLIENT_SECRET || 'clientSecret',
    callbackURL: process.env.QQ_CALLBACK_URL || '',
  },
  //移动APP列表
  apps:[
    {
      name:'React Native',
      gitUrl:'//github.com/jackhutu/jackblog-react-native-redux',
      downloadUrl:{
        android:'//a.app.qq.com/o/simple.jsp?pkgname=top.jackhu.reactnative',
        ios:''
      },
      qrcode:'https://upload.jackhu.top/qrcode/jackblog-react-native-qrcode.png'
    },
    {
      name:'Ionic 2.0',
      gitUrl:'//github.com/jackhutu/jackblog-ionic2',
      downloadUrl:{
        android:'https://upload.jackhu.top/downloads/Jackblog-ionic2-1.0.0.apk',
        ios:''
      },
      qrcode:'https://upload.jackhu.top/qrcode/jackblog-ionic2-v1.0.0.png'
    }
  ],
  //开启第三方登录
  snsLogins:['github','qq']
}

var config = _.merge(all,require('./' + process.env.NODE_ENV + '.js') || {})
//加载私有配置
if (fs.existsSync(path.join(__dirname, 'private/index.js'))) {
  config = _.merge(config, require(path.join(__dirname, 'private/index.js')) || {})  
}
module.exports = config

```

###koa配置(中间件)
`./server/config/koa.js`

```js
'use strict'

const path = require('path')
const session = require('koa-generic-session')
const RedisStore = require('koa-redis')
const responseTime = require('koa-response-time')
const logger = require('koa-logger')
const json = require('koa-json')
const compress = require('koa-compress')
const bodyParser = require('koa-bodyparser')
const cors = require('kcors')
const passport = require('koa-passport')
const config = require('./env')

module.exports = function(app) {
  if(app.env === 'development'){
    app.use(responseTime())
    app.use(logger())
  }
  app.use(cors({
    credentials: true
  }))
  app.use(bodyParser())
  app.use(json())
  app.keys = [config.session.secrets]
  app.use(session({
    key: 'jackblog.sid',
    store: RedisStore({
      host:config.redis.host,
      port:config.redis.port,
      auth_pass:config.redis.password || ''
    }),
    cookie: config.session.cookie
  }))
  app.use(passport.initialize())
  app.use(compress())
}

```

###数据库初始化
`./server/config/seed.js`

```js 
/**
 * 初始化数据
 * 管理员用户
 * email: admin@admin.com
 * password: admin
 */
'use strict'

const mongoose = require('mongoose')
const   User = mongoose.model('User')
const   Article = mongoose.model('Article')
const   TagCategory = mongoose.model('TagCategory')
const   Tag = mongoose.model('Tag')
const logger = require('../util/logs').logger

//初始化标签,文章,用户
module.exports = async ()=>{
    const userCount = await User.count()
    if(userCount === 0){
        await User.create({
            nickname:'admin',
            email:'admin@admin.com',
            role:'admin',
            password:'admin',
            status:1
        },{
            nickname:'test001',
            email:'test001@test.com',
            role:'user',
            password:'test',
            status:1
        },{
            nickname:'test002',
            email:'test002@test.com',
            role:'user',
            password:'test',
            status:2
        },{
            nickname:'test003',
            email:'test003@test.com',
            role:'user',
            password:'test',
            status:0
        })
    }
    const tagCount = await TagCategory.count()
    if(tagCount === 0){
        await Tag.remove()
        const languageCat = await TagCategory.create({
                    name:'language',
                    desc:'按编程语言分类'
                })
        await Tag.create({
                        name:'nodejs',
                        cid:languageCat._id,
                        is_show:true
                    },{
                        name:'angular',
                        cid:languageCat._id,
                        is_show:true
                    },{
                        name:'react',
                        cid:languageCat._id,
                        is_show:true
                    })
        const systemCat = await TagCategory.create({ name:'system',desc:'按操作系统分类'})
        await Tag.create({
                        name:'linux',
                        cid:systemCat._id,
                        is_show:true
                    },{
                        name:'ios',
                        cid:systemCat._id,
                        is_show:true
                    },{
                        name:'android',
                        cid:systemCat._id,
                        is_show:true
                    })
        const otherCat = await TagCategory.create({name:'other',desc:'其它分类'})
        await Tag.create({
                        name:'git',
                        cid:otherCat._id,
                        is_show:true
                    })

        const tags = await Tag.find({})
        await Article.remove()
        await tags.map(function (tag,index) {
            var indexOne = parseInt(index) +1
            var indexTwo = parseInt(index) +2
            Article.create({
                title:'第' + (index + indexOne) + '篇文章',
                content:'<p>我第' + (index + indexOne) + '次爱你.</p>',
                tags:[tag._id],
                status:1
            },{
                title:'第' + (index + indexTwo) + '篇文章',
                content:'<p>我第' + (index + indexTwo) + '次爱你.</p>',
                tags:[tag._id],
                status:1
            })
        })
    }   
}
```




#中间件

##bunyan
输出日志 代替console
[https://github.com/ajsharp/bunyan](https://github.com/ajsharp/bunyan)
Make logging useful (and easy!) with Bunyan and MongoDB. As in Paul.


##koa-router
[https://github.com/alexmingoia/koa-router](https://github.com/alexmingoia/koa-router)

##koa-logger(开发环境中使用)
[https://www.npmjs.com/package/koa-logger](https://www.npmjs.com/package/koa-logger)

##koa-response-time(开发环境中使用)
[https://www.npmjs.com/package/koa-response-time](https://www.npmjs.com/package/koa-response-time)
X-Response-Time middleware for Koa v2.

## 身份验证
`koa-passport`
`jwt`(json web token) [https://github.com/koajs/jwt](https://github.com/koajs/jwt)
`koa-jwt` [https://github.com/koajs/jwt](https://github.com/koajs/jwt)
`passport.js` [http://www.passportjs.org](http://www.passportjs.org)
[理解OAuth 2.0](http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html)
[理解jwt](http://www.haomou.net/2014/08/13/2014_bare_token/)

## 跨平台使用命令
`kcors`
[https://github.com/koajs/cors](https://github.com/koajs/cors)

## `session`
`koa-generic-session` 官方建议转至 `koajs-session`
[https://github.com/koajs/session](https://github.com/koajs/session)
支持将session存储到其他数据库 如 redis

## redis
`koa-redis` [https://github.com/koajs/koa-redis](https://github.com/koajs/koa-redis)

## 解析post请求body
`koa-bodyparser` [https://github.com/koajs/bodyparser](https://github.com/koajs/bodyparser)

## 文件上传
[busboy](https://chenshenhai.github.io/koa2-note/note/upload/simple.html)

## 开发相关插件
实时更新重启服务器（node进程守护）
### nodemon
[https://github.com/remy/nodemon](https://github.com/remy/nodemon)

### npm-run-all
一次运行多个npm run script 命令；
[http://www.css88.com/archives/8029#more-8029](http://www.css88.com/archives/8029#more-8029)

### cross-env
[https://github.com/kentcdodds/cross-env](https://github.com/kentcdodds/cross-env)
cross-env makes it so you can have a single command without worrying about setting or using the environment variable properly for the platform. Just set it like you would if it's running on a POSIX system, and cross-env will take care of setting it properly.
I use this in my npm scripts:
```json
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  }
}
```

### crypto 
加密编码

