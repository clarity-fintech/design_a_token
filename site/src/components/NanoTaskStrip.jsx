import ScrollReveal from "./ScrollReveal.jsx";
import { nanoBlocks } from "../data/content.js";

export default function NanoTaskStrip() {
  return (
    <section id="nanotasks" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="section-kicker">100 nano tasks · CTE001–CTE100</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">
            Moniversive invariant matrix
          </h2>
          <p className="mt-3 max-w-2xl text-clarity-muted">
            Written only in .mis — sealed to CLRTY-1 (1202), Cloudflare edge, and CherryServers VDS
            #939850 under the 399ms hard cap.
          </p>
        </ScrollReveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {nanoBlocks.map((b, i) => (
            <ScrollReveal key={b.id} delay={i * 0.03}>
              <div className="glass-card p-4">
                <p className="font-mono text-[0.65rem] text-clarity-cyan">{b.gate}</p>
                <p className="mt-1 text-sm font-medium text-white">{b.label}</p>
                <p className="mt-1 font-mono text-[0.65rem] text-clarity-muted">tasks {b.id}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
