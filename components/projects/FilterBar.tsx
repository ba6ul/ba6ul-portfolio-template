"use client";

interface FilterBarProps {
  active: string;
  onChange: (category: string) => void;
}

const categories = ["All", "Video", "Mobile", "Web", "Open Source"];

export function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={
            active === category
              ? "rounded-full border border-foreground bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-colors"
              : "rounded-full border border-border px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/50 hover:text-foreground"
          }
        >
          {category}
        </button>
      ))}
    </div>
  );
}