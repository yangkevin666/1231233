let startTime = 0;
let bestTime = Infinity;
let timeoutId;

const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const message = document.getElementById("message");
const bestTimeDisplay = document.getElementById("best-time");

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  stopBtn.disabled = false; // 先允許按停止，但會判斷是否太早
  message.textContent = "等待綠色...";
  document.body.style.backgroundColor = "red";

  const delay = Math.random() * 2000 + 1000; // 1~3 秒
  timeoutId = setTimeout(() => {
    document.body.style.backgroundColor = "green";
    startTime = new Date().getTime();
    message.textContent = "快按停止！";
  }, delay);
});

stopBtn.addEventListener("click", () => {
  if (document.body.style.backgroundColor !== "green") {
    // 太早按
    message.textContent = "太早囉！再試一次。";
    clearTimeout(timeoutId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
    return;
  }

  const endTime = new Date().getTime();
  const reactionTime = endTime - startTime;

  message.textContent = `你的反應時間: ${reactionTime} 毫秒`;
  if (reactionTime < bestTime) {
    bestTime = reactionTime;
    bestTimeDisplay.textContent = `最短反應時間: ${bestTime} 毫秒`;
  }

  // 重置
  startBtn.disabled = false;
  stopBtn.disabled = true;
  document.body.style.backgroundColor = "red";
});