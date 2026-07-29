/** Merged CTA map: pack CTAs + CLRTY-1 settlement routing on every owned URL. */
import { CTA_MAP as PACK_CTA } from "./backlinkPack.generated.js";
import { buildClrty1CtaMap, routeToClrty1 } from "./clrty1Routing.js";

const routed = buildClrty1CtaMap();

/** Prefer CLRTY-1-routed destinations; keep pack keys for funnel extras. */
export const CTA_MAP = {
  ...PACK_CTA,
  ...routed,
  // ensure pack-only keys still stamp CLRTY-1 when owned
  gitbook: routeToClrty1(PACK_CTA.gitbook || "https://docs.clarity-fintech.com/", { surface: "gitbook" }),
  notion_docs: PACK_CTA.notion_docs,
  github: PACK_CTA.github,
  downloads: PACK_CTA.downloads,
  backlink_pack: routeToClrty1(
    PACK_CTA.backlink_pack || "https://clarity-tokens.pages.dev/backlink-pack.json",
    { surface: "pack" },
  ),
  clrty1_routing: "#clrty1-routing",
};

export { routeToClrty1, buildClrty1CtaMap };
