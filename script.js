// ================= CONTACT FORM =================
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Remove any existing success message
    const oldMsg = document.querySelector('.form-success');
    if (oldMsg) oldMsg.remove();

    // Create a new success message
    const msg = document.createElement('p');
    msg.textContent = "✅ Thanks for reaching out! I’ll get back to you soon.";
    msg.className = "form-success";
    msg.style.color = "#00ff88";
    msg.style.marginTop = "1rem";
    msg.style.fontWeight = "bold";

    form.appendChild(msg);
    form.reset();

    // Fade out after 5 seconds
    setTimeout(() => {
      msg.style.transition = "opacity 1s";
      msg.style.opacity = 0;
      setTimeout(() => msg.remove(), 1000);
    }, 5000);
  });
}

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ================= GSAP ANIMATIONS =================
gsap.registerPlugin(ScrollTrigger);

// Hero entrance
gsap.from('.hero-content', {
  duration: 1.5,
  y: -50,
  opacity: 0,
  ease: 'power2.out'
});

// Section animations with staggered children
gsap.utils.toArray('section').forEach(section => {
  gsap.from(section.querySelectorAll('h2, h3, p, img, .project-card, .skill-box, .timeline-item'), {
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out'
  });
});

// Neon glow effect for hero name
gsap.to('.hero-content h1', {
  textShadow: "0 0 10px #ffd700, 0 0 20px #ffea00, 0 0 40px #fff200",
  repeat: -1,
  yoyo: true,
  duration: 1.5,
  ease: "power1.inOut"
});

// ================= DRAGGABLE LOGO =================
if (typeof Draggable !== 'undefined') {
  Draggable.create('.logo', {
    type: 'x,y',
    edgeResistance: 0.65,
    bounds: 'body',
    inertia: true,
    onRelease: function () {
      gsap.to(this.target, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      });
    }
  });
}

// ================= PROJECT CARD HOVER =================
gsap.utils.toArray('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, { scale: 1.05, boxShadow: "0 0 25px #ffd700", duration: 0.3 });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { scale: 1, boxShadow: "0 0 10px #ffd700", duration: 0.3 });
  });
});
