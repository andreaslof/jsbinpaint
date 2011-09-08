// binpaint.js
// An experiment which will paint with hashed-base2-encoded strings
// Author(s): Andreas Löf Hermansson & Simon Westerlund

var ready = function() {
	var c = document.getElementById('insert');
	var s = document.getElementById('submit');
	c.addEventListener('keypress',function(e){
		if (e.keyCode === 13 && c.value.length !== 0) paintWith(c.value);
	});
	s.addEventListener('click',function(e){
		//if (c.value.length !== 0) submit(c.value);
		if (c.value.length !== 0) paintWith(c.value);
	});
}

var submit = function(str) {
	var s = str.md5().toBin().group();
	for (var i = s.length-1; i > 0; i--) {
		console.log("x1:"+s[i].x1,"y1:"+s[i].y1,"x2:"+s[i].x2,"y2:"+s[i].y2);
	}
}

function paintWith(str)
{
	var string = str.md5().toBin().group();
	//var string = document.getElementById('string').value.md5().toBin().group();
	//string = '1110'.group()
	paint(string);
}

function tryToPaint()
{
	//paint(string);
}
