// binpaint.js
// An experiment which will paint with hashed-base2-encoded strings
// Author(s): Andreas Löf Hermansson & Simon Westerlund


function prepareString()
{
	var string = document.getElementById('string').value.md5().toBin().group();
	paintFromArray(string);
}

function paintFromArray(array){
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	canvas.setAttribute('width', document.body.offsetWidth);
	canvas.setAttribute('height', document.body.offsetHeight);
	var extend = 40;
	context.lineWidth = 1;
	var lastPosition = [canvas.width / 2, canvas.height / 2];
	var coordinates = [0, 0];
	var paths = [];

	for (var i in array)
	{
		coordinates[0] = lastPosition[0];
		coordinates[1] = lastPosition[1];

		if(array[i]['x1'] == 1)
			coordinates[0] += extend;

		if(array[i]['y1'] == 1)
			coordinates[1] -= extend;

		if(array[i]['x2'] == 1)
			coordinates[0] -= extend;

		if(array[i]['y2'] == 1)
			coordinates[1] += extend;

		if(lastPosition[0] == coordinates[0] && lastPosition[1] == coordinates[1])
			coordinates[0] += extend;

		paths[i] = [[lastPosition[0], lastPosition[1]], [coordinates[0], coordinates[1]]];

		lastPosition[0] = coordinates[0];
		lastPosition[1] = coordinates[1];
	}

	for (var i in paths){
		context.beginPath();
		context.moveTo(paths[i][0][0], paths[i][0][1]);
		context.lineTo(paths[i][1][0], paths[i][1][1]);
		context.stroke();
	}
}