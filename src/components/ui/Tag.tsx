interface TagProps {
  label: string;
}

export function Tag({ label }: TagProps) {
  return (
    <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/90 text-on-primary rounded-button backdrop-blur-sm">
      {label}
    </span>
  );
}
