import { motion, useSpring } from "framer-motion";
import { useEffect } from "react";
import useMousePosition from "../../hooks/useMousePosition";

export default function CursorGlow() {
  const { x, y } = useMousePosition();

  const springX = useSpring(x, {
    stiffness: 180,
    damping: 22,
    mass: 0.5,
  });

  const springY = useSpring(y, {
    stiffness: 180,
    damping: 22,
    mass: 0.5,
  });

  useEffect(() => {
    springX.set(x);
    springY.set(y);
  }, [x, y, springX, springY]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#a98cff]/50 bg-[#a98cff]/10 backdrop-blur-[2px] md:block"
        style={{
          x: springX,
          y: springY,
        }}
      />

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9b7ede]/10 blur-3xl md:block"
        animate={{
          x: x - 104,
          y: y - 104,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
        }}
      />
    </>
  );
}