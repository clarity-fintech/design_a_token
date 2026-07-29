import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal.jsx";
import { useClrty1 } from "../hooks/useClrty1.js";
import { CLRTY1, CLRTY1_ROUTES, clrty1RouteList, routeToClrty1 } from "../data/clrty1Routing.js";

export default function Clrty1RoutingPanel() {
  const mesh = useClrty1();
  const routes = clrty1RouteList();

  return (
    <section id="clrty1-routing" className="border-y border-clarity-border px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="section-kicker">CLRTY-1 ONLY · settlement {CLRTY1.network} / {CLRTY1.chainId} / {CLRTY1.chainIdHex}</p>
          <h2 className="display-title mt-3 text-3xl md:text-5xl">
            All routes settle on <span className="text-gradient">CLRTY-1</span>
          </h2>
          <p className="body-copy mt-4 max-w-3xl text-base">
            Every Token Extensions surface — RPC tip, API gateway, Explorer SCOPE, Browser HUD, wallet,
            exchange, HELIX, MIRRA, and PAY — wires into CLRTY-1 only (chain{" "}
            {CLRTY1.chainId} / {CLRTY1.chainIdHex}). Never any other chain.
            {mesh.live ? " · LIVE" : mesh.refusedForeignChain ? " · REFUSED foreign chain" : " · probing"}
            {mesh.latencyMs != null ? ` · ${mesh.latencyMs}ms` : ""}.
          </p>
          {mesh.refusedForeignChain && (
            <p className="mt-3 font-mono text-sm text-red-400">
              {mesh.error || "REFUSED: foreign chain detected — CLRTY-1 only"}
            </p>
          )}
        </ScrollReveal>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Settlement", v: CLRTY1.network },
            { k: "Chain ID", v: String(mesh.chainId ?? CLRTY1.chainId) },
            { k: "Hex", v: CLRTY1.chainIdHex },
            { k: "Tip", v: mesh.blockNumber != null ? mesh.blockNumber.toLocaleString() : "—" },
            { k: "RPC", v: mesh.live ? "LIVE" : "STANDBY" },
            { k: "API", v: mesh.apiOk ? `λ ${mesh.apiLambda ?? "ok"}` : "…" },
            { k: "Wallet RPC", v: mesh.walletRpcOk ? "1202" : "…" },
            { k: "Hard cap", v: `≤${CLRTY1.latencyHardCapMs}ms` },
          ].map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="perfect-frame px-4 py-4"
            >
              <p className="font-tomorrow text-[0.6rem] uppercase tracking-[0.2em] text-clarity-muted">{s.k}</p>
              <p className="mt-2 font-mono text-sm text-clarity-cyan">{s.v}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <p className="section-kicker">Live surfaces · routeToClrty1()</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {routes.map((r) => (
              <a
                key={r.id}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="connect-tile"
                title={r.href}
              >
                <span className="font-medium text-clarity-text">{r.label}</span>
                <span className="mt-1 block font-tomorrow text-[0.6rem] uppercase tracking-[0.14em] text-clarity-cyan">
                  {r.role}
                </span>
                <span className="mt-1 block truncate font-mono text-[0.6rem] text-clarity-muted">
                  {r.href.replace(/^https:\/\//, "")}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={routeToClrty1(CLRTY1_ROUTES.rpc.href, { surface: "rpc" })}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-clarity-cyan px-5 py-2.5 font-tomorrow text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-clarity-bg"
          >
            Open RPC
          </a>
          <a
            href={routeToClrty1(CLRTY1_ROUTES.explorer.href, { surface: "explorer" })}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/25 px-5 py-2.5 font-tomorrow text-[0.65rem] uppercase tracking-[0.12em] text-clarity-mist hover:text-white"
          >
            Explorer SCOPE
          </a>
          <a
            href={routeToClrty1(CLRTY1_ROUTES.browser.href, { surface: "browser" })}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/25 px-5 py-2.5 font-tomorrow text-[0.65rem] uppercase tracking-[0.12em] text-clarity-mist hover:text-white"
          >
            Browser HUD
          </a>
          <a
            href={routeToClrty1(CLRTY1_ROUTES.wallet.href, { surface: "wallet" })}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/25 px-5 py-2.5 font-tomorrow text-[0.65rem] uppercase tracking-[0.12em] text-clarity-mist hover:text-white"
          >
            Wallet
          </a>
          <a
            href="#connect"
            className="rounded-full border border-white/25 px-5 py-2.5 font-tomorrow text-[0.65rem] uppercase tracking-[0.12em] text-clarity-mist hover:text-white"
          >
            Full connect mesh
          </a>
        </div>
      </div>
    </section>
  );
}
