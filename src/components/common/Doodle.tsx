type DoodleType =
  | "star"
  | "spark"
  | "heart"
  | "arrow"
  | "cloud"
  | "flower"
  | "smile";

type DoodleProps = {
  type?: DoodleType;
  className?: string;
};

const doodles: Record<DoodleType, string> = {
  star: "✦",
  spark: "✧",
  heart: "♥",
  arrow: "↘",
  cloud: "☁",
  flower: "✿",
  smile: "☺",
};

const styles: Record<DoodleType, string> = {
  star: "doodle-star",
  spark: "doodle-spark",
  heart: "doodle-heart",
  arrow: "doodle-arrow",
  cloud: "doodle-cloud",
  flower: "text-[#ff8e8e]",
  smile: "text-[#7c5ce7]",
};

export default function Doodle({
  type = "star",
  className = "",
}: DoodleProps) {
  return (
    <span
      aria-hidden="true"
      className={`doodle ${styles[type]} ${className}`}
    >
      {doodles[type]}
    </span>
  );
}