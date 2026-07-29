#!/usr/bin/env python3
"""Rebuild CLRTY Token Extensions hash-trace index from mis/*.mis.

Writes boot/clarity_token_extensions_hash_trace.json with:
  sha256 · bytes · @CLRTY.TokenExtensions#<12-hex> tags

Also stamps each .mis file header comment if --stamp is passed.
"""
from __future__ import annotations

import argparse
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MIS_DIR = ROOT / "mis"
BOOT = ROOT / "boot" / "clarity_token_extensions_hash_trace.json"
TAG_PREFIX = "@CLRTY.TokenExtensions#"


def sha256_file(path: Path) -> tuple[str, int]:
    data = path.read_bytes()
    return hashlib.sha256(data).hexdigest(), len(data)


def module_entry(path: Path) -> dict:
    digest, size = sha256_file(path)
    rel = f"mis/{path.name}"
    return {
        "path": rel,
        "sha256": digest,
        "bytes": size,
        "@": f"{TAG_PREFIX}{digest[:16]}",
    }


def stamp_header(path: Path, tag: str, digest: str) -> None:
    text = path.read_text(encoding="utf-8")
    stamp = (
        f"// hash-trace: {tag}\n"
        f"// sha256: {digest}\n"
        f"// settlement: clrty-1 / 1202 · kernel: misc\n"
    )
    lines = text.splitlines(keepends=True)
    # Drop prior stamp block
    while lines and lines[0].startswith("// hash-trace:"):
        lines.pop(0)
        while lines and (
            lines[0].startswith("// sha256:")
            or lines[0].startswith("// settlement:")
        ):
            lines.pop(0)
        if lines and lines[0].strip() == "":
            lines.pop(0)
    path.write_text(stamp + "".join(lines), encoding="utf-8")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--stamp", action="store_true", help="Stamp @ tracing headers into .mis files")
    ap.add_argument("--check", action="store_true", help="Exit 1 if boot hash-trace is stale")
    args = ap.parse_args()

    modules = sorted(MIS_DIR.glob("*.mis"))
    if not modules:
        raise SystemExit(f"no .mis modules in {MIS_DIR}")

    entries = [module_entry(p) for p in modules]
    if args.stamp:
        # Stamp then recompute so digest matches stamped bytes
        for p, e in zip(modules, entries):
            stamp_header(p, e["@"], e["sha256"])
        entries = [module_entry(p) for p in modules]

    payload = {
        "schema": "clrty.token_extensions.hash_trace/v1",
        "updated_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "chain_id": 1202,
        "settlement_network": "clrty-1",
        "kernel": "misc",
        "program": "design_a_token",
        "modules": entries,
    }

    if args.check and BOOT.exists():
        prev = json.loads(BOOT.read_text(encoding="utf-8"))
        prev_map = {m["path"]: m["sha256"] for m in prev.get("modules", [])}
        cur_map = {m["path"]: m["sha256"] for m in entries}
        if prev_map != cur_map:
            print("hash-trace STALE — run: python3 scripts/hash_trace.py")
            for path, digest in cur_map.items():
                old = prev_map.get(path)
                if old != digest:
                    print(f"  {path}: {old} → {digest}")
            return 1
        print(f"hash-trace OK · {len(entries)} modules")
        return 0

    BOOT.parent.mkdir(parents=True, exist_ok=True)
    BOOT.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {BOOT.relative_to(ROOT)} · {len(entries)} modules")
    for e in entries:
        print(f"  {e['@']}  {e['path']}  ({e['bytes']} B)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
