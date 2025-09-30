/* ===================== TYPING EFFECT ===================== */
const typingText = document.getElementById("typing-text");
const titles = ["Syed Sameer", "Cybersecurity Engineer", "Web Developer", "Creative Coder"];
let titleIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  const current = titles[titleIndex];
  typingText.textContent = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  let delay = isDeleting ? 50 : 120;

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    delay = 1500; // pause before deleting
  } else if (isDeleting && charIndex < 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    delay = 500; // pause before typing next
  }

  setTimeout(typeEffect, delay);
}

window.addEventListener("DOMContentLoaded", typeEffect);

/* ===================== CUSTOM CURSOR ===================== */
const cursor = document.querySelector(".cursor");
let mouseX = 0, mouseY = 0;

document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.display = "block";
});

document.addEventListener("mouseleave", () => cursor.style.display = "none");

document.querySelectorAll("a, button, input, textarea").forEach(el => {
  el.addEventListener("mouseenter", () => cursor.classList.add("active"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
});

function updateCursor() {
  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  requestAnimationFrame(updateCursor);
}
updateCursor();

/* ===================== NAVBAR SCROLL EFFECT ===================== */
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

/* ===================== MOBILE MENU TOGGLE ===================== */
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
    navList.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  navList.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navList.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

/* ===================== GSAP SCROLL ANIMATIONS ===================== */
gsap.registerPlugin(ScrollTrigger, Draggable);

// Fade-in sections
gsap.utils.toArray(".fade-section").forEach(section => {
  gsap.fromTo(section,
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0, duration: 1, ease: "power2.out",
      scrollTrigger: { trigger: section, start: "top 80%", once: true }
    }
  );
});

// Draggable project cards
Draggable.create(".draggable", {
  type: "x,y",
  edgeResistance: 0.65,
  bounds: ".projects-grid",
  inertia: true
});

/* ===================== STARFIELD BACKGROUND ===================== */
const canvas = document.getElementById("star-bg");
const ctx = canvas.getContext("2d");
let stars = [];
const STAR_COUNT = 180;

function initStars() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * canvas.width,
    o: Math.random()
  }));
}

function animateStars() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    star.z -= 2;
    if (star.z <= 0) {
      star.x = Math.random() * canvas.width;
      star.y = Math.random() * canvas.height;
      star.z = canvas.width;
      star.o = Math.random();
    }

    const sx = (star.x - canvas.width / 2) * (canvas.width / star.z) + canvas.width / 2;
    const sy = (star.y - canvas.height / 2) * (canvas.width / star.z) + canvas.height / 2;
    const radius = (1 - star.z / canvas.width) * 2;

    ctx.beginPath();
    ctx.arc(sx, sy, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,255,204,${star.o})`;
    ctx.fill();
  });

  requestAnimationFrame(animateStars);
}

window.addEventListener("resize", initStars);
initStars();
animateStars();

/* ===================== CONTACT FORM ===================== */
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();

    form.querySelectorAll(".success-msg").forEach(el => el.remove());

    const successMsg = document.createElement("p");
    successMsg.textContent = "✅ Message sent successfully!";
    successMsg.className = "success-msg";
    successMsg.style.color = "#00ff88";
    successMsg.style.marginTop = "1rem";
    successMsg.style.fontWeight = "bold";
    form.appendChild(successMsg);

    form.reset();
    setTimeout(() => successMsg.remove(), 4000);
  });
}

/* ===================== ROCK-PAPER-SCISSORS GAME ===================== */
function playRPS(userChoice) {
  const choices = ["rock", "paper", "scissors"];
  const botChoice = choices[Math.floor(Math.random() * choices.length)];
  const resultText = document.getElementById("rps-result");

  let result;
  if (userChoice === botChoice) {
    result = `🤝 It's a draw! You both chose ${userChoice}.`;
  } else if (
    (userChoice === "rock" && botChoice === "scissors") ||
    (userChoice === "paper" && botChoice === "rock") ||
    (userChoice === "scissors" && botChoice === "paper")
  ) {
    result = `🎉 You win! ${userChoice} beats ${botChoice}.`;
  } else {
    result = `💀 You lose! ${botChoice} beats ${userChoice}.`;
  }

  resultText.textContent = result;
  resultText.style.opacity = 0;
  gsap.to(resultText, { opacity: 1, y: -5, duration: 0.6, ease: "power2.out" });
}
