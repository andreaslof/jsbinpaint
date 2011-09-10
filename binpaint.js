// binpaint.js
// An experiment which will paint with hashed-base2-encoded strings
// Author(s): Andreas Löf Hermansson & Simon Westerlund

var input, res, history = [], i = 0;

function ready(){
	input = document.getElementById('string');
	res = document.getElementById('result');
	input.addEventListener('keypress',function(e) {
		if (e.keyCode === 13 && input.value.length !== 0) {
			var str = input.value.md5();
			res.textContent = str; // Print the resulting hash to DOM, dunno why but IZ COOL, or something
			prepareString();
		}
	});
}

function prepareString() {
	if(input.value.length !== 0){
		var string = input.value.md5().toBin().group();
		paintFromArray(string);
		// history[] holds all the previous inputs
		// Did this if we would like to, well, go back in history and see what we DID THAR
		history[i] = input.value;
		document.getElementById('history').textContent = history[i];
		i++;
	}
}

function paintFromArray(array){
	var extend			=	40,
		margin			=	50,
		lineWidth		=	1,
		logTime			=	true;

	var canvas			=	document.getElementById('canvas'),
		context			=	canvas.getContext('2d'),
		startTime		=	new Date().getTime(),
		lastPosition	=	[0, 0],
		coordinates		=	[0, 0],
		paths			=	[],
		maxX			=	0,
		maxY			=	0,
		minX			=	0,
		minY			=	0;

	canvas.setAttribute('width', document.body.offsetWidth);	// We should try to find some better way of doing this, fucks up
	canvas.setAttribute('height', document.body.offsetHeight);	// the canvas proportions when adding stuff to the DOM

	for (var i in array){
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

		if(lastPosition[0] == coordinates[0] && lastPosition[1] == coordinates[1]){
			coordinates[0] += extend;
			coordinates[1] += extend; // Added this so we get a more unique pattern instead of just changing one axis
		}
		// Inverts the path if it reaches the border of the canvas
		if(coordinates[0] > canvas.width || coordinates[0] < 0)
			coordinates[0] -= extend;
		if(coordinates[1] > canvas.height || coordinates[1] < 0)
			coordinates[1] -= extend;

		paths[i] = [[lastPosition[0], lastPosition[1]], [coordinates[0], coordinates[1]]];

		lastPosition[0] = coordinates[0];
		lastPosition[1] = coordinates[1];

		if(maxX < coordinates[0])
			maxX = coordinates[0];
		if(maxY < coordinates[1])
			maxY = coordinates[1];
		if(minX > coordinates[0])
			minX = coordinates[0];
		if(minY > coordinates[1])
			minY = coordinates[1];
	}

	// if 0, make it positive
	if(minX < 0)
		minX = 0 - minX;
	if(minY < 0)
		minY = 0 - minY;
	
	// add the new positive value to maxX and maxY
	maxX += minX;
	maxY += minY;

	var scale = 0;
	// find the ratio of the "painting"
	if(canvas.width / maxX < canvas.height / maxY)
		scale = (canvas.width - margin) / maxX;
	else
		scale = (canvas.height - margin) / maxY;

	// scale the canvas, so that we don't have to recalculate padding and so on...
	context.scale(scale, scale);

	// the letter e draws a small painting
	// calculate ratios
	var ofX = (canvas.width / 2) - ((maxX * scale) / 2),
		ofY = (canvas.height / 2) - ((maxY * scale) / 2);

	// move all content to the center, to all the party
	context.translate(minX + (ofX / scale), minY + (ofY / scale));

	// and...paint!
	for (var i in paths){
		// Draws a circle at each joint
		context.fillStyle = "rgba(15,189,102,0.35)";
		context.beginPath();
		context.arc(paths[i][0][0], paths[i][0][1], Math.ceil(Math.random()*20+Math.floor(2)+i), 0, Math.PI*2, true); // RANDOMLY SIZED JOINT-CIRCLES, FUCK YEAH
		context.closePath();
		context.fill();

		context.beginPath();
		// context.lineWidth = Math.ceil(Math.random()*4+Math.floor(1)+i); // RANDOM WIDTH OF THE LINES, FUCK YEAH
		// context.moveTo((paths[i][0][0] + minX + (ofX / scale)), paths[i][0][1] + minY + (ofY / scale));
		// context.lineTo((paths[i][1][0] + minX + (ofX / scale)), paths[i][1][1] + minY + (ofY / scale));
		context.moveTo(paths[i][0][0], paths[i][0][1]);
		context.lineTo(paths[i][1][0], paths[i][1][1]);
		context.stroke();
	}

	if(logTime)console.log('elapsed time: ' + (new Date().getTime() - startTime) + 'ms');
}