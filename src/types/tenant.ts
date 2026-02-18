export type TenantSlug = 'premium' | 'moderno';

export interface ThemeTokens {
  colorPrimary: string;
  colorPrimaryLight: string;
  colorPrimaryDark: string;
  colorSecondary: string;
  colorBackground: string;
  colorSurface: string;
  colorSurfaceHover: string;
  colorText: string;
  colorTextMuted: string;
  colorTextOnPrimary: string;
  colorBorder: string;
  colorOverlay: string;

  fontDisplay: string;
  fontBody: string;
  fontSizeHero: string;
  fontWeightHeading: string;

  radiusSm: string;
  radiusMd: string;
  radiusLg: string;
  radiusCard: string;
  radiusButton: string;

  shadowCard: string;
  shadowCardHover: string;
  blurHeader: string;

  transitionDefault: string;
}

export interface LayoutFlags {
  propertyCardLayout: 'vertical' | 'horizontal';
  headerLogoPosition: 'left' | 'center' | 'right';
  gridColumns: 2 | 3;
  showSecondaryCtaInHero: boolean;
  showServices?: boolean;
  showStats?: boolean;
  showTestimonials?: boolean;
  showTeam?: boolean;
}

export interface HeroConfig {
  backgroundImage: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  gradientDirection: string;
  floatingElements?: boolean;
  particles?: boolean;
}

export interface HeaderConfig {
  logoSrc: string;
  logoAlt: string;
  navLinks: NavLink[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface MetaConfig {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export interface ServicesConfig {
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface StatsConfig {
  title: string;
  items: StatItem[];
}

export interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface TestimonialsConfig {
  title: string;
  items: TestimonialItem[];
}

export interface TenantConfig {
  slug: TenantSlug;
  name: string;
  tagline: string;
  allowedTags: string[];
  theme: ThemeTokens;
  layout: LayoutFlags;
  hero: HeroConfig;
  header: HeaderConfig;
  services?: ServicesConfig;
  stats?: StatsConfig;
  testimonials?: TestimonialsConfig;
  meta: MetaConfig;
}
