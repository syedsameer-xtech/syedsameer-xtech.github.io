// Typing effect
const typing = document.querySelector('.typing');
const phrases = ['Web Developer', 'Cybersecurity Engineer', 'Creative Coder'];
let i = 0, j = 0, current = '', isDeleting = false;

function type() {
  if (isDeleting) {
    current = phrases[i].substring(0, j--);
  } else {
    current = phrases[i].substring(0, j++);
  }
  typing.textContent = current;
  if (!isDeleting && j === phrases[i].length) {
    isDeleting = true;
    setTimeout(type, 1000);
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % phrases.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, 100);
  }
}
type();

// Scroll to top
document.getElementById('scrollTop').onclick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// GSAP entrance animations
gsap.from('.hero', { duration: 1.5, y: -50, opacity: 0, ease: 'power2.out' });
gsap.from('nav ul li', {
  duration: 1,
  y: -20,
  opacity: 0,
  stagger: 0.2,
  ease: 'power2.out'
});
gsap.utils.toArray('section').forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    duration: 1,
    y: 30,
    opacity: 0,
    ease: 'power2.out'
  });
});

// Draggable logo
Draggable.create('.logo', {
  type: 'x,y',
  edgeResistance: 0.65,
  bounds: 'body',
  inertia: true
});

// Rock Paper Scissors Game
let wins = 0;
let losses = 0;
let draws = 0;
let rounds = 0;

function play(userChoice) {
  const choices = ['rock', 'paper', 'scissors'];
  const aiChoice = choices[Math.floor(Math.random() * 3)];
  let result = '';

  if (userChoice === aiChoice) {
    result = 'Draw!';
    draws++;
  } else if (
    (userChoice === 'rock' && aiChoice === 'scissors') ||
    (userChoice === 'paper' && aiChoice === 'rock') ||
    (userChoice === 'scissors' && aiChoice === 'paper')
  ) {
    result = 'You Win!';
    wins++;
    showWinPop();
  } else {
    result = 'You Lose!';
    losses++;
  }

  rounds++;
  document.getElementById('game-result').textContent = `You chose ${userChoice}. AI chose ${aiChoice}. ${result}`;
  updateScoreboard();
}

function updateScoreboard() {
  document.getElementById('scoreboard').innerHTML = `
    <p>Rounds Played: ${rounds}</p>
    <p>Wins: ${wins}</p>
    <p>Losses: ${losses}</p>
    <p>Draws: ${draws}</p>
  `;
}

function showWinPop() {
  gsap.fromTo("#win-pop-left", { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 });
  gsap.fromTo("#win-pop-right", { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 });
  setTimeout(() => {
    gsap.to("#win-pop-left", { opacity: 0 });
    gsap.to("#win-pop-right", { opacity: 0 });
  }, 1000);
}

// Contact & Feedback Form Alerts
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  alert('Message sent successfully!');
});

document.getElementById('feedback-form').addEventListener('submit', e => {
  e.preventDefault();
  alert('Thanks for your feedback!');
});
