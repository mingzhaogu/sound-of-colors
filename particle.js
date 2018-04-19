import { gravity } from './main';

class Particle {
  constructor(x, y, r) {
    this.pos = { x: x, y: y };
    this.vel = { x: 0, y: -10 };
    this.acc = { x: 0, y: 0 };
    this.radius = r;

    this.applyForce = (force) => {
      this.acc.add(force);
    };
  }

  draw() {
    this.applyForce(gravity);
    this.update();
    this.show();
  }

  update() {
    if (this.pos.x + this.radius + this.vel.x > canvas.width
      || this.pos.x - this.radius + this.vel.x < 0
    ) {
      this.vel.x = -this.vel.x;
    }
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    this.draw();
  }
};

export default Particle;
