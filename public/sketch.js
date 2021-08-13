let data = {}
let socket = io.connect('http://localhost:3000/')
socket.on('init', handleInit)


let topX = 50;
let sliderVal = 50;
let leftscore = 0;
let rightscore = 0;
const paddleSlider = document.getElementById('paddle')


const start = p => {
   let puck, bottom, top;
   let lowRez = 64 // scaled 3x

   p.setup = function() {
      
     p.createCanvas(lowRez * 3, lowRez * 3);
     puck = new Puck(p);
   //   bottom = new Paddle(p, false)
   //   top = new Paddle(p, true)
      
     puck.show()
   //   bottom.show()
   //   top.show()

     puck.updatePuckState(data)
   //   bottom.updatePaddle(data)
   };


   p.draw = function() {
     p.background(0);
     puck.show()
     puck.move()
     puck.edges()


     bottom.show()
     top.showTop(topX)
     puck.checkPaddleBottom(bottom);
     puck.checkPaddleTop(top);

   };

   

//    paddleSlider.addEventListener('input', () => {
//       bottom.changeSlider(paddleSlider.value)
//       bottom.updateData(data)
//       socket.emit('Xval', data) 
//  })

   // socket.on('Xval', (data) => {
   //    topX = data.x
   // })

};



function handleInit(msg) {
   if (msg.connected === 2) {

      new p5(start);
   } else {
      console.log('waiting for player 2')
   }
}

function handleGameState(data) {
  
}




