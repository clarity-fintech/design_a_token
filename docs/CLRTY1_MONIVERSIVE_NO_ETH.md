# CLRTY-1 — ONLY the actual custom Moniversive chain · ALL OTHERS ASIDE

**ONLY** on the actual **CLRTY-1** chain itself — custom **Moniversive** blockchain
(`clrty-1` / `1202` / `0x4b2` / `.mis` / `misc`).

**ALL OTHER CHAINS ASIDE** — never settlement, never product home, never authoring SSOT.

## Hard rules

1. **ONLY** CLRTY-1 custom Moniversive settles. Never Ethereum (`chain_id: 1`) or any foreign L1/L2.
2. All other chains are **aside** — quarantine / refused catalogs only. Not home. Not product settlement.
3. `eth_chainId` / `eth_blockNumber` are **JSON-RPC method names on CLRTY-1** — not Ethereum.
4. Live RPC must return `0x4b2` (1202) or the mesh is **REFUSED**.
5. **Never** author CLRTY-1 contracts in Solidity. Home forms are **`.mis`** and **`.clrty`**. All `.sol` live only under `var/outer_chains_solidity_archive/` (86 quarantined from `var/mis_github_repos` + `external/clarity-fintech/main`).

## Verify

```bash
make clrty1-moniversive-clean
# or:
python3 scripts/verify_clrty1_moniversive_no_eth.py
python3 scripts/verify_clrty1_no_solidity.py
node scripts/verify_clrty1_settlement_only.mjs
```

## SSOT

| Path | Role |
|------|------|
| `CLRTY_SUBSTRATE/boot/clrty1_moniversive_only_no_eth.json` | Policy (home only · others aside) |
| `CLRTY_SUBSTRATE/boot/settlement_config.json` | Settlement (1202) |
| `CLRTY_SUBSTRATE/boot/l1_network_manifest.json` | L1 identity |
| `CLRTY_SUBSTRATE/boot/clarity_token_extensions.json` | Token Extensions |
| `CLRTY_SUBSTRATE/boot/clarity_spark_merchant_payment_rails.json` | Rails (`clrty1_home_only_rails`) |
| `moniversive/framework/token/MisClrtyTokenExtensions*.mis` | Invariants |
