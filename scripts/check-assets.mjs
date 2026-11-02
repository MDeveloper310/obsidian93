import { existsSync, readdirSync } from 'node:fs'
import { COLORS, HERO_SHOTS, HERO_POSTER, HERO_VIDEO, LOOKS, TURNS, TURN_SHEET } from '../src/catalog.js'
const bad = []
const need = (p) => existsSync('public/media/' + p) || bad.push('missing ' + p)
need(HERO_VIDEO); need(HERO_POSTER); need('img/' + TURN_SHEET)
const ref = new Set([TURN_SHEET])
for (const l of LOOKS) { need('img/' + l.file); ref.add(l.file) }
for (const t of TURNS) { need('img/' + t.file); ref.add(t.file) }
for (const line of Object.values(HERO_SHOTS)) for (const f of Object.values(line)) { need('img/' + f); ref.add(f) }
for (const f of readdirSync('public/media/img')) if (!ref.has(f)) bad.push('unreferenced ' + f)
if (COLORS.length !== 5) bad.push('need 5 colors')
if (HERO_SHOTS.mens.pink) bad.push('pink is womens only')
if (bad.length) { console.error(bad.join('\n')); process.exit(1) }
console.log('ok', LOOKS.length, 'looks')
