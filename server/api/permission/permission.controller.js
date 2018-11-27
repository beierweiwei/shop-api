const mongoose = require('mongoose')
const Role = mongoose.model('Role')


// todo 权限需要根据标准模版进行筛选后进行插入，
// 插入权限时，看角色是否拥有编辑权限的权利，和编辑权利的范围。
exports.getOne = async function (ctx, next) {
	let roleName = ctx.params.id
	let res
	try {
		res = await Role.findOne({roleName})
	} catch (err) {
		res = err.message
		ctx.body = ctx.createRes(500, res)
	}
	ctx.body = ctx.createRes(200, res)
}

exports.getList = async function (ctx, next) {
		let res
		let count
		let level = ctx.session.admin.level

		try {
			count = await Role.count()
			res = await Role.find({level: {$gt: level}})
			console.log(res)
			ctx.body = ctx.createRes(200, {list: res, count})
		} catch (err) {
			ctx.body = ctx.createRes(500, err.message)
		}
}

exports.create = async function (ctx, next) {
	let data = ctx.request.body
	let level = ctx.session.admin.level || 3 
	let permission = data.permission || {}
	let role = permission.role || []
	let res
	if (level === 0 &&  data.role.length > 0) level = level + 1 
	else level = 3
	try {
		res = await Role.create(data)
		ctx.body = ctx.createRes(200, res)
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
}

exports.update = async function (ctx, next) {
	let data = ctx.request.body
	let ids = data.roleName
	ids = typeof ids === 'string' ? [ids] : ids 
	let res 
	delete data.id 
	try {
		res = await Role.update({roleName: {$in: ids}}, {$set: data})
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
	ctx.body = ctx.createRes(200, res)
}

exports.delete = async function (ctx, next) {
	let data = ctx.request.body 
	let ids = data.roleName
	ids = typeof ids === 'string' ? [ids] : ids 
	let res 
	delete data.id 
	try {
		res = await Role.remove({roleName: {$in: ids}})
	} catch (err) {
		ctx.body = ctx.createRes(500, err.message)
	}
	ctx.body = ctx.createRes(200, res)
}

