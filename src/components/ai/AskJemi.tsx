import { Bot, Sparkles } from "lucide-react";
import { useState } from "react";
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
      "Hi! I'm Jemi's portfolio assistant. Ask me about her projects, skills, creative work or professional journey. ♡",
  },
];

export default function AskJemi() {
  const [messages, setMessages] = useState(initialMessages);

  const handleSend = (message: string) => {
    setMessages((current) => [
      ...current,
      {
        role: "user",
        content: message,
      },
      {
        role: "assistant",
        content:
          "I'm still learning! The real Ask Jemi AI will be connected here soon. 🤖",
      },
    ]);
  };

  return (
    <section id="ask-jemi" className="px-6 py-28 lg:px-12">
      <SectionLabel number="04">Meet Jemi</SectionLabel>

      <div className="grid overflow-hidden rounded-2xl border-2 border-[#19171c]/15 bg-[#19171c] text-[#f8f2e8] lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative overflow-hidden p-8 md:p-12">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#8c70d0]/30 blur-3xl" />

          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#8c70d0]">
              <Bot />
            </div>

            <h2 className="mt-8 font-display text-5xl">
              Ask Jemi.
            </h2>

            <p className="mt-5 max-w-md leading-7 text-white/60">
              Curious about the person behind the projects? Ask me about
              Jemimah's professional journey, skills, projects and creative
              interests.
            </p>

            <div className="mt-8 flex items-center gap-2 font-mono text-[10px] text-[#f4d35e]">
              <Sparkles size={13} />
              AI ASSISTANT — COMING SOON
            </div>
          </div>
        </div>

        <div className="bg-[#eee5d7] p-5 text-[#19171c] md:p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-[#8c70d0]">
              <div className="flex h-full items-center justify-center text-lg">
                J
              </div>
            </div>

            <div>
              <p className="font-medium">Jemi</p>
              <p className="font-mono text-[9px] text-[#19171c]/40">
                PROFESSIONAL PORTFOLIO AI
              </p>
            </div>

            <span className="ml-auto h-2 w-2 rounded-full bg-green-500" />
          </div>

          <div className="flex min-h-[300px] flex-col gap-3 overflow-y-auto rounded-xl bg-[#f4eee3] p-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={`${message.role}-${index}`}
                role={message.role}
                content={message.content}
              />
            ))}
          </div>

          <div className="mt-4">
            <ChatInput onSend={handleSend} />
          </div>
        </div>
      </div>
    </section>
  );
}