/** Canonical CLRTY-1 settlement + surface routing for Token Extensions. */
export const CLRTY1 = {
  network: "clrty-1",
  chainId: 1202,
  chainIdHex: "0x4b2",
  latencyHardCapMs: 399,
  symbol: "uclrty",
  fixedSupply: 16_000_000,
  settlement: {
    network: "clrty-1",
    chainId: 1202,
    kernel: "misc",
    language: ".mis",
  },
};

/** Live CLRTY-1 mesh — mirrors CLRTY_SUBSTRATE/boot/clrty1_live_surfaces.json */
export const CLRTY1_ROUTES = {
  rpc: {
    id: "rpc",
    label: "CLRTY-1 RPC",
    href: "https://rpc.clarity-fintech.com",
    role: "json-rpc",
    methods: ["eth_chainId", "eth_blockNumber", "net_version"],
  },
  api: {
    id: "api",
    label: "API Gateway",
    href: "https://api.clarity-fintech.com",
    role: "rest",
    status: "https://api.clarity-fintech.com/v1/status",
  },
  explorer: {
    id: "explorer",
    label: "Explorer SCOPE",
    href: "https://network-monitor-d1g.pages.dev/explorer/?portal=rpc&q=CLRTY",
    role: "explorer",
  },
  explorer_api: {
    id: "explorer_api",
    label: "Explorer API",
    href: "https://explorer.clarity-fintech.com/",
    role: "explorer-api",
  },
  monitor: {
    id: "monitor",
    label: "Network Monitor",
    href: "https://network-monitor-d1g.pages.dev/",
    role: "monitor",
  },
  browser: {
    id: "browser",
    label: "Browser HUD",
    href: "https://network-monitor-d1g.pages.dev/browser/",
    role: "ledger-hud",
  },
  status: {
    id: "status",
    label: "Status",
    href: "https://status.clarity-fintech.com/",
    role: "health",
  },
  status_probe: {
    id: "status_probe",
    label: "Status Probe",
    href: "https://status-probe.clarity-fintech.com/",
    role: "probe",
  },
  wallet: {
    id: "wallet",
    label: "Clarity Wallet",
    href: "https://exchange.clarity-fintech.com/wallet-app",
    role: "wallet",
  },
  wallet_rpc: {
    id: "wallet_rpc",
    label: "Wallet RPC",
    href: "https://exchange.clarity-fintech.com/v1/rpc",
    role: "wallet-rpc",
  },
  exchange: {
    id: "exchange",
    label: "Exchange",
    href: "https://exchange.clarity-fintech.com/",
    role: "exchange",
  },
  merchant: {
    id: "merchant",
    label: "Merchant",
    href: "https://exchange.clarity-fintech.com/merchant/",
    role: "merchant",
  },
  labs_browser: {
    id: "labs_browser",
    label: "Labs Browser",
    href: "https://labs.clarity-fintech.com/browser/",
    role: "labs",
  },
  website: {
    id: "website",
    label: "Clarity Home",
    href: "https://www.clarity-fintech.com/",
    role: "marketing",
  },
  helix: {
    id: "helix",
    label: "HELIX Execution",
    href: "https://www.clarity-fintech.com/helix/",
    role: "execution",
  },
  mirra: {
    id: "mirra",
    label: "MIRRA Private Markets",
    href: "https://www.clarity-fintech.com/mirra/",
    role: "privacy",
  },
  pay: {
    id: "pay",
    label: "CLRTY PAY",
    href: "https://pay.clarity-fintech.com/",
    role: "payments",
  },
  faucet: {
    id: "faucet",
    label: "Faucet",
    href: "https://www.clarity-fintech.com/faucet/",
    role: "faucet",
  },
  tokens: {
    id: "tokens",
    label: "Token Extensions",
    href: "https://clarity-tokens.pages.dev/",
    role: "tokens",
  },
  tokens_live: {
    id: "tokens_live",
    label: "Tokens Live",
    href: "https://tokens.clarity-fintech.com/",
    role: "tokens",
  },
  enterprise: {
    id: "enterprise",
    label: "Enterprise",
    href: "https://www.clarity-fintech.com/clarity-enterprise/",
    role: "enterprise",
  },
  developer: {
    id: "developer",
    label: "Developer",
    href: "https://www.clarity-fintech.com/developer/",
    role: "docs",
  },
};

/**
 * Append CLRTY-1 settlement context to Clarity-owned URLs so every hop
 * routes into chain 1202 / clrty-1.
 */
export function routeToClrty1(href, extra = {}) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:")) return href;
  try {
    const u = new URL(href, "https://clarity-tokens.pages.dev/");
    const host = u.hostname || "";
    const owned =
      host.endsWith("clarity-fintech.com") ||
      host.endsWith("clrty.network") ||
      host.endsWith("pages.dev") ||
      host.endsWith("pay.clarity-fintech.com");
    if (!owned) return href;

    if (!u.searchParams.has("network")) u.searchParams.set("network", CLRTY1.network);
    if (!u.searchParams.has("chainId")) u.searchParams.set("chainId", String(CLRTY1.chainId));
    if (!u.searchParams.has("settlement")) u.searchParams.set("settlement", "clrty-1");
    for (const [k, v] of Object.entries(extra)) {
      if (v != null && v !== "") u.searchParams.set(k, String(v));
    }
    return u.toString();
  } catch {
    return href;
  }
}

export function clrty1RouteList() {
  return Object.values(CLRTY1_ROUTES).map((r) => ({
    ...r,
    href: routeToClrty1(r.href, { surface: r.id }),
  }));
}

/** Primary CTA destinations — all settle on CLRTY-1 */
export function buildClrty1CtaMap() {
  const R = CLRTY1_ROUTES;
  return {
    explore_extensions: "#extensions",
    connect_clrty1: routeToClrty1(R.rpc.href, { surface: "rpc" }),
    open_sdk: "#sdk",
    launch_asset: "#launch",
    build_with_clrty: routeToClrty1(R.developer.href, { surface: "developer" }),
    protocol_walkthrough: "#developer-docs",
    enterprise: routeToClrty1(R.enterprise.href, { surface: "enterprise" }),
    create_wallet: routeToClrty1("https://exchange.clarity-fintech.com/login", { surface: "wallet" }),
    buy_clrty: routeToClrty1("https://exchange.clarity-fintech.com/buy.html", { surface: "exchange" }),
    gitbook: "https://docs.clarity-fintech.com/",
    notion_docs:
      "https://app.notion.com/p/clrty-1/Clarity-Documentation-39e5f7f81f9e80f69925c59cf6b07173",
    github: "https://github.com/clarity-fintech",
    downloads: "https://github.com/theangelofwill/CLRTY-WALLET-INTEGRATION/blob/main/DOWNLOADS.md",
    legal: routeToClrty1("https://exchange.clarity-fintech.com/legal", { surface: "legal" }),
    connect_mesh: "#connect",
    backlink_pack: "https://clarity-tokens.pages.dev/backlink-pack.json",
    explorer: routeToClrty1(R.explorer.href, { surface: "explorer" }),
    helix: routeToClrty1(R.helix.href, { surface: "helix" }),
    mirra: routeToClrty1(R.mirra.href, { surface: "mirra" }),
    pay: routeToClrty1(R.pay.href, { surface: "pay" }),
    faucet: routeToClrty1(R.faucet.href, { surface: "faucet" }),
    status: routeToClrty1(R.status.href, { surface: "status" }),
    browser: routeToClrty1(R.browser.href, { surface: "browser" }),
    monitor: routeToClrty1(R.monitor.href, { surface: "monitor" }),
    exchange: routeToClrty1(R.exchange.href, { surface: "exchange" }),
    merchant: routeToClrty1(R.merchant.href, { surface: "merchant" }),
    wallet: routeToClrty1(R.wallet.href, { surface: "wallet" }),
    api: routeToClrty1(R.api.href, { surface: "api" }),
  };
}
