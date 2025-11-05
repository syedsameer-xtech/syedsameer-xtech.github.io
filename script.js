/* === STARFIELD BACKGROUND === */
const canvas = document.getElementById("star-bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let stars = Array.from({ length: 150 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5,
  d: Math.random() * 1.5 + 0.5,
}));

function animateStars() {
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
animateStars();

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

  // ✅ Newly added quotes
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
  "Be the change you wish to see in the world."
];


const quoteEl = document.getElementById("quote-text");
function showRandomQuote() {
  quoteEl.style.opacity = 0;
  setTimeout(() => {
    quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    quoteEl.style.opacity = 1;
  }, 400);
}
showRandomQuote();
setInterval(showRandomQuote, 7000);

/* === ROCK PAPER SCISSORS GAME === */
let playerScore = 0, botScore = 0;
function playRPS(playerChoice) {
  const choices = ["rock", "paper", "scissors"];
  const botChoice = choices[Math.floor(Math.random() * choices.length)];
  const resultEl = document.getElementById("rps-result");
  const scoreEl = document.getElementById("rps-score");

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
