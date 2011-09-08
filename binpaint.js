// binpaint.js
// An experiment which will paint with hashed-base2-encoded strings
// Author(s): Andreas Löf Hermansson & Simon Westerlund

var ready = function() {
	var c = document.getElementById('string');
	var s = document.getElementById('paint');
	c.addEventListener('keypress',function(e){
		if (e.keyCode === 13 && c.value.length !== 0) paintWith(c.value);
	});
	s.addEventListener('click',function(e){
		if (c.value.length !== 0) paintWith(c.value);
	});
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
