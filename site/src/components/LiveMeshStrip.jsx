import { motion } from "framer-motion";
import { useClrty1 } from "../hooks/useClrty1.js";
import { CLRTY1, CLRTY1_ROUTES, routeToClrty1 } from "../data/clrty1Routing.js";

export default function LiveMeshStrip() {
  const mesh = useClrty1();
  const items = [
    { k: "Network", v: CLRTY1.network },
    { k: "Chain", v: String(mesh.chainId ?? CLRTY1.chainId) },
    { k: "RPC", v: mesh.refusedForeignChain ? "REFUSED" : mesh.live ? "LIVE" : "probing" },
    { k: "Block", v: mesh.blockNumber != null ? mesh.blockNumber.toLocaleString() : "—" },
    { k: "API", v: mesh.apiOk ? "ok" : "…" },
    { k: "Latency", v: mesh.latencyMs != null ? `${mesh.latencyMs}ms` : `≤${CLRTY1.latencyHardCapMs}ms` },
    { k: "Supply", v: `${CLRTY1.fixedSupply.toLocaleString()} ${CLRTY1.symbol}` },
  ];

  const quick = [
    { label: "RPC", href: routeToClrty1(CLRTY1_ROUTES.rpc.href, { surface: "rpc" }) },
    { label: "Explorer", href: routeToClrty1(CLRTY1_ROUTES.explorer.href, { surface: "explorer" }) },
    { label: "Browser", href: routeToClrty1(CLRTY1_ROUTES.browser.href, { surface: "browser" }) },
    { label: "Wallet", href: routeToClrty1(CLRTY1_ROUTES.wallet.href, { surface: "wallet" }) },
    { label: "Routes", href: "#clrty1-routing" },
  ];

  return (
    <section id="live-mesh" className="border-y border-clarity-border bg-white/[0.02] px-5 py-4">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:justify-between">
        <div className="flex flex-wrap gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.k}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="font-mono text-xs"
            >
              <span className="text-clarity-muted">{it.k}</span>{" "}
              <span className="text-clarity-cyan">{it.v}</span>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {quick.map((q) => (
            <a
              key={q.label}
              href={q.href}
              {...(q.href.startsWith("#")
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" })}
              className="font-mono text-xs text-white/70 underline-offset-4 hover:text-clarity-cyan hover:underline"
            >
              {q.label} →
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
