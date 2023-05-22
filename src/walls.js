const HOLE_HEIGHT = 250;
const PIPE_WIDTH = 200;
const PIPE_INTERVAL = 1500;
const PIPE_SPEED = 0.13;
let pipes = [];
let timeSinceLastPipe;
let passedPipeCount;

export function setupPipes() {
  document.documentElement.style.setProperty("--pipe-width", PIPE_WIDTH);
  document.documentElement.style.setProperty("--hole-height", HOLE_HEIGHT);
  pipes.forEach((pipe) => pipe.remove());
  timeSinceLastPipe = PIPE_INTERVAL;
  passedPipeCount = 0;
}

export function updatePipes(delta) {
  timeSinceLastPipe += delta;

  if (timeSinceLastPipe > PIPE_INTERVAL) {
    timeSinceLastPipe -= PIPE_INTERVAL;
    createPipe();
  }

  pipes.forEach((pipe) => {
    if (pipe.left + pipe.width < 0) {
      passedPipeCount++;
      return pipe.remove();
    }
    pipe.left = pipe.left - delta * PIPE_SPEED;
  });
}

export function getPassedPipesCount() {
  return passedPipeCount;
}

export function getPipeRects() {
  return pipes.flatMap((pipe) => pipe.rects());
}

function createPipe() {
  const newPipeWidth = randomNumberBetween(PIPE_WIDTH * 2.5, PIPE_WIDTH * 0.2);
  const newPipeHoleHeight = randomNumberBetween(
    HOLE_HEIGHT * 1.4,
    HOLE_HEIGHT * 1.1
  );
  const pipeElem = document.createElement("div");
  const topElem = createPipeSegment("top");
  const bottomElem = createPipeSegment("bottom");
  pipeElem.append(topElem);
  pipeElem.append(bottomElem);
  pipeElem.classList.add("pipe");
  pipeElem.style.setProperty(
    "--hole-top",
    randomNumberBetween(
      newPipeHoleHeight * 1.5,
      window.innerHeight - newPipeHoleHeight * 0.5
    )
  );
  pipeElem.style.setProperty("--pipe-width", newPipeWidth);
  const pipe = {
    get left() {
      return parseFloat(
        getComputedStyle(pipeElem).getPropertyValue("--pipe-left")
      );
    },
    get width() {
      return parseFloat(
        getComputedStyle(pipeElem).getPropertyValue("--pipe-width")
      );
    },
    set left(value) {
      pipeElem.style.setProperty("--pipe-left", value);
    },
    remove() {
      pipes = pipes.filter((p) => p !== pipe);
      pipeElem.remove();
    },
    rects() {
      return [
        topElem.getBoundingClientRect(),
        bottomElem.getBoundingClientRect(),
      ];
    },
  };
  pipe.left =
    pipes.length > 0
      ? pipes[pipes.length - 1].left + pipes[pipes.length - 1].width
      : window.innerWidth;
  // pipes.length === 0
  //   ? window.innerWidth
  //   : pipes.reduce((a, b) => a.left + b.left);
  document.body.append(pipeElem);

  pipes.push(pipe);
}

function createPipeSegment(position) {
  const segment = document.createElement("div");
  segment.classList.add("segment", position);
  return segment;
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
