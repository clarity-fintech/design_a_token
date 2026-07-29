import { useEffect, useMemo, useState } from "react";
import ScrollReveal from "./ScrollReveal.jsx";
import {
  BACKLINK_PACK_META,
  BACKLINK_PACK_URL,
  FEATURED_MESH,
  NANO_HARVEST_192_SUMMARY,
  UI_MESH,
} from "../data/backlinkPack.generated.js";
import { routeToClrty1 } from "../data/clrty1Routing.js";

const LANE_ORDER = ["tokens", "product", "infra", "docs", "seo", "dx", "clarity_product", "mis_ml", "dx_other", "other"];
const PAGE_SIZE = 250;

export default function ConnectMesh() {
  const [pack, setPack] = useState(null);
  const [query, setQuery] = useState("");
  const [lane, setLane] = useState("all");
  const [mode, setMode] = useState("full"); // full | mesh | harvest
  const [page, setPage] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch(BACKLINK_PACK_URL)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!cancelled && j) setPack(j);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setPage(0);
  }, [query, lane, mode]);

  const mesh = pack?.ui_mesh?.length ? pack.ui_mesh : UI_MESH;
  const featured = pack?.featured?.length ? pack.featured : FEATURED_MESH;
  const counts = pack?.counts || BACKLINK_PACK_META.counts;
  const harvest = pack?.nano_harvest_192 || NANO_HARVEST_192_SUMMARY;
  const programs = pack?.nano_harvest_192?.programs || [];
  const tokenMis = pack?.token_mis_modules || [];

  const lanes = useMemo(() => {
    const source =
      mode === "harvest"
        ? programs.map((p) => p.phase || "other")
        : (mode === "full" ? pack?.backlinks || mesh : mesh).map((m) => m.lane).filter(Boolean);
    const set = new Set(source);
    return ["all", ...LANE_ORDER.filter((l) => set.has(l)), ...[...set].filter((l) => !LANE_ORDER.includes(l))];
  }, [mesh, pack, mode, programs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (mode === "harvest") {
      return programs.filter((p) => {
        if (lane !== "all" && (p.phase || "") !== lane) return false;
        if (!q) return true;
        const hay = [p.program_id, p.model_id, p.capability, p.phase_label, p.id]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      });
    }
    const all = mode === "full" ? pack?.backlinks || mesh : mesh;
    return all.filter((m) => {
      if (lane !== "all" && m.lane !== lane) return false;
      if (!q) return true;
      return (
        (m.label || "").toLowerCase().includes(q) ||
        (m.href || m.url || "").toLowerCase().includes(q) ||
        (m.category || "").toLowerCase().includes(q)
      );
    });
  }, [mesh, pack, query, lane, mode, programs]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <section id="connect" className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="section-kicker">Connect mesh · 192 index · full backlink pack</p>
          <h2 className="display-title mt-3 text-2xl md:text-4xl">
            All backlinks connected
          </h2>
          <p className="body-copy mt-3 max-w-3xl text-sm md:text-base">
            Compiled from nano-harvest-192 ({counts?.nano_harvest_programs ?? 192} programs),
            unified-backlinks, active-links registry ({counts?.active_links_registry?.toLocaleString?.() ?? "—"}),
            CLRTY-1 live surfaces, link index, resources master, and token .mis modules — packed for{" "}
            <a
              className="text-clarity-cyan hover:underline"
              href={routeToClrty1("https://clarity-tokens.pages.dev/", { surface: "tokens_pages" })}
            >
              clarity-tokens.pages.dev
            </a>
            .
          </p>
        </ScrollReveal>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { k: "192 programs", v: counts?.nano_harvest_programs ?? harvest?.program_count ?? 192 },
            { k: "Pack backlinks", v: counts?.pack_total ?? "—" },
            { k: "UI mesh", v: counts?.ui_mesh ?? mesh.length },
            { k: "Registry", v: counts?.active_links_registry ?? "—" },
            { k: "Token .mis", v: counts?.token_mis_modules ?? tokenMis.length },
          ].map((s) => (
            <div key={s.k} className="perfect-frame px-4 py-4">
              <p className="font-tomorrow text-[0.6rem] uppercase tracking-[0.2em] text-clarity-muted">{s.k}</p>
              <p className="mt-2 font-display text-2xl font-light text-clarity-cyan tabular-nums">
                {typeof s.v === "number" ? s.v.toLocaleString() : s.v}
              </p>
            </div>
          ))}
        </div>

        {(harvest?.phases || []).length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {harvest.phases.map((p) => (
              <button
                key={p.id || p.label}
                type="button"
                onClick={() => {
                  setMode("harvest");
                  setLane(p.id || "all");
                }}
                className="rounded-full border border-clarity-border bg-white/[0.03] px-3 py-1.5 font-tomorrow text-[0.6rem] uppercase tracking-[0.14em] text-clarity-mist transition hover:border-clarity-cyan/50 hover:text-clarity-cyan"
              >
                {p.label}
                {p.count != null ? ` · ${p.count}` : ""}
              </button>
            ))}
          </div>
        )}

        <div className="mt-10">
          <p className="section-kicker">Featured mesh</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {featured.map((c) => (
              <a
                key={`${c.label}-${c.href}`}
                href={routeToClrty1(c.href, { surface: "featured" })}
                target="_blank"
                rel="noopener noreferrer"
                className="connect-tile"
              >
                {c.label}
                <span className="mt-1 block truncate text-[0.65rem] text-clarity-muted">{c.lane} · clrty-1</span>
              </a>
            ))}
          </div>
        </div>

        {tokenMis.length > 0 && (
          <div className="mt-12">
            <p className="section-kicker">Token Extensions · .mis modules (@ tracing)</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {tokenMis.slice(0, 24).map((m) => (
                <div key={m.path || m.module} className="perfect-frame px-4 py-3">
                  <p className="font-mono text-xs text-clarity-cyan">{m.module || m.path}</p>
                  <p className="mt-1 truncate font-mono text-[0.65rem] text-clarity-muted">{m.path}</p>
                  {(m["@"] || m.sha256) && (
                    <p className="mt-1 truncate font-mono text-[0.6rem] text-clarity-muted/80">
                      {m["@"] || `@${String(m.sha256).slice(0, 16)}`}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="section-kicker">
            {mode === "harvest" ? "192 nano-harvest programs" : "All connected backlinks"}
          </p>
          <div className="flex flex-wrap gap-2">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter label, program, or URL…"
              className="min-w-[14rem] flex-1 rounded-full border border-clarity-border bg-black/40 px-4 py-2 text-sm text-clarity-ink outline-none placeholder:text-clarity-muted focus:border-clarity-cyan/50"
            />
            <select
              value={lane}
              onChange={(e) => setLane(e.target.value)}
              className="rounded-full border border-clarity-border bg-black/40 px-3 py-2 font-tomorrow text-[0.65rem] uppercase tracking-[0.12em] text-clarity-mist"
            >
              {lanes.map((l) => (
                <option key={l} value={l}>
                  {l === "all" ? "All lanes" : l}
                </option>
              ))}
            </select>
            {[
              ["full", "Full pack"],
              ["mesh", "UI mesh"],
              ["harvest", "192 index"],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setMode(id)}
                className={`rounded-full border px-4 py-2 font-tomorrow text-[0.65rem] uppercase tracking-[0.12em] transition ${
                  mode === id
                    ? "border-clarity-cyan/50 bg-clarity-cyan/15 text-clarity-cyan"
                    : "border-white/20 text-clarity-mist hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
            <a
              href={BACKLINK_PACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-4 py-2 font-tomorrow text-[0.65rem] uppercase tracking-[0.12em] text-clarity-mist hover:text-white"
            >
              Download JSON
            </a>
          </div>
        </div>

        <div id="connectMesh" className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {mode === "harvest"
            ? pageItems.map((p) => {
                const label = p.capability || p.model_id || p.program_id || p.id;
                const href = routeToClrty1(
                  p.canonical || harvest?.canonical || "https://www.clarity-fintech.com/",
                  { program: p.program_id || p.id || "", surface: "harvest192" },
                );
                return (
                  <a
                    key={p.program_id || p.id || label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="connect-tile"
                    title={label}
                  >
                    {label}
                    <span className="mt-1 block truncate text-[0.65rem] text-clarity-muted">
                      {p.phase_label || p.phase} · {p.model_id || p.program_id} · clrty-1
                    </span>
                  </a>
                );
              })
            : pageItems.map((c) => {
                const href = routeToClrty1(c.href || c.url, { surface: c.lane || "pack" });
                const label = c.label;
                return (
                  <a
                    key={`${label}-${href}`}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="connect-tile"
                    title={href}
                  >
                    {label}
                    <span className="mt-1 block truncate text-[0.65rem] text-clarity-muted">
                      {c.category || c.lane} · clrty-1/1202
                    </span>
                  </a>
                );
              })}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[0.65rem] text-clarity-muted">
            Showing {pageItems.length.toLocaleString()} of {filtered.length.toLocaleString()}
            {mode === "full" ? ` · pack ${(pack?.backlinks || []).length.toLocaleString()}` : ""}
            {mode === "harvest" ? ` · 192 index` : ""}
            {" · "}
            <a className="text-clarity-cyan hover:underline" href={BACKLINK_PACK_META.sitemaps?.active_links}>
              active-links sitemap
            </a>
            {" · "}
            <a className="text-clarity-cyan hover:underline" href={BACKLINK_PACK_META.sitemaps?.dx_live}>
              DX sitemap
            </a>
          </p>
          {pageCount > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-clarity-mist disabled:opacity-40"
              >
                Prev
              </button>
              <span className="font-mono text-[0.65rem] text-clarity-muted">
                {page + 1} / {pageCount}
              </span>
              <button
                type="button"
                disabled={page >= pageCount - 1}
                onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-clarity-mist disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
