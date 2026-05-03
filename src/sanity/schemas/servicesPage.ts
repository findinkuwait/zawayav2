import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'servicesPage',
    title: 'Services Page',
    type: 'document',
    fields: [
        defineField({
            name: 'metaTitle',
            title: 'Meta Title',
            type: 'string',
            initialValue: 'Our Services | Zawaya International',
        }),
        defineField({
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'text',
            rows: 2,
            initialValue: 'Comprehensive fit-out solutions tailored for luxury and commercial environments.',
        }),
    ],
    preview: {
        prepare: () => ({ title: 'Services Page' }),
    },
})
