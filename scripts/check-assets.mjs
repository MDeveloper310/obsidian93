import { existsSync, readdirSync } from 'node:fs'
import { CHART, HERO_POSTER, HERO_VIDEO, LINES, PHOTOS, TURN_SHEET, TURNS, photosFor } from '../src/catalog.js'

const missing = []
const need = (rel) => {
  const path = `public/media/${rel}`
  if (!existsSync(path)) missing.push(path)
}

need(HERO_VIDEO)
need(HERO_POSTER)
for (const stale of [
  'obsidian93-hype.mp4',
  'obsidian93-hype-v2.mp4',
  'obsidian93-hype-vhs.mp4',
  'obsidian93-hype-lounge.mp4',
  'obsidian93-hype-lounge-v2.mp4',
  'obsidian93-hype-dream.mp4',
  'obsidian93-hype-tmz.mp4',
]) {
  if (existsSync(`public/media/${stale}`)) missing.push(`unexpected earlier hero video public/media/${stale}`)
}

const referenced = new Set()
for (const photo of PHOTOS) {
  need(`img/${photo.file}`)
  referenced.add(photo.file)
}
for (const turn of TURNS) {
  need(`img/${turn.file}`)
  referenced.add(turn.file)
}
need(`img/${TURN_SHEET.file}`)
referenced.add(TURN_SHEET.file)
need(`img/${CHART.file}`)
referenced.add(CHART.file)

for (const file of readdirSync('public/media/img')) {
  if (!referenced.has(file)) missing.push(`unreferenced public/media/img/${file}`)
}

const mensNames = ['Black', 'Steel Grey', 'Bone / Cream', 'Charcoal', 'Deep Navy', 'Oxblood', 'Chocolate', 'Olive', 'Slate Blue', 'Black-on-Black']
const womensNames = ['Black', 'Steel Grey', 'Dusty Ballet Pink', 'Bone / Cream', 'Lilac', 'Chocolate', 'Cherry Red', 'Sage', 'Baby Blue', 'Ivory Iridescent']

if (LINES.mens.colors.map((c) => c.name).join('|') !== mensNames.join('|')) missing.push('mens color order')
if (LINES.womens.colors.map((c) => c.name).join('|') !== womensNames.join('|')) missing.push('womens color order')

const pink = LINES.womens.colors.find((c) => c.id === 'pink')
if (!pink || pink.fleece.toLowerCase() !== '#c9a2a6') missing.push('pink hex')
if (!LINES.mens.colors.find((c) => c.id === 'bob')?.limited) missing.push('black-on-black limited')
if (!LINES.womens.colors.find((c) => c.id === 'ivory')?.limited) missing.push('ivory limited')

for (const id of ['pink', 'lilac', 'baby']) {
  if (LINES.mens.colors.some((c) => c.id === id)) missing.push(`mens should not include ${id}`)
}

const tokens = [
  ['black-on-black', 'bob'],
  ['dusty-pink', 'pink'],
  ['steel-grey', 'steel'],
  ['bone-cream', 'bone'],
  ['deep-navy', 'navy'],
  ['slate-blue', 'slate'],
  ['baby-blue', 'baby'],
  ['ivory-iridescent', 'ivory'],
  ['ivory', 'ivory'],
  ['charcoal', 'charcoal'],
  ['chocolate', 'chocolate'],
  ['oxblood', 'oxblood'],
  ['cherry', 'cherry'],
  ['navy', 'navy'],
  ['olive', 'olive'],
  ['lilac', 'lilac'],
  ['sage', 'sage'],
  ['black', 'black'],
  ['bone', 'bone'],
]

function filenameColors(file) {
  let name = file.replace(/^tracksuits-(mens|womens)-/, '').replace(/\.jpe?g$/, '')
  const ids = []
  for (const [token, id] of tokens) {
    if (name.includes(token)) {
      ids.push(id)
      name = name.split(token).join(' ')
    }
  }
  return ids
}

for (const photo of PHOTOS) {
  const palette = new Set(LINES[photo.line].colors.map((c) => c.id))
  const expected = filenameColors(photo.file).filter((id) => palette.has(id))
  const got = [...photo.colors].sort().join(',')
  const want = [...new Set(expected)].sort().join(',')
  if (got !== want) missing.push(`${photo.file} colors ${got} != ${want}`)
}

for (const [line, def] of Object.entries(LINES)) {
  const all = photosFor(line, 'all')
  if (all.length !== 19) missing.push(`${line} photo count ${all.length}`)
  for (const color of def.colors) {
    if (photosFor(line, color.id).length === 0) missing.push(`no frames for ${line}/${color.id}`)
  }
}

if (missing.length) {
  console.error(missing.join('\n'))
  process.exit(1)
}

console.log(`ok ${PHOTOS.length} stills, ${TURNS.length} angles, hero ${HERO_VIDEO}`)
