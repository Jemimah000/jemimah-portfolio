
import { Sparkles } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import SectionLabel from "../common/SectionLabel";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type HistoryMessage = {
  role: "user" | "model";
  content: string;
};

const API_URL = (
  import.meta.env.VITE_LUNA_API_URL ||
  (import.meta.env.DEV ? "" : "https://jemimah-portfolio.onrender.com")
).replace(/\/+$/, "");

const LUNA_ENDPOINT = API_URL
  ? `${API_URL}/api/luna`
  : "/api/luna";

const ORB_SIZE = 28;

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
  const [orbTop, setOrbTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const draggingRef = useRef(false);

  // Keep the orb in sync with the conversation's scroll position.
  const updateOrbPosition = useCallback(() => {
    const chat = chatRef.current;
    const track = trackRef.current;

    if (!chat || !track) return;

    const maxScroll = chat.scrollHeight - chat.clientHeight;
    const maxTop = Math.max(0, track.clientHeight - ORB_SIZE);

    if (maxScroll <= 0 || maxTop <= 0) {
      setOrbTop(0);
      return;
    }

    setOrbTop((chat.scrollTop / maxScroll) * maxTop);
  }, []);

  // Scroll only the message area when a new message arrives.
  useEffect(() => {
    const chat = chatRef.current;
    if (!chat) return;

    chat.scrollTo({
      top: chat.scrollHeight,
      behavior: "smooth",
    });

    const frame = requestAnimationFrame(updateOrbPosition);

    return () => cancelAnimationFrame(frame);
  }, [messages, isLoading, updateOrbPosition]);

  // Keep the orb updated during scrolling and resizing.
  useEffect(() => {
    const chat = chatRef.current;
    const track = trackRef.current;

    if (!chat || !track) return;

    chat.addEventListener("scroll", updateOrbPosition, {
      passive: true,
    });

    const observer = new ResizeObserver(updateOrbPosition);
    observer.observe(chat);
    observer.observe(track);

    updateOrbPosition();

    return () => {
      chat.removeEventListener("scroll", updateOrbPosition);
      observer.disconnect();
    };
  }, [updateOrbPosition]);

  // Drag or click the track to navigate the conversation.
  const moveOrbToPointer = useCallback(
    (clientY: number) => {
      const chat = chatRef.current;
      const track = trackRef.current;

      if (!chat || !track) return;

      const rect = track.getBoundingClientRect();
      const maxTop = Math.max(0, track.clientHeight - ORB_SIZE);
      const maxScroll = chat.scrollHeight - chat.clientHeight;

      if (maxTop <= 0 || maxScroll <= 0) {
        chat.scrollTop = 0;
        setOrbTop(0);
        return;
      }

      const nextTop = Math.max(
        0,
        Math.min(maxTop, clientY - rect.top - ORB_SIZE / 2)
      );

      setOrbTop(nextTop);
      chat.scrollTop = (nextTop / maxTop) * maxScroll;
    },
    []
  );

  const handleTrackPointerDown = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    if (event.button !== 0) return;

    event.preventDefault();

    draggingRef.current = true;
    setIsDragging(true);

    event.currentTarget.setPointerCapture(event.pointerId);
    moveOrbToPointer(event.clientY);
  };

  const handleTrackPointerMove = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    if (!draggingRef.current) return;

    moveOrbToPointer(event.clientY);
  };

  const handleTrackPointerUp = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    draggingRef.current = false;
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleSend = async (message: string) => {
    const cleanMessage = message.trim();

    if (!cleanMessage || loadingRef.current) return;

    loadingRef.current = true;
    setIsLoading(true);
    setHasError(false);

    const history: HistoryMessage[] = messages
      .filter((_, index) => index !== 0)
      .slice(-10)
      .map((item) => ({
        role: item.role === "assistant" ? "model" : "user",
        content: item.content,
      }));

    setMessages((current) => [
      ...current,
      { role: "user", content: cleanMessage },
    ]);

    try {
      const response = await fetch(LUNA_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(18000),
        body: JSON.stringify({
          message: cleanMessage,
          history,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error ||
            `LUNA request failed (${response.status}). Please try again.`
        );
      }

      if (!data.reply) {
        throw new Error(
          "LUNA received an empty response. Please try again."
        );
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.reply,
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
          content:
            "Sorry, I couldn't connect to LUNA right now. " +
            errorMessage,
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
      <SectionLabel number="03">Meet LUNA</SectionLabel>

      <div className="grid h-[680px] grid-cols-1 overflow-hidden rounded-2xl border-2 border-[#19171c] bg-[#19171c] text-[#f8f2e8] shadow-[0_18px_60px_rgba(25,23,28,0.12)] sm:h-[720px] lg:h-[700px] lg:grid-cols-[0.8fr_1.2fr]">
        {/* LEFT PANEL */}
        <div className="relative flex min-h-0 flex-col justify-center overflow-hidden p-8 sm:p-10 md:p-14 lg:p-12 xl:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#8c70d0]/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#8c70d0]/10 blur-3xl" />

          <div className="relative z-10">
            <div className="luna-panel-art relative mb-5 flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
              <div className="absolute inset-3 rounded-full bg-[#8c70d0]/20 blur-2xl" />

              <img
                src="/images/luna-orb.png"
                alt="LUNA, Jemimah's friendly AI portfolio assistant"
                className="luna-panel-image relative z-10 h-full w-full object-contain drop-shadow-[0_8px_16px_rgba(140,112,208,0.22)]"
              />
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl xl:text-6xl">
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

        {/* RIGHT PANEL — FIXED CHAT */}
        <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#eee5d7] p-4 text-[#19171c] sm:p-6 md:p-8 lg:p-8 xl:p-10">
          {/* Fixed chat header */}
          <div className="mb-5 flex shrink-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#8c70d0]/15">
              <img
                src="/images/luna-orb.png"
                alt=""
                aria-hidden="true"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0">
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
              className={`ml-auto h-2.5 w-2.5 shrink-0 rounded-full ${
                isLoading
                  ? "animate-pulse bg-[#f4d35e]"
                  : hasError
                    ? "bg-red-500"
                    : "bg-green-500"
              }`}
            />
          </div>

          {/* Message area + custom magic orb */}
          <div className="relative flex min-h-0 flex-1">
            <div
              id="luna-chat-messages"
              ref={chatRef}
              aria-live="polite"
              className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto overscroll-contain rounded-2xl border border-[#19171c]/5 bg-[#f4eee3] p-4 pr-10 sm:p-5 sm:pr-10 lg:p-6 lg:pr-10 [&::-webkit-scrollbar]:hidden"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
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
            </div>

            {/* Magic scroll track */}
            <div
              ref={trackRef}
              role="scrollbar"
              aria-label="Scroll through LUNA's conversation"
              aria-controls="luna-chat-messages"
              aria-orientation="vertical"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(
                chatRef.current &&
                  chatRef.current.scrollHeight >
                    chatRef.current.clientHeight
                  ? (chatRef.current.scrollTop /
                      (chatRef.current.scrollHeight -
                        chatRef.current.clientHeight)) *
                      100
                  : 0
              )}
              onPointerDown={handleTrackPointerDown}
              onPointerMove={handleTrackPointerMove}
              onPointerUp={handleTrackPointerUp}
              onPointerCancel={handleTrackPointerUp}
              className="absolute bottom-3 right-1 top-3 z-10 w-7 cursor-pointer touch-none rounded-full bg-[#8c70d0]/10"
            >
              {/* Decorative track glow */}
              <div className="pointer-events-none absolute inset-x-2 inset-y-1 rounded-full bg-gradient-to-b from-[#8c70d0]/10 via-[#8c70d0]/25 to-[#8c70d0]/10" />

              {/* Draggable glowing orb */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border border-white/80 bg-gradient-to-br from-[#d9c8ff] via-[#9c76f5] to-[#6d36d9] shadow-[0_0_8px_rgba(140,112,208,0.75),0_0_20px_rgba(140,112,208,0.5)] ${
                  isDragging
                    ? "scale-110"
                    : "transition-[top,transform] duration-100"
                }`}
                style={{ top: `${orbTop}px` }}
              >
                <Sparkles
                  size={13}
                  strokeWidth={2.5}
                  className="text-white drop-shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Fixed input at the bottom */}
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
