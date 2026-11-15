import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Copy, Thermometer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gitConfig } from "@/lib/shared";
import "./landing.css";

const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;
const quickStart = "getting-started/quick-start";
const features = [
  [
    "D01",
    "Watch the box",
    "Live requests, tokens, upstreams and GPU status on one dashboard, with model residency over time.",
  ],
  [
    "S01",
    "Audit sessions",
    "Claude Code and Codex sessions as readable timelines with paired tool calls and per-step cost.",
    true,
  ],
  [
    "Y01",
    "Read the hardware",
    "CPU, GPU, thermals and unified memory broken down per loaded model.",
    true,
  ],
  [
    "M05",
    "Manage models",
    "Load, unload and inspect per-model stats. Edit llama-swap config with validation.",
  ],
  [
    "R02",
    "Track requests",
    "Searchable history with filters, histograms, token counts and cost estimates.",
  ],
  [
    "K08",
    "Control access",
    "Hashed API keys, per-key RPM/TPM limits and model allow-lists.",
  ],
  [
    "P10",
    "Enforce policy",
    "Routing rules for model rewrites, passthrough auth and encrypted upstream credentials.",
  ],
  [
    "P06",
    "Test models",
    "Playgrounds for chat, image, speech and article-to-speech transcription.",
  ],
] as const;

function DocsLink({
  children,
  className,
  path = "",
}: {
  children: React.ReactNode;
  className?: string;
  path?: string;
}) {
  return (
    <Link to="/docs/$" params={{ _splat: path }} className={className}>
      {children}
    </Link>
  );
}
function GitHubStar() {
  return (
    <svg
      className="ld-hero-star"
      width="13"
      height="13"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 .25a.75.75 0 0 1 .673.417l2.043 4.14 4.568.664a.75.75 0 0 1 .416 1.279l-3.305 3.222.78 4.55a.75.75 0 0 1-1.088.79L8 13.164l-4.087 2.148a.75.75 0 0 1-1.088-.79l.78-4.55L.3 6.75a.75.75 0 0 1 .416-1.279l4.568-.664L7.327.667A.75.75 0 0 1 8 .25Z" />
    </svg>
  );
}
function Logo() {
  return (
    <span className="ld-logo">
      <span>ld</span>
      <span className="ld-caret" />
    </span>
  );
}
function Kicker({ children }: { children: React.ReactNode }) {
  return <div className="ld-kicker">{children}</div>;
}
function useCopyFeedback() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  function reset() {
    clearTimeout(timer.current);
    setStatus("idle");
  }
  async function copy(text: string) {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2000);
  }
  return { status, copy, reset };
}
function CodeBlock({
  children,
  text,
  label,
}: {
  children: React.ReactNode;
  text: string;
  label: string;
}) {
  const { status, copy } = useCopyFeedback();
  return (
    <div className="ld-code-block">
      {/* biome-ignore lint/a11y/useSemanticElements: A named, focusable scroll region allows keyboard scrolling of code. */}
      {/* biome-ignore lint/a11y/noNoninteractiveTabindex: The code region needs keyboard scrolling. */}
      <pre role="region" tabIndex={0} aria-label={`${label} code`}>
        {children}
      </pre>
      <div className="ld-code-copy-wrap">
        <button
          type="button"
          className="ld-code-copy"
          aria-label={`Copy ${label} commands`}
          onClick={() => copy(text)}
        >
          {status === "copied" ? (
            <Check size={15} aria-hidden="true" />
          ) : (
            <Copy size={15} aria-hidden="true" />
          )}
        </button>
        <span className="ld-copy-status" role="status">
          {status === "copied"
            ? "Copied"
            : status === "error"
              ? "Copy failed"
              : ""}
        </span>
      </div>
    </div>
  );
}
function Install() {
  const [vendor, setVendor] = useState<"amd" | "nvidia">("amd");
  const { status: copyStatus, copy, reset } = useCopyFeedback();
  const commands = `git clone https://github.com/ndom91/llama-dash.git && cd llama-dash\ndocker compose -f docker-compose.${vendor}.yaml up -d`;
  return (
    <div className="ld-install">
      <div className="ld-install-head">
        <div className="ld-vendors">
          {(["amd", "nvidia"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={vendor === v}
              className={vendor === v ? "active" : ""}
              onClick={() => {
                setVendor(v);
                reset();
              }}
            >
              {v.toUpperCase()}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="ld-copy"
          onClick={() => copy(commands)}
          aria-label="Copy install commands"
        >
          {copyStatus === "copied" ? (
            <Check size={15} aria-hidden="true" />
          ) : (
            <Copy size={15} aria-hidden="true" />
          )}
        </button>
        <span className="ld-install-copy-status" role="status">
          {copyStatus === "copied"
            ? "Copied"
            : copyStatus === "error"
              ? "Copy failed"
              : ""}
        </span>
      </div>
      {/* biome-ignore lint/a11y/useSemanticElements: A named, focusable scroll region allows keyboard scrolling of code. */}
      {/* biome-ignore lint/a11y/noNoninteractiveTabindex: The code region needs keyboard scrolling. */}
      <pre role="region" tabIndex={0} aria-label="Install commands">
        <span>$</span> git clone https://github.com/ndom91/llama-dash.git
        &amp;&amp; cd llama-dash{"\n"}
        <span>$</span> docker compose -f docker-compose.{vendor}.yaml up -d
        {"\n"}
        <i># → http://localhost:3000</i>
      </pre>
    </div>
  );
}
function Stat({
  label,
  value,
  unit,
  amber = false,
  width = "45%",
}: {
  label: string;
  value: string;
  unit?: string;
  amber?: boolean;
  width?: string;
}) {
  return (
    <div className="ld-stat">
      <div className="ld-stat-label">{label}</div>
      <div className={amber ? "ld-stat-value amber" : "ld-stat-value"}>
        {value}
        <small>{unit}</small>
      </div>
      <div className="ld-meter">
        <span style={{ width, background: amber ? "#dda655" : undefined }} />
      </div>
    </div>
  );
}
function Dashboard() {
  const models = [
    ["gemma-4-26B-A4B", "ready", "47m"],
    ["embeddinggemma-2", "ready", "60m"],
    ["kokoro", "peer", "—"],
    ["qwen3.6-coder-30B", "idle", "—"],
  ];
  return (
    <div className="ld-window ld-dashboard">
      <div className="ld-window-head">
        <span className="ld-dot" />
        <span className="ld-window-tab active">DASHBOARD</span>
        <span className="ld-window-tab">SESSIONS</span>
        <span className="ld-window-tab">SYSTEM</span>
        <time>2026-11-15 · 22:01</time>
      </div>
      <div className="ld-window-body">
        <div className="ld-stats">
          <Stat label="REQ/S" value="0.87" />
          <Stat label="P50" value="1.83" unit=" s" />
          <Stat label="GPU" value="72" unit="%" amber width="72%" />
          <Stat label="MEMORY" value="22.8" unit="/ 48 GiB" width="48%" />
        </div>
        <div className="ld-mini-heading">
          MODELS · RESIDENCY 60M <span>2 running · 1 peer</span>
        </div>
        <div className="ld-models">
          {models.map(([name, state, time], i) => (
            <div className={`ld-model ld-model-${i}`} key={name}>
              <span className="ld-model-dot" />
              <span className="ld-model-name">{name}</span>
              <span className="ld-model-state">{state}</span>
              <span className="ld-track">
                <span />
              </span>
              <span>{time}</span>
            </div>
          ))}
        </div>
        <div className="ld-mini-heading">
          RECENT REQUESTS <span>view all →</span>
        </div>
        <div className="ld-requests">
          {[
            ["/v1/messages", "claude-code", "950 ms"],
            ["/v1/responses", "codex", "3.29 s"],
            ["/v1/embeddings", "open-webui", "218 ms"],
          ].map(([path, client, latency]) => (
            <div key={path}>
              <span>
                {path} <em>{client}</em>
              </span>
              <span>
                <b>● 200</b> {latency}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function Bullet({
  glyph,
  title,
  children,
}: {
  glyph: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="ld-bullet">
      <span className="ld-glyph">{glyph}</span>
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}
function SessionCard() {
  return (
    <div className="ld-window ld-session-card">
      <div className="ld-session-head">
        <span>
          Deny .ssh/ and .aws/ in Claude settings.json <b>claude-code</b>
        </span>
        <span>20 req · 45m · $1.61</span>
      </div>
      <div className="ld-session-row">
        <div className="ld-session-meta">
          <strong>#4</strong>
          <br />
          11:32:09
          <br />
          <span className="ld-session-timing">
            <b>200</b> · 7.45s
          </span>
          <span className="ld-session-progress">
            <span style={{ width: "35%" }} />
          </span>
          4.8k / 218
          <br />
          cache 78%
        </div>
        <div className="ld-entries">
          <div>
            <span className="ld-entry-icon ld-entry-sent">↳</span>
            <small>SENT</small> <em>exec</em> · result of #3 &nbsp; cat
            package.json <i>42 lines</i>
          </div>
          <div>
            <span className="ld-entry-icon ld-entry-thinking">∴</span>
            <small>THINKING</small> · 0 tok · encrypted
          </div>
          <div>
            <span className="ld-entry-icon ld-entry-assistant">●</span>
            <small>ASSISTANT</small>
            <p className="ld-entry-body">
              The backend already supports filters at two levels: the chat
              widget and each metric within it.
            </p>
          </div>
          <div>
            <span className="ld-entry-icon violet">$</span>
            <small>TOOL</small> <em>exec</em> &nbsp; cat
            ~/.plugin-manager/SKILL.md <i className="green">exit 0</i>
            <p className="ld-tool-body">
              name: plugin-management
              <br />
              description: Discover, install and inspect Codex plugins…
            </p>
          </div>
        </div>
      </div>
      <div className="ld-session-row">
        <div className="ld-session-meta">
          <strong>#5</strong>
          <br />
          11:32:18
          <br />
          <span className="ld-session-timing">
            <b>200</b> · 2.32s
          </span>
          <span className="ld-session-progress">
            <span style={{ width: "18%" }} />
          </span>
          4.8k / 251
          <br />
          cache 83%
        </div>
        <div className="ld-entries">
          <div>
            <span className="ld-entry-icon ld-entry-sent">↳</span>
            <small>SENT</small> <em>exec</em> · result of #4 &nbsp; cat
            ~/.SKILL.md
          </div>
          <div>
            <span className="ld-entry-icon violet">$</span>
            <small>TOOL</small> <em>exec</em> &nbsp; ls /home/claude · +2 more{" "}
            <i className="green">exit 0</i>
          </div>
        </div>
      </div>
    </div>
  );
}
function SystemCard() {
  return (
    <div className="ld-window ld-system-card">
      <div className="ld-stats">
        <Stat label="CPU" value="9" unit="%" width="9%" />
        <Stat label="GPU · 91°C" value="72" unit="%" amber width="72%" />
        <Stat label="GPU MEMORY" value="22.8" unit="/ 48" />
        <Stat label="SYSTEM RAM" value="31.4" unit="/ 128" width="25%" />
      </div>
      <div className="ld-mini-heading">
        UTILIZATION · 15M{" "}
        <span>
          <b className="green">— GPU</b> &nbsp; <b className="purple">— CPU</b>
        </span>
      </div>
      <svg
        className="ld-chart"
        viewBox="0 0 600 110"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 100 L20 96 40 102 60 97 80 101 100 94 110 12 120 20 145 18 160 15 175 65 195 90 220 98 260 99 280 95 295 100 305 25 315 18 325 20 335 62 355 85 380 96 420 99 450 97 470 22 480 18 505 20 520 17 540 22 550 18 565 65 585 91 600 98 L600 110 L0 110Z"
          fill="rgba(44,230,140,.08)"
          stroke="#2ce68c"
          strokeWidth="1.5"
        />
        <path
          d="M0 104 L20 100 40 106 60 101 80 105 100 103 120 96 140 100 160 91 180 100 200 105 220 101 240 104 260 98 280 104 300 99 320 105 340 96 360 103 380 100 400 105 420 101 440 105 460 100 480 96 500 99 520 98 540 100 560 104 580 102 600 105"
          fill="none"
          stroke="#9b8cf4"
          strokeWidth="1.5"
        />
      </svg>
      <div className="ld-mini-heading">
        UNIFIED MEMORY · 127 GIB SHARED <span>73.1 GiB free</span>
      </div>
      <div className="ld-memory-bar">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="ld-legend">
        <span>
          gemma-4-26B-A4B <b>17.9 GiB</b>
        </span>
        <span>
          embeddinggemma-2 <b>1.2 GiB</b>
        </span>
        <span>
          llama-swap overhead <b>2.7 GiB</b>
        </span>
        <span>
          other processes <b>25.2 GiB</b>
        </span>
      </div>
    </div>
  );
}
export function LandingPage() {
  return (
    <div className="ld-root">
      <div className="ld-shell">
        <nav className="ld-nav" aria-label="Primary">
          <a href="/" aria-label="llama-dash home">
            <Logo />
          </a>
          <div className="ld-nav-links">
            <DocsLink path={quickStart}>01 / QUICK START</DocsLink>
            <a href="#sessions">02 / SESSIONS</a>
            <DocsLink path="concepts/architecture">03 / ARCHITECTURE</DocsLink>
            <DocsLink>04 / DOCS</DocsLink>
            <a className="green" href={githubUrl}>
              GITHUB ↗
            </a>
          </div>
        </nav>
      </div>
      <main>
        <section className="ld-section ld-hero">
          <div className="ld-shell ld-hero-grid">
            <div>
              <div className="ld-statusline">
                <span>
                  <span className="ld-dot" /> gateway online
                </span>
                <span>running 3 · peer 2</span>
                <span>req/s 0.87</span>
              </div>
              <Kicker>LOCAL INFERENCE CONTROL PLANE</Kicker>
              <h1>
                One control plane
                <br />
                for <span>local inference.</span>
              </h1>
              <p className="ld-lede">
                Monitor models, requests, API keys, routing rules and GPU
                telemetry for llama-swap and compatible upstreams, and{" "}
                <strong>audit every Claude Code or Codex session</strong> that
                runs through it.
              </p>
              <div className="ld-actions">
                <DocsLink className="ld-btn ld-primary">
                  Read the docs{" "}
                  <ArrowRight
                    className="ld-hero-arrow"
                    size={16}
                    aria-hidden="true"
                  />
                </DocsLink>
                <a className="ld-btn ld-secondary" href={githubUrl}>
                  Star on GitHub <GitHubStar />
                </a>
              </div>
              <Install />
              <div className="ld-works">
                <span>WORKS WITH</span>
                {[
                  "OpenAI SDK",
                  "Claude Code",
                  "Codex",
                  "opencode",
                  "Open WebUI",
                ].map((x) => (
                  <span className="ld-chip" key={x}>
                    {x}
                  </span>
                ))}
              </div>
            </div>
            <Dashboard />
          </div>
        </section>
        <section className="ld-section" id="sessions">
          <div className="ld-shell ld-split">
            <div className="ld-section-copy">
              <Kicker>
                02 / SESSIONS <span className="ld-new">new</span>
              </Kicker>
              <h2>Audit every agent session.</h2>
              <p>
                Point Claude Code or Codex at llama-dash, and every request that
                shares a session id becomes one readable timeline. You see what
                the agent sent, what came back, and what it cost.
              </p>
              <div className="ld-bullets">
                <Bullet glyph="↳" title="Only what's new">
                  Each request is diffed against the last one. Repeated system
                  prompts and reminders collapse into pills with token counts.
                </Bullet>
                <Bullet glyph="$" title="Tool calls, paired">
                  Commands are parsed out of the payload and joined to their
                  results across requests, with exit codes and run time.
                </Bullet>
                <Bullet glyph="∴" title="Per-request cost and cache">
                  Latency, Δ tokens, cache hit rate and context compaction for
                  every step.
                </Bullet>
              </div>
            </div>
            <SessionCard />
          </div>
        </section>
        <section className="ld-section">
          <div className="ld-shell ld-split ld-system">
            <SystemCard />
            <div className="ld-section-copy">
              <Kicker>03 / SYSTEM</Kicker>
              <h2>Know what the box is doing.</h2>
              <p>
                CPU, GPU, memory and thermals live next to the models that use
                them. That holds on unified-memory machines like Strix Halo too,
                where “VRAM” and RAM are the same pool.
              </p>
              <div className="ld-bullets">
                <Bullet glyph="▣" title="Memory by model">
                  See what each loaded model costs in weights and KV cache, and
                  whether the next one fits.
                </Bullet>
                <Bullet
                  glyph={<Thermometer size={16} aria-hidden="true" />}
                  title="Thermals and thresholds"
                >
                  Utilization, temperature and power over time, with alerts when
                  a limit is crossed.
                </Bullet>
                <Bullet glyph="⇄" title="Swaps on the timeline">
                  Model loads and unloads show up on the same charts, so a
                  latency spike has a visible cause.
                </Bullet>
              </div>
            </div>
          </div>
        </section>
        <section className="ld-section" id="architecture">
          <div className="ld-shell">
            <Kicker>04 / HOW IT FITS</Kicker>
            <h2>One entry point in front of everything.</h2>
            <p className="ld-section-lede">
              llama-dash sits between your clients and llama-swap, so every
              request is authenticated, routed, logged and measured in one
              place. llama-swap itself is never exposed.
            </p>
            <div className="ld-pipeline">
              <div className="ld-pipe-box">
                <small>CLIENTS</small>Claude Code · Codex
                <br />
                OpenAI SDK · opencode
                <br />
                Open WebUI
              </div>
              <span className="ld-arrow">→</span>
              <div className="ld-pipe-box ld-pipe-main">
                llama-dash <b>:3000</b>
                <br />
                <span>
                  auth · routing · policies
                  <br />
                  logs · sessions · metrics
                </span>
              </div>
              <span className="ld-arrow">→</span>
              <div className="ld-pipe-stack">
                <div className="ld-pipe-box">
                  <small>LLAMA-SWAP · INTERNAL</small>llama.cpp · peers
                </div>
                <div className="ld-pipe-box">
                  <small>DIRECT /V1 UPSTREAMS</small>OpenAI · Anthropic
                </div>
              </div>
            </div>
            <div className="ld-steps">
              <article>
                <Kicker>STEP 1</Kicker>
                <h3>Clone and configure</h3>
                <p>
                  Copy the example environment and model config. Set an auth
                  secret and configure your model.
                </p>
                <CodeBlock
                  label="Clone and configure"
                  text={
                    "git clone https://github.com/ndom91/llama-dash.git\ncd llama-dash\ncp .env.example .env\ncp config/config.example.yaml config/config.yaml"
                  }
                >
                  <span>$</span> git clone
                  https://github.com/ndom91/llama-dash.git{"\n"}
                  <span>$</span> cd llama-dash{"\n"}
                  <span>$</span> cp .env.example .env{"\n"}
                  <span>$</span> cp config/config.example.yaml
                  config/config.yaml{"\n"}
                  <i># Set BETTER_AUTH_SECRET: openssl rand -base64 33</i>
                </CodeBlock>
              </article>
              <article>
                <Kicker>STEP 2</Kicker>
                <h3>Start the stack</h3>
                <p>Pick the compose file for your GPU. Images are prebuilt.</p>
                <CodeBlock
                  label="Start the stack"
                  text={
                    "docker compose -f docker-compose.amd.yaml pull\ndocker compose -f docker-compose.amd.yaml up -d"
                  }
                >
                  <span>$</span> docker compose -f docker-compose.amd.yaml pull
                  {"\n"}
                  <span>$</span> docker compose -f docker-compose.amd.yaml up -d
                  {"\n"}
                  <i># or use docker-compose.nvidia.yaml</i>
                </CodeBlock>
              </article>
              <article>
                <Kicker>STEP 3</Kicker>
                <h3>Point your clients at it</h3>
                <p>Create a key in the dashboard, then swap the base URL.</p>
                <CodeBlock
                  label="Point your clients at it"
                  text={
                    "export ANTHROPIC_BASE_URL=http://localhost:3000\nexport OPENAI_BASE_URL=http://localhost:3000/v1"
                  }
                >
                  <span>$</span> export ANTHROPIC_BASE_URL=http://localhost:3000
                  {"\n"}
                  <span>$</span> export OPENAI_BASE_URL=http://localhost:3000/v1
                </CodeBlock>
              </article>
            </div>
          </div>
        </section>
        <section className="ld-section">
          <div className="ld-shell">
            <Kicker>05 / WHAT IT DOES</Kicker>
            <h2>Everything else you'd otherwise script.</h2>
            <div className="ld-feature-grid">
              {features.map(([code, title, desc, isNew]) => (
                <article className="ld-feature" key={code}>
                  <div className="ld-feature-top">
                    <span>{code}</span>
                    {isNew && <span className="ld-new">new</span>}
                  </div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              ))}
            </div>
            <div className="ld-final">
              <div>
                <h2>Run it on your box tonight.</h2>
                <p>
                  MIT licensed and self-hosted. Two compose commands and you're
                  live on :3000.
                </p>
              </div>
              <div className="ld-actions">
                <DocsLink path={quickStart} className="ld-btn ld-primary">
                  Quick start{" "}
                  <ArrowRight
                    className="ld-hero-arrow"
                    size={16}
                    aria-hidden="true"
                  />
                </DocsLink>
                <a className="ld-btn ld-secondary" href={githubUrl}>
                  Star on GitHub <GitHubStar />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="ld-shell">
        <footer className="ld-footer">
          <Logo />
          <div>
            MIT licensed · self-hosted · OpenAI &amp; Anthropic compatible ·{" "}
            <DocsLink>docs</DocsLink> · <a href={githubUrl}>github ↗</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
