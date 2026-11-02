export const FORM_ENDPOINT = 'https://formsubmit.co/ajax/crenshawvisuals@gmail.com'
export const FORM_SUBJECT = 'OBSIDIAN 93 waitlist signup'
export const DROP_AT = new Date('2026-11-20T10:00:00-08:00')
export const HERO_VIDEO = 'obsidian93-hype-club-dark-v5.mp4'
export const HERO_POSTER = 'hero-poster.jpg'
export const PRICES = { jacket: 140, pant: 110, set: 230 }

export const COLORS = [
  { id: 'black', name: 'Black', hex: '#0d0d0d', wash: '#1a1a1d' },
  { id: 'steel', name: 'Steel Grey', hex: '#6e7378', wash: '#3a3e44' },
  { id: 'bone', name: 'Bone', hex: '#e8e0cf', wash: '#4a4538' },
  { id: 'chocolate', name: 'Chocolate', hex: '#4a3022', wash: '#3a2418' },
  { id: 'pink', name: 'Dusty Pink', hex: '#C9A2A6', wash: '#5a3f43', womensOnly: true },
]

const M = 'tracksuits-mens-', W = 'tracksuits-womens-'
export const HERO_SHOTS = {
  mens: { black: M + 'm-black-back-studio.jpg', steel: M + 'm-steel-grey-sf-hill.jpg', bone: M + 'm-bone-cream-back-la-rooftop.jpg', chocolate: M + 'm-chocolate-la-rooftop.jpg' },
  womens: { black: W + 'w-black-back-painted-ladies.jpg', steel: W + 'w-steel-grey-back-studio.jpg', bone: W + 'w-bone-cream-studio.jpg', chocolate: W + 'w-chocolate-back-la-rooftop.jpg', pink: W + 'w-dusty-pink-studio.jpg' },
}

export const LOOKS = [
  ['mens', M + 'm-black-detail.jpg', 'black', 'Detail'],
  ['mens', M + 'couple-black-back-night.jpg', 'black', 'Night'],
  ['mens', M + 'm-steel-grey-sf-hill.jpg', 'steel', 'SF Hill'],
  ['mens', M + 'couple-steel-grey-painted-ladies.jpg', 'steel', 'Painted Ladies'],
  ['mens', M + 'm-bone-cream-back-la-rooftop.jpg', 'bone', 'LA Rooftop'],
  ['mens', M + 'm-chocolate-la-rooftop.jpg', 'chocolate', 'LA Rooftop'],
  ['mens', M + 'm-black-back-studio.jpg', 'black', 'Studio'],
  ['womens', W + 'w-dusty-pink-studio.jpg', 'pink', 'Studio'],
  ['womens', W + 'couple-black-back-night.jpg', 'black', 'Night'],
  ['womens', W + 'w-dusty-pink-sf-hill.jpg', 'pink', 'SF Hill'],
  ['womens', W + 'w-steel-grey-back-studio.jpg', 'steel', 'Studio'],
  ['womens', W + 'w-bone-cream-studio.jpg', 'bone', 'Studio'],
  ['womens', W + 'w-chocolate-back-la-rooftop.jpg', 'chocolate', 'LA Rooftop'],
  ['womens', W + 'w-dusty-pink-detail.jpg', 'pink', 'Detail'],
  ['womens', W + 'couple-steel-grey-painted-ladies.jpg', 'steel', 'Painted Ladies'],
  ['womens', W + 'w-black-back-painted-ladies.jpg', 'black', 'Painted Ladies'],
  ['womens', W + 'w-dusty-pink-back-studio.jpg', 'pink', 'Studio'],
].map(([line, file, color, place]) => ({ line, file, color, place }))

export const TURNS = ['front', 'right', 'back', 'left'].map((id) => ({ id, file: `mockups-v6-turnaround-${id}.jpg` }))
export const TURN_SHEET = 'mockups-v6-turnaround-turnaround-sheet.jpg'
