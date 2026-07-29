import ScrollReveal from "./ScrollReveal.jsx";
import { categories } from "../data/content.js";

export default function CategoriesTable() {
  return (
    <section id="categories" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="section-kicker">CLRTY-1 Extension Categories</p>
          <h2 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl">
            Built for developers. Designed for institutions.
          </h2>
        </ScrollReveal>
        <ScrollReveal className="mt-10 overflow-hidden perfect-frame" delay={0.05}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 font-mono text-[0.65rem] uppercase tracking-widest text-clarity-muted">
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((row) => (
                  <tr key={row.category} className="border-b border-white/5 transition hover:bg-white/[0.03]">
                    <td className="px-6 py-4 font-medium text-white">{row.category}</td>
                    <td className="px-6 py-4 text-clarity-muted">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
