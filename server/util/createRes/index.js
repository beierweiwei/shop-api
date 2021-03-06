// import {CODE_MSG} from '../../config'
const CODE_MSG = require('../../config/contants').CODE_MSG
module.exports = function (code, data, errMsg) {
	return {
		code: code,
		status: code == 200 ? 'success' : 'fail',
		errMsg: errMsg || CODE_MSG[code] || '',
		data: data
	}
}