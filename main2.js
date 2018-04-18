const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

// c.fillRect(x, y, w, h)
// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100,100,100,100);
// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(400,100,100,100);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(300,300,100,100);

// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(300,100);
// c.lineTo(400,300);
// c.strokeStyle = 'green';
// c.stroke();

// c.beginPath();
// c.arc(300,300,30,0,Math.PI * 2, false);
// c.strokeStyle = 'blue';
// c.stroke();

// for (let i = 0; i < 1000; i++) {
//   const x = Math.random() * window.innerWidth;
//   const y = Math.random() * window.innerHeight;
//   const color = '#' + Math.random().toString(16).substr(-6);
//   c.beginPath();
//   c.arc(x, y, 15, 0, Math.PI * 2, false);
//   c.strokeStyle = color;
//   c.stroke();
// }


// animate();

// function animate() {
//   requestAnimationFrame(animate);
//   const x = Math.random() * window.innerWidth;
//   const y = Math.random() * window.innerHeight;
//   const color = '#' + Math.random().toString(16).substr(-6);
//   // c.clearRect(0, 0, innerWidth, innerHeight);
//
//   c.beginPath();
//   c.arc(x,y,15,0,Math.PI * 2, false);
//   c.strokeStyle = color;
//   c.stroke();
// }
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};
const maxRadius = 50;
const minRadius = 2;

const gravity = 1;
const friction = 0.9;

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

function Circle (x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;

  this.randomColor = function() {
    const color1 = Math.floor(Math.random() * 255);
    const color2 = Math.floor(Math.random() * 255);
    const color3 = Math.floor(Math.random() * 255);
    return (`rgba(${color1},${color2}, ${color3}, ${Math.random()})`);
  };

  this.color = this.randomColor();
  // this.color = '#' + Math.random().toString(16).substr(-6);

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
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

  this.updateGravity = function() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
      if (this.dx > 0) {
        this.dx -= 1;
      } else if (this.dx < 0) {
        this.dx += 1;
      }
    } else {
      this.dy += gravity;
    }

    if (this.x + this.radius + this.dx > canvas.width
      || this.x - this.radius + this.dx < 0
    ) {
      this.dx = -this.dx;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}

let circleArray;
const init = function() {
  circleArray = [];
  for (let i = 0; i < 1000; i++) {
    const r = Math.random() * 5 + 15;
    const x = Math.random() * (innerWidth - 2 * r) + r;
    const y = Math.random() * (innerHeight - 2 * r) + r;
    const dx = (Math.random() - 0.5) * 5;
    const dy = (Math.random() - 0.5) * 5;

    circleArray.push(new Circle(x, y, dx, dy, r));
  }
};

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].updateGravity();
  }
}

init();
animate();
