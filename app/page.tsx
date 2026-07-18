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
    subtitle: "KOL Collaboration",
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
    subtitle: "Offline & Online Show",
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
  "AI native",
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
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const [projectImageIndex, setProjectImageIndex] = useState(0);
  const [projectSelected, setProjectSelected] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const flashReady = useRef(true);
  const flashTimer = useRef<number | null>(null);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? projects[0],
    [selectedProjectId],
  );
  const currentIndex = useMemo(() => navItems.findIndex((item) => item[2] === active), [active]);

  const triggerFlash = () => {
    if (!flashReady.current) return;
    flashReady.current = false;
    setFlash(false);
    window.requestAnimationFrame(() => setFlash(true));
    if (flashTimer.current) window.clearTimeout(flashTimer.current);
    flashTimer.current = window.setTimeout(() => setFlash(false), 1080);
  };

  useEffect(() => {
    const sections = ["hero", "about", "work", "life", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        document.documentElement.style.setProperty("--scroll-y", String(scrollY));
        const viewportAnchor = window.innerHeight * 0.42;
        const currentSection = sections.reduce(
          (current, section) => (section.getBoundingClientRect().top <= viewportAnchor ? section.id : current),
          "hero",
        );
        setActive((current) => (current === currentSection ? current : currentSection));

        if (scrollY > 28 && scrollY < window.innerHeight * 0.82 && flashReady.current) triggerFlash();
        if (scrollY < 8) flashReady.current = true;
        raf = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      if (flashTimer.current) window.clearTimeout(flashTimer.current);
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goTo = (id: string) => {
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (id === "about" && window.scrollY < window.innerHeight * 0.6) {
      triggerFlash();
      window.setTimeout(scroll, 260);
    } else {
      scroll();
    }
    setMenuOpen(false);
  };

  const chooseProject = (project: Project) => {
    setSelectedProjectId(project.id);
    setProjectImageIndex(0);
    setProjectSelected(true);
  };

  const changeProjectImage = (direction: number) => {
    setProjectImageIndex((current) =>
      (current + direction + selectedProject.images.length) % selectedProject.images.length,
    );
  };

  const copyContact = async (label: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied((current) => (current === label ? null : current)), 1600);
  };

  return (
    <main>
      <div className={`camera-flash ${flash ? "is-active" : ""}`} aria-hidden="true" />

      <button
        className={`mobile-menu-button mobile-${active}`}
        type="button"
        aria-label="Open navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((value) => !value)}
      >
        <span>YL</span>
        <span>{menuOpen ? "Close" : "Index"}</span>
      </button>

      <div className={`mobile-menu mobile-${active} ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
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
          <strong>Yeesong</strong>
          <em>(Yisong Luo)</em>
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
      </aside>

      <div className="content-shell">
        <section id="hero" className="hero section-dark">
          <img src="/portfolio/keynote/hero.jpg" alt="Yeesong inside a Renaissance seascape" />
          <div className="hero-shade" />
          <button className="scroll-cue" type="button" onClick={() => goTo("about")}>
            <span>Scroll to enter</span>
            <i aria-hidden="true">↓</i>
          </button>
          <div className="hero-folio" aria-hidden="true">I / IV</div>
        </section>

        <section id="about" className="about section-cream">
          <div className="chapter-cover about-cover">
            <p>Portrait of a many-sided mind</p>
            <h2>About Me</h2>
            <div className="framed-portrait portrait-headphones">
              <img src="/portfolio/keynote-v2/about.png" alt="Yeesong wearing headphones with moth and botanical details" />
            </div>
          </div>

          <div id="traits" className="traits-stage">
            <div className="traits-sticky">
              <div className="traits-art">
                <img src="/portfolio/keynote-v2/traits.png" alt="Yeesong working on a laptop" />
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
            <p>Built through work. Defined by impact.</p>
            <h2>Work</h2>
            <div className="framed-portrait portrait-work">
              <img src="/portfolio/keynote-v2/work.png" alt="Yeesong reimagined as a modern Mona Lisa holding a tablet" />
            </div>
          </div>

          <div id="impact" className="impact-grid-wrap">
            <div className="impact-sticky">
              <div className="impact-intro">
                <p className="eyebrow">Measured outcomes</p>
                <h3>Built Through<br />Work,<br />Defined by<br />Impact</h3>
                <div className="impact-art">
                  <img src="/portfolio/keynote-v2/impact.png" alt="Yeesong reimagined as the Girl with a Pearl Earring holding a magazine" />
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
          </div>

          <div id="projects" className="projects-stage">
            <div className="projects-sticky">
              <div className="projects-title">
                <h3>Key Projects</h3>
                {!projectSelected && <span>Click to Know Details</span>}
              </div>

              <div className="project-orbit">
                {projects.map((project, index) => (
                  <button
                    key={project.id}
                    type="button"
                    className={`project-card project-card-${index + 1} ${projectSelected && selectedProject.id === project.id ? "is-selected" : ""}`}
                    onClick={() => chooseProject(project)}
                    aria-pressed={projectSelected && selectedProject.id === project.id}
                    aria-label={`Select ${project.title}`}
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

              {projectSelected && (
                <div className="project-inline-viewer" aria-live="polite">
                  <button type="button" onClick={() => changeProjectImage(-1)} aria-label="Previous project image">←</button>
                  <figure>
                    <img
                      src={selectedProject.images[projectImageIndex]}
                      alt={`${selectedProject.title} image ${projectImageIndex + 1}`}
                    />
                    <figcaption>
                      <span>{selectedProject.index} · {selectedProject.tone}</span>
                      <strong>{selectedProject.title}</strong>
                      <em>{String(projectImageIndex + 1).padStart(2, "0")} / {String(selectedProject.images.length).padStart(2, "0")}</em>
                    </figcaption>
                  </figure>
                  <button type="button" onClick={() => changeProjectImage(1)} aria-label="Next project image">→</button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="life" className="life section-forest">
          <div className="chapter-cover life-cover">
            <p>A life gathered in fragments</p>
            <h2>Life</h2>
            <div className="framed-portrait portrait-life">
              <img src="/portfolio/keynote-v2/life.png" alt="Yeesong behind a table of flowers, bottles and a radio" />
            </div>
          </div>

          <div id="life-gallery" className="life-gallery-stage">
            <div className="life-center-copy">
              <h3>People, Places,<br />Rituals, Movement.</h3>
            </div>
            <div className="life-orbit">
              {lifeImages.map((src, index) => (
                <figure key={src} className={`life-tile life-tile-${(index % 7) + 1}`}>
                  <img src={src} alt={`Life moment ${index + 1}`} loading="lazy" />
                  <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact section-cream" aria-label="Contact">
          <img className="contact-robot" src="/portfolio/keynote-v2/contact-robot.png" alt="A robot reaching outward" />
          <img className="contact-angel" src="/portfolio/keynote-v2/contact-angel.png" alt="Yeesong reaching toward the robot" />
          <div className="contact-copy">
            <div className="contact-line">
              <a href="mailto:yeesonglo@gmail.com">Mail: yeesonglo@gmail.com</a>
              <button type="button" aria-label="Copy email address" onClick={() => copyContact("mail", "yeesonglo@gmail.com")}>
                {copied === "mail" ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="contact-line">
              <a href="https://www.linkedin.com/in/yeesong" target="_blank" rel="noreferrer">LinkedIn: linkedin.com/in/yeesong</a>
              <button type="button" aria-label="Copy LinkedIn address" onClick={() => copyContact("linkedin", "https://www.linkedin.com/in/yeesong")}>
                {copied === "linkedin" ? "Copied" : "Copy"}
              </button>
            </div>
            <strong>Open To The World</strong>
          </div>
          <div className="closing-mark">YL</div>
        </section>
      </div>
    </main>
  );
}
