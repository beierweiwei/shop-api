const mongoose = require('mongoose')
const { productPropIds: propIds, data: propData } = require('./productProps')
const { productCateIds:cateIds, data: cateData} = require('./productCate')
exports.ids = Array(20).fill('').map(() => mongoose.Types.ObjectId())
exports.data = [
	{
		title: 'HLA海澜之家经典摇粒绒夹克2018秋季新品柔软保暖夹克外套男HWJAD3E510A',
		thumbPic: ['//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'],
		des: 'HLA海澜之家经典摇粒绒夹克2018秋季新品柔软保暖夹克外套男HWJAD3E510A 浅蓝AK 175/92A/L',
		props: [propData[0], propData[1]],
		isSale: 1,
		stock: 1000,
		saleNum: 6,
		price: 120,
		mprice: 130,
		detail: 'test',
		unit: '件',
		activities: [],
		cateId: cateIds[3],
		subProds: [
			{
				propItems: '红,S',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '红,M',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '红,L',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '黄,XL',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
		]
	},
	{
		title: 'HLA海澜之家时尚纯色款摇粒绒夹克2019柔软夹克外套男HWJAW3E512A',
		thumbPic: ['//img10.360buyimg.com/n1/s350x449_jfs/t1/24800/40/5670/177719/5c412551Eb58dcc00/427b2f30a2fb676e.jpg!cc_350x449.jpg'],
		des: 'HLA海澜之家时尚纯色款摇粒绒夹克2019柔软夹克外套男HWJAW3E512A',
		props: [propData[0], propData[1]],
		isSale: 1,
		stock: 1000,
		saleNum: 6,
		price: 120,
		mprice: 130,
		detail: 'test',
		unit: '件',
		activities: [],
		cateId: cateIds[3],
		subProds: [
			{
				propItems: '红,S',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '红,M',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '红,L',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '黄,XL',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
		]
	},
	{
		title: 'HLA海澜之家简约花纹双领针织衫2018秋季新品提花假两件男HNTJD3E026A',
		thumbPic: ['//img12.360buyimg.com/n1/s350x449_jfs/t1/15098/38/5593/187694/5c41254eE7819bc69/1fa2439065069933.jpg!cc_350x449.jpg//img12.360buyimg.com/n1/s350x449_jfs/t1/15098/38/5593/187694/5c41254eE7819bc69/1fa2439065069933.jpg!cc_350x449.jpg//img12.360buyimg.com/n1/s350x449_jfs/t1/15098/38/5593/187694/5c41254eE7819bc69/1fa2439065069933.jpg!cc_350x449.jpg//img12.360buyimg.com/n1/s350x449_jfs/t1/15098/38/5593/187694/5c41254eE7819bc69/1fa2439065069933.jpg!cc_350x449.jpg//img12.360buyimg.com/n1/s350x449_jfs/t1/15098/38/5593/187694/5c41254eE7819bc69/1fa2439065069933.jpg!cc_350x449.jpg'],
		des: 'HLA海澜之家经典摇粒绒夹克2018秋季新品柔软保暖夹克外套男HWJAD3E510A 浅蓝AK 175/92A/L',
		props: [propData[0], propData[1]],
		isSale: 1,
		stock: 1000,
		saleNum: 6,
		price: 120,
		mprice: 130,
		detail: 'test',
		unit: '件',
		activities: [],
		cateId: cateIds[3],
		subProds: [
			{
				propItems: '红,S',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '红,M',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '红,L',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '黄,XL',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
		]
	},
	{
		title: 'HLA海澜之家经典摇粒绒夹克2018秋季新品柔软保暖夹克外套男HWJAD3E510A',
		thumbPic: ['//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'],
		des: 'HLA海澜之家经典摇粒绒夹克2018秋季新品柔软保暖夹克外套男HWJAD3E510A 浅蓝AK 175/92A/L',
		props: [propData[0], propData[1]],
		isSale: 1,
		stock: 1000,
		saleNum: 6,
		price: 120,
		mprice: 130,
		detail: 'test',
		unit: '件',
		activities: [],
		cateId: cateIds[3],
		subProds: [
			{
				propItems: '红,S',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '红,M',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '红,L',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '黄,XL',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
		]
	},
	{
		title: 'HLA海澜之家经典摇粒绒夹克2018秋季新品柔软保暖夹克外套男HWJAD3E510A',
		thumbPic: ['//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'],
		des: 'HLA海澜之家经典摇粒绒夹克2018秋季新品柔软保暖夹克外套男HWJAD3E510A 浅蓝AK 175/92A/L',
		props: [propData[0], propData[1]],
		isSale: 1,
		stock: 1000,
		saleNum: 6,
		price: 120,
		mprice: 130,
		detail: 'test',
		unit: '件',
		activities: [],
		cateId: cateIds[3],
		subProds: [
			{
				propItems: '红,S',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '红,M',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '红,L',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '黄,XL',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
		]
	},
	{
		title: 'HLA海澜之家经典摇粒绒夹克2018秋季新品柔软保暖夹克外套男HWJAD3E510A',
		thumbPic: ['//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'],
		des: 'HLA海澜之家经典摇粒绒夹克2018秋季新品柔软保暖夹克外套男HWJAD3E510A 浅蓝AK 175/92A/L',
		props: [propData[0], propData[1]],
		isSale: 1,
		stock: 1000,
		saleNum: 6,
		price: 120,
		mprice: 130,
		detail: 'test',
		unit: '件',
		activities: [],
		cateId: cateIds[3],
		subProds: [
			{
				propItems: '红,S',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '红,M',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '红,L',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '黄,XL',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
		]
	},
	{
		title: 'HLA海澜之家经典摇粒绒夹克2018秋季新品柔软保暖夹克外套男HWJAD3E510A',
		thumbPic: ['//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'],
		des: 'HLA海澜之家经典摇粒绒夹克2018秋季新品柔软保暖夹克外套男HWJAD3E510A 浅蓝AK 175/92A/L',
		props: [propData[0], propData[1]],
		isSale: 1,
		stock: 1000,
		saleNum: 6,
		price: 120,
		mprice: 130,
		detail: 'test',
		unit: '件',
		activities: [],
		cateId: cateIds[3],
		subProds: [
			{
				propItems: '红,S',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '红,M',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '红,L',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '黄,XL',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
		]
	},
	{
		title: 'HLA海澜之家经典摇粒绒夹克2018秋季新品柔软保暖夹克外套男HWJAD3E510A',
		thumbPic: ['//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'],
		des: 'HLA海澜之家经典摇粒绒夹克2018秋季新品柔软保暖夹克外套男HWJAD3E510A 浅蓝AK 175/92A/L',
		props: [propData[0], propData[1]],
		isSale: 1,
		stock: 1000,
		saleNum: 6,
		price: 120,
		mprice: 130,
		detail: 'test',
		unit: '件',
		activities: [],
		cateId: cateIds[3],
		subProds: [
			{
				propItems: '红,S',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '红,M',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '红,L',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '黄,XL',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
		]
	},
	{
		title: 'HLA海澜之家经典摇粒绒夹克2018秋季新品柔软保暖夹克外套男HWJAD3E510A',
		thumbPic: ['//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'],
		des: 'HLA海澜之家经典摇粒绒夹克2018秋季新品柔软保暖夹克外套男HWJAD3E510A 浅蓝AK 175/92A/L',
		props: [propData[0], propData[1]],
		isSale: 1,
		stock: 1000,
		saleNum: 6,
		price: 120,
		mprice: 130,
		detail: 'test',
		unit: '件',
		activities: [],
		cateId: cateIds[3],
		subProds: [
			{
				propItems: '红,S',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '红,M',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '红,L',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '黄,XL',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
		]
	},
	{
		title: 'HLA海澜之家经典摇粒绒夹克2018秋季新品柔软保暖夹克外套男HWJAD3E510A',
		thumbPic: ['//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'],
		des: 'HLA海澜之家经典摇粒绒夹克2018秋季新品柔软保暖夹克外套男HWJAD3E510A 浅蓝AK 175/92A/L',
		props: [propData[0], propData[1]],
		isSale: 1,
		stock: 1000,
		saleNum: 6,
		price: 120,
		mprice: 130,
		detail: 'test',
		unit: '件',
		activities: [],
		cateId: cateIds[3],
		subProds: [
			{
				propItems: '红,S',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '红,M',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '红,L',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
			{
				propItems: '黄,XL',
				price: 120,
				stock: 400,
				saleNum: 2,
				isSale: 1,
				thumbPic: '//img10.360buyimg.com/n1/s350x449_jfs/t1/3479/5/6447/473610/5ba2ff8cE43dc7ab3/9e6416f7cf7d301d.jpg!cc_350x449.jpg'
			},
		]
	},
]