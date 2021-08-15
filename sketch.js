let socket;
let player;
let puck;
let start = false;
let players = [];
let counter = 0;
let highRez = 4;
let timer = 10;
let topScore = 0 // per round
let botScore = 0
let currentHighest = 0

const paddleSlider = document.getElementById('paddle')
const intro = document.querySelector('.intro')
const finish = document.querySelector('.finish')
function setup() {
   createCanvas(64 * highRez, 64 * highRez);
   socket = io.connect('http://localhost:3000');

   puck = new Puck(highRez);

   socket.on('getCounter', (connections) => {
      counter = connections

      if (player === undefined) {
         if (counter % 2 === 0) {
            player = new Paddle(true, highRez)
         } // top
         else {
            player = new Paddle(false, highRez)
         } // bottom
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

   socket.on('heartbeat', function (data) {
      players = data;
   });

   socket.on('heartbeatPuck', function (data) {
      if (data !== null) {
         puck.x = data.x,
            puck.y = data.y,
            puck.r = data.r,
            puck.xs = data.xs,
            puck.ys = data.ys
      }
   });
}


function draw() {
   background(64);
   fill(255)

   if (start === false) {
      intro.innerHTML = 'Waiting for player 2'
   } else {
      if (player.isTop) {
         intro.innerHTML = 'You are the top paddle, Player 2'

      } else {
         intro.innerHTML = 'You are the bottom paddle, Player 1'
      }
      game()

   }
}

function game() {
   showPoints()
   if (timer === 0) {
      endGame()
      console.log(topScore, botScore)
      } else {
      loop()
   }
   if (frameCount % 60 == 0 && timer > 0) {
      timer--
   }
   for (let i = 0; i < players.length; i++) {
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
      botScore++
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


function reset() {
   puck.x = width / 2;
   puck.y = height / 2;
}

function showPoints() {
   document.querySelector('.timer').innerHTML = timer
   document.querySelector('.player2').innerHTML = topScore
   document.querySelector('.player1').innerHTML = botScore
}


function endGame() {
   finish.classList.remove('remove')
      if (topScore > botScore) {
         if (player.isTop) {
            finish.innerHTML = `YOU WIN - SCORE: ${topScore}`
            if (topScore > currentHighest) {
               setTimeout(newHighscore, 1200, topScore);
               currentHighest = topScore
            }
         } else {
            finish.innerHTML = `YOU LOSE - SCORE: ${botScore} "<br><a href='./index.html'>BACK TO HOME?</a>`
         }
      } else if (botScore > topScore) {
         if (!player.isTop) {
            finish.innerHTML = `YOU WIN - SCORE: ${botScore}`
            if (botScore > currentHighest) {
               setTimeout(newHighscore, 1200, botScore);
               currentHighest = botScore
            }
         } else {
            finish.innerHTML = `YOU LOSE - SCORE: ${topScore} <br><a href='./index.html'>BACK TO HOME?</a>`
         }
      } else if (botScore === topScore) {
         finish.innerHTML = `IT'S A TIE - SCORE: ${topScore} <br> <a href='./index.html'>BACK TO HOME?</a>`
      }
   noLoop()
   socket.emit('endgame');
}

function newHighscore(score) {
   let enterName = document.querySelector('.enterName')
   let input = document.querySelector('#enterName')
   let submit = document.querySelector('.submit')
   enterName.classList.remove('remove')
   submit.addEventListener('click', () => {
      let newScore = {
         name: input.value,
         score: score
      }
      socket.emit('newHighscore', newScore);
      console.log(newScore)
      enterName.innerHTML = "<br>"+ "ALL DONE" + "<br>"+"<a href='./index.html'>BACK TO HOME?</a>"

   })
} 