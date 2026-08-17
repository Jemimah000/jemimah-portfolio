import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "dark" | "yellow" | "outline";
  onClick?: () => void;
};

export default function Button({
  children,
  variant = "dark",
  onClick,
}: ButtonProps) {
  const styles = {
    dark: "bg-[#19171c] text-[#f8f2e8]",
    yellow: "bg-[#f4d35e] text-[#19171c]",
    outline: "bg-transparent text-[#19171c]",
  };

  return (
    <button
      onClick={onClick}
      className={`paper-shadow-soft hand-border px-5 py-3 font-mono text-sm font-medium transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_#19171c] ${styles[variant]}`}
    >
      {children}
    </button>
  );
}