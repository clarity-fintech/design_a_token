# @clrty/design-a-token-sdk

Design CLRTY-1 Token Extensions offline, stamp `@CLRTY.TokenExtensions#…` hash-trace tags, and live-connect chain **1202**.

```ts
import { designToken, connectClrty1, routeToClrty1 } from "@clrty/design-a-token-sdk";

const mesh = await connectClrty1();
// → { live, chainId: 1202, network: "clrty-1", … }

const token = designToken({
  name: "Enterprise USD",
  symbol: "EUSD",
  extensions: ["confidential_transfer", "compliance", "stable", "helix", "mirra"],
});

console.log(token.hashTrace["@"]);
console.log(token.misSource);
```

## Surfaces

| Role | URL |
|------|-----|
| Live | https://tokens.clarity-fintech.com/ |
| Pages | https://clarity-tokens.pages.dev/ |
| Repo | https://github.com/clarity-fintech/design_a_token |

Settlement: `clrty-1` / `1202` · kernel `misc` · language `.mis`
