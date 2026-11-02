/** Colorways in drop order. Hexes follow the swatch chart; dusty ballet pink is #C9A2A6. */

export const LINES = {
  mens: {
    label: "Men's",
    colors: [
      { id: 'black', name: 'Black', fleece: '#0d0d0d', crystal: '#c5c8ce', crystalName: 'Silver' },
      { id: 'steel', name: 'Steel Grey', fleece: '#6e7378', crystal: '#d5d7dc', crystalName: 'Silver' },
      { id: 'bone', name: 'Bone / Cream', fleece: '#e8e0cf', crystal: '#f4f5f7', crystalName: 'Clear silver' },
      { id: 'charcoal', name: 'Charcoal', fleece: '#2f3133', crystal: '#c5c8ce', crystalName: 'Silver' },
      { id: 'navy', name: 'Deep Navy', fleece: '#1b2340', crystal: '#c5c8ce', crystalName: 'Silver' },
      { id: 'oxblood', name: 'Oxblood', fleece: '#5a1a22', crystal: '#c5c8ce', crystalName: 'Silver' },
      { id: 'chocolate', name: 'Chocolate', fleece: '#4a3022', crystal: '#c6a15b', crystalName: 'Champagne' },
      { id: 'olive', name: 'Olive', fleece: '#565b3a', crystal: '#6a6e66', crystalName: 'Tonal smoke' },
      { id: 'slate', name: 'Slate Blue', fleece: '#5c6b80', crystal: '#c5c8ce', crystalName: 'Silver' },
      { id: 'bob', name: 'Black-on-Black', fleece: '#0a0a0a', crystal: '#3a3a3a', crystalName: 'Jet hematite', limited: true },
    ],
  },
  womens: {
    label: "Women's",
    colors: [
      { id: 'black', name: 'Black', fleece: '#0d0d0d', crystal: '#c5c8ce', crystalName: 'Silver' },
      { id: 'steel', name: 'Steel Grey', fleece: '#6e7378', crystal: '#d5d7dc', crystalName: 'Silver' },
      { id: 'pink', name: 'Dusty Ballet Pink', fleece: '#C9A2A6', crystal: '#c5c8ce', crystalName: 'Silver' },
      { id: 'bone', name: 'Bone / Cream', fleece: '#e8e0cf', crystal: '#f4f5f7', crystalName: 'Clear silver' },
      { id: 'lilac', name: 'Lilac', fleece: '#b9a6cf', crystal: '#d7c6ea', crystalName: 'Iridescent AB', iridescent: true },
      { id: 'chocolate', name: 'Chocolate', fleece: '#4a3022', crystal: '#c6a15b', crystalName: 'Champagne' },
      { id: 'cherry', name: 'Cherry Red', fleece: '#8e1b24', crystal: '#c5c8ce', crystalName: 'Silver' },
      { id: 'sage', name: 'Sage', fleece: '#9caf94', crystal: '#c5c8ce', crystalName: 'Silver' },
      { id: 'baby', name: 'Baby Blue', fleece: '#b5cbe0', crystal: '#c5c8ce', crystalName: 'Silver' },
      { id: 'ivory', name: 'Ivory Iridescent', fleece: '#f3eee3', crystal: '#d7c6ea', crystalName: 'Iridescent AB', limited: true, iridescent: true },
    ],
  },
}

/**
 * Lookbook stills. `colors` are the filename tokens that belong to that line.
 * Shared frames (couples, groups) are filed under both lines; a women's-only
 * color on a men's filename does not appear as a men's swatch, and the reverse.
 */
export const PHOTOS = [
  shot('mens', 'tracksuits-mens-m-charcoal-studio.jpg', ['charcoal'], 'portrait', 864, 1152, 'Studio', 'Charcoal crystal fleece tracksuit, studio, men’s line.'),
  shot('mens', 'tracksuits-mens-m-deep-navy-studio.jpg', ['navy'], 'portrait', 864, 1152, 'Studio', 'Deep Navy crystal fleece tracksuit, studio, men’s line.'),
  shot('mens', 'tracksuits-mens-m-slate-blue-studio.jpg', ['slate'], 'portrait', 864, 1152, 'Studio', 'Slate Blue crystal fleece tracksuit, studio, men’s line.'),
  shot('mens', 'tracksuits-mens-m-oxblood-back-painted-ladies.jpg', ['oxblood'], 'portrait', 864, 1152, 'Painted Ladies', 'Oxblood crystal fleece tracksuit, back view, Painted Ladies.'),
  shot('mens', 'tracksuits-mens-m-steel-grey-sf-hill.jpg', ['steel'], 'portrait', 864, 1152, 'SF Hill', 'Steel Grey crystal fleece tracksuit on a San Francisco hill.'),
  shot('mens', 'tracksuits-mens-couple-black-back-night.jpg', ['black'], 'landscape', 1152, 864, 'Night', 'Black crystal fleece tracksuit, night, couple.'),
  shot('mens', 'tracksuits-mens-couple-dusty-pink-charcoal-cable-car.jpg', ['charcoal'], 'landscape', 1152, 864, 'Cable car', 'Charcoal crystal fleece tracksuit with Dusty Ballet Pink, cable car.'),
  shot('mens', 'tracksuits-mens-m-black-on-black-studio.jpg', ['bob'], 'portrait', 864, 1152, 'Studio', 'Black-on-Black limited crystal fleece tracksuit, studio.'),
  shot('mens', 'tracksuits-mens-m-chocolate-la-rooftop.jpg', ['chocolate'], 'portrait', 864, 1152, 'LA rooftop', 'Chocolate crystal fleece tracksuit on an LA rooftop.'),
  shot('mens', 'tracksuits-mens-m-olive-mission-street.jpg', ['olive'], 'portrait', 864, 1152, 'Mission Street', 'Olive crystal fleece tracksuit on Mission Street.'),
  shot('mens', 'tracksuits-mens-group-ivory-cherry-oxblood-navy-sf-steps.jpg', ['oxblood', 'navy'], 'landscape', 1152, 864, 'SF steps', 'Oxblood and Deep Navy crystal fleece tracksuits on SF steps.'),
  shot('mens', 'tracksuits-mens-m-deep-navy-back-cable-car.jpg', ['navy'], 'portrait', 864, 1152, 'Cable car', 'Deep Navy crystal fleece tracksuit, back view, cable car.'),
  shot('mens', 'tracksuits-mens-m-bone-cream-back-la-rooftop.jpg', ['bone'], 'portrait', 864, 1152, 'LA rooftop', 'Bone / Cream crystal fleece tracksuit, back view, LA rooftop.'),
  shot('mens', 'tracksuits-mens-group-sage-olive-bone-chocolate-studio.jpg', ['olive', 'bone', 'chocolate'], 'landscape', 1152, 864, 'Studio', 'Olive, Bone / Cream, and Chocolate crystal fleece tracksuits, studio group.'),
  shot('mens', 'tracksuits-mens-couple-lilac-slate-blue-la-rooftop.jpg', ['slate'], 'landscape', 1152, 864, 'LA rooftop', 'Slate Blue crystal fleece tracksuit with Lilac, LA rooftop.'),
  shot('mens', 'tracksuits-mens-couple-steel-grey-painted-ladies.jpg', ['steel'], 'landscape', 1152, 864, 'Painted Ladies', 'Steel Grey crystal fleece tracksuit, Painted Ladies.'),
  shot('mens', 'tracksuits-mens-m-black-detail.jpg', ['black'], 'landscape', 1152, 864, 'Detail', 'Black crystal fleece detail, silver fracture and OBSIDIAN 93 mark.'),
  shot('mens', 'tracksuits-mens-m-black-on-black-back-night.jpg', ['bob'], 'portrait', 864, 1152, 'Night', 'Black-on-Black limited crystal fleece tracksuit, night.'),
  shot('mens', 'tracksuits-mens-m-black-back-studio.jpg', ['black'], 'portrait', 864, 1152, 'Studio', 'Black crystal fleece tracksuit, back studio view.'),

  shot('womens', 'tracksuits-womens-couple-black-back-night.jpg', ['black'], 'landscape', 1152, 864, 'Night', 'Black crystal fleece tracksuit, night, couple.'),
  shot('womens', 'tracksuits-womens-group-ivory-cherry-oxblood-navy-sf-steps.jpg', ['ivory', 'cherry'], 'landscape', 1152, 864, 'SF steps', 'Ivory Iridescent and Cherry Red crystal fleece tracksuits on SF steps.'),
  shot('womens', 'tracksuits-womens-w-ivory-iridescent-studio.jpg', ['ivory'], 'portrait', 864, 1152, 'Studio', 'Ivory Iridescent limited crystal fleece tracksuit, studio.'),
  shot('womens', 'tracksuits-womens-w-steel-grey-back-studio.jpg', ['steel'], 'portrait', 864, 1152, 'Studio', 'Steel Grey crystal fleece tracksuit, back studio view, women’s line.'),
  shot('womens', 'tracksuits-womens-w-cherry-red-back-night.jpg', ['cherry'], 'portrait', 864, 1152, 'Night', 'Cherry Red crystal fleece tracksuit, night.'),
  shot('womens', 'tracksuits-womens-w-dusty-pink-detail.jpg', ['pink'], 'landscape', 1152, 864, 'Detail', 'Dusty Ballet Pink crystal fleece detail.'),
  shot('womens', 'tracksuits-womens-couple-dusty-pink-charcoal-cable-car.jpg', ['pink'], 'landscape', 1152, 864, 'Cable car', 'Dusty Ballet Pink crystal fleece tracksuit, cable car.'),
  shot('womens', 'tracksuits-womens-w-black-back-painted-ladies.jpg', ['black'], 'portrait', 864, 1152, 'Painted Ladies', 'Black crystal fleece tracksuit, back view, Painted Ladies.'),
  shot('womens', 'tracksuits-womens-w-chocolate-back-la-rooftop.jpg', ['chocolate'], 'portrait', 864, 1152, 'LA rooftop', 'Chocolate crystal fleece tracksuit, back view, LA rooftop.'),
  shot('womens', 'tracksuits-womens-group-sage-olive-bone-chocolate-studio.jpg', ['sage', 'bone', 'chocolate'], 'landscape', 1152, 864, 'Studio', 'Sage, Bone / Cream, and Chocolate crystal fleece tracksuits, studio group.'),
  shot('womens', 'tracksuits-womens-w-dusty-pink-studio.jpg', ['pink'], 'portrait', 864, 1152, 'Studio', 'Dusty Ballet Pink crystal fleece tracksuit, studio.'),
  shot('womens', 'tracksuits-womens-w-dusty-pink-back-studio.jpg', ['pink'], 'portrait', 864, 1152, 'Studio', 'Dusty Ballet Pink crystal fleece tracksuit, back studio view.'),
  shot('womens', 'tracksuits-womens-w-lilac-back-la-rooftop.jpg', ['lilac'], 'portrait', 864, 1152, 'LA rooftop', 'Lilac crystal fleece tracksuit, back view, LA rooftop.'),
  shot('womens', 'tracksuits-womens-couple-lilac-slate-blue-la-rooftop.jpg', ['lilac'], 'landscape', 1152, 864, 'LA rooftop', 'Lilac crystal fleece tracksuit with Slate Blue, LA rooftop.'),
  shot('womens', 'tracksuits-womens-couple-steel-grey-painted-ladies.jpg', ['steel'], 'landscape', 1152, 864, 'Painted Ladies', 'Steel Grey crystal fleece tracksuit, Painted Ladies.'),
  shot('womens', 'tracksuits-womens-w-dusty-pink-sf-hill.jpg', ['pink'], 'portrait', 864, 1152, 'SF Hill', 'Dusty Ballet Pink crystal fleece tracksuit on a San Francisco hill.'),
  shot('womens', 'tracksuits-womens-w-sage-cable-car.jpg', ['sage'], 'portrait', 864, 1152, 'Cable car', 'Sage crystal fleece tracksuit, cable car.'),
  shot('womens', 'tracksuits-womens-w-bone-cream-studio.jpg', ['bone'], 'portrait', 864, 1152, 'Studio', 'Bone / Cream crystal fleece tracksuit, studio, women’s line.'),
  shot('womens', 'tracksuits-womens-w-baby-blue-studio.jpg', ['baby'], 'portrait', 864, 1152, 'Studio', 'Baby Blue crystal fleece tracksuit, studio.'),
]

export const TURNS = [
  { id: 'front', file: 'mockups-v6-turnaround-front.jpg', label: 'Front', deg: 0, w: 864, h: 1152, alt: 'Crystal fleece tracksuit, front view.' },
  { id: 'right', file: 'mockups-v6-turnaround-right.jpg', label: 'Right', deg: 90, w: 864, h: 1152, alt: 'Crystal fleece tracksuit, right side.' },
  { id: 'back', file: 'mockups-v6-turnaround-back.jpg', label: 'Back', deg: 180, w: 864, h: 1152, alt: 'Crystal fleece tracksuit, back view with OBSIDIAN 93 crystal mark.' },
  { id: 'left', file: 'mockups-v6-turnaround-left.jpg', label: 'Left', deg: 270, w: 864, h: 1152, alt: 'Crystal fleece tracksuit, left side.' },
]

export const TURN_SHEET = {
  file: 'mockups-v6-turnaround-turnaround-sheet.jpg',
  w: 1400,
  h: 467,
  alt: 'Contact sheet of the crystal fleece tracksuit, front, back, and both sides.',
}

export const CHART = {
  file: 'colorway-swatch-chart.png',
  w: 1500,
  h: 900,
  alt: 'OBSIDIAN 93 crystal tracksuit colorway chart. Large square is the fleece, small square is the crystal.',
}

export const HERO_VIDEO = 'obsidian93-hype-club-dark-v5.mp4'
export const HERO_POSTER = 'hero-poster.jpg'

/** 10:00 PT, Friday 20 Nov 2026. November is Pacific Standard Time (UTC−8). */
export const DROP_AT = Date.parse('2026-11-20T18:00:00.000Z')

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export function colorById(line, id) {
  return LINES[line].colors.find((color) => color.id === id) || null
}

export function photosFor(line, colorId) {
  return PHOTOS.filter((photo) => photo.line === line && (colorId === 'all' || photo.colors.includes(colorId)))
}

function shot(line, file, colors, orient, w, h, place, alt) {
  const colorNames = colors.map((id) => {
    const color = colorById(line, id)
    return color ? color.name : id
  })
  return {
    id: file.replace(/\.jpg$/, ''),
    file,
    line,
    colors,
    orient,
    w,
    h,
    place,
    title: colorNames.join(' · '),
    alt,
  }
}
