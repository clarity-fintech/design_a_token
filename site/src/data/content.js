import { routeToClrty1 } from "./clrty1Routing.js";

/** Raw Clarity surface URLs — stamped with CLRTY-1 settlement via routeToClrty1. */
const RAW_LINKS = {
  home: "https://www.clarity-fintech.com/",
  tokens: "https://www.clarity-fintech.com/clarity-tokens/",
  tokensLive: "https://tokens.clarity-fintech.com/",
  tokensPages: "https://clarity-tokens.pages.dev/",
  tokensPath: "https://network-monitor-d1g.pages.dev/clarity-tokens/",
  blockchain: "https://www.clarity-fintech.com/blockchain/",
  rpc: "https://rpc.clarity-fintech.com",
  api: "https://api.clarity-fintech.com",
  docs: "https://www.clarity-fintech.com/docs/",
  developer: "https://www.clarity-fintech.com/developer/",
  enterprise: "https://www.clarity-fintech.com/clarity-enterprise/",
  merchant: "https://exchange.clarity-fintech.com/merchant/",
  sparkMerchant: "https://www.clarity-fintech.com/spark-merchant/",
  explorer: "https://network-monitor-d1g.pages.dev/explorer/?portal=rpc&q=CLRTY",
  skills: "https://www.clarity-fintech.com/skills/",
  toolsTokenExt: "https://www.clarity-fintech.com/tools/token-extensions.html",
  sitemap: "https://sitemap.clarity-fintech.com/sitemap.xml",
  sitemapWww: "https://www.clarity-fintech.com/sitemap.xml",
  seoActive: "https://seo-kit-second.clarity-fintech.com/sitemap-active-links.xml",
  seoDx: "https://seo-kit-second.clarity-fintech.com/sitemap-dx-live-links.xml",
  seoHub: "https://seo-kit-second.clarity-fintech.com/health",
  gitbook: "https://docs.clarity-fintech.com/",
  network: "https://clrty.network/",
  faucet: "https://www.clarity-fintech.com/faucet/",
  labs: "https://www.clarity-fintech.com/labs/",
  exchange: "https://exchange.clarity-fintech.com/",
  helix: "https://www.clarity-fintech.com/helix/",
  mirra: "https://www.clarity-fintech.com/mirra/",
  pay: "https://pay.clarity-fintech.com/",
  agentRegistry: "https://www.clarity-fintech.com/products/agent-registry.html",
  tokenDocs: "https://www.clarity-fintech.com/docs/#/build/token-extensions",
  misLang: "https://docs.clarity-fintech.com/",
  core: "https://www.clarity-fintech.com/blockchain/",
  rwaDocs: "https://www.clarity-fintech.com/docs/#/build/token-extensions",
  confidentialDocs: "https://tokens.clarity-fintech.com/#extensions",
  helixProduct: "https://clrty.network/ecosystem/helix.html",
  mirraProduct: "https://clrty.network/ecosystem/mirra.html",
};

/** Every owned Clarity URL settles on CLRTY-1 (network=clrty-1 · chainId=1202). */
export const LINKS = Object.fromEntries(
  Object.entries(RAW_LINKS).map(([key, href]) => [key, routeToClrty1(href, { surface: key })]),
);

export const TOKEN_SUPPLY = {
  symbol: "uclrty",
  fixedSupply: 16_000_000,
  chainId: 1202,
  network: "clrty-1",
};

export const INFRA = {
  vds: 939850,
  host: "84.32.109.227",
  region: "Lithuania",
  latencyCapMs: 399,
  bandMs: [398.1, 398.5],
};

export const heroSlides = [
  { line1: "Create programmable", line2: "assets on CLRTY-1", line3: "Built with .mis" },
  { line1: "One blockchain.", line2: "Unlimited asset", line3: "infrastructure" },
  { line1: "Tokens that behave", line2: "like complete", line3: "financial systems" },
  { line1: "Confidential · Compliant", line2: "HELIX · MIRRA · Skills", line3: "Native at protocol" },
  { line1: "Not just tokens.", line2: "Programmable economic", line3: "infrastructure" },
  { line1: "Stablecoins · RWA · Agents", line2: "Enterprise rails", line3: "Institutional ready" },
];

export const assetTypes = [
  "currencies",
  "stablecoins",
  "enterprise assets",
  "loyalty systems",
  "governance tokens",
  "RWA tokens",
  "payment assets",
  "financial instruments",
  "AI-native assets",
  "automated treasury systems",
];

export const extensionFramework = [
  {
    id: "confidential",
    title: "Confidential Transfers",
    body: "Private transactions with institutional controls. .mis enables privacy-preserving asset transfers while maintaining optional auditing — for institutional settlements, private funds, treasury operations, enterprise payments, and confidential markets.",
    use: ["institutional settlements", "private funds", "treasury operations", "enterprise payments", "confidential markets"],
    code: `transfer_policy Confidential {
    visibility = private
    audit_access {
        enabled = true
        authorized = regulators
    }
}`,
  },
  {
    id: "transfer-logic",
    title: "Transfer Logic",
    body: "Define exactly how tokens move — compliance verification, geographic restrictions, transaction limits, approved wallet lists, identity verification, and automated financial conditions. Powered by CLRTY-1 execution infrastructure.",
    use: ["compliance verification", "geographic restrictions", "transaction limits", "approved wallets", "identity verification"],
    code: `transfer {
    require {
        verified_wallet == true
        region != restricted
    }
    limit { daily = 100000 }
}`,
  },
  {
    id: "fees",
    title: "Transfer Fee Extensions",
    body: "Build sustainable token economies with native transaction economics — protocol revenue, treasury funding, ecosystem incentives, automated fee distribution, and creator royalties. Every transfer becomes programmable economic activity.",
    use: ["protocol revenue", "treasury funding", "ecosystem incentives", "fee distribution", "creator royalties"],
    code: `fees {
    transfer_fee = 0.25%
    distribution {
        treasury = 50%
        ecosystem = 30%
        creator = 20%
    }
}`,
  },
  {
    id: "permanent",
    title: "Permanent Control",
    body: "Enterprise-grade lifecycle: recovery mechanisms, institutional custody controls, regulated asset management, asset freezing, controlled issuance, and supply management — designed for banks, enterprises, and regulated institutions.",
    use: ["banks", "enterprises", "regulated institutions", "custody recovery", "controlled issuance"],
    code: `administration {
    recovery = enabled
    authority { institution = approved }
}`,
  },
  {
    id: "metadata",
    title: "Metadata Extensions",
    body: "Turn tokens into complete digital assets. Attach native information — asset identity, ownership records, regulatory data, documentation, verification hashes, and provenance tracking — directly on-chain.",
    use: ["asset identity", "regulatory data", "verification records", "provenance", "ownership records"],
    code: `metadata {
    asset_type = "Real Estate"
    verification = blockchain_verified
}`,
  },
  {
    id: "rwa",
    title: "Real World Assets",
    body: "Tokenize the global economy — real estate, commodities, securities, invoices, private equity, financial contracts, and IP — with built-in ownership rights, dividend distribution, transfer restrictions, compliance, and automated settlement.",
    use: ["ownership rights", "dividend distribution", "transfer restrictions", "settlement", "legal reference"],
    code: `asset RealEstateToken {
    extensions = [
        RealWorldAsset,
        ComplianceControl,
        MIRRAPrivateMarket,
        HELIXExecution
    ]
}`,
  },
  {
    id: "stable",
    title: "Stablecoin Framework",
    body: "Launch next-generation digital currencies with reserve transparency, transfer controls, automated settlement, payment integrations, and institutional compliance layers — for fintechs, payment providers, banks, and global enterprises.",
    use: ["fintech", "payment providers", "banks", "enterprises", "reserve transparency"],
    code: `stablecoin USDX {
    backing { reserve = verified_assets }
    redemption { enabled = true }
}`,
  },
  {
    id: "agents",
    title: "AI Agent Tokens",
    body: "Assets designed for autonomous systems — Agent Access Tokens, Compute Credits, Execution Credits, and Data Access Tokens — with identity, capability limits, and payment rails for trading agents, treasury agents, and financial workflows.",
    use: ["API access", "compute workloads", "trading agents", "proprietary datasets", "execution credits"],
    code: `asset AgentCredit {
    extensions = [
        AgentExtension,
        CLARITYSkill,
        TransferLogic
    ]
}`,
  },
  {
    id: "skills",
    title: "CLARITY Skills",
    body: "Tokens that activate capabilities. Connect every CLRTY asset with CLARITY Skills — automated settlement, pricing optimization, compliance verification, marketplace execution, and yield optimization — via skill_connection blocks in .mis.",
    use: ["automated settlement", "pricing optimization", "compliance", "marketplace", "yield optimization"],
    code: `skill_connection {
    settlement = enabled
    pricing = dynamic
    compliance = automated
}`,
  },
  {
    id: "mirra",
    title: "MIRRA Private Assets",
    body: "Institutional assets require institutional privacy. MIRRA enables private liquidity pools, institutional trading assets, confidential instruments, restricted market systems, and private settlement networks on CLRTY-1.",
    use: ["private pools", "institutional trading", "restricted markets", "private settlement", "confidential instruments"],
    code: `MIRRAPrivateMarket {
    privacy_layer = enabled
    institutional_access = approved
}`,
  },
];

export const categories = [
  { category: "Confidentiality", purpose: "Private institutional transfers" },
  { category: "Compliance", purpose: "Regulated asset controls" },
  { category: "Payments", purpose: "Enterprise settlement" },
  { category: "Metadata", purpose: "Digital asset identity" },
  { category: "Governance", purpose: "Community and protocol control" },
  { category: "Yield", purpose: "Financial optimization" },
  { category: "AI Agents", purpose: "Autonomous execution" },
  { category: "RWA", purpose: "Real-world asset tokenization" },
  { category: "Enterprise", purpose: "Institutional infrastructure" },
  { category: ".mis Contracts", purpose: "Native programmable asset logic" },
  { category: "HELIX Integration", purpose: "Execution optimization" },
  { category: "MIRRA Integration", purpose: "Private financial markets" },
  { category: "CLARITY Skills", purpose: "Modular financial capabilities" },
];

export const misContractExample = `asset EnterpriseUSD {
    symbol = "EUSD"
    supply {
        fixed = true
        amount = 1000000000
    }
    transfers {
        compliance = enabled
        jurisdiction = approved_regions
    }
    settlement {
        helix = enabled
    }
}`;

export const SDK_PANELS = {
  create: `import { CLRTY } from "@clrty/sdk";

const token = await CLRTY.tokens.create({
  name: "Enterprise USD",
  symbol: "EUSD",
  contractLanguage: ".mis",
  chainId: 1202,
  extensions: [
    "confidential_transfer",
    "transfer_logic",
    "metadata",
    "compliance",
    "helix",
    "mirra"
  ]
});`,
  mis: `module CLRTY.TokenExtensions

asset EUSD = CLRTY.createToken(
  name: "Enterprise USD",
  symbol: "EUSD",
  supply: 1000000000,
  extensions: [
    ConfidentialTransfer,
    ComplianceControl,
    TransferFeeConfig,
    StableAsset,
    HELIXExecution,
    MIRRAPrivateMarket
  ]
)`,
  transfer: `function transfer(sender, receiver, amount) {
  require ComplianceControl.verify(sender)
  require ComplianceControl.verify(receiver)
  HELIXExecution.optimize {
    route = best_execution_path
    settlement = instant
  }
  TransferLogic.execute {
    sender = sender
    receiver = receiver
    amount = amount
  }
}`,
  rpc: `// Live CLRTY-1 mesh · chain 1202
const rpc = "https://rpc.clarity-fintech.com";
const api = "https://api.clarity-fintech.com";

const tip = await fetch(rpc, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "eth_chainId",
    params: []
  })
}).then(r => r.json());
// => "0x4b2" (1202)

const height = await fetch(rpc, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: 2,
    method: "eth_blockNumber",
    params: []
  })
}).then(r => r.json());

const status = await fetch(api + "/v1/status").then(r => r.json());
// => { lambda, supply_cap, … }`,
};

export const marketplaceModules = [
  "payment modules",
  "compliance modules",
  "yield modules",
  "governance modules",
  "AI execution modules",
  "RWA modules",
  "institutional modules",
];

export const nanoBlocks = [
  { id: "01-10", label: "Program core", gate: "CTE001" },
  { id: "11-20", label: "Privacy / confidential", gate: "CTE011" },
  { id: "21-30", label: "Compliance controls", gate: "CTE021" },
  { id: "31-40", label: "HELIX execution", gate: "CTE031" },
  { id: "41-50", label: "Metadata · RWA", gate: "CTE041" },
  { id: "51-60", label: "Playwright E2E", gate: "CTE051" },
  { id: "61-70", label: ".mis contracts", gate: "CTE061" },
  { id: "71-80", label: "Cage · compliance", gate: "CTE071" },
  { id: "81-90", label: "Analytics · SDK", gate: "CTE081" },
  { id: "91-100", label: "399ms commit", gate: "CTE091" },
];

export const connectMesh = [
  { label: "Clarity Home", href: LINKS.home },
  { label: "Tokens Live", href: LINKS.tokensLive },
  { label: "Tokens Pages", href: LINKS.tokensPages },
  { label: "CLRTY-1 RPC", href: LINKS.rpc },
  { label: "API Gateway", href: LINKS.api },
  { label: "Explorer", href: LINKS.explorer },
  { label: "Enterprise", href: LINKS.enterprise },
  { label: "Merchant", href: LINKS.merchant },
  { label: "Spark Merchant", href: LINKS.sparkMerchant },
  { label: "Skills", href: LINKS.skills },
  { label: "HELIX", href: LINKS.helix },
  { label: "MIRRA", href: LINKS.mirra },
  { label: "CLRTY PAY", href: LINKS.pay },
  { label: "Agent Registry", href: LINKS.agentRegistry },
  { label: "Docs", href: LINKS.docs },
  { label: "Developer", href: LINKS.developer },
  { label: "GitBook", href: LINKS.gitbook },
  { label: "Labs", href: LINKS.labs },
  { label: "Exchange", href: LINKS.exchange },
  { label: "Faucet", href: LINKS.faucet },
  { label: "Active sitemap", href: LINKS.seoActive },
  { label: "DX sitemap", href: LINKS.seoDx },
  { label: "SEO hub", href: LINKS.seoHub },
  { label: "Network", href: LINKS.network },
];

/** In-depth coding walkthroughs — each step backlinks into the Clarity mesh. */
export const walkthroughs = [
  {
    id: "wt-create",
    step: "01",
    title: "Author a .mis asset",
    summary:
      "Define identity, supply, and transfer policy in a financial-native contract. Compile with bin/misc — settlement clrty-1 / 1202.",
    links: [
      { label: "Developer docs", href: LINKS.developer },
      { label: "GitBook moniversive", href: LINKS.gitbook },
      { label: "Blockchain overview", href: LINKS.blockchain },
    ],
    code: `# Letter-hash on every module · tip-of-spear: mis_code_index.json
module CLRTY.TokenExtensions.EnterpriseUSD

asset EnterpriseUSD {
    symbol = "EUSD"
    supply {
        fixed = true
        amount = 1000000000
    }
    transfers {
        compliance = enabled
        jurisdiction = approved_regions
    }
    settlement {
        helix = enabled
    }
}

# Check:
# bin/misc path.mis --check --compact-letters`,
  },
  {
    id: "wt-extensions",
    step: "02",
    title: "Attach Token Extensions",
    summary:
      "Stack ConfidentialTransfer, ComplianceControl, TransferFeeConfig, StableAsset, HELIX, and MIRRA — one mint, protocol-native behavior.",
    links: [
      { label: "Legacy tools page", href: LINKS.toolsTokenExt },
      { label: "Skills registry", href: LINKS.skills },
      { label: "MIRRA markets", href: LINKS.mirra },
    ],
    code: `extensions = [
    ConfidentialTransfer,   # private + auditor ACL
    ComplianceControl,      # identity + jurisdiction
    TransferFeeConfig,      # treasury / ecosystem split
    MetadataPointer,
    TokenMetadata,
    StableAsset,
    HELIXExecution,         # best-path settle
    MIRRAPrivateMarket      # institutional privacy
]`,
  },
  {
    id: "wt-sdk",
    step: "03",
    title: "Mint via CLRTY SDK",
    summary:
      "TypeScript client posts to api.clarity-fintech.com with contractLanguage=\".mis\". Idempotent create — UUID on charge surfaces.",
    links: [
      { label: "API Gateway", href: LINKS.api },
      { label: "RPC mesh", href: LINKS.rpc },
      { label: "Labs sandbox", href: LINKS.labs },
    ],
    code: `import { CLRTY } from "@clrty/sdk";

const token = await CLRTY.tokens.create({
  name: "Enterprise USD",
  symbol: "EUSD",
  contractLanguage: ".mis",
  chainId: 1202,
  extensions: [
    "confidential_transfer",
    "transfer_logic",
    "metadata",
    "compliance",
    "helix",
    "mirra"
  ]
});
// token.mint → explore at network-monitor explorer`,
  },
  {
    id: "wt-rpc",
    step: "04",
    title: "Probe CLRTY-1 live",
    summary:
      "Confirm chain 1202 (0x4b2), tip latency under the 399ms hard cap, and wire Explorer + Faucet for walkthrough funding.",
    links: [
      { label: "Explorer", href: LINKS.explorer },
      { label: "Faucet", href: LINKS.faucet },
      { label: "clrty.network", href: LINKS.network },
    ],
    code: `const rpc = "https://rpc.clarity-fintech.com";
const tip = await fetch(rpc, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    jsonrpc: "2.0", id: 1,
    method: "eth_chainId", params: []
  })
}).then(r => r.json());
// => { result: "0x4b2" }  // decimal 1202`,
  },
  {
    id: "wt-enterprise",
    step: "05",
    title: "Institutional rails",
    summary:
      "Route settlements through HELIX, private pools via MIRRA, and merchant / enterprise surfaces for production capital flows.",
    links: [
      { label: "Clarity Enterprise", href: LINKS.enterprise },
      { label: "Spark Merchant", href: LINKS.sparkMerchant },
      { label: "Exchange", href: LINKS.exchange },
      { label: "HELIX", href: LINKS.helix },
    ],
    code: `HELIXExecution.optimize {
    route = best_execution_path
    settlement = instant
}
MIRRAPrivateMarket {
    privacy_layer = enabled
    institutional_access = approved
}
# Merchant checkout → exchange.clarity-fintech.com/merchant/`,
  },
  {
    id: "wt-index",
    step: "06",
    title: "Index · Notion · search engines",
    summary:
      "URL index lands in Clarity data manifest (database E) + active-links registry, then Google / Bing / Yandex via activate-seo-all and IndexNow.",
    links: [
      { label: "Active links sitemap", href: LINKS.seoActive },
      { label: "DX live links", href: LINKS.seoDx },
      { label: "WWW sitemap", href: LINKS.sitemapWww },
      { label: "SEO kit health", href: LINKS.seoHub },
    ],
    code: `# Database E = clarity-data-manifest + active-links-registry
make clarity-data-build combine-active-links reindex-dx-repos
cd seo-kit-second && npm run deploy && npm run activate-seo-all
# → GSC / Bing / Yandex / IndexNow snapshot:
# var/seo/latest-index-activation.json

# Notion harvest + rolling results
make notion-harvest-sync notion-rolling-results-sync`,
  },
];

export const hashTraceNote = {
  title: "Hash & @ tracing",
  body: "Every .mis surface and any Python-tagged companion carries letter-hash + @CLRTY.TokenExtensions tracing so audits can resolve from mint → extension → nano task (CTE001–CTE100).",
  tags: ["@CLRTY.TokenExtensions", "treasury:clrty-1", "chain:1202", "kernel:misc"],
};

/** Developer protocol pages — Enterprise walkthrough */
export const docTree = [
  { label: "CLRTY-1 Core", href: LINKS.core },
  { label: "Token Extensions", href: LINKS.tokens },
  { label: ".mis Language", href: LINKS.misLang },
  { label: "HELIX Engine", href: LINKS.helix },
  { label: "CLARITY Skills", href: LINKS.skills },
  { label: "MIRRA", href: LINKS.mirra },
  { label: "CLRTY PAY", href: LINKS.pay },
  { label: "Agent Registry", href: LINKS.agentRegistry },
  { label: "RWA Framework", href: LINKS.rwaDocs },
  { label: "Developer SDK", href: LINKS.developer },
  { label: "RPC Infrastructure", href: LINKS.rpc },
];

export const creationFlow = [
  "Write .mis Contract",
  "Compile (bin/misc)",
  "Deploy to CLRTY-1",
  "Attach Extensions",
  "Token Becomes Active",
];

export const clrtyDifference = {
  traditional: ["Token", "External Contracts", "External Logic"],
  clrty: ["Asset", "Logic", "Execution", "Compliance", "Financial System"],
};

export const developerDocs = [
  {
    id: "overview",
    num: "01",
    title: "Overview",
    kicker: "Programmable asset infrastructure",
    headline: "What are CLRTY Token Extensions?",
    body: "Native programmable modules built into CLRTY-1. Instead of bolting behavior onto assets with external contracts, developers embed financial logic directly into the token via .mis — Moniversion Intelligence Script.",
    architecture: `                CLRTY TOKEN
              Base Asset Layer
                      |
              CLRTY Extension Layer
           .mis   ·  HELIX  ·  Skills
                      |
                    MIRRA
                      |
              Enterprise Systems`,
    becomes: [
      "a payment system",
      "a financial instrument",
      "an automated agreement",
      "an institutional asset",
      "an AI-enabled economic object",
    ],
    workflow: [
      "Author base asset identity in .mis",
      "Select extension modules",
      "Compile with misc kernel",
      "Deploy to chain 1202",
    ],
    mis: `module CLRTY.TokenExtensions

# Documentation hub:
# docs.clrty.com/token-extensions
# → https://www.clarity-fintech.com/clarity-tokens/

asset ClaritYToken {
    language = ".mis"
    layer = "protocol_native"
}`,
    sdk: `import { CLRTY } from "@clrty/sdk";
// Extensions resolve against CLRTY-1 RPC + API mesh
const info = await CLRTY.network.info({ chainId: 1202 });`,
    api: "eth_chainId · eth_blockNumber · GET /v1/status · POST /tokens via api.clarity-fintech.com",
    deps: [".mis Language", "CLRTY-1 Core", "RPC"],
    enterprise: "Every enterprise mint can function as payment rail, instrument, and compliance object without a separate contract stack.",
    links: [
      { label: "CLRTY-1 Core", href: LINKS.core },
      { label: ".mis Language", href: LINKS.misLang },
      { label: "Token Docs", href: LINKS.tokenDocs },
      { label: "RPC", href: LINKS.rpc },
    ],
  },
  {
    id: "first-asset",
    num: "02",
    title: "First CLRTY Asset",
    kicker: "Asset creation flow",
    headline: "Create financial systems, not just tokens",
    body: "Developers write EnterpriseUSD.mis, compile, deploy, attach extensions, and activate the mint on CLRTY-1 mainnet.",
    architecture: `Developer → Write .mis → Compile → Deploy → Attach Extensions → Active`,
    becomes: creationFlow,
    workflow: [
      "clrty deploy EnterpriseUSD.mis",
      "Confirm extensions checklist",
      "Verify tip on rpc.clarity-fintech.com",
      "Index mint into Explorer",
    ],
    mis: `module StableAssets

asset EnterpriseUSD {
    metadata {
        name: "Enterprise USD"
        symbol: "EUSD"
        category: "Stable Asset"
    }
    supply {
        type: fixed
        amount: 1000000000
    }
    extensions {
        enable: [
            StableAsset,
            ComplianceControl,
            ConfidentialTransfer,
            HELIXExecution,
            CLRTYPAY
        ]
    }
}`,
    sdk: `const asset = await CLRTY.asset.create({
  name: "Enterprise USD",
  symbol: "EUSD",
  language: ".mis",
  extensions: ["compliance", "confidential_transfer", "helix", "pay"]
});`,
    api: "Deployment Successful · Network CLRTY-1 · Extensions: Stable, Compliance, Confidential, HELIX, PAY",
    deps: ["StableAsset", "ComplianceControl", "ConfidentialTransfer", "HELIX", "CLRTY PAY"],
    enterprise: "Banks and fintechs launch EUSD with institutional controls from day one.",
    links: [
      { label: "Developer SDK", href: LINKS.developer },
      { label: "CLRTY PAY", href: LINKS.pay },
      { label: "HELIX", href: LINKS.helix },
      { label: "Labs", href: LINKS.labs },
    ],
  },
  {
    id: "extension-state",
    num: "03",
    title: "Extension Initialization",
    kicker: "Extension state model",
    headline: "Every extension adds protocol-level state",
    body: "Token accounts carry base state plus per-extension state bags — Compliance, TransferRules, Metadata, and more — resolved at the CLRTY-1 asset layer.",
    architecture: `Token Account {
  Base State
  Extension State {
    Extension A · B · C
  }
}`,
    becomes: ["Base + Extension state", "Initialized flags", "TLV-free native structs"],
    workflow: [
      "Allocate TokenMint",
      "Push ExtensionState[]",
      "Seal initialized",
      "Bind authorities",
    ],
    mis: `token EnterpriseUSD {
    base { owner supply decimals }
    extensions {
        Compliance { enabled=true }
        TransferRules { enabled=true }
        Metadata { enabled=true }
    }
}`,
    sdk: `await CLRTY.tokens.extensions.init(mint, ["compliance", "transfer_logic", "metadata"]);`,
    api: "ExtensionState { extension_type, state_data, initialized }",
    deps: ["TokenMint", "TokenAccount", "ExtensionType enum"],
    enterprise: "Auditors inspect extension bags without reading opaque external contract storage.",
    links: [
      { label: "GitBook", href: LINKS.gitbook },
      { label: "Code index", href: LINKS.tokenDocs },
      { label: "Explorer", href: LINKS.explorer },
    ],
  },
  {
    id: "confidential",
    num: "04",
    title: "Confidential Transfer",
    kicker: "Institutional privacy layer",
    headline: "Private settlement with optional verification",
    body: "Privacy-preserving transfers for banks, hedge funds, treasuries, and enterprises — with optional regulator/auditor access.",
    architecture: `Sender → Encrypted TX → CLRTY Privacy Layer → Verified Settlement → Receiver`,
    becomes: ["private balances", "audit ACL", "institutional wallets only"],
    workflow: [
      "Enable ConfidentialTransfer",
      "Configure auditor ACL",
      "Restrict InstitutionalAccess",
      "Settle privately via HELIX route",
    ],
    mis: `extension ConfidentialTransfer {
    privacy { enabled=true }
    audit {
        enabled=true
        authorized: [government, institution]
    }
}

asset BANKUSD {
    extensions {
        ConfidentialTransfer { audit=true }
        InstitutionalAccess { enabled=true }
    }
}`,
    sdk: `await CLRTY.tokens.transfer.confidential({ mint, from, to, amount, auditor: "regulator" });`,
    api: "docs path: extensions/confidential-transfer · MIRRA for private markets",
    deps: ["MIRRA", "HELIX", "ComplianceControl"],
    enterprise: "$BANKUSD requires private balances, regulatory audit access, and institutional wallets only.",
    links: [
      { label: "MIRRA", href: LINKS.mirra },
      { label: "Confidential UI", href: LINKS.confidentialDocs },
      { label: "Enterprise", href: LINKS.enterprise },
      { label: "Compliance mesh", href: LINKS.enterprise },
    ],
  },
  {
    id: "transfer-logic",
    num: "05",
    title: "Transfer Logic",
    kicker: "Programmable movement rules",
    headline: "Define exactly how your token moves",
    body: "Who transfers, where, limits, permissions, and conditions — evaluated before HELIX optimization and settlement.",
    architecture: `Transfer Request → Check Rules → HELIX Optimization → Settlement`,
    becomes: ["verified wallets", "geo limits", "daily caps", "conditional exec"],
    workflow: [
      "Author require{} rules",
      "Set limit policies",
      "Hook before/after transfer",
      "Settle on best path",
    ],
    mis: `extension TransferLogic {
    rule { require: wallet.verified == true }
    rule { maximum_daily_transfer: 100000 }
}`,
    sdk: `await CLRTY.tokens.transfer({ mint, from, to, amount }); // enforces TransferLogic`,
    api: "TransferHook before_transfer / after_transfer CPI-safe",
    deps: ["HELIXExecution", "ComplianceControl", "TransferHook"],
    enterprise: "Approved-wallet lists and jurisdiction gates for regulated corridors.",
    links: [
      { label: "HELIX", href: LINKS.helix },
      { label: "RPC", href: LINKS.rpc },
      { label: "Developer", href: LINKS.developer },
    ],
  },
  {
    id: "fees",
    num: "06",
    title: "Transfer Fees",
    kicker: "Native token economics",
    headline: "Build sustainable token economies",
    body: "Automatic fee models fund treasuries, protocol revenue, creator royalties, and ecosystem incentives on every transfer.",
    architecture: `$10,000 TX → Fee $25 → Treasury $12.50 · Creator $6.25 · Ecosystem $6.25`,
    becomes: ["protocol revenue", "treasury funding", "creator royalties"],
    workflow: [
      "Configure fee_rate",
      "Set distribution split",
      "Withdraw via authority",
      "Audit accumulated_fees",
    ],
    mis: `extension TransferFees {
    fee: 0.25%
    distribution {
        treasury: 50%
        creator: 25%
        ecosystem: 25%
    }
}`,
    sdk: `await CLRTY.tokens.fees.configure(mint, { bps: 25, split: { treasury: 50, creator: 25, ecosystem: 25 } });`,
    api: "TransferFeeConfig · TransferFeeAmount · withdrawal_authority",
    deps: ["TransferFeeConfig", "HELIX", "CLRTY PAY"],
    enterprise: "Every transfer becomes programmable economic activity for the treasury.",
    links: [
      { label: "CLRTY PAY", href: LINKS.pay },
      { label: "Exchange", href: LINKS.exchange },
      { label: "Merchant", href: LINKS.merchant },
    ],
  },
  {
    id: "admin",
    num: "07",
    title: "Permanent Control",
    kicker: "Institutional administration",
    headline: "Enterprise-grade asset management",
    body: "Mint/burn/recovery/freeze/upgrade authority designed for regulated securities, enterprise currencies, and RWA.",
    architecture: `Mint Control · Burn · Recovery · Freeze · Upgrade Authority`,
    becomes: ["recovery", "custody", "freeze", "controlled issuance"],
    workflow: [
      "Assign institutional authority",
      "Enable recovery",
      "Freeze paths for incidents",
      "Audit permanent delegate",
    ],
    mis: `extension AssetAdministration {
    authority { institution: "Bank_A" }
    recovery { enabled=true }
}`,
    sdk: `await CLRTY.tokens.admin.setAuthority(mint, { institution: "Bank_A", recovery: true });`,
    api: "PermanentDelegate · MintCloseAuthority · Pausable",
    deps: ["ComplianceControl", "ImmutableOwner", "Pausable"],
    enterprise: "Banks and custodians recover assets under approved authority matrices.",
    links: [
      { label: "Enterprise", href: LINKS.enterprise },
      { label: "Agent Registry", href: LINKS.agentRegistry },
      { label: "Core", href: LINKS.core },
    ],
  },
  {
    id: "metadata",
    num: "08",
    title: "Metadata",
    kicker: "Digital asset identity",
    headline: "Turn tokens into complete digital assets",
    body: "Attach identity, ownership, regulatory data, documentation, verification, and provenance natively.",
    architecture: `MetadataPointer → TokenMetadata → AssetIdentity (hash + ownership)`,
    becomes: ["identity", "docs", "verification", "provenance"],
    workflow: [
      "Set MetadataPointer",
      "Write TokenMetadata",
      "Seal verification_hash",
      "Publish docs URI",
    ],
    mis: `metadata {
    asset: "Commercial Property"
    location: "New York"
    verification: verified
}`,
    sdk: `await CLRTY.tokens.metadata.set(mint, { asset_type: "Real Estate", verification: "blockchain_verified" });`,
    api: "MetadataPointer · TokenMetadata · AssetIdentity",
    deps: ["TokenGroup", "RWA", "Explorer"],
    enterprise: "Regulators resolve asset identity from on-chain verification records.",
    links: [
      { label: "Explorer", href: LINKS.explorer },
      { label: "Docs", href: LINKS.docs },
      { label: "RWA Docs", href: LINKS.rwaDocs },
    ],
  },
  {
    id: "rwa",
    num: "09",
    title: "RWA Framework",
    kicker: "Tokenize the global economy",
    headline: "Real World Asset tokenization",
    body: "Real estate, commodities, PE, invoices, securities, IP — with ownership, dividends, restrictions, compliance, and automated settlement.",
    architecture: `$NYC-TOWER · $50M · 500,000 fractional tokens`,
    becomes: ["fractional ownership", "oracle valuation", "compliance doors"],
    workflow: [
      "Classify asset_class",
      "Bind valuation oracle",
      "Enable fractional ownership",
      "Route settle via HELIX + MIRRA",
    ],
    mis: `asset RealEstate {
    asset_class: "Property"
    valuation { oracle: approved_provider }
    ownership { fractional=true }
}`,
    sdk: `await CLRTY.rwa.create({ symbol: "NYC-TOWER", valueUsd: 50_000_000, fractions: 500_000 });`,
    api: "RealWorldAsset · legal_reference · valuation_source",
    deps: ["Metadata", "Compliance", "MIRRA", "HELIX"],
    enterprise: "Property tokens encode rights, distributions, and transfer restrictions.",
    links: [
      { label: "RWA Docs", href: LINKS.rwaDocs },
      { label: "MIRRA", href: LINKS.mirra },
      { label: "HELIX", href: LINKS.helix },
      { label: "Enterprise", href: LINKS.enterprise },
    ],
  },
  {
    id: "stablecoin",
    num: "10",
    title: "Stablecoin Framework",
    kicker: "Enterprise digital currency",
    headline: "Next-generation digital currencies",
    body: "Reserve transparency, transfer controls, automated settlement, payment integrations, and institutional compliance.",
    architecture: `Reserve → Stable Contract → Compliance → Payment Network → Settlement`,
    becomes: ["verified reserves", "redemption", "HELIX settle"],
    workflow: [
      "Define backing reserves",
      "Enable redemption",
      "Wire CLRTY PAY",
      "Publish transparency feed",
    ],
    mis: `stablecoin USDX {
    reserve { type: verified_assets }
    redemption { enabled=true }
    settlement { HELIX=true }
}`,
    sdk: `await CLRTY.stablecoins.create({ symbol: "USDX", redemption: true, helix: true });`,
    api: "StableAsset · collateral_ratio · reserve_asset",
    deps: ["Compliance", "HELIX", "CLRTY PAY", "Confidential optional"],
    enterprise: "Fintechs, banks, and payment providers launch USDX with settlement SLAs.",
    links: [
      { label: "CLRTY PAY", href: LINKS.pay },
      { label: "Merchant", href: LINKS.merchant },
      { label: "Spark Merchant", href: LINKS.sparkMerchant },
      { label: "HELIX", href: LINKS.helix },
    ],
  },
  {
    id: "agents",
    num: "11",
    title: "AI Agent Extensions",
    kicker: "Autonomous economic assets",
    headline: "Tokens designed for autonomous systems",
    body: "Agent access tokens, compute credits, execution credits, and data access tokens for AI-powered financial infrastructure.",
    architecture: `AI Agent → Agent Token → CLRTY Skills → HELIX → Settlement`,
    becomes: ["API access", "compute credits", "execution credits", "data ACL"],
    workflow: [
      "Register agent in Agent Registry",
      "Mint ComputeCredit / AgentCredit",
      "Bind Skills permissions",
      "Cap execution limits",
    ],
    mis: `agent_token ComputeCredit {
    permissions {
        execute=true
        trade=false
        transfer=true
    }
}`,
    sdk: `await CLRTY.agents.bindToken({ agentId, mint, capabilities: ["execute", "transfer"] });`,
    api: "AgentExtension · capability_permissions · execution_limits",
    deps: ["Agent Registry", "CLARITY Skills", "HELIX"],
    enterprise: "Trading and treasury agents pay for workflow execution in credits.",
    links: [
      { label: "Agent Registry", href: LINKS.agentRegistry },
      { label: "Skills", href: LINKS.skills },
      { label: "Labs", href: LINKS.labs },
      { label: "Developer", href: LINKS.developer },
    ],
  },
  {
    id: "skills",
    num: "12",
    title: "CLARITY Skills",
    kicker: "Tokens that execute capabilities",
    headline: "Tokens that activate Skills",
    body: "$ENERGY example — settlement, dynamic pricing, automated compliance, marketplace, and yield skills composed on one credit.",
    architecture: `$ENERGY → settlement · pricing · compliance · marketplace · yield`,
    becomes: ["skill_connection", "automation_rules", "skill_registry"],
    workflow: [
      "Launch asset",
      "skill_connection bindings",
      "Publish to Skills registry",
      "Observe automation on settle",
    ],
    mis: `skill_connection ENERGY {
    settlement: enabled
    pricing: dynamic
    compliance: automatic
}`,
    sdk: `await CLRTY.skills.connect(mint, { settlement: true, pricing: "dynamic", compliance: "automatic" });`,
    api: "CLARITYSkill · skill_registry · execution_permissions",
    deps: ["Skills", "HELIX", "Agent Extension"],
    enterprise: "Energy credits become programmable settlement + pricing objects.",
    links: [
      { label: "Skills", href: LINKS.skills },
      { label: "GitBook", href: LINKS.gitbook },
      { label: "SDK", href: LINKS.developer },
    ],
  },
  {
    id: "mirra",
    num: "13",
    title: "MIRRA Integration",
    kicker: "Private institutional markets",
    headline: "Institutional assets require institutional privacy",
    body: "Private liquidity pools, trading assets, confidential instruments, restricted markets, and private settlement networks.",
    architecture: `Token → MIRRA → Private Liquidity → Institutional Settlement`,
    becomes: ["private pools", "approved entities", "restricted markets"],
    workflow: [
      "Enable MIRRAPrivateMarket",
      "Allowlist entities",
      "Open private book",
      "Settle confidentially",
    ],
    mis: `market PrivateFund {
    privacy: institutional
    access: approved_entities
}`,
    sdk: `await CLRTY.mirra.createMarket({ mint, privacy: "institutional", access: "approved" });`,
    api: "MIRRAPrivateMarket · privacy_layer · liquidity_permissions",
    deps: ["ConfidentialTransfer", "HELIX", "Enterprise"],
    enterprise: "Private funds trade with institutional privacy on CLRTY-1.",
    links: [
      { label: "MIRRA", href: LINKS.mirra },
      { label: "MIRRA Product", href: LINKS.mirraProduct },
      { label: "Enterprise", href: LINKS.enterprise },
      { label: "Confidential", href: LINKS.confidentialDocs },
    ],
  },
  {
    id: "sdk-marketplace",
    num: "14",
    title: "SDK & Marketplace",
    kicker: "Build · publish · install",
    headline: "Developer SDK + Extension Marketplace",
    body: "Publish reusable .mis modules — payment, compliance, yield, AI, governance, RWA — enterprises install with revenue share.",
    architecture: `Developer → Build Extension → Publish → Enterprise Installs → Revenue Share`,
    becomes: marketplaceModules,
    workflow: [
      "npm install @clrty/sdk",
      "Author module",
      "Publish to marketplace",
      "Enterprise installs",
    ],
    mis: `# Reusable marketplace module skeleton
module Extensions.PaymentRails
export PaymentModule`,
    sdk: `import { CLRTY } from "@clrty/sdk";
const asset = await CLRTY.asset.create({
  name: "Enterprise USD",
  symbol: "EUSD",
  language: ".mis",
  extensions: ["compliance", "confidential_transfer", "helix"]
});`,
    api: "@clrty/sdk · api.clarity-fintech.com · marketplace publish",
    deps: ["Developer SDK", "API Gateway", "RPC"],
    enterprise: "Modular financial OS — install only the rails you need.",
    links: [
      { label: "Developer", href: LINKS.developer },
      { label: "API", href: LINKS.api },
      { label: "RPC", href: LINKS.rpc },
      { label: "Docs", href: LINKS.docs },
    ],
  },
  {
    id: "final",
    num: "15",
    title: "CLRTY-1 Difference",
    kicker: "Final architecture",
    headline: "Token = financial system",
    body: "Traditional chains bolt contracts onto tokens. CLRTY-1 makes the token the asset, logic, execution, compliance, and financial system.",
    architecture: `CLRTY-1 → Token Extensions → .mis → HELIX · MIRRA · Skills → CLRTY PAY → Enterprise Economy`,
    becomes: clrtyDifference.clrty,
    workflow: ["Create", "Program", "Execute", "Settle", "Scale"],
    mis: `# The CLRTY-1 difference
# Token = Asset + Logic + Execution + Compliance + Financial System`,
    sdk: `// Build with CLRTY
await CLRTY.ready({ rpc: "https://rpc.clarity-fintech.com", chainId: 1202 });`,
    api: "Settlement clrty-1 / 1202 · 399ms hard cap · fixed 16M uclrty",
    deps: ["HELIX", "MIRRA", "Skills", "PAY", "Enterprise"],
    enterprise: "CLRTY-1 turns every token into programmable economic infrastructure.",
    links: [
      { label: "Home", href: LINKS.home },
      { label: "Core", href: LINKS.core },
      { label: "HELIX", href: LINKS.helix },
      { label: "Network", href: LINKS.network },
    ],
  },
];

