import { useEffect, useRef, useState } from "react";
import { marqueeItems } from "../data.js";

/* Fade/slide-in on scroll into view */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`rv ${className}`}
      style={{ "--d": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Animated counter */
export function Stat({ value, decimals = 0, suffix = "", label, delay = 0 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.disconnect();
          const t0 = performance.now();
          const dur = 1700;
          const tick = (t) => {
            const p = Math.min(1, (t - t0) / dur);
            const ease = 1 - Math.pow(1 - p, 3);
            setVal(value * ease);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <div ref={ref} className="stat" style={{ transitionDelay: `${delay}ms` }}>
      <div className="stat-num">
        {val.toFixed(decimals)}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/* Tilted scrolling marquee band */
export function Marquee() {
  const chunk = (key) => (
    <div className="mq-chunk" key={key} aria-hidden={key === "b"}>
      {marqueeItems.map((item) => (
        <span
          key={item}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "2.4rem",
          }}
        >
          {item}
          <svg className="dot" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 1.5 10.2 5.8 14.5 8l-4.3 2.2L8 14.5l-2.2-4.3L1.5 8l4.3-2.2L8 1.5Z" />
          </svg>
        </span>
      ))}
    </div>
  );
  return (
    <div className="band" role="presentation">
      <div className="mq">
        {chunk("a")}
        {chunk("b")}
        {chunk("c")}
        {chunk("d")}
      </div>
    </div>
  );
}
