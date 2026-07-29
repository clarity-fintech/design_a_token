import {
  BACKLINK_PACK_META,
  BACKLINK_PACK_URL,
  FOOTER_FUNNEL,
  LEGAL_PACK,
} from "../data/backlinkPack.generated.js";
import { CTA_MAP } from "../data/ctaMap.js";
import Clrty1Link from "./Clrty1Link.jsx";
import { CLRTY1, routeToClrty1 } from "../data/clrty1Routing.js";

const logo = `${import.meta.env.BASE_URL}clarity-logo.png`;

const COL_META = [
  { key: "website", title: "Website" },
  { key: "docs", title: "Docs · GitBook" },
  { key: "notion", title: "Notion" },
  { key: "github", title: "GitHub" },
  { key: "downloads", title: "Downloads · Packs" },
  { key: "infra", title: "CLRTY-1 Infra" },
  { key: "legal", title: "Legal" },
];

export default function Footer() {
  const funnel = FOOTER_FUNNEL || {};

  return (
    <footer id="footer-funnel" className="border-t border-white/10 px-5 py-14 text-sm text-clarity-muted">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex max-w-sm flex-col items-start gap-3">
            <Clrty1Link href="https://www.clarity-fintech.com/" aria-label="CLARITY home">
              <img
                src={logo}
                alt="CLARITY"
                className="h-10 w-auto brightness-0 invert opacity-90"
                width={160}
                height={104}
              />
            </Clrty1Link>
            <p className="body-copy text-sm text-clarity-muted">
              All funnel routes settle on {CLRTY1.network} / chain {CLRTY1.chainId}. Packed from the 192
              nano-harvest index + active-links registry.
            </p>
            <div className="flex flex-wrap gap-2">
              <Clrty1Link
                href={CTA_MAP.create_wallet}
                className="rounded-full bg-clarity-cyan px-4 py-2 font-tomorrow text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-clarity-bg"
              >
                Create Wallet
              </Clrty1Link>
              <Clrty1Link
                href={CTA_MAP.buy_clrty}
                className="rounded-full border border-white/25 px-4 py-2 font-tomorrow text-[0.6rem] uppercase tracking-[0.12em] text-clarity-mist hover:text-white"
              >
                Buy $CLRTY
              </Clrty1Link>
              <Clrty1Link
                href={CTA_MAP.clrty1_routing || "#clrty1-routing"}
                className="rounded-full border border-clarity-cyan/40 bg-clarity-cyan/10 px-4 py-2 font-tomorrow text-[0.6rem] uppercase tracking-[0.12em] text-clarity-cyan"
              >
                CLRTY-1 routes
              </Clrty1Link>
              <a
                href={CTA_MAP.backlink_pack || BACKLINK_PACK_URL}
                className="rounded-full border border-white/25 px-4 py-2 font-tomorrow text-[0.6rem] uppercase tracking-[0.12em] text-clarity-mist hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Full pack JSON
              </a>
            </div>
          </div>

          <div className="grid flex-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {COL_META.map((col) => {
              const links = funnel[col.key] || [];
              if (!links.length) return null;
              return (
                <div key={col.key}>
                  <p className="font-tomorrow text-[0.65rem] uppercase tracking-[0.2em] text-clarity-cyan">
                    {col.title}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {links.slice(0, 16).map((l) => (
                      <li key={`${col.key}-${l.href}`}>
                        <Clrty1Link
                          href={routeToClrty1(l.href, { surface: `footer_${col.key}` })}
                          className="text-clarity-mist transition hover:text-white"
                        >
                          {l.label}
                        </Clrty1Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4 border-t border-white/10 pt-6 font-tomorrow text-[0.6rem] uppercase tracking-[0.16em]">
          <Clrty1Link href={LEGAL_PACK.hub} className="hover:text-clarity-cyan">
            Legal hub
          </Clrty1Link>
          <a href="#legal-compliance" className="hover:text-clarity-cyan">
            Legal section
          </a>
          <a href="#clrty1-routing" className="hover:text-clarity-cyan">
            CLRTY-1 routing
          </a>
          <a href="#connect" className="hover:text-clarity-cyan">
            Connect mesh
          </a>
          <Clrty1Link href={CTA_MAP.github} className="hover:text-clarity-cyan">
            GitHub
          </Clrty1Link>
          <Clrty1Link href={CTA_MAP.gitbook} className="hover:text-clarity-cyan">
            GitBook
          </Clrty1Link>
          <Clrty1Link href={CTA_MAP.notion_docs} className="hover:text-clarity-cyan">
            Notion
          </Clrty1Link>
          <Clrty1Link href={CTA_MAP.downloads} className="hover:text-clarity-cyan">
            Downloads
          </Clrty1Link>
          <Clrty1Link href={CTA_MAP.rpc || CTA_MAP.connect_clrty1} className="hover:text-clarity-cyan">
            RPC
          </Clrty1Link>
          <a
            href={BACKLINK_PACK_META.sitemaps?.active_links}
            className="hover:text-clarity-cyan"
            target="_blank"
            rel="noopener noreferrer"
          >
            Active sitemap
          </a>
          <a
            href="mailto:william@clarity-fintech.com?subject=CLRTY%20Token%20Extensions"
            className="hover:text-clarity-cyan"
          >
            Contact
          </a>
        </div>

        <p className="mt-8 text-center font-tomorrow text-[0.6rem] uppercase tracking-[0.2em] text-gray-600">
          © {new Date().getFullYear()} VOLKOV INTELLIGENCE SYSTEMS · Settlement {CLRTY1.network} /{" "}
          {CLRTY1.chainId} · {BACKLINK_PACK_META.counts?.pack_total?.toLocaleString?.() ?? "—"} backlinks ·
          192 index · all routes → CLRTY-1
        </p>
      </div>
    </footer>
  );
}
