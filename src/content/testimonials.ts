export interface Testimonial {
  quote: string
  name: string
  role: string
  /** Optional headshot, relative to /public, e.g. 'images/testimonials/jane.jpg'. Hidden if the file is missing. */
  avatar?: string
}

/**
 * Real client quotes only, with their permission. While this list is empty the
 * Testimonials section is hidden. To show it, add quotes here and add
 * { id: 'testimonials', label: 'Testimonials', icon: 'star' } to src/content/nav.ts.
 */
export const testimonials: Testimonial[] = []

/** Optional "worked with" logo strip. Leave empty to hide it. */
export const clients: { name: string; logo: string }[] = []
