#!/usr/bin/env node
/** CLRTY-1 ONLY gate for design_a_token — NEVER any other chain. */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CLRTY1 = { network: "clrty-1", chainId: 1202, chainIdHex: "0x4b2" };
const RPC = process.env.CLRTY_RPC_URL || "https://rpc.clarity-fintech.com";

async function probeRpc() {
  const res = await fetch(RPC, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_chainId", params: [] }),
  });
  const json = await res.json();
  const hex = json?.result;
  const n = hex ? Number.parseInt(hex, 16) : NaN;
  if (hex !== CLRTY1.chainIdHex || n !== CLRTY1.chainId) {
    throw new Error(`REFUSED: RPC returned ${hex} (${n}) — CLRTY-1 only (0x4b2 / 1202)`);
  }
  return { hex, n };
}

function scan(label, text) {
  const issues = [];
  for (const m of text.matchAll(/\bchainId=(?!1202\b)[^&\s"']+/gi)) issues.push(`${label}: ${m[0]}`);
  for (const m of text.matchAll(/\bnetwork=(mainnet|ethereum|eth|sepolia|goerli|polygon|base|arbitrum)\b/gi)) {
    issues.push(`${label}: ${m[0]}`);
  }
  return issues;
}

const rpc = await probeRpc();
console.log(`RPC OK eth_chainId=${rpc.hex} (${rpc.n})`);
let fail = 0;
for (const rel of [
  "site/public/backlink-pack.json",
  "site/public/cross-route-pack.json",
  "boot/clarity_token_extensions.json",
  "boot/clrty1_full_project_cross_route.ui.json",
]) {
  const p = resolve(ROOT, rel);
  if (!existsSync(p)) { console.warn(`SKIP ${rel}`); continue; }
  const issues = scan(rel, readFileSync(p, "utf8"));
  if (issues.length) { fail = 1; issues.slice(0, 10).forEach((i) => console.error("FAIL", i)); }
  else console.log("OK", rel);
}
if (fail) process.exit(1);
console.log("SUCCESS: CLRTY-1 only — never any other chain");
