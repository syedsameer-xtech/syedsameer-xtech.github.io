/* ===== LOGO BUTTON ===== */
.logo-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 110px;
  height: 110px;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 15px;
  z-index: 1000;
  transition: transform 0.3s, box-shadow 0.3s;
}
.logo-btn img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
}
.logo-btn:hover {
  transform: scale(1.1);
}
.logo-btn:hover img {
  transform: scale(1.1);
  box-shadow: 0 0 35px rgba(255, 255, 255, 0.4);
}

/* GENERAL */
body {
  font-family: 'Poppins', sans-serif;
  background: #000;
  color: #fff;
  padding-top: 150px;
  overflow-x: hidden;
}

/* STARFIELD */
canvas#star-bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; }

/* HERO */
.hero { display:flex; flex-direction:column; align-items:center; justify-content:center; height:40vh; gap:15px; }
.hero-box { text-align:center; background:#222; padding:30px 50px; border-radius:15px; box-shadow:0 0 25px #555; }
.hero-box h1 { font-size:3rem; color:#fff; }
.tagline { font-size:1.3rem; color:#ccc; }

/* QUOTES */
.quotes-section { display:flex; justify-content:center; margin:50px 0; }
.quotes-box { background:#333; padding:25px; border-radius:15px; max-width:800px; box-shadow:0 0 25px #555; font-size:1.2rem; text-align:center; color:#eee; }

/* SKILLS */
.skills-section { text-align:center; padding:50px 20px; }
.skills-list { display:flex; flex-wrap:wrap; justify-content:center; gap:12px; list-style:none; }
.skills-list li { background:#444; padding:10px 20px; border-radius:10px; transition:0.3s; }
.skills-list li:hover { transform:scale(1.1); box-shadow:0 0 20px #555; }

/* PROJECTS */
.projects-section { text-align:center; padding:50px 20px; }
.projects-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:20px; }
.project-card { background:#222; padding:20px; border-radius:12px; color:#fff; text-decoration:none; transition:0.3s; }
.project-card:hover { transform:scale(1.08); box-shadow:0 0 25px #555; }

/* CERTIFICATES */
.certificates-section { text-align:center; padding:50px 20px; }
.certificates-grid { display:flex; flex-direction:column; align-items:center; gap:15px; margin-bottom:20px; }
.certificate-box { background:#333; padding:15px 20px; border-radius:10px; box-shadow:0 0 15px #555; color:#ccc; transition:0.3s; }
.certificate-box:hover { transform:scale(1.05); box-shadow:0 0 25px #777; }

/* "See More" Button */
.see-more-btn {
  display:inline-block;
  margin-top:15px;
  padding:12px 25px;
  background:#444;
  border-radius:12px;
  color:#fff;
  text-decoration:none;
  font-weight:bold;
  transition:transform 0.3s, box-shadow 0.3s;
}
.see-more-btn:hover {
  transform:scale(1.15);
  box-shadow:0 0 25px #999;
}

/* GAME */
.game-section { text-align:center; padding:50px 20px; }
#rps-game button { margin:5px; padding:10px 20px; border:none; border-radius:10px; background:#444; color:#fff; cursor:pointer; transition:0.3s; }
#rps-game button:hover { transform:scale(1.1); box-shadow:0 0 15px #555; }

/* FEEDBACK */
.feedback-section { text-align:center; padding:50px 20px; }
#feedback-form { display:flex; flex-direction:column; gap:15px; max-width:500px; margin:auto; }
#feedback-form input, #feedback-form textarea { padding:10px; border:none; border-radius:10px; background:#222; color:#fff; }
#feedback-form button { background:#444; border:none; padding:12px; border-radius:10px; color:#fff; transition:0.3s; }
#feedback-form button:hover { transform:scale(1.1); box-shadow:0 0 20px #555; }

/* CONTACT */
.contact-section { text-align:center; padding:50px 20px; display:flex; flex-direction:column; gap:20px; align-items:center; }
.contact-boxes { display:flex; gap:15px; flex-wrap:wrap; justify-content:center; }
.contact-box { background:#333; padding:15px 25px; border-radius:12px; text-decoration:none; color:#fff; transition:0.3s; }
.contact-box:hover { transform:scale(1.15); box-shadow:0 0 25px #aaa; }

.resume-btn { background:#444; padding:15px 30px; border-radius:12px; text-decoration:none; color:#fff; font-weight:bold; transition:0.3s; }
.resume-btn:hover { transform:scale(1.15); box-shadow:0 0 25px #aaa; }
