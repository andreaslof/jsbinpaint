String.prototype.group = function(){
	var i, j;
	var res = [];
	var resStr;
	var str = this;
	var len = str.length/4;
	for(i = len; i >= 0; i--){
		res[i] = {
			x1:str.charAt(i),
			y1:str.charAt(i+1),
			x2:str.charAt(i+2),
			y2:str.charAt(i+3)
		};
	}
	return res;
}