// import * as Particles from './particle';
import * as Helpers from './helper-methods';



const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
c.strokeStyle = Helpers.randomColor();
const gravity = 0.2;

let fireworks = [];

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
});

const draw = () => {
  fireworks.push(new Firework());
  for (let i = 0; i < fireworks.length; i++) {
    fireworks[i].update();
    fireworks[i].show();
  }
};

class Particle {
  constructor(x, y, r) {
    this.pos = { x: x, y: y };
    this.vel = { x: 0, y: -10 };
    this.acc = { x: 0, y: 0 };
    this.radius = r;

    this.applyForce = (force) => {
      this.acc.y += force;
    };
  }

  draw() {
    this.applyForce(gravity);
    // this.show();
    // this.update();
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

}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((firework) => {
    firework.update();
  });
}

function Firework() {

  const r = Math.random() * 5 + 15;
  const x = Math.random() * (innerWidth - 2 * r) + r;
  const y = Math.random() * (innerHeight - 2 * r) + r;

  this.firework = new Particle(x, y, r);

  this.update = () => {
    this.firework.applyForce(gravity);
    this.firework.update();
    this.firework.draw();
  };

  this.show = () => {
    this.firework.draw();
  };
}

draw();
