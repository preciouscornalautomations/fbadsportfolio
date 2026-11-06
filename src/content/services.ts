import type { IconName } from '../components/Icon'

export const method = {
  eyebrow: 'How I run your ads',
  titleMain: 'Audit, plan, launch, optimise.',
  titleSub: 'Then report, every week.',
  note: 'You approve the plan and the creatives before any money is spent.',
  steps: [
    { icon: 'search', title: 'Audit', text: 'I check the ad account, Pixel and events, past results, creatives, offer and landing page.', chips: ['Account', 'Tracking', 'Creative'] },
    { icon: 'map', title: 'Plan', text: 'A one-page plan: goal, audiences, budget split, creative concepts and the KPIs to watch.', chips: ['Audiences', 'Budget', 'Concepts'] },
    { icon: 'megaphone', title: 'Launch', text: 'I build the campaigns, write the copy, brief or build the creatives and test every form and link.', chips: ['Campaigns', 'Copy', 'Creatives'] },
    { icon: 'chart', title: 'Optimise', text: 'Daily budget checks, weekly A/B tests and fatigue checks, and a report with clear next steps.', chips: ['Testing', 'Scaling', 'Reports'] },
  ] as { icon: IconName; title: string; text: string; chips: string[] }[],
}

export const services: { icon: IconName; title: string; text: string; badge: string; points: string[] }[] = [
  {
    icon: 'target',
    title: 'Campaign setup and management',
    text: 'Lead-generation and conversion campaigns, built right.',
    badge: 'Leads and sales',
    points: ['Lead ads, Messenger and website conversions', 'Sales and Advantage+ shopping campaigns', 'Clean naming and account structure'],
  },
  {
    icon: 'users',
    title: 'Audiences and retargeting',
    text: 'The right people first, then the warm ones again.',
    badge: 'Full funnel',
    points: ['Broad, interest and lookalike audiences', 'Website, video and engager retargeting', 'Exclusions so budget is not wasted'],
  },
  {
    icon: 'chart',
    title: 'Budget and performance',
    text: 'Daily checks on spend and results.',
    badge: 'CPL · CPA · CTR · ROAS',
    points: ['Budget pacing and safe scaling', 'A/B tests with clear winner rules', 'Weekly report with recommendations'],
  },
  {
    icon: 'bulb',
    title: 'Creative strategy',
    text: 'What to say, to whom, and what to test next.',
    badge: 'Data-led',
    points: ['Concepts, hooks, messaging and angles', 'Test plans for images, video, UGC, copy and offers', 'Fatigue checks and fresh concepts on time'],
  },
  {
    icon: 'image',
    title: 'Ad creative production',
    text: 'Ads people stop scrolling for.',
    badge: 'Brief or build',
    points: ['Static, carousel and short video ads', 'UGC-style scripts and storyboards', 'Briefs for designers and creators'],
  },
  {
    icon: 'wrench',
    title: 'Tracking and troubleshooting',
    text: 'Clean data, so the algorithm learns the right thing.',
    badge: 'Pixel + CAPI',
    points: ['Meta Pixel and Conversions API setup', 'Events Manager, deduplication, domains', 'Fixing rejected ads and delivery issues'],
  },
]
