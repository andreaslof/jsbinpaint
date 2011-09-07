String.prototype.group = function(){
	var i, j;
	var res = [];
	var resStr;
	var str = this;
	var len = str.length;
	for(i = len/2; i >= 0; i--){
		res[i] = str.charAt(i)+str.charAt(i+1);
	}
	return res;
}