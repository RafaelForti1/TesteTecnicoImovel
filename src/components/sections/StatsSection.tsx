import { Container } from '@/components/ui/Container';
import { SlideUp } from '@/components/animation/SlideUp';
import { Stagger } from '@/components/animation/ElementAnimations';

interface StatsSectionProps {
  title: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
  premium?: boolean;
}

export function StatsSection({ title, stats, premium = false }: StatsSectionProps) {
  const isPremium = premium;
  if (isPremium) {
    return (
      <section className="py-16 lg:py-24 bg-[var(--tenant-color-secondary)] text-white">
        <Container>
          <SlideUp>
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="font-display text-3xl lg:text-4xl mb-2">
                {title}
              </h2>
              <p className="text-sm text-white/60">
                Indicadores dos últimos 24 meses
              </p>
            </div>
          </SlideUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/15">
            {stats.map((stat, index) => (
              <div key={index} className="text-center px-4 py-6">
                <div className="text-4xl lg:text-6xl font-bold mb-2 font-display text-[var(--tenant-color-primary-light)]">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-[0.15em] text-white/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-[var(--tenant-color-primary)] to-[var(--tenant-color-primary-light)] text-white">
      <Container>
        <SlideUp>
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-display text-3xl lg:text-4xl mb-4">
              {title}
            </h2>
          </div>
        </SlideUp>
 
        <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-6xl font-bold mb-2 font-display">
                {stat.value}
              </div>
              <div className="text-lg opacity-90">
                {stat.label}
              </div>
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
