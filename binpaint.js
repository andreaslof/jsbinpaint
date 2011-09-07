// binpaint.js
// An experiment which will paint with hashed-base2-encoded strings
// Author(s): Andreas Löf Hermansson & Simon Westerlund

String.prototype.group = function(){
	var i, j;
	var arr = [];
	for(i=this.length; i>0; i++){
		console.log(this);
	}
}

var binhash = md5('andreas').toBin();
console.log(binhash.group());