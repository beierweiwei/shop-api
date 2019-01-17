const mongoose = require('mongoose')
let propIds = Array(5).fill('').map(item => mongoose.Types.ObjectId())
exports.productPropIds = propIds
exports.data  =  [
{
	_id: propIds[0],
	name: '颜色',
	field: 'color',
	isMulit: 1,
	selector: [
		'红',
		'橙',
		'黄',
		'绿',
		'青',
		'蓝',
		'紫'
	],
	sort: 0,
	cate: '衣服'
},{
	_id: propIds[1],
	name: '尺码',
	field: 'size',
	isMulit: 1,
	selector: [
		'XS',
		'S',
		'M',
		'L',
		'XL',
		'XLL',
		'XLLL'
	],
	sort: 0,
	cate: '衣服'
},{
	_id: propIds[2],
	name: '尺寸',
	field: 'size',
	isMulit: 1,
	selector: [
		'5.1',
		'4.7',
		'6',
		'6.2'
	],
	sort: 0,
	cate: '手机'
},{
	_id: propIds[3],
	name: '内存',
	field: 'ram',
	isMulit: 1,
	selector: [
		'2G',
		'4G',
		'6G',
		'8G',
		'1G'
	],
	sort: 0,
	cate: '手机'
},{
	_id: propIds[4],
	name: '容量',
	field: 'rom',
	isMulit: 1,
	selector: [
		'16G',
		'32G',
		'64G',
		'108G',
		'256G'
	],
	sort: 0,
	cate: '手机'
}

]
