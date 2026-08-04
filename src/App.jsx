import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    name: 'MTR Dijkstra Visualizer',
    stack: 'React, Node.js, Express',
    liveUrl: 'https://mtr-dijkstra-visualizer.onrender.com/',
    repoUrl: 'https://github.com/darshbir19/MTR-Dijkstra-Visualizer',
    bullets: [
      "Interactive SVG map computing shortest MTR routes using Dijkstra's algorithm, backed by real-time station data",
      'Includes a station-calibration tool for mapping real MTR coordinates onto the interactive map',
    ],
  },
  {
    name: 'ContractLens',
    stack: 'React, TypeScript',
    repoUrl: 'https://github.com/darshbir19/ContractLens',
    bullets: [
      'AI-powered legal document analyzer that flags risky clauses in terms of service agreements in plain language',
      'Placed Top 8 at HackTheEast 2026',
    ],
  },
  {
    name: 'Stock Backtesting Engine',
    stack: 'FastAPI, React, TensorFlow',
    repoUrl: 'https://github.com/darshbir19/Stock-Backtesting-Engine',
    bullets: [
      'Backtests moving average, RSI, and LSTM trading strategies against 5 years of historical data',
      'Best result: 0.768 Sharpe ratio on an NVDA RSI strategy',
    ],
  },
  {
    name: 'FeelSSP',
    stack: 'TypeScript',
    liveUrl: 'https://ssp-v-tour.vercel.app/',
    repoUrl: 'https://github.com/darshbir19/Sham-Shui-Po-Virtual-Tour',
    bullets: [
      "A sensory-experience virtual tour of Sham Shui Po district, built under HKUST's HUMA3630 course",
      'Branded and shipped as "FeelSSP," live and publicly accessible',
    ],
  },
];

const education = [
  {
    title: (
      <>
        Bachelor of Engineering in{' '}
        <span className="font-medium text-[var(--text)]">Computer Engineering</span>
      </>
    ),
    org: 'Hong Kong University of Science and Technology',
    period: 'Sep 2024 - May 2028',
  },
  {
    title: (
      <>
        Exchange,{' '}
        <span className="font-medium text-[var(--text)]">Computer Science</span>
      </>
    ),
    org: 'KTH Royal Institute of Technology',
    period: 'Jan 2027 - May 2027',
  },
];

const stack = [
  {
    category: 'Languages',
    items: 'Python, JavaScript, TypeScript, C++, Embedded C',
  },
  {
    category: 'Frameworks',
    items: 'React, Node.js, FastAPI, LiveKit',
  },
  {
    category: 'AI/ML',
    items: 'TensorFlow, Keras, LangChain, RAG, OpenAI API',
  },
  {
    category: 'Hardware',
    items: 'ESP32-S3, ESP-IDF',
  },
  {
    category: 'Data/BI',
    items: 'Power BI, yfinance',
  },
  {
    category: 'Cloud/Tools',
    items: 'Azure, GitHub, GitHub Copilot, Vite',
  },
];

const workExperience = [
  {
    title: 'Software Engineer Intern',
    org: 'FireAlert Limited',
    orgUrl: 'https://www.hkstp.org/en/directory/information-communications-technology/firealert-limited',
    period: 'Jul 2026 - Present',
    status: 'Currently working on',
    bullets: [
      "Built and shipped 5 function-calling tools connecting a LiveKit voice agent to FireAlert's production REST API, including a confirmation-gated mutating action for device state changes",
      'Built the end-to-end STT-to-TTS voice pipeline on LiveKit, sustaining 15+ concurrent sessions at under 800ms average latency',
      'Designed and shipped a RAG knowledge-search tool covering 266 documents including Hong Kong Buildings Ordinance chapters, keeping prompt/context under 6,000 tokens per request',
    ],
  },
  {
    title: 'Research Intern',
    org: 'Hong Kong Applied Science and Technology Research Institute (ASTRI)',
    orgUrl: 'https://www.astri.org/',
    period: 'Jun 2025 - Aug 2025',
    bullets: [
      'Built real-time Power BI dashboards translating ESP32 sensor telemetry (temperature, irradiance) into actionable inverter performance insights for engineering and operations stakeholders',
      'Automated 50+ MOSFET thermal characterization tests across 70 devices to profile inverter performance under stress conditions',
      'Improved system efficiency by 40% through systematic performance profiling',
      'Collaborated cross-functionally with hardware and software teams to integrate IoT data pipelines into operational reporting workflows',
    ],
  },
];

const leadership = [
  {
    title: 'Undergraduate Student Ambassador',
    org: 'Hong Kong University of Science and Technology',
    orgUrl: 'https://join.hkust.edu.hk/saprogram',
    period: 'Nov 2024 - Present',
    status: 'Currently working on',
    bullets: [
      'Led and coordinated 180 students from 42+ schools during the STEM+E consortium competition sub-program, contributing to smooth event execution and case competition presentations',
      'Responded to 50+ prospective student inquiries, providing accurate and timely information on academic programs, admissions, and campus life',
      'Conducted 10+ in-person campus tours and 5+ online information sessions, communicating university offerings and student experiences',
    ],
  },
  {
    title: 'Microsoft Student Ambassador',
    org: 'Microsoft',
    orgUrl: 'https://mvp.microsoft.com/studentambassadors',
    period: 'Jan 2026 - June 2026',
    bullets: [
      'Selected for the Microsoft Student Ambassador program; completed 3 intensive training sessions with the Microsoft Hong Kong team, gaining proficiency in Azure, GitHub, and GitHub Copilot',
      'Delivered technical workshops on GitHub Copilot, demonstrating AI-assisted coding, debugging, and test generation in Python',
      'Educated peers on cloud computing concepts, version control workflows, and DevOps principles through engaging sessions and live demos',
    ],
  },
];

const isCurrentRole = (item) =>
  item.status === 'Currently working on' || /present/i.test(item.period ?? '');

const withCurrentFirst = (items) =>
  [...items].sort((a, b) => Number(isCurrentRole(b)) - Number(isCurrentRole(a)));

function App() {
  const [theme, setTheme] = useState('light');
  const contentScrollRef = useRef(null);
  const progressFillRef = useRef(null);
  const scrollRafRef = useRef(0);
  const heroSectionRef = useRef(null);
  const educationSectionRef = useRef(null);
  const stackSectionRef = useRef(null);
  const experienceSectionRef = useRef(null);
  const leadershipSectionRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const container = contentScrollRef.current;
    if (!container) return;

    const updateProgress = () => {
      const max = container.scrollHeight - container.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, container.scrollTop / max)) : 0;
      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleX(${progress})`;
      }
      scrollRafRef.current = 0;
    };

    const onScroll = () => {
      if (scrollRafRef.current) return;
      scrollRafRef.current = requestAnimationFrame(updateProgress);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();

    return () => {
      container.removeEventListener('scroll', onScroll);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const scrollToSection = (targetRef) => {
    const container = contentScrollRef.current;
    const target = targetRef.current;
    if (!container || !target) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const top = targetRect.top - containerRect.top + container.scrollTop - 16;
    container.scrollTo({ top, behavior: 'smooth' });
  };

  const badgeClass =
    'inline-flex items-center rounded-full bg-[var(--badge-bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--badge-text)]';

  const sectionLabelClass =
    'section-label text-xs font-medium tracking-[0.14em] uppercase';

  const navLinkClass =
    'text-sm text-[var(--muted)] transition hover:text-[var(--text)]';

  return (
    <div data-theme={theme} className="flex h-screen flex-col overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      <div className="page-grain" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true">
        <div ref={progressFillRef} className="scroll-progress__fill" />
      </div>
      <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-4 md:px-6">
        <div className="flex items-center gap-6 md:gap-8">
          <button
            type="button"
            onClick={() => scrollToSection(heroSectionRef)}
            className="text-sm font-medium text-[var(--text)] transition hover:opacity-80"
          >
            Darshbir Singh
          </button>
          <nav className="flex items-center gap-5">
            <button type="button" onClick={() => scrollToSection(experienceSectionRef)} className={navLinkClass}>
              Experience
            </button>
            <button type="button" onClick={() => scrollToSection(projectsSectionRef)} className={navLinkClass}>
              Projects
            </button>
            <button type="button" onClick={() => scrollToSection(leadershipSectionRef)} className={navLinkClass}>
              Community
            </button>
            <button type="button" onClick={() => scrollToSection(contactSectionRef)} className={navLinkClass}>
              Contact
            </button>
          </nav>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={theme === 'light'}
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          className="theme-toggle inline-flex h-7 w-12 items-center rounded-full border border-[var(--border)] bg-[var(--card)] p-0.5 transition-colors"
        >
          <span
            className={`theme-toggle-thumb inline-flex items-center justify-center rounded-full bg-[var(--text)] text-[var(--bg)] shadow-sm transition-transform duration-300 ease-out ${
              theme === 'light' ? 'translate-x-[1.375rem]' : 'translate-x-0'
            }`}
            aria-hidden="true"
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-3 w-3 fill-current">
                <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 3.75a.75.75 0 0 1-.75-.75v-1.5a.75.75 0 0 1 1.5 0v1.5a.75.75 0 0 1-.75.75Zm0-16.5a.75.75 0 0 1-.75-.75V2.25a.75.75 0 0 1 1.5 0V3.75a.75.75 0 0 1-.75.75Zm9 6.75a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75ZM5.25 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75Zm12.48 5.48a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 1 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0ZM8.39 5.46a.75.75 0 0 1 0 1.06L7.33 7.58A.75.75 0 0 1 6.27 6.52l1.06-1.06a.75.75 0 0 1 1.06 0Zm9.18-1.06a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 1 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0ZM8.39 16.54a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 1 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-3 w-3 fill-current">
                <path d="M21 14.3A8.5 8.5 0 0 1 9.7 3 7 7 0 1 0 21 14.3Z" />
              </svg>
            )}
          </span>
        </button>
      </header>

      <main ref={contentScrollRef} className="custom-scrollbar min-h-0 flex-1 overflow-y-auto bg-[var(--bg)]">
        <div className="mx-auto max-w-3xl space-y-14 px-6 py-14 md:px-10 md:py-16">
            <section ref={heroSectionRef}>
              <h1 className="font-serif text-6xl font-bold leading-tight tracking-[-0.02em] text-[var(--text)] md:text-7xl">
                Hi, I&apos;m Darshbir Singh.
              </h1>
              <div className="mt-4 flex items-stretch gap-4">
                <p className="min-w-0 flex-1 self-center text-base leading-snug text-[var(--muted)] md:text-lg">
                  Building AI pipelines at FireAlert, learning system design, and increasingly convinced financial markets are just another distributed system.
                </p>
                <div className="w-px self-stretch bg-[var(--border)]" aria-hidden="true" />
                <div className="flex shrink-0 flex-col items-start justify-center gap-2.5 text-lg text-[var(--muted)]">
                  <a
                    href="https://github.com/darshbir19"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="accent-link inline-flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.25c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.34-1.75-1.34-1.75-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.2 1.84 1.2 1.08 1.82 2.84 1.29 3.53.99.1-.77.42-1.3.77-1.6-2.67-.3-5.48-1.31-5.48-5.85 0-1.29.47-2.35 1.24-3.18-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.22a11.58 11.58 0 0 1 6.02 0c2.29-1.54 3.3-1.22 3.3-1.22.66 1.64.24 2.86.12 3.16.77.83 1.24 1.89 1.24 3.18 0 4.55-2.82 5.54-5.51 5.84.44.37.82 1.09.82 2.21v3.28c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
                    </svg>
                    github.com/darshbir19
                  </a>
                  <a
                    href="https://www.linkedin.com/in/darshbirsingh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="accent-link inline-flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5 2.5 2.5 0 0 0 4.98 3.5ZM3 9h4v12H3V9Zm7 0h3.82v1.64h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.12V21h-4v-5.62c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.97V21h-4V9Z" />
                    </svg>
                    linkedin.com/in/darshbirsingh
                  </a>
                  <a
                    href="mailto:dskohli@connect.ust.hk"
                    className="accent-link inline-flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                      <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 7.2 8-5.2H4l8 5.2Zm0 2.4L4 9.4V17h16V9.4l-8 5.2Z" />
                    </svg>
                    dskohli@connect.ust.hk
                  </a>
                  <span className="inline-flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Zm.75-12.75h-1.5v5.06l3.72 2.23.75-1.25-2.97-1.78Z" />
                    </svg>
                    GMT+8 (Hong Kong)
                  </span>
                </div>
              </div>
              <div className="mt-14 h-px w-full bg-[var(--border)]" aria-hidden="true" />
            </section>

            <section ref={educationSectionRef} className="!mt-0 pt-10">
              <p className={sectionLabelClass}>
                00 / Education
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-[var(--text)] md:text-4xl">
                Where I&apos;m learning it
              </h2>
              <p className="mt-2 text-base text-[var(--muted)]">the school part</p>
              <div className="mx-auto mt-8 h-px w-3/5 bg-[var(--border)]" aria-hidden="true" />

              <div>
                {education.map((item, index) => (
                  <div key={item.org}>
                    {index > 0 && (
                      <div className="mx-auto h-px w-3/5 bg-[var(--border)]" aria-hidden="true" />
                    )}
                    <article className="grid grid-cols-1 gap-3 py-7 md:grid-cols-[50px_1fr] md:gap-x-8">
                      <span className="font-mono text-sm tabular-nums text-[var(--muted)] md:pt-1">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-[var(--text)]">{item.org}</h3>
                        <p className="mt-1.5 text-base text-[var(--muted)]">{item.title}</p>
                        <p className="mt-2 text-xs tracking-[0.1em] text-[var(--muted)] uppercase">
                          {item.period.replace(/ - /g, ' – ')}
                        </p>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
              <div className="mt-14 h-px w-full bg-[var(--border)]" aria-hidden="true" />
            </section>

            <section ref={experienceSectionRef}>
              <p className={sectionLabelClass}>
                01 / Experience
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-[var(--text)] md:text-4xl">
                Where I&apos;ve spent my time
              </h2>
              <p className="mt-2 text-base text-[var(--muted)]">roles I&apos;ve actually worked through</p>
              <div className="mx-auto mt-8 h-px w-3/5 bg-[var(--border)]" aria-hidden="true" />

              <div>
                {withCurrentFirst(workExperience).map((item, index) => (
                  <div key={item.title}>
                    {index > 0 && (
                      <div className="mx-auto h-px w-3/5 bg-[var(--border)]" aria-hidden="true" />
                    )}
                    <article className="grid grid-cols-1 gap-4 py-12 md:grid-cols-[50px_minmax(160px,220px)_1fr] md:gap-x-8">
                      <span className="font-mono text-sm tabular-nums text-[var(--muted)] md:pt-1">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-bold text-[var(--text)]">{item.title}</h3>
                          {item.status && <span className={badgeClass}>{item.status}</span>}
                        </div>
                        <p className="mt-1.5 inline-flex items-center gap-1.5 text-base text-[var(--muted)]">
                          <span>{item.org}</span>
                          {item.orgUrl && (
                            <a
                              href={item.orgUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="quiet-link"
                              aria-label={`${item.org} website`}
                            >
                              <span aria-hidden="true">↗</span>
                            </a>
                          )}
                        </p>
                        <p className="mt-2 text-xs tracking-[0.1em] text-[var(--muted)] uppercase">
                          {item.period.replace(/ - /g, ' – ')}
                        </p>
                      </div>
                      <ul className="space-y-2.5 text-base leading-7 text-[var(--muted)]">
                        {item.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-2.5">
                            <span className="shrink-0 select-none" aria-hidden="true">
                              –
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>
                ))}
              </div>
              <div className="mt-14 h-px w-full bg-[var(--border)]" aria-hidden="true" />
            </section>

            <section ref={stackSectionRef}>
              <p className={sectionLabelClass}>
                02 / Stack
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-[var(--text)] md:text-4xl">
                What I actually build with
              </h2>
              <p className="mt-2 text-base text-[var(--muted)]">no buzzword bingo, just what&apos;s in the toolbox</p>
              <div className="mx-auto mt-8 h-px w-3/5 bg-[var(--border)]" aria-hidden="true" />

              <div>
                {stack.map((row, index) => (
                  <div key={row.category}>
                    {index > 0 && (
                      <div className="mx-auto h-px w-3/5 bg-[var(--border)]" aria-hidden="true" />
                    )}
                    <article className="grid grid-cols-1 gap-2 py-7 md:grid-cols-[minmax(110px,140px)_1fr] md:gap-x-8 md:items-baseline">
                      <p className="text-xs font-medium tracking-[0.14em] text-[var(--muted)] uppercase">
                        {row.category}
                      </p>
                      <p className="text-base leading-7 text-[var(--text)]">{row.items}</p>
                    </article>
                  </div>
                ))}
              </div>
              <div className="mt-14 h-px w-full bg-[var(--border)]" aria-hidden="true" />
            </section>

            <section ref={projectsSectionRef}>
              <p className={sectionLabelClass}>
                03 / Projects
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-[var(--text)] md:text-4xl">
                Things I&apos;ve built on my own
              </h2>
              <div className="mx-auto mt-8 h-px w-3/5 bg-[var(--border)]" aria-hidden="true" />

              <div>
                {withCurrentFirst(projects).map((project, index) => (
                  <div key={project.name}>
                    {index > 0 && (
                      <div className="mx-auto h-px w-3/5 bg-[var(--border)]" aria-hidden="true" />
                    )}
                    <article className="grid grid-cols-1 gap-4 py-12 md:grid-cols-[50px_minmax(160px,220px)_1fr] md:gap-x-8">
                      <span className="font-mono text-sm tabular-nums text-[var(--muted)] md:pt-1">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-[var(--text)]">{project.name}</h3>
                        <p className="mt-1.5 text-base text-[var(--muted)]">{project.stack}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-base text-[var(--muted)]">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="quiet-link inline-flex items-center gap-1"
                            >
                              Live <span aria-hidden="true">↗</span>
                            </a>
                          )}
                          {project.repoUrl && (
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="accent-link inline-flex items-center gap-1"
                            >
                              Repo <span aria-hidden="true">↗</span>
                            </a>
                          )}
                        </div>
                      </div>
                      <ul className="space-y-2.5 text-base leading-7 text-[var(--muted)]">
                        {project.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-2.5">
                            <span className="shrink-0 select-none" aria-hidden="true">
                              –
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>
                ))}
              </div>
              <div className="mt-14 h-px w-full bg-[var(--border)]" aria-hidden="true" />
            </section>

            <section ref={leadershipSectionRef}>
              <p className={sectionLabelClass}>
                04 / Leadership
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-[var(--text)] md:text-4xl">
                People and community stuff I&apos;ve led
              </h2>
              <div className="mx-auto mt-8 h-px w-3/5 bg-[var(--border)]" aria-hidden="true" />

              <div>
                {withCurrentFirst(leadership).map((item, index) => (
                  <div key={item.title}>
                    {index > 0 && (
                      <div className="mx-auto h-px w-3/5 bg-[var(--border)]" aria-hidden="true" />
                    )}
                    <article className="grid grid-cols-1 gap-4 py-12 md:grid-cols-[50px_minmax(160px,220px)_1fr] md:gap-x-8">
                      <span className="font-mono text-sm tabular-nums text-[var(--muted)] md:pt-1">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-bold text-[var(--text)]">{item.title}</h3>
                          {item.status && <span className={badgeClass}>{item.status}</span>}
                        </div>
                        <p className="mt-1.5 inline-flex items-center gap-1.5 text-base text-[var(--muted)]">
                          <span>{item.org}</span>
                          {item.orgUrl && (
                            <a
                              href={item.orgUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="quiet-link"
                              aria-label={`${item.org} website`}
                            >
                              <span aria-hidden="true">↗</span>
                            </a>
                          )}
                        </p>
                        <p className="mt-2 text-xs tracking-[0.1em] text-[var(--muted)] uppercase">
                          {item.period.replace(/ - /g, ' – ')}
                        </p>
                      </div>
                      <ul className="space-y-2.5 text-base leading-7 text-[var(--muted)]">
                        {item.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-2.5">
                            <span className="shrink-0 select-none" aria-hidden="true">
                              –
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>
                ))}
              </div>
              <div className="mt-14 h-px w-full bg-[var(--border)]" aria-hidden="true" />
            </section>

            <section ref={contactSectionRef}>
              <p className={sectionLabelClass}>
                05 / Contact
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-[var(--text)] md:text-4xl">
                Got something worth building?
              </h2>
              <p className="mt-2 text-base text-[var(--muted)]">say hi — no cold-email etiquette required</p>
              <div className="mx-auto mt-8 h-px w-3/5 bg-[var(--border)]" aria-hidden="true" />

              <a
                href="mailto:dskohli@connect.ust.hk"
                className="accent-link mt-10 inline-flex items-center gap-2 font-mono text-xl tracking-[-0.02em] text-[var(--text)] md:text-2xl"
              >
                dskohli@connect.ust.hk <span aria-hidden="true">↗</span>
              </a>

              <div className="mt-12 flex flex-col gap-4 border-t border-[var(--border)] pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-base text-[var(--muted)]">
                  <a
                    href="https://www.linkedin.com/in/darshbirsingh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="accent-link inline-flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5 2.5 2.5 0 0 0 4.98 3.5ZM3 9h4v12H3V9Zm7 0h3.82v1.64h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.12V21h-4v-5.62c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.97V21h-4V9Z" />
                    </svg>
                    LinkedIn <span aria-hidden="true">↗</span>
                  </a>
                  <a
                    href="https://github.com/darshbir19"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="accent-link inline-flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.25c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.34-1.75-1.34-1.75-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.2 1.84 1.2 1.08 1.82 2.84 1.29 3.53.99.1-.77.42-1.3.77-1.6-2.67-.3-5.48-1.31-5.48-5.85 0-1.29.47-2.35 1.24-3.18-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.22a11.58 11.58 0 0 1 6.02 0c2.29-1.54 3.3-1.22 3.3-1.22.66 1.64.24 2.86.12 3.16.77.83 1.24 1.89 1.24 3.18 0 4.55-2.82 5.54-5.51 5.84.44.37.82 1.09.82 2.21v3.28c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
                    </svg>
                    GitHub <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <p className="text-base text-[var(--muted)] sm:text-right">© 2026 Darshbir Singh</p>
              </div>
            </section>
          </div>
      </main>
    </div>
  );
}

export default App;
