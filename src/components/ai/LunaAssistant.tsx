
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
      .filter((item, index) => index !== 0)
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
      className="px-6 py-28 lg:px-12"
    >
      <SectionLabel number="04">
        Meet LUNA
      </SectionLabel>

      <div className="grid overflow-hidden rounded-2xl border-2 border-[#19171c]/15 bg-[#19171c] text-[#f8f2e8] lg:grid-cols-[0.8fr_1.2fr]">

        {/* LEFT PANEL */}
        <div className="relative overflow-hidden p-8 md:p-12">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#8c70d0]/30 blur-3xl" />

          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#8c70d0]">
              <Bot />
            </div>

            <h2 className="mt-8 font-display text-5xl">
              Meet LUNA.
            </h2>

            <p className="mt-5 max-w-md leading-7 text-white/60">
              I'm Jemimah's AI portfolio assistant.
              Ask me about her projects, technical
              skills, education, creative work, and
              professional interests.
            </p>

            <div className="mt-8 flex items-center gap-2 font-mono text-[10px] text-[#f4d35e]">
              <Sparkles size={13} />
              LUNA — Assisstant of Jemimah
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-[#eee5d7] p-5 text-[#19171c] md:p-7">

          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#8c70d0]">
              <Bot size={20} />
            </div>

            <div>
              <p className="font-medium">LUNA</p>

              <p className="font-mono text-[9px] text-[#19171c]/40">
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
              className={`ml-auto h-2 w-2 rounded-full ${
                isLoading
                  ? "animate-pulse bg-[#f4d35e]"
                  : hasError
                    ? "bg-red-500"
                    : "bg-green-500"
              }`}
            />
          </div>

          <div
            aria-live="polite"
            className="flex min-h-[300px] max-h-[420px] flex-col gap-3 overflow-y-auto rounded-xl bg-[#f4eee3] p-4"
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

          <div className="mt-4">
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
