/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collision_methods__ = __webpack_require__(1);
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');



const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

window.addEventListener('mousemove', function (e) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', function (e) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

window.addEventListener('click', function (e) {
  init();
});

const gravity = 1;
const friction = 0.9;

function Particle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.velocity = {
    x: dx,
    y: dy
  };
  this.radius = radius;
  this.mass = 1;

  this.randomColor = function () {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g}, ${b}, ${Math.random()})`;
  };

  this.color = this.randomColor();
  // this.color = '#' + Math.random().toString(16).substr(-6);

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
  };

  this.update = particles => {
    this.draw();

    for (let i = 0; i < particles.length; i++) {
      const p2 = particles[i];
      if (this === p2) continue;
      if (distance(this.x, this.y, p2.x, p2.y) < this.radius + p2.radius) {
        Object(__WEBPACK_IMPORTED_MODULE_0__collision_methods__["a" /* resolveCollision */])(this, p2);
      }
    }

    if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
      this.velocity.x = -this.velocity.x;
    }

    if (this.y + this.radius >= canvas.height) {
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
const init = function () {
  particles = [];

  for (let i = 0; i < 100; i++) {
    // const r = Math.random() * 5 + 15;
    let r = 15;
    let x = Math.random() * (canvas.width - 2 * r) + r;
    let y = Math.random() * (canvas.height - 2 * r) + r;
    const dx = (Math.random() - 0.5) * 5;
    const dy = (Math.random() - 0.5) * 5;

    if (i !== 0) {
      for (let j = 0; j < particles.length; j++) {
        const p2 = particles[j];
        if (distance(x, y, p2.x, p2.y) < r + p2.radius) {
          x = Math.random() * (canvas.width - 2 * r) + r;
          y = Math.random() * (canvas.height - 2 * r) + r;

          j = -1;
        }
      }
    }

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

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const rotate = (velocity, angle) => {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };

  return rotatedVelocities;
};
/* unused harmony export rotate */


const resolveCollision = (particle, otherParticle) => {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    const u1 = rotate(particle.velocity, angle);
    const u2 = rotate(otherParticle.velocity, angle);

    const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
    const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;

    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = resolveCollision;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map