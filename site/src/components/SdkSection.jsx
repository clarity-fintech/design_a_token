import ScrollReveal from "./ScrollReveal.jsx";
import CodePanel from "./CodePanel.jsx";
import { SDK_PANELS, marketplaceModules, LINKS } from "../data/content.js";

export default function SdkSection() {
  return (
    <section id="sdk" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="section-kicker">Developer flow</p>
          <h2 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl">
            Create a token in minutes
          </h2>
          <p className="mt-4 max-w-2xl text-clarity-muted">
            Using the CLRTY SDK — contractLanguage defaults to .mis. Extensions wire into HELIX,
            MIRRA, compliance, and settlement on chain 1202.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <ScrollReveal>
            <p className="font-mono text-xs text-clarity-muted">npm install @clrty/sdk</p>
            <h3 className="mt-6 font-display text-xl text-white">Token Extension Marketplace</h3>
            <p className="mt-2 text-sm text-clarity-muted">
              Deploy reusable .mis financial modules — a modular financial OS.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {marketplaceModules.map((m) => (
                <li
                  key={m}
                  className="rounded-full border border-clarity-border px-3 py-1 text-xs text-clarity-text"
                >
                  {m}
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-2 text-sm">
              <a href={LINKS.api} className="block text-clarity-cyan hover:underline">
                API Gateway →
              </a>
              <a href={LINKS.rpc} className="block text-clarity-cyan hover:underline">
                RPC mesh →
              </a>
              <a href={LINKS.docs} className="block text-clarity-cyan hover:underline">
                Documentation →
              </a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <CodePanel
              panels={SDK_PANELS}
              toolbar="CLRTY Token Extensions · SDK sandbox · chain 1202"
              defaultTab="create"
              tabKeys={["create", "mis", "transfer", "rpc"]}
              tabBlockIds={{
                create: "sdk-create",
                mis: "sdk-mis",
                transfer: "sdk-transfer",
                rpc: "sdk-rpc",
              }}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
