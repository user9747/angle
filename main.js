import { playBgm } from "./src/sounds.js";
import { setupTriangle, updateTriangle } from "./src/triangle.js";
import { setupPipes, updatePipes } from "./src/walls.js";

const title = document.querySelector("[data-title]");
let lastFrameTime;
const updateAnimationLoop = (time) => {
  if (!lastFrameTime) {
    lastFrameTime = time;
    window.requestAnimationFrame(updateAnimationLoop);
    return;
  }
  const delta = time - lastFrameTime;
  //   console.log(delta, time, lastFrameTime);
  updateTriangle(delta);
  updatePipes(delta);
  lastFrameTime = time;
  window.requestAnimationFrame(updateAnimationLoop);
};

const handleStart = () => {
  console.log("starting");
  playBgm();
  title.classList.add("hide");
  setupTriangle();
  setupPipes();
  updateAnimationLoop();
};
document.addEventListener("keypress", handleStart, { once: true });
