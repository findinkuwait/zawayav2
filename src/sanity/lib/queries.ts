import { groq } from 'next-sanity'

// ── Site Settings ────────────────────────────────────────────────
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    siteName, logo, whatsappNumber, phone, email, address, instagram, facebook, linkedin, footerTagline
  }
`

// ── Home Page ────────────────────────────────────────────────────
export const HOME_QUERY = groq`
  *[_type == "homePage" && _id == "homePage"][0] {
    heroSlides[] { image, title, location, category },
    heroBadgeValue, heroBadgeLabel,
    heroEyebrow, heroHeadline, heroSubheading, heroBtnProjects, heroBtnContact,
    stats,
    aboutImage, aboutEstTag, aboutFeaturedStat, aboutFeaturedStatSub,
    aboutTitle, aboutP1, aboutP2, aboutBtn,
    servicesTitle, servicesSubtitle,
    whyUsTitle,
    ctaTitle, ctaSubtitle, ctaBtnConsult, ctaBtnContact
  }
`

// ── Services (ordered list) ──────────────────────────────────────
export const SERVICES_QUERY = groq`
  *[_type == "service"] | order(order asc) {
    _id, order, title, description, tag, capabilities, image
  }
`

// ── Featured Projects (homepage) ─────────────────────────────────
export const FEATURED_PROJECTS_QUERY = groq`
  *[_type == "project" && featured == true] | order(order asc) {
    _id, title, slug, category, client, coverImage, completedAt
  }
`

// ── All Projects ─────────────────────────────────────────────────
export const ALL_PROJECTS_QUERY = groq`
  *[_type == "project"] | order(order asc, completedAt desc) {
    _id, title, slug, category, client, coverImage, completedAt, featured
  }
`

// ── Single Project ───────────────────────────────────────────────
export const PROJECT_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id, title, slug, category, client, location, area, completedAt, overview, scope, coverImage, gallery
  }
`

// ── All Project Slugs (for generateStaticParams) ─────────────────
export const PROJECT_SLUGS_QUERY = groq`
  *[_type == "project" && defined(slug.current)] { "slug": slug.current }
`

// ── Testimonials ─────────────────────────────────────────────────
export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id, quote, author, role
  }
`

// ── About Page ───────────────────────────────────────────────────
export const ABOUT_QUERY = groq`
  *[_type == "aboutPage" && _id == "aboutPage"][0] {
    title, subtitle, p1, p2, p3, stats
  }
`

// ── Process Page ─────────────────────────────────────────────────
export const PROCESS_QUERY = groq`
  *[_type == "processPage" && _id == "processPage"][0] {
    title, subtitle,
    steps[] { title, description, insight, image }
  }
`

// ── Clients Page ─────────────────────────────────────────────────
export const CLIENTS_QUERY = groq`
  *[_type == "clientsPage" && _id == "clientsPage"][0] {
    title, subtitle,
    clients[] { name, logo, url }
  }
`

// ── Contact Page ─────────────────────────────────────────────────
export const CONTACT_QUERY = groq`
  *[_type == "contactPage" && _id == "contactPage"][0] {
    title, subtitle, infoTitle, phone, email, address, mapEmbedUrl
  }
`
