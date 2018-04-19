import * as Particle from './particle';

function Firework() {

  const x = Math.random() * (innerWidth - 2 * r) + r;
  const y = Math.random() * (innerHeight - 2 * r) + r;
  const r = Math.random() * 5 + 15;

  this.firework = new Particle(x, y, r);

  this.update = () => {
    this.firework.applyForce(gravity)
    this.firework.update();
    this.firework.show();
  }

  this.show = () => {
    this.firework.show();
  }
}
