import { useEffect, useMemo, useState } from "react";
import ScrollReveal from "./ScrollReveal.jsx";
import Clrty1Link from "./Clrty1Link.jsx";
import { CLRTY1 } from "../data/clrty1Routing.js";

const PACK_URL = `${import.meta.env.BASE_URL}cross-route-pack.json`;

export default function DatabaseCrossRoutePanel() {
  const [pack, setPack] = useState(null);
  const [dbFilter, setDbFilter] = useState("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch(PACK_URL)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!cancelled) setPack(j);
      })
      .catch(() => {
        if (!cancelled) setPack(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const databases = pack?.databases || [];
  const counts = pack?.counts || {};

  const rows = useMemo(() => {
    const list =
      dbFilter === "all"
        ? databases.flatMap((d) => (d.routes || []).map((r) => ({ ...r, database_id: d.id })))
        : (databases.find((d) => d.id === dbFilter)?.routes || []).map((r) => ({
            ...r,
            database_id: dbFilter,
          }));
    const needle = q.trim().toLowerCase();
    if (!needle) return list.slice(0, 180);
    return list
      .filter((r) =>
        [r.id, r.title, r.section_id, r.domain, r.database_id, r.href, r.path]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(needle),
      )
      .slice(0, 180);
  }, [databases, dbFilter, q]);

  return (
    <section id="database-cross-route" className="px-5 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="section-kicker">
            Full-project database cross-route · {CLRTY1.network} / {CLRTY1.chainId}
          </p>
          <h2 className="display-title mt-4 max-w-3xl text-4xl md:text-5xl">
            Every database section
            <span className="block text-gradient">routes into CLRTY-1.</span>
          </h2>
          <p className="body-copy mt-5 max-w-2xl text-base md:text-lg">
            Mass segmentation, external registry, content DB, backend sections, live surfaces, SQL
            schema, monetization fees, MIS bands, and Token Extensions (CTE001–CTE100) — stamped with
            network=clrty-1 · chainId=1202 · settlement=clrty-1.
          </p>
        </ScrollReveal>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Routes", v: counts.routes_total ?? "—" },
            { k: "Databases", v: counts.databases ?? "—" },
            { k: "Sections", v: counts.sections ?? "—" },
            { k: "Routed hrefs", v: counts.routes_with_href ?? "—" },
          ].map((c) => (
            <div key={c.k} className="perfect-frame px-4 py-4">
              <p className="font-tomorrow text-[0.65rem] uppercase tracking-[0.18em] text-clarity-muted">
                {c.k}
              </p>
              <p className="mt-2 font-display text-3xl text-white">{c.v?.toLocaleString?.() ?? c.v}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <select
            value={dbFilter}
            onChange={(e) => setDbFilter(e.target.value)}
            className="rounded-full border border-white/15 bg-black/40 px-4 py-2 text-sm text-clarity-mist"
          >
            <option value="all">All databases</option>
            {databases.map((d) => (
              <option key={d.id} value={d.id}>
                {d.id} ({d.count})
              </option>
            ))}
          </select>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter section / domain / path…"
            className="min-w-[16rem] flex-1 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-sm text-clarity-mist outline-none focus:border-clarity-cyan/50"
          />
          <Clrty1Link
            href="https://tokens.clarity-fintech.com/"
            surface="cross_route"
            className="rounded-full border border-clarity-cyan/40 px-4 py-2 text-sm text-clarity-cyan"
          >
            Open pack JSON →
          </Clrty1Link>
          <a
            href={`${import.meta.env.BASE_URL}cross-route-pack.json`}
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-clarity-mist hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            cross-route-pack.json
          </a>
        </div>

        <div className="mt-6 max-h-[28rem] overflow-auto rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-sm">
            <thead className="sticky top-0 bg-clarity-bg/95 backdrop-blur">
              <tr className="border-b border-white/10 font-tomorrow text-[0.6rem] uppercase tracking-[0.16em] text-clarity-muted">
                <th className="px-3 py-3">Database</th>
                <th className="px-3 py-3">Section</th>
                <th className="px-3 py-3">Domain</th>
                <th className="px-3 py-3">Route</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={`${r.database_id}-${r.id}`} className="border-b border-white/5 hover:bg-white/[0.03]">
                  <td className="px-3 py-2 font-mono text-[0.7rem] text-clarity-muted">{r.database_id}</td>
                  <td className="px-3 py-2 text-clarity-mist">{r.title || r.section_id}</td>
                  <td className="px-3 py-2 font-mono text-[0.7rem] text-clarity-cyan">{r.domain}</td>
                  <td className="px-3 py-2">
                    {r.href ? (
                      <Clrty1Link
                        href={r.href}
                        surface="db_section"
                        className="break-all text-clarity-cyan hover:underline"
                      >
                        open
                      </Clrty1Link>
                    ) : r.path ? (
                      <span className="break-all font-mono text-[0.65rem] text-clarity-muted">{r.path}</span>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
              {!rows.length && (
                <tr>
                  <td colSpan={4} className="px-3 py-8 text-center text-clarity-muted">
                    {pack ? "No routes match filter." : "Loading cross-route pack…"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
