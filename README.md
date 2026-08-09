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


---

<!-- CLRTY-DEVREF:START -->

## Developer reference

> Auto-generated command/architecture reference for **[`clarity-fintech/design_a_token`](https://github.com/clarity-fintech/design_a_token)**. The sections above are the maintained overview.

### Get it running

```bash
git clone https://github.com/clarity-fintech/design_a_token
cd design_a_token
npm install
npm run build
cp .env.example .env   # configure (see Configuration)
```

### Command reference (npm scripts)

| Command | Runs |
|---|---|
| `npm run build` | `npm run build:sdk && npm run build:site` |
| `npm run build:site` | `npm run build -w @clrty/clarity-tokens-landing` |
| `npm run build:sdk` | `npm run build -w @clrty/design-a-token-sdk` |
| `npm run dev` | `npm run dev -w @clrty/clarity-tokens-landing` |
| `npm run pack:index` | `python3 scripts/sync_from_clarity_tokens.py` |
| `npm run hash:trace` | `python3 scripts/hash_trace.py` |
| `npm run hash:stamp` | `python3 scripts/hash_trace.py --stamp` |
| `npm run check:mis` | `bash scripts/check_mis.sh` |
| `npm run connect` | `node scripts/connect_clrty1.mjs` |
| `npm run design` | `node scripts/design_token.mjs` |
| `npm run verify:pack` | `node scripts/verify_pack.mjs` |
| `npm run test:e2e` | `cd site && npx playwright test --config=playwright.config.ts` |
| `npm run verify` | `npm run verify:pack && npm run connect && npm run verify:clrty1-only` |
| `npm run verify:clrty1-only` | `node scripts/verify_clrty1_settlement_only.mjs` |
| `npm run verify:no-eth` | `python3 scripts/verify_clrty1_moniversive_no_eth.py` |

### Architecture (tracked layout)

| Path | Files |
|---|---|
| `site/` | 46 |
| `boot/` | 15 |
| `scripts/` | 9 |
| `index/` | 6 |
| `mis/` | 4 |
| `packages/` | 4 |
| `docs/` | 3 |
| `e2e/` | 2 |
| `templates/` | 2 |
| `.github/` | 1 |

### Configuration

Copy `.env.example` → `.env`:

| Variable | Default / example |
|---|---|
| `CLRTY_RPC_URL` | `https://rpc.clarity-fintech.com` |
| `CLRTY_API_URL` | `https://api.clarity-fintech.com` |
| `CLRTY_CHAIN_ID` | `1202` |
| `CLRTY_NETWORK` | `clrty-1` |
| `MISC_BIN` | _(required)_ |

### Settlement context

Part of the **CLRTY-1** ecosystem (chain **1202**). MIS modules are compiled by the
[CLRTY-MIS-Kernel](https://github.com/clarity-fintech/CLRTY-MIS-Kernel) `misc` compiler.

<!-- CLRTY-DEVREF:END -->
