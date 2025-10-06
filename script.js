/* === STARFIELD BACKGROUND === */
const canvas = document.getElementById("star-bg");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5,
    d: Math.random() * 0.5
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  });
  moveStars();
  requestAnimationFrame(drawStars);
}

function moveStars() {
  stars.forEach(star => {
    star.y += star.d;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
}
drawStars();
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

/* === RANDOM CYBER QUOTES === */
const quotes = [
  `"Security is not a product, but a process." — Bruce Schneier`,
  `"The quieter you become, the more you are able to hear." — Ram Dass`,
  `"An expert is a person who has made all the mistakes that can be made in a very narrow field." — Niels Bohr`,
  `"Data is the pollution problem of the information age." — Bruce Schneier`,
  `"Cybersecurity is much more than a matter of IT." — Stephane Nappo`
];
function showRandomQuote() {
  const el = document.getElementById("quote-text");
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  el.textContent = quote;
}
setInterval(showRandomQuote, 7000);

/* === ROCK PAPER SCISSORS GAME === */
let playerScore = 0;
let botScore = 0;

function playRPS(playerChoice) {
  const choices = ["rock", "paper", "scissors"];
  const botChoice = choices[Math.floor(Math.random() * 3)];
  const resultEl = document.getElementById("rps-result");
  const scoreEl = document.getElementById("rps-score");

  let result = "";
  if (playerChoice === botChoice) result = "🤝 It's a tie!";
  else if (
    (playerChoice === "rock" && botChoice === "scissors") ||
    (playerChoice === "paper" && botChoice === "rock") ||
    (playerChoice === "scissors" && botChoice === "paper")
  ) {
    result = `✅ You win! ${playerChoice} beats ${botChoice}.`;
    playerScore++;
  } else {
    result = `❌ You lose! ${botChoice} beats ${playerChoice}.`;
    botScore++;
  }

  resultEl.textContent = result;
  scoreEl.textContent = `Your Score: ${playerScore} | Bot Score: ${botScore}`;
}

/* === FEEDBACK FORM === */
document.getElementById("feedback-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("✅ Thank you for your feedback!");
  e.target.reset();
});
