import type { IconName } from '../components/Icon'

export type Category = 'creative' | 'leads' | 'ecom' | 'retargeting' | 'tracking'

export interface Project {
  id: string
  category: Category
  kind: string
  title: string
  summary: string
  icon: IconName
  /** Fictional brand used for the sample */
  brand: string
  /** The brief: what the business needed */
  problem: string
  /** Campaign setup and what I did */
  built: string
  /** Campaign structure, shown as a short list in the popup */
  setup: string[]
  result: string
  /** Headline numbers shown on the card and in the popup */
  metrics: { label: string; value: string }[]
  tags: string[]
  /** Cover image (ad preview + sample report), relative to /public */
  image?: string
  /** Ad creatives shown in the popup, relative to /public */
  creatives?: string[]
  /** Optional captions for each creative. Default: "Version A", "Version B"... */
  creativeLabels?: string[]
}

export const filters: { id: 'all' | Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'creative', label: 'Creative testing' },
  { id: 'leads', label: 'Lead generation' },
  { id: 'ecom', label: 'E-commerce' },
  { id: 'retargeting', label: 'Retargeting' },
  { id: 'tracking', label: 'Tracking' },
]

/**
 * Sample campaigns. Brands are fictional and figures are illustrative, to show how I plan,
 * run and report a campaign. Replace any of these with real client work when you have
 * permission to share it.
 */
export const projects: Project[] = [
  {
    id: 'creative-refresh',
    category: 'creative',
    kind: 'Creative strategy · Pet brand',
    title: 'Fixing creative fatigue for a dog treat brand',
    summary: 'CTR back from 1.1% to 2.4% and cost per purchase down from $31 to $18 after a fresh round of concepts.',
    icon: 'refresh',
    brand: 'Pawtrail (fictional)',
    problem:
      'A dog treat subscription brand had run the same product-shot ad for months. Frequency had climbed past 4, CTR had halved and cost per purchase was up 70%. The client was ready to cut the budget.',
    built:
      'I read through reviews and comments to find how customers actually talk about the product, then built three new concepts: a UGC-style "dog reaction" video, an ingredients comparison, and a straight offer ad. I wrote a 15-second storyboard and a hook list for the video, briefed the edits, and launched all three in one test campaign against the old ad.',
    setup: [
      'Diagnosis: frequency 4.2, CTR down 52%, CPM flat (a creative problem, not an audience one)',
      'Three new concepts tested against the old ad, same audience and budget',
      'UGC-style video with 5 hook variations in the first 3 seconds',
      'Weekly fatigue check: frequency, CTR trend and CPA per ad',
    ],
    result:
      'The UGC video won clearly (CTR 3.1%, CPA $14.75) and took the largest share of budget. Overall CTR recovered to 2.4%, frequency dropped to 1.8, and ROAS went from 1.6x to 2.9x within five weeks.',
    metrics: [
      { label: 'CTR', value: '2.4%' },
      { label: 'Cost per purchase', value: '$18' },
      { label: 'ROAS', value: '2.9x' },
    ],
    tags: ['Creative strategy', 'UGC-style video', 'Hook testing', 'Creative fatigue'],
    image: 'images/projects/creative-refresh.jpg',
    creatives: ['images/creatives/feed-pawtrail-old.jpg', 'images/creatives/feed-pawtrail-ugc.jpg', 'images/creatives/feed-pawtrail-compare.jpg', 'images/creatives/feed-pawtrail-offer.jpg'],
    creativeLabels: ['Old ad (fatigued)', 'New: UGC-style video', 'New: ingredients', 'New: offer'],
  },
  {
    id: 'realestate-leads',
    category: 'leads',
    kind: 'Lead generation · Real estate',
    title: 'Buyer and listing leads for a real estate agent',
    summary: '96 leads in 30 days from a $1,200 budget, with cost per lead dropping every week.',
    icon: 'home',
    brand: 'Kestrel Bay Realty (fictional)',
    problem:
      'A solo agent had a new listing and wanted more buyer enquiries, plus a steady flow of homeowners thinking about selling. Boosted posts were getting likes but no real conversations.',
    built:
      'I split the budget into two campaigns: a "just listed" lead ad for buyers and a free home value report for future sellers. Both used Instant Forms with a qualifying question so the agent could see who was ready to move. New leads went straight to the CRM with an instant text reply.',
    setup: [
      'Campaign 1: Leads objective, Instant Form, buyers within 15 km of the listing',
      'Campaign 2: home value report for homeowners, broad audience with Advantage+',
      '3 creatives per ad set, weakest one paused each week',
      'Higher-intent form with one qualifying question',
    ],
    result:
      'Cost per lead fell from $18.40 in week 1 to $9.80 in week 4 as weak creatives were cut. 38% of leads were qualified and 14 booked a viewing or a valuation.',
    metrics: [
      { label: 'Leads', value: '96' },
      { label: 'Cost per lead', value: '$12.50' },
      { label: 'Viewings booked', value: '14' },
    ],
    tags: ['Lead ads', 'Instant Forms', 'Advantage+ audience', 'CRM sync'],
    image: 'images/projects/realestate-leads.jpg',
    creatives: ['images/creatives/feed-realestate-a.jpg', 'images/creatives/feed-realestate-b.jpg'],
  },
  {
    id: 'dental-patients',
    category: 'leads',
    kind: 'Lead generation · Dental clinic',
    title: 'New patient bookings for a dental clinic',
    summary: '61 booked new patients in 45 days at under $30 each.',
    icon: 'calendar',
    brand: 'Brightwell Dental Studio (fictional)',
    problem:
      'A family dental clinic had open chair time on weekday evenings and Saturdays. They needed new patients, not just people asking for prices.',
    built:
      'I built a clear $79 new patient offer and ran it with lead forms and a Messenger option for people who prefer to chat. The audience was people living within 8 km of the clinic. I worked with the front desk so every lead got a call within 15 minutes during opening hours.',
    setup: [
      'Leads objective with Instant Form and Click-to-Messenger ads',
      '8 km radius around the clinic, ages 25 to 60',
      'Offer-led creative tested against a "meet the team" angle',
      'Weekly check of lead quality with the front desk',
    ],
    result:
      'Lead volume grew every week as the budget moved to the best ad. 43% of leads booked an appointment, at $29.51 per booked patient.',
    metrics: [
      { label: 'Leads', value: '142' },
      { label: 'Booked patients', value: '61' },
      { label: 'Cost per booking', value: '$29.51' },
    ],
    tags: ['Lead ads', 'Messenger ads', 'Local targeting', 'Offer testing'],
    image: 'images/projects/dental-patients.jpg',
    creatives: ['images/creatives/feed-dental.jpg'],
  },
  {
    id: 'skincare-sales',
    category: 'ecom',
    kind: 'E-commerce · Skincare brand',
    title: 'Online store sales for a skincare brand',
    summary: '3.4x return on ad spend over 60 days, with two creative angles tested head to head.',
    icon: 'cart',
    brand: 'Solenne Skin (fictional)',
    problem:
      'A small skincare brand was selling well through word of mouth but its ads were stuck at break-even. They wanted to scale without wasting budget.',
    built:
      'I fixed the purchase tracking first, then ran a sales campaign with Advantage+ shopping and a product catalog. I tested two creative angles: a soft "glow" message and a bold "3 drops, 30 days" routine message. The routine angle won on click-through and cost per purchase, so it got the bigger share of budget.',
    setup: [
      'Sales objective, Advantage+ shopping campaign',
      'Catalog ads for returning visitors',
      'A/B test: "Glow" angle vs "3 drops. 30 days." angle',
      'Budget raised 20% at a time only when ROAS held for 3 days',
    ],
    result:
      'ROAS climbed from 2.4x in week 1 to 3.9x by week 8. Over 60 days the campaign drove 512 purchases and $22,100 in revenue from $6,500 spend.',
    metrics: [
      { label: 'ROAS', value: '3.4x' },
      { label: 'Purchases', value: '512' },
      { label: 'Revenue', value: '$22,100' },
    ],
    tags: ['Advantage+ shopping', 'Catalog ads', 'A/B testing', 'Scaling'],
    image: 'images/projects/skincare-sales.jpg',
    creatives: ['images/creatives/feed-skin-a.jpg', 'images/creatives/feed-skin-b.jpg'],
  },
  {
    id: 'coach-webinar',
    category: 'leads',
    kind: 'Lead generation · Business coach',
    title: 'Webinar registrations for a business coach',
    summary: '640 sign-ups at $3.75 each, leading to 27 discovery calls.',
    icon: 'video',
    brand: 'Lanternpath Coaching (fictional)',
    problem:
      'A business coach was launching a free live workshop and needed a full room. Past launches relied on organic posts and got a handful of sign-ups.',
    built:
      'I ran a 3-week registration campaign optimised for sign-ups on the landing page, with a countdown push in the final 5 days. I set up the Pixel and Conversions API so Meta could see who actually registered, and added a reminder ad for people who visited the page but did not sign up.',
    setup: [
      'Leads objective optimised for the registration event',
      'Interest and lookalike audiences from past email subscribers',
      'Reminder ad for page visitors who did not register',
      'Final-week "last chance" creative',
    ],
    result:
      '640 people registered at $3.75 each. 34% attended live, 61 applied for coaching and 27 booked a discovery call.',
    metrics: [
      { label: 'Registrations', value: '640' },
      { label: 'Cost per sign-up', value: '$3.75' },
      { label: 'Discovery calls', value: '27' },
    ],
    tags: ['Webinar funnel', 'Lookalike audiences', 'Pixel + CAPI', 'Reminder ads'],
    image: 'images/projects/coach-webinar.jpg',
    creatives: ['images/creatives/feed-webinar.jpg'],
  },
  {
    id: 'pilates-retargeting',
    category: 'retargeting',
    kind: 'Retargeting · Fitness studio',
    title: 'Retargeting ladder for a Pilates studio',
    summary: '58 free class bookings from warm audiences on a $900 budget.',
    icon: 'refresh',
    brand: 'Fernhouse Pilates (fictional)',
    problem:
      'A boutique studio was getting plenty of website visits and Instagram engagement, but most people left without booking a trial class.',
    built:
      'I built a retargeting ladder that follows people for 30 days after they show interest: website visitors, Instagram engagers and video viewers. Each group saw a different message, from "first class is free" to answers to common worries like "I have never done Pilates before". Frequency was capped so the ads never felt pushy.',
    setup: [
      'Custom audiences: site visitors (30 days), IG engagers, 50% video viewers',
      'Different message for each stage of interest',
      'Exclusion of people who already booked',
      'Frequency kept close to 2 per week',
    ],
    result:
      '58 people booked a free class at $15.52 each, and 19 became paying members. Website visitors converted best.',
    metrics: [
      { label: 'Trial bookings', value: '58' },
      { label: 'Cost per booking', value: '$15.52' },
      { label: 'New members', value: '19' },
    ],
    tags: ['Custom audiences', 'Retargeting', 'Instagram ads', 'Frequency control'],
    image: 'images/projects/pilates-retargeting.jpg',
    creatives: ['images/creatives/feed-pilates.jpg'],
  },
  {
    id: 'roofing-tracking',
    category: 'tracking',
    kind: 'Tracking · Roofing company',
    title: 'Pixel and Conversions API fix for a roofer',
    summary: 'Meta went from seeing 54% of leads to 96%, and cost per lead dropped from $68 to $46.',
    icon: 'chart',
    brand: 'Tallpine Roofing (fictional)',
    problem:
      'A roofing company thought its ads were failing. Their CRM showed far more leads than Ads Manager did, so Meta was optimising on half the picture.',
    built:
      'I audited the account and found a duplicated Pixel, missing events on the quote form and no server-side tracking. I cleaned up the events in Events Manager, set up the Conversions API with deduplication, and verified the domain. Then I relaunched the storm damage campaign on the corrected "Lead" event.',
    setup: [
      'Full Pixel and Events Manager audit',
      'Conversions API with event deduplication',
      'Domain verification and event priority setup',
      'Relaunch optimised on the corrected Lead event',
    ],
    result:
      'Event match quality rose from 4.1 to 8.3, Meta now sees 96% of the leads in the CRM, and cost per lead fell from $68 to $46 in the 30 days after the fix.',
    metrics: [
      { label: 'Leads tracked', value: '96%' },
      { label: 'Match quality', value: '8.3' },
      { label: 'Cost per lead', value: '$46' },
    ],
    tags: ['Meta Pixel', 'Conversions API', 'Events Manager', 'Account audit'],
    image: 'images/projects/roofing-tracking.jpg',
    creatives: ['images/creatives/feed-roofing.jpg'],
  },
]
