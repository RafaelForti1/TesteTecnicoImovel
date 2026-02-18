interface PriceDisplayProps {
  value: number;
}

export function PriceDisplay({ value }: PriceDisplayProps) {
  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
  }).format(value);

  return (
    <p className="text-primary font-display text-xl font-bold tracking-tight">
      {formatted}
    </p>
  );
}
