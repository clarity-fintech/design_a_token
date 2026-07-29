import { useState } from "react";
import ScrollReveal from "./ScrollReveal.jsx";
import { misContractExample } from "../data/content.js";

const MODES = [
  { id: "mis", label: ".mis Contracts", hint: "Native programmable logic (kernel: misc)" },
  { id: "python", label: "Python (tagged)", hint: "Legacy-tagged sources with hash + @ tracing" },
];

export default function MisPlayground() {
  const [mode, setMode] = useState("mis");
  const [code, setCode] = useState(misContractExample);

  const pythonTagged = `# @CLRTY.TokenExtensions · hash-traced legacy surface
# Prefer .mis for new programmable assets (compiler_kernel = misc)

def create_enterprise_usd():
    return {
        "symbol": "EUSD",
        "supply": 1_000_000_000,
        "extensions": [
            "ConfidentialTransfer",
            "ComplianceControl",
            "HELIXExecution",
        ],
        "language": ".mis",  # compile target
    }
`;

  return (
    <section id="mis-framework" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="section-kicker">Interactive .mis playground</p>
          <h2 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl">
            Write the asset. Compile with misc.
          </h2>
          <p className="mt-4 max-w-2xl text-clarity-muted">
            Author in .mis (primary) or inspect Python-tagged companions — every module carries
            letter-hash and @ tracing into the CLRTY-1 index.
          </p>
        </ScrollReveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setMode(m.id);
                setCode(m.id === "mis" ? misContractExample : pythonTagged);
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === m.id
                  ? "bg-white text-black"
                  : "border border-white/20 text-clarity-muted hover:text-white"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <p className="mt-3 font-mono text-xs text-clarity-cyan">
          {MODES.find((m) => m.id === mode)?.hint}
        </p>

        <ScrollReveal className="mt-8" delay={0.05}>
          <div className="perfect-frame overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 font-mono text-[0.65rem] text-clarity-muted">
              <span>EnterpriseUSD · {mode === "mis" ? "asset.mis" : "tagged.py"}</span>
              <button
                type="button"
                className="rounded-md border border-white/10 px-2 py-1 hover:border-clarity-cyan/40 hover:text-white"
                onClick={() => navigator.clipboard.writeText(code)}
              >
                Copy
              </button>
            </div>
            <textarea
              id="mis-playground-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="code-panel min-h-[16rem] w-full resize-y border-0 bg-transparent p-5 text-gray-300 outline-none"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
