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
    name: 'clientsPage',
    title: 'Clients Page',
    type: 'document',
    fields: [
        bilingualString('title', 'Page Title', 'Our Clients', 'عملاؤنا'),
        bilingualString('subtitle', 'Subtitle', 'Trusted by Leading Brands', 'موثوق به من قِبل العلامات التجارية الرائدة'),
        defineField({
            name: 'clients',
            title: 'Clients',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'name', title: 'Client Name', type: 'string' }),
                        defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
                        defineField({ name: 'url', title: 'Website URL', type: 'url' }),
                    ],
                    preview: {
                        select: { title: 'name', media: 'logo' },
                    },
                },
            ],
        }),
    ],
    preview: {
        prepare: () => ({ title: 'Clients Page' }),
    },
})
