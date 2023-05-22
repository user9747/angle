const bgm = document.getElementById("bgm");
const clickSound = document.getElementById("click");

export const playBgm = () => {
  bgm.play();
};

export const playClick = () => {
  clickSound.play();
};