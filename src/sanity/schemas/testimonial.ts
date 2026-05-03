import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
        defineField({
            name: 'quote',
            title: 'Quote',
            type: 'object',
            fields: [
                defineField({ name: 'en', title: 'English', type: 'text', rows: 3 }),
                defineField({ name: 'ar', title: 'Arabic (عربي)', type: 'text', rows: 3 }),
            ],
        }),
        defineField({
            name: 'author',
            title: 'Author Name',
            type: 'string',
        }),
        defineField({
            name: 'role',
            title: 'Role / Title',
            type: 'object',
            fields: [
                defineField({ name: 'en', title: 'English', type: 'string' }),
                defineField({ name: 'ar', title: 'Arabic (عربي)', type: 'string' }),
            ],
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
        }),
    ],
    orderings: [
        { title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    ],
    preview: {
        select: { title: 'author', subtitle: 'quote.en' },
    },
})
