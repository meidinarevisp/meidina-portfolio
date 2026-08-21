import { useRef, useState } from "react";
import { Reveal } from "./shared.jsx";
import { profile } from "../data.js";

export default function Contact() {
  const [copyStatus, setCopyStatus] = useState("idle");
  const copyTimer = useRef(null);

  const copyEmail = async () => {
    clearTimeout(copyTimer.current);
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
    copyTimer.current = setTimeout(() => setCopyStatus("idle"), 1800);
  };

  return (
    <section id="contact" className="sec sec-contact">
      <div className="contact-word" aria-hidden="true">
        Let&rsquo;s Connect
      </div>
      <div className="sec-inner contact-inner">
        <Reveal>
          <div className="overline contact-overline">
            ( 04 ) &mdash; Get In Touch
          </div>
        </Reveal>
        <div className="contact-grid">
          <div className="contact-main">
            <Reveal delay={100}>
              <h2 className="contact-title">
                Let&rsquo;s Work
                <br />
                Together.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={220}>
            <div className="contact-panel">
              <div className="panel-label">Contact Me</div>
              <div className="contact-actions">
                <a className="key-btn" href={`mailto:${profile.email}`}>
                  Email Me <span aria-hidden="true">&#8594;</span>
                </a>
                <button
                  className={`key-btn ghost copy-btn${copyStatus !== "idle" ? ` ${copyStatus}` : ""}`}
                  type="button"
                  onClick={copyEmail}
                  aria-live="polite"
                >
                  {copyStatus === "copied" ? (
                    <>
                      <svg
                        className="copy-status-icon"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="m5 12 4 4L19 6" />
                      </svg>
                      Copied!
                    </>
                  ) : copyStatus === "error" ? (
                    <>
                      <svg
                        className="copy-status-icon"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 8v5M12 16.5v.5" />
                        <path d="m10.3 4.2-7 12.1A2 2 0 0 0 5 19.3h14a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z" />
                      </svg>
                      Copy Failed
                    </>
                  ) : (
                    <>
                      <svg
                        className="copy-status-icon"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <rect x="8" y="8" width="11" height="12" rx="2" />
                        <path d="M16 8V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h1" />
                      </svg>
                      Copy Email
                    </>
                  )}
                </button>
              </div>
              <div className="contact-links">
                <a
                  className="clink"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <b>GH</b> GitHub
                </a>
                <a
                  className="clink"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <b>in</b> LinkedIn
                </a>
                <a
                  className="clink"
                  href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
                >
                  <b>tel</b> {profile.phone}
                </a>
                <a
                  className="clink"
                  href="https://www.instagram.com/meidinarevisp"
                  target="_blank"
                  rel="noreferrer"
                >
                  <b>IG</b> @meidinarevisp
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={340}>
          <div className="avail">
            <span className="pulse" aria-hidden="true" />
            Available Now &mdash; Sleman, Yogyakarta (Remote Friendly)
          </div>
        </Reveal>

        <div className="footer">
          <span>&copy; 2026 {profile.name}. All Rights Reserved.</span>
          <a href="#top">Back to Top &#8593;</a>
        </div>
      </div>
    </section>
  );
}
