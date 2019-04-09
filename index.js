var express = require('express');
var app = require('express')();
var SocketServer = require('ws').Server;
//var uuid= require('tower-uuid');
//var useragent = require('express-useragent');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
//var key = "trnsl.1.1.20160402T034217Z.7ddc219970f6b6c9.323a12de2c42e5f2bf29acccc5bbd76682a610d2";
//var translate = require('yandex-translate')(key);
app.use(express.static('public'));
var defaultNsps = '/';
var faceDict = {};
var prevDict = {};
var start = new Date();

var changeThresh = 100; //max distance for a detection to change face location
var directionThresh = 2; // min distance needed to change feet direction
var dropTime = 3000; // in ms
var detectionsNeeded = 30; //number of connected detections before face is accepted

// faceDict format: {name} =  [lateral position, depth, camera, lastDetection, numDetections, direction]

//direction is an angle in radians

//const OSC = require('osc-js')

//const config = { udpClient: { port: 9912 } }
//const osc = new OSC({ plugin: new OSC.BridgePlugin(config) })
//	osc.open({
//  host: 'localhost',    // @param {string} Hostname of WebSocket server
//  port: 9912            // @param {number} Port of WebSocket server
//});

server.listen(port, function(){
  console.log('listening on port: '+ port);
});

const wss = new SocketServer({ server });

//wss.on('connection', (ws) => {
//  console.log('Client connected');
//  ws.on('close', () => console.log('Client disconnected'));
//});


wss.on('connection', function connection(ws) {
  console.log("CONNECTION");
  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
    //wss.broadcast(data);
	//console.log(data);
	
	// faceDict format: {name} =  [lateral position, depth, camera, lastDetection, numDetections,angle]
	// received data format: [name, lateral position, depth, camera]
	jData = JSON.parse(data);
	
	if(jData[0] in faceDict){
	
		newFace = [jData[1],jData[2], jData[3]];
		oldFace = faceDict[jData[0]];
		var delX = oldFace[0]-newFace[0];
		var delY = oldFace[0]-newFace[0];
		
		var dist = Math.sqrt( Math.pow(delX,2) + Math.pow(delY,2) );
		if(oldFace[2] == newFace[2] &&dist<changeThresh){
			
			//if (dist >directionThresh){
				faceDict[jData[0]] = [jData[1],jData[2],jData[3],new Date(),oldFace[4]+1,oldFace[5]];
			//}else{
			//	faceDict[jData[0]] = [jData[1],jData[2],jData[3],new Date(),oldFace[4]+1,oldFace[5]];
			//}
		}
		//faceDict[jData[0]] = [jData[1],jData[2]];
		//console.log(faceDict);
	} else{
		faceDict[jData[0]] = [jData[1],jData[2],jData[3],new Date(),1,Math.PI/2];
	}
  });
});

setInterval(() => {
	var sendDict = {};
	
	keys = Object.keys(faceDict);
// faceDict format: {name} =  [lateral position, depth, camera, lastDetection, numDetections,angle]
	for(var i = 0; i < keys.length;i++){
		
		
		
		
		
		var name = keys[i];
			
		var currFace = faceDict[name];
		var lateral = currFace[0];
		var depth = currFace[1];
		
		if(name in prevDict){
			//console.log(prevDict);
			//console.log(faceDict);
			var prevFace = prevDict[name];
			var prevLateral = prevFace[0];
			var prevDepth = prevFace[1];
			
			var delX = lateral-prevLateral;
			var delY = depth-prevDepth;
			
			currFace[5] = Math.atan2(delY,delX);
			//console.log(currFace[5]);
		}
		
		
		var camera = currFace[2];
		var lastDetection = currFace[3];
		var numDetections = currFace[4];
		var angle = currFace[5];
	   
		var deadTime = new Date() - lastDetection;
	   
		if (deadTime > dropTime){
		   delete faceDict[keys[i]];
		}else{
		   if (numDetections>detectionsNeeded){
			   sendDict[name] = [lateral,depth,camera,lastDetection,numDetections,angle];
		   }
		}
	}
	Object.assign(prevDict,faceDict);
	
  wss.clients.forEach((client) => {
	  console.log(JSON.stringify(sendDict));
    client.send(JSON.stringify(sendDict));
  });
}, 1000);

//console.log(uuid());
//app.use(useragent.express());
app.get('/', function(req, res){

	res.sendFile(__dirname + '/public/html/home.html');
});


/*
app.get('/chat', function(req, res){
	if(req.useragent.isMobile)
	{
		res.sendFile(__dirname + '/public/html/mchat.html');
	}
	else
	{
		res.sendFile(__dirname + '/public/html/chat.html');
	}
});
*/

/*
io.sockets.on('connection', function(socket){
	console.log('a user connected');
	var inwaiting = false;
	socket.on('waiting', function(data) {
		if(!inwaiting)
		{
			console.log('in here');
			var waiters = io.nsps[defaultNsps].adapter.rooms['waitingroom'];
			if(waiters)
			{
				var roomname = uuid();
				socket.join('waitingroom');
				io.sockets.in('waitingroom').emit('found', {room: roomname});
			}
			else{
				socket.join('waitingroom');
				inwaiting=true;
			}
		}
	});
	socket.on('stop', function(data){
		socket.leave('waitingroom');
		console.log('leaving room');
	})
	socket.on('join', function(data){
		socket.join(data.room);
		console.log('joining room');
	});
	socket.on('sentmessage', function(data){
		console.log(data.room);
		io.sockets.in(data.room).emit('gotmessage', {name:data.name, room:data.room, message:data.message});
	});
	
	socket.on('translate', function(data){
		console.log('trans');
		language = data.lang;
		translate.translate(data.message,{to: language}, function(err, res){
			console.log(err);
			console.log(res.text);
			socket.emit('translated', {name: data.name, message: res.text,room: data.room});
		});
	});	
});
*/

