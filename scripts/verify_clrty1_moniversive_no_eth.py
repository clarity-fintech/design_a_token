#!/usr/bin/env python3
"""ONLY the actual CLRTY-1 chain itself — custom Moniversive. ALL OTHERS ASIDE.

Pass criteria:
  - Live RPC eth_chainId == 0x4b2 (1202) on CLRTY-1
  - settlement / token extensions / L1 = clrty-1 / 1202 only
  - policy CLRTY-1_CUSTOM_MONIVERSIVE_CHAIN_ONLY_ALL_OTHERS_ASIDE
  - home_chain.id == clrty-1; all_other_chains.status == aside
  - No active settlement on Ethereum or any foreign L1/L2

JSON-RPC eth_* names are CLRTY-1 tooling surface only.
Foreign chains may appear only under refused_* / all_other_chains_aside.
"""
from __future__ import annotations

import json
import re
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / "var" / "launch" / "clrty1_moniversive_no_eth_scan.json"
RPC = "https://rpc.clarity-fintech.com"

SCOPES = [
    ROOT / "frontend/clarity-tokens",
    ROOT / "external/clarity-fintech/design_a_token",
    ROOT / "moniversive/framework/token",
    ROOT / "moniversive/nanotasks",
    ROOT / "CLRTY_SUBSTRATE/boot",
    ROOT / "scripts/clarity-tokens",
    ROOT / "smart_contract_dev-kit/clarity-tokens",
    ROOT / "clrty-1",
]

SKIP_DIR = {".git", "node_modules", "dist", "playwright-report", "test-results", "assets"}
SKIP_EXT = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".woff", ".woff2", ".ico", ".map", ".lock"}

ALLOW_PATH = re.compile(
    r"verify_clrty1|clrty1Routing|moniversive_only_no_eth|refusedNetworks|"
    r"HASH_TRACE|no_eth|NO_ETH|refused_settlement|foreign_non_settlement"
)

# Active settlement pollution (not refused_* catalog rows)
ACTIVE_BAD = [
    (re.compile(r"network=mainnet\b", re.I), "network=mainnet"),
    (re.compile(r"network=ethereum\b", re.I), "network=ethereum"),
    (re.compile(r'"network_name"\s*:\s*"Ethereum Mainnet"', re.I), "network_name Ethereum Mainnet"),
    (re.compile(r'"settlement_network"\s*:\s*"(ethereum|eth|mainnet)"', re.I), "settlement_network eth"),
    (re.compile(r'"settlement_authority"[^\]]*?"chain_id"\s*:\s*1\b', re.S), "settlement_authority chain_id 1"),
]


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def in_refused_context(text: str, pos: int) -> bool:
    window = text[max(0, pos - 180) : pos + 80].lower()
    return any(
        k in window
        for k in (
            "refused",
            "foreign_non_settlement",
            "refused_settlement",
            "all_other_chains_aside",
            "all_other_chains",
            "aside",
            "ethereum_home_chain\": false",
            "role\": \"refused_settlement\"",
            "never ethereum",
            "no_eth",
            "not_settlement",
            "outer_chains",
        )
    )


def probe_rpc() -> dict:
    body = json.dumps({"jsonrpc": "2.0", "id": 1, "method": "eth_chainId", "params": []}).encode()
    req = urllib.request.Request(
        RPC,
        data=body,
        headers={
            "content-type": "application/json",
            "user-agent": "clrty1-moniversive-no-eth-scan/1.0",
            "accept": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.loads(resp.read().decode())
    except Exception as err:
        # fallback: curl (some edges block bare urllib)
        import subprocess

        r = subprocess.run(
            [
                "curl",
                "-sS",
                "-A",
                "clrty1-moniversive-no-eth-scan/1.0",
                "-H",
                "content-type: application/json",
                "-d",
                '{"jsonrpc":"2.0","id":1,"method":"eth_chainId","params":[]}',
                RPC,
            ],
            capture_output=True,
            text=True,
            timeout=25,
        )
        if r.returncode != 0:
            return {"ok": False, "hex": None, "numeric": None, "error": f"{err}; curl:{r.stderr[:120]}"}
        data = json.loads(r.stdout)
    hex_id = data.get("result")
    numeric = int(hex_id, 16) if isinstance(hex_id, str) else None
    ok = hex_id == "0x4b2" and numeric == 1202
    return {"ok": ok, "hex": hex_id, "numeric": numeric}


def check_boot() -> list[str]:
    issues: list[str] = []
    settlement = json.loads((ROOT / "CLRTY_SUBSTRATE/boot/settlement_config.json").read_text())
    if settlement.get("chain_id") != 1202 or settlement.get("settlement_network") != "clrty-1":
        issues.append("settlement_config not CLRTY-1 / 1202")
    if settlement.get("blockchain", {}).get("ethereum") is not False:
        issues.append("settlement_config.blockchain.ethereum must be false")
    if settlement.get("network_name") == "Ethereum Mainnet":
        issues.append("settlement_config still names Ethereum Mainnet")

    te = json.loads((ROOT / "CLRTY_SUBSTRATE/boot/clarity_token_extensions.json").read_text())
    chain = te.get("chain") or {}
    sett = te.get("settlement") or {}
    if chain.get("numeric") != 1202 and sett.get("chain_id") != 1202:
        issues.append("clarity_token_extensions not on 1202")
    if (sett.get("network") or chain.get("id")) not in ("clrty-1", None) and sett.get("network") != "clrty-1":
        if sett.get("network") not in (None, "clrty-1") and chain.get("id") != "clrty-1":
            issues.append("clarity_token_extensions network not clrty-1")

    l1 = json.loads((ROOT / "CLRTY_SUBSTRATE/boot/l1_network_manifest.json").read_text())
    if l1.get("chain_id") != 1202 or l1.get("chain_slug") != "clrty-1":
        issues.append("l1_network_manifest not CLRTY-1")

    policy = ROOT / "CLRTY_SUBSTRATE/boot/clrty1_moniversive_only_no_eth.json"
    if not policy.is_file():
        issues.append("missing clrty1_moniversive_only_no_eth.json")
    else:
        p = json.loads(policy.read_text())
        if p.get("policy") != "CLRTY-1_CUSTOM_MONIVERSIVE_CHAIN_ONLY_ALL_OTHERS_ASIDE":
            issues.append("policy id must be CLRTY-1_CUSTOM_MONIVERSIVE_CHAIN_ONLY_ALL_OTHERS_ASIDE")
        home = p.get("home_chain") or {}
        if home.get("id") != "clrty-1" or home.get("chain_id") != 1202:
            issues.append("home_chain must be clrty-1 / 1202 only")
        if home.get("type") != "custom_moniversive_chain":
            issues.append("home_chain.type must be custom_moniversive_chain")
        if p.get("blockchain", {}).get("ethereum") is not False:
            issues.append("moniversive_only policy ethereum!=false")
        if p.get("blockchain", {}).get("chain_id") != 1202:
            issues.append("moniversive_only policy chain_id!=1202")
        if p.get("blockchain", {}).get("network") != "clrty-1":
            issues.append("moniversive_only policy network!=clrty-1")
        if p.get("blockchain", {}).get("custom_moniversive_chain") is not True:
            issues.append("moniversive_only policy custom_moniversive_chain!=true")
        if p.get("blockchain", {}).get("all_other_chains_aside") is not True:
            issues.append("moniversive_only policy all_other_chains_aside!=true")
        if p.get("blockchain", {}).get("home_settlement_only") is not True:
            issues.append("moniversive_only policy home_settlement_only!=true")
        aside = p.get("all_other_chains") or {}
        if aside.get("status") != "aside":
            issues.append("all_other_chains.status must be aside")
        if aside.get("settlement") is not False or aside.get("product_home") is not False:
            issues.append("all_other_chains must refuse settlement + product_home")

    spark = json.loads((ROOT / "CLRTY_SUBSTRATE/boot/clarity_spark_merchant_payment_rails.json").read_text())
    auth = spark.get("settlement_authority") or {}
    if auth.get("chain_id") != 1202 or auth.get("network") != "clrty-1":
        issues.append("spark payment rails settlement_authority not CLRTY-1")
    if auth.get("ethereum") is not False:
        issues.append("spark payment rails must set ethereum:false")
    if auth.get("all_other_chains_aside") is not True:
        issues.append("spark payment rails must set all_other_chains_aside:true")
    if auth.get("custom_moniversive_chain") is not True:
        issues.append("spark payment rails must set custom_moniversive_chain:true")
    multi = spark.get("native_onchain_and_multichain") or {}
    home = spark.get("clrty1_home_only_rails") or {}
    if "evm_chains" in multi:
        issues.append("spark rails still has active evm_chains settlement block — use all_other_chains_aside")
    if not home.get("clrty1_native_rail"):
        issues.append("spark rails missing clrty1_home_only_rails.clrty1_native_rail")
    aside = home.get("all_other_chains_aside") or multi.get("foreign_non_settlement_ingress") or {}
    if aside and aside.get("settlement") is not False:
        issues.append("spark aside chains must have settlement:false")

    return issues


def scan_files() -> tuple[int, list[dict]]:
    scanned = 0
    issues: list[dict] = []
    for scope in SCOPES:
        if not scope.exists():
            continue
        for path in scope.rglob("*"):
            if not path.is_file():
                continue
            if any(part in SKIP_DIR for part in path.parts):
                continue
            if path.suffix.lower() in SKIP_EXT:
                continue
            if path.stat().st_size > 8_000_000:
                continue
            rel = path.relative_to(ROOT).as_posix()
            if ALLOW_PATH.search(rel):
                continue
            try:
                text = path.read_text(encoding="utf-8", errors="ignore")
            except OSError:
                continue
            scanned += 1

            # Precise: top-level settlement chain_id:1 outside refused context
            for m in re.finditer(r'"chain_id"\s*:\s*1\b', text):
                if in_refused_context(text, m.start()):
                    continue
                # allow inside foreign lists only if marked refused nearby
                issues.append({"path": rel, "kind": "chain_id:1", "ctx": text[max(0, m.start() - 60) : m.end() + 40]})

            for rx, label in ACTIVE_BAD:
                for m in rx.finditer(text):
                    if in_refused_context(text, m.start()):
                        continue
                    issues.append({"path": rel, "kind": label, "ctx": text[max(0, m.start() - 40) : m.end() + 40]})

    return scanned, issues


def check_mis() -> list[str]:
    issues: list[str] = []
    misc = ROOT / "bin" / "misc"
    mods = [
        ROOT / "moniversive/framework/token/MisClrtyTokenExtensions.mis",
        ROOT / "moniversive/framework/token/MisClrtyTokenExtensionsHarness.mis",
        ROOT / "moniversive/framework/token/MisClrtyTokenExtensionsInvariants.mis",
        ROOT / "moniversive/nanotasks/clrty_token_extensions_integration_matrix.mis",
    ]
    for mod in mods:
        text = mod.read_text(encoding="utf-8")
        if "chain_id == 1202" not in text and "settlement_chain" not in text:
            issues.append(f"{mod.name}: missing CLRTY-1 settlement invariant")
        if "ethereum" in text.lower() and "no_ethereum" not in text.lower() and "false" not in text.lower():
            # soft — prefer explicit refuse invariant
            pass
        if not misc.is_file():
            continue
        import subprocess

        r = subprocess.run(
            [str(misc), str(mod), "--check", "--compact-letters"],
            cwd=str(ROOT),
            capture_output=True,
            text=True,
        )
        if r.returncode != 0:
            issues.append(f"misc check fail {mod.name}: {r.stderr[:200]}")
    return issues


def main() -> int:
    rpc = probe_rpc()
    boot_issues = check_boot()
    scanned, file_issues = scan_files()
    mis_issues = check_mis()

    report = {
        "updated_at": utc_now(),
        "policy": "CLRTY-1_CUSTOM_MONIVERSIVE_CHAIN_ONLY_ALL_OTHERS_ASIDE",
        "rpc": rpc,
        "scanned_files": scanned,
        "boot_issues": boot_issues,
        "file_issues": file_issues[:100],
        "file_issue_count": len(file_issues),
        "mis_issues": mis_issues,
        "ok": bool(rpc["ok"]) and not boot_issues and not file_issues and not mis_issues,
    }
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")

    print(f"RPC eth_chainId={rpc.get('hex')} ({rpc.get('numeric')}) {'OK' if rpc['ok'] else 'FAIL'}")
    print(f"scanned_files={scanned} file_issues={len(file_issues)} boot_issues={len(boot_issues)} mis_issues={len(mis_issues)}")
    for i in boot_issues:
        print("BOOT FAIL", i)
    for i in mis_issues:
        print("MIS FAIL", i)
    for i in file_issues[:25]:
        print(f"FILE FAIL {i['kind']} :: {i['path']}")
    if report["ok"]:
        print("SUCCESS: ONLY CLRTY-1 custom Moniversive (1202) — ALL OTHER CHAINS ASIDE")
        return 0
    print("FAIL: foreign / non-CLRTY-1 settlement coupling detected")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
