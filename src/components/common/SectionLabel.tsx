import type { ReactNode } from "react";
import Doodle from "./Doodle";

type SectionLabelProps = {
  number: string;
  children: ReactNode;
};

export default function SectionLabel({
  number,
  children,
}: SectionLabelProps) {
  return (
    <div className="mb-7 flex items-center gap-3">
      <div className="flex h-9 min-w-9 items-center justify-center rounded-full border-2 border-[#1d1b35] bg-[#ffd166] px-2 font-mono text-[10px] font-bold shadow-[2px_2px_0_#1d1b35]">
        {number}
      </div>

      <div className="h-[2px] w-8 bg-[#1d1b35]" />

      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#1d1b35]/60">
        {children}
      </span>

      <Doodle
        type="spark"
        className="ml-1 text-lg"
      />
    </div>
  );
}