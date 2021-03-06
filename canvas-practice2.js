const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

import { resolveCollision } from './collision-methods';

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

window.addEventListener('click', function(e) {
  init();
});

const gravity = 1;
const friction = 0.9;

function Particle (x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.velocity = {
    x: dx,
    y: dy
  };
  this.radius = radius;
  this.mass = 1;

  this.randomColor = function() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return (`rgba(${r},${g}, ${b}, ${Math.random()})`);
  };

  this.color = this.randomColor();

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
  };

  this.update = (particles) => {
    this.draw();

    // for (let i = 0; i < particles.length; i++) {
    //   const p2 = particles[i];
    //   if (this === p2) continue;
    //   if (distance(this.x, this.y, p2.x, p2.y) < this.radius + p2.radius) {
    //     resolveCollision(this, p2);
    //   }
    // }

    if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
      this.velocity.x = -this.velocity.x;
    }

    if (this.y + this.radius + this.velocity.y >= canvas.height) {
      this.velocity.y = -this.velocity.y * friction;
    } else {
      this.velocity.y += gravity;
    }

    //mouse Collision
    // if (distance(this.x, this.y, mouse.x, mouse.y) < 50) {
    //
    // }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  };

  // random balls:
  // this.updateRandomBalls = function() {
  //   if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
  //     this.dx = -this.dx;
  //   }
  //
  //   if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
  //     this.dy = -this.dy;
  //   }
  //
  //   this.x += this.dx;
  //   this.y += this.dy;
  //
  //   if (mouse.x - this.x < 50 && mouse.x - this.x > -50
  //     && mouse.y - this.y < 50 && mouse.y - this.y > -50
  //   ) {
  //     if (this.radius < maxRadius) {
  //       this.radius += 1;
  //     }
  //   } else if (this.radius > minRadius) {
  //     this.radius -=1;
  //   }
  //
  //
  //   this.draw();
  // };

  // this.updateGravity = function() {
  //   if (this.y + this.radius + this.dy >= canvas.height) {
  //     this.dy = -this.dy * friction;
  //     if (this.dx > 0) {
  //       this.dx -= 1;
  //     } else if (this.dx < 0) {
  //       this.dx += 1;
  //     }
  //   } else {
  //     this.dy += gravity;
  //   }
  //
  //   if (this.x + this.radius + this.dx > canvas.width
  //     || this.x - this.radius + this.dx < 0
  //   ) {
  //     this.dx = -this.dx;
  //   }
  //   this.x += this.dx;
  //   this.y += this.dy;
  //
  //   this.draw();
  // };
}

function distance(x1, y1, x2, y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

let particles;
const init = function() {
  particles = [];

  for (let i = 0; i < 100; i++) {
    // const r = Math.random() * 5 + 15;
    let r = Math.random() * 5;
    let x = Math.random() * (canvas.width - 2 * r) + r;
    let y = Math.random() * (canvas.height - 2 * r) + r;
    const dx = (Math.random() - 0.5) * 5;
    const dy = (Math.random() - 0.5) * 5;

    // if (i !== 0) {
    //   for (let j = 0; j < particles.length; j++) {
    //     const p2 = particles[j];
    //     if (distance(x, y, p2.x, p2.y) < r + p2.radius) {
    //       x = Math.random() * (canvas.width - 2 * r) + r;
    //       y = Math.random() * (canvas.height - 2 * r) + r;
    //
    //       j = -1;
    //     }
    //   }
    // }

    particles.push(new Particle(x, y, dx, dy, r));
  }
};



function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.update(particles);
  });
}

init();
animate();
