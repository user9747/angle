import { playClick } from "./sounds.js";

const triangle = document.querySelector("[data-triangle]");
let SPEED = 0.1;
let DIRECTION = 1;
let ANGLE = 15;
const setTop = (top) => {
  triangle.style.setProperty("--top", top);
};

const setAngle = () => {
  triangle.style.setProperty(
    "--rotate",
    (-DIRECTION * ANGLE).toString() + "deg"
  );
};

const getTop = () => {
  return parseFloat(getComputedStyle(triangle).getPropertyValue("--top"));
};

const onToggleDirection = (e) => {
  if (e.code !== "Space") {
    return;
  }
  playClick();
  DIRECTION = -DIRECTION;
  setAngle();
};

export const setupTriangle = () => {
  setTop(window.innerHeight / 2);
  document.addEventListener("keypress", onToggleDirection);
};

export const getTriangleRect = () => {
  return triangle.getBoundingClientRect();
};
export const updateTriangle = (delta) => {
  const newTop = getTop() + DIRECTION * SPEED * delta;
  if (newTop + DIRECTION * SPEED * delta <= 0) {
    setTop(0);
    return;
  } else if (
    newTop + DIRECTION * SPEED * delta >=
    window.innerHeight - triangle.clientHeight
  ) {
    setTop(window.innerHeight - triangle.clientHeight);
    return;
  }
  setTop(newTop + DIRECTION * SPEED * delta);
};
