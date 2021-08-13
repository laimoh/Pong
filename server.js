function Puck(id,x,y,r,xs,ys) {
   this.id = id;
   this.x = x;
   this.y = y;
   this.r = r;
   this.xs = xs;
   this.ys = ys;
  
 }
 
 function Player(id,x,y,w,h){
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
 }
 
 const express = require('express');
 const app = express();
 let server = app.listen(3000);
 app.use(express.static('public'));
 console.log('server running');
 
 const socket = require('socket.io');
 const listener = socket(server);
 
 // when an IP tries to connect to server
 listener.sockets.on('connection', newConnect)
 let connections = [];
 let players = []
 let puck;
 
 setInterval(heartbeat, 33);
 
 function heartbeat() {
    listener.sockets.emit('heartbeat', players);
 }
 
 setInterval(heartbeatPuck, 33);
 
 function heartbeatPuck() {
    listener.sockets.emit('heartbeatPuck', puck);
 }
 
 function newConnect(person) {
    connections.push(person);
    listener.sockets.emit('getCounter',connections.length);
    console.log("new connection - array updated" + " " + connections.length);
 
    person.on('start',function(data){
       let p = new Player(person.id, data.x, data.y, data.w, data.h);
       players.push(p);
    }); 
 
    person.on('startBall',function(data){
       puck = new Puck(person.id,data.x,data.y,data.r,data.xs,data.ys);
    }); 
 
 
    person.on('update',function(data){
       let p;
       for ( let i = 0; i < players.length; i++ ) {
          if (person.id === players[i].id)
             p = players[i];
       }
       p.x = data.x;
       p.y = data.y;
       p.w = data.w;
       p.h = data.h;
    }); 
 
    person.on('updateBall',function(data) {
       puck.x = data.x;
       puck.y = data.y;
       puck.r = data.r;
       puck.xs = data.xs;
       puck.ys = data.ys;
 
    }); 
 
 }