/* === STARFIELD BACKGROUND ===
   Restored moving dots. Includes quotes rotation and RPS game with defensive checks.
   Quotes display timing increased for better readability.
*/

const canvas = document.getElementById("star-bg");
let ctx = null;

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
if (canvas) {
  ctx = canvas.getContext("2d");
  resizeCanvas();
  window.addEventListener("resize", () => {
    resizeCanvas();
  });
}

let stars = [];
function initStars(count = 150) {
  if (!canvas) return;
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.2,
    d: Math.random() * 1.5 + 0.5,
  }));
}
initStars();

function animateStars() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    s.y += s.d;
    if (s.y > canvas.height) s.y = 0;
  });
  requestAnimationFrame(animateStars);
}
requestAnimationFrame(animateStars);

/* === MOTIVATIONAL QUOTES === */
const quotes = [
  "Nothing kills you faster than your own mind. Don't stress over things out of control.",
  "Having someone you can call crying, and end the call laughing is a true blessing!",
  `Your "normal" day is someone's dream, so be thankful every day.`,
  "What you see daily shapes you. Your feed trains your brain each day.",
  "You'll be alone in the most difficult times of your life. These times make you wise, mature, and fearless.",
  "When you have a heart of gold and pure intentions, you don't lose anyone—they lose you.",
  "It's on you to get you where you want to be.",
  "One day, you'll realize that your dream died because you chose comfort over effort. Don't let that regret haunt you forever.",
  "Some people talk to you in their free time, and some people free their time to talk to you. Make sure you know the difference.",
  "Just because I give you advice doesn't mean I'm smarter than you. It means I've done more stupid things than you.",
  "The most dangerous anger comes from someone with a good heart. They hold it in, stay calm, and forgive—until one day they can't anymore. Don't push a good person too far.",
  "If you have the power to eat alone in a restaurant or sit alone in a cinema, then you can do anything in your life.",
  "What they hate in you is missing in them. Keep shining.",
  "Cry as hard as you want, but when you stop crying, make sure you never cry for the same reason again.",
  "A pen can make mistakes but a pencil can't because it has a good friend: an eraser. A true friend helps fix your mistakes.",
  "Dress well, even when you are alone. Treat yourself with the respect you deserve.",
  "Drinking a lot of water every day helps you avoid drama, because you're too busy peeing. Stay hydrated.",
  "Never become so thirsty that you drink from every cup presented to you. That's how you get poisoned.",
  "No flower grows without rain, and no person grows without pain.",
  "The best way to keep a prisoner from escaping is to make sure he never knows he is in prison.",
  "Slow success builds character. Fast success builds ego.",
  "The faker you are, the bigger your circle will be. The realer you are, the smaller your circle becomes.",
  "Your mind is a magnet. Think blessings, attract blessings. Think problems, attract problems. Choose your thoughts wisely.",
  "Be the change you wish to see in the world.",
  "F-E-A-R has two meanings: 'Forgot Everything And Run.' 'Face Everything And Rise.'"
];

const quoteEl = document.getElementById("quote-text");

// Timing config (adjust these values if you'd like a different pace)
const QUOTE_INTERVAL = 12000; // milliseconds to show each quote (12s)
const FADE_DURATION = 600;    // fade-out / fade-in duration in ms

if (quoteEl) {
  // Ensure smooth fade transitions
  quoteEl.style.transition = `opacity ${FADE_DURATION}ms ease-in-out`;
}

function showRandomQuote() {
  if (!quoteEl) return;
  // fade out
  quoteEl.style.opacity = 0;
  // wait for fade-out, then change text and fade in
  setTimeout(() => {
    quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    quoteEl.style.opacity = 1;
  }, FADE_DURATION);
}

// initial display and repeated rotation
showRandomQuote();
setInterval(showRandomQuote, QUOTE_INTERVAL);

/* === ROCK PAPER SCISSORS GAME === */
let playerScore = 0, botScore = 0;
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
}

// Expose playRPS to global scope for inline HTML buttons
window.playRPS = playRPS;
