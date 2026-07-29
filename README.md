# design_a_token

**Design programmable assets on CLRTY-1** — full Token Extensions kit published as a standalone repo.

Settlement: **`clrty-1` / chain `1202`** · language **`.mis`** · kernel **`misc`** · hash-trace **`@CLRTY.TokenExtensions#…`**

## Live surfaces

| Surface | URL |
|---------|-----|
| Primary | https://tokens.clarity-fintech.com/ |
| Pages | https://clarity-tokens.pages.dev/ |
| Path mount | https://network-monitor-d1g.pages.dev/clarity-tokens/ |
| GitHub | https://github.com/clarity-fintech/design_a_token |

## What's inside

| Path | Role |
|------|------|
| `mis/` | Token Extensions program + harness + invariants + CTE001–CTE100 nano matrix |
| `boot/` | Ecosystem boot JSON, nano-task catalog, **hash-trace** index, backlink pack |
| `index/` | 192 nano-harvest + featured mesh + pack counts |
| `packages/sdk/` | `@clrty/design-a-token-sdk` — design · stamp · connect · route |
| `site/` | React + Tailwind marketing / playground (CLRTY-1 routed) |
| `templates/` | Starter `.mis` contracts |
| `scripts/` | hash-trace · misc check · CLRTY-1 connect · design CLI · pack verify |

## Quick start

```bash
git clone git@github.com:clarity-fintech/design_a_token.git
cd design_a_token
npm install
npm run build:sdk
npm run connect          # live eth_chainId + API /v1/status
npm run hash:trace       # rebuild @ tracing index from mis/*
npm run design -- --name "Enterprise USD" --symbol EUSD \
  --ext confidential_transfer,compliance,stable,helix,mirra \
  --out ./out/EUSD.mis
npm run dev              # site on :5176
```

### .mis compile (misc kernel)

```bash
# From a CLRTY monorepo with bin/misc, or set MISC_BIN:
export MISC_BIN=/path/to/misc
npm run check:mis
```

Each module is checked with:

```bash
misc mis/MisClrtyTokenExtensions.mis --check --compact-letters
misc mis/clrty_token_extensions_integration_matrix.mis --check --compact-letters
```

### Hash tracing program

```bash
python3 scripts/hash_trace.py          # write boot/clarity_token_extensions_hash_trace.json
python3 scripts/hash_trace.py --stamp  # also stamp // hash-trace headers into mis/*.mis
python3 scripts/hash_trace.py --check  # CI gate if digests drift
```

Trace tags look like `@CLRTY.TokenExtensions#b73575eb80f0ef03` and bind mint → extension → nano task (CTE001–CTE100).

## SDK

```ts
import { designToken, connectClrty1, routeToClrty1 } from "@clrty/design-a-token-sdk";

const mesh = await connectClrty1();
const token = designToken({
  name: "Enterprise USD",
  symbol: "EUSD",
  extensions: ["confidential_transfer", "compliance", "stable", "helix", "mirra"],
});
// token.misSource includes hash-trace header
// token.hashTrace["@"] → @CLRTY.TokenExtensions#…
```

## Full-project database cross-route

Every CLRTY database section is stamped into CLRTY-1:

```bash
# from monorepo
make clrty1-full-project-cross-route
```

Artifacts:
- `boot/clrty1_full_project_cross_route.json` — master mesh
- `site/public/cross-route-pack.json` — UI slice
- Site section `#database-cross-route`

## Verify everything

```bash
npm run verify:pack   # boot + pack + hash-trace present
npm run connect       # CLRTY-1 RPC/API live
npm run check:mis     # misc --check + hash-trace --check
npm run test:e2e      # Playwright against local preview
```

## Sync from monorepo (optional)

When this repo sits under `external/clarity-fintech/` beside a CLRTY checkout:

```bash
export CLRTY_PROJECT=/path/to/CLRTY
npm run pack:index
```

## Nano tasks

Logical module: `clarity.mis.nanotasks.clrty_token_extensions_integration_matrix`  
Gates **CTE001–CTE100** · 399ms hard cap · CherryServers VDS `#939850`

## License

UNLICENSED · Clarity Fintech / Volkov Intelligence Systems
