const express = require('express');
const app = express();
let server = app.listen(3000);
app.use(express.static('public'));
console.log('server running');

const socket = require('socket.io');
const listener = socket(server);

// when an IP tries to connect to server
listener.sockets.on('connection', newConnect)
// let count = 0;
let players = []

function Player(id, x, y) {
   this.id = id
   this.x = x
   this.y = y
}

function newConnect(person) {
   // count++;
   // console.log("number of users: " + count);
   console.log("new connnection at: " + person.id);
   // person.emit('init', {connected: count})

   person.on('start', (data) => {

      console.log(data.x + ' ' + data.y)
      let player = new Player(person.id, data.x ,data.y)
      players.push(player)
   
   })

}

