exports.needLogin = async function(ctx, next) {
	if (!ctx.session.admin) {
			ctx.body = ctx.createRes(201)
	}else {
		await next()
	}
}

