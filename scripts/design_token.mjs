#!/usr/bin/env node
/**
 * CLI: design a CLRTY-1 Token Extension → emit .mis + SDK snippet + hash-trace tag.
 *
 *   node scripts/design_token.mjs --name "Enterprise USD" --symbol EUSD --ext confidential_transfer,compliance,stable,helix,mirra
 *   node scripts/design_token.mjs --name Demo --symbol DEMO --out ./out/DEMO.mis
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv) {
  const out = { ext: [] };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--name") out.name = argv[++i];
    else if (a === "--symbol") out.symbol = argv[++i];
    else if (a === "--supply") out.supply = argv[++i];
    else if (a === "--decimals") out.decimals = Number(argv[++i]);
    else if (a === "--ext") out.ext = String(argv[++i] || "").split(",").filter(Boolean);
    else if (a === "--out") out.out = argv[++i];
    else if (a === "--help" || a === "-h") out.help = true;
  }
  return out;
}

async function loadSdk() {
  const dist = resolve(root, "packages/sdk/dist/index.js");
  try {
    return await import(pathToFileURL(dist).href);
  } catch {
    // Fall back to building from source via tsx-less dynamic transpile: use inline minimal
    const src = resolve(root, "packages/sdk/src/index.ts");
    throw new Error(`SDK not built. Run: npm run build:sdk\nTried ${dist}\n(${src})`);
  }
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.name || !args.symbol) {
    console.log(`Usage:
  node scripts/design_token.mjs --name "Enterprise USD" --symbol EUSD \\
    --ext confidential_transfer,compliance,stable,helix,mirra \\
    [--supply 1000000000] [--decimals 9] [--out path.mis]
`);
    process.exit(args.help ? 0 : 1);
  }

  const sdk = await loadSdk();
  const token = sdk.designToken({
    name: args.name,
    symbol: args.symbol,
    supply: args.supply,
    decimals: args.decimals,
    extensions: args.ext.length ? args.ext : undefined,
  });

  const tag = token.hashTrace["@"];
  const digest = token.hashTrace.sha256;
  const stamped = token.misSource;

  console.log("=== Designed Token ===");
  console.log(JSON.stringify({
    name: token.name,
    symbol: token.symbol,
    chainId: token.chainId,
    network: token.network,
    extensions: token.extensions,
    "@": tag,
    sha256: digest,
    pages: token.pages,
  }, null, 2));
  console.log("\n=== .mis ===\n");
  console.log(stamped);
  console.log("\n=== SDK ===\n");
  console.log(token.sdkCreateSnippet);

  if (args.out) {
    mkdirSync(dirname(resolve(args.out)), { recursive: true });
    writeFileSync(resolve(args.out), stamped);
    console.log(`\nwrote ${args.out}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
