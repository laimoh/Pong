class Paddle {
   constructor(isTop, highRez) {
      this.w = 15 * highRez
      this.h = 5 * highRez
      this.x = width/2

      if (!isTop) {
         this.y =  height - this.h/2
       } else {
         this.y = this.h/2;
       }
   }

   changeSlider(x) {
      this.x = floor(map(x, 0, 100, this.w/2, width - this.w/2))
   }

   show() {
      fill(255)
      rectMode(CENTER)
      rect(this.x, this.y, this.w, this.h)
   }

   showTop(otherX) {
      fill(255)
      rectMode(CENTER)
      rect(otherX, this.y, this.w, this.h)
   }


}