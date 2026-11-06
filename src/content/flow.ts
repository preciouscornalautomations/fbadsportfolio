import type { IconName } from '../components/Icon'

/** The animated hero diagram. The last step is styled as the "win" (green). */
export const flowSteps: { icon: IconName; title: string; caption: string }[] = [
  { icon: 'target', title: 'Right audience', caption: 'Ad shown' },
  { icon: 'image', title: 'Ad clicked', caption: 'Hook lands' },
  { icon: 'doc', title: 'Form filled', caption: 'Lead captured' },
  { icon: 'chart', title: 'Tracked', caption: 'Pixel + CAPI' },
  { icon: 'trophy', title: 'Customer', caption: 'Booked or bought' },
]
