import { useEffect, useRef, useState } from "react";
import { Reveal } from "./shared.jsx";
import {
  coreSkills,
  techSkills,
  softSkills,
  languages,
  certifications,
} from "../data.js";

export default function Skills() {
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const certsRef = useRef(null);

  useEffect(() => {
    if (!selectedCertificate) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedCertificate(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [selectedCertificate]);

  const toggleCertificates = () => {
    setShowAllCertificates((visible) => !visible);
    if (showAllCertificates) {
      requestAnimationFrame(() => {
        certsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  };

  return (
    <section id="skills" className="sec sec-skills">
      <div className="sec-inner">
        <Reveal>
          <div className="overline">( 03 ) &mdash; Skills</div>
          <h2 className="sec-title">Technical Skills &amp; Tools</h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="skill-cloud">
            {techSkills.map((s) => (
              <span
                key={s}
                className={`chip${coreSkills.includes(s) ? " core" : ""}`}
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="skills-cols">
          <Reveal delay={80}>
            <div className="skills-block">
              <h4>Soft Skills</h4>
              <div className="soft-list">
                {softSkills.map((s, i) => (
                  <div key={s} className="soft-item">
                    <span className="key-dot">0{i + 1}</span>
                    <span className="soft-name">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="skills-block">
              <h4>Languages</h4>
              {languages.map((l) => (
                <div key={l.name} className="lang-row">
                  <div className="lang-top">
                    <span>{l.name}</span>
                    <span>{l.level}</span>
                  </div>
                  <div className="bar">
                    <div className="bar-fill" style={{ "--w": `${l.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="certs" ref={certsRef}>
          <Reveal>
            <div className="overline">Certificates &amp; Awards</div>
          </Reveal>
          <div className="certs-grid">
            {(showAllCertificates
              ? certifications
              : certifications.slice(0, 3)
            ).map((c, i) => (
              <Reveal key={c.title} delay={i * 120}>
                <div className="cert-card">
                  <div className="cert-year" aria-label={`Issued in ${c.year}`}>
                    <span>{c.year}</span>
                  </div>
                  <div className="cert-card-content">
                    <div className="cert-card-head">
                      <div className="cert-issuer">{c.issuer}</div>
                    </div>
                    <div className="cert-title">{c.title}</div>
                    <div className="cert-note">{c.note}</div>
                    <button
                      className="cert-link cert-detail-button"
                      type="button"
                      onClick={() => setSelectedCertificate(c)}
                    >
                      View Details
                      <span aria-hidden="true">&#8594;</span>
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          {certifications.length > 3 && (
            <button
              className="certs-toggle"
              type="button"
              onClick={toggleCertificates}
            >
              {showAllCertificates
                ? "Show Fewer Certificates"
                : "View All Certificates"}
              <span aria-hidden="true">{showAllCertificates ? "↑" : "↓"}</span>
            </button>
          )}
        </div>
      </div>

      {selectedCertificate && (
        <div
          className="certificate-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedCertificate.title} details`}
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="certificate-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="certificate-close"
              type="button"
              onClick={() => setSelectedCertificate(null)}
              aria-label="Close certificate details"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="certificate-modal-details">
              <div className="cert-year-label">{selectedCertificate.year}</div>
              <div className="cert-issuer">{selectedCertificate.issuer}</div>
              <h3>{selectedCertificate.title}</h3>
              <p>{selectedCertificate.note}</p>
              {selectedCertificate.certificateUrl && (
                <a
                  className="cert-link"
                  href={selectedCertificate.certificateUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Original Certificate
                  <span aria-hidden="true">&#8599;</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
