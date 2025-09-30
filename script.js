/* ================= TYPING ANIMATION ================= */
const typingText = document.getElementById("typing-text");
const texts = ["Syed Sameer", "Cybersecurity Engineer", "Web Developer", "Creative Coder"];
let textIndex = 0, charIndex = 0, isDeleting = false;

(function type() {
  const current = texts[textIndex];
  typingText.textContent = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  let delay = isDeleting ? 60 : 120;
  if (!isDeleting && charIndex === current.length) delay = 1200, isDeleting = true;
  else if (isDeleting && charIndex === 0) delay = 400, isDeleting = false, textIndex = (textIndex + 1) % texts.length;

  setTimeout(type, delay);
})();

/* ================= STARFIELD BACKGROUND ================= */
const canvas = document.getElementById("star-bg");
const ctx = canvas.getContext("2d");
let stars = [];

function initStars() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.5,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    twinkle: Math.random() * Math.PI * 2
  }));
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.twinkle += 0.05;
    const alpha = 0.5 + Math.sin(star.twinkle) * 0.5;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
    ctx.fill();

    star.x += star.dx;
    star.y += star.dy;
    if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
    if (star.y < 0 || star.y > canvas.height) star.dy *= -1;
  });
  requestAnimationFrame(animateStars);
}

window.addEventListener("resize", () => {
  clearTimeout(window._resizeTimer);
  window._resizeTimer = setTimeout(initStars, 200);
});
initStars();
animateStars();

/* ================= CUSTOM CURSOR ================= */
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
});
document.querySelectorAll("a, button, input, textarea").forEach(el => {
  el.addEventListener("mouseenter", () => cursor.style.transform += " scale(1.5)");
  el.addEventListener("mouseleave", () => cursor.style.transform = cursor.style.transform.replace(" scale(1.5)", ""));
});

/* ================= SCROLL TO TOP BUTTON ================= */
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  const visible = window.scrollY > 200;
  gsap.to(scrollTopBtn, { scale: visible ? 1 : 0, opacity: visible ? 1 : 0, duration: 0.3, display: visible ? "block" : "none" });
});
scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ================= GSAP ANIMATIONS ================= */
gsap.registerPlugin(ScrollTrigger);

// Hero
gsap.from(".hero-content", { y: -50, opacity: 0, scale: 0.95, duration: 1.4, ease: "power2.out" });

// Sections
gsap.utils.toArray("section[data-section]").forEach(section => {
  gsap.from(section.children, {
    scrollTrigger: { trigger: section, start: "top 80%", once: true },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
  });
});

/* ================= CONTACT FORM ================= */
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const oldMsg = form.querySelector(".form-success");
    if (oldMsg) oldMsg.remove();

    const msg = document.createElement("p");
    msg.textContent = "✅ Thanks for reaching out! I’ll get back to you soon.";
    msg.className = "form-success";
    msg.style.color = "#00ff88";
    msg.style.marginTop = "1rem";
    msg.style.fontWeight = "bold";
    msg.style.opacity = 0;

    form.appendChild(msg);
    gsap.to(msg, { opacity: 1, duration: 0.6 });

    form.reset();

    setTimeout(() => gsap.to(msg, { opacity: 0, duration: 1, onComplete: () => msg.remove() }), 5000);
  });
}

/* ================= NAV TOGGLE FOR MOBILE ================= */
const navToggle = document.querySelector(".nav-toggle");
const navList = document.getElementById("primary-menu");
navToggle?.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  navList.classList.toggle("active");
});
