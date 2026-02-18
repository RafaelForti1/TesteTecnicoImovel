import type { ThemeTokens } from '@/types';

export function themeToCssVars(theme: ThemeTokens): Record<string, string> {
  return {
    '--tenant-color-primary': theme.colorPrimary,
    '--tenant-color-primary-light': theme.colorPrimaryLight,
    '--tenant-color-primary-dark': theme.colorPrimaryDark,
    '--tenant-color-secondary': theme.colorSecondary,
    '--tenant-color-background': theme.colorBackground,
    '--tenant-color-surface': theme.colorSurface,
    '--tenant-color-surface-hover': theme.colorSurfaceHover,
    '--tenant-color-text': theme.colorText,
    '--tenant-color-text-muted': theme.colorTextMuted,
    '--tenant-color-text-on-primary': theme.colorTextOnPrimary,
    '--tenant-color-border': theme.colorBorder,
    '--tenant-color-overlay': theme.colorOverlay,
    '--tenant-font-display': theme.fontDisplay,
    '--tenant-font-body': theme.fontBody,
    '--tenant-font-size-hero': theme.fontSizeHero,
    '--tenant-font-weight-heading': theme.fontWeightHeading,
    '--tenant-radius-sm': theme.radiusSm,
    '--tenant-radius-md': theme.radiusMd,
    '--tenant-radius-lg': theme.radiusLg,
    '--tenant-radius-card': theme.radiusCard,
    '--tenant-radius-button': theme.radiusButton,
    '--tenant-shadow-card': theme.shadowCard,
    '--tenant-shadow-card-hover': theme.shadowCardHover,
    '--tenant-blur-header': theme.blurHeader,
    '--tenant-transition-default': theme.transitionDefault,
  };
}
