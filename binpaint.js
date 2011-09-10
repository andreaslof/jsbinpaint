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
		i++;
	}
}

function paintFromArray(array) {
	if(canvas) canvas.clear();
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	canvas.setAttribute('width', document.body.offsetWidth);	// We should try to find some better way of doing this, fucks up
	canvas.setAttribute('height', document.body.offsetHeight);	// the canvas proportions when adding stuff to the DOM
	var extend = 40;
	context.lineWidth = 1;
	var lastPosition = [canvas.width / 2, canvas.height / 2];
	var coordinates = [0, 0];
	var paths = [];

	for (var i in array) {
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
	}

	for (var i in paths) {
		// Draws a circle at each joint
		context.fillStyle = "rgba(15,189,102,0.35)";
		context.beginPath();
		context.arc(paths[i][0][0], paths[i][0][1], Math.ceil(Math.random()*10+Math.floor(2)+i), 0, Math.PI*2, true); // RANDOMLY SIZED JOINT-CIRCLES, FUCK YEAH
		context.closePath();
		context.fill();

		context.strokeStyle = "rgba(255,69,0,0.5)";
		context.beginPath();
		context.lineWidth = Math.ceil(Math.random()*4+Math.floor(1)+i); // RANDOM WIDTH OF THE LINES, FUCK YEAH
		context.moveTo(paths[i][0][0], paths[i][0][1]);
		context.lineTo(paths[i][1][0], paths[i][1][1]);
		context.stroke();
	}
}