import type { TenantConfig } from '@/types';
import { Container } from '@/components/ui/Container';

interface FooterProps {
  config: TenantConfig;
}

export function Footer({ config }: FooterProps) {
  return (
    <footer className="bg-secondary text-white/80 mt-20">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-display text-white text-xl font-bold mb-4">
              {config.name}
            </h3>
            <p className="text-sm leading-relaxed text-white/60">
              {config.tagline}
            </p>
          </div>

          <div>
            <h4 className="font-display text-white text-sm font-bold uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-2">
              {config.header.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-[var(--tenant-transition-default)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-white text-sm font-bold uppercase tracking-wider mb-4">
              Bairros
            </h4>
            <div className="flex flex-wrap gap-2">
              {config.allowedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-3 py-1 text-xs bg-white/10 text-white/70 rounded-button"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {config.name}. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
