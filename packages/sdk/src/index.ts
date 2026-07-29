import { createHash } from "node:crypto";

/** CLRTY-1 Token Extension identifiers (protocol-native). */
export type ExtensionId =
  | "confidential_transfer"
  | "transfer_logic"
  | "transfer_fee"
  | "permanent_control"
  | "metadata"
  | "compliance"
  | "rwa"
  | "stable"
  | "agent"
  | "clarity_skill"
  | "helix"
  | "mirra"
  | "governance"
  | "interest_bearing"
  | "pausable";

export interface DesignTokenInput {
  name: string;
  symbol: string;
  decimals?: number;
  supply?: number | string;
  contractLanguage?: ".mis" | "python-tagged";
  chainId?: number;
  extensions?: ExtensionId[];
  metadata?: Record<string, string | number | boolean>;
}

export interface HashTraceTag {
  "@": string;
  sha256: string;
  bytes: number;
}

export interface DesignedToken {
  name: string;
  symbol: string;
  decimals: number;
  supply: string;
  chainId: number;
  network: "clrty-1";
  contractLanguage: ".mis" | "python-tagged";
  extensions: ExtensionId[];
  misSource: string;
  sdkCreateSnippet: string;
  hashTrace: HashTraceTag;
  pages: {
    live: string;
    pagesDev: string;
    pathMount: string;
    github: string;
  };
}

export const CLRTY1 = {
  chainId: 1202,
  chainIdHex: "0x4b2",
  network: "clrty-1" as const,
  latencyHardCapMs: 399,
  symbol: "uclrty",
  fixedSupply: 16_000_000,
  rpc: "https://rpc.clarity-fintech.com",
  api: "https://api.clarity-fintech.com",
  apiStatus: "https://api.clarity-fintech.com/v1/status",
  explorer: "https://network-monitor-d1g.pages.dev/explorer/?portal=rpc&q=CLRTY",
  pages: {
    live: "https://tokens.clarity-fintech.com/",
    pagesDev: "https://clarity-tokens.pages.dev/",
    pathMount: "https://network-monitor-d1g.pages.dev/clarity-tokens/",
    github: "https://github.com/clarity-fintech/design_a_token",
  },
  settlement: {
    network: "clrty-1",
    chainId: 1202,
    kernel: "misc",
    language: ".mis",
  },
};

const DEFAULT_EXTENSIONS: ExtensionId[] = [
  "confidential_transfer",
  "transfer_logic",
  "metadata",
  "compliance",
  "helix",
  "mirra",
];

const EXT_MIS: Record<ExtensionId, string> = {
  confidential_transfer: "ConfidentialTransfer",
  transfer_logic: "TransferLogic",
  transfer_fee: "TransferFeeConfig",
  permanent_control: "PermanentDelegate",
  metadata: "TokenMetadata",
  compliance: "ComplianceControl",
  rwa: "RealWorldAsset",
  stable: "StableAsset",
  agent: "AgentExtension",
  clarity_skill: "CLARITYSkill",
  helix: "HELIXExecution",
  mirra: "MIRRAPrivateMarket",
  governance: "GovernanceExtension",
  interest_bearing: "InterestBearingConfig",
  pausable: "Pausable",
};

function toMisIdent(symbol: string): string {
  const cleaned = symbol.replace(/[^A-Za-z0-9_]/g, "_");
  return cleaned.match(/^[A-Za-z]/) ? cleaned : `T_${cleaned}`;
}

function tagFromDigest(digestHex: string, byteLength: number): HashTraceTag {
  return {
    "@": `@CLRTY.TokenExtensions#${digestHex.slice(0, 16)}`,
    sha256: digestHex,
    bytes: byteLength,
  };
}

/** SHA-256 + @CLRTY.TokenExtensions# tracing tag. */
export async function hashTraceBytes(data: string | Uint8Array): Promise<HashTraceTag> {
  const bytes = typeof data === "string" ? new TextEncoder().encode(data) : data;
  if (globalThis.crypto?.subtle) {
    const copy = new Uint8Array(bytes.byteLength);
    copy.set(bytes);
    const buf = await globalThis.crypto.subtle.digest("SHA-256", copy);
    const digestHex = [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
    return tagFromDigest(digestHex, bytes.byteLength);
  }
  return hashTraceSync(typeof data === "string" ? data : new TextDecoder().decode(data));
}

/** Synchronous Node hash (CLI / scripts). */
export function hashTraceSync(data: string): HashTraceTag {
  const digest = createHash("sha256").update(data, "utf8").digest("hex");
  return tagFromDigest(digest, new TextEncoder().encode(data).byteLength);
}

export function stampMisSource(source: string, tag: HashTraceTag): string {
  const header =
    `// hash-trace: ${tag["@"]}\n` +
    `// sha256: ${tag.sha256}\n` +
    `// settlement: clrty-1 / 1202 · kernel: misc\n`;
  if (source.startsWith("// hash-trace:")) {
    const rest = source.replace(/^\/\/ hash-trace:.*\n(\/\/ sha256:.*\n)?(\/\/ settlement:.*\n)?/, "");
    return header + rest;
  }
  return header + source;
}

export function renderMisContract(input: DesignTokenInput): string {
  const symbol = input.symbol.toUpperCase();
  const ident = toMisIdent(symbol);
  const supply = String(input.supply ?? 1_000_000_000);
  const extensions = input.extensions?.length ? input.extensions : DEFAULT_EXTENSIONS;
  const extBlock = extensions.map((e) => `        ${EXT_MIS[e] || e},`).join("\n");

  return `// Designed on CLRTY-1 · design_a_token · chain 1202
// Live: https://clarity-tokens.pages.dev/
// Repo: https://github.com/clarity-fintech/design_a_token
module CLRTY.TokenExtensions.${ident}

asset ${ident} = CLRTY.createToken(
    name: ${JSON.stringify(input.name)},
    symbol: ${JSON.stringify(symbol)},
    supply: ${supply},
    extensions: [
${extBlock}
    ]
)
`;
}

export function renderSdkSnippet(input: DesignTokenInput): string {
  const extensions = input.extensions?.length ? input.extensions : DEFAULT_EXTENSIONS;
  return `import { designToken, connectClrty1 } from "@clrty/design-a-token-sdk";

const mesh = await connectClrty1();
console.log("CLRTY-1", mesh.chainId, mesh.live);

const token = designToken({
  name: ${JSON.stringify(input.name)},
  symbol: ${JSON.stringify(input.symbol.toUpperCase())},
  contractLanguage: ".mis",
  chainId: 1202,
  extensions: ${JSON.stringify(extensions, null, 2).replace(/\n/g, "\n  ")}
});

console.log(token.hashTrace["@"]);
console.log(token.misSource);
`;
}

/** Design a CLRTY Token Extensions asset (offline blueprint → .mis + SDK + hash-trace). */
export function designToken(input: DesignTokenInput): DesignedToken {
  if (!input.name?.trim()) throw new Error("name required");
  if (!input.symbol?.trim()) throw new Error("symbol required");
  const extensions = input.extensions?.length ? input.extensions : DEFAULT_EXTENSIONS;
  const misSourceRaw = renderMisContract({ ...input, extensions });
  const hashTrace = hashTraceSync(misSourceRaw);
  const misSource = stampMisSource(misSourceRaw, hashTrace);
  return {
    name: input.name.trim(),
    symbol: input.symbol.trim().toUpperCase(),
    decimals: input.decimals ?? 9,
    supply: String(input.supply ?? 1_000_000_000),
    chainId: input.chainId ?? CLRTY1.chainId,
    network: CLRTY1.network,
    contractLanguage: input.contractLanguage ?? ".mis",
    extensions,
    misSource,
    sdkCreateSnippet: renderSdkSnippet({ ...input, extensions }),
    hashTrace,
    pages: { ...CLRTY1.pages },
  };
}

export interface Clrty1MeshStatus {
  live: boolean;
  chainId: number;
  chainIdHex: string | null;
  blockNumber: number | null;
  latencyMs: number | null;
  apiOk: boolean;
  rpc: string;
  api: string;
  network: "clrty-1";
}

async function rpcCall(url: string, method: string, id = 1): Promise<{ result?: string; ms: number }> {
  const t0 = performance.now();
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id, method, params: [] }),
  });
  const json = (await res.json()) as { result?: string; error?: unknown };
  if (json.error) throw new Error(String(json.error));
  return { result: json.result, ms: Math.round(performance.now() - t0) };
}

/** Live-probe CLRTY-1 RPC + API status. */
export async function connectClrty1(opts?: {
  rpc?: string;
  api?: string;
}): Promise<Clrty1MeshStatus> {
  const rpc = opts?.rpc ?? CLRTY1.rpc;
  const api = opts?.api ?? CLRTY1.api;
  try {
    const [chain, tip, statusRes] = await Promise.all([
      rpcCall(rpc, "eth_chainId"),
      rpcCall(rpc, "eth_blockNumber", 2),
      fetch(`${api}/v1/status`)
        .then(async (r) => ({ ok: r.ok }))
        .catch(() => ({ ok: false })),
    ]);
    const hex = chain.result ?? null;
    const numeric = hex ? Number.parseInt(hex, 16) : NaN;
    const blockNumber = tip.result ? Number.parseInt(tip.result, 16) : null;
    return {
      live: numeric === CLRTY1.chainId && statusRes.ok,
      chainId: Number.isFinite(numeric) ? numeric : CLRTY1.chainId,
      chainIdHex: hex,
      blockNumber,
      latencyMs: chain.ms,
      apiOk: statusRes.ok,
      rpc,
      api,
      network: CLRTY1.network,
    };
  } catch {
    return {
      live: false,
      chainId: CLRTY1.chainId,
      chainIdHex: null,
      blockNumber: null,
      latencyMs: null,
      apiOk: false,
      rpc,
      api,
      network: CLRTY1.network,
    };
  }
}

/** Append CLRTY-1 settlement query params to Clarity-owned URLs. */
export function routeToClrty1(href: string, extra: Record<string, string | number> = {}): string {
  if (!href || href.startsWith("#") || href.startsWith("mailto:")) return href;
  try {
    const u = new URL(href, CLRTY1.pages.pagesDev);
    const host = u.hostname || "";
    const owned =
      host.endsWith("clarity-fintech.com") ||
      host.endsWith("clrty.network") ||
      host.endsWith("pages.dev");
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

export const EXTENSION_CATALOG: { id: ExtensionId; title: string; purpose: string }[] = [
  { id: "confidential_transfer", title: "Confidential Transfers", purpose: "Private institutional transfers" },
  { id: "transfer_logic", title: "Transfer Logic", purpose: "Custom movement rules" },
  { id: "transfer_fee", title: "Transfer Fees", purpose: "Native transaction economics" },
  { id: "permanent_control", title: "Permanent Control", purpose: "Enterprise lifecycle controls" },
  { id: "metadata", title: "Metadata", purpose: "Digital asset identity" },
  { id: "compliance", title: "Compliance", purpose: "Regulated asset controls" },
  { id: "rwa", title: "Real World Assets", purpose: "RWA tokenization" },
  { id: "stable", title: "Stablecoin", purpose: "Reserve-backed currencies" },
  { id: "agent", title: "AI Agents", purpose: "Autonomous execution credits" },
  { id: "clarity_skill", title: "CLARITY Skills", purpose: "Modular financial capabilities" },
  { id: "helix", title: "HELIX", purpose: "Execution optimization" },
  { id: "mirra", title: "MIRRA", purpose: "Private financial markets" },
  { id: "governance", title: "Governance", purpose: "Community and protocol control" },
  { id: "interest_bearing", title: "Interest Bearing", purpose: "Accrual configuration" },
  { id: "pausable", title: "Pausable", purpose: "Emergency pause authority" },
];

export const NANO_TASK_RANGE = { from: "CTE001", to: "CTE100", count: 100 } as const;
