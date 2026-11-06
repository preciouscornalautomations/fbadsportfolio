import type { IconName } from '../components/Icon'

/** Creative strategy section. Examples use the fictional brand Pawtrail (dog treats). */

export const pillars: { icon: IconName; title: string; text: string; points: string[] }[] = [
  {
    icon: 'bulb',
    title: 'Concepts and angles',
    text: 'Every ad starts with one reason to buy, aimed at one type of customer.',
    points: ['Customer research: reviews, comments, Ads Library', 'Angles by pain, desire, objection and proof', 'One message per ad, never five'],
  },
  {
    icon: 'megaphone',
    title: 'Hooks and messaging',
    text: 'The first 3 seconds and the first line of copy do most of the work.',
    points: ['5 to 10 hooks per winning concept', 'Copy in the customer’s own words', 'Clear offer and one call to action'],
  },
  {
    icon: 'flask',
    title: 'What to test, and when',
    text: 'I test the biggest levers first: concept and offer, then format, then hooks and details.',
    points: ['Images, carousels, short video and UGC-style', 'Offers: discount vs bonus vs free trial', 'One variable at a time, with a clear winner rule'],
  },
  {
    icon: 'refresh',
    title: 'Creative fatigue',
    text: 'I watch for tired ads every week and have fresh concepts ready before results drop.',
    points: ['Frequency above 3 on cold audiences', 'CTR down 20%+ from its first-week level', 'CPA rising while CPM stays flat'],
  },
]

/** Testing roadmap: what gets tested, in what order, and how a winner is picked. */
export const testPlan: { stage: string; variable: string; example: string; measure: string; rule: string }[] = [
  {
    stage: '1',
    variable: 'Concept / angle',
    example: '"He heard the bag" (dog reaction) vs "Read the back of the bag" (ingredients)',
    measure: 'CPA, ROAS',
    rule: 'Winner after 50+ conversions or 2x target CPA spent per ad',
  },
  {
    stage: '2',
    variable: 'Offer',
    example: '50% off first box vs free treat pouch with first order',
    measure: 'CPA, conversion rate',
    rule: 'Keep the offer with the lower CPA at equal or better AOV',
  },
  {
    stage: '3',
    variable: 'Format',
    example: 'UGC-style video vs static image vs carousel',
    measure: 'CTR, CPA, hook rate',
    rule: 'Scale the format that wins CPA, keep the runner-up for variety',
  },
  {
    stage: '4',
    variable: 'Hook (first 3 seconds)',
    example: '"POV: you open the bag" vs "My vet asked what treats I use"',
    measure: 'Hook rate (3s views), CTR',
    rule: 'Swap in new hooks on the winner every 2 to 3 weeks',
  },
  {
    stage: '5',
    variable: 'Copy and headline',
    example: 'Short punchy line vs story-style caption',
    measure: 'CTR, CPC',
    rule: 'Small gains only, so tested last',
  },
]

/** Hook bank example, grouped by angle. */
export const hooks: { angle: string; lines: string[] }[] = [
  { angle: 'Reaction / UGC', lines: ['POV: you open the treat bag and he hears it from upstairs', 'Rating my dog’s reaction to every treat we tried'] },
  { angle: 'Problem', lines: ['I could not even pronounce the ingredients in his old treats', 'Why is corn syrup in a dog treat?'] },
  { angle: 'Proof', lines: ['Chicken. Sweet potato. Coconut oil. That’s the whole list.', 'What our vet said when she read the label'] },
  { angle: 'Offer', lines: ['Your first box is half price, and he already approved', 'Try a month of treats for less than a coffee a week'] },
]

export const visuals = {
  storyboard: {
    image: 'images/creatives/storyboard-ugc.jpg',
    width: 1600,
    height: 790,
    title: 'UGC-style video concept',
    text: 'A 15-second storyboard for a creator or the client’s team to film: hook, problem, proof, offer. Each scene has the shot, on-screen text and voiceover, so the brief is ready to hand over.',
  },
  report: {
    image: 'images/creatives/weekly-report.jpg',
    width: 1600,
    height: 730,
    title: 'Weekly report and recommendations',
    text: 'Every week: spend against budget, CPA, ROAS, CTR and frequency, how each ad is doing, and what I will scale, pause or test next, with the reason.',
  },
}
