import Link from 'next/link';

interface ButtonProps {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const sizeClasses: Record<string, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3.5 text-lg',
};

const variantClasses: Record<string, string> = {
  primary: 'bg-primary text-on-primary hover:bg-primary-dark rounded-button shadow-sm hover:shadow-md',
  outline: 'border-2 border-white text-white hover:bg-white/10 rounded-button',
  ghost: 'text-primary hover:bg-primary/5 rounded-button',
};

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  children,
  className = '',
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center font-medium',
    'transition-all duration-[var(--tenant-transition-default)]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
    sizeClasses[size],
    variantClasses[variant],
    className,
  ].join(' ');

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
