import { motion } from "framer-motion";

const floatingItems = [
  {
    content: "✦",
    className: "left-[26%] top-[10%] text-[#ffd95e] text-xl",
    duration: 4,
    delay: 0,
  },
  {
    content: "✧",
    className: "left-[46%] top-[24%] text-[#b896ff] text-2xl",
    duration: 5,
    delay: 1,
  },
  {
    content: "♡",
    className: "right-[10%] top-[36%] text-[#ff8fa3] text-3xl",
    duration: 4.5,
    delay: 0.5,
  },
  {
    content: "✦",
    className: "right-[28%] top-[16%] text-[#ffd95e] text-lg",
    duration: 3.5,
    delay: 1,
  },
  {
    content: "✧",
    className: "left-[35%] top-[58%] text-[#a98cff] text-2xl",
    duration: 5,
    delay: 0,
  },
  {
    content: "✦",
    className: "right-[18%] top-[72%] text-[#ffd95e] text-2xl",
    duration: 4,
    delay: 1.5,
  },
  {
    content: "♡",
    className: "left-[30%] bottom-[18%] text-[#ff9eb5] text-2xl",
    duration: 4.5,
    delay: 0.8,
  },
];

export default function FloatingDoodles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] hidden overflow-hidden lg:block">
      {floatingItems.map((item, index) => (
        <motion.div
          key={`${item.content}-${index}`}
          className={`absolute font-hand ${item.className}`}
          initial={{
            opacity: 0,
            scale: 0.7,
          }}
          animate={{
            opacity: [0.5, 1, 0.6],
            y: [0, -14, 0],
            rotate: [-5, 5, -5],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.content}
        </motion.div>
      ))}

      {/* Oval decoration */}
      <motion.div
        className="absolute left-[32%] top-[12%] h-20 w-32 rounded-[50%] border-2 border-[#9b7ede]/30"
        animate={{
          rotate: [0, 8, 0],
          y: [0, -8, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Small circle decoration */}
      <motion.div
        className="absolute right-[8%] top-[12%] h-24 w-24 rounded-full border border-[#ffd95e]/20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}