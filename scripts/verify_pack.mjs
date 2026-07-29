#!/usr/bin/env node
/**
 * Verify backlink pack + boot manifests are present and CLRTY-1 stamped.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const required = [
  "boot/clarity_token_extensions.json",
  "boot/clarity_token_extensions_hash_trace.json",
  "boot/clarity_token_extensions_nanotasks_cte100.json",
  "boot/backlink-pack.json",
  "index/backlink-pack.json",
  "index/pack-counts.json",
  "site/public/backlink-pack.json",
  "mis/MisClrtyTokenExtensions.mis",
  "mis/clrty_token_extensions_integration_matrix.mis",
];

let fail = 0;
for (const rel of required) {
  const p = resolve(root, rel);
  if (!existsSync(p)) {
    console.error(`MISSING ${rel}`);
    fail = 1;
  } else {
    console.log(`OK ${rel}`);
  }
}

const pack = JSON.parse(readFileSync(resolve(root, "boot/backlink-pack.json"), "utf8"));
const counts = pack.meta?.counts || pack.counts || {};
const total = counts.pack_total ?? pack.links?.length ?? 0;
console.log(`pack_total=${total}`);
if (total < 100) {
  console.error("backlink pack looks empty");
  fail = 1;
}

const hashTrace = JSON.parse(
  readFileSync(resolve(root, "boot/clarity_token_extensions_hash_trace.json"), "utf8"),
);
if (hashTrace.chain_id !== 1202 || hashTrace.settlement_network !== "clrty-1") {
  console.error("hash-trace settlement mismatch");
  fail = 1;
}
console.log(`hash-trace modules=${hashTrace.modules?.length ?? 0}`);

const boot = JSON.parse(readFileSync(resolve(root, "boot/clarity_token_extensions.json"), "utf8"));
if (boot.chain?.numeric !== 1202) {
  console.error("boot chain id mismatch");
  fail = 1;
}

if (fail) process.exit(1);
console.log("SUCCESS: pack + boot + hash-trace verified");
