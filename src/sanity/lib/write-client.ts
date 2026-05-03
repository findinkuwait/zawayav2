import { createClient } from '@sanity/client'

export const writeClient = createClient({
    projectId: 'a6486wf1',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
})
