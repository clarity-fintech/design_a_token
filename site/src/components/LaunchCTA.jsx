import { CTA_MAP } from "../data/ctaMap.js";
import Clrty1Link from "./Clrty1Link.jsx";

const steps = ["Create", "Program", "Execute", "Settle", "Scale"];

export default function LaunchCTA() {
  return (
    <section id="launch" className="px-5 py-28">
      <div className="mx-auto max-w-4xl text-center">
        <p className="section-kicker">Launch your asset on CLRTY-1</p>
        <h2 className="display-title mt-4 text-4xl md:text-6xl">
          Not just tokens.
          <br />
          <span className="text-gradient">Programmable economic infrastructure.</span>
        </h2>
        <p className="body-copy mx-auto mt-6 max-w-xl text-base md:text-lg">
          Every CTA below routes into CLRTY-1 settlement (network=clrty-1 · chainId=1202) — wallet,
          developer, enterprise, legal, explorer, and the full connect mesh.
        </p>
        <div className="mx-auto mt-10 flex flex-wrap justify-center gap-2">
          {steps.map((s) => (
            <span
              key={s}
              className="rounded-full border border-clarity-cyan/30 bg-clarity-cyan/5 px-4 py-2 font-tomorrow text-[0.65rem] uppercase tracking-[0.18em] text-clarity-cyan"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Clrty1Link
            href={CTA_MAP.build_with_clrty}
            surface="developer"
            className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-clarity-bg transition hover:scale-[1.03]"
          >
            Build with CLRTY
          </Clrty1Link>
          <a
            href={CTA_MAP.protocol_walkthrough || "#developer-docs"}
            className="rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/5"
          >
            Protocol walkthrough
          </a>
          <Clrty1Link
            href={CTA_MAP.enterprise}
            surface="enterprise"
            className="rounded-full border border-clarity-cyan/40 bg-clarity-cyan/10 px-8 py-4 text-sm font-semibold text-clarity-cyan transition hover:bg-clarity-cyan/20"
          >
            Enterprise
          </Clrty1Link>
          <Clrty1Link
            href={CTA_MAP.create_wallet}
            surface="wallet"
            className="rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/5"
          >
            Create Wallet
          </Clrty1Link>
          <Clrty1Link
            href={CTA_MAP.explorer}
            surface="explorer"
            className="rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/5"
          >
            Explorer
          </Clrty1Link>
          <Clrty1Link
            href={CTA_MAP.legal}
            surface="legal"
            className="rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/5"
          >
            Legal hub
          </Clrty1Link>
          <a
            href="#clrty1-routing"
            className="rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/5"
          >
            CLRTY-1 routes
          </a>
          <a
            href={CTA_MAP.connect_mesh || "#connect"}
            className="rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/5"
          >
            Full connect mesh
          </a>
        </div>
      </div>
    </section>
  );
}
