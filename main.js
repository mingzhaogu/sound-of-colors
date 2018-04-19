import {
  randomColor,
  keyIndex,
  setInitX,
  mapToWhite,
  mapToBlack
} from './helper-methods';
import sounds from './key-to-sounds';

const canvas = document.querySelector('canvas');
canvas.width = Math.min(1028, window.innerWidth);
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
clearContext();

window.addEventListener('mousemove', function(e) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', function(e) {
  canvas.width = Math.min(1028, window.innerWidth);
  canvas.height = window.innerHeight;
  init();
});

window.addEventListener('keypress', function(e) {
  for (let i = 0; i < dotsPerKey; i++) {
    init(e.key, e);
  }
  if (sounds[e.key]) sounds[e.key].play();
  currentKey = e.key;
  currentKeyTimeOut = 100;
});

// GLOBAL VARIABLES:
const gravity = 1;
const friction = 0.9;
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};
const noteWidth = canvas.width / 12;
const dotsPerKey = 50;
let currentKey;
let currentKeyTimeOut;
// GLOBAL VARIABLES:

function Particle ({ pos, radius, vel, color }) {
  this.pos = { x: pos.x, y: pos.y };
  this.vel = { x: vel.x, y: vel.y };
  this.acc = { x: 0, y: 0 };
  this.radius = radius;
  this.gravity = gravity;
  this.color = color || randomColor();

  this.applyForce = (force) => {
    this.acc.x += force.x;
    this.acc.y += force.y;
  };

  this.update = () => {
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    if (this.pos.x < 0) this.pos.x = canvas.width;
    if (this.pos.x > canvas.width) this.pos.x = 0;
    // if (this.pos.y < 0) this.pos.y = canvas.height;
    if (this.pos.y < 0 ) {
      const idx = particles.indexOf(this);
      if (idx > -1) particles.splice(idx, 1);
    }

    this.acc = { x: 0, y: 0 };
    // c.strokeStyle = this.color;
    this.show();

  };

  this.show = () => {
    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.fillStyle = this.color;
    // c.stroke();
    c.fill();
  };
}

let particles = [];
function init(key, e) {
  let initX, initY, initVel, initCol;

  if (sounds[key]) {
    const noteIndex = keyIndex(key);
    initX = setInitX[noteIndex] * noteWidth;
    initY = 0.75 * canvas.height;
    initVel = - Math.random() * 6;
  } else if (e) {
    const rand = [0, 11 * noteWidth];
    const randSample = rand[Math.floor(Math.random() * rand.length)];
    initX = Math.random() * noteWidth + randSample;
    initY = canvas.height;
    initVel = - Math.random() * 8;
  } else {
    initX = Math.random() * canvas.width;
    initY = canvas.height;
    initVel = - Math.random() * 5;
    initCol = randomColor(0.2);
  }

  particles.push(new Particle({
    pos: {
      x: initX,
      y: initY
    },
    radius: (Math.random() + 3),
    vel: {
      x: Math.random() - 0.5,
      y: initVel
    },
    color: initCol
  }));
}

function animate() {
  requestAnimationFrame(animate);
  resetDisplay();
  draw();
}

function draw() {
  particles.forEach((particle) => {
    particle.update();
  });
}

function resetDisplay() {
  clearContext();
  displayTitle();
  displayPiano();
}

function clearContext() {
  c.fillStyle = 'rgba(0, 0, 0, 0.2)';
  c.fillRect(0, 0, canvas.width, canvas.height);
}

function displayTitle() {
  c.fillStyle = 'rgba(255, 255, 255, 0.1)';
  c.fillStyle = 'rgba(0, 0, 0, 0.4)';
  // c.fillStyle = 'red';
  c.fillRect(noteWidth, 0.05 * canvas.height, canvas.width - 2 * noteWidth, 0.18 * canvas.height);

  c.font = '96px Codystar';
  c.fillStyle = 'rgba(255, 255, 255, 1)';
  // c.fillStyle = randomColor();
  c.fillText('Sound of Colors', noteWidth, 0.15 * canvas.height, canvas.width * 5/6);
  c.font = '24px Codystar';
  c.fillStyle = 'rgba(255, 255, 255, 1)';
  c.fillText('Annie Gu', 5.5 * noteWidth, 0.2 * canvas.height, canvas.width * 5/6);

}

function displayPiano() {
  const topOfPiano = 0.75 * canvas.height;
  let keyColor;
  const index = keyIndex(currentKey);
  let colorKey = () => {};

  if ([1, 3, 6, 8, 10, 13, 15].includes(index)) keyColor = "black";
  else keyColor = "white";

  if (currentKeyTimeOut > 0) {
    if (keyColor === 'white') {
      colorKey = () => {
        const coloredI = mapToWhite[index];
        c.fillStyle = randomColor();
        c.fillRect(noteWidth * coloredI, topOfPiano, noteWidth, canvas.height - topOfPiano);
        c.strokeStyle = randomColor();
        c.strokeRect(noteWidth * coloredI, topOfPiano, noteWidth, canvas.height - topOfPiano);
        c.stroke();
      };
    } else if (keyColor === 'black') {
      colorKey = () => {
        const coloredI = mapToBlack[index];
        console.log("colI", coloredI);
        c.fillStyle = randomColor();
        c.fillRect(noteWidth * (coloredI + 2/3), topOfPiano, noteWidth * 2 / 3, (canvas.height - topOfPiano) * 2/3);
        c.strokeStyle = 'rgba(255, 255, 255, 1)';
        c.strokeRect(noteWidth * (coloredI + 2/3), topOfPiano + 1, noteWidth * 2 / 3, (canvas.height - topOfPiano) * 2/3);
        c.stroke();
      };
    }
    currentKeyTimeOut -= 1;
  } else {
    currentKey = undefined;
  }

  //creating the white keys
  for (let i = 1; i < 11; i++) {
    c.fillStyle = 'rgba(255, 255, 255, 1)';
    c.fillRect(noteWidth * i, topOfPiano, noteWidth, canvas.height - topOfPiano);
    c.strokeStyle = 'rgba(0, 0, 0, 1)';
    c.strokeRect(noteWidth * i, topOfPiano, noteWidth, canvas.height - topOfPiano);
    c.stroke();
  }
  if (keyColor === 'white') colorKey();
  //creating the black keys
  for (let i = 1; i < 10; i++) {
    if (i === 3 || i === 7) continue;
    c.fillStyle = 'rgba(0, 0, 0, 1)';
    c.fillRect(noteWidth * (i + 2/3), topOfPiano, noteWidth * 2 / 3, (canvas.height - topOfPiano) * 2/3);
    c.strokeStyle = 'rgba(255, 255, 255, 1)';
    c.strokeRect(noteWidth * (i + 2/3), topOfPiano + 1, noteWidth * 2 / 3, (canvas.height - topOfPiano) * 2/3);
    c.stroke();
  }
  if (keyColor === 'black') colorKey();
}
// function drawFireworks() {
//   for (let i = 0; i < particles.length; i++) {
//     const firework = particles[i];
//
//     if (firework.update()) {
//       particles.splice(i, 1);
//
//       if (Math.random() < 0.8) {
//         FireworkExplosions.star(firework);
//       } else {
//         FireworkExplosions.circle(firework);
//       };
//     }
//
//     firework.render
//   }
// }


//   this.draw = () => {
//     c.beginPath();
//     c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//     c.strokeStyle = this.color;
//     c.fillStyle = this.color;
//     c.fill();
//     c.stroke();
//   };
//
//   this.update = (particles) => {
//     this.draw();
//
//     if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
//       this.velocity.x = -this.velocity.x;
//     }
//
//     if (this.y + this.radius + this.velocity.y >= canvas.height) {
//       this.velocity.y = -this.velocity.y * friction;
//     } else {
//       this.velocity.y += gravity;
//     }
//
//     this.x += this.velocity.x;
//     this.y += this.velocity.y;
//   };
//
//   // random balls:
//   // this.updateRandomBalls = function() {
//   //   if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
//   //     this.dx = -this.dx;
//   //   }
//   //
//   //   if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
//   //     this.dy = -this.dy;
//   //   }
//   //
//   //   this.x += this.dx;
//   //   this.y += this.dy;
//   //
//   //   if (mouse.x - this.x < 50 && mouse.x - this.x > -50
//   //     && mouse.y - this.y < 50 && mouse.y - this.y > -50
//   //   ) {
//   //     if (this.radius < maxRadius) {
//   //       this.radius += 1;
//   //     }
//   //   } else if (this.radius > minRadius) {
//   //     this.radius -=1;
//   //   }
//   //
//   //
//   //   this.draw();
//   // };
//
//   // this.updateGravity = function() {
//   //   if (this.y + this.radius + this.dy >= canvas.height) {
//   //     this.dy = -this.dy * friction;
//   //     if (this.dx > 0) {
//   //       this.dx -= 1;
//   //     } else if (this.dx < 0) {
//   //       this.dx += 1;
//   //     }
//   //   } else {
//   //     this.dy += gravity;
//   //   }
//   //
//   //   if (this.x + this.radius + this.dx > canvas.width
//   //     || this.x - this.radius + this.dx < 0
//   //   ) {
//   //     this.dx = -this.dx;
//   //   }
//   //   this.x += this.dx;
//   //   this.y += this.dy;
//   //
//   //   this.draw();
//   // };
// // }
//
// function distance(x1, y1, x2, y2) {
//   let xDistance = x2 - x1;
//   let yDistance = y2 - y1;
//
//   return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
// }
//
// function Firework (x, y, dx, dy, radius) {
//   this.firework = new Particle (x, y, dx, dy, radius);
// }

// let particles;
// const init = function() {
//   particles = [];
//
//   for (let i = 0; i < 100; i++) {
//     // const r = Math.random() * 5 + 15;
//     let r = Math.random() + 3;
//     let x = Math.random() * (canvas.width - 2 * r) + r;
//     let y = Math.random() * (canvas.height - 2 * r) + r;
//     const dx = (Math.random() - 0.5) * 5;
//     const dy = (Math.random() - 0.5) * 5;
//
//     // if (i !== 0) {
//     //   for (let j = 0; j < particles.length; j++) {
//     //     const p2 = particles[j];
//     //     if (distance(x, y, p2.x, p2.y) < r + p2.radius) {
//     //       x = Math.random() * (canvas.width - 2 * r) + r;
//     //       y = Math.random() * (canvas.height - 2 * r) + r;
//     //
//     //       j = -1;
//     //     }
//     //   }
//     // }
//
//     particles.push(new Particle({x, y}, {dx, dy}, r));
//   }
// };


animate();
setInterval(init, 500);
