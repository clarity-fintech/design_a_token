#!/usr/bin/env node
/**
 * Live-connect CLRTY-1: eth_chainId + API /v1/status + optional wallet RPC.
 */
const RPC = process.env.CLRTY_RPC_URL || "https://rpc.clarity-fintech.com";
const API = process.env.CLRTY_API_URL || "https://api.clarity-fintech.com";
const EXPECTED = Number(process.env.CLRTY_CHAIN_ID || 1202);

async function rpc(url, method, id = 1) {
  const t0 = performance.now();
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id, method, params: [] }),
  });
  const json = await res.json();
  return { json, ms: Math.round(performance.now() - t0), ok: res.ok && !json.error };
}

async function main() {
  console.log(`==> CLRTY-1 connect · expect chain ${EXPECTED}`);
  const chain = await rpc(RPC, "eth_chainId");
  const tip = await rpc(RPC, "eth_blockNumber", 2);
  const hex = chain.json?.result;
  const numeric = hex ? Number.parseInt(hex, 16) : NaN;
  console.log(`RPC ${RPC}`);
  console.log(`  eth_chainId=${hex} (${numeric}) · ${chain.ms}ms · ${chain.ok ? "OK" : "FAIL"}`);
  console.log(`  eth_blockNumber=${tip.json?.result} · ${tip.ms}ms`);

  let statusOk = false;
  try {
    const t0 = performance.now();
    const res = await fetch(`${API}/v1/status`);
    const body = await res.json();
    statusOk = res.ok;
    console.log(`API ${API}/v1/status · ${Math.round(performance.now() - t0)}ms · ${statusOk ? "OK" : "FAIL"}`);
    console.log(`  ${JSON.stringify(body).slice(0, 180)}`);
  } catch (err) {
    console.error(`API FAIL: ${err.message}`);
  }

  const live = numeric === EXPECTED && chain.ok && statusOk;
  if (numeric !== EXPECTED) {
    console.error(`REFUSED: foreign chain ${hex} (${numeric}) — CLRTY-1 ONLY (1202 / 0x4b2). NEVER any other chain.`);
    process.exit(1);
  }
  console.log(live ? "SUCCESS: CLRTY-1 live (only chain)" : "FAIL: CLRTY-1 not fully live");
  process.exit(live ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
