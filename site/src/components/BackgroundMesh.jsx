import { motion } from "framer-motion";

export default function BackgroundMesh() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -left-1/4 top-0 h-[70vh] w-[70vw] rounded-full bg-clarity-cyan/15 blur-[120px]"
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-0 h-[60vh] w-[60vw] rounded-full bg-clarity-violet/15 blur-[100px]"
        animate={{ opacity: [0.25, 0.45, 0.25], x: [0, 24, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-grid-fade opacity-40" />
    </div>
  );
}
