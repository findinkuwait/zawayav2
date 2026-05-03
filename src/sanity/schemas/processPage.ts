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
    name: 'processPage',
    title: 'Process Page',
    type: 'document',
    fields: [
        bilingualString('title', 'Section Title', 'Our Work Process', 'عملية عملنا'),
        bilingualString('subtitle', 'Section Subtitle',
            'A structured approach from concept to reality.',
            'نهج منظم من الفكرة إلى الواقع.'
        ),
        defineField({
            name: 'steps',
            title: 'Process Steps',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        bilingualString('title', 'Step Title', 'Consultation', 'الاستشارة'),
                        bilingualText('description', 'Description',
                            'We understand your brand, space requirements, and project goals.',
                            'نتعرف على علامتك التجارية ومتطلبات المساحة وأهداف المشروع.'
                        ),
                        bilingualText('insight', 'Insight Quote (optional)',
                            'Every great project begins with listening.',
                            'كل مشروع عظيم يبدأ بالاستماع.'
                        ),
                        defineField({ name: 'image', title: 'Step Image', type: 'image', options: { hotspot: true } }),
                    ],
                    preview: { select: { title: 'title.en', media: 'image' } },
                },
            ],
        }),
    ],
    preview: {
        prepare: () => ({ title: 'Process Page' }),
    },
})
