import type { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { client } from '@/sanity/lib/client'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    const isAr = locale === 'ar'
    const title = isAr ? 'زوايا الدولية | تصميم وتجهيز المساحات الداخلية' : 'Zawaya International | Interior Design & Fit-Out Studio'
    const description = isAr
        ? 'زوايا الدولية — متخصصون في تصميم وتنفيذ المساحات الداخلية والتجارية الفاخرة في الكويت والمنطقة منذ ٢٠٠٨.'
        : 'Zawaya International — specialists in high-end interior fit-out and retail space design across Kuwait and the region since 2008.'
    return buildMeta(locale, title, description, '')
}
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
    const [homeData, services, projects, testimonials] =
        await Promise.all([
            client.fetch(HOME_QUERY, {}, { next: { revalidate: 60 } }),
            client.fetch(SERVICES_QUERY, {}, { next: { revalidate: 60 } }),
            client.fetch(FEATURED_PROJECTS_QUERY, {}, { next: { revalidate: 60 } }),
            client.fetch(TESTIMONIALS_QUERY, {}, { next: { revalidate: 60 } }),
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
        </>
    )
}
