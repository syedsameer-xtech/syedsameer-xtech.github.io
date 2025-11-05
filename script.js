/* === STARFIELD BACKGROUND (optimized) === */
const canvas = document.getElementById("star-bg");
const ctx = canvas.getContext("2d");

let stars = [];
let animId = null;
let starCount = 150;
let prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function computeStarCount(width, height) {
  const area = width * height;
  // ~1 star per 6000px², clamped
  return Math.max(40, Math.min(300, Math.floor(area / 6000)));
}

function createStars(width, height) {
  const count = computeStarCount(width, height);
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.6 + 0.2,
    d: Math.random() * 0.9 + 0.2
  }));
}

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const cssW = window.innerWidth;
  const cssH = window.innerHeight;
  canvas.width = Math.floor(cssW * dpr);
  canvas.height = Math.floor(cssH * dpr);
  canvas.style.width = cssW + "px";
  canvas.style.height = cssH + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  createStars(cssW, cssH);
}

resizeCanvas();
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(resizeCanvas, 150);
});

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });
}

function animateStars() {
  if (prefersReduced) {
    drawStars(); // static if reduced-motion
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    s.y += s.d;
    if (s.y > window.innerHeight) s.y = -s.r;
  });
  animId = requestAnimationFrame(animateStars);
}

drawStars();
if (!prefersReduced) {
  animateStars();
}

/* === MOTIVATIONAL QUOTES === */
const quotes = [
  "Nothing kills you faster than your own mind. Don't stress over things out of control.",
  "Having someone you can call crying, and end the call laughing is a true blessing!",
  `Your "normal" day is someone's dream, so be thankful every day.`,
  "What you see daily shapes you. Your feed trains your brain each day.",
  "You'll be alone in the most difficult times of your life. These times make you wise, mature, and fearless.",
  "When you have a heart of gold and pure intentions, you don't lose anyone—they lose you.",
  "It's on you. To get you. Where you want to be.",
  "One day, you'll realize that your dream died because you chose comfort over effort. Don't let that regret haunt you forever.",
  "Some people talk to you in their free time, and some people free their time to talk to you. Make sure you know the difference.",
  "Just because I give you advice doesn't mean I'm smarter than you. It means I've done more stupid things than you.",
  "The most dangerous anger comes from someone with a good heart. They hold it in, stay calm, and forgive—until one day they can't anymore. Don't push a good person too far.",
  "If you have the power to eat alone in a restaurant or sit alone in a cinema, then you can do anything in your life.",
  "What they hate in you is missing in them. Keep shining.",
  "Cry as hard as you want, but when you stop crying, make sure you never cry for the same reason again.",
  "A pen can make mistakes, but a pencil can't because it has a good friend: an eraser. A true friend helps fix your mistakes.",
  "Dress well, even when you are alone. Treat yourself with the respect you deserve.",
  "Drinking a lot of water every day helps you avoid drama, because you're too busy peeing. Stay hydrated.",
  "Never become so thirsty that you drink from every cup presented to you. That's how you get poisoned.",
  "No flower grows without rain, and no person grows without pain.",
  "The best way to keep a prisoner from escaping is to make sure he never knows he is in prison.",
  "Slow success builds character. Fast success builds ego.",
  "The faker you are, the bigger your circle will be. The realer you are, the smaller your circle becomes.",
  "Your mind is a magnet. Think blessings, attract blessings. Think problems, attract problems. Choose your thoughts wisely.",
  "Be the change you wish to see in the world."
];

const quoteEl = document.getElementById("quote-text");
quoteEl.setAttribute("aria-live", "polite");

function showRandomQuote() {
  if (!quoteEl) return;
  quoteEl.style.opacity = 0;
  setTimeout(() => {
    quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    quoteEl.style.opacity = 1;
  }, 320);
}
showRandomQuote();
const quoteInterval = prefersReduced ? 15000 : 7000;
const quoteTimer = setInterval(showRandomQuote, quoteInterval);

/* === ROCK PAPER SCISSORS GAME (with persistence) === */
let playerScore = 0, botScore = 0;
const stored = (() => {
  try {
    return JSON.parse(localStorage.getItem("rps-scores"));
  } catch (e) {
    return null;
  }
})();
if (stored && typeof stored.player === "number" && typeof stored.bot === "number") {
  playerScore = stored.player;
  botScore = stored.bot;
  const scoreEl = document.getElementById("rps-score");
  if (scoreEl) scoreEl.textContent = `Your Score: ${playerScore} | Bot Score: ${botScore}`;
}

function saveScores() {
  try {
    localStorage.setItem("rps-scores", JSON.stringify({ player: playerScore, bot: botScore }));
  } catch (e) {
    // ignore storage errors
  }
}

function playRPS(playerChoice) {
  const choices = ["rock", "paper", "scissors"];
  const botChoice = choices[Math.floor(Math.random() * choices.length)];
  const resultEl = document.getElementById("rps-result");
  const scoreEl = document.getElementById("rps-score");

  if (!resultEl || !scoreEl) return;

  if (playerChoice === botChoice) {
    resultEl.textContent = "🤝 It's a tie!";
  } else if (
    (playerChoice === "rock" && botChoice === "scissors") ||
    (playerChoice === "paper" && botChoice === "rock") ||
    (playerChoice === "scissors" && botChoice === "paper")
  ) {
    resultEl.textContent = `✅ You win! ${playerChoice} beats ${botChoice}.`;
    playerScore++;
  } else {
    resultEl.textContent = `❌ You lose! ${botChoice} beats ${playerChoice}.`;
    botScore++;
  }

  scoreEl.textContent = `Your Score: ${playerScore} | Bot Score: ${botScore}`;
  saveScores();
}

/* expose function globally (keeps existing inline onclick handlers working) */
window.playRPS = playRPS;
