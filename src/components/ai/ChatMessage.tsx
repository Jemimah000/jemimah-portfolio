
type ChatMessageProps = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatMessage({
  role,
  content,
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex w-full min-w-0 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`min-w-0 max-w-[85%] break-words whitespace-pre-wrap rounded-xl border px-4 py-3 text-sm leading-6 ${
          isUser
            ? "border-[#8c70d0] bg-[#8c70d0] text-white"
            : "border-[#19171c]/10 bg-[#faf5eb]"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
