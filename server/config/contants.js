exports.CODE_MSG = {
	'200': 'success',
  '201': 'not login',
  '203': 'no permit',
  '401': 'field error',
  '402': 'less field',
  '403': 'no data',
  '500': 'server error',
  // '501': 'no permit'
}
exports.adminPermission = {
	product: {
    product: ['update', 'delete', 'create', 'query'],
    cate: ['update', 'delete', 'create', 'query'],
    prop: ['update', 'delete', 'create', 'query']
  },
  user: {
    user: ['update', 'delete', 'create', 'query']
  },
  order: {
    order: ['update', 'delete', 'create', 'query']
  },
  postage: {
    postage: ['update', 'delete', 'create', 'query']
  },
  article: {
    article: ['update', 'delete', 'create', 'query'],
    cate: ['update', 'delete', 'create', 'query'],
  }
}

exports.userPermission = {
  user: {
    user: ['update',  'create', 'query']
  },
  order: {
    order: ['update', 'create', 'query']
  }
}
