import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal.jsx";
import { walkthroughs, hashTraceNote } from "../data/content.js";

export default function WalkthroughSection() {
  const [active, setActive] = useState(0);
  const step = walkthroughs[active];

  return (
    <section id="walkthroughs" className="px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="section-kicker">Coding walkthroughs · full mesh backlinks</p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            From <span className="text-gradient">.mis</span> to CLRTY-1
          </h2>
          <p className="mt-4 max-w-2xl text-clarity-muted">
            Six production steps — author, extend, mint, probe, settle institutionally, and index
            into database E plus Google, Bing, and Yandex.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col gap-2">
            {walkthroughs.map((w, i) => (
              <button
                key={w.id}
                type="button"
                onClick={() => setActive(i)}
                className={`group flex items-start gap-4 rounded-2xl border px-4 py-4 text-left transition ${
                  i === active
                    ? "border-clarity-cyan/50 bg-clarity-cyan/10 shadow-[0_0_40px_-16px_rgba(135,206,235,0.7)]"
                    : "border-clarity-border bg-white/[0.02] hover:border-white/25"
                }`}
              >
                <span className="font-mono text-xs text-clarity-cyan">{w.step}</span>
                <span>
                  <span className="block font-display text-base font-semibold text-white">{w.title}</span>
                  <span className="mt-1 block text-xs text-clarity-muted line-clamp-2">{w.summary}</span>
                </span>
              </button>
            ))}
          </div>

          <ScrollReveal key={step.id} delay={0.05}>
            <div className="clarity-frame overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-clarity-muted">
                  Step {step.step} · {step.title}
                </p>
                <div className="flex flex-wrap gap-2">
                  {step.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      className="rounded-full border border-clarity-border px-3 py-1 text-[0.65rem] text-clarity-cyan transition hover:border-clarity-cyan/50 hover:bg-clarity-cyan/10"
                    >
                      {l.label} →
                    </a>
                  ))}
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.pre
                  key={step.id}
                  id={`walkthrough-${step.id}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="max-h-[28rem] overflow-auto bg-black/55 p-5 font-mono text-[0.75rem] leading-relaxed text-clarity-text md:text-[0.8rem]"
                >
                  {step.code}
                </motion.pre>
              </AnimatePresence>
              <p className="border-t border-white/10 px-5 py-4 text-sm text-clarity-muted">{step.summary}</p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-12 perfect-frame p-6 md:p-8" delay={0.08}>
          <p className="section-kicker">{hashTraceNote.title}</p>
          <p className="mt-3 max-w-3xl text-clarity-muted">{hashTraceNote.body}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {hashTraceNote.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-clarity-border bg-white/[0.03] px-3 py-1 font-mono text-[0.65rem] text-clarity-cyan"
              >
                {t}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
