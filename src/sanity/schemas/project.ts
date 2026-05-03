import { defineField, defineType } from 'sanity'

const bilingualString = (name: string, title: string) =>
    defineField({
        name,
        title,
        type: 'object',
        fields: [
            defineField({ name: 'en', title: 'English', type: 'string' }),
            defineField({ name: 'ar', title: 'Arabic (عربي)', type: 'string' }),
        ],
    })

const bilingualText = (name: string, title: string) =>
    defineField({
        name,
        title,
        type: 'object',
        fields: [
            defineField({ name: 'en', title: 'English', type: 'text', rows: 4 }),
            defineField({ name: 'ar', title: 'Arabic (عربي)', type: 'text', rows: 4 }),
        ],
    })

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        bilingualString('title', 'Title'),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title.en', maxLength: 96 },
            validation: (r) => r.required(),
        }),
        bilingualString('category', 'Category'),
        defineField({
            name: 'client',
            title: 'Client Name',
            type: 'string',
        }),
        bilingualString('location', 'Location'),
        defineField({
            name: 'area',
            title: 'Area (e.g. 450 sqm)',
            type: 'string',
        }),
        defineField({
            name: 'completedAt',
            title: 'Completion Year',
            type: 'string',
        }),
        bilingualText('overview', 'Overview / Description'),
        bilingualString('scope', 'Scope of Work'),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'featured',
            title: 'Featured on Homepage?',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
        }),
    ],
    orderings: [
        { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
        { title: 'Newest First', name: 'dateDesc', by: [{ field: 'completedAt', direction: 'desc' }] },
    ],
    preview: {
        select: { title: 'title.en', subtitle: 'category.en', media: 'coverImage' },
    },
})
