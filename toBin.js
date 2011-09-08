String.prototype.toBin = function() {
	var st,i,j,d;
	var arr = [];
	var len = this.length;
	for (i = len; i>0; i--) {
	 	d = this.charCodeAt(i-1);
		for (j = 0; j < 8; j++) {
	 		arr[arr.length] = d%2;
			d = Math.floor(d/2);
		}
	}
	return arr.reverse().join("");
}