/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class Snake {
  constructor() {
    this.body = [];
    // Starts at the center
    this.body[0] = createVector(floor(w / 2), floor(h / 2));
    this.xdir = 0;
    this.ydir = 0;
    this.len = 0;
  }

  setDir(x, y) {
    // Prevents user from going backwards
    if (this.xdir != 0 && x == this.xdir * -1) return;
    if (this.ydir != 0 && y == this.ydir * -1) return;
    this.xdir = x;
    this.ydir = y;
  }

  update() {
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
  }

  grow() {
    let head = this.body[this.body.length - 1].copy();
    this.len++;
    this.body.push(head);
  }

  endGame() {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;

    // Check if snake is out of bounds
    if (x > w - 1 || x < 0 || y > h - 1 || y < 0) return true;

    // Check if snake touches itself
    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if (part.x == x && part.y == y) return true;
    }

    return false;
  }

  // pos is the position of food
  eat(pos) {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;

    if (x == pos.x && y == pos.y) {
      this.grow();
      return true;
    }

    return false;
  }

  show() {
    for (let i = 0; i < this.body.length; i++) {
      fill(11, 83, 81);
      strokeWeight(1);
      rect(this.body[i].x, this.body[i].y, rez, rez);
    }
  }
}
