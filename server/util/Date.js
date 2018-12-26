Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, // month
		"d+": this.getDate(), // day
		"h+": this.getHours(), // hour
		"m+": this.getMinutes(), // minute
		"s+": this.getSeconds() // second
	};
    
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1,
			    RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}

exports.isEarlier = function isE(time1, time2) {
	time1 = new Date(time1).getTime()
	time2 = new Date(time2).getTime()
	return time1 < time2 
} 
