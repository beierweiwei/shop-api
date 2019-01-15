// 生产环境配置
// =================================
var MONGO_ADDR = 'localhost'

module.exports = {
  port: 9000,
  //生产环境mongodb配置
  // mongo: {
  //   uri: `mongodb://${encodeURIComponent(process.env.MONGO_USERNAME)}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@${MONGO_ADDR}/jackblog`
  // },
  //生产环境redis配置
  redis: {
    db: 1,
    dropBufferSupport: true
  },
  //生产环境cookie是否需要domain视具体情况而定.
  // session:{
  // 	cookie:  {domain:'.jackhu.top',maxAge: 60000*60*24*365}
  // }
}
