// import {CODE_MSG} from '../../config'
const CODE_MSG = require('../../config/contants').CODE_MSG
module.exports = function (code, data) {
	return {
		code: code,
		status: code == 200 ? 'success' : 'fail',
		errMsg: CODE_MSG[code] || '',
		data: data
	}
}