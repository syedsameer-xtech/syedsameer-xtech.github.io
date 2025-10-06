/* === STARFIELD BACKGROUND === */
const canvas = document.getElementById("star-bg");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i=0;i<150;i++){
  stars.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:Math.random()*1.5, d:Math.random()*0.5});
}

function drawStars(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="white";
  stars.forEach(star=>{
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI*2);
    ctx.fill();
  });
  moveStars();
  requestAnimationFrame(drawStars);
}

function moveStars(){
  stars.forEach(star=>{
    star.y += star.d;
    if(star.y>canvas.height){ star.y=0; star.x=Math.random()*canvas.width; }
  });
}
drawStars();
window.addEventListener("resize",()=>{
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
});

/* === MOTIVATIONAL QUOTES === */
const quotes = [
  "Nothing kills you faster than your own mind. Don't stress over things out of control.",
  "Having someone you can call crying, and end the call laughing is a true blessing!",
  'Your "normal" day is someone\'s dream, so be thankful every day.',
  "What you see daily shapes you. Your feed trains your brain each day.",
  "You'll be alone in the most difficult times of your life. These times make you wise, mature, and fearless.",
  "When you have a heart of gold and pure intentions, you don't lose anyone- they lose you.",
  "It's on you. To get you. Where you want to be.",
  "One day, you'll realize that your dream died because you chose comfort over effort. Don't let that regret haunt you forever."
];

const quoteEl=document.getElementById("quote-text");
function showRandomQuote(){
  const randomQuote = quotes[Math.floor(Math.random()*quotes.length)];
  quoteEl.style.opacity=0;
  setTimeout(()=>{quoteEl.textContent=`"${randomQuote}"`; quoteEl.style.opacity=1;},400);
}
setInterval(showRandomQuote,7000);
showRandomQuote();

/* === ROCK PAPER SCISSORS GAME === */
let playerScore=0, botScore=0;
function playRPS(playerChoice){
  const choices=["rock","paper","scissors"];
  const botChoice=choices[Math.floor(Math.random()*3)];
  const resultEl=document.getElementById("rps-result");
  const scoreEl=document.getElementById("rps-score");
  let result="";
  if(playerChoice===botChoice) result="🤝 It's a tie!";
  else if(
    (playerChoice==="rock" && botChoice==="scissors")||
    (playerChoice==="paper" && botChoice==="rock")||
    (playerChoice==="scissors" && botChoice==="paper")
  ){ result=`✅ You win! ${playerChoice} beats ${botChoice}.`; playerScore++; }
  else { result=`❌ You lose! ${botChoice} beats ${playerChoice}.`; botScore++; }
  resultEl.textContent=result;
  scoreEl.textContent=`Your Score: ${playerScore} | Bot Score: ${botScore}`;
}

/* === FEEDBACK FORM === */
document.getElementById("feedback-form").addEventListener("submit",(e)=>{
  e.preventDefault();
  alert("✅ Thank you for your feedback!");
  e.target.reset();
});
