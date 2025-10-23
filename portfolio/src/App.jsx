import React from "react";
import MagicBento from "./components/MagicBento";
import ClickSpark from "./components/ClickSpark";
import SplitText from "./components/SplitText";
import "./styles/global.css";
import "./styles/MagicBento.css";
import "./styles/ClickSpark.css";
import "./styles/SplitText.css";

const App = () => {
  const handleTextAnimationComplete = () => {
    console.log("Text animation completed!");
  };

  return (
    <div className="App">
      {/* Hero Section */}
      <section className="section hero-section flex-center" style={{ flexDirection: "column", gap: "2rem" }}>
        <SplitText
          text="Welcome to My Portfolio"
          className="text-4xl font-bold text-center"
          delay={100}
          duration={0.8}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleTextAnimationComplete}
        />

        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <button
            style={{
              padding: "1rem 2rem",
              fontSize: "1.2rem",
              borderRadius: "8px",
              backgroundColor: "#8400ff",
              color: "#fff",
              border: "none",
              cursor: "pointer"
            }}
          >
            Explore
          </button>
        </ClickSpark>
      </section>

      {/* MagicBento Cards Section */}
      <section className="section cards-section">
        <h2 className="text-3xl font-semibold text-center mb-8">My Skills & Projects</h2>
        <MagicBento
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="132, 0, 255"
        />
      </section>

      {/* Footer */}
      <footer className="section flex-center" style={{ flexDirection: "column", gap: "1rem" }}>
        <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
        <p>Made with ❤️ using React & GSAP</p>
      </footer>
    </div>
  );
};

export default App;
