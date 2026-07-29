import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal.jsx";
import { extensionFramework } from "../data/content.js";

export default function ExtensionSlideshow() {
  const [index, setIndex] = useState(0);
  const item = extensionFramework[index];

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % extensionFramework.length), 6500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="extensions" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="section-kicker">CLRTY Token Extension Framework</p>
          <h2 className="display-title mt-4 text-4xl md:text-5xl">
            Native programmable functionality for every asset
          </h2>
          <p className="body-copy mt-4 max-w-2xl text-base text-clarity-muted">
            CLRTY-1 enables developers, enterprises, institutions, and financial applications to create
            customized digital assets with native financial functionality embedded directly into the
            token layer — confidential transfers, compliance, fees, RWA, stablecoins, AI agents, HELIX,
            and MIRRA.
          </p>
        </ScrollReveal>

        <div className="mt-10 flex flex-wrap gap-2">
          {extensionFramework.map((ext, i) => (
            <button
              key={ext.id}
              type="button"
              onClick={() => setIndex(i)}
              className={`rounded-full border px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider transition ${
                i === index
                  ? "border-clarity-cyan bg-clarity-cyan/15 text-clarity-cyan"
                  : "border-clarity-border text-clarity-muted hover:border-white/30 hover:text-white"
              }`}
            >
              {ext.title}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              className="shade-panel perfect-frame p-8"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.45 }}
            >
              <h3 className="font-display text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-4 text-clarity-muted">{item.body}</p>
              <ul className="mt-6 space-y-2">
                {item.use.map((u) => (
                  <li key={u} className="flex items-center gap-2 text-sm text-clarity-text">
                    <span className="h-1 w-1 rounded-full bg-clarity-cyan" />
                    {u}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.pre
              key={`${item.id}-code`}
              className="code-panel perfect-frame max-h-[22rem] overflow-auto bg-gradient-to-b from-[#0d0d0d] to-black p-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              {item.code}
            </motion.pre>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
