import type { IconName } from '../components/Icon'

export const toolGroups: { icon: IconName; title: string; items: string[] }[] = [
  { icon: 'megaphone', title: 'Meta ads', items: ['Meta Ads Manager', 'Meta Business Suite', 'Business Manager', 'Experiments (A/B tests)', 'Instagram and Reels ads', 'Messenger ads'] },
  { icon: 'chart', title: 'Tracking and reporting', items: ['Meta Pixel', 'Conversions API', 'Events Manager', 'Google Analytics 4', 'Google Tag Manager', 'Looker Studio', 'Google Sheets'] },
  { icon: 'image', title: 'Creative', items: ['Meta Ads Library (research)', 'Canva', 'CapCut', 'UGC creator briefs', 'Advantage+ creative', 'ChatGPT and Claude for hook ideas'] },
  { icon: 'layers', title: 'Funnels and CRM', items: ['GoHighLevel', 'Landing pages', 'Shopify', 'Zapier'] },
]
