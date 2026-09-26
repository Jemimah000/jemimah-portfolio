
import { ArrowUp } from "lucide-react";
import { useState } from "react";

type ChatInputProps = {
  onSend: (message: string) => void;
  disabled?: boolean;
};

export default function ChatInput({
  onSend,
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const submit = () => {
    const cleanMessage = message.trim();

    if (!cleanMessage || disabled) return;

    onSend(cleanMessage);
    setMessage("");
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      className="flex items-center gap-2 rounded-xl border-2 border-[#19171c]/10 bg-[#faf5eb] p-2"
    >
      <input
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        disabled={disabled}
        maxLength={2000}
        placeholder={
          disabled
            ? "LUNA is thinking..."
            : "Ask something about Jemimah..."
        }
        aria-label="Ask LUNA a question"
        className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-[#19171c]/30 disabled:opacity-50"
      />

      <button
        type="submit"
        disabled={disabled || !message.trim()}
        aria-label="Send message"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#19171c] text-white transition hover:bg-[#8c70d0] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowUp size={16} />
      </button>
    </form>
  );
}
