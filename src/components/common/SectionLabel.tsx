type SectionLabelProps = {
  number: string;
  children: string;
};

export default function SectionLabel({
  number,
  children,
}: SectionLabelProps) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span className="font-mono text-xs text-[#6f5aa9]">{number}</span>

      <span className="h-px flex-1 bg-[#19171c]/20" />

      <h2 className="font-mono text-xs uppercase tracking-[0.25em]">
        {children}
      </h2>
    </div>
  );
}