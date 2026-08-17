import type { ReactNode } from "react";

type PaperCardProps = {
  children: ReactNode;
  className?: string;
};

export default function PaperCard({
  children,
  className = "",
}: PaperCardProps) {
  return (
    <div
      className={`relative rounded-sm border-2 border-[#19171c]/15 bg-[#faf5eb] p-6 paper-shadow-soft ${className}`}
    >
      {children}
    </div>
  );
}