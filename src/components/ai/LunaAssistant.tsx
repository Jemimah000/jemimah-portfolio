import { Bot, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SectionLabel from "../common/SectionLabel";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Hi! I'm LUNA, Jemimah's portfolio assistant. " +
      "Ask me about her projects, skills, education, " +
      "creative work, or professional interests. ♡",
  },
];

export default function LunaAssistant() {
  const [messages, setMessages] =
    useState<Message[]>(initialMessages);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages, isLoading]);

  const handleSend = async (message: string) => {
    const cleanMessage = message.trim();

    if (!cleanMessage || loadingRef.current) return;

    loadingRef.current = true;
    setIsLoading(true);
    setHasError(false);

    const history = messages
      .filter((_, index) => index !== 0)
      .slice(-10)
      .map((item) => ({
        role: item.role === "assistant" ? "model" : "user",
        content: item.content,
      }));

    setMessages((current) => [
      ...current,
      {
        role: "user",
        content: cleanMessage,
      },
    ]);

    try {
      const response = await fetch("/api/luna", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: cleanMessage,
          history,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "LUNA couldn't process your request."
        );
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            data.reply ||
            "Sorry, I couldn't generate a response.",
        },
      ]);
    } catch (error) {
      console.error("LUNA request error:", error);

      setHasError(true);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  };

  return (
    <section
      id="ask-luna"
      className="px-5 pb-20 pt-10 sm:px-6 sm:pt-12 lg:px-12 lg:pt-14"
    >
      <SectionLabel number="03">
        Meet LUNA
      </SectionLabel>

      {/* Larger LUNA workspace */}
      <div className="grid min-h-[620px] overflow-hidden rounded-2xl border-2 border-[#19171c] bg-[#19171c] text-[#f8f2e8] shadow-[0_18px_60px_rgba(25,23,28,0.12)] sm:min-h-[680px] lg:min-h-[700px] lg:grid-cols-[0.8fr_1.2fr]">

        {/* LEFT PANEL */}
        <div className="relative flex flex-col justify-center overflow-hidden p-8 sm:p-10 md:p-14 lg:p-12 xl:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#8c70d0]/30 blur-3xl" />

          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#8c70d0]/10 blur-3xl" />

          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#8c70d0] shadow-lg shadow-[#8c70d0]/20">
              <Bot size={30} />
            </div>

            <h2 className="mt-8 font-display text-4xl sm:text-5xl lg:text-5xl xl:text-6xl">
              Meet LUNA.
            </h2>

            <p className="mt-6 max-w-md text-base leading-8 text-white/65 sm:text-lg">
              I'm Jemimah's AI portfolio assistant.
              Ask me about her projects, technical
              skills, education, creative work, and
              professional interests.
            </p>

            <div className="mt-10 flex items-center gap-2 font-mono text-xs text-[#f4d35e]">
              <Sparkles size={15} />
              LUNA — Assistant of Jemimah
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex min-h-[580px] flex-col bg-[#eee5d7] p-4 text-[#19171c] sm:p-6 md:p-8 lg:min-h-0 lg:p-8 xl:p-10">

          {/* Chat header */}
          <div className="mb-5 flex shrink-0 items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8c70d0]">
              <Bot size={23} />
            </div>

            <div>
              <p className="text-lg font-medium">LUNA</p>

              <p className="font-mono text-[10px] text-[#19171c]/45">
                JEMIMAH'S PORTFOLIO ASSISTANT
              </p>
            </div>

            <span
              title={
                isLoading
                  ? "LUNA is responding"
                  : hasError
                    ? "Last request failed"
                    : "Ready"
              }
              className={`ml-auto h-2.5 w-2.5 rounded-full ${
                isLoading
                  ? "animate-pulse bg-[#f4d35e]"
                  : hasError
                    ? "bg-red-500"
                    : "bg-green-500"
              }`}
            />
          </div>

          {/* Larger conversation area */}
          <div
            aria-live="polite"
            className="flex min-h-[380px] flex-1 flex-col gap-4 overflow-y-auto overscroll-contain rounded-2xl border border-[#19171c]/5 bg-[#f4eee3] p-4 sm:min-h-[420px] sm:p-5 lg:min-h-[460px] lg:p-6"
          >
            {messages.map((message, index) => (
              <ChatMessage
                key={`${message.role}-${index}`}
                role={message.role}
                content={message.content}
              />
            ))}

            {isLoading && (
              <ChatMessage
                role="assistant"
                content="LUNA is thinking... ✨"
              />
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input stays below the conversation */}
          <div className="mt-4 shrink-0">
            <ChatInput
              onSend={handleSend}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </section>
  );
}