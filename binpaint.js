// binpaint.js
// An experiment which will paint with hashed-base2-encoded strings
// Author(s): Andreas Löf Hermansson & Simon Westerlund

var test = 'andreas';
var string = test.md5().toBin().group();

for(var i = string.length-1; i > 0; i--){
	console.log("x1:"+string[i].x1,"y1:"+string[i].y1,"x2:"+string[i].x2,"y2:"+string[i].y2);
}