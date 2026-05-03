import type { StructureResolver } from 'sanity/structure'

// Singleton page types — one document each, no "Create New"
const SINGLETONS = [
    { id: 'siteSettings',  title: 'Site Settings',   type: 'siteSettings' },
    { id: 'homePage',      title: 'Home Page',        type: 'homePage' },
    { id: 'aboutPage',     title: 'About Page',       type: 'aboutPage' },
    { id: 'servicesPage',  title: 'Services Page',    type: 'servicesPage' },
    { id: 'processPage',   title: 'Process Page',     type: 'processPage' },
    { id: 'clientsPage',   title: 'Clients Page',     type: 'clientsPage' },
    { id: 'contactPage',   title: 'Contact Page',     type: 'contactPage' },
]

export const structure: StructureResolver = (S) =>
    S.list()
        .title('Content')
        .items([
            ...SINGLETONS.map(({ id, title, type }) =>
                S.listItem()
                    .title(title)
                    .id(id)
                    .child(
                        S.document()
                            .schemaType(type)
                            .documentId(id)
                    )
            ),
            S.divider(),
            S.listItem()
                .title('Projects')
                .child(S.documentTypeList('project').title('Projects')),
            S.listItem()
                .title('Services')
                .child(S.documentTypeList('service').title('Services')),
            S.listItem()
                .title('Testimonials')
                .child(S.documentTypeList('testimonial').title('Testimonials')),
        ])
