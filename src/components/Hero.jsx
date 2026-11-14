import Keyboard from "./Keyboard.jsx";
import LocalTime from "./LocalTime.jsx";
import { profile } from "../data.js";

export default function Hero({ darkMode, onToggleTheme }) {
  const handleLampClick = () => {
    onToggleTheme();
  };

  return (
    <section id="top" className="hero">
      <button
        className={`hanging-lamp${darkMode ? " is-lit" : ""}`}
        type="button"
        onClick={handleLampClick}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        title={darkMode ? "Turn the lamp off" : "Turn the lamp on"}
      >
        <span className="lamp-cord" aria-hidden="true" />
        <span className="lamp-canopy" aria-hidden="true" />
        <span className="lamp-fitting" aria-hidden="true" />
        <span className="lamp-bulb" aria-hidden="true">
          <span className="lamp-filament" />
        </span>
      </button>
      <div className="hero-word-wrap" aria-hidden="true">
        <div className="hero-word">
          <span>Meidina</span>
          <span>Revi</span>
        </div>
      </div>
      <div className="hero-glow" aria-hidden="true" />
      <div className="kb-floor" aria-hidden="true" />
      <Keyboard />
      <div className="h-title">
        <div className="h-line">
          <span className="typing-line typing-first">SEO Content Writer</span>
        </div>
        <div className="h-line">
          <span className="typing-line typing-second">
            Web &amp; Mobile Developer
            <span className="caret" aria-hidden="true" />
          </span>
        </div>
        <div className="h-sub">
          Based in {profile.location.split(",")[0]}, Yogyakarta &mdash; Crafting
          Words &amp; Code
        </div>
        <LocalTime />
      </div>
      <div className="h-hint">
        Scroll to explore{" "}
        <span className="arrow" aria-hidden="true">
          &#8595;
        </span>
      </div>
      <div className="kb-hint" data-text="Press a key — it scrolls the page">
        Press a key &mdash; it scrolls the page
      </div>
    </section>
  );
}
