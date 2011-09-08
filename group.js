String.prototype.group = function() {
	var i, j;
	var res = [];
	var str = this;
	var len = str.length/4;
	for(i = len; i >= 0; i--){
		res[i] = {
			y1:str.charAt(i),
			x1:str.charAt(i+1),
			y2:str.charAt(i+2),
			x2:str.charAt(i+3)
		};
	}
	return res;
}