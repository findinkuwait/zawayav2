/**
 * Seed script — pushes existing hardcoded content into Sanity.
 * Run with: node scripts/seed.mjs
 */
import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'a6486wf1',
    dataset:   'production',
    apiVersion: '2024-01-01',
    useCdn:    false,
    token:     'skFeMPG35Ag7d17Qbjz0eCC5Pbf7SozZ25jw7rSndA8fN395Wu2WE7qDlsDjBan2DBuJLfZOkgviHV1I5uEWkIQOJiGQ1AaKJWIz601BAqnWjPdDOThYWnZSZrwU3J42CPWeT52OkINbV8Wf4oya7ugHi0aKC3Eu9dLo1WxTU7Zu6Z1NBpEA',
})

// ── helpers ─────────────────────────────────────────────────────────
const bl  = (en, ar) => ({ en, ar })

async function upsert(doc) {
    try {
        await client.createOrReplace(doc)
        console.log(`✓ ${doc._type} (${doc._id})`)
    } catch (e) {
        console.error(`✗ ${doc._type} (${doc._id}):`, e.message)
    }
}

async function create(doc) {
    try {
        const res = await client.create(doc)
        console.log(`✓ ${doc._type} → ${res._id}`)
    } catch (e) {
        console.error(`✗ ${doc._type}:`, e.message)
    }
}

// ── 1. Site Settings ─────────────────────────────────────────────────
await upsert({
    _type: 'siteSettings',
    _id:   'siteSettings',
    siteName: 'Zawaya International',
    whatsappNumber: '+96512345678',
    phone:   '+965 1234 5678',
    email:   'info@zawayainternational.com',
    address: bl(
        'Kuwait City, Al Asimah – Zawaya International Studios',
        'مدينة الكويت، العاصمة – استوديوهات زوايا الدولية'
    ),
    footerTagline: bl(
        'Transforming spaces into timeless experiences.',
        'نحوّل الفراغات إلى تجارب خالدة.'
    ),
})

// ── 2. Home Page ─────────────────────────────────────────────────────
await upsert({
    _type: 'homePage',
    _id:   'homePage',
    heroEyebrow:     bl('Interior Design & Fit-Out Studio', 'استوديو تصميم داخلي وتجهيز'),
    heroBtnProjects: bl('Explore Our Portfolio', 'استكشف أعمالنا'),
    heroBtnContact:  bl('Book Free Consultation', 'احجز استشارتك المجانية'),
    aboutTitle:  bl('About Zawaya International', 'من نحن'),
    aboutP1:     bl(
        'Zawaya International is a specialized interior fit-out contractor delivering premium design and finishing solutions for commercial and hospitality spaces. We collaborate closely with brands and businesses to transform concepts into visually striking environments that enhance customer experience and elevate brand identity.',
        'شركة زوايا العالمية متخصصة في تنفيذ وتصميم المساحات الداخلية الراقية للمحلات التجارية والمطاعم والمساحات التجارية. نعمل مع العلامات التجارية والشركات لتحويل الأفكار إلى مساحات استثنائية تجمع بين الجمال والوظيفة.'
    ),
    aboutP2:     bl(
        'Our expertise covers design development, project management, interior construction, and high-end finishing works.',
        'نقدم حلولاً متكاملة تشمل التصميم والتنفيذ وإدارة المشاريع والتشطيبات الفاخرة.'
    ),
    aboutBtn:    bl('Learn More', 'اعرف المزيد'),
    servicesTitle:    bl('Our Expertise', 'خبراتنا'),
    servicesSubtitle: bl(
        'Comprehensive fit-out solutions tailored for luxury and commercial environments.',
        'حلول متكاملة للتجهيزات الداخلية للمساحات الفاخرة والتجارية.'
    ),
    whyUsTitle:  bl('Why Choose Zawaya', 'لماذا تختار زوايا'),
    ctaTitle:    bl('Start Your Project With Us', 'ابدأ مشروعك معنا'),
    ctaSubtitle: bl("Let's transform your vision into a remarkable space.", 'دعنا نحول فكرتك إلى مساحة استثنائية.'),
    ctaBtnConsult: bl('Request Consultation', 'اطلب استشارة'),
    ctaBtnContact: bl('Contact Us', 'تواصل معنا'),
})

// ── 3. About Page ────────────────────────────────────────────────────
await upsert({
    _type: 'aboutPage',
    _id:   'aboutPage',
    title:    bl('About Zawaya', 'من نحن'),
    subtitle: bl('Crafting Exceptional Interior Spaces', 'تصميم وتنفيذ مساحات داخلية استثنائية'),
    p1: bl(
        'Zawaya International is a professional interior fit-out contractor specializing in commercial interiors, retail environments, hospitality spaces, and high-end finishing works.',
        'شركة زوايا العالمية هي مقاول متخصص في تجهيز المساحات الداخلية والتجارية والفندقية والتشطيبات الراقية.'
    ),
    p2: bl(
        'We believe that the best spaces are built on a foundation of collaboration, trust, and a shared vision. Our experienced team of architects, designers, and craftsmen work closely with clients to deliver environments that inspire and engage.',
        'نؤمن بأن أفضل المساحات تبنى على أساس التعاون والثقة والرؤية المشتركة. يعمل فريقنا المتمرس من المهندسين والمصممين والحرفيين عن كثب مع العملاء لتقديم بيئات ملهمة وجذابة.'
    ),
    p3: bl(
        'With over 15 years of industry experience, we ensure that every project is completed to the highest standards of quality, on time and within budget.',
        'مع أكثر من 15 عاماً من الخبرة في الصناعة، نضمن إنجاز كل مشروع وفق أعلى معايير الجودة وفي الوقت المحدد وضمن الميزانية.'
    ),
    stats: [
        { _key: 's1', value: '15+', label: bl('Years Experience', 'سنة خبرة') },
        { _key: 's2', value: '120+', label: bl('Projects Completed', 'مشروع منفذ') },
        { _key: 's3', value: '40+', label: bl('Commercial Clients', 'عميل تجاري') },
        { _key: 's4', value: '5', label: bl('Countries Served', 'دول') },
    ],
})

// ── 4. Process Page ──────────────────────────────────────────────────
await upsert({
    _type: 'processPage',
    _id:   'processPage',
    title:    bl('Our Work Process', 'آلية العمل'),
    subtitle: bl(
        'A structured approach from concept to reality.',
        'نهج عمل متكامل من الفكرة وحتى التسليم.'
    ),
    steps: [
        {
            _key: 'step1',
            title:       bl('Consultation', 'الاستشارة'),
            description: bl(
                'We understand your brand, space requirements, and project goals.',
                'نفهم علامتك التجارية واحتياجاتك المساحية وأهداف المشروع.'
            ),
            insight: bl(
                'Every great project begins with listening.',
                'كل مشروع عظيم يبدأ بالاستماع.'
            ),
        },
        {
            _key: 'step2',
            title:       bl('Concept Design', 'التصميم'),
            description: bl(
                'Our design team develops layouts and visual concepts.',
                'يقوم فريق التصميم بتطوير المخططات والمفاهيم البصرية.'
            ),
            insight: bl(
                'Great design is where function meets beauty.',
                'التصميم الرائع هو حيث تلتقي الوظيفة بالجمال.'
            ),
        },
        {
            _key: 'step3',
            title:       bl('Execution', 'التنفيذ'),
            description: bl(
                'Our technical team manages construction and interior works.',
                'يدير فريقنا الفني أعمال البناء والتجهيزات الداخلية.'
            ),
            insight: bl(
                'Precision in every detail.',
                'الدقة في كل تفصيل.'
            ),
        },
        {
            _key: 'step4',
            title:       bl('Delivery', 'التسليم'),
            description: bl(
                'We deliver the completed space ready for operation.',
                'نسلم المساحة جاهزة للتشغيل.'
            ),
            insight: bl(
                'Your vision, fully realized.',
                'رؤيتك، محققة بالكامل.'
            ),
        },
    ],
})

// ── 5. Clients Page ──────────────────────────────────────────────────
await upsert({
    _type: 'clientsPage',
    _id:   'clientsPage',
    title:    bl('Our Clients', 'عملاؤنا'),
    subtitle: bl('Trusted by Leading Brands', 'موثوق به من قِبل العلامات التجارية الرائدة'),
    clients:  [],
})

// ── 6. Contact Page ──────────────────────────────────────────────────
await upsert({
    _type: 'contactPage',
    _id:   'contactPage',
    title:    bl('Contact Us', 'تواصل معنا'),
    subtitle: bl(
        "We'd love to hear from you. Get in touch with our team for your next interior project.",
        'يسعدنا التواصل معك. تواصل مع فريقنا لمشروعك الداخلي القادم.'
    ),
    infoTitle: bl('Contact Information', 'معلومات التواصل'),
    phone: '+965 1234 5678',
    email: 'info@zawayainternational.com',
    address: bl(
        'Kuwait City, Al Asimah – Zawaya International Studios',
        'مدينة الكويت، العاصمة – استوديوهات زوايا الدولية'
    ),
})

// ── 7. Services (4 documents) ────────────────────────────────────────
const services = [
    {
        order: 1,
        title:       bl('Interior Fit-Out', 'التجهيزات الداخلية'),
        description: bl(
            'Complete interior construction and finishing services for commercial spaces including structural works, partitions, ceilings, lighting systems, and custom installations.',
            'تنفيذ شامل لأعمال التصميم الداخلي والتشطيبات للمساحات التجارية والمطاعم والمحلات.'
        ),
        tag:          bl('Fit-Out', 'تجهيزات'),
        capabilities: bl(
            'Partitions, Ceilings, Custom Joinery, Lighting Systems',
            'تقسيمات، أسقف، نجارة مخصصة، أنظمة الإضاءة'
        ),
    },
    {
        order: 2,
        title:       bl('Retail Space Design', 'تصميم المساحات التجارية'),
        description: bl(
            'Designing attractive retail environments that enhance customer experience and strengthen brand identity.',
            'تصميم محلات ومساحات تجارية مبتكرة تعزز تجربة العملاء.'
        ),
        tag:          bl('Retail', 'تجزئة'),
        capabilities: bl(
            'Concept Design, Branding Integration, Visual Merchandising',
            'التصميم المفاهيمي، تكامل الهوية، التسويق البصري'
        ),
    },
    {
        order: 3,
        title:       bl('Hospitality Interiors', 'التصميم الداخلي للضيافة'),
        description: bl(
            'Creating immersive and luxurious atmospheres for hotels, restaurants, and lounges.',
            'خلق أجواء غامرة وفاخرة للفنادق والمطاعم والصالات.'
        ),
        tag:          bl('Hospitality', 'ضيافة'),
        capabilities: bl(
            'Hotels, Restaurants, Lounges, VIP Spaces',
            'فنادق، مطاعم، صالات، مساحات VIP'
        ),
    },
    {
        order: 4,
        title:       bl('Project Management', 'إدارة المشاريع'),
        description: bl(
            'End-to-end project supervision ensuring quality execution and on-time delivery.',
            'إدارة متكاملة للمشاريع لضمان التنفيذ الدقيق وتسليم المشروع في الوقت المحدد.'
        ),
        tag:          bl('Management', 'إدارة'),
        capabilities: bl(
            'Planning, Budgeting, Scheduling, Quality Control',
            'التخطيط، الميزانية، الجدولة، ضبط الجودة'
        ),
    },
]

for (const svc of services) {
    await create({ _type: 'service', ...svc })
}

// ── 8. Testimonials (2 documents) ───────────────────────────────────
const testimonials = [
    {
        order: 1,
        quote:  bl(
            'Zawaya International delivered our retail store exactly as envisioned. Their attention to detail and execution quality exceeded expectations.',
            'نفذت شركة زوايا العالمية مشروع متجرنا بأعلى مستوى من الجودة والاحترافية. اهتمامهم بالتفاصيل فاق توقعاتنا.'
        ),
        author: 'Ahmed Al-Rashid',
        role:   bl('CEO, Al-Rashid Retail Group', 'الرئيس التنفيذي، مجموعة الراشد للتجزئة'),
    },
    {
        order: 2,
        quote:  bl(
            'A professional team that respects timelines and delivers exceptional luxury finishes.',
            'فريق محترف يحترم الجداول الزمنية ويقدم تشطيبات راقية واستثنائية.'
        ),
        author: 'Sara Al-Mansouri',
        role:   bl('Director, Hospitality & Leisure Co.', 'مديرة، شركة الضيافة والترفيه'),
    },
]

for (const t of testimonials) {
    await create({ _type: 'testimonial', ...t })
}

console.log('\n✅ Seed complete!')
