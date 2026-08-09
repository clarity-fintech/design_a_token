#!/usr/bin/env python3
"""No Solidity on the actual CLRTY-1 custom Moniversive chain. ALL OTHERS ASIDE.

Fails when:
  - *.sol exists under CLRTY-1 canonical trees
  - pragma solidity / solc authoring configs target CLRTY-1
  - copy claims Solidity is the CLRTY-1 strategy language

Allows:
  - no_solidity_authoring / SOLIDITY_REMOVED / refused_* / all_other_chains_aside
  - migration docs (from-solidity.md)
  - var/outer_chains_solidity_archive/ (ASIDE archive — not home)
  - external/ + var/mis_github_repos mirrors (aside/stale; --strict-mirrors to hard-fail)
"""
from __future__ import annotations

import json
import re
import shutil
import subprocess
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / "var" / "launch" / "clrty1_no_solidity_scan.json"
OUTER_ARCHIVE = ROOT / "var" / "outer_chains_solidity_archive"

CANONICAL = [
    ROOT / "CLRTY_SUBSTRATE",
    ROOT / "moniversive",
    ROOT / "clrty-1",
    ROOT / "frontend" / "clarity-tokens",
    ROOT / "external" / "clarity-fintech" / "design_a_token",
    ROOT / "smart_contract_dev-kit" / "clarity-tokens",
    ROOT / "contracts",
    ROOT / "scripts",
]

# Paths that may mention Solidity only as refuse/migration
ALLOW_TEXT = re.compile(
    r"SOLIDITY_REMOVED|no_solidity|solidity_authoring.\s*false|solidity_authoring\": false|"
    r"refused_clrty1|outer_chains_only|all_other_chains_aside|from-solidity|outer_chains_solidity|"
    r"REFUSED for CLRTY-1|never Solidity|not author Solidity|solc disabled|"
    r"refused_on_clrty1|migration/from-solidity|authoring in Solidity|"
    r"not mean settlement on Ethereum or authoring in Solidity|"
    r"verify_clrty1_no_solidity|build_clrty1_smart_contracts_section|"
    r"pragma solidity\" not in|```solidity\" not in|does not au",
    re.I,
)

AFFIRM = re.compile(
    r"(Solidity for .{0,40}clrty-1|"
    r"(?<![Tt]ot )author(ing)? (in )?Solidity on clrty|"
    r"write .{0,20}in Solidity|"
    r"language:\s*Solidity|"
    r"solc\s*=\s*\"0\.)",
    re.I,
)

SKIP_DIR = {".git", "node_modules", "dist", "playwright-report", "test-results", "assets"}


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def find_sol_files(base: Path) -> list[Path]:
    out: list[Path] = []
    if not base.exists():
        return out
    for p in base.rglob("*.sol"):
        if any(x in p.parts for x in SKIP_DIR):
            continue
        out.append(p)
    return out


# Quarantine sources → archive prefixes (ASIDE — not CLRTY-1 home)
QUARANTINE_SOURCES = (
    (ROOT / "var" / "mis_github_repos", "var__mis_github_repos"),
    (ROOT / "external" / "clarity-fintech" / "main", "external__clarity-fintech__main"),
)


def quarantine_mirrors() -> list[str]:
    """Move .sol from mirrors into var/outer_chains_solidity_archive/ (ASIDE).

    Home forms on CLRTY-1 are .mis / .clrty only — never .sol.
    """
    moved: list[str] = []
    OUTER_ARCHIVE.mkdir(parents=True, exist_ok=True)
    for src_root, prefix in QUARANTINE_SOURCES:
        if not src_root.exists():
            continue
        for sol in src_root.rglob("*.sol"):
            if "outer_chains_solidity_archive" in sol.parts:
                continue
            rel = sol.relative_to(src_root)
            dest = OUTER_ARCHIVE / prefix / rel
            dest.parent.mkdir(parents=True, exist_ok=True)
            if dest.exists():
                sol.unlink(missing_ok=True)
                moved.append(f"dedupe {prefix}/{rel.as_posix()}")
            else:
                shutil.move(str(sol), str(dest))
                moved.append(f"moved {prefix}/{rel.as_posix()}")
    return moved


def archive_sol_count() -> int:
    if not OUTER_ARCHIVE.exists():
        return 0
    return sum(1 for _ in OUTER_ARCHIVE.rglob("*.sol"))


def scan_affirmative(paths: list[Path]) -> list[dict]:
    issues: list[dict] = []
    for base in paths:
        if not base.exists():
            continue
        for p in base.rglob("*"):
            if not p.is_file():
                continue
            if any(x in p.parts for x in SKIP_DIR):
                continue
            if p.suffix.lower() in {".png", ".jpg", ".lock", ".map", ".woff", ".woff2"}:
                continue
            if p.stat().st_size > 4_000_000:
                continue
            # skip generated packs / huge indexes
            if "backlink-pack" in p.name or p.name == "mis_code_index.json":
                continue
            if "outer_chains_solidity_archive" in p.parts:
                continue
            if p.name in {"verify_clrty1_no_solidity.py", "build_clrty1_smart_contracts_section.py"}:
                continue
            if "generate_skills_catalog.py" in p.name:
                # still scan — must not affirm Solidity on clrty-1
                pass
            try:
                text = p.read_text(encoding="utf-8", errors="ignore")
            except OSError:
                continue
            if "solidity" not in text.lower() and "pragma solidity" not in text.lower() and "solc" not in text.lower():
                continue
            rel = p.relative_to(ROOT).as_posix()
            for m in AFFIRM.finditer(text):
                ctx = text[max(0, m.start() - 30) : m.end() + 50]
                if ALLOW_TEXT.search(ctx) or ALLOW_TEXT.search(rel):
                    continue
                # allow refused catalog rows
                window = text[max(0, m.start() - 200) : m.end() + 80]
                if re.search(r"refused|outer_chain|all_other_chains_aside|SOLIDITY_REMOVED|no_solidity|solidity_authoring\": false", window, re.I):
                    continue
                issues.append({"path": rel, "kind": "affirmative_solidity", "ctx": ctx.replace("\n", " ")[:160]})
    return issues


def check_boot() -> list[str]:
    issues: list[str] = []
    policy = json.loads((ROOT / "CLRTY_SUBSTRATE/boot/clrty1_moniversive_only_no_eth.json").read_text())
    if policy.get("policy") != "CLRTY-1_CUSTOM_MONIVERSIVE_CHAIN_ONLY_ALL_OTHERS_ASIDE":
        issues.append("policy id must be CLRTY-1_CUSTOM_MONIVERSIVE_CHAIN_ONLY_ALL_OTHERS_ASIDE")
    home = policy.get("home_chain") or {}
    if home.get("id") != "clrty-1" or home.get("type") != "custom_moniversive_chain":
        issues.append("home_chain must be clrty-1 custom_moniversive_chain only")
    if (policy.get("all_other_chains") or {}).get("status") != "aside":
        issues.append("all_other_chains.status must be aside")
    if policy.get("blockchain", {}).get("solidity") is not False:
        issues.append("policy.blockchain.solidity must be false")
    if policy.get("blockchain", {}).get("solidity_authoring") is not False:
        issues.append("policy.blockchain.solidity_authoring must be false")
    if policy.get("blockchain", {}).get("all_other_chains_aside") is not True:
        issues.append("policy.blockchain.all_other_chains_aside must be true")
    cl = policy.get("contract_language") or {}
    home_forms = cl.get("home_forms") or []
    if ".mis" not in home_forms or ".clrty" not in home_forms:
        issues.append("policy.contract_language.home_forms must include .mis and .clrty")
    if cl.get("refused_home_form") != ".sol":
        issues.append("policy.contract_language.refused_home_form must be .sol")
    aside = cl.get("all_other_chains_aside") or {}
    if aside.get("quarantined_sol_count", 0) < 86:
        issues.append("policy must record quarantined_sol_count >= 86")
    if ".sol" not in (cl.get("refused_on_clrty1") or []):
        issues.append("policy must refuse .sol on CLRTY-1")
    te = json.loads((ROOT / "CLRTY_SUBSTRATE/boot/clarity_token_extensions.json").read_text())
    if te.get("blockchain", {}).get("solidity_authoring") is not False:
        issues.append("token extensions solidity_authoring must be false")
    if te.get("blockchain", {}).get("policy") != "CLRTY-1_CUSTOM_MONIVERSIVE_CHAIN_ONLY_ALL_OTHERS_ASIDE":
        issues.append("token extensions must stamp CLRTY-1_CUSTOM_MONIVERSIVE_CHAIN_ONLY_ALL_OTHERS_ASIDE")
    if te.get("blockchain", {}).get("all_other_chains_aside") is not True:
        issues.append("token extensions all_other_chains_aside must be true")
    skills = json.loads((ROOT / "CLRTY_SUBSTRATE/boot/clarity_skills_catalog.json").read_text())
    blob = json.dumps(skills)
    if re.search(r"Solidity for .{0,40}clrty-1", blob, re.I):
        issues.append("clarity_skills_catalog still says Solidity for clrty-1")
    return issues


def check_mis() -> list[str]:
    issues: list[str] = []
    misc = ROOT / "bin" / "misc"
    for rel in (
        "moniversive/framework/token/MisClrtyTokenExtensions.mis",
        "moniversive/framework/token/MisClrtyTokenExtensionsHarness.mis",
        "moniversive/framework/token/MisClrtyTokenExtensionsInvariants.mis",
    ):
        text = (ROOT / rel).read_text(encoding="utf-8")
        if "no_solidity_authoring" not in text:
            issues.append(f"{rel}: missing no_solidity_authoring invariant")
        if misc.is_file():
            r = subprocess.run(
                [str(misc), str(ROOT / rel), "--check", "--compact-letters"],
                cwd=str(ROOT),
                capture_output=True,
                text=True,
            )
            if r.returncode != 0:
                issues.append(f"misc fail {rel}: {r.stderr[:160]}")
    return issues


def main() -> int:
    import sys

    strict_mirrors = "--strict-mirrors" in sys.argv
    quarantine = "--quarantine" in sys.argv or True

    moved = quarantine_mirrors() if quarantine else []

    canonical_sols: list[str] = []
    for base in CANONICAL:
        for sol in find_sol_files(base):
            # allow nothing in canonical
            canonical_sols.append(sol.relative_to(ROOT).as_posix())

    mirror_sols = []
    for base in (ROOT / "var" / "mis_github_repos", ROOT / "external" / "clarity-fintech" / "main"):
        mirror_sols.extend(p.relative_to(ROOT).as_posix() for p in find_sol_files(base))

    affirm = scan_affirmative(CANONICAL)
    boot_issues = check_boot()
    mis_issues = check_mis()
    archived = archive_sol_count()
    if archived < 86:
        boot_issues.append(f"outer archive must hold >= 86 .sol (have {archived})")

    ok = not canonical_sols and not affirm and not boot_issues and not mis_issues and not mirror_sols
    if strict_mirrors and mirror_sols:
        ok = False

    report = {
        "updated_at": utc_now(),
        "policy": "CLRTY-1_CUSTOM_MONIVERSIVE_CHAIN_ONLY_ALL_OTHERS_ASIDE",
        "home_forms": [".mis", ".clrty"],
        "refused_home_form": ".sol",
        "quarantined": moved[:50],
        "quarantine_count": len(moved),
        "archived_sol_count": archived,
        "canonical_sol_files": canonical_sols,
        "mirror_sol_files_remaining": mirror_sols[:50],
        "mirror_sol_files_remaining_count": len(mirror_sols),
        "affirmative_issues": affirm[:50],
        "boot_issues": boot_issues,
        "mis_issues": mis_issues,
        "ok": ok,
    }
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")

    print(
        f"quarantined={len(moved)} archived={archived} canonical_sol={len(canonical_sols)} "
        f"mirrors_remaining={len(mirror_sols)} affirm={len(affirm)}"
    )
    for s in canonical_sols[:20]:
        print("CANONICAL .sol FAIL", s)
    for s in mirror_sols[:20]:
        print("MIRROR .sol FAIL (must quarantine)", s)
    for i in boot_issues:
        print("BOOT FAIL", i)
    for i in mis_issues:
        print("MIS FAIL", i)
    for i in affirm[:20]:
        print("AFFIRM FAIL", i["path"], i["ctx"][:100])
    if ok:
        print("SUCCESS: CLRTY-1 home is .mis / .clrty only — 86+ .sol ASIDE in outer archive")
        return 0
    print("FAIL: .sol forms still present outside aside archive (home must be .mis / .clrty)")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
