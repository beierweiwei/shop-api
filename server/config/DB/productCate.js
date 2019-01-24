const mongoose = require('mongoose')
const ids = Array(12).fill('').map(item => mongoose.Types.ObjectId())
const { data, productPropIds} = require('./productProps.js')
const propIds = productPropIds
exports.productCateIds = ids
exports.data = [
	{
		_id: ids[0],
		name: '服装',
		field: 'cloth',
		level: 1,
	},
	{
		_id: ids[1],
		name: '男装',
		field: 'man-cloth',
		level: 2,
		pid: ids[0]
	},
	{
		_id: ids[2],
		name: '女装',
		field: 'woman-cloth',
		level: 2,
		pid: ids[0]
	},
	{
		_id: ids[3],
		name: 'T恤',
		field: 'man-T',
		level: 3,
		pid: ids[1],
		props: [propIds[0], propIds[1]]

	},
	{
		_id: ids[4],
		name: '衬衫',
		field: 'man-shirt',
		level: 3,
		pid: ids[1],
		props: [propIds[0], propIds[1]]
	},
	{
		_id: ids[5],
		name: '牛仔裤',
		field: 'man-nzk',
		level: 3,
		pid: ids[1],
		props: [propIds[0], propIds[1]]
	},
	{
		_id: ids[6],
		name: '休闲裤',
		field: 'man-xxk',
		level: 3,
		pid: ids[1],
		props: [propIds[0], propIds[1]]
	},
	{
		_id: ids[7],
		name: '数码/3c',
		field: 'dghit',
		level: 1,
	},
	{
		_id: ids[8],
		name: '手机',
		field: 'phone',
		level: 2,
		pid: ids[7]
	},
	{
		_id: ids[9],
		name: '老人机',
		field: 'old-phone',
		level: 3,
		pid: ids[8],
		props: [propIds[2], propIds[3],  propIds[4]]
	},
	{
		_id: ids[10],
		name: '翻盖机',
		field: 'fg-phone',
		level: 3,
		pid: ids[8],
		props: [propIds[2], propIds[3],  propIds[4]]

	},
	{
		_id: ids[11],
		name: '全面屏',
		field: 'full-phone',
		level: 3,
		pid: ids[8],
		props: [propIds[2], propIds[3],  propIds[4]]

	}
]