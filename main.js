import {
  randomColor,
  keyIndex,
  setInitX,
  mapToWhite,
  mapToBlack
} from './helper-methods';
import sounds from './key-to-sounds';

// SETUP START
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
// SETUP END

// GLOBAL VARIABLES:
const gravity = 0.2;
const friction = 0.9;
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};
const noteWidth = canvas.width / 12;
const dotsPerKey = 5;
const oddsOfExplosion = 0.5;
let currentKey;
let currentKeyTimeOut;
// GLOBAL VARIABLES:

class Particle  {
  constructor ({ pos, radius, vel, color }) {
    this.pos = { x: pos.x, y: pos.y };
    this.vel = { x: vel.x, y: vel.y };

    this.radius = radius;
    this.gravity = gravity;
    this.color = color || randomColor();
    this.firework = Math.random() <= oddsOfExplosion;
  }

  update () {

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    if (this.pos.x < 0) this.pos.x = canvas.width;
    if (this.pos.x > canvas.width) this.pos.x = 0;

    // let checkForRemoval = false;
    // if (this.pos.y <= 0.22 * canvas.height) {
    //   if (this.pos.x > noteWidth || this.pos.x < (canvas.width - noteWidth)) {
    //     checkForRemoval = true;
    //   } else if (this.pos.y < 0) {
    //     checkForRemoval = true;
    //   }
    // }

    // if (checkForRemoval) {
    if (this.firework && this.pos.y <= 0.22 * canvas.height) {
      this.explode();
    } else if (this.pos.y <= 0.22 * canvas.height) {
      this.radius *= 0.98;
    }

    if (this.pos.y < 0) this.removeParticle();
    else this.show();

    c.strokeStyle = this.color;
  }

  explode() {
    for (let i = 0; i < 10; i++) {
      const f = new Firework({
        pos: {
          x: this.pos.x,
          y: this.pos.y
        },
        radius: (Math.random() + 1),
        vel: {
          x: (Math.random() - 0.5) * 2.5,
          y: (Math.random() - 0.5) * 2.5
        },
        color: this.color
      });

      particles.push(f);
      this.removeParticle();
    }
  }

  show () {
    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
    // c.lineWidth = 0;
    c.fillStyle = this.color;
    c.fill();
  }

  removeParticle() {
    const idx = particles.indexOf(this);
    if (idx > -1) particles.splice(idx, 1);
  }
}

let particles = [];
function init(key, e) {
  let initX, initY, initVel, initCol;

  if (sounds[key]) {
    const noteIndex = keyIndex(key);
    initX = setInitX[noteIndex] * noteWidth;
    initY = 0.75 * canvas.height;
    initVel = - Math.max(Math.random() * 6, 1);
    // initVel = - Math.random() * 28;
    // initCol = randomColor();
  } else if (e) {
    const rand = [0, 11 * noteWidth];
    const randSample = rand[Math.floor(Math.random() * rand.length)];
    initX = Math.random() * noteWidth + randSample;
    initY = canvas.height;
    // initVel = - Math.random() * 8;
    // initVel = - (Math.random() + 1) * 15;
    initVel = - Math.max((Math.random() + 0.5) * 3, 1);
    // initCol = randomColor();
  } else {
    initX = Math.random() * canvas.width;
    initY = canvas.height;
    initVel = - Math.max(Math.random() * 5, 1);
    // initVel = - (Math.random() + 2) * 5;
    initCol = randomColor(0.2);
  }

  particles.push(new Particle({
    pos: {
      x: initX,
      y: initY
    },
    // radius: (Math.random() + 3),
    radius: (Math.random() + 3),
    vel: {
      // x: Math.random() - 0.5,
      x: (Math.random() - 0.5) * 0.25,
      y: initVel
    },
    color: initCol
  }));
}

function animate() {
  requestAnimationFrame(animate);
  draw();
  resetDisplay();
}

function draw() {
  // c.clearRect(0, 0, canvas.width, canvas.height);
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
  c.fillRect(noteWidth, 0.04 * canvas.height, canvas.width - 2 * noteWidth, 0.18 * canvas.height);

  // label title
  c.font = '96px Codystar';
  c.fillStyle = 'rgba(255, 255, 255, 1)';
  c.fillText('Sound of Colors', noteWidth, 0.15 * canvas.height, canvas.width * 5/6);

  // label name
  c.font = '24px Codystar';
  c.fillStyle = 'rgba(255, 255, 255, 1)';
  c.fillText('Annie Gu', 5.5 * noteWidth, 0.2 * canvas.height, canvas.width * 5/6);
}

function displayPiano() {
  const topOfPiano = 0.75 * canvas.height;
  let keyColor;
  const index = keyIndex(currentKey);
  let colorCurrentKey = () => {};

  if ([1, 3, 6, 8, 10, 13, 15].includes(index)) keyColor = "black";
  else keyColor = "white";

  if (currentKeyTimeOut > 0) {
    const pianoHeight = canvas.height - topOfPiano;
    if (keyColor === 'white') {
      colorCurrentKey = () => {
        const coloredI = mapToWhite[index];
        c.fillStyle = 'rgba(0, 0, 0, 0.5)';
        c.fillStyle = 'gray';
        c.fillRect(noteWidth * coloredI, topOfPiano, noteWidth, pianoHeight);
        c.strokeRect(noteWidth * coloredI, topOfPiano, noteWidth, pianoHeight);
        c.stroke();
      };
    } else if (keyColor === 'black') {
      colorCurrentKey = () => {
        const coloredI = mapToBlack[index];
        c.fillStyle = 'rgba(255, 255, 255, 0.5)';
        c.fillStyle = 'rgba(0, 0, 0, 0.5)';
        c.fillStyle = 'gray';
        c.fillRect(noteWidth * (coloredI + 2/3), topOfPiano, noteWidth * 2 / 3, (pianoHeight) * 2/3);
        c.strokeStyle = 'rgba(255, 255, 255, 1)';
        c.strokeRect(noteWidth * (coloredI + 2/3), topOfPiano + 1, noteWidth * 2 / 3, pianoHeight);
        c.stroke();
      };
    }
    currentKeyTimeOut -= 1;
  } else {
    currentKey = undefined;
  }

  createKeys(topOfPiano, keyColor, colorCurrentKey);
  labelKeys();
}

function createKeys(topOfPiano, keyColor, colorCurrentKey) {
  //creating the white keys
  for (let i = 1; i < 11; i++) {
    c.fillStyle = 'rgba(255, 255, 255, 1)';
    c.fillRect(noteWidth * i, topOfPiano, noteWidth, canvas.height - topOfPiano);
    c.strokeStyle = 'rgba(0, 0, 0, 1)';
    c.strokeRect(noteWidth * i, topOfPiano, noteWidth, canvas.height - topOfPiano);
    c.stroke();
  }

  if (keyColor === 'white') colorCurrentKey();
  //creating the black keys
  for (let i = 1; i < 10; i++) {
    if (i === 3 || i === 7) continue;
    c.fillStyle = 'rgba(0, 0, 0, 1)';
    c.fillRect(noteWidth * (i + 2/3), topOfPiano, noteWidth * 2 / 3, (canvas.height - topOfPiano) * 2/3);
    c.strokeStyle = 'rgba(255, 255, 255, 1)';
    c.strokeRect(noteWidth * (i + 2/3), topOfPiano + 1, noteWidth * 2 / 3, (canvas.height - topOfPiano) * 2/3);
    c.stroke();
  }
  if (keyColor === 'black') colorCurrentKey();
}

function labelKeys() {
  c.font = '32px Poiret One';
  // label white keys
  c.fillStyle = 'rgba(0, 0, 0, 1)';
  // const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E'];
  const whiteKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'];
  whiteKeys.forEach((note, idx) => {
    c.fillText(note, noteWidth * (idx + 1.38), 0.97 * canvas.height, noteWidth);
  });

  // label black keys
  c.fillStyle = 'rgba(255, 255, 255, 1)';
  // const blackKeys1 = ['C#', 'D#', '', 'F#', 'G#', 'A#', '', 'C#', 'D#'];
  // const blackKeys2 = ['Db', 'Eb', '', 'Gb', 'Ab', 'Bb', '', 'Db', 'Eb'];
  const blackKeys = ['W', 'E', '', 'T', 'Y', 'U', '', 'O', 'P'];
  blackKeys.forEach((note, idx) => {
    c.fillText(note, noteWidth * (idx + 1.85), 0.9 * canvas.height, noteWidth);
  });
}


class Firework extends Particle {
  constructor({ pos, radius, vel, color }) {
    super({ pos, radius, vel, color });
  }
  //
  // const x = Math.random() * (innerWidth - 2 * r) + r;
  // const y = Math.random() * (innerHeight - 2 * r) + r;
  // const r = Math.random() * 5 + 15;

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    if (this.pos.x < 0 || this.pos.x > canvas.width) this.removeParticle();
    if (this.pos.y < 0 || this.pos.y > canvas.width) this.removeParticle();
    if (this.radius < 0.05) this.removeParticle();

    this.radius *= 0.99;
    this.show();
  }

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
// setInterval(init, 500);
// setInterval(init, 300);
