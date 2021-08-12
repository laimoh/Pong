let data = {}
let listener = io.connect('http://localhost:3000/')
let topX = 50;
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

   };


   p.draw = function() {
     p.background(0);
   //   puck.show()
   //   puck.update()
   //   puck.edges()


     bottom.show()
     top.showTop(topX)
   //   puck.checkPaddleBottom(bottom);
   //   puck.checkPaddleTop(top);

   };

   paddleSlider.addEventListener('input', () => {
      bottom.changeSlider(paddleSlider.value)
      bottom.updateData(data)
      listener.emit('Xval', data) 
 })

   listener.on('Xval', (data) => {
      topX = data.x
   })

};

 new p5(sketch);



