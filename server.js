const express = require('express');
const app = express();
let server = app.listen(3000);
app.use(express.static('public'));
console.log('server running');

const socket = require('socket.io');
const listener = socket(server);

// when an IP tries to connect to server
listener.sockets.on('connection', newConnect)
let numOfPeople = 0;

function newConnect(person) {
   console.log(person.id)

   // if (numOfPeople === 2) {
      person.on('Xval', (data) => {
         // console.log(data)
         person.broadcast.emit('Xval', data)
      })

   // }
}

