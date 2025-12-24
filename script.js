/* === STARFIELD + QUOTES + RPS (improved, with robust RPS event delegation) ===
   Changes from previous version:
   - Event delegation for RPS (handles dynamic buttons/timing)
   - Extra console logs for debugging
   - Defensive checks
   - Everything else unchanged (canvas scaling, quotes, persistence)
*/

(function () {
  /* ---------- Helpers ---------- */
  const el = (selector, ctx = document) => ctx.querySelector(selector);
  const els = (selector, ctx = document) => Array.from(ctx.querySelectorAll(selector));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const shuffleArray = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  /* ---------- Canvas / Starfield ---------- */
  const canvas = el('#star-bg');
  let ctx = null;
  let dpr = Math.max(1, window.devicePixelRatio || 1);
  let stars = [];
  let animationId = null;
  let pausedAnimation = false;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resizeCanvas() {
    if (!canvas) return;
    dpr = Math.max(1, window.devicePixelRatio || 1);
    const cssWidth = window.innerWidth;
    const cssHeight = window.innerHeight;
    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = `${cssHeight}px`;
    canvas.width = Math.floor(cssWidth * dpr);
    canvas.height = Math.floor(cssHeight * dpr);

    // Make drawing use CSS pixels by scaling context
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initStars();
  }

  function initStars(count = 150) {
    if (!canvas) return;
    const effectiveCount = prefersReducedMotion ? Math.min(40, count) : count;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    stars = Array.from({ length: effectiveCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.2,
      d: Math.random() * 1.5 + 0.2, // speed
    }));
  }

  function animateStars() {
    if (!ctx || !canvas) return;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "white";

    if (!pausedAnimation) {
      for (let s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        s.y += s.d;
        if (s.y > h) s.y = 0;
      }
    } else {
      for (let s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    animationId = requestAnimationFrame(animateStars);
  }

  if (canvas) {
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animateStars();
  }

  /* ---------- Quotes ---------- */
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

  const quoteEl = el('#quote-text');
  const quotesBox = el('#quotes-box');

  const FADE_DURATION = 600; // ms
  if (quoteEl) {
    quoteEl.style.transition = `opacity ${FADE_DURATION}ms ease-in-out`;
    quoteEl.style.opacity = 1;
  }

  let quoteQueue = [];
  function refillQuoteQueue() {
    quoteQueue = shuffleArray(quotes.map((_, i) => i));
  }
  refillQuoteQueue();

  const QUOTE_BASE = 8000; // base ms
  const PER_CHAR = 65; // ms per char
  const QUOTE_MIN = 5000;
  const QUOTE_MAX = 20000;

  let quoteTimeoutId = null;
  let pausedQuotes = false;

  function computeIntervalFor(text) {
    const t = QUOTE_BASE + (text.length * PER_CHAR);
    return clamp(t, QUOTE_MIN, QUOTE_MAX);
  }

  function getNextQuoteText() {
    if (!quoteQueue.length) refillQuoteQueue();
    const idx = quoteQueue.pop();
    return quotes[idx];
  }

  function showQuote(text) {
    if (!quoteEl) return;
    quoteEl.style.opacity = 0;
    setTimeout(() => {
      quoteEl.textContent = text;
      quoteEl.style.opacity = 1;
    }, FADE_DURATION);
  }

  function scheduleNextQuote() {
    if (!quoteEl || pausedQuotes) return;
    if (quoteTimeoutId) {
      clearTimeout(quoteTimeoutId);
      quoteTimeoutId = null;
    }
    const text = getNextQuoteText();
    showQuote(text);
    const interval = computeIntervalFor(text);
    quoteTimeoutId = setTimeout(() => {
      scheduleNextQuote();
    }, interval);
  }

  function pauseEverything() {
    pausedQuotes = true;
    pausedAnimation = true;
    if (quoteTimeoutId) {
      clearTimeout(quoteTimeoutId);
      quoteTimeoutId = null;
    }
  }
  function resumeEverything() {
    if (!pausedQuotes && !pausedAnimation) return;
    pausedQuotes = false;
    pausedAnimation = false;
    scheduleNextQuote();
  }

  if (quotesBox) {
    quotesBox.addEventListener('mouseenter', pauseEverything);
    quotesBox.addEventListener('mouseleave', resumeEverything);
    quotesBox.addEventListener('focusin', pauseEverything);
    quotesBox.addEventListener('focusout', resumeEverything);
  }

  if (!prefersReducedMotion) {
    scheduleNextQuote();
  } else {
    if (quoteEl) showQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }

  /* ---------- Rock-Paper-Scissors (RPS) with delegation ---------- */
  const rpsContainer = el('#rps-game');
  const rpsResultEl = el('#rps-result');
  const rpsScoreEl = el('#rps-score');
  const rpsReset = el('#rps-reset');
  const STORAGE_KEY = 'rpsScores_v1';

  let playerScore = 0;
  let botScore = 0;

  function loadScores() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        playerScore = parsed.player || 0;
        botScore = parsed.bot || 0;
      }
    } catch (e) {
      playerScore = 0;
      botScore = 0;
      console.warn('Failed to load RPS scores from localStorage:', e);
    }
    updateScoreUI();
  }
  function saveScores() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ player: playerScore, bot: botScore }));
    } catch (e) {
      console.warn('Failed to save RPS scores to localStorage:', e);
    }
  }
  function updateScoreUI() {
    if (rpsScoreEl) rpsScoreEl.textContent = `Your Score: ${playerScore} | Bot Score: ${botScore}`;
  }

  function playRPSChoice(playerChoice) {
    const choices = ["rock", "paper", "scissors"];
    const botChoice = choices[Math.floor(Math.random() * choices.length)];
    if (!rpsResultEl || !rpsScoreEl) return;

    if (playerChoice === botChoice) {
      rpsResultEl.textContent = "🤝 It's a tie!";
    } else if (
      (playerChoice === "rock" && botChoice === "scissors") ||
      (playerChoice === "paper" && botChoice === "rock") ||
      (playerChoice === "scissors" && botChoice === "paper")
    ) {
      rpsResultEl.textContent = `✅ You win! ${playerChoice} beats ${botChoice}.`;
      playerScore++;
    } else {
      rpsResultEl.textContent = `❌ You lose! ${botChoice} beats ${playerChoice}.`;
      botScore++;
    }
    updateScoreUI();
    saveScores();
    console.debug('RPS played:', { playerChoice, botChoice, playerScore, botScore });
  }

  // Delegated click handler — works even if buttons are added later
  if (rpsContainer) {
    rpsContainer.addEventListener('click', (ev) => {
      const btn = ev.target.closest && ev.target.closest('.rps-btn');
      if (!btn) return;
      const choice = btn.getAttribute('data-choice');
      if (!choice) return;
      playRPSChoice(choice);
    });
    console.debug('RPS delegation attached to #rps-game');
  } else {
    // fallback: attach to document to capture clicks anywhere (narrower than nothing)
    document.addEventListener('click', (ev) => {
      const btn = ev.target.closest && ev.target.closest('.rps-btn');
      if (!btn) return;
      const choice = btn.getAttribute('data-choice');
      if (!choice) return;
      playRPSChoice(choice);
    });
    console.debug('RPS fallback delegation attached to document');
  }

  if (rpsReset) {
    rpsReset.addEventListener('click', () => {
      playerScore = 0;
      botScore = 0;
      saveScores();
      updateScoreUI();
      if (rpsResultEl) rpsResultEl.textContent = "Scores reset.";
    });
  }

  loadScores();

  // Keep global for compatibility with inline calls (if any)
  window.playRPS = playRPSChoice;

  /* ---------- Logo button click (no inline onclick) ---------- */
  const logoBtn = el('#logo-btn');
  if (logoBtn) {
    logoBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  /* ---------- Clean up on unload ---------- */
  window.addEventListener('pagehide', () => {
    if (animationId) cancelAnimationFrame(animationId);
    if (quoteTimeoutId) clearTimeout(quoteTimeoutId);
  });

  // Debug summary
  console.debug('script.js initialized', {
    hasCanvas: !!canvas,
    hasQuotesBox: !!quotesBox,
    hasRpsContainer: !!rpsContainer
  });

})();
