import ScrollReveal from "./ScrollReveal.jsx";
import { assetTypes } from "../data/content.js";

export default function Thesis() {
  return (
    <section id="thesis" className="px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="section-kicker">One blockchain · unlimited asset infrastructure</p>
          <h2 className="display-title mt-4 max-w-3xl text-4xl md:text-6xl">
            Tokens built for <span className="text-gradient">real financial systems</span>
          </h2>
          <p className="body-copy mt-6 max-w-2xl text-lg">
            Traditional tokens represent ownership. CLRTY tokens represent programmable economic
            infrastructure — behavior defined at the CLRTY-1 protocol layer through .mis contracts.
            Every token can become a payment system, financial instrument, automated agreement,
            institutional asset, or AI-enabled economic object.
          </p>
          <p className="body-copy mt-4 max-w-2xl text-base text-clarity-muted">
            Instead of deploying external smart contracts, CLRTY Token Extensions let creators define
            asset behavior directly: ownership rules, transfer logic, execution conditions,
            compliance requirements, financial behavior, and autonomous capabilities — all written
            in .mis, the financial-native language of CLRTY-1.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {assetTypes.map((t, i) => (
            <ScrollReveal key={t} delay={i * 0.04}>
              <div className="glass-card px-4 py-5 text-center font-tomorrow text-[0.7rem] uppercase tracking-[0.14em] text-clarity-mist">
                {t}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-16 perfect-frame p-8 md:p-12" delay={0.1}>
          <p className="section-kicker">.mis contract framework</p>
          <h3 className="display-title mt-3 text-2xl md:text-3xl">The token becomes the system</h3>
          <p className="body-copy mt-4 max-w-2xl text-base text-clarity-muted">
            .mis replaces traditional contract languages with a financial-native programming
            environment designed for programmable assets, institutional controls, autonomous systems,
            compliance frameworks, and capital infrastructure. Creators define how assets move,
            settle, generate value, interact with markets, enforce compliance, and execute financial
            operations — directly at the CLRTY-1 protocol layer.
          </p>
          <ul className="mt-6 grid gap-2 text-sm text-clarity-text sm:grid-cols-2 md:grid-cols-3">
            {[
              "move",
              "settle",
              "generate value",
              "interact with markets",
              "enforce compliance",
              "execute financial operations",
            ].map((x) => (
              <li
                key={x}
                className="rounded-lg border border-clarity-border/80 bg-black/30 px-3 py-2 font-tomorrow text-[0.65rem] uppercase tracking-[0.16em] text-clarity-cyan"
              >
                {x}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
