import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'siteName',
            title: 'Site Name',
            type: 'string',
            initialValue: 'Zawaya International',
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'whatsappNumber',
            title: 'WhatsApp Number',
            type: 'string',
            description: 'Include country code e.g. +96512345678',
            initialValue: '+96512345678',
        }),
        defineField({
            name: 'phone',
            title: 'Phone',
            type: 'string',
            initialValue: '+965 1234 5678',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            initialValue: 'info@zawayainternational.com',
        }),
        defineField({
            name: 'address',
            title: 'Address',
            type: 'object',
            fields: [
                defineField({ name: 'en', title: 'English', type: 'string', initialValue: 'Kuwait City, Al Asimah – Zawaya International Studios' }),
                defineField({ name: 'ar', title: 'Arabic', type: 'string', initialValue: 'مدينة الكويت، العاصمة – استوديوهات زوايا الدولية' }),
            ],
        }),
        defineField({
            name: 'instagram',
            title: 'Instagram URL',
            type: 'url',
        }),
        defineField({
            name: 'facebook',
            title: 'Facebook URL',
            type: 'url',
        }),
        defineField({
            name: 'linkedin',
            title: 'LinkedIn URL',
            type: 'url',
        }),
        defineField({
            name: 'footerTagline',
            title: 'Footer Tagline',
            type: 'object',
            fields: [
                defineField({ name: 'en', title: 'English', type: 'string', initialValue: 'Transforming spaces into timeless experiences.' }),
                defineField({ name: 'ar', title: 'Arabic', type: 'string', initialValue: 'نحوّل الفراغات إلى تجارب خالدة.' }),
            ],
        }),
    ],
    preview: {
        prepare: () => ({ title: 'Site Settings' }),
    },
})
