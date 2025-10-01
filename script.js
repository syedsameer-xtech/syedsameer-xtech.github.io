// TYPING EFFECT
const typingText = document.getElementById("typing-text");
const titles = ["Syed Sameer"];
let charIndex = 0;
function typeEffect() {
  typingText.textContent = titles[0].substring(0, charIndex++);
  if(charIndex>titles[0].length){ charIndex=0; }
  setTimeout(typeEffect,150);
}
window.addEventListener("DOMContentLoaded", typeEffect);

// QUOTES ROTATOR
const quotes = [
  "Nothing kills you faster than your own mind. Don't stress over things out of your control.",
  "Having someone you can call crying, and end the call laughing is a true blessing!",
  "Your normal day is someone's dream, be thankful everyday.",
  "What you see daily shapes you. Fill your feed with useful content.",
  "You'll be alone in the most difficult times. These times make you wise and fearless."
];
let quoteIndex=0;
const quoteText = document.getElementById("quote-text");
function showQuote(){
  quoteText.textContent=quotes[quoteIndex];
  quoteIndex=(quoteIndex+1)%quotes.length;
}
setInterval(showQuote,5000);
showQuote();

// DOT MOVING BACKGROUND
const canvas = document.getElementById("dot-bg");
const ctx = canvas.getContext("2d");
let dots=[];
const DOT_COUNT=120;

function initDots(){
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  dots=Array.from({length:DOT_COUNT},()=>({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    vx:(Math.random()-0.5)*0.5,
    vy:(Math.random()-0.5)*0.5
  }));
}

function animateDots(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  dots.forEach(d=>{
    d.x+=d.vx; d.y+=d.vy;
    if(d.x<0||d.x>canvas.width)d.vx*=-1;
    if(d.y<0||d.y>canvas.height)d.vy*=-1;
    ctx.beginPath();
    ctx.arc(d.x,d.y,2,0,Math.PI*2);
    ctx.fillStyle="#aaa";
    ctx.fill();
  });
  requestAnimationFrame(animateDots);
}
window.addEventListener("resize",initDots);
initDots();
animateDots();

// ROCK-PAPER-SCISSORS
function playRPS(userChoice){
  const choices=["rock","paper","scissors"];
  const botChoice=choices[Math.floor(Math.random()*3)];
  const resultText=document.getElementById("rps-result");
  let result;
  if(userChoice===botChoice) result=`🤝 Draw! Both chose ${userChoice}.`;
  else if(
    (userChoice==="rock"&&botChoice==="scissors")||
    (userChoice==="paper"&&botChoice==="rock")||
    (userChoice==="scissors"&&botChoice==="paper")
  ) result=`🎉 You win! ${userChoice} beats ${botChoice}.`;
  else result=`💀 You lose! ${botChoice} beats ${userChoice}.`;
  resultText.textContent=result;
}

// CONTACT FORM (basic)
const form=document.getElementById("contact-form");
if(form){
  form.addEventListener("submit",e=>{
    e.preventDefault();
    alert("✅ Message sent successfully!");
    form.reset();
  });
}
