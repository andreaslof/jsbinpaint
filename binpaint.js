// binpaint.js
// An experiment which will paint with hashed-base2-encoded strings
// Author(s): Andreas Löf Hermansson & Simon Westerlund

/*var test = 'andreas';
var string = test.md5().toBin().group();

for (var i = string.length-1; i > 0; i--) {
	console.log("x1:"+string[i].x1,"y1:"+string[i].y1,"x2:"+string[i].x2,"y2:"+string[i].y2);
}*/

var ready = function() {
	var c = document.getElementById('insert');
	var s = document.getElementById('submit');
	c.addEventListener('keypress',function(e){
		if (e.keyCode === 13 && c.value.length !== 0) submit(c.value);
	});
	s.addEventListener('click',function(e){
		if (c.value.length !== 0) submit(c.value);
	});
}

var submit = function(str) {
	var s = str.md5().toBin().group();
	for (var i = s.length-1; i > 0; i--) {
		console.log("x1:"+s[i].x1,"y1:"+s[i].y1,"x2:"+s[i].x2,"y2:"+s[i].y2);
	}
}