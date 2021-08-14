let socket;
let player;
let puck;
let start = false;
let players = [];
let counter = 0;
let topScore = 0;
let bottomScore = 0;
let highRez = 3;

function setup(){
   createCanvas(64 * highRez, 64 * highRez);
   socket = io.connect('http://localhost:3000');

   puck = new Puck(highRez);

   socket.on('getCounter', (connections) => {
      counter = connections
      
      if (player === undefined) {
         if(counter % 2 === 0 )
         { player = new Paddle(true, highRez) } // top
            
         else
         {  player = new Paddle(false, highRez) }  // bottom
      }
      let playerData = {
         x: player.x,
         y: player.y,
         w: player.w,
         h: player.h,
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
    console.log(counter)
      if (counter === 2) {
         start = true;
      }
   })

   socket.on('heartbeat', function(data){
         players = data;
    });
  
    socket.on('heartbeatPuck', function(data){
      if (data !== null) {
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
      intro.innerHTML = 'Waiting for player 2, you are the bottom paddle'
   } else {
     intro.innerHTML = 'Starting game'
     game()

}

function game() {
   for(let i = 0; i < players.length; i++){
      let id = players[i].id;
      if (id !== socket.id) {
         fill(0);
         rectMode(CENTER);
         rect(players[i].x, players[i].y, players[i].w, players[i].h);
      }
   }

   player.show();
   player.changeSlider(paddleSlider.value)
   puck.show();
   puck.move();

   if (player.isTop) {
      puck.checkPaddleTop(player);
   } else {
      puck.checkPaddleBottom(player);
   }

   if (puck.x < puck.r || puck.x > width - puck.r) {
      puck.xs *= -1;
   }
   
   if (puck.y < 0) {
      topScore++
      reset();
    }
    if (puck.y > height) {
       bottomScore++
      reset();
    }

   let playerData = {
      x: player.x,
      y: player.y,
      w: player.w,
      h: player.h,
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
 
function reset() {
      puck.x = width / 2;
      puck.y = height / 2;
   }