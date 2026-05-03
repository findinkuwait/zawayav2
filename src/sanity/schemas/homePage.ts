import { defineField, defineType } from 'sanity'

const bilingualString = (name: string, title: string, enInit?: string, arInit?: string) =>
    defineField({
        name,
        title,
        type: 'object',
        fields: [
            defineField({ name: 'en', title: 'English', type: 'string', initialValue: enInit }),
            defineField({ name: 'ar', title: 'Arabic (عربي)', type: 'string', initialValue: arInit }),
        ],
    })

const bilingualText = (name: string, title: string, enInit?: string, arInit?: string) =>
    defineField({
        name,
        title,
        type: 'object',
        fields: [
            defineField({ name: 'en', title: 'English', type: 'text', rows: 3, initialValue: enInit }),
            defineField({ name: 'ar', title: 'Arabic (عربي)', type: 'text', rows: 3, initialValue: arInit }),
        ],
    })

export default defineType({
    name: 'homePage',
    title: 'Home Page',
    type: 'document',
    groups: [
        { name: 'hero',         title: 'Hero' },
        { name: 'stats',        title: 'Stats Bar' },
        { name: 'about',        title: 'About Preview' },
        { name: 'services',     title: 'Services' },
        { name: 'process',      title: 'Process' },
        { name: 'whyUs',        title: 'Why Choose Us' },
        { name: 'cta',          title: 'CTA' },
    ],
    fields: [
        // ── HERO ──
        defineField({
            name: 'heroSlides',
            title: 'Hero Slides',
            type: 'array',
            group: 'hero',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
                        bilingualString('title', 'Title', 'Luxury Hotel Lobby', 'لوبي فندق فاخر'),
                        bilingualString('location', 'Location', 'Kuwait City', 'الكويت'),
                        bilingualString('category', 'Category', 'Hospitality', 'ضيافة'),
                    ],
                    preview: {
                        select: { title: 'title.en', media: 'image' },
                    },
                },
            ],
        }),
        defineField({ name: 'heroBadgeValue', title: 'Hero Badge Value (e.g. 15+)', type: 'string', group: 'hero', initialValue: '15+' }),
        bilingualString('heroBadgeLabel', 'Hero Badge Label', 'Years of Craft', 'عاماً من الإبداع'),
        bilingualString('heroEyebrow', 'Hero Eyebrow', 'Interior Design & Fit-Out Studio', 'استوديو تصميم داخلي وتجهيز'),
        bilingualString('heroHeadline', 'Hero Headline', 'Transforming Spaces Into Timeless Experiences', 'نحول المساحات إلى تجارب خالدة'),
        bilingualString('heroSubheading', 'Hero Subheading', 'High-End Interior Fit-Out & Retail Space Design', 'حلول متكاملة للتصميم والتنفيذ للمحلات التجارية والمساحات الراقية'),
        bilingualString('heroBtnProjects', 'Hero Button — Projects', 'Explore Our Portfolio', 'استكشف أعمالنا'),
        bilingualString('heroBtnContact', 'Hero Button — Contact', 'Book Free Consultation', 'احجز استشارة مجانية'),

        // ── STATS ──
        defineField({
            name: 'stats',
            title: 'Stats',
            type: 'array',
            group: 'stats',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'value', title: 'Value (e.g. 15+)', type: 'string' }),
                        bilingualString('label', 'Label', 'Years Experience', 'سنوات خبرة'),
                    ],
                    preview: { select: { title: 'value' } },
                },
            ],
        }),

        // ── ABOUT PREVIEW ──
        defineField({ name: 'aboutImage', title: 'About Section Image', type: 'image', options: { hotspot: true }, group: 'about' }),
        defineField({ name: 'aboutEstTag', title: 'Est. Tag (e.g. EST. 2008)', type: 'string', group: 'about', initialValue: 'EST. 2008' }),
        bilingualString('aboutFeaturedStat', 'Featured Stat Headline', '120+ Premium Projects', '١٢٠+ مشروع راقٍ'),
        bilingualString('aboutFeaturedStatSub', 'Featured Stat Subtext', 'Across Kuwait & the region', 'في الكويت والمنطقة'),
        bilingualString('aboutTitle', 'About Title', 'About Zawaya International', 'عن زوايا الدولية'),
        bilingualText('aboutP1', 'About Paragraph 1',
            'Zawaya International is a specialized interior fit-out contractor delivering premium design and finishing solutions for commercial and hospitality spaces.',
            'زوايا الدولية مقاول متخصص في التجهيز الداخلي يقدم حلول تصميم وتشطيب متميزة للمساحات التجارية وقطاع الضيافة.'
        ),
        bilingualText('aboutP2', 'About Paragraph 2',
            'Our expertise covers design development, project management, interior construction, and high-end finishing works.',
            'تشمل خبرتنا تطوير التصميم وإدارة المشاريع والإنشاء الداخلي وأعمال التشطيب الراقية.'
        ),
        bilingualString('aboutBtn', 'About Button Text', 'Learn More', 'اعرف المزيد'),

        // ── SERVICES ──
        bilingualString('servicesTitle', 'Services Section Title', 'Our Expertise', 'خبرتنا'),
        bilingualString('servicesSubtitle', 'Services Section Subtitle',
            'Comprehensive fit-out solutions tailored for luxury and commercial environments.',
            'حلول تجهيز شاملة مصممة للبيئات الفاخرة والتجارية.'
        ),

        // ── WHY US ──
        bilingualString('whyUsTitle', 'Why Choose Us Title', 'Why Choose Zawaya', 'لماذا تختار زوايا'),

        // ── CTA ──
        bilingualString('ctaTitle', 'CTA Title', 'Start Your Project With Us', 'ابدأ مشروعك معنا'),
        bilingualString('ctaSubtitle', 'CTA Subtitle', "Let's transform your vision into a remarkable space.", 'دعنا نحوّل رؤيتك إلى مساحة استثنائية.'),
        bilingualString('ctaBtnConsult', 'CTA Button — Consult', 'Request Consultation', 'طلب استشارة'),
        bilingualString('ctaBtnContact', 'CTA Button — Contact', 'Contact Us', 'تواصل معنا'),
    ],
    preview: {
        prepare: () => ({ title: 'Home Page' }),
    },
})
