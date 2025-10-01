/* ===================== TYPING EFFECT ===================== */
const typingText = document.getElementById("typing-text");
const titles = ["Syed Sameer", "Cybersecurity Engineer", "Web Developer", "Creative Coder"];
let titleIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  const current = titles[titleIndex];
  typingText.textContent = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);
  
  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1500);
  } else if (isDeleting && charIndex < 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    setTimeout(typeEffect, 500);
  } else {
    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }
}

window.addEventListener("DOMContentLoaded", typeEffect);

/* ===================== ROCK-PAPER-SCISSORS GAME ===================== */
function playRPS(userChoice){
  const choices = ["rock","paper","scissors"];
  const botChoice = choices[Math.floor(Math.random()*3)];
  const result = document.getElementById("rps-result");
  
  if(userChoice === botChoice){
    result.textContent = `🤝 Draw! Both chose ${userChoice}.`;
  } else if(
    (userChoice==="rock" && botChoice==="scissors") ||
    (userChoice==="paper" && botChoice==="rock") ||
    (userChoice==="scissors" && botChoice==="paper")
  ){
    result.textContent = `🎉 You win! ${userChoice} beats ${botChoice}.`;
  } else {
    result.textContent = `💀 You lose! ${botChoice} beats ${userChoice}.`;
  }
}

/* ===================== CONTACT FORM ===================== */
const form = document.getElementById("contact-form");
if(form){
  form.addEventListener("submit", e=>{
    e.preventDefault();
    alert("✅ Message sent successfully!");
    form.reset();
  });
}
