/* === script.js
   Starfield (moving dots) + Quotes + Rock-Paper-Scissors (RPS)
   - Respects prefers-reduced-motion by default
   - Provides a persisted toggle to force animation on/off
   - Uses devicePixelRatio for crisp rendering
   - Debounced resize; safe localStorage access
   - Exposes playRPS globally so existing inline onclick handlers work
*/

/* ===== STARFIELD ===== */
const canvas = document.getElementById("star-bg");
const ctx = canvas && canvas.getContext ? canvas.getContext("2d") : null;

if (!canvas || !ctx) {
  console.error("starfield: canvas or 2D context not available");
}

let stars = [];
let animId = null;
let animRunning = false;

const osPrefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function readStoredStarPreference() {
  try {
    const v = localStorage.getItem('star-animation'); // 'on' | 'off' | null
    if (v === 'on') return true;
    if (v === 'off') return false;
  } catch (e) {
    // ignore storage errors
  }
  return null;
}
function writeStoredStarPreference(val) {
  try {
    localStorage.setItem('star-animation', val ? 'on' : 'off');
  } catch (e) { /* ignore */ }
}

let userOverride = readStoredStarPreference(); // null = follow system, true/false = override
const shouldAnimateByDefault = (userOverride === null) ? !osPrefersReduced : userOverride;

function computeStarCount(width, height) {
  const area = Math.max(1, width * height);
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
  if (!canvas || !ctx) return;
  const dpr = window.devicePixelRatio || 1;
  const cssW = window.innerWidth;
  const cssH = window.innerHeight;
  canvas.width = Math.floor(cssW * dpr);
  canvas.height = Math.floor(cssH * dpr);
  canvas.style.width = cssW + "px";
  canvas.style.height = cssH + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  createStars(cssW, cssH);
  drawStars();
}

function drawStars() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });
}

function animateStarsLoop() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  const height = window.innerHeight;
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    s.y += s.d;
    if (s.y - s.r > height) {
      s.y = -s.r;
      s.x = Math.random() * window.innerWidth;
    }
  });
  animId = requestAnimationFrame(animateStarsLoop);
}

function startAnimation() {
  if (animRunning || !ctx) return;
  animRunning = true;
  // cancel any stale frame
  if (animId) cancelAnimationFrame(animId);
  animId = requestAnimationFrame(animateStarsLoop);
  updateToggleButtonState(true);
}

function stopAnimation() {
  if (!animRunning) return;
  animRunning = false;
  if (animId) {
    cancelAnimationFrame(animId);
    animId = null;
  }
  drawStars();
  updateToggleButtonState(false);
}

// Initialize canvas and stars
resizeCanvas();
let resizeTimeout = null;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(resizeCanvas, 150);
});

// Start or not depending on preference
if (shouldAnimateByDefault) startAnimation();
else stopAnimation();

/* ===== STAR TOGGLE UI ===== */
function createToggleButton() {
  // if already exists, return it
  const existing = document.getElementById('star-toggle-btn');
  if (existing) return existing;

  const btn = document.createElement('button');
  btn.id = 'star-toggle-btn';
  btn.type = 'button';
  Object.assign(btn.style, {
    position: 'fixed',
    right: '14px',
    bottom: '14px',
    zIndex: 10000,
    background: 'rgba(18,18,18,0.8)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.06)',
    padding: '8px 10px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    backdropFilter: 'blur(4px)'
  });
  btn.title = 'Toggle starfield animation (persists)';

  btn.addEventListener('click', () => {
    const newState = !animRunning;
    if (newState) {
      startAnimation();
      writeStoredStarPreference(true);
    } else {
      stopAnimation();
      writeStoredStarPreference(false);
    }
    btn.setAttribute('aria-pressed', String(animRunning));
    updateToggleButtonText(btn);
  });

  btn.setAttribute('aria-pressed', String(animRunning));
  btn.setAttribute('aria-label', 'Toggle starfield animation');
  document.body.appendChild(btn);
  updateToggleButtonText(btn);
  return btn;
}

function updateToggleButtonText(btn) {
  if (!btn) btn = document.getElementById('star-toggle-btn');
  if (!btn) return;
  btn.textContent = animRunning ? 'Disable Stars' : 'Enable Stars';
}

function updateToggleButtonState(isRunning) {
  const btn = document.getElementById('star-toggle-btn');
  if (!btn) return;
  btn.setAttribute('aria-pressed', String(Boolean(isRunning)));
  updateToggleButtonText(btn);
}

// create the button only if we have a DOM
if (typeof document !== 'undefined') {
  // Defer creation slightly to allow page load to finish
  setTimeout(createToggleButton, 300);
}

/* ===== QUOTES (unchanged content, accessible) ===== */
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
if (quoteEl) quoteEl.setAttribute("aria-live", "polite");

const QUOTE_FADE_MS = 320;
const QUOTE_INTERVAL_MS = (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) ? 15000 : 7000;

function showRandomQuote() {
  if (!quoteEl) return;
  quoteEl.style.opacity = 0;
  setTimeout(() => {
    quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    quoteEl.style.opacity = 1;
  }, QUOTE_FADE_MS);
}
showRandomQuote();
let quoteTimer = setInterval(showRandomQuote, QUOTE_INTERVAL_MS);

/* ===== ROCK-PAPER-SCISSORS (RPS) with persistence ===== */
let playerScore = 0, botScore = 0;
(function loadRpsScores() {
  try {
    const raw = localStorage.getItem('rps-scores');
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (typeof parsed.player === 'number') playerScore = parsed.player;
    if (typeof parsed.bot === 'number') botScore = parsed.bot;
    const scoreEl = document.getElementById("rps-score");
    if (scoreEl) scoreEl.textContent = `Your Score: ${playerScore} | Bot Score: ${botScore}`;
  } catch (e) {
    // ignore
  }
})();

function saveRpsScores() {
  try {
    localStorage.setItem('rps-scores', JSON.stringify({ player: playerScore, bot: botScore }));
  } catch (e) {
    // ignore
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
  saveRpsScores();
}

/* expose playRPS globally to keep inline onclick in HTML working */
window.playRPS = playRPS;

/* ===== OPTIONAL: If user prefers reduced motion and hasn't overridden, ensure toggle UI still present ===== */
(function ensureToggleReflectsPref() {
  // If the system prefers reduced motion and user didn't override, but they still want animation:
  // the toggle lets them opt in.
  const btn = document.getElementById('star-toggle-btn');
  if (!btn) {
    // create button was scheduled earlier; ensure its text matches the running state after a small delay
    setTimeout(() => {
      const maybeBtn = document.getElementById('star-toggle-btn');
      if (maybeBtn) updateToggleButtonText(maybeBtn);
    }, 400);
  } else {
    updateToggleButtonText(btn);
  }
})();
