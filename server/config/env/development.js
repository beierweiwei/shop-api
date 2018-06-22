'use strict'

// 开发环境配置
// ==================================
module.exports = {
  //开发环境mongodb配置
  mongo: {
    uri: `mongodb://localhost/shop`
  },
  //开发环境redis配置
  redis: {
    db: 0
  },
  seedDB: true,
  session:{
    cookie:  {maxAge: 60000*60*24*365}
  }
}