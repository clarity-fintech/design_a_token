# Token Extensions docs (design_a_token)

## Hash tracing

Every `.mis` module is indexed in `boot/clarity_token_extensions_hash_trace.json`:

```json
{
  "schema": "clrty.token_extensions.hash_trace/v1",
  "chain_id": 1202,
  "settlement_network": "clrty-1",
  "kernel": "misc",
  "modules": [
    {
      "path": "mis/MisClrtyTokenExtensions.mis",
      "sha256": "…",
      "bytes": 3927,
      "@": "@CLRTY.TokenExtensions#66f39a1443fb9042"
    }
  ]
}
```

Rebuild: `npm run hash:trace`

## Connecting CLRTY-1

| Endpoint | Purpose |
|----------|---------|
| `https://rpc.clarity-fintech.com` | JSON-RPC (`eth_chainId`, `eth_blockNumber`) |
| `https://api.clarity-fintech.com/v1/status` | REST health |
| chain id | `1202` / `0x4b2` |

```bash
npm run connect
```

## Designing a token

```bash
npm run design -- --name "My Asset" --symbol MYA \
  --ext confidential_transfer,metadata,helix \
  --out ./out/MYA.mis
```

Then compile with `misc out/MYA.mis --check --compact-letters`.
