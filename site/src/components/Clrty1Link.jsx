import { routeToClrty1 } from "../data/clrty1Routing.js";

/** Anchor that stamps CLRTY-1 settlement params onto owned Clarity URLs. */
export default function Clrty1Link({ href, surface, children, className, title, ...rest }) {
  const resolved = routeToClrty1(href, surface ? { surface } : {});
  const external = resolved && !resolved.startsWith("#") && !resolved.startsWith("mailto:");
  return (
    <a
      href={resolved}
      className={className}
      title={title || resolved}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
