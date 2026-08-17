import { motion } from "framer-motion";
import type { ReactNode } from "react";

type PageTransitionProps = {
  children: ReactNode;
};

export default function PageTransition({
  children,
}: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}