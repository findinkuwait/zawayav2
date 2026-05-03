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
            defineField({ name: 'en', title: 'English', type: 'text', rows: 3 }),
            defineField({ name: 'ar', title: 'Arabic (عربي)', type: 'text', rows: 3 }),
        ],
    })

export default defineType({
    name: 'service',
    title: 'Service',
    type: 'document',
    fields: [
        defineField({
            name: 'order',
            title: 'Order (01, 02 …)',
            type: 'number',
            description: 'Controls display order',
        }),
        bilingualString('title', 'Title'),
        bilingualText('description', 'Description'),
        bilingualString('tag', 'Category Tag'),
        defineField({
            name: 'capabilities',
            title: 'Key Capabilities',
            type: 'object',
            fields: [
                defineField({
                    name: 'en',
                    title: 'English (comma-separated)',
                    type: 'string',
                    description: 'e.g. Partitions, Ceilings, Custom Joinery',
                }),
                defineField({
                    name: 'ar',
                    title: 'Arabic (comma-separated)',
                    type: 'string',
                    description: 'e.g. تقسيمات، أسقف، نجارة مخصصة',
                }),
            ],
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
        }),
    ],
    orderings: [
        { title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    ],
    preview: {
        select: { title: 'title.en', subtitle: 'tag.en', media: 'image' },
    },
})
