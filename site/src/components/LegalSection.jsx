import ScrollReveal from "./ScrollReveal.jsx";
import { LEGAL_PACK } from "../data/backlinkPack.generated.js";
import Clrty1Link from "./Clrty1Link.jsx";
import { routeToClrty1 } from "../data/clrty1Routing.js";

export default function LegalSection({ legal = LEGAL_PACK }) {
  if (!legal?.documents?.length) return null;

  return (
    <section id="legal-compliance" className="border-t border-clarity-border px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="section-kicker">Legal &amp; Regulatory Compliance · routed to CLRTY-1</p>
          <h2 className="display-title mt-3 text-2xl md:text-4xl">
            Integrated legal infrastructure for the Token Extensions funnel
          </h2>
          <p className="body-copy mt-4 max-w-3xl text-sm md:text-base">
            Legal hubs stamp settlement context (network=clrty-1 · chainId=1202) so compliance,
            AML/KYC, and risk disclosures stay on the CLRTY-1 mesh.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 font-tomorrow text-[0.65rem] uppercase tracking-[0.14em]">
            <Clrty1Link
              href={legal.hub}
              surface="legal"
              className="rounded-full border border-clarity-cyan/40 bg-clarity-cyan/10 px-4 py-2 text-clarity-cyan hover:bg-clarity-cyan/20"
            >
              Exchange legal hub
            </Clrty1Link>
            <Clrty1Link
              href={legal.www_hub}
              surface="legal_www"
              className="rounded-full border border-white/20 px-4 py-2 text-clarity-mist hover:text-white"
            >
              WWW legal
            </Clrty1Link>
            <Clrty1Link
              href={legal.network_hub}
              surface="legal_network"
              className="rounded-full border border-white/20 px-4 py-2 text-clarity-mist hover:text-white"
            >
              Network legal
            </Clrty1Link>
          </div>
        </ScrollReveal>

        <div id="legal-documents" className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {legal.documents.map((doc, i) => (
            <ScrollReveal key={doc.href} delay={Math.min(i, 12) * 0.03}>
              <Clrty1Link
                href={routeToClrty1(doc.href, { surface: "legal_doc" })}
                surface="legal_doc"
                className="connect-tile block h-full"
              >
                <span className="font-medium text-clarity-text">{doc.title}</span>
                {doc.summary ? (
                  <span className="mt-2 block text-xs text-clarity-muted">{doc.summary}</span>
                ) : null}
              </Clrty1Link>
            </ScrollReveal>
          ))}
        </div>

        {legal.contacts?.length ? (
          <ScrollReveal delay={0.08}>
            <h3 className="display-title mt-12 text-lg">Compliance contacts</h3>
            <ul id="legal-contacts" className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-clarity-muted md:grid-cols-3">
              {legal.contacts.map((c) => (
                <li key={`${c.role}-${c.email}`}>
                  {c.role}:{" "}
                  <a href={`mailto:${c.email}`} className="text-clarity-cyan hover:underline">
                    {c.email}
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        ) : null}

        {legal.api?.length ? (
          <ScrollReveal delay={0.1}>
            <h3 className="display-title mt-10 text-lg">Legal API · pack index</h3>
            <ul id="legal-api" className="mt-3 space-y-1 font-mono text-xs text-clarity-muted">
              {legal.api.map((row) => (
                <li key={row.href}>
                  <Clrty1Link href={row.href} surface="legal_api" className="text-clarity-cyan hover:underline">
                    {row.label}
                  </Clrty1Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        ) : null}
      </div>
    </section>
  );
}
