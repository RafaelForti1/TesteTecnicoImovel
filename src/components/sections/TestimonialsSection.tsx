import { Container } from '@/components/ui/Container';
import { SlideUp } from '@/components/animation/SlideUp';
import { Stagger } from '@/components/animation/ElementAnimations';

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

interface TestimonialsSectionProps {
  title: string;
  testimonials: Testimonial[];
  premium?: boolean;
}

export function TestimonialsSection({ title, testimonials, premium = false }: TestimonialsSectionProps) {
  const isPremium = premium;
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (isPremium) {
    return (
      <section className="py-16 lg:py-24 bg-[var(--tenant-color-surface)]" id="depoimentos">
        <Container>
          <SlideUp>
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="font-display text-3xl lg:text-4xl mb-3 text-[var(--tenant-color-text)]">
                {title}
              </h2>
              <div className="w-24 h-[2px] bg-[var(--tenant-color-primary-light)] mx-auto" />
            </div>
          </SlideUp>
          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <SlideUp key={index} delay={index * 0.1}>
                <div className="bg-background rounded-md p-8 border border-[var(--tenant-color-border)]">
                  <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
                  <p className="text-[var(--tenant-color-text)]/80 mb-6 leading-relaxed italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div>
                    <h4 className="font-display font-semibold text-[var(--tenant-color-text)]">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted">{testimonial.role}</p>
                  </div>
                </div>
              </SlideUp>
            ))}
          </Stagger>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-surface py-16 lg:py-24" id="depoimentos">
      <Container>
        <SlideUp>
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-display text-3xl lg:text-4xl mb-4 text-[var(--tenant-color-text)]">
              {title}
            </h2>
          </div>
        </SlideUp>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <SlideUp key={index} delay={index * 0.1}>
              <div className="bg-background rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-muted mb-6 leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[var(--tenant-color-primary-light)] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--tenant-color-text)]">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </SlideUp>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
