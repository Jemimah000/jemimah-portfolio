type DoodleProps = {
  type?: "star" | "heart" | "spark";
  className?: string;
};

export default function Doodle({
  type = "star",
  className = "",
}: DoodleProps) {
  const symbols = {
    star: "✦",
    heart: "♡",
    spark: "✧",
  };

  return (
    <span
      aria-hidden="true"
      className={`doodle-star inline-block text-[#8c70d0] ${className}`}
    >
      {symbols[type]}
    </span>
  );
}