import { CTA_MAP } from "../data/ctaMap.js";
import { LINKS } from "../data/content.js";
import Clrty1Link from "./Clrty1Link.jsx";

const logo = `${import.meta.env.BASE_URL}clarity-logo.png`;

const NAV = [
  { href: "#extensions", label: "Extensions" },
  { href: "#sdk", label: "SDK" },
  { href: "#clrty1-routing", label: "CLRTY-1" },
  { href: "#database-cross-route", label: "Database" },
  { href: "#developer-docs", label: "Docs" },
  { href: "#legal-compliance", label: "Legal" },
  { href: "#connect", label: "Connect" },
];

export default function SiteNav() {
  return (
    <nav className="relative z-30 flex w-full items-center justify-between px-4 py-4 md:px-8">
      <Clrty1Link href={LINKS.home} className="flex items-center gap-2.5" aria-label="CLARITY home" surface="home">
        <img
          src={logo}
          alt="CLARITY"
          className="h-9 w-auto brightness-0 invert md:h-10"
          width={160}
          height={104}
        />
      </Clrty1Link>

      <div className="nav-glass hidden items-center gap-1 px-2 py-1.5 lg:flex">
        {NAV.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="rounded-full px-3 py-1.5 font-tomorrow text-[0.65rem] uppercase tracking-[0.14em] text-clarity-muted transition hover:bg-white/5 hover:text-clarity-ink"
          >
            {l.label}
          </a>
        ))}
        <Clrty1Link
          href={CTA_MAP.connect_clrty1}
          surface="rpc"
          className="rounded-full px-3 py-1.5 font-tomorrow text-[0.65rem] uppercase tracking-[0.14em] text-clarity-muted transition hover:bg-white/5 hover:text-clarity-ink"
        >
          RPC
        </Clrty1Link>
        <Clrty1Link
          href={CTA_MAP.create_wallet}
          surface="wallet"
          className="ml-1 rounded-full border border-white/20 px-3 py-2 font-tomorrow text-[0.65rem] uppercase tracking-[0.12em] text-clarity-mist hover:text-white"
        >
          Wallet
        </Clrty1Link>
        <a
          href={CTA_MAP.launch_asset || "#launch"}
          className="rounded-full bg-clarity-cyan px-4 py-2 font-tomorrow text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-clarity-bg transition hover:bg-[#4dceff]"
        >
          Launch asset
        </a>
      </div>

      <div className="flex items-center gap-2 lg:hidden">
        <a
          href="#clrty1-routing"
          className="rounded-full border border-white/20 px-3 py-2 font-tomorrow text-[0.6rem] uppercase tracking-[0.12em] text-clarity-mist"
        >
          CLRTY-1
        </a>
        <a
          href={CTA_MAP.launch_asset || "#launch"}
          className="rounded-full bg-clarity-cyan px-3 py-2 font-tomorrow text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-clarity-bg"
        >
          Launch
        </a>
      </div>
    </nav>
  );
}
