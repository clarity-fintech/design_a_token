import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal.jsx";
import { useClrty1 } from "../hooks/useClrty1.js";
import { TOKEN_SUPPLY, INFRA, extensionFramework, categories, LINKS } from "../data/content.js";

function CountUp({ value, suffix = "", duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const target = Number(value) || 0;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsShowcase() {
  const mesh = useClrty1();
  const stats = [
    {
      label: "Token Extensions",
      value: extensionFramework.length,
      suffix: "+",
      href: "#extensions",
      hint: "Native protocol capabilities",
    },
    {
      label: "Extension Categories",
      value: categories.length,
      suffix: "",
      href: "#categories",
      hint: "Confidential · Compliance · RWA · AI",
    },
    {
      label: "Nano Tasks",
      value: 100,
      suffix: "",
      href: "#nanotasks",
      hint: "CTE001–CTE100 · .mis invariants",
    },
    {
      label: "CLRTY-1 Tip",
      value: mesh.blockNumber ?? 0,
      suffix: "",
      href: LINKS.rpc,
      hint: mesh.live ? `Live · ${mesh.latencyMs ?? "—"}ms` : "Probing RPC…",
    },
  ];

  return (
    <section id="stats" className="relative px-5 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(135,206,235,0.08),transparent_55%)]" />
      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="section-kicker">Live infrastructure · chain {TOKEN_SUPPLY.chainId}</p>
          <h2 className="display-title mt-4 max-w-3xl text-4xl md:text-6xl">
            All the asset infrastructure you need.
            <span className="block text-gradient">Right where you build.</span>
          </h2>
          <p className="body-copy mt-5 max-w-2xl text-lg">
            Programmable tokens on CLRTY-1 with a {INFRA.latencyCapMs}ms hard cap, fixed{" "}
            {TOKEN_SUPPLY.fixedSupply.toLocaleString()} {TOKEN_SUPPLY.symbol}, and native .mis
            execution — the Moniversive layer for currencies, RWAs, stablecoins, and AI-native assets.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group perfect-frame relative overflow-hidden p-6 transition hover:scale-[1.02]"
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-clarity-muted">
                {s.label}
              </p>
              <p className="mt-4 font-display text-4xl font-bold text-white md:text-5xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-sm text-clarity-muted group-hover:text-clarity-cyan">{s.hint}</p>
              <span className="mt-4 inline-block font-mono text-xs text-clarity-cyan opacity-0 transition group-hover:opacity-100">
                Explore →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
