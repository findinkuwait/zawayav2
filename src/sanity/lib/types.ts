export type BilingualString = { en?: string; ar?: string } | null

export type SanityImage = {
    _type: 'image'
    asset: { _ref: string; _type: 'reference' }
    hotspot?: { x: number; y: number; width: number; height: number }
} | null

export interface CmsHeroSlide {
    image: SanityImage
    title: BilingualString
    location: BilingualString
    category: BilingualString
}

export interface CmsHomeData {
    heroSlides?: CmsHeroSlide[]
    heroBadgeValue?: string
    heroBadgeLabel?: BilingualString
    heroEyebrow?: BilingualString
    heroHeadline?: BilingualString
    heroSubheading?: BilingualString
    heroBtnProjects?: BilingualString
    heroBtnContact?: BilingualString
    stats?: Array<{ value: string; label: BilingualString }>
    aboutImage?: SanityImage
    aboutEstTag?: string
    aboutFeaturedStat?: BilingualString
    aboutFeaturedStatSub?: BilingualString
    aboutTitle?: BilingualString
    aboutP1?: BilingualString
    aboutP2?: BilingualString
    aboutBtn?: BilingualString
    servicesTitle?: BilingualString
    servicesSubtitle?: BilingualString
    whyUsTitle?: BilingualString
    ctaTitle?: BilingualString
    ctaSubtitle?: BilingualString
    ctaBtnConsult?: BilingualString
    ctaBtnContact?: BilingualString
}

export interface CmsService {
    _id: string
    order: number
    title: BilingualString
    description: BilingualString
    tag: BilingualString
    capabilities: { en?: string; ar?: string } | null
    image: SanityImage
}

export interface CmsProject {
    _id: string
    title: BilingualString
    slug: { current: string }
    category: BilingualString
    client?: string
    coverImage: SanityImage
    completedAt?: string
    featured?: boolean
    order?: number
}

export interface CmsProjectFull extends CmsProject {
    location: BilingualString
    area?: string
    overview: BilingualString
    scope: BilingualString
    gallery?: SanityImage[]
}

export interface CmsTestimonial {
    _id: string
    quote: BilingualString
    author: string
    role: BilingualString
    order?: number
}

export interface CmsProcessStep {
    title: BilingualString
    description: BilingualString
    insight: BilingualString
    image: SanityImage
}

export interface CmsProcessData {
    title: BilingualString
    subtitle: BilingualString
    steps?: CmsProcessStep[]
}

export interface CmsAboutData {
    title: BilingualString
    subtitle: BilingualString
    p1: BilingualString
    p2: BilingualString
    p3: BilingualString
    stats?: Array<{ value: string; label: BilingualString }>
}

export interface CmsClientsData {
    title: BilingualString
    subtitle: BilingualString
    clients?: Array<{ name: string; logo: SanityImage; url?: string }>
}

export interface CmsContactData {
    title: BilingualString
    subtitle: BilingualString
    infoTitle: BilingualString
    phone?: string
    email?: string
    address: BilingualString
    mapEmbedUrl?: string
}

export interface CmsSiteSettings {
    siteName?: string
    logo?: SanityImage
    whatsappNumber?: string
    phone?: string
    email?: string
    address?: BilingualString
    instagram?: string
    facebook?: string
    linkedin?: string
    footerTagline?: BilingualString
}

// Helper: pick locale value or fallback
export function bl(field: BilingualString | undefined, locale: string, fallback = ''): string {
    if (!field) return fallback
    return (locale === 'ar' ? field.ar : field.en) ?? fallback
}
