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

canvas.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  mouse.x = event.x - rect.left;
  mouse.y = event.y - rect.top;
});

window.addEventListener('resize', function(e) {
  canvas.width = Math.min(1028, window.innerWidth);
  canvas.height = window.innerHeight;
  let noteWidth = canvas.width / 12;
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

window.addEventListener('click', function(e) {
  let win;
  if (inGithubLink) {
    win = window.open("https://github.com/mingzhaogu", '_blank');
    win.focus();
  } else if (inLinkedInLink) {
    win = window.open("https://www.linkedin.com/in/mingzhaogu/", '_blank');
    win.focus();
  }
});
// SETUP END

// GLOBAL VARIABLES:
const gravity = 0.2;
const friction = 0.9;
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};
let noteWidth = canvas.width / 12;
const dotsPerKey = 5;
const oddsOfExplosion = 0.5;
let currentKey;
let currentKeyTimeOut;
let inGithubLink;
let inLinkedInLink;
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

    if (this.firework && this.pos.y <= 0.235 * canvas.height) {
      this.explode();
    } else if (this.pos.y <= 0.235 * canvas.height) {
      this.radius *= 0.99;
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
        radius: (Math.random() + 2),
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
  } else if (e) {
    const rand = [0, 11 * noteWidth];
    const randSample = rand[Math.floor(Math.random() * rand.length)];
    initX = Math.random() * noteWidth + randSample;
    initY = canvas.height;
    initVel = - Math.max((Math.random() + 0.5) * 3, 1);
  } else {
    initX = Math.random() * canvas.width;
    initY = canvas.height;
    initVel = - Math.max(Math.random() * 5, 1);
    initCol = randomColor(0.2);
  }

  particles.push(new Particle({
    pos: { x: initX, y: initY },
    radius: (Math.random() + 3),
    vel: { x: (Math.random() - 0.5) * 0.25, y: initVel },
    color: initCol
  }));
}

function animate() {
  requestAnimationFrame(animate);
  draw();
  resetDisplay();
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
  c.fillStyle = 'rgba(0, 0, 0, 0.4)';
  // c.fillStyle = 'red'; //testing purposes
  c.fillRect(noteWidth, 0.045 * canvas.height, canvas.width - 2 * noteWidth, 0.19 * canvas.height);

  // label title
  c.font = '96px Codystar';
  c.fillStyle = 'rgba(255, 255, 255, 1)';
  c.fillText('Sound of Colors', noteWidth, 0.15 * canvas.height, canvas.width * 5/6);

  // label name
  c.font = '36px Codystar';
  c.fillText('Annie Gu', 5 * noteWidth, 0.21 * canvas.height, canvas.width * 5/6);

  addIcons();
}

function addIcons() {
  // link icon locations
  const yHeight = 0.05 * canvas.height;
  const y1 = 0.17 * canvas.height;
  const y2 = y1 + yHeight;

  const xWidth = noteWidth / 2 - 3.5;
  const githubX1 = 4.25 * noteWidth;
  const githubX2 = githubX1 + xWidth;
  const linkedInX1 = 7.45 * noteWidth;
  const linkedInX2 = linkedInX1 + xWidth;

  // check for mouseover
  if (mouse.x >= githubX1 && mouse.x <= githubX2 &&
    mouse.y >= y1 && mouse.y <= y2) {
    document.body.style.cursor = "pointer";
    inGithubLink = true;
  } else if (mouse.x >= linkedInX1 && mouse.x <= linkedInX2 &&
    mouse.y >= y1 && mouse.y <= y2) {
    document.body.style.cursor = "pointer";
    inLinkedInLink = true;
  } else {
    document.body.style.cursor = "";
    inGithubLink = false;
    inLinkedInLink = false;
  }

  // add icons
  c.font = '36px FontAwesome';
  // github icon
  if (inGithubLink) c.fillStyle = randomColor(1);
  c.fillText('\uf09b', 4.3 * noteWidth, 0.21 * canvas.height, canvas.width * 2/6);
  c.fillStyle = 'rgba(255, 255, 255, 1)';

  // linkedin icon
  if (inLinkedInLink) c.fillStyle = randomColor(1);
  c.fillText('\uf0e1', 7.5 * noteWidth, 0.21 * canvas.height, canvas.width * 2/6);
  c.fillStyle = 'rgba(255, 255, 255, 1)';
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
  const whiteKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'];
  whiteKeys.forEach((note, idx) => {
    c.fillText(note, noteWidth * (idx + 1.38), 0.97 * canvas.height, noteWidth);
  });

  // label black keys
  c.fillStyle = 'rgba(255, 255, 255, 1)';
  const blackKeys = ['W', 'E', '', 'T', 'Y', 'U', '', 'O', 'P'];
  blackKeys.forEach((note, idx) => {
    c.fillText(note, noteWidth * (idx + 1.85), 0.9 * canvas.height, noteWidth);
  });
}

class Firework extends Particle {
  constructor({ pos, radius, vel, color }) {
    super({ pos, radius, vel, color });
  }

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

animate();
