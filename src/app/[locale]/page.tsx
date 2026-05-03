import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import {
    HOME_QUERY,
    SERVICES_QUERY,
    FEATURED_PROJECTS_QUERY,
    TESTIMONIALS_QUERY,
} from '@/sanity/lib/queries'
import HeroSection        from '@/components/home/HeroSection'
import MarqueeSection     from '@/components/home/MarqueeSection'
import StatsSection       from '@/components/home/StatsSection'
import AboutPreview       from '@/components/home/AboutPreview'
import ServicesSection    from '@/components/home/ServicesSection'
import ProjectsSection    from '@/components/home/ProjectsSection'
import ProcessSection     from '@/components/home/ProcessSection'
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import CTASection         from '@/components/home/CTASection'

export default async function HomePage() {
    const [{ data: homeData }, { data: services }, { data: projects }, { data: testimonials }] =
        await Promise.all([
            sanityFetch({ query: HOME_QUERY }),
            sanityFetch({ query: SERVICES_QUERY }),
            sanityFetch({ query: FEATURED_PROJECTS_QUERY }),
            sanityFetch({ query: TESTIMONIALS_QUERY }),
        ])

    return (
        <>
            <HeroSection        cmsData={homeData} />
            <MarqueeSection />
            <StatsSection       cmsData={homeData} />
            <AboutPreview       cmsData={homeData} />
            <ServicesSection    cmsServices={services} cmsData={homeData} />
            <ProjectsSection    cmsProjects={projects} cmsData={homeData} />
            <ProcessSection />
            <WhyChooseUsSection cmsData={homeData} />
            <TestimonialsSection cmsTestimonials={testimonials} />
            <CTASection         cmsData={homeData} />
            <SanityLive />
        </>
    )
}
