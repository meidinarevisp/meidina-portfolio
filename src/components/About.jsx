import { Reveal, Stat } from "./shared.jsx";
import { education, experience, stats } from "../data.js";
import profilePhoto from "../assets/profile.jpg";

export default function About() {
  return (
    <section id="about" className="sec sec-about">
      <div className="sec-inner">
        <Reveal>
          <div className="overline">( 02 ) &mdash; About</div>
          <h2 className="sec-title">Get to Know Me...</h2>
        </Reveal>

        <div className="about-grid">
          <div className="about-intro">
            <Reveal delay={100}>
              <div className="about-photo-frame">
                <img
                  className="about-photo"
                  src={profilePhoto}
                  alt=""
                  aria-hidden="true"
                />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="about-para">
                I&rsquo;m Meidina Revi, an Informatics graduate with experience
                in SEO Content Writing, Web Development, and Mobile Development,
                combining technical skills and content creation to build useful
                digital experiences.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="edu-card">
                <div className="edu-school">{education.school}</div>
                <div className="edu-degree">{education.degree}</div>
                <div className="edu-row">
                  <span className="chip-period-plain">{education.period}</span>
                  <span className="chip-gpa">GPA {education.gpa}</span>
                </div>
                <div className="edu-thesis">
                  <b>Final Thesis</b>
                  {education.thesis}
                  <a
                    className="edu-journal-link"
                    href="https://jurnal.stkippgritulungagung.ac.id/index.php/jipi/article/view/7808"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Journal &middot; SINTA 3
                    <span aria-hidden="true">&#8599;</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="about-experience">
            <Reveal delay={150}>
              <div className="tl-title">Experience</div>
            </Reveal>
            <div className="tl">
              {experience.map((x, i) => (
                <Reveal key={x.org} delay={i * 110}>
                  <div className="tl-item">
                    <div className="tl-head">
                      <span className="tl-role">{x.role}</span>
                      <span className="tl-tag">{x.tag}</span>
                    </div>
                    <div className="tl-org">{x.org}</div>
                    <div className="tl-period">{x.period}</div>
                    <ul>
                      {x.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal delay={100}>
          <div className="stats">
            {stats.map((s, i) => (
              <Stat
                key={s.label}
                value={s.value}
                decimals={s.decimals}
                suffix={s.suffix}
                label={s.label}
                delay={i * 90}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
