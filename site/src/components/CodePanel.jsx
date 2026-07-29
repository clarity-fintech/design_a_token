import { useState } from "react";

const TAB_LABELS = {
  init: "Initialize",
  helix: "HELIX",
  skills: "Skills",
  mis: ".mis",
  create: "Create",
  transfer: "Transfer",
  rpc: "RPC",
};

export default function CodePanel({
  panels,
  toolbar,
  defaultTab = "init",
  tabKeys,
  tabBlockIds = {},
}) {
  const keys = tabKeys || Object.keys(panels);
  const [tab, setTab] = useState(defaultTab);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(panels[tab] || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      id="sdk-sandbox-panel"
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/80 shadow-[0_32px_64px_-24px_rgba(77,166,255,0.35)] backdrop-blur-xl"
      role="region"
      aria-label="Interactive SDK sandbox"
    >
      <div className="flex flex-wrap border-b border-white/10 bg-[#111]/90">
        {keys.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setTab(k)}
            className={`relative px-4 py-3 font-mono text-xs transition ${
              tab === k
                ? "border-b-2 border-clarity-cyan text-white"
                : "border-b-2 border-transparent text-clarity-muted hover:text-white"
            }`}
          >
            {TAB_LABELS[k] || k}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between border-b border-white/5 px-3 py-2 text-[0.65rem] text-clarity-muted">
        <span>{toolbar}</span>
        <button
          type="button"
          onClick={copy}
          className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[0.65rem] transition hover:border-clarity-cyan/40 hover:text-white"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre
        key={tab}
        id={tabBlockIds[tab]}
        className="code-panel code-panel-fade max-h-[22rem] min-h-[10rem] bg-gradient-to-b from-[#0d0d0d] to-black p-5"
      >
        {panels[tab]}
      </pre>
    </div>
  );
}
