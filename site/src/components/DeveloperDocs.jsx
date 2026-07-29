import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal.jsx";
import { developerDocs, docTree, clrtyDifference, LINKS } from "../data/content.js";

export default function DeveloperDocs() {
  const [active, setActive] = useState(0);
  const [codeMode, setCodeMode] = useState("mis");
  const page = developerDocs[active];
  const listRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % developerDocs.length);
    }, 14000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setCodeMode("mis");
  }, [active]);

  return (
    <section id="developer-docs" className="relative px-5 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-clarity-cyan/40 to-transparent" />
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="section-kicker">docs.clrty.com/token-extensions · enterprise protocol walkthrough</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            CLRTY-1 <span className="text-gradient">Developer Documentation</span>
          </h2>
          <p className="mt-4 max-w-2xl text-clarity-muted">
            Every major Token Extensions surface is a developer page — architecture, workflow,{" "}
            <span className="text-clarity-cyan">.mis</span> contracts, SDK, API concepts, extension
            dependencies, and enterprise implementation — fully backlinked into the Clarity mesh.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-10 overflow-hidden perfect-frame" delay={0.05}>
          <div className="border-b border-white/10 px-5 py-3">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-clarity-muted">
              Related stack
            </p>
          </div>
          <div className="flex gap-2 overflow-x-auto px-4 py-4">
            {docTree.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="shrink-0 rounded-full border border-clarity-border bg-white/[0.03] px-3 py-1.5 text-xs text-clarity-text transition hover:border-clarity-cyan/50 hover:text-clarity-cyan"
              >
                {n.label}
              </a>
            ))}
          </div>
          <pre className="overflow-x-auto border-t border-white/10 bg-black/50 px-5 py-4 font-mono text-[0.7rem] leading-relaxed text-clarity-cyan/90 md:text-[0.75rem]">
{`CLRTY-1 Core
 ├── Token Extensions
 ├── .mis Language
 ├── HELIX Execution Engine
 ├── CLARITY Skills
 ├── MIRRA Private Markets
 ├── CLRTY PAY
 ├── Agent Registry
 └── Enterprise Infrastructure`}
          </pre>
        </ScrollReveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div ref={listRef} className="flex max-h-[42rem] flex-col gap-1.5 overflow-y-auto pr-1">
            {developerDocs.map((d, i) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setActive(i)}
                className={`flex items-start gap-3 rounded-2xl border px-3.5 py-3 text-left transition ${
                  i === active
                    ? "border-clarity-cyan/55 bg-clarity-cyan/10 shadow-[0_0_48px_-18px_rgba(135,206,235,0.75)]"
                    : "border-clarity-border/70 bg-white/[0.02] hover:border-white/30"
                }`}
              >
                <span className="mt-0.5 font-mono text-[0.65rem] text-clarity-cyan">{d.num}</span>
                <span>
                  <span className="block font-display text-sm font-semibold text-white">{d.title}</span>
                  <span className="mt-0.5 block text-[0.7rem] text-clarity-muted line-clamp-1">
                    {d.kicker}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={page.id}
              id={`doc-${page.id}`}
              initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="clarity-frame overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
                <div>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-clarity-muted">
                    {page.kicker}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-white md:text-2xl">
                    {page.headline}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {page.links.map((l) => (
                    <a
                      key={`${page.id}-${l.label}`}
                      href={l.href}
                      className="rounded-full border border-clarity-border px-3 py-1 text-[0.65rem] text-clarity-cyan transition hover:border-clarity-cyan/50 hover:bg-clarity-cyan/10"
                    >
                      {l.label} →
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-6 p-5 md:p-6">
                <p className="text-sm leading-relaxed text-clarity-muted md:text-base">{page.body}</p>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-clarity-muted">
                      Architecture
                    </p>
                    <pre className="mt-3 overflow-x-auto whitespace-pre-wrap font-mono text-[0.68rem] leading-relaxed text-clarity-cyan/90">
                      {page.architecture}
                    </pre>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-clarity-muted">
                      Developer workflow
                    </p>
                    <ol className="mt-3 space-y-2">
                      {page.workflow.map((w, i) => (
                        <li key={w} className="flex gap-2 text-sm text-clarity-text">
                          <span className="font-mono text-clarity-cyan">{String(i + 1).padStart(2, "0")}</span>
                          <span>{w}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div>
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-clarity-muted">
                    Becomes / capabilities
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {(Array.isArray(page.becomes) ? page.becomes : []).map((b) => (
                      <li
                        key={b}
                        className="rounded-lg border border-clarity-border/80 bg-white/[0.03] px-3 py-1.5 text-xs text-clarity-text"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-black/55 px-4 py-2">
                    <p className="font-mono text-[0.65rem] text-clarity-muted">
                      Interactive code · {page.title}
                    </p>
                    <div className="flex gap-1">
                      {[
                        { id: "mis", label: ".mis" },
                        { id: "sdk", label: "SDK" },
                        { id: "api", label: "API" },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setCodeMode(t.id)}
                          className={`rounded-md px-2.5 py-1 font-mono text-[0.65rem] transition ${
                            codeMode === t.id
                              ? "bg-clarity-cyan/20 text-clarity-cyan"
                              : "text-clarity-muted hover:text-white"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.pre
                      key={`${page.id}-${codeMode}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="max-h-64 overflow-auto bg-black/70 p-4 font-mono text-[0.72rem] leading-relaxed text-clarity-text"
                    >
                      {codeMode === "mis"
                        ? page.mis
                        : codeMode === "sdk"
                          ? page.sdk
                          : page.api}
                    </motion.pre>
                  </AnimatePresence>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-clarity-muted">
                      Extension dependencies
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {page.deps.map((d) => (
                        <li
                          key={d}
                          className="rounded-full border border-clarity-cyan/25 bg-clarity-cyan/5 px-2.5 py-0.5 font-mono text-[0.65rem] text-clarity-cyan"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-clarity-muted">
                      Enterprise example
                    </p>
                    <p className="mt-2 text-sm text-clarity-muted">{page.enterprise}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 px-5 py-3">
                <button
                  type="button"
                  className="text-xs text-clarity-muted transition hover:text-white"
                  onClick={() => setActive((i) => (i - 1 + developerDocs.length) % developerDocs.length)}
                >
                  ← Prev
                </button>
                <div className="flex gap-1">
                  {developerDocs.map((d, i) => (
                    <button
                      key={d.id}
                      type="button"
                      aria-label={`Open ${d.title}`}
                      onClick={() => setActive(i)}
                      className={`h-1.5 rounded-full transition ${
                        i === active ? "w-6 bg-clarity-cyan" : "w-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="text-xs text-clarity-muted transition hover:text-white"
                  onClick={() => setActive((i) => (i + 1) % developerDocs.length)}
                >
                  Next →
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <ScrollReveal className="mt-16 perfect-frame p-6 md:p-10" delay={0.08}>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="section-kicker">Traditional chains</p>
              <ul className="mt-4 space-y-2">
                {clrtyDifference.traditional.map((x) => (
                  <li
                    key={x}
                    className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-clarity-muted"
                  >
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="section-kicker">CLRTY-1</p>
              <p className="mt-2 font-display text-lg text-white">
                Token ={" "}
                <span className="text-gradient">Asset + Logic + Execution + Compliance + System</span>
              </p>
              <ul className="mt-4 space-y-2">
                {clrtyDifference.clrty.map((x) => (
                  <li
                    key={x}
                    className="rounded-lg border border-clarity-cyan/30 bg-clarity-cyan/5 px-3 py-2 font-mono text-xs text-clarity-cyan"
                  >
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 max-w-2xl text-clarity-muted">
            Create. Program. Execute. Settle. Scale.{" "}
            <a href={LINKS.developer} className="text-clarity-cyan hover:underline">
              Build with CLRTY →
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
