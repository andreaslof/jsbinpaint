function paint(array){
	var canvas = document.getElementById('canvas');
	var body = document.body;
	var context = canvas.getContext('2d');

	var extend = 20;
	canvas.setAttribute('width', body.offsetWidth);
	canvas.setAttribute('height', body.offsetHeight);
	context.lineWidth = 1;
	var lastPosition = [canvas.offsetWidth / 2, canvas.offsetHeight / 2];
	//lastPosition = [400, 400];
	var offset = [0, 0];
	var newX = 0;
	var newY = 0;
	var coordinates = [0, 0];
	var animate = false;

	// var array = [];

	// for (var i = 0; i < 64; i++)
	// {
	// 	array[i] = [Math.floor(Math.random()*2), Math.floor(Math.random()*2), Math.floor(Math.random()*2), Math.floor(Math.random()*2)];
	// }

	console.log(array);

	var paths = []


	for (var i in array)
	{
		coordinates[0] = lastPosition[0];
		coordinates[1] = lastPosition[1];

		if(array[i]['y1'] == 1)
			coordinates[0] += extend;

		if(array[i]['x1'] == 1)
			coordinates[1] -= extend;

		if(array[i]['y2'] == 1)
			coordinates[0] -= extend;

		if(array[i]['x2'] == 1)
			coordinates[1] += extend;

		if(lastPosition[0] == coordinates[0] && lastPosition[1] == coordinates[1])
			coordinates[0] += extend;

		paths[i] = [[lastPosition[0], lastPosition[1]], [coordinates[0], coordinates[1]]];

		lastPosition[0] = coordinates[0];
		lastPosition[1] = coordinates[1];
	}

	if(animate){
		var i = 0;
		var painting = setInterval(function(){
			if(i++ > paths.length)
				clearInterval(painting);
			else{
				context.beginPath();
				context.moveTo(paths[i][0][0], paths[i][0][1]);
				context.lineTo(paths[i][1][0], paths[i][1][1]);
				console.log(paths[i][1]);
				context.stroke();
			}
		}, 20);

	} else {
		for (var i in paths){
			context.beginPath();
			context.moveTo(paths[i][0][0], paths[i][0][1]);
			context.lineTo(paths[i][1][0], paths[i][1][1]);
			context.stroke();
		}
	}
}