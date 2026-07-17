"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  cover: string;
  images: string[];
  tone: string;
};

const projects: Project[] = [
  {
    id: "new-season-launch",
    index: "01",
    title: "New Season Launch",
    subtitle: "Multi-stakeholder collaboration",
    cover: "/portfolio/projects/New-Season-Launch/24.jpg",
    images: [22, 23, 24, 25, 26, 27].map((n) => `/portfolio/projects/New-Season-Launch/${n}.jpg`),
    tone: "Celadon",
  },
  {
    id: "pr-bd",
    index: "02",
    title: "PR & BD",
    subtitle: "Cultural reach, partnerships and momentum",
    cover: "/portfolio/projects/PR-BD/08.jpg",
    images: [6, 7, 8, 9, 10].map((n) => `/portfolio/projects/PR-BD/${String(n).padStart(2, "0")}.jpg`),
    tone: "Vermilion",
  },
  {
    id: "unep",
    index: "03",
    title: "UNEP",
    subtitle: "Retail4Impact · One Planet Network",
    cover: "/portfolio/projects/UNEP/02.jpg",
    images: [1, 2, 3, 4, 5].map((n) => `/portfolio/projects/UNEP/${String(n).padStart(2, "0")}.jpg`),
    tone: "Ultramarine",
  },
  {
    id: "systems",
    index: "04",
    title: "0–1 System Building",
    subtitle: "Operational systems from a blank page",
    cover: "/portfolio/projects/0-1-System-Building/30.jpg",
    images: [28, 29, 30, 31].map((n) => `/portfolio/projects/0-1-System-Building/${n}.jpg`),
    tone: "Parchment",
  },
  {
    id: "project-management",
    index: "05",
    title: "Project Management",
    subtitle: "Offline & online shows",
    cover: "/portfolio/projects/Project-Management/16.jpg",
    images: [11, 12, 13, 14, 15, 16, 17].map((n) => `/portfolio/projects/Project-Management/${n}.jpg`),
    tone: "Nocturne",
  },
  {
    id: "ai-native",
    index: "06",
    title: "AI Native",
    subtitle: "From curiosity to working systems",
    cover: "/portfolio/projects/AI-Native/19.jpg",
    images: [18, 19, 20, 21].map((n) => `/portfolio/projects/AI-Native/${n}.jpg`),
    tone: "Silver",
  },
];

const traits = [
  "Global citizen",
  "AI Native",
  "Fashion enthusiast",
  "Sustainability advocate",
  "Minimalist",
  "Money maximizer",
  "Avid reader",
  "Fitness enthusiast",
  "Lifelong learner",
  "Chronic overthinker",
  "Language lover",
  "Future world explorer",
];

const metrics = [
  ["1M+", "in Sales"],
  ["450M+", "in Marketing Exposure"],
  ["400+", "in KOL Collaboration"],
  ["30+", "in Project Management"],
  ["50+", "in SOP Files Set Up"],
  ["5", "in AI Building"],
  ["1", "UNEP Initiative"],
  ["6", "Team Members"],
];

const lifeImages = Array.from({ length: 24 }, (_, i) => `/portfolio/life/${String(i + 1).padStart(2, "0")}.jpg`);

const navItems = [
  ["I", "About Me", "about"],
  ["II", "Work", "work"],
  ["III", "Life", "life"],
  ["IV", "Contact", "contact"],
];

export default function Home() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [flash, setFlash] = useState(false);
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const flashReady = useRef(true);

  useEffect(() => {
    const sections = ["hero", "about", "work", "life", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--scroll-y", String(window.scrollY));
        const viewportAnchor = window.innerHeight * 0.42;
        const currentSection = sections.reduce(
          (current, section) =>
            section.getBoundingClientRect().top <= viewportAnchor ? section.id : current,
          "hero",
        );
        setActive((current) => (current === currentSection ? current : currentSection));
        const about = document.getElementById("about")?.getBoundingClientRect();
        if (about && about.top < 90 && about.top > -120 && flashReady.current) {
          flashReady.current = false;
          setFlash(true);
          window.setTimeout(() => setFlash(false), 760);
        }
        if (about && (about.top > 260 || about.top < -500)) flashReady.current = true;
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = openProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openProject]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenProject(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const currentIndex = useMemo(() => navItems.findIndex((item) => item[2] === active), [active]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <main>
      <div className={`camera-flash ${flash ? "is-active" : ""}`} aria-hidden="true" />

      <button
        className="mobile-menu-button"
        type="button"
        aria-label="Open navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((value) => !value)}
      >
        <span>YL</span>
        <span>{menuOpen ? "Close" : "Index"}</span>
      </button>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        {navItems.map(([roman, label, id]) => (
          <button key={id} type="button" onClick={() => goTo(id)}>
            <span>{roman}</span>
            {label}
          </button>
        ))}
      </div>

      <aside className={`side-rail rail-${active}`} aria-label="Portfolio navigation">
        <button className="monogram" type="button" onClick={() => goTo("hero")} aria-label="Back to top">
          <span>Who</span>
          <span>Is</span>
          <strong>Yisong</strong>
          <em>(Yeesong) Luo</em>
        </button>
        <nav>
          {navItems.map(([roman, label, id], index) => (
            <button
              key={id}
              type="button"
              className={active === id ? "is-active" : ""}
              onClick={() => goTo(id)}
            >
              <span>{roman}</span>
              <span>{label}</span>
              <i aria-hidden="true">{currentIndex === index ? "●" : "○"}</i>
            </button>
          ))}
        </nav>
        <div className="rail-footer">
          <span>Shanghai · Global</span>
          <span>Portfolio MMXXVI</span>
        </div>
      </aside>

      <div className="content-shell">
        <section id="hero" className="hero section-dark">
          <img src="/portfolio/keynote/hero.jpg" alt="Yisong reimagined inside a Renaissance seascape" />
          <div className="hero-shade" />
          <button className="scroll-cue" type="button" onClick={() => goTo("about")}>
            <span>Scroll to enter</span>
            <i aria-hidden="true">↓</i>
          </button>
          <div className="hero-folio" aria-hidden="true">I / IV</div>
        </section>

        <section id="about" className="about section-cream">
          <div className="chapter-cover">
            <div className="chapter-number">I</div>
            <p>Portrait of a many-sided mind</p>
            <h2>About Me</h2>
            <div className="framed-portrait portrait-headphones">
              <img src="/portfolio/keynote/about-intro.jpg" alt="Renaissance portrait with headphones" />
            </div>
          </div>

          <div className="traits-stage">
            <div className="traits-sticky">
              <div className="traits-art" aria-hidden="true">
                <img src="/portfolio/keynote/about-traits.jpg" alt="" />
              </div>
              <div className="traits-heading">
                <p>Not one label. A constellation.</p>
                <h3>Who I am, in motion</h3>
              </div>
              <div className="traits-list">
                {traits.map((trait, index) => (
                  <div key={trait} style={{ "--trait-index": index } as React.CSSProperties}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{trait}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="work section-ink">
          <div className="chapter-cover work-cover">
            <div className="chapter-number">II</div>
            <p>Built through work. Defined by impact.</p>
            <h2>Work</h2>
            <div className="framed-portrait portrait-work">
              <img src="/portfolio/keynote/work-intro.jpg" alt="Yisong reimagined as a modern Mona Lisa holding a tablet" />
            </div>
          </div>

          <div className="impact-grid-wrap">
            <div className="impact-intro">
              <p className="eyebrow">Measured outcomes</p>
              <h3>
                Work that leaves
                <br />
                a visible trace.
              </h3>
              <div className="impact-art">
                <img src="/portfolio/keynote/work-impact.jpg" alt="Renaissance-inspired editorial portrait" />
              </div>
            </div>
            <div className="impact-grid">
              {metrics.map(([value, label], index) => (
                <article key={label} className={`metric metric-${index + 1}`}>
                  <strong>{value}</strong>
                  <p>{label}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="projects-stage">
            <div className="projects-sticky">
              <div className="projects-title">
                <p>Selected constellation</p>
                <h3>Key Projects</h3>
                <span>Choose a work to open its folio.</span>
              </div>
              <div className="project-orbit">
                {projects.map((project, index) => (
                  <button
                    key={project.id}
                    type="button"
                    className={`project-card project-card-${index + 1}`}
                    onClick={() => setOpenProject(project)}
                    aria-label={`Open ${project.title}`}
                  >
                    <img src={project.cover} alt="" />
                    <span>{project.index}</span>
                    <div>
                      <strong>{project.title}</strong>
                      <em>{project.subtitle}</em>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="life" className="life section-forest">
          <div className="chapter-cover life-cover">
            <div className="chapter-number">III</div>
            <p>A life gathered in fragments</p>
            <h2>Life</h2>
            <div className="framed-portrait portrait-life">
              <img src="/portfolio/keynote/life-intro.jpg" alt="Renaissance-inspired portrait behind a table of small treasures" />
            </div>
          </div>
          <div className="life-intro-copy">
            <p className="eyebrow">Elsewhere, always</p>
            <h3>People, places, rituals, movement.</h3>
            <p>Small evidence of a world explored with attention.</p>
          </div>
          <div className="life-mosaic">
            {lifeImages.map((src, index) => (
              <figure key={src} className={`life-tile life-tile-${(index % 7) + 1}`}>
                <img src={src} alt={`Life moment ${index + 1}`} loading="lazy" />
                <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="contact" className="contact section-cream">
          <div className="contact-art">
            <img src="/portfolio/keynote/contact.jpg" alt="A human and a robot reaching toward each other" />
          </div>
          <div className="contact-copy">
            <p className="eyebrow">IV · Contact</p>
            <h2>Let’s make<br />the next thing<br /><em>matter.</em></h2>
            <a href="mailto:yeesonglo@gmail.com">yeesonglo@gmail.com</a>
            <div className="contact-meta">
              <span>LinkedIn · available on request</span>
              <span>Shanghai · open to the world</span>
            </div>
          </div>
          <div className="closing-mark">YL</div>
        </section>
      </div>

      {openProject && (
        <div className="project-modal" role="dialog" aria-modal="true" aria-label={openProject.title}>
          <div className="project-modal-head">
            <div>
              <span>{openProject.index} · {openProject.tone}</span>
              <h2>{openProject.title}</h2>
              <p>{openProject.subtitle}</p>
            </div>
            <button type="button" onClick={() => setOpenProject(null)} aria-label="Close project">
              Close <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="project-gallery">
            {openProject.images.map((src, index) => (
              <figure key={src}>
                <img src={src} alt={`${openProject.title} documentation ${index + 1}`} />
                <figcaption>{openProject.index}.{String(index + 1).padStart(2, "0")}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
