let data = {}
let listener;

let sliderVal = 50;
let leftscore = 0;
let rightscore = 0;
const paddleSlider = document.getElementById('paddle')

const sketch = p => {
   let puck, bottom, top;
   let lowRez = 64 // scaled 3x

   p.setup = function() {
      
     p.createCanvas(lowRez * 3, lowRez * 3);
     puck = new Puck(p);
     bottom = new Paddle(p, false)
      top = new Paddle(p, true)

      listener = io.connect('http://localhost:3000/')
      listener.on('Xval', newVal)
   };
   
 
   p.draw = function() {
     p.background(0);
     puck.show()
     puck.update()
     puck.edges()

     paddleSlider.addEventListener('input', () => {
         bottom.changeSlider(paddleSlider.value)
         top.changeSlider(paddleSlider.value)
         bottom.updateData(data)
         listener.emit('Xval', data) 
    })

     bottom.show()
     top.show()
     puck.checkPaddleBottom(bottom);
     puck.checkPaddleTop(top);

   };

 };

 new p5(sketch);



