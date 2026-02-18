import { Container } from '@/components/ui/Container';
import { SlideUp } from '@/components/animation/SlideUp';
import { FloatingElement } from '@/components/animation/ElementAnimations';

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface ServicesSectionProps {
  title: string;
  subtitle: string;
  services: Service[];
  premium?: boolean;
}

export function ServicesSection({ title, subtitle, services, premium = false }: ServicesSectionProps) {
  const isPremium = premium;
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'home':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'search':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
      case 'shield':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'chart':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  if (isPremium) {
    return (
      <section className="py-16 lg:py-24 bg-[var(--tenant-color-surface)]" id="servicos">
        <Container>
          <SlideUp>
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="font-display text-3xl lg:text-4xl mb-3 text-[var(--tenant-color-text)]">
                {title}
              </h2>
              <div className="w-24 h-[2px] bg-[var(--tenant-color-primary-light)] mx-auto mb-5" />
              <p className="text-muted text-lg max-w-2xl mx-auto italic">
                {subtitle}
              </p>
            </div>
          </SlideUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <SlideUp key={index} delay={index * 0.1}>
                <div className="flex items-start gap-5 bg-background rounded-md p-6 border border-[var(--tenant-color-border)] hover:border-[var(--tenant-color-primary-light)] transition-colors">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center border border-[var(--tenant-color-primary-light)] text-[var(--tenant-color-primary)]">
                    {getIcon(service.icon)}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-2 text-[var(--tenant-color-text)]">
                      {service.title}
                    </h3>
                    <p className="text-muted leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-surface py-16 lg:py-24" id="servicos">
      <Container>
        <SlideUp>
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-display text-3xl lg:text-4xl mb-4 text-[var(--tenant-color-text)]">
              {title}
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </SlideUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <SlideUp key={index} delay={index * 0.1}>
              <FloatingElement delay={index * 0.2}>
                <div className="bg-background rounded-2xl p-8 text-center group hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[var(--tenant-color-primary-light)]">
                  <div className="w-16 h-16 bg-[var(--tenant-color-primary-light)] text-[var(--tenant-color-text-on-primary)] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    {getIcon(service.icon)}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-[var(--tenant-color-text)]">
                    {service.title}
                  </h3>
                  <p className="text-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </FloatingElement>
            </SlideUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
