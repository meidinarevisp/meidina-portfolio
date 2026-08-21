import { useEffect, useState } from "react";
import { Reveal } from "./shared.jsx";
import { projects } from "../data.js";
import imgRimbawa from "../assets/img-rimbawa.jpg";
import imgGrocery from "../assets/img-grocery.jpg";
import imgRice from "../assets/img-rice.jpg";

const images = [imgRimbawa, imgGrocery, imgRice];

export default function Works() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (!selectedProject) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <>
      <section id="works" className="sec sec-works">
        <div className="sec-inner">
          <Reveal>
            <div className="overline">( 01 ) &mdash; Selected Projects</div>
            <h2 className="sec-title">Projects I&rsquo;ve Worked On</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="sec-lead">
              A selection of projects I&rsquo;ve worked on throughout my
              experience.
            </p>
          </Reveal>

          <div className="p-grid">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 130}>
                <article className="pcard">
                  <div className="pcard-img">
                    <img src={images[i]} alt={p.title} loading="lazy" />
                    <div className="pcard-img-action">
                      <button
                        className="pcard-detail-button"
                        type="button"
                        onClick={() =>
                          setSelectedProject({ project: p, image: images[i] })
                        }
                      >
                        View Details
                        <span aria-hidden="true">&#8594;</span>
                      </button>
                    </div>
                  </div>
                  <div className="pcard-body">
                    <span className="chip-role">{p.role}</span>
                    <h3>{p.title}</h3>
                    <div className="pcard-org">{p.org}</div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedProject.project.title} project details`}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="lightbox-close"
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
            <img
              src={selectedProject.image}
              alt={selectedProject.project.title}
            />
            <div className="lightbox-details">
              <div className="lightbox-caption">
                <span>{selectedProject.project.role}</span>
                {selectedProject.project.title}
              </div>
              <div className="lightbox-meta">
                <span>{selectedProject.project.org}</span>
                <span>{selectedProject.project.period}</span>
              </div>
              <ul className="lightbox-list">
                {selectedProject.project.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <div className="lightbox-stack">
                <div className="pcard-stack-head">
                  <span>Tools Used</span>
                  <span>{selectedProject.project.stack.length} Tools</span>
                </div>
                <div className="lightbox-tools">
                  {selectedProject.project.stack.map((tool) => (
                    <span key={tool} className="chip-mini">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
