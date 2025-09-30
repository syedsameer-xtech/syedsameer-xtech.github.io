// Typing effect
const typing = document.querySelector('.typing');
const phrases = ['Cybersecurity Engineer', 'Web Developer', 'Creative Coder'];
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
const scrollTopBtn = document.getElementById('scrollTop');
scrollTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
