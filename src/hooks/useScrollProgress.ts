
import { useEffect, useState } from "react";

export default function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame = 0;

    const updateProgress = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        const scrollTop =
          window.scrollY ||
          document.documentElement.scrollTop;

        const documentHeight =
          document.documentElement.scrollHeight;

        const viewportHeight = window.innerHeight;

        const scrollableHeight =
          documentHeight - viewportHeight;

        if (scrollableHeight <= 0) {
          setProgress(0);
          return;
        }

        const percentage =
          (scrollTop / scrollableHeight) * 100;

        setProgress(Math.max(0, Math.min(percentage, 100)));
      });
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);

    const observer = new ResizeObserver(updateProgress);
    observer.observe(document.documentElement);

    if (document.body) {
      observer.observe(document.body);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      observer.disconnect();
    };
  }, []);

  return progress;
}
