class Puck {
   constructor(highRez) {
      this.x = width / 2;
      this.y = height / 2;
      this.r = 2 * highRez
      this.xspeed = 0.1 * highRez
      this.yspeed = 0.3 * highRez
   }

   show() {
      fill(255)
      ellipse(this.x, this.y, this.r * 2)
   }

   move() {
      this.x += this.xspeed;
      this.y += this.yspeed;
   }

   reset() {
      this.x = this.width / 2;
      this.y = this.height / 2;
   }

   edges() {
      if (this.x < 0 || this.x > this.width) {
         this.xspeed *= -1;
      }

      if (this.y - this.r > this.height) {
         //  ding.play();
         // leftscore++;
         this.reset();
      }

      if (this.y + this.r < 0) {
         //  ding.play();
         //  rightscore++;
          this.reset();
      }  
   }

   checkPaddleBottom(paddle) {
      
      if (this.y + this.r > paddle.y - paddle.h / 2 &&
         this.x + this.r > paddle.x - paddle.w/2 &&
         this.x + this.r < paddle.x + paddle.w/2) {
            this.yspeed *= -1
      }
   }
    checkPaddleTop(paddle) {
      
      if (this.y - this.r < paddle.y + paddle.h / 2 &&
         this.x + this.r > paddle.x - paddle.w/2 &&
         this.x + this.r < paddle.x + paddle.w/2) {
            this.yspeed *= -1
      }
   }


}