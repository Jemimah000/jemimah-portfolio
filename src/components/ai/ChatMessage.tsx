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
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-xl border px-4 py-3 text-sm leading-6 ${
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