import { useEffect, useState } from "react";
import Hero from "./components/Hero.jsx";
import Works from "./components/Works.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Contact from "./components/Contact.jsx";
import { Marquee } from "./components/shared.jsx";
import { navItems } from "./data.js";

function Logo() {
  return (
    <a href="#top" className="nav-logo" aria-label="Back to top">
      <svg width="42" height="42" viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M5 24V8h3.2L16 15.5 23.8 8H27v16h-3.5V13.4L16 20.6 8.5 13.4V24H5Z"
          fill="currentColor"
        />
      </svg>
    </a>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("portfolio-theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    localStorage.setItem("portfolio-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(1, y / h) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((n: { id: string; label: string }) => document.getElementById(n.id))
      .filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-42% 0px -52% 0px" },
    );
    sections.forEach((s: Element) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return undefined;

    const cursor = document.querySelector(".custom-cursor");
    if (!cursor) return undefined;
    document.documentElement.dataset.cursor = "custom";

    const onPointerMove = (event: PointerEvent) => {
      cursor.setAttribute(
        "style",
        `--cursor-x: ${event.clientX}px; --cursor-y: ${event.clientY}px;`,
      );
      cursor.classList.add("is-visible");
      const target = event.target instanceof Element ? event.target : null;
      cursor.classList.toggle(
        "is-interactive",
        Boolean(target?.closest("a, button, [data-cursor='interactive']")),
      );
    };
    const onPointerLeave = () => cursor.classList.remove("is-visible");
    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) onPointerLeave();
    };

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerout", onPointerOut);
    return () => {
      document.documentElement.removeAttribute("data-cursor");
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
    };
  }, []);

  return (
    <>
      <div className="progress" style={{ width: `${progress * 100}%` }} />
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <Logo />
        <div className="nav-links">
          {navItems.map((n: { id: string; label: string }) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`nav-link${active === n.id ? " active" : ""}`}
            >
              {n.label}
            </a>
          ))}
          <a
            className="resume-link"
            href="https://drive.google.com/file/d/1WYJnFgNeKgJqf2gzNYcXAkYQ6UPcsTdX/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            <svg className="resume-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 3.5h8l4 4V20.5H6V3.5Z" />
              <path d="M14 3.5v4h4M9 12h6M9 15.5h6" />
            </svg>
            <span>Resume</span>
          </a>
        </div>
      </nav>

      <main>
        <Hero
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode((value) => !value)}
        />
        <Marquee />
        <Works />
        <About />
        <Skills />
        <Contact />
      </main>

      <div className="noise" aria-hidden="true" />
      <div className="custom-cursor" aria-hidden="true">
        <span className="cursor-aura" />
        <span className="cursor-ring" />
        <span className="cursor-orbit" />
        <span className="cursor-dot" />
      </div>
    </>
  );
}
