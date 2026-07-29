import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn } from "./ScrollReveal.jsx";
import { heroSlides, TOKEN_SUPPLY, INFRA } from "../data/content.js";
import { CTA_MAP } from "../data/ctaMap.js";
import Clrty1Link from "./Clrty1Link.jsx";
import { useClrty1 } from "../hooks/useClrty1.js";

const logo = `${import.meta.env.BASE_URL}clarity-logo.png`;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const mesh = useClrty1();

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 5200);
    return () => clearInterval(id);
  }, []);

  const slide = heroSlides[index];

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-20 pt-2 md:pb-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-0" aria-hidden="true">
        <motion.div
          className="absolute left-1/2 top-[-10%] h-[70vh] w-[120vw] -translate-x-1/2 rounded-[50%] bg-clarity-cyan/15 blur-[140px]"
          animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-20%] right-[-10%] h-[50vh] w-[60vw] rounded-full bg-clarity-violet/20 blur-[120px]"
          animate={{ x: [0, -40, 0], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#05070b_72%)]" />
        <div className="absolute inset-0 bg-grid-fade opacity-30" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <FadeIn>
          <img
            src={logo}
            alt="CLARITY"
            className="mx-auto h-14 w-auto brightness-0 invert md:h-16"
            width={200}
            height={130}
          />
          <p className="section-kicker mt-8" id="build-badge">
            BUILD: CLRTY Token Extensions · .mis · chain {TOKEN_SUPPLY.chainId}
          </p>
          <h1 className="display-title mt-6 text-[clamp(2.75rem,10vw,6.5rem)] leading-[0.92]">
            <span className="text-gradient">CLARITY</span>
            <br />
            Tokens
          </h1>
          <p className="display-title mt-5 text-[clamp(1.35rem,3.4vw,2.25rem)] text-clarity-mist/95">
            Create Any Digital Asset.
            <span className="block text-clarity-cyan">Everywhere on CLRTY-1.</span>
          </p>
          <p className="mt-4 font-tomorrow text-[0.7rem] uppercase tracking-[0.28em] text-clarity-cyan">
            Programmable assets · .mis · protocol-native
          </p>

          <div className="mx-auto mt-8 min-h-[7.5rem] max-w-4xl md:min-h-[8.5rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                id="hero-slideshow"
                initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -28, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="display-title text-[clamp(1.6rem,4.6vw,3rem)] leading-[1.08] text-clarity-ink">
                  {slide.line1}
                  <br />
                  {slide.line2}
                  <br />
                  <span className="text-clarity-cyan">{slide.line3}</span>
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <p id="hero-subtitle" className="body-copy mx-auto mt-6 max-w-2xl text-lg md:text-xl">
            Built with .mis — the native contract language for programmable financial infrastructure
            on CLRTY-1. Define ownership, transfer logic, compliance, settlement, and autonomous
            behavior directly in the token layer — not as bolted-on external contracts.
          </p>
        </FadeIn>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55 }}
        >
          <a
            href={CTA_MAP.explore_extensions || "#extensions"}
            className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-clarity-bg transition hover:scale-[1.03] hover:shadow-[0_0_40px_-8px_rgba(34,190,246,0.8)]"
          >
            Explore extensions
          </a>
          <Clrty1Link
            href={CTA_MAP.connect_clrty1}
            surface="rpc"
            className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-clarity-cyan/60 hover:bg-white/5"
          >
            Connect CLRTY-1
          </Clrty1Link>
          <a
            href={CTA_MAP.open_sdk || "#sdk"}
            className="rounded-full border border-clarity-cyan/50 bg-clarity-cyan/10 px-7 py-3.5 text-sm font-semibold text-clarity-cyan transition hover:bg-clarity-cyan/20"
          >
            Open SDK
          </a>
          <Clrty1Link
            href={CTA_MAP.create_wallet}
            surface="wallet"
            className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/5"
          >
            Create Wallet
          </Clrty1Link>
          <Clrty1Link
            href={CTA_MAP.explorer}
            surface="explorer"
            className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/5"
          >
            Explorer
          </Clrty1Link>
          <a
            href="#clrty1-routing"
            className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/5"
          >
            All routes
          </a>
        </motion.div>

        <div className="mt-10 flex justify-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Hero slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-9 bg-clarity-cyan" : "w-3 bg-white/25 hover:bg-white/45"
              }`}
            />
          ))}
        </div>

        <p
          id="hero-latency-watchdog"
          className="mt-10 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-clarity-muted"
          aria-live="polite"
        >
          {mesh.live ? "LIVE" : "STANDBY"} · chain {mesh.chainId ?? TOKEN_SUPPLY.chainId} ·{" "}
          {mesh.latencyMs != null ? `${mesh.latencyMs}ms RPC` : `${INFRA.latencyCapMs}ms hard cap`} ·{" "}
          {TOKEN_SUPPLY.fixedSupply.toLocaleString()} {TOKEN_SUPPLY.symbol} fixed supply
        </p>
      </div>
    </section>
  );
}
