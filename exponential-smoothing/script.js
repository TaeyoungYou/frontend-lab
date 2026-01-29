const balls = document.querySelectorAll(".ball");

let targetX = 0;
let currentPosition = 0;
let strength = 0.05;
let damping = 0.78;
let mass = 0.7;
let velocity = 0;
let accelerate = 0;

let id = null;
let timeoutId = null;
let index = -1;

balls.forEach((el, i) => {
  el.addEventListener("click", () => {
    targetX = document.documentElement.scrollWidth - 100 * 2 - 80;
    currentPosition = 0;
    velocity = 0;
    accelerate = 0;

    if (id !== null) cancelAnimationFrame(id);

    index = i;
    id = requestAnimationFrame(loop);
  });
});

const loop = () => {
  switch (index) {
    case 0: {
      // alpha
      velocity = (targetX - currentPosition) * strength;
      currentPosition = currentPosition + velocity;
      break;
    }
    case 1: {
      // strength, damping
      velocity = velocity + (targetX - currentPosition) * strength;
      velocity = velocity * damping;
      currentPosition = currentPosition + velocity;
      break;
    }
    case 2: {
      let force = (targetX - currentPosition) * strength;
      accelerate = force / mass;
      velocity = velocity + accelerate;
      velocity = velocity * damping;
      currentPosition = currentPosition + velocity;
      break;
    }
  }

  if (Math.abs(targetX - currentPosition) < 0.001) currentPosition = targetX;
  balls[index].style.transform = `translateX(${currentPosition}px)`;

  id = requestAnimationFrame(loop);
};
