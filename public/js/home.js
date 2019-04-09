

	var x, y, name, faceDict, cameraOffsets;
	faceDict = {};
	cameraOffsets = [100, 1100, 2100, 3100, 4100];
function setup() {
	var cnv = createCanvas(windowWidth, 5100);
  cnv.style('display', 'block');
	// Starts in the middle
	// x = width / 2;
	// y = height;
	redraw();
	noLoop();
}

// var sketch = function(p) {
//     p.setup = function(){
//       p.createCanvas(windowWidth, windowHeight-400);
// 			//p.style('display', 'block');
// 			noLoop();
//     }
//   };
//   var node = document.createElement('div');
//   new p5(sketch, node);
//   $('#sketchContainer').append(node);

function draw() {
	background(200);
	stroke(0);
	textSize(25);
	fill(50);
	text("camera 0", 50, cameraOffsets[0]-50);
	line(0, cameraOffsets[0], width, cameraOffsets[0]);
	keys = Object.keys(faceDict);
	
	textSize(25);
	fill(50);
	text("camera 1", 50, cameraOffsets[1]-50);
	line(0, cameraOffsets[1], width, cameraOffsets[1]);
	keys = Object.keys(faceDict);
	
	textSize(25);
	fill(50);
	text("camera 2", 50, cameraOffsets[2]-50);
	line(0, cameraOffsets[2], width, cameraOffsets[2]);
	keys = Object.keys(faceDict);
	
		textSize(25);
	fill(50);
	text("camera 3", 50, cameraOffsets[3]-50);
	line(0, cameraOffsets[3], width, cameraOffsets[3]);
	keys = Object.keys(faceDict);
	
		textSize(25);
	fill(50);
	text("camera 4", 50, cameraOffsets[4]-50);
	line(0, cameraOffsets[4], width, cameraOffsets[4]);
	keys = Object.keys(faceDict);

	for(var i = 0; i < keys.length;i++){
	   //keys[i] for key
	   //dictionary[keys[i]] for the value
		 name = keys[i];
		 console.log("name:"+keys[i]);
		 var faceData = faceDict[keys[i]];
		 x = faceData[0]+180;
		 y = 10*(faceData[1]-1)+50+cameraOffsets[faceData[2]];
		
	
	
	// HEEL OF THE  LEFT FOOT
		stroke(139,69,19);
		fill(160,82,45);
		arc(x, y-40, 14, 24, 0, PI);
		line(x-7, y-40, x+7, y-40);

		// LEFT FOOT
		stroke(139,69,19);
		fill(160,82,45);
		bezier(x-7, y-45, x-20, y-90, x+35, y-90, x+7, y-45);
		// arc(x, y-45, 22, 65, PI, 0);
		line(x-7, y-45, x+7, y-45);

		// HEEL OF THE RIGHT FOOT
		stroke(139,69,19);
		fill(160,82,45);
		arc(x+35, y-50, 14, 24, 0, PI);
		line(x+28, y-50, x+42, y-50);

		// RIGHT FOOT
		stroke(139,69,19);
		fill(160,82,45);
		bezier(x+28, y-55, x, y-100, x+55, y-100, x+42, y-55);
		// arc(x, y-45, 22, 65, PI, 0);
		line(x+28, y-55, x+42, y-55);



		// HEEL OF THE  LEFT FOOT
		stroke(139,69,19);
		fill(160,82,45);
		arc(x, y-120, 14, 24, 0, PI);
		line(x-7, y-120, x+7, y-120);

		// LEFT FOOT
		stroke(139,69,19);
		fill(160,82,45);
		bezier(x-7, y-125, x-20, y-170, x+35, y-170, x+7, y-125);
		// arc(x, y-45, 22, 65, PI, 0);
		line(x-7, y-125, x+7, y-125);

		// HEEL OF THE RIGHT FOOT
		stroke(139,69,19);
		fill(160,82,45);
		arc(x+35, y-130, 14, 24, 0, PI);
		line(x+28, y-130, x+42, y-130);

		// RIGHT FOOT
		stroke(139,69,19);
		fill(160,82,45);
		bezier(x+28, y-135, x, y-180, x+55, y-180, x+42, y-135);
		// arc(x, y-45, 22, 65, PI, 0);
		line(x+28, y-135, x+42, y-135);


		textSize(25);
		fill(50);
		text(name, x+55, y-100);

//   // Jiggling randomly on the horizontal axis
//   x = x + random(-1, 1);
//   // Moving up at a constant speed
//   y = y - 1;

//   // Reset to the bottom
//   if (y < 0) {
//     y = height;
//   }
	}
}

$('document').ready(function(){
//const plugin = new OSC.WebsocketClientPlugin({ port: 9912 })
//const osc = new OSC({ plugin: plugin })

		$('#appendhere').append('<a class="ui huge green button"> Yes </a>');
		$('#appendhere').append('<a class="ui huge green button"> No </a>');

		var arr = ["Are", "Watching", "You","We"];

	var i = 0;

	var topic;
	var HOST = location.origin.replace(/^http/, 'ws')
	var ws = new WebSocket(HOST);
	//var faceDict;
	var keys;
	//var i;

	  //var el = document.getElementById('server-time');
	ws.onmessage = function (event) {
		//console.log(event.data);
		faceDict = JSON.parse(event.data);
		console.log(faceDict);
		redraw();
	};
	function getTopic() {
		if (i < arr.length) {
			topic = arr[i];
			i += 1;
		} else {
			topic = arr[0];
			i = 1;
			
		}
		return topic;
	}

	function drawPeople(){
		keys = Object.keys(faceDict);

		for(var i = 0; i < keys.length;i++){
		   //keys[i] for key
		   //dictionary[keys[i]] for the value
			 name = keys[i];
			 console.log("name:"+keys[i]);
		   // console.log("pos:"+faceDict[keys[i]]);
			 var position = faceDict[keys[i]];
			 for(var j=0;i<position.length;i++){
				 console.log(position[i]);
			 }
			 x = position[0]+180;
			 y = position[1]+350;
			//redraw();
		}
		
	}
	
	setInterval(function(){ document.getElementById('topic').innerHTML = getTopic(); }, 1250);

	//var osc = new OSC();
	//osc.open({
  //host: 'localhost',    // @param {string} Hostname of WebSocket server
 // port: 9912            // @param {number} Port of WebSocket server
//}); // connect by default to ws://localhost:8080

	document.getElementById('send').addEventListener('click', () => {
		//var message = new OSC.Message('/test/random', Math.random());
		//osc.send(message);
		console.log("Hello world!");
	});

	
	
	/*
	function draw() {
		background(200);
		
		keys = Object.keys(faceDict);

		for(var i = 0; i < keys.length;i++){
		   //keys[i] for key
		   //dictionary[keys[i]] for the value
			 name = keys[i];
			 console.log("name:"+keys[i]);
			 var position = faceDict[keys[i]];
			 x = position[0]+180;
			 y = position[1]+350;
		
		
		
		// HEEL OF THE  LEFT FOOT
			stroke(139,69,19);
			fill(160,82,45);
			arc(x, y-40, 14, 24, 0, PI);
			line(x-7, y-40, x+7, y-40);

			// LEFT FOOT
			stroke(139,69,19);
			fill(160,82,45);
			bezier(x-7, y-45, x-20, y-90, x+35, y-90, x+7, y-45);
			// arc(x, y-45, 22, 65, PI, 0);
			line(x-7, y-45, x+7, y-45);

			// HEEL OF THE RIGHT FOOT
			stroke(139,69,19);
			fill(160,82,45);
			arc(x+35, y-50, 14, 24, 0, PI);
			line(x+28, y-50, x+42, y-50);

			// RIGHT FOOT
			stroke(139,69,19);
			fill(160,82,45);
			bezier(x+28, y-55, x, y-100, x+55, y-100, x+42, y-55);
			// arc(x, y-45, 22, 65, PI, 0);
			line(x+28, y-55, x+42, y-55);



			// HEEL OF THE  LEFT FOOT
			stroke(139,69,19);
			fill(160,82,45);
			arc(x, y-120, 14, 24, 0, PI);
			line(x-7, y-120, x+7, y-120);

			// LEFT FOOT
			stroke(139,69,19);
			fill(160,82,45);
			bezier(x-7, y-125, x-20, y-170, x+35, y-170, x+7, y-125);
			// arc(x, y-45, 22, 65, PI, 0);
			line(x-7, y-125, x+7, y-125);

			// HEEL OF THE RIGHT FOOT
			stroke(139,69,19);
			fill(160,82,45);
			arc(x+35, y-130, 14, 24, 0, PI);
			line(x+28, y-130, x+42, y-130);

			// RIGHT FOOT
			stroke(139,69,19);
			fill(160,82,45);
			bezier(x+28, y-135, x, y-180, x+55, y-180, x+42, y-135);
			// arc(x, y-45, 22, 65, PI, 0);
			line(x+28, y-135, x+42, y-135);


			textSize(25);
			fill(50);
			text(name, x+55, y-100);

	//   // Jiggling randomly on the horizontal axis
	//   x = x + random(-1, 1);
	//   // Moving up at a constant speed
	//   y = y - 1;

	//   // Reset to the bottom
	//   if (y < 0) {
	//     y = height;
	//   }
		}
	}
	*/
	
});
