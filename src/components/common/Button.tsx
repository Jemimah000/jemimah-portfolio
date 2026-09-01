import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;

  variant?:
    | "yellow"
    | "purple"
    | "pink"
    | "mint"
    | "outline"
    | "dark";
};

const variants = {
  yellow:
    "bg-[#ffd166] text-[#1d1b35] shadow-[4px_4px_0_#1d1b35] hover:shadow-[7px_7px_0_#1d1b35]",

  purple:
    "bg-[#7c5ce7] text-white shadow-[4px_4px_0_#1d1b35] hover:shadow-[7px_7px_0_#1d1b35]",

  pink:
    "bg-[#ff8e8e] text-[#1d1b35] shadow-[4px_4px_0_#1d1b35] hover:shadow-[7px_7px_0_#1d1b35]",

  mint:
    "bg-[#6ed3cf] text-[#1d1b35] shadow-[4px_4px_0_#1d1b35] hover:shadow-[7px_7px_0_#1d1b35]",

  outline:
    "bg-white text-[#1d1b35] shadow-[4px_4px_0_#1d1b35] hover:shadow-[7px_7px_0_#1d1b35]",

  dark:
    "bg-[#1d1b35] text-white shadow-[4px_4px_0_#7c5ce7] hover:shadow-[7px_7px_0_#7c5ce7]",
};

export default function Button({
  children,
  variant = "yellow",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`jem-button ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}