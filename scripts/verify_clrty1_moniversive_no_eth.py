#!/usr/bin/env python3
"""design_a_token: CLRTY-1 Moniversive ONLY — NO ETH settlement."""
from __future__ import annotations
import json, re, subprocess, urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RPC = "https://rpc.clarity-fintech.com"
SKIP = {".git", "node_modules", "dist", "playwright-report", "test-results", "assets"}
ALLOW = re.compile(r"verify_clrty1|clrty1Routing|moniversive_only_no_eth|refused|HASH_TRACE|no_eth", re.I)

def probe():
    try:
        req = urllib.request.Request(RPC, data=b'{"jsonrpc":"2.0","id":1,"method":"eth_chainId","params":[]}', headers={"content-type":"application/json","user-agent":"design-a-token-no-eth/1"})
        with urllib.request.urlopen(req, timeout=20) as r:
            data = json.loads(r.read().decode())
    except Exception:
        out = subprocess.check_output(["curl","-sS","-A","design-a-token-no-eth/1","-H","content-type: application/json","-d",'{"jsonrpc":"2.0","id":1,"method":"eth_chainId","params":[]}',RPC], text=True, timeout=25)
        data = json.loads(out)
    hx = data.get("result"); n = int(hx,16) if isinstance(hx,str) else None
    return hx == "0x4b2" and n == 1202, hx, n

def refused_ctx(text, pos):
    w = text[max(0,pos-180):pos+80].lower()
    return any(k in w for k in ("refused","foreign_non_settlement","no_eth","not_settlement"))

ok, hx, n = probe()
print(f"RPC eth_chainId={hx} ({n}) {'OK' if ok else 'FAIL'}")
issues=[]
boot = json.loads((ROOT/"boot/clarity_token_extensions.json").read_text())
if (boot.get("settlement") or {}).get("chain_id") != 1202: issues.append("token extensions not 1202")
if (boot.get("blockchain") or {}).get("ethereum") is not False: issues.append("blockchain.ethereum must be false")
sett = ROOT/"boot/settlement_config.json"
if sett.exists():
    s=json.loads(sett.read_text())
    if s.get("chain_id") != 1202 or s.get("network_name") == "Ethereum Mainnet":
        issues.append("settlement_config not CLRTY-1")
for p in ROOT.rglob("*"):
    if not p.is_file() or any(x in p.parts for x in SKIP): continue
    if p.suffix.lower() in {".png",".jpg",".lock",".map"}: continue
    if p.stat().st_size > 8_000_000: continue
    rel=p.relative_to(ROOT).as_posix()
    if ALLOW.search(rel): continue
    try: t=p.read_text(encoding="utf-8", errors="ignore")
    except Exception: continue
    for m in re.finditer(r"network=mainnet\b", t, re.I):
        if not refused_ctx(t, m.start()): issues.append(f"{rel}: network=mainnet")
    for m in re.finditer(r'"network_name"\s*:\s*"Ethereum Mainnet"', t):
        if not refused_ctx(t, m.start()): issues.append(f"{rel}: Ethereum Mainnet")
for i in issues[:20]: print("FAIL", i)
if not ok or issues:
    raise SystemExit(1)
print("SUCCESS: design_a_token on CLRTY-1 Moniversive — NO ETH settlement")
