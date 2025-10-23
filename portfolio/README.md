# My React Portfolio

A personal portfolio built with **React**, featuring interactive cards, click spark effects, and animated text. This project showcases modern front-end techniques including **GSAP animations**, **particle effects**, and responsive design.

---

## Live Demo

[View Live Portfolio](https://yourusername.github.io/portfolio/)

---

## Features

- **MagicBento Cards**  
  Interactive cards with:
  - Particles
  - Tilt and magnetism
  - Glow and border effects
  - Click ripple effects
  - Spotlight following mouse cursor

- **ClickSpark Effect**  
  Creates spark animations on user clicks with customizable:
  - Spark color
  - Size
  - Radius
  - Duration
  - Count

- **SplitText Animation**  
  Text animations with GSAP:
  - Split by characters, words, or lines
  - Scroll-triggered animations
  - Staggered entrance effects
  - Fully customizable duration, delay, easing

- Fully responsive across devices
- Customizable colors, texts, and effects
- Easy to extend with new components

---

## Project Structure

portfolio/
│
├─ public/
│ └─ index.html # Main HTML file
│
├─ src/
│ ├─ components/
│ │ ├─ MagicBento.jsx # Interactive cards component
│ │ ├─ ClickSpark.jsx # Click sparkle wrapper
│ │ └─ SplitText.jsx # Text animation component
│ │
│ ├─ assets/
│ │ └─ images/
│ │ └─ logo.png # Your logo
│ │
│ ├─ styles/
│ │ ├─ MagicBento.css
│ │ ├─ ClickSpark.css
│ │ ├─ SplitText.css
│ │ └─ global.css
│ │
│ ├─ App.jsx # Main React app
│ └─ index.jsx # Entry point
│
├─ .gitignore
├─ package.json
└─ README.md


---

## Installation

1. **Clone the repository**

##bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio

##Install dependencies

npm install

Run the development server

npm start

Visit http://localhost:3000 to see the app.
