# CLRTY-1 Moniversive only — NO Ethereum settlement

Settlement home chain is **CLRTY-1** (`1202` / `0x4b2`) on the custom **Moniversive**
blockchain (`.mis` · `misc` kernel · `mis_chain` / `mis_evm`).

## Hard rules

1. **Never** settle on Ethereum mainnet (`chain_id: 1`) or any foreign L1.
2. `eth_chainId` / `eth_blockNumber` are **JSON-RPC method names** on CLRTY-1 RPC — not Ethereum.
3. Live RPC must return `0x4b2` (1202) or the mesh is **REFUSED**.
4. Foreign chains may appear only under `refused_*` / `foreign_non_settlement_ingress` catalogs.
5. **Never** author CLRTY-1 contracts in Solidity (`.sol` / `solc` / Hardhat / Foundry). Home language is **`.mis`**. Solidity forms are outer-chain archive only (`var/outer_chains_solidity_archive/`).

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
| `CLRTY_SUBSTRATE/boot/clrty1_moniversive_only_no_eth.json` | Policy |
| `CLRTY_SUBSTRATE/boot/settlement_config.json` | Settlement (1202) |
| `CLRTY_SUBSTRATE/boot/l1_network_manifest.json` | L1 identity |
| `CLRTY_SUBSTRATE/boot/clarity_token_extensions.json` | Token Extensions |
| `moniversive/framework/token/MisClrtyTokenExtensions*.mis` | Invariants |
