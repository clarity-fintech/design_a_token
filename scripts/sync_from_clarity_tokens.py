#!/usr/bin/env python3
"""Optional sync from a sibling CLRTY monorepo checkout into this repo.

Looks for CLRTY_PROJECT / ../../.. paths and copies:
  frontend/clarity-tokens → site/
  moniversive/...TokenExtensions*.mis → mis/
  CLRTY_SUBSTRATE/boot/clarity_token_extensions*.json → boot/
"""
from __future__ import annotations

import os
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def find_monorepo() -> Path | None:
    env = os.environ.get("CLRTY_PROJECT")
    if env and Path(env).is_dir():
        return Path(env)
    # external/clarity-fintech/design_a_token → repo root is parents[3]
    for cand in (ROOT.parents[2], ROOT.parents[3] if len(ROOT.parents) > 3 else None):
        if cand and (cand / "frontend" / "clarity-tokens").is_dir():
            return cand
    return None


def copy_tree(src: Path, dst: Path, *, exclude: set[str] | None = None) -> None:
    exclude = exclude or set()
    if dst.exists():
        shutil.rmtree(dst)
    def _ignore(_dir, names):
        return [n for n in names if n in exclude or n.startswith(".")]
    shutil.copytree(src, dst, ignore=_ignore)


def main() -> int:
    mono = find_monorepo()
    if not mono:
        print("No CLRTY monorepo found — set CLRTY_PROJECT or keep this repo standalone.")
        return 0

    print(f"==> sync from {mono}")
    fe = mono / "frontend" / "clarity-tokens"
    if fe.is_dir():
        for sub in ("src", "public"):
            src = fe / sub
            dst = ROOT / "site" / sub
            if src.is_dir():
                if dst.exists():
                    shutil.rmtree(dst)
                shutil.copytree(
                    src,
                    dst,
                    ignore=shutil.ignore_patterns("node_modules", "dist", "test-results"),
                )
                print(f"  site/{sub}")
        for name in ("index.html", "playwright.config.ts"):
            s = fe / name
            if s.exists():
                shutil.copy2(s, ROOT / "site" / name)
        e2e = fe / "e2e" / "clarity-tokens.spec.ts"
        if e2e.exists():
            (ROOT / "site" / "e2e").mkdir(parents=True, exist_ok=True)
            shutil.copy2(e2e, ROOT / "site" / "e2e" / "clarity-tokens.spec.ts")
            shutil.copy2(e2e, ROOT / "e2e" / "clarity-tokens.spec.ts")

    mis_src = mono / "moniversive"
    for rel in (
        "framework/token/MisClrtyTokenExtensions.mis",
        "framework/token/MisClrtyTokenExtensionsHarness.mis",
        "framework/token/MisClrtyTokenExtensionsInvariants.mis",
        "nanotasks/clrty_token_extensions_integration_matrix.mis",
    ):
        s = mis_src / rel
        if s.exists():
            shutil.copy2(s, ROOT / "mis" / s.name)
            print(f"  mis/{s.name}")

    boot = mono / "CLRTY_SUBSTRATE" / "boot"
    for name in (
        "clarity_token_extensions.json",
        "clarity_token_extensions_hash_trace.json",
        "clarity_token_extensions_nanotasks_cte100.json",
        "clarity_token_extensions_backlink_pack.json",
    ):
        s = boot / name
        if s.exists():
            shutil.copy2(s, ROOT / "boot" / name)
            print(f"  boot/{name}")

    pack = fe / "public" / "backlink-pack.json"
    if pack.exists():
        for dest in (
            ROOT / "boot" / "backlink-pack.json",
            ROOT / "index" / "backlink-pack.json",
            ROOT / "site" / "public" / "backlink-pack.json",
        ):
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(pack, dest)
        print("  backlink-pack.json")

    subprocess.check_call(["python3", str(ROOT / "scripts" / "hash_trace.py")])
    print("SUCCESS: synced + hash-trace rebuilt")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
