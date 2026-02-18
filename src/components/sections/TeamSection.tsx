import { Container } from '@/components/ui/Container';
import { SlideUp } from '@/components/animation/SlideUp';
import { Stagger, FloatingElement } from '@/components/animation/ElementAnimations';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface TeamSectionProps {
  title: string;
  subtitle: string;
  members: TeamMember[];
}

export function TeamSection({ title, subtitle, members }: TeamSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-surface" id="equipe">
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

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <SlideUp key={index} delay={index * 0.1}>
              <FloatingElement delay={index * 0.2}>
                <div className="bg-background rounded-2xl p-8 text-center group hover:shadow-lg transition-all duration-300">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-[var(--tenant-color-primary-light)] ring-opacity-20">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2 text-[var(--tenant-color-text)]">
                    {member.name}
                  </h3>
                  <p className="text-[var(--tenant-color-primary)] font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-muted leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </FloatingElement>
            </SlideUp>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}