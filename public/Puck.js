class Puck {
   constructor(p) {
      this.p = p // p5 instance
      this.highRez = 3
      this.x = p.width / 2;
      this.y = p.height / 2;
      this.r = 2 * this.highRez;
      this.xspeed = 0.1 * this.highRez;
      this.yspeed = 0.3 * this.highRez;
   }

   show() {
      this.p.fill(255)
      this.p.ellipse(this.x, this.y, this.r * 2)
   }

   move() {
      this.x += this.xspeed;
      this.y += this.yspeed;
   }

   updatePuckState(obj) {
      obj.puckX = this.x
      obj.puckY = this.y
   }

   reset() {
      this.x = this.p.width / 2;
      this.y = this.p.height / 2;
   }

   edges() {
      if (this.x < 0 || this.x > this.p.width) {
         this.xspeed *= -1;
      }

      if (this.y - this.r > this.p.height) {
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