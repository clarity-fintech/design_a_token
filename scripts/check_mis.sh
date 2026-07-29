#!/usr/bin/env bash
# Compile/check all Token Extensions .mis modules with the misc kernel.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MISC="${MISC_BIN:-}"
if [[ -z "$MISC" ]]; then
  for candidate in \
    "$ROOT/../../bin/misc" \
    "$ROOT/../../../bin/misc" \
    "$HOME/bin/misc" \
    "$(command -v misc || true)"; do
    if [[ -n "$candidate" && -x "$candidate" ]]; then
      MISC="$candidate"
      break
    fi
  done
fi

if [[ -z "${MISC:-}" || ! -x "$MISC" ]]; then
  echo "misc kernel not found — set MISC_BIN or place bin/misc beside the monorepo"
  echo "  skip: download CLRTY-MIS-Kernel / run make misc-build in the monorepo"
  exit 2
fi

echo "==> misc: $MISC"
fail=0
for f in "$ROOT"/mis/*.mis; do
  echo "-- check $(basename "$f")"
  if ! "$MISC" "$f" --check --compact-letters; then
    fail=1
  fi
done

echo "==> hash-trace check"
python3 "$ROOT/scripts/hash_trace.py" --check || fail=1

if [[ "$fail" -ne 0 ]]; then
  echo "FAIL: .mis / hash-trace"
  exit 1
fi
echo "SUCCESS: all .mis modules + hash-trace OK"
