'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { structure } from './src/sanity/structure'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
    name: 'zawaya-studio',
    title: 'Zawaya International',
    projectId: 'a6486wf1',
    dataset: 'production',
    plugins: [
        structureTool({ structure }),
        visionTool(),
    ],
    schema: {
        types: schemaTypes,
    },
})
