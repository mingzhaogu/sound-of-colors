import * as Particles from './particle';
import * as Helpers from './helper-methods';

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
c.strokeStyle = Helpers.randomColor();
const gravity = 0.2;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

window.addEventListener('mousemove', function(e) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', function(e) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});



class Particle {
  constructor(x, y, r) {

    this.pos = { x: x, y: y };
    this.vel = { x: 0, y: -10 };
    this.acc = { x: 0, y: 0 };
    this.radius = r;

    this.applyForce = (force) => {
      this.acc.add(force);
    }
  }

  draw() {
    this.applyForce(gravity);
    this.update();
    this.show();
  }
};
