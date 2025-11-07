const baseSize = 16;
function setRem() {
  const scale = document.documentElement.clientWidth / 375; // 以 iPhone 375px 设计稿为基准
  document.documentElement.style.fontSize =
    baseSize * Math.min(scale, 2) + 'px';
}
window.onresize = setRem;
setRem();
