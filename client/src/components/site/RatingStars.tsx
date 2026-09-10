import { Star } from "lucide-react";

export function RatingStars({ value, size = 14, interactive = false, onChange }: { value: number; size?: number; interactive?: boolean; onChange?: (value: number) => void }) {
  return <span className={`rating-stars ${interactive ? "is-interactive" : ""}`} aria-label={`${value} de 5 estrelas`} role={interactive ? "radiogroup" : undefined}>
    {[1, 2, 3, 4, 5].map((star) => <button key={star} type="button" disabled={!interactive} aria-label={`${star} estrelas`} aria-checked={value === star} onClick={() => onChange?.(star)}><Star size={size} fill={star <= value ? "currentColor" : "none"} /></button>)}
  </span>;
}
