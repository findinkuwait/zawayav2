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
            defineField({ name: 'en', title: 'English', type: 'text', rows: 4, initialValue: enInit }),
            defineField({ name: 'ar', title: 'Arabic (عربي)', type: 'text', rows: 4, initialValue: arInit }),
        ],
    })

export default defineType({
    name: 'aboutPage',
    title: 'About Page',
    type: 'document',
    fields: [
        bilingualString('title', 'Page Title', 'About Zawaya', 'عن زوايا'),
        bilingualString('subtitle', 'Subtitle', 'Crafting Exceptional Interior Spaces', 'صياغة مساحات داخلية استثنائية'),
        bilingualText('p1', 'Paragraph 1',
            'Zawaya International is a professional interior fit-out contractor specializing in commercial interiors, retail environments, hospitality spaces, and high-end finishing works.',
            'زوايا الدولية مقاول محترف للتجهيز الداخلي متخصص في الإنشاءات الداخلية التجارية وبيئات التجزئة ومساحات الضيافة وأعمال التشطيب الراقية.'
        ),
        bilingualText('p2', 'Paragraph 2',
            'We believe that the best spaces are built on a foundation of collaboration, trust, and a shared vision. Our experienced team of architects, designers, and craftsmen work closely with clients to deliver environments that inspire and engage.',
            'نعتقد أن أفضل المساحات تُبنى على أساس من التعاون والثقة والرؤية المشتركة. يعمل فريقنا المتمرس من المهندسين المعماريين والمصممين والحرفيين بشكل وثيق مع العملاء لتسليم بيئات تُلهم وتشرك.'
        ),
        bilingualText('p3', 'Paragraph 3',
            'With over 15 years of industry experience, we ensure that every project is completed to the highest standards of quality, on time and within budget.',
            'مع أكثر من 15 عامًا من الخبرة في الصناعة، نضمن إتمام كل مشروع وفق أعلى معايير الجودة، في الوقت المحدد وضمن الميزانية.'
        ),
        defineField({
            name: 'stats',
            title: 'Stats',
            type: 'array',
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
    ],
    preview: {
        prepare: () => ({ title: 'About Page' }),
    },
})
