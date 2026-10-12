
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

type CustomScrollBarProps = {
  progress: number;
};

export default function CustomScrollBar({
  progress,
}: CustomScrollBarProps) {
  const [trackHeight, setTrackHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      setTrackHeight(Math.max(0, window.innerHeight - 16));
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const safeProgress = Math.max(0, Math.min(progress, 100));

  const fillHeight = (trackHeight * safeProgress) / 100;

  const handleTrackClick = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const clickPosition = Math.max(
      0,
      Math.min(event.clientY - rect.top - 8, trackHeight),
    );

    const targetProgress =
      trackHeight > 0 ? clickPosition / trackHeight : 0;

    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    window.scrollTo({
      top: targetProgress * Math.max(0, maxScroll),
      behavior: "smooth",
    });
  };

  return (
    <div
      className="custom-scroll-track"
      onClick={handleTrackClick}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(safeProgress)}
    >
      {/* Full-height subtle background rail */}
      <div className="custom-scroll-track-line" />

      {/* Gradient grows from top to bottom */}
      <div
        className="custom-scroll-progress"
        style={{
          height: `${fillHeight}px`,
        }}
      >
        <div className="custom-scroll-gradient" />

        {/* Sparkle follows the growing endpoint */}
        <div className="custom-scroll-sparkle">
          <Sparkles size={17} strokeWidth={2.2} />
        </div>
      </div>
    </div>
  );
}
