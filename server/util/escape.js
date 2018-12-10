
module.exports = (text) => {
	return text.replace(/['"]/g, '\\$&')
}