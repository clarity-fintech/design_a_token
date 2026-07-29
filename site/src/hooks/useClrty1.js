import { useEffect, useState } from "react";
import { CLRTY1, CLRTY1_ROUTES, routeToClrty1 } from "../data/clrty1Routing.js";

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

export function useClrty1() {
  const [status, setStatus] = useState({
    live: false,
    chainId: null,
    blockNumber: null,
    latencyMs: null,
    apiLambda: null,
    apiOk: false,
    explorerOk: null,
    walletRpcOk: null,
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

        const raw = chainJson?.result ?? null;
        const numeric =
          typeof raw === "string" && raw.startsWith("0x")
            ? parseInt(raw, 16)
            : Number(raw) || CLRTY1.chainId;

        const blockRaw = blockJson?.result ?? null;
        const blockNumber =
          typeof blockRaw === "string" && blockRaw.startsWith("0x")
            ? parseInt(blockRaw, 16)
            : Number(blockRaw) || null;

        const walletChain = walletRpc?.result
          ? typeof walletRpc.result === "string" && walletRpc.result.startsWith("0x")
            ? parseInt(walletRpc.result, 16)
            : Number(walletRpc.result)
          : null;

        setStatus({
          live: numeric === CLRTY1.chainId,
          chainId: numeric,
          blockNumber,
          latencyMs: ms,
          apiLambda: apiJson?.lambda ?? null,
          apiOk: Boolean(apiJson),
          explorerOk: explorerStatus,
          walletRpcOk: walletChain === CLRTY1.chainId,
          routes: CLRTY1_ROUTES,
          error: null,
        });
      } catch (err) {
        if (cancelled) return;
        setStatus((s) => ({
          ...s,
          live: false,
          chainId: CLRTY1.chainId,
          blockNumber: null,
          latencyMs: null,
          apiLambda: null,
          apiOk: false,
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
    chainIdHex: CLRTY1.chainIdHex,
    settlement: CLRTY1.settlement,
    route: routeToClrty1,
  };
}
