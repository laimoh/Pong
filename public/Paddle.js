class Paddle {
   constructor(p, isTop) {
      this.p = p
      this.w = 40
      this.h = 10
      this.x = p.width/2

      if (!isTop) {
         this.y =  p.height - this.h/2
       } else {
         this.y = this.h/2;
       }
   }

   changeSlider(x) {
      this.x = this.p.floor(this.p.map(x, 0, 100, this.w/2, this.p.width - this.w/2))
   }

   show() {
      this.p.fill(255)
      this.p.rectMode(this.p.CENTER)
      this.p.rect(this.x, this.y, this.w, this.h)
   }

   updateData(obj) {
      obj.x = this.x
      
    
   }



}