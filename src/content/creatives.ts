/**
 * Ad creative gallery. Sample ads made for fictional brands to show creative and copy range.
 * Images live in public/images/creatives/. Paths are relative to /public.
 */
export interface Creative {
  image: string
  brand: string
  format: string
  angle: string
}

export const creatives: Creative[] = [
  { image: 'images/creatives/feed-pawtrail-ugc.jpg', brand: 'Pawtrail', format: 'UGC-style video · Reels', angle: 'Dog reaction hook, sound on' },
  { image: 'images/creatives/feed-pawtrail-compare.jpg', brand: 'Pawtrail', format: 'Sales · Feed', angle: 'Ingredients vs typical treats' },
  { image: 'images/creatives/feed-skin-b.jpg', brand: 'Solenne Skin', format: 'Sales · Feed', angle: 'Simple routine, clear promise' },
  { image: 'images/creatives/feed-realestate-a.jpg', brand: 'Kestrel Bay Realty', format: 'Lead ad · Feed', angle: 'Just listed, open house date' },
  { image: 'images/creatives/feed-webinar.jpg', brand: 'Lanternpath Coaching', format: 'Registrations · Feed', angle: 'Free workshop, one clear outcome' },
  { image: 'images/creatives/feed-dental.jpg', brand: 'Brightwell Dental Studio', format: 'Lead ad · Feed', angle: 'Price-led new patient offer' },
  { image: 'images/creatives/feed-roofing.jpg', brand: 'Tallpine Roofing', format: 'Lead ad · Feed', angle: 'Urgency after a storm' },
  { image: 'images/creatives/feed-pilates.jpg', brand: 'Fernhouse Pilates', format: 'Retargeting · Feed', angle: 'Gentle nudge for warm visitors' },
  { image: 'images/creatives/feed-realestate-b.jpg', brand: 'Kestrel Bay Realty', format: 'Lead ad · Feed', angle: 'Home value report for sellers' },
  { image: 'images/creatives/feed-skin-a.jpg', brand: 'Solenne Skin', format: 'Sales · Feed', angle: 'Soft benefit-led message' },
  { image: 'images/creatives/feed-pawtrail-offer.jpg', brand: 'Pawtrail', format: 'Sales · Feed', angle: 'Offer-led: first box 50% off' },
  { image: 'images/creatives/feed-pawtrail-old.jpg', brand: 'Pawtrail', format: 'Paused · fatigued', angle: 'Generic product shot (what not to keep running)' },
]
