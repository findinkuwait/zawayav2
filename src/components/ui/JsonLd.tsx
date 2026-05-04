export default function JsonLd({ address, phone, email }: { address: string; phone: string; email: string }) {
    const schema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': 'https://zawayainternational.com/#organization',
                name: 'Zawaya International',
                url: 'https://zawayainternational.com',
                logo: 'https://zawayainternational.com/logo.png',
                contactPoint: { '@type': 'ContactPoint', telephone: phone, email, contactType: 'customer service' },
                sameAs: [],
            },
            {
                '@type': 'LocalBusiness',
                '@id': 'https://zawayainternational.com/#localbusiness',
                name: 'Zawaya International',
                description: 'Specialists in high-end interior fit-out and retail space design across Kuwait and the region.',
                url: 'https://zawayainternational.com',
                telephone: phone,
                email,
                address: { '@type': 'PostalAddress', addressLocality: 'Kuwait City', addressCountry: 'KW', streetAddress: address },
                geo: { '@type': 'GeoCoordinates', latitude: 29.3759, longitude: 47.9774 },
                openingHours: 'Mo-Sa 09:00-18:00',
                priceRange: '$$$$',
                image: 'https://zawayainternational.com/logo.png',
                '@context': 'https://schema.org',
            },
            {
                '@type': 'WebSite',
                '@id': 'https://zawayainternational.com/#website',
                url: 'https://zawayainternational.com',
                name: 'Zawaya International',
                publisher: { '@id': 'https://zawayainternational.com/#organization' },
                inLanguage: ['en', 'ar'],
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
