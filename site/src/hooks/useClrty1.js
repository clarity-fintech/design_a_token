import { useEffect, useState } from "react";
import { CLRTY1, CLRTY1_ROUTES, isClrty1ChainId, routeToClrty1 } from "../data/clrty1Routing.js";

async function rpcCall(url, method, id = 1) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id, method, params: [] }),
  });
  return res.json();
}

async function headOk(url) {
  try {
    const r = await fetch(url, { method: "GET", mode: "cors" });
    return r.ok || r.status === 405 || r.status === 404 ? r.status : r.status;
  } catch {
    return null;
  }
}

function parseChainId(raw) {
  if (raw == null) return null;
  if (typeof raw === "string" && raw.startsWith("0x")) return parseInt(raw, 16);
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

export function useClrty1() {
  const [status, setStatus] = useState({
    live: false,
    chainId: null,
    chainIdHex: null,
    blockNumber: null,
    latencyMs: null,
    apiLambda: null,
    apiOk: false,
    explorerOk: null,
    walletRpcOk: null,
    refusedForeignChain: false,
    routes: CLRTY1_ROUTES,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const probe = async () => {
      const t0 = performance.now();
      const rpcUrl = CLRTY1_ROUTES.rpc.href;
      try {
        const [chainJson, blockJson, apiJson, explorerStatus, walletRpc] = await Promise.all([
          rpcCall(rpcUrl, "eth_chainId", 1),
          rpcCall(rpcUrl, "eth_blockNumber", 2),
          fetch(CLRTY1_ROUTES.api.status)
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null),
          headOk(CLRTY1_ROUTES.explorer_api.href),
          rpcCall(CLRTY1_ROUTES.wallet_rpc.href, "eth_chainId", 3).catch(() => null),
        ]);

        const ms = Math.round(performance.now() - t0);
        if (cancelled) return;

        const numeric = parseChainId(chainJson?.result);
        const blockNumber = parseChainId(blockJson?.result);
        const walletChain = parseChainId(walletRpc?.result);

        const isClrty1 = isClrty1ChainId(numeric);
        const walletOk = walletChain == null || isClrty1ChainId(walletChain);
        const refused = numeric != null && !isClrty1;

        setStatus({
          // LIVE only on CLRTY-1 — never report live for any other chain
          live: isClrty1,
          chainId: isClrty1 ? CLRTY1.chainId : numeric,
          chainIdHex: isClrty1 ? CLRTY1.chainIdHex : chainJson?.result ?? null,
          blockNumber: isClrty1 ? blockNumber : null,
          latencyMs: ms,
          apiLambda: apiJson?.lambda ?? null,
          apiOk: Boolean(apiJson) && isClrty1,
          explorerOk: explorerStatus,
          walletRpcOk: walletOk && isClrty1,
          refusedForeignChain: refused,
          routes: CLRTY1_ROUTES,
          error: refused
            ? `REFUSED foreign chain ${chainJson?.result} — CLRTY-1 only (1202 / 0x4b2)`
            : null,
        });
      } catch (err) {
        if (cancelled) return;
        setStatus((s) => ({
          ...s,
          live: false,
          chainId: null,
          chainIdHex: null,
          blockNumber: null,
          latencyMs: null,
          apiLambda: null,
          apiOk: false,
          refusedForeignChain: false,
          error: String(err?.message || err),
        }));
      }
    };

    probe();
    const id = setInterval(probe, 12_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return {
    ...status,
    latencyCapMs: CLRTY1.latencyHardCapMs,
    network: CLRTY1.network,
    settlement: CLRTY1.settlement,
    onlyChain: true,
    route: routeToClrty1,
  };
}
