import { Bot } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#19171c]/10 bg-[#f4eee3]/90 px-5 py-4 backdrop-blur lg:hidden">
      <a href="#home" className="font-hand text-3xl">
        Jemimah
      </a>

      <a
        href="#ask-jemi"
        className="flex items-center gap-2 rounded-full bg-[#19171c] px-4 py-2 text-xs text-white"
      >
        <Bot size={14} />
        Ask Jemi
      </a>
    </header>
  );
}