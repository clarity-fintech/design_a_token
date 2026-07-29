/** Canonical CLRTY-1 settlement — NEVER any other chain. */
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
  /** Hard policy: Token Extensions + all Clarity routing settle only here. */
  onlyChain: true,
  refusedNetworks: ["mainnet", "ethereum", "eth", "sepolia", "goerli", "polygon", "solana", "base", "arbitrum"],
};

const FOREIGN_CHAIN_KEYS = ["chainId", "chain_id", "chainid", "chain", "network", "settlement", "settlement_network"];

/** True iff value is exactly CLRTY-1 chain 1202 / 0x4b2 / clrty-1. */
export function isClrty1ChainId(value) {
  if (value == null) return false;
  if (typeof value === "number") return value === CLRTY1.chainId;
  const s = String(value).trim().toLowerCase();
  if (s === "clrty-1" || s === "clrty1") return true;
  if (s === CLRTY1.chainIdHex) return true;
  if (s === String(CLRTY1.chainId)) return true;
  if (s.startsWith("0x")) {
    try {
      return parseInt(s, 16) === CLRTY1.chainId;
    } catch {
      return false;
    }
  }
  const n = Number(s);
  return Number.isFinite(n) && n === CLRTY1.chainId;
}

/** Throw if a foreign chain id / network is supplied. */
export function assertClrty1Only(value, label = "chain") {
  if (value == null || value === "") return CLRTY1.chainId;
  if (isClrty1ChainId(value) || String(value).toLowerCase() === CLRTY1.network) {
    return isClrty1ChainId(value) ? CLRTY1.chainId : CLRTY1.network;
  }
  throw new Error(
    `REFUSED: ${label}=${value} — settlement is CLRTY-1 only (chainId=1202 / 0x4b2). NEVER any other chain.`,
  );
}

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
 * Force CLRTY-1 settlement on Clarity-owned URLs.
 * OVERWRITES any foreign network / chainId / settlement — NEVER leaves another chain stamped.
 */
export function routeToClrty1(href, extra = {}) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:")) return href;
  try {
    const u = new URL(href, "https://clarity-tokens.pages.dev/");
    const host = u.hostname || "";
    const owned =
      host.endsWith("clarity-fintech.com") ||
      host.endsWith("clrty.network") ||
      host.endsWith("pages.dev");
    if (!owned) return href;

    // Refuse / strip foreign chain params, then FORCE CLRTY-1 only.
    for (const key of [...u.searchParams.keys()]) {
      const lk = key.toLowerCase();
      if (FOREIGN_CHAIN_KEYS.includes(lk) || FOREIGN_CHAIN_KEYS.includes(key)) {
        const val = u.searchParams.get(key);
        if (
          lk.includes("chain") &&
          val != null &&
          !isClrty1ChainId(val) &&
          String(val).toLowerCase() !== CLRTY1.network
        ) {
          // drop foreign chain stamp
          u.searchParams.delete(key);
          continue;
        }
        if (
          (lk === "network" || lk === "settlement" || lk === "settlement_network") &&
          val != null &&
          String(val).toLowerCase() !== CLRTY1.network &&
          String(val).toLowerCase() !== "clrty-1"
        ) {
          u.searchParams.delete(key);
        }
      }
    }

    u.searchParams.set("network", CLRTY1.network);
    u.searchParams.set("chainId", String(CLRTY1.chainId));
    u.searchParams.set("settlement", CLRTY1.network);

    for (const [k, v] of Object.entries(extra)) {
      if (v == null || v === "") continue;
      const lk = k.toLowerCase();
      if (lk === "chainid" || lk === "chain_id" || lk === "chain") {
        assertClrty1Only(v, k);
        u.searchParams.set("chainId", String(CLRTY1.chainId));
        continue;
      }
      if (lk === "network" || lk === "settlement" || lk === "settlement_network") {
        assertClrty1Only(v, k);
        u.searchParams.set(k === "settlement_network" ? "settlement" : k, CLRTY1.network);
        continue;
      }
      u.searchParams.set(k, String(v));
    }
    return u.toString();
  } catch (err) {
    if (String(err?.message || err).startsWith("REFUSED:")) throw err;
    return href;
  }
}

/** True if URL already settles exclusively on CLRTY-1 (or has no chain stamp). */
export function urlIsClrty1Only(href) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:")) return true;
  try {
    const u = new URL(href, "https://clarity-tokens.pages.dev/");
    const chain = u.searchParams.get("chainId") || u.searchParams.get("chain_id");
    const network = u.searchParams.get("network") || u.searchParams.get("settlement");
    if (chain != null && !isClrty1ChainId(chain)) return false;
    if (network != null && String(network).toLowerCase() !== CLRTY1.network) return false;
    return true;
  } catch {
    return true;
  }
}

export function clrty1RouteList() {
  return Object.values(CLRTY1_ROUTES).map((r) => ({
    ...r,
    href: routeToClrty1(r.href, { surface: r.id }),
  }));
}

/** Primary CTA destinations — all settle on CLRTY-1 ONLY */
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
