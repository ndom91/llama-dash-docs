import { Link } from "@tanstack/react-router";
import { gitConfig } from "@/lib/shared";
import "./landing.css";

const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

const features = [
  {
    code: "D01",
    title: "Watch the box",
    desc: "Live request, token, model, upstream, and GPU status in one dashboard.",
  },
  {
    code: "M05",
    title: "Manage models",
    desc: "Load, unload, inspect per-model stats, and edit llama-swap config with validation.",
  },
  {
    code: "R02",
    title: "Track requests",
    desc: "Searchable history with filters, histograms, token counts, and cost estimates.",
  },
  {
    code: "K08",
    title: "Control access",
    desc: "Hashed API keys, per-key RPM/TPM limits, and model allow-lists.",
  },
  {
    code: "P10",
    title: "Enforce policy",
    desc: "Routing rules for model rewrites, passthrough auth, and encrypted credentials.",
  },
  {
    code: "P06",
    title: "Test models",
    desc: "Playgrounds for chat, image, speech, and article-to-speech transcription.",
  },
];

const recentRequests = [
  { id: "req-1", path: "/v1/messages", status: "200", ms: "950 ms" },
  { id: "req-2", path: "/v1/chat/completions", status: "200", ms: "3.29 s" },
  { id: "req-3", path: "/v1/messages", status: "200", ms: "644 ms" },
];

function DocsLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link to="/docs/$" params={{ _splat: "" }} className={className}>
      {children}
    </Link>
  );
}

export function LandingPage() {
  return (
    <div className="ld-root">
      <div className="ld-shell">
        {/* ===================== NAV ===================== */}
        <nav className="ld-nav" aria-label="Primary">
          <div className="ld-logo">
            <span className="ld-logo-text">ld</span>
            <span className="ld-caret" />
          </div>
          <div className="ld-nav-links">
            <Link
              to="/docs/$"
              params={{ _splat: "getting-started/quick-start" }}
              className="ld-nav-link"
            >
              01 / QUICK START
            </Link>
            <Link
              to="/docs/$"
              params={{ _splat: "concepts/architecture" }}
              className="ld-nav-link"
            >
              02 / ARCHITECTURE
            </Link>
            <DocsLink className="ld-nav-link">03 / DOCS</DocsLink>
            <a
              className="ld-nav-link ld-nav-link--accent"
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GITHUB ↗
            </a>
          </div>
        </nav>

        {/* ===================== HERO ===================== */}
        <main className="ld-main">
          <section className="ld-hero">
            {/* left column */}
            <div>
              <div className="ld-statusline">
                <span className="ld-status-item">
                  <span className="ld-dot" />
                  gateway <span className="ld-strong">online</span>
                </span>
                <span className="ld-sep">|</span>
                <span>
                  running <span className="ld-strong">3</span> · peer{" "}
                  <span className="ld-strong">2</span>
                </span>
                <span className="ld-sep">|</span>
                <span>
                  req/s <span className="ld-strong">0.87</span>
                </span>
              </div>
              <div className="ld-eyebrow">LOCAL INFERENCE CONTROL PLANE</div>
              <h1 className="ld-h1 text-balance">
                One control plane for local inference.
              </h1>
              <p className="ld-lede">
                Monitor models, requests, API keys, routing rules, and proxy
                metrics from one dashboard for llama-swap and compatible
                upstreams.
              </p>

              <div className="ld-cta-row">
                <DocsLink className="ld-btn ld-btn--primary">
                  Read the docs →
                </DocsLink>
                <a
                  className="ld-btn ld-btn--ghost"
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    className="ld-btn-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                  Star on GitHub
                </a>
              </div>

              <div className="ld-works">
                <span className="ld-works-label">WORKS WITH</span>
                <span className="ld-strong">OpenAI SDK</span>
                <span className="ld-sep">·</span>
                <span className="ld-strong">Claude Code</span>
                <span className="ld-sep">·</span>
                <span className="ld-strong">Continue</span>
                <span className="ld-sep">·</span>
                <span className="ld-strong">Open WebUI</span>
              </div>
            </div>

            {/* right column: operator dashboard mock */}
            <div className="ld-mock">
              <div className="ld-mock-head">
                <span className="ld-status-item">
                  <span className="ld-mock-dot" />
                  OPERATOR DASHBOARD
                </span>
                <span>2026-04-30 · 22:01</span>
              </div>
              <div className="ld-mock-stats">
                <div className="ld-stat">
                  <div className="ld-stat-label">REQ/S · 1M</div>
                  <div className="ld-stat-value">0.07</div>
                  <svg
                    className="ld-spark"
                    viewBox="0 0 160 26"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <polyline
                      points="0,20 18,16 34,21 52,9 70,17 88,6 106,18 124,11 142,15 160,8"
                      fill="none"
                      stroke="#9b8cf4"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <div className="ld-stat">
                  <div className="ld-stat-label">P50 LATENCY</div>
                  <div className="ld-stat-value">
                    1.83<span className="ld-unit"> s</span>
                  </div>
                  <svg
                    className="ld-spark"
                    viewBox="0 0 160 26"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <polyline
                      points="0,14 18,18 34,10 52,16 70,8 88,15 106,12 124,19 142,9 160,13"
                      fill="none"
                      stroke="#9b8cf4"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
              <div className="ld-mock-section">
                <div className="ld-mock-section-label">
                  MODEL RESIDENCY · 60 MIN
                </div>
                <div className="ld-resid-row">
                  <span className="ld-resid-name">gemma-4-26B</span>
                  <div
                    className="ld-resid-bar"
                    style={{ background: "#a6d785" }}
                  />
                </div>
                <div className="ld-resid-row">
                  <span className="ld-resid-name">kokoro · peer</span>
                  <div
                    className="ld-resid-bar"
                    style={{ background: "var(--line)" }}
                  />
                </div>
                <div className="ld-resid-row">
                  <span className="ld-resid-name">nemotron-3-nano</span>
                  <div
                    className="ld-resid-bar"
                    style={{ background: "#7f8cf4" }}
                  />
                </div>
              </div>
              <div className="ld-mock-foot">
                <div className="ld-mock-section-label">RECENT REQUESTS</div>
                <div className="ld-req-list">
                  {recentRequests.map((r) => (
                    <div className="ld-req-row" key={r.id}>
                      <span>{r.path}</span>
                      <span className="ld-req-meta">
                        <span className="ld-req-ok">● {r.status}</span>
                        <span>{r.ms}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ===================== PIPELINE ===================== */}
          <section className="ld-pipeline">
            <h2 className="ld-section-kicker">REQUEST PIPELINE</h2>
            <div className="ld-pipeline-row">
              <div className="ld-pipe-box">
                <div className="ld-pipe-label">CLIENTS</div>
                <div className="ld-pipe-clients">
                  OpenAI SDK
                  <br />
                  Claude Code
                  <br />
                  Continue · Open WebUI
                </div>
              </div>
              <div className="ld-pipe-arrow">──▶</div>
              <div className="ld-pipe-box ld-pipe-box--mid">
                <div className="ld-pipe-mid-title">
                  llama-dash <span className="ld-accent">:3000</span>
                </div>
                <div className="ld-pipe-mid-sub">
                  dashboard · auth · logs
                  <br />
                  routing · metrics
                </div>
              </div>
              <div className="ld-pipe-arrow">──▶</div>
              <div className="ld-pipe-stack">
                <div className="ld-pipe-mini">
                  <div className="ld-pipe-mini-label">llama-swap :8080</div>
                  <div className="ld-pipe-mini-val">llama.cpp · peers</div>
                </div>
                <div className="ld-pipe-mini">
                  <div className="ld-pipe-mini-label">direct /v1 upstreams</div>
                  <div className="ld-pipe-mini-val">OpenAI · Anthropic</div>
                </div>
              </div>
            </div>
          </section>

          {/* ===================== FEATURES ===================== */}
          <section className="ld-features">
            <h2 className="ld-features-kicker">WHAT IT DOES</h2>
            <div className="ld-feature-grid">
              {features.map((f) => (
                <div className="ld-feature" key={f.code}>
                  <div className="ld-feature-code">{f.code}</div>
                  <div className="ld-feature-title">{f.title}</div>
                  <div className="ld-feature-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* ===================== FOOTER ===================== */}
        <footer className="ld-footer">
          <div className="ld-footer-logo">
            <span className="ld-footer-logo-text">ld</span>
            <span className="ld-footer-caret" />
          </div>
          <div className="ld-footer-meta">
            MIT licensed · self-hosted · OpenAI &amp; Anthropic compatible
          </div>
        </footer>
      </div>
    </div>
  );
}
