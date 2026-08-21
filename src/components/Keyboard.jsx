import { useRef, useState } from "react";

const keys = [
  { id: "about", label: "About", accent: false },
  { id: "skills", label: "Skills", accent: false },
  { id: "works", label: "Projects", accent: false },
  { id: "contact", label: "Connect", accent: true },
];

function goTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Keyboard() {
  const rigRef = useRef(null);
  const [pressed, setPressed] = useState(null);
  const releaseTimer = useRef(null);

  const onMove = (e) => {
    const rig = rigRef.current;
    if (!rig || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
    rig.style.setProperty("--rx", `${(52 - ny * 7).toFixed(2)}deg`);
    rig.style.setProperty("--rz", `${(45 + nx * 7).toFixed(2)}deg`);
  };

  const onLeave = () => {
    const rig = rigRef.current;
    if (!rig) return;
    rig.style.setProperty("--rx", "52deg");
    rig.style.setProperty("--rz", "45deg");
  };

  const press = (id) => {
    setPressed(id);
    clearTimeout(releaseTimer.current);
    releaseTimer.current = setTimeout(() => setPressed(null), 420);
  };

  const release = () => setPressed(null);

  const activate = (e, id) => {
    e.preventDefault();
    press(id);
    goTo(id);
  };

  return (
    <div className="kb-wrap" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="kb-scene">
        <div className="kb-rig" ref={rigRef}>
          <div className="kb-float">
            <div className="kb-plate">
              <div className="kb-plate-base" />
              <div className="kb-plate-top">
                {keys.map((k) => (
                  <a
                    key={k.id}
                    href={`#${k.id}`}
                    className={`key${k.accent ? " accent" : ""}${pressed === k.id ? " pressed" : ""}`}
                    onPointerDown={() => press(k.id)}
                    onPointerUp={release}
                    onPointerLeave={release}
                    onClick={(e) => activate(e, k.id)}
                    aria-label={`Scroll to ${k.label} section`}
                  >
                    <span className="key-base" />
                    <span className="key-cap">
                      <span className="key-label">{k.label}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="kb-hint">Press a key &mdash; it scrolls the page</div>
    </div>
  );
}
