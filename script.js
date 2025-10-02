// STARFIELD BACKGROUND
const canvas = document.getElementById('star-bg');
const ctx = canvas.getContext('2d');
let stars = [];
const STAR_COUNT = 200;

function initStars() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array.from({length: STAR_COUNT}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * canvas.width,
    o: Math.random()
  }));
}

function animateStars() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    s.z -= 2;
    if (s.z <= 0) {
      s.x = Math.random() * canvas.width;
      s.y = Math.random() * canvas.height;
      s.z = canvas.width;
      s.o = Math.random();
    }
    const sx = (s.x - canvas.width/2) * (canvas.width / s.z) + canvas.width/2;
    const sy = (s.y - canvas.height/2) * (canvas.width / s.z) + canvas.height/2;
    const radius = (1 - s.z / canvas.width) * 2;
    ctx.beginPath();
    ctx.arc(sx, sy, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${s.o})`;
    ctx.fill();
  });
  requestAnimationFrame(animateStars);
}

window.addEventListener('resize', initStars);
initStars();
animateStars();

// QUOTES ROTATION
const quotes = [
  "Nothing kills you faster than your own mind. Don't stress over things out of control.",
  "Having someone you can call crying, and end the call laughing is a true blessing!",
  'Your "normal" day is someone\'s dream, so be thankful every day.',
  "What you see daily shapes you. Your feed trains your brain each day.",
  "You'll be alone in the most difficult times of your life. These times make you wise, mature, and fearless.",
  "When you have a heart of gold and pure intentions, you don't lose anyone- they lose you.",
  "It's on you. To get you. Where you want to be.",
  "One day, you'll realize that your dream died because you chose comfort over effort. Don't let that regret haunt you forever."
];
let quoteIndex = 0;
const quoteText = document.getElementById('quote-text');

function rotateQuotes() {
  quoteText.textContent = quotes[quoteIndex];
  quoteIndex = (quoteIndex + 1) % quotes.length;
  setTimeout(rotateQuotes, 5000);
}

rotateQuotes();

// ROCK-PAPER-SCISSORS GAME with score
let userScore = 0, botScore = 0;
function playRPS(userChoice) {
  const choices = ["rock", "paper", "scissors"];
  const botChoice = choices[Math.floor(Math.random() * choices.length)];
  const resultText = document.getElementById("rps-result");
  const scoreText = document.getElementById("rps-score");
  let result;

  if (userChoice === botChoice) {
    result = `🤝 Draw! Both chose ${userChoice}.`;
  } else if ((userChoice === "rock" && botChoice === "scissors") ||
             (userChoice === "paper" && botChoice === "rock") ||
             (userChoice === "scissors" && botChoice === "paper")) {
    result = `🎉 You win! ${userChoice} beats ${botChoice}.`;
    userScore++;
  } else {
    result = `💀 You lose! ${botChoice} beats ${userChoice}.`;
    botScore++;
  }

  resultText.textContent = result;
  scoreText.textContent = `Your Score: ${userScore} | Bot Score: ${botScore}`;
}

// FEEDBACK FORM
const form = document.getElementById("feedback-form");
if(form){
  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("✅ Feedback sent successfully!");
    form.reset();
  });
}
