// binpaint.js
// An experiment which will paint with hashed-base2-encoded strings
// Author(s): Andreas Löf Hermansson & Simon Westerlund

var test = 'andreas';
var string = test.md5().toBin().group();

for(var i = string.length-1; i > 0; i--){
	console.log("x:"+string[i].x,"y:"+string[i].y);
}

//console.log(string);