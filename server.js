function Puck(id,x,y,r,xs,ys) {
   this.id = id;
   this.x = x;
   this.y = y;
   this.r = r;
   this.xs = xs;
   this.ys = ys;
  
 }
 
 function Player(id,x,y,w,h,p){
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
 }

 let highScores = {}
 
 const express = require('express');
 const app = express();
 let server = app.listen(3000);
 app.use(express.static('public'));
 console.log('server running');
 
 const socket = require('socket.io');
 const listener = socket(server);
 let connections = 0;
 let players = []
 let puck;

 let heartbeatID = setInterval(heartbeat, 10);
 let heartbeatPuckID = setInterval(heartbeatPuck, 10);
 
function heartbeat() {
   listener.sockets.emit('heartbeat', players);
}

function heartbeatPuck() {
   listener.sockets.emit('heartbeatPuck', puck);
}
 
 // when an IP tries to connect to server
 listener.sockets.on('connection', newConnect)

 function newConnect(person) {
 
   person.on('getCounter', send => {
      connections += 1
      send(connections)
   })
   setTimeout(() => {
      listener.sockets.emit('startGame', connections);
   }, 100)
    
    person.on('start',function(data) {
       let p = new Player(person.id, data.x, data.y, data.w, data.h);
       if (players.length === 0) {
         players.push(p);
         } else {
            for (let i = 0; i < players.length; i++) {
               if (p.id === players[i].id) {
   
               } else {
                  players.push(p);
               }
            }
         }
    }); 
 
    person.on('startBall',function(data) {
       puck = new Puck(person.id,data.x,data.y,data.r,data.xs,data.ys);
    }); 
 
    person.on('update',function(data) {

      if (players.length > 0) {
         let p;
         for ( let i = 0; i < players.length; i++ ) {
            if (person.id === players[i].id)
              { p = players[i] }
         }
         p.x = data.x;
         p.y = data.y;
         p.w = data.w;
         p.h = data.h;
      }
      
    });
 
    person.on('updateBall',function(data) {

      if (players.length > 0) {
       puck.x = data.x;
       puck.y = data.y;
       puck.r = data.r;
       puck.xs = data.xs;
       puck.ys = data.ys;
      }

    }); 

    person.on('endgame', () => {
      // clearInterval(heartbeatID)
      // clearInterval(heartbeatPuckID)
      players = []
      connections = 0
    })

    person.on('newHighscore', (newEntry) => {
       if (highScores.hasOwnProperty(newEntry.name)) {
         highScores[newEntry.name] = newEntry.score
       } else {
         highScores[newEntry.name] = newEntry.score
       }
    })

    person.on('getHighscores', () => {
      listener.sockets.emit('score', highScores);
    })

 }

