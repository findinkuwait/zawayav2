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

export default defineType({
    name: 'contactPage',
    title: 'Contact Page',
    type: 'document',
    fields: [
        bilingualString('title', 'Page Title', 'Contact Us', 'تواصل معنا'),
        bilingualString('subtitle', 'Subtitle',
            "We'd love to hear from you. Get in touch with our team for your next interior project.",
            'يسعدنا التواصل معك. تواصل مع فريقنا لمشروعك الداخلي القادم.'
        ),
        bilingualString('infoTitle', 'Info Card Title', 'Contact Information', 'معلومات التواصل'),
        defineField({
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
            initialValue: '+965 1234 5678',
        }),
        defineField({
            name: 'email',
            title: 'Email Address',
            type: 'string',
            initialValue: 'info@zawayainternational.com',
        }),
        bilingualString('address', 'Address',
            'Kuwait City, Al Asimah – Zawaya International Studios',
            'مدينة الكويت، العاصمة – استوديوهات زوايا الدولية'
        ),
        defineField({
            name: 'mapEmbedUrl',
            title: 'Google Maps Embed URL',
            type: 'url',
        }),
    ],
    preview: {
        prepare: () => ({ title: 'Contact Page' }),
    },
})
