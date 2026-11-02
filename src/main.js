import '@fontsource/schibsted-grotesk/500.css'
import '@fontsource/schibsted-grotesk/700.css'
import '@fontsource/schibsted-grotesk/800.css'
import '@fontsource/schibsted-grotesk/900.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import './styles.css'
import {
  CHART,
  DROP_AT,
  LINES,
  PHOTOS,
  SIZES,
  TURN_SHEET,
  TURNS,
  colorById,
  photosFor,
} from './catalog.js'

const BASE = import.meta.env.BASE_URL
const media = (file) => `${BASE}media/${file}`
const still = (file) => `${BASE}media/img/${file}`

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches

const state = {
  line: 'mens',
  color: 'all',
  turn: 0,
  spinning: false,
  formDirty: false,
  lb: null,
  opener: null,
}

const q = new URLSearchParams(location.search)
if (q.get('line') === 'womens' || q.get('line') === 'mens') state.line = q.get('line')
if (q.get('color') && (q.get('color') === 'all' || colorById(state.line, q.get('color')))) {
  state.color = q.get('color')
}

const $ = (id) => document.getElementById(id)

function lineLabel(line) {
  return LINES[line].label
}

function shotFromPhoto(photo) {
  return {
    src: still(photo.file),
    alt: photo.alt,
    title: photo.title,
    meta: `${lineLabel(photo.line)} · ${photo.place}`,
    w: photo.w,
    h: photo.h,
  }
}

function archive() {
  const items = PHOTOS.map(shotFromPhoto)
  for (const turn of TURNS) {
    items.push({
      src: still(turn.file),
      alt: turn.alt,
      title: turn.label,
      meta: `Turnaround · ${turn.deg}°`,
      w: turn.w,
      h: turn.h,
    })
  }
  items.push({
    src: still(TURN_SHEET.file),
    alt: TURN_SHEET.alt,
    title: 'Contact sheet',
    meta: 'Turnaround',
    w: TURN_SHEET.w,
    h: TURN_SHEET.h,
  })
  items.push({
    src: still(CHART.file),
    alt: CHART.alt,
    title: 'Colorway chart',
    meta: 'Fleece square · crystal square',
    w: CHART.w,
    h: CHART.h,
  })
  return items
}

function writeQuery() {
  const url = new URL(location.href)
  url.searchParams.set('line', state.line)
  url.searchParams.set('color', state.color)
  history.replaceState(null, '', url)
}

function flash() {
  if (reduce) return
  const fx = $('fx')
  fx.classList.remove('go')
  void fx.offsetWidth
  fx.classList.add('go')
}

let booted = false

function renderLines() {
  const root = $('lines')
  root.replaceChildren()
  for (const key of ['mens', 'womens']) {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.role = 'radio'
    btn.dataset.line = key
    btn.textContent = LINES[key].label
    btn.setAttribute('aria-checked', String(state.line === key))
    btn.addEventListener('click', () => {
      if (state.line === key) return
      state.line = key
      if (state.color !== 'all' && !colorById(state.line, state.color)) state.color = 'all'
      commitFilter()
    })
    root.append(btn)
  }
}

function renderSwatches() {
  const root = $('swatches')
  root.replaceChildren()
  const colors = [{ id: 'all', name: 'All colorways' }, ...LINES[state.line].colors]
  for (const color of colors) {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = color.id === 'all' ? 'swatch all' : 'swatch'
    btn.dataset.color = color.id
    btn.title = color.name
    btn.setAttribute('aria-label', color.name)
    btn.setAttribute('aria-pressed', String(state.color === color.id))
    if (color.id === 'all') {
      btn.innerHTML = '<span class="fleece"></span><span class="all-mark">All</span>'
    } else {
      const fleece = document.createElement('span')
      fleece.className = 'fleece'
      fleece.style.background = color.fleece
      const gem = document.createElement('span')
      gem.className = color.iridescent ? 'gem iri' : 'gem'
      gem.style.background = color.crystal
      btn.append(fleece, gem)
      if (color.limited) {
        const ltd = document.createElement('span')
        ltd.className = 'ltd'
        ltd.textContent = 'LTD'
        btn.append(ltd)
      }
    }
    btn.addEventListener('click', () => {
      if (state.color === color.id) return
      state.color = color.id
      commitFilter()
    })
    root.append(btn)
  }
}

function renderReadout() {
  const color = state.color === 'all' ? null : colorById(state.line, state.color)
  const count = photosFor(state.line, state.color).length
  const box = $('readout')
  if (!color) {
    box.innerHTML = `<p class="read-name">${lineLabel(state.line)}</p><p class="read-meta">Every colorway on this line · ${count} frames</p>`
    return
  }
  const notes = []
  if (color.limited) notes.push('Limited')
  if (['pink', 'lilac', 'baby'].includes(color.id)) notes.push("Women's only")
  box.innerHTML = `
    <p class="read-name">${color.name}</p>
    <p class="read-meta">Fleece ${color.fleece} · Crystal ${color.crystalName}</p>
    <p class="read-meta">${notes.join(' · ') || lineLabel(state.line)} · ${count} ${count === 1 ? 'frame' : 'frames'}</p>
  `
}

function bindImage(img) {
  const done = () => img.classList.add('is-in')
  if (img.complete && img.naturalWidth) done()
  else img.addEventListener('load', done, { once: true })
  img.addEventListener(
    'error',
    () => {
      img.closest('.frame')?.classList.add('is-broken')
    },
    { once: true },
  )
}

function renderGrid() {
  const photos = photosFor(state.line, state.color)
  const grid = $('grid')
  const empty = $('empty')
  $('count').textContent = `${String(photos.length).padStart(2, '0')} frames · ${lineLabel(state.line)}`
  grid.replaceChildren()
  empty.hidden = photos.length !== 0
  const frag = document.createDocumentFragment()
  photos.forEach((photo, index) => {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = `tile ${photo.orient === 'landscape' ? 'land' : 'port'}`
    btn.style.animationDelay = reduce ? '0ms' : `${Math.min(index, 8) * 40}ms`
    btn.innerHTML = `
      <span class="frame">
        <img alt="${escapeAttr(photo.alt)}" width="${photo.w}" height="${photo.h}" decoding="async" ${index < 2 ? 'loading="eager"' : 'loading="lazy"'}>
      </span>
      <span class="tile-meta">
        <span>${String(index + 1).padStart(2, '0')}</span>
        <span>${escapeHtml(photo.title)}</span>
        <span>${escapeHtml(photo.place)}</span>
      </span>
    `
    const img = btn.querySelector('img')
    img.src = still(photo.file)
    bindImage(img)
    btn.addEventListener('click', () => openLightbox(photos.map(shotFromPhoto), index, btn))
    frag.append(btn)
  })
  grid.append(frag)
  if (booted && !reduce) grid.classList.add('hit')
}

function commitFilter() {
  writeQuery()
  renderLines()
  renderSwatches()
  renderReadout()
  renderGrid()
  if (!state.formDirty) syncForm()
  if (booted) flash()
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch])
}

function escapeAttr(value) {
  return escapeHtml(value)
}

function openLightbox(items, index, opener) {
  state.lb = { items, index }
  state.opener = opener || document.activeElement
  paintLightbox()
  const dialog = $('lightbox')
  if (!dialog.open) dialog.showModal()
  $('lb-close').focus()
}

function paintLightbox() {
  const { items, index } = state.lb
  const item = items[index]
  const img = $('lb-img')
  img.src = item.src
  img.alt = item.alt
  img.width = item.w
  img.height = item.h
  $('lb-title').textContent = item.title
  $('lb-meta').textContent = `${String(index + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')} · ${item.meta}`
}

function stepLightbox(dir) {
  if (!state.lb) return
  const { items } = state.lb
  state.lb.index = (state.lb.index + dir + items.length) % items.length
  paintLightbox()
}

function expandArchive() {
  if (!state.lb) return
  const current = state.lb.items[state.lb.index].src
  const items = archive()
  const index = Math.max(0, items.findIndex((item) => item.src === current))
  state.lb = { items, index }
  paintLightbox()
}

function renderAngles() {
  const root = $('angles')
  root.replaceChildren()
  TURNS.forEach((turn, index) => {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.role = 'tab'
    btn.setAttribute('aria-selected', String(index === state.turn))
    btn.textContent = turn.label
    btn.addEventListener('click', () => setTurn(index))
    root.append(btn)
  })
}

function setTurn(index, opts = {}) {
  state.turn = (index + TURNS.length) % TURNS.length
  const turn = TURNS[state.turn]
  const img = $('turn-img')
  img.src = still(turn.file)
  img.alt = turn.alt
  $('turn-read').textContent = `${turn.label} · ${turn.deg}°`
  renderAngles()
  if (!opts.silent && !reduce) {
    img.classList.remove('flash')
    void img.offsetWidth
    img.classList.add('flash')
  }
}

let spinTimer = 0
function setSpin(on) {
  state.spinning = on
  $('spin').setAttribute('aria-pressed', String(on))
  $('spin').textContent = on ? 'Stop' : 'Spin'
  clearInterval(spinTimer)
  if (on) spinTimer = setInterval(() => setTurn(state.turn + 1), 1100)
}

function fillSelect(select, options, value) {
  select.replaceChildren()
  for (const option of options) {
    const el = document.createElement('option')
    el.value = option.value
    el.textContent = option.label
    select.append(el)
  }
  select.value = value
}

function syncForm() {
  const form = $('waitlist')
  if (!form || form.hidden) return
  fillSelect(
    form.line,
    [
      { value: 'mens', label: "Men's" },
      { value: 'womens', label: "Women's" },
    ],
    state.line,
  )
  const colors = LINES[form.line.value].colors
  const preferred = colors.some((color) => color.id === state.color) ? state.color : colors[0].id
  fillSelect(
    form.color,
    colors.map((color) => ({ value: color.id, label: color.limited ? `${color.name} · LTD` : color.name })),
    preferred,
  )
  if (!form.size.value) {
    fillSelect(
      form.size,
      SIZES.map((size) => ({ value: size, label: size })),
      'M',
    )
  }
}

function pad(n) {
  return String(n).padStart(2, '0')
}

const clockUnits = { dd: '', hh: '', mm: '', ss: '' }
function paintClock() {
  const diff = DROP_AT - Date.now()
  const note = $('drop-note')
  if (diff <= 0) {
    for (const key of Object.keys(clockUnits)) $(key).textContent = '00'
    note.textContent = 'Drop is open. The list still takes names for the next pass.'
    $('clock').classList.add('live')
    return
  }
  const total = Math.floor(diff / 1000)
  const next = {
    dd: pad(Math.floor(total / 86400)),
    hh: pad(Math.floor((total % 86400) / 3600)),
    mm: pad(Math.floor((total % 3600) / 60)),
    ss: pad(total % 60),
  }
  for (const key of Object.keys(next)) {
    const el = $(key)
    if (clockUnits[key] !== next[key]) {
      el.textContent = next[key]
      if (clockUnits[key] && !reduce) {
        el.classList.remove('tick')
        void el.offsetWidth
        el.classList.add('tick')
      }
      clockUnits[key] = next[key]
    }
  }
  note.textContent = 'The list hears first.'
}

function popFilmFlash() {
  if (reduce) return
  const el = $('film-flash')
  el.classList.remove('pop')
  void el.offsetWidth
  el.classList.add('pop')
}

function setupFilm() {
  const video = $('hero-video')
  const sound = $('sound')
  const play = $('play-still')
  let last = 0

  const paintSound = () => {
    const on = !video.muted
    sound.setAttribute('aria-pressed', String(on))
    sound.textContent = on ? 'Sound on' : 'Sound off'
  }

  sound.addEventListener('click', async () => {
    if (video.muted) {
      video.muted = false
      video.volume = 0.9
      paintSound()
      try {
        await video.play()
      } catch {
        video.muted = true
        paintSound()
      }
    } else {
      video.muted = true
      paintSound()
    }
    play.hidden = !video.paused
  })

  play.addEventListener('click', async () => {
    try {
      await video.play()
      play.hidden = true
    } catch {
      play.hidden = false
    }
  })

  video.addEventListener('timeupdate', () => {
    if (video.currentTime + 0.35 < last) popFilmFlash()
    last = video.currentTime
  })

  video.addEventListener('playing', () => {
    play.hidden = true
  })

  const start = video.play()
  if (start) {
    start
      .then(() => popFilmFlash())
      .catch(() => {
        play.hidden = false
      })
  }

  const gate = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {})
      else video.pause()
    },
    { threshold: 0.25 },
  )
  gate.observe(video)
}

function setupTurn() {
  setTurn(0, { silent: true })
  $('turn-prev').addEventListener('click', () => {
    setSpin(false)
    setTurn(state.turn - 1)
  })
  $('turn-next').addEventListener('click', () => {
    setSpin(false)
    setTurn(state.turn + 1)
  })
  $('spin').addEventListener('click', () => setSpin(!state.spinning))
  $('open-sheet').addEventListener('click', () => {
    const items = [
      ...TURNS.map((turn) => ({
        src: still(turn.file),
        alt: turn.alt,
        title: turn.label,
        meta: `Turnaround · ${turn.deg}°`,
        w: turn.w,
        h: turn.h,
      })),
      {
        src: still(TURN_SHEET.file),
        alt: TURN_SHEET.alt,
        title: 'Contact sheet',
        meta: 'Turnaround',
        w: TURN_SHEET.w,
        h: TURN_SHEET.h,
      },
    ]
    openLightbox(items, items.length - 1, $('open-sheet'))
  })

  const stage = $('stage')
  let originX = 0
  let acc = 0
  let dragging = false
  stage.addEventListener('pointerdown', (event) => {
    dragging = true
    originX = event.clientX
    acc = 0
    stage.setPointerCapture(event.pointerId)
    setSpin(false)
  })
  stage.addEventListener('pointermove', (event) => {
    if (!dragging) return
    const dx = event.clientX - originX
    if (Math.abs(dx - acc) < 48) return
    setTurn(state.turn + (dx > acc ? 1 : -1))
    acc = dx
    originX = event.clientX
    acc = 0
  })
  stage.addEventListener('pointerup', () => {
    dragging = false
  })
  stage.addEventListener('pointercancel', () => {
    dragging = false
  })
  stage.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      setSpin(false)
      setTurn(state.turn + 1)
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      setSpin(false)
      setTurn(state.turn - 1)
    }
  })
}

function setupLightbox() {
  const dialog = $('lightbox')
  $('lb-prev').addEventListener('click', () => stepLightbox(-1))
  $('lb-next').addEventListener('click', () => stepLightbox(1))
  $('lb-all').addEventListener('click', expandArchive)
  $('lb-close').addEventListener('click', () => dialog.close())
  $('all-frames').addEventListener('click', () => openLightbox(archive(), 0, $('all-frames')))
  $('open-chart').addEventListener('click', () => {
    const items = archive()
    openLightbox(items, items.length - 1, $('open-chart'))
  })
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close()
  })
  dialog.addEventListener('close', () => {
    state.opener?.focus?.()
  })
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      stepLightbox(1)
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      stepLightbox(-1)
    }
  })
  let swipeX = 0
  $('lb-img').addEventListener('pointerdown', (event) => {
    swipeX = event.clientX
  })
  $('lb-img').addEventListener('pointerup', (event) => {
    const delta = event.clientX - swipeX
    if (delta > 48) stepLightbox(-1)
    if (delta < -48) stepLightbox(1)
  })
}

function setupForm() {
  const form = $('waitlist')
  fillSelect(
    form.size,
    SIZES.map((size) => ({ value: size, label: size })),
    'M',
  )
  syncForm()
  form.line.addEventListener('change', () => {
    state.formDirty = true
    const colors = LINES[form.line.value].colors
    fillSelect(
      form.color,
      colors.map((color) => ({ value: color.id, label: color.limited ? `${color.name} · LTD` : color.name })),
      colors[0].id,
    )
  })
  form.color.addEventListener('change', () => {
    state.formDirty = true
  })
  form.size.addEventListener('change', () => {
    state.formDirty = true
  })
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const error = $('form-error')
    const email = form.email.value.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error.hidden = false
      error.textContent = 'Use a full email so the drop note can find you.'
      form.email.focus()
      return
    }
    if (!form.line.value || !form.color.value || !form.size.value) {
      error.hidden = false
      error.textContent = 'Pick a line, a colorway, and a size.'
      return
    }
    error.hidden = true
    const color = colorById(form.line.value, form.color.value)
    const entry = {
      email,
      line: form.line.value,
      color: form.color.value,
      size: form.size.value,
      at: new Date().toISOString(),
    }
    try {
      const key = 'obsidian93.waitlist'
      const existing = JSON.parse(localStorage.getItem(key) || '[]')
      existing.push(entry)
      localStorage.setItem(key, JSON.stringify(existing))
    } catch {
      /* The confirmation still stands for this session if storage is blocked. */
    }
    form.hidden = true
    const thanks = $('thanks')
    thanks.hidden = false
    thanks.innerHTML = `<p class="kicker">Held</p><h3>You’re on the fault.</h3><p>We’ll write ${escapeHtml(email)} before the drop about ${escapeHtml(color.name)} in ${escapeHtml(form.size.value)}, ${escapeHtml(lineLabel(form.line.value))}.</p>`
  })
}

function setupCursor() {
  if (!fine || reduce) return
  document.body.classList.add('has-cursor')
  const cursor = $('cursor')
  const sparks = []
  const colors = ['#f4f5f7', '#ead8f6', '#d7eefc', '#f3e6c2']
  let frame = 0
  window.addEventListener('pointermove', (event) => {
    const overField = event.target.closest('input, select, textarea')
    cursor.classList.toggle('off', Boolean(overField))
    cursor.classList.add('on')
    cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) rotate(45deg)`
    cursor.classList.toggle('hot', Boolean(event.target.closest('a, button, .stage, summary')))
    frame += 1
    if (frame % 2 === 0 && !overField) {
      const spark = document.createElement('i')
      spark.className = 'spark'
      spark.style.left = `${event.clientX}px`
      spark.style.top = `${event.clientY}px`
      spark.style.background = colors[frame % colors.length]
      document.body.append(spark)
      sparks.push({ el: spark, life: 1 })
    }
  })
  window.addEventListener('pointerdown', () => cursor.classList.add('hot'))
  const tick = () => {
    for (let i = sparks.length - 1; i >= 0; i -= 1) {
      const spark = sparks[i]
      spark.life -= 0.045
      spark.el.style.opacity = String(Math.max(spark.life, 0))
      spark.el.style.transform = `translateY(${(1 - spark.life) * -14}px) rotate(45deg) scale(${spark.life})`
      if (spark.life <= 0) {
        spark.el.remove()
        sparks.splice(i, 1)
      }
    }
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

function setupReveal() {
  const nodes = document.querySelectorAll('.reveal')
  if (reduce) {
    nodes.forEach((node) => node.classList.add('in'))
    return
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('in')
        io.unobserve(entry.target)
      }
    },
    { threshold: 0.18 },
  )
  nodes.forEach((node) => io.observe(node))
}

function setupNav() {
  const nav = $('nav')
  const links = [...nav.querySelectorAll('a[href^="#"]')].filter((link) => link.getAttribute('href') !== '#top')
  const onScroll = () => nav.classList.toggle('is-solid', window.scrollY > 24)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        for (const link of links) {
          link.classList.toggle('is-on', link.getAttribute('href') === `#${entry.target.id}`)
        }
      }
    },
    { rootMargin: '-40% 0px -50% 0px' },
  )
  for (const id of ['look', 'turn', 'drop', 'list']) spy.observe($(id))
}

commitFilter()
setupFilm()
setupTurn()
setupLightbox()
setupForm()
setupCursor()
setupReveal()
setupNav()
paintClock()
setInterval(paintClock, 250)
booted = true
document.body.classList.add('boot')
window.setTimeout(() => document.body.classList.remove('boot'), 1200)
