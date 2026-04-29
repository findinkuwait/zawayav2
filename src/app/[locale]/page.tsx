import HeroSection       from '@/components/home/HeroSection';
import MarqueeSection    from '@/components/home/MarqueeSection';
import StatsSection      from '@/components/home/StatsSection';
import AboutPreview      from '@/components/home/AboutPreview';
import ServicesSection   from '@/components/home/ServicesSection';
import ProjectsSection   from '@/components/home/ProjectsSection';
import ProcessSection    from '@/components/home/ProcessSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection        from '@/components/home/CTASection';

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <MarqueeSection />
            <StatsSection />
            <AboutPreview />
            <ServicesSection />
            <ProjectsSection />
            <ProcessSection />
            <WhyChooseUsSection />
            <TestimonialsSection />
            <CTASection />
        </>
    );
}
