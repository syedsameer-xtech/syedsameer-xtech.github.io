// Typing Animation
const typingText = document.getElementById("typing-text");
const texts = ["Syed Sameer", "Cybersecurity Engineer", "Web Developer", "Creative Coder"];
let index = 0, charIndex = 0, isDeleting = false;

function type() {
  const current = texts[index];
  typingText.textContent = isDeleting
    ? current.substring(0, --charIndex)
    : current.substring(0, ++charIndex);

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(type, 1000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index = (index + 1) % texts.length;
    setTimeout(type, 300);
  } else {
    setTimeout(type, isDeleting ? 60 : 120);
  }
}
type();

// Scroll-to-Top Button
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 150) {
    gsap.to(scrollTopBtn, { scale: 1, opacity: 1, duration: 0.3 });
    scrollTopBtn.style.display = "block";
  } else {
    gsap.to(scrollTopBtn, { scale: 0, opacity: 0, duration: 0.3 });
    setTimeout(() => scrollTopBtn.style.display = "none", 300);
  }
});
scrollTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

// Starfield Canvas
const canvas = document.getElementById("star-bg");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.5,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3
  }));
}
function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    star.x += star.dx;
    star.y += star.dy;
    if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
    if (star.y < 0 || star.y > canvas.height) star.dy *= -1;
  });
  requestAnimationFrame(animateStars);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
animateStars();

// Rock Paper Scissors Game
const rpsButtons = document.querySelectorAll(".rps-btn");
const rpsResult = document.getElementById("rps-result");
const rpsScore = document.getElementById("rps-score");
let wins = 0, losses = 0, draws = 0;

rpsButtons.forEach(button => {
  button.addEventListener("click", () => {
    const user = button.dataset.choice;
    const choices = ["rock", "paper", "scissors"];
    const comp = choices[Math.floor(Math.random() * choices.length)];
    let result = "";

    if (user === comp) {
      result = `🤝 It's a draw! Both chose ${user}.`;
      draws++;
    } else if (
      (user === "rock" && comp === "scissors") ||
      (user === "paper" && comp === "rock") ||
      (user === "scissors" && comp === "paper")
    ) {
      result = `✅ You win! ${user} beats ${comp}.`;
      wins++;
    } else {
      result = `❌ You lose! ${comp} beats ${user}.`;
      losses++;
    }

    rpsResult.textContent = result;
    rpsScore.textContent = `Wins: ${wins} | Losses: ${losses} | Draws: ${draws}`;
  });
});

// Custom Cursor
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});
document.querySelectorAll("a, button, .rps-btn").forEach(el => {
  el.addEventListener("mouseenter", () => cursor.style.transform = "scale(1.5)");
  el.addEventListener("mouseleave", () => cursor.style.transform = "scale(1)");
});

// GSAP Entrance Animations
window.addEventListener("load", () => {
  gsap.from(".logo", { y: -80, opacity: 0, duration: 1 });
  gsap.from(".hero h1", { x: -150, opacity: 0, delay: 0.4, duration: 1 });
  gsap.from(".subheading", { x: 150, opacity: 0, delay: 0.6, duration: 1 });
  gsap.from(".btn", { scale: 0, opacity: 0, delay: 0.9, duration: 0.6 });
});

// GSAP Scroll Reveal
gsap.utils.toArray("section").forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 50,
    duration: 1
  });
});