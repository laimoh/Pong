let socket;
let player;
let puck;
let lastPos;
let start = false;
let players = [];
let counter = 0;

let highRez = 3

function setup(){
   createCanvas(64 * highRez, 64 * highRez);
   socket = io.connect('http://localhost:3000');
   puck = new Puck(highRez);

   socket.on('getCounter', (connections) => {
      counter = connections
      console.log(counter)
      if (player === undefined) {
         if(counter % 2 === 0 )
         { player = new Paddle(false, highRez) } //bottom
         else
         { player = new Paddle(true, highRez) } // top
      }

      let playerData = {
         x:player.x,
         y:player.y,
         w:player.w,
         h:player.h,
      };

     socket.emit('start', playerData);

     let puckData = {
      x: puck.x,
      y: puck.y,
      r: puck.r,
      xs: puck.xs,
      ys: puck.ys
    };

    socket.emit('startBall', puckData);
    
      if (counter === 2) {
         start = true;
      }

   })

   socket.on('heartbeat',function(data){
      players = data;
    });
  
    socket.on('heartbeatPuck',function(data){
      if(data !== null){
         puck.x = data.x,
         puck.y = data.y,
         puck.r = data.r,
         puck.xs = data.xs,
         puck.ys = data.ys
      }
    });
}

const paddleSlider = document.getElementById('paddle')
const intro = document.querySelector('.intro')

function draw() {
   background(64);
   fill(255)

    if (start === false) { 
       intro.innerHTML = 'Waiting for player 2'
   } else {
      intro.innerHTML = 'Starting game'

      for(let i = 0; i < players.length; i++){
         let id = players[i].id;
         if (id !== socket.id) {
           fill(0);
           rectMode(CENTER);
           rect(players[i].x,players[i].y,players[i].w,players[i].h);
         }
       }

      player.show();
      player.changeSlider(paddleSlider.value)

      puck.show();
      puck.move();
      puck.edges()

      puck.checkPaddleBottom(player);
      // puck.checkPaddleTop(top);

      let playerData = {
         x:player.x,
         y:player.y,
         w:player.w,
         h:player.h,
      };

      socket.emit('update', playerData);

      let puckData = {
         x: puck.x,
         y: puck.y,
         r: puck.r,
         xs: puck.xs,
         ys: puck.ys,
       };
   
       socket.emit('updateBall', puckData);

   }
}
