class Puck {
   constructor(highRez) {
      this.x = width / 2;
      this.y = height / 2;
      this.r = 2 * highRez
      this.xs = (0.4 * highRez)
      this.ys = (0.5 * highRez)
   }

   show() {
      fill(255)
      ellipse(this.x, this.y, this.r * 2)
   }

   move() {
      this.x += this.xs;
      this.y += this.ys;
   }

   checkPaddleBottom(paddle) {
      
      if (this.y + this.r > paddle.y - paddle.h / 2 &&
         this.x + this.r > paddle.x - paddle.w / 2 &&
         this.x + this.r < paddle.x + paddle.w / 2) {
            this.ys *= -1
      }
   }
    checkPaddleTop(paddle) {
      
      if (this.y - this.r < paddle.y + paddle.h / 2 &&
         this.x + this.r > paddle.x - paddle.w/2 &&
         this.x + this.r < paddle.x + paddle.w/2) {
            this.ys *= -1
      }
   }

}