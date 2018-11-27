const { adminPermission, userPermission } = require('../config/contants')

exports.hasEditAminPermit = function (ctx, next) {
	const user = ctx.session.admin
	const role = user.role || {}
	const level = user.level
	console.log(level < 2 || role.level < 2)
	if (level < 2 || role.level < 2) return next()
	else ctx.body = ctx.createRes(203)
}

exports.hasRequestPermit = function (permission) {
	return function (ctx, next) {
		const admin = ctx.session.admin
		const user = ctx.session.user
		const permitArray = permission.split('.')
		const [topPermission, subpermission, requestMethod] = permitArray
		const _permission = admin ? adminPermission : userPermission
		let myPermission, role, level
		if (admin) {
			role = admin.role  || {}
			level = role.level
			myPermission = role.permission || {}
			if (admin.level < 2 || level < 2) return next()
		} else if (user) {
			permission = userPermission
		} else {
			ctx.body = ctx.createRes(201)
		}
		topPermission = myPermission[topPermission] || {}
		subPermission = topPermission[subpermission] || []
		const hasPermit = ~ subPermission.indexOf(requestMethod)
		if (hasPermit) return next()
		ctx.body = ctx.createRes(203)
		
	}
}

exports.hasUserLogin = function async(ctx, next) {
	const user = ctx.session.user 
	if (user && !user.block) {
		return next()
	}else {
		const Message = user ? 'not login' : 'accout is block'
		ctx.body = ctx.createRes(201)
	}
}

exports.hasAdminLogin = function async(ctx, next) {
	const user = ctx.session.admin 
	if (user && !user.block) {
		return next()
	}else {
		const Message = user ? 'not login' : 'accout is block'
		ctx.body = ctx.createRes(201)
	}
}