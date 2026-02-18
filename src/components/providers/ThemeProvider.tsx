'use client';

import { useEffect } from 'react';
import type { ThemeTokens } from '@/types';
import { themeToCssVars } from '@/lib/theme-to-css-vars';

interface ThemeProviderProps {
  theme: ThemeTokens;
  children: React.ReactNode;
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  useEffect(() => {
    const vars = themeToCssVars(theme);
    const root = document.documentElement;

    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    return () => {
      Object.keys(vars).forEach((key) => {
        root.style.removeProperty(key);
      });
    };
  }, [theme]);

  return <>{children}</>;
}
