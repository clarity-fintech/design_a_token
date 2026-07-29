import { motion } from "framer-motion";
import { assetTypes, marketplaceModules } from "../data/content.js";

const ROW_A = [...assetTypes, ...assetTypes];
const ROW_B = [...marketplaceModules, ...marketplaceModules];

function MarqueeRow({ items, reverse = false, duration = 42 }) {
  return (
    <div className="relative overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent" />
      <motion.div
        className="flex w-max gap-3"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-clarity-text/90"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function AssetMarquee() {
  return (
    <section id="asset-marquee" className="border-y border-clarity-border/60 bg-black py-8" aria-label="Asset types ticker">
      <p className="mb-4 text-center font-mono text-[0.65rem] uppercase tracking-[0.28em] text-clarity-cyan">
        Create any digital asset · currencies · stablecoins · RWA · AI-native
      </p>
      <MarqueeRow items={ROW_A} duration={48} />
      <MarqueeRow items={ROW_B} reverse duration={56} />
    </section>
  );
}
