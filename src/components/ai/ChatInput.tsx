import { ArrowUp } from "lucide-react";
import { useState } from "react";

type ChatInputProps = {
  onSend: (message: string) => void;
};

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const submit = () => {
    if (!message.trim()) return;

    onSend(message.trim());
    setMessage("");
  };

  return (
    <div className="flex items-center gap-2 rounded-xl border-2 border-[#19171c]/10 bg-[#faf5eb] p-2">
      <input
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") submit();
        }}
        placeholder="Ask something about Jemimah..."
        className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-[#19171c]/30"
      />

      <button
        onClick={submit}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#19171c] text-white transition hover:bg-[#8c70d0]"
      >
        <ArrowUp size={16} />
      </button>
    </div>
  );
}