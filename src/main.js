import '@fontsource/schibsted-grotesk/500.css'
import '@fontsource/schibsted-grotesk/800.css'
import '@fontsource/schibsted-grotesk/900.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import './styles.css'
import { COLORS, DROP_AT, FORM_ENDPOINT, FORM_SUBJECT, HERO_SHOTS, LOOKS, PRICES, TURNS } from './catalog.js'

const BASE = import.meta.env.BASE_URL
const img = (f) => `${BASE}media/img/${f}`
const $ = (s, r = document) => r.querySelector(s)
const $$ = (s, r = document) => [...r.querySelectorAll(s)]
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches
const money = (n) => `$${n}`
const state = { line: 'mens', color: 'black', piece: 'set' }
const LABEL = { mens: "Men's", womens: "Women's" }
const colorsFor = (line) => COLORS.filter((c) => line === 'womens' || !c.womensOnly)
const pieces = (line) => [
  { id: 'jacket', name: line === 'womens' ? 'Cropped zip jacket' : 'Zip jacket', price: PRICES.jacket },
  { id: 'pant', name: 'Wide pant', price: PRICES.pant },
  { id: 'set', name: 'Full set', price: PRICES.set, note: 'Jacket + pant' },
]

/* ---------- color lab ---------- */
let front = $('#stage-a'), back = $('#stage-b')
function swapStage() {
  const f = HERO_SHOTS[state.line][state.color]
  const c = COLORS.find((x) => x.id === state.color)
  const alt = `${c.name} crystal fleece tracksuit, ${LABEL[state.line]} line`
  if (front.dataset.f === f) return
  back.onload = () => {
    back.classList.add('is-on'); front.classList.remove('is-on');
    [front, back] = [back, front]
  }
  back.alt = alt; back.dataset.f = f; back.src = img(f)
}
function renderLab() {
  const list = colorsFor(state.line)
  if (!list.some((c) => c.id === state.color)) state.color = 'black'
  const c = COLORS.find((x) => x.id === state.color)
  $('#swatches').innerHTML = list.map((x) => `
    <button type="button" role="radio" class="swatch" data-color="${x.id}" aria-checked="${x.id === state.color}" style="--c:${x.hex}" aria-label="${x.name}">
      <i></i><span>${x.name}</span></button>`).join('')
  $('#color-name').textContent = c.name
  $('#color-note').textContent = c.womensOnly ? "Women's line only · " + c.hex : c.hex
  $('#stage-big').textContent = c.name.toUpperCase()
  $('#stage-tag').textContent = `${LABEL[state.line]} · ${c.name}`
  $('#price-list').innerHTML = pieces(state.line).map((p) => `
    <li><button type="button" data-piece="${p.id}" aria-pressed="${p.id === state.piece}">
      <span>${p.name}${p.note ? `<small>${p.note}</small>` : ''}</span><b>${money(p.price)}</b></button></li>`).join('')
  const p = pieces(state.line).find((x) => x.id === state.piece)
  $('#stage-price').textContent = `${p.name} ${money(p.price)}`
  document.body.dataset.color = c.id
  document.documentElement.style.setProperty('--wash', c.wash)
  document.documentElement.style.setProperty('--accent', c.hex)
  swapStage()
}
$('#swatches').addEventListener('click', (e) => {
  const b = e.target.closest('[data-color]'); if (!b) return
  state.color = b.dataset.color; renderLab(); pulseWash()
})
$('#price-list').addEventListener('click', (e) => {
  const b = e.target.closest('[data-piece]'); if (!b) return
  state.piece = b.dataset.piece; renderLab()
})
function pulseWash() {
  if (reduce) return
  const w = $('#wash'); w.classList.remove('pulse'); void w.offsetWidth; w.classList.add('pulse')
}

/* ---------- line toggle ---------- */
function setLine(line) {
  state.line = line
  document.body.dataset.line = line
  $$('.toggle [data-line]').forEach((b) => b.setAttribute('aria-checked', b.dataset.line === line))
  $$('[data-line-label]').forEach((s) => (s.textContent = LABEL[line]))
  renderLab(); renderCards(); renderLooks(); syncForms()
}
$('.toggle').addEventListener('click', (e) => { const b = e.target.closest('[data-line]'); if (b) setLine(b.dataset.line) })

/* ---------- cards ---------- */
const CARD_SHOT = { jacket: 'detail', pant: 'studio', set: 'hero' }
function renderCards() {
  const line = state.line
  const shots = {
    mens: { jacket: 'tracksuits-mens-m-black-detail.jpg', pant: 'tracksuits-mens-m-steel-grey-sf-hill.jpg', set: 'tracksuits-mens-m-chocolate-la-rooftop.jpg' },
    womens: { jacket: 'tracksuits-womens-w-dusty-pink-detail.jpg', pant: 'tracksuits-womens-w-steel-grey-back-studio.jpg', set: 'tracksuits-womens-w-dusty-pink-studio.jpg' },
  }[line]
  const cols = colorsFor(line)
  $('#cards').innerHTML = pieces(line).map((p, i) => `
    <article class="card tilt reveal" style="--d:${i * 90}ms">
      <div class="card-media"><img src="${img(shots[p.id])}" alt="${LABEL[line]} ${p.name}" loading="lazy" decoding="async" /><span class="card-glare"></span></div>
      <div class="card-body">
        <p class="kicker">${LABEL[line]} · 0${i + 1}</p>
        <div class="card-row"><h3>${p.name}</h3><p class="price">${money(p.price)}</p></div>
        <p class="card-note">${p.note ? p.note + ' · ' : ''}Crystal fleece · ${cols.length} colors</p>
        <div class="dots">${cols.map((c) => `<i style="--c:${c.hex}" title="${c.name}"></i>`).join('')}</div>
        <button type="button" class="nfs-btn" data-open-waitlist>Not for sale yet — Limited exclusive drop</button>
      </div>
    </article>`).join('')
  observeReveals(); bindTilt()
}

/* ---------- looks ---------- */
function renderLooks() {
  const items = LOOKS.filter((l) => l.line === state.line)
  $('#looks').innerHTML = items.map((l, i) => {
    const c = COLORS.find((x) => x.id === l.color)
    return `<figure class="look reveal" style="--d:${(i % 3) * 80}ms">
      <div class="look-media" data-parallax="0.08"><img src="${img(l.file)}" alt="${c.name} crystal fleece tracksuit, ${l.place}, ${LABEL[l.line]} line" loading="lazy" decoding="async" /></div>
      <figcaption><span><i style="--c:${c.hex}"></i>${c.name} · ${l.place}</span><b>Full set ${money(PRICES.set)}</b></figcaption>
    </figure>`
  }).join('')
  observeReveals()
}

/* ---------- reveal / parallax ---------- */
let io
function observeReveals() {
  if (reduce || !('IntersectionObserver' in window)) { $$('.reveal').forEach((n) => n.classList.add('in')); return }
  io ||= new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { rootMargin: '0px 0px -8% 0px' })
  $$('.reveal:not(.in)').forEach((n) => io.observe(n))
}
function setupParallax() {
  if (reduce) return
  let ticking = false
  const run = () => {
    ticking = false
    const vh = innerHeight
    for (const n of $$('[data-parallax]')) {
      const r = n.getBoundingClientRect()
      if (r.bottom < -100 || r.top > vh + 100) continue
      const k = parseFloat(n.dataset.parallax)
      n.style.transform = `translate3d(0,${((r.top + r.height / 2 - vh / 2) * -k).toFixed(1)}px,0)`
    }
    $('#sticky-cta').classList.toggle('show', scrollY > vh * 0.7)
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(run) } }, { passive: true })
  run()
}

/* ---------- tilt / magnetic / cursor ---------- */
function bindTilt() {
  if (reduce || !fine) return
  $$('.tilt:not([data-t])').forEach((el) => {
    el.dataset.t = 1
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
      el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`
      el.style.setProperty('--gx', `${(x + 0.5) * 100}%`); el.style.setProperty('--gy', `${(y + 0.5) * 100}%`)
    })
    el.addEventListener('pointerleave', () => (el.style.transform = ''))
  })
}
function setupMagnetic() {
  if (reduce || !fine) return
  $$('.magnetic').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect()
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px,${(e.clientY - r.top - r.height / 2) * 0.4}px)`
    })
    el.addEventListener('pointerleave', () => (el.style.transform = ''))
  })
}
function setupCursor() {
  if (reduce || !fine) return
  const c = $('#cursor'); document.body.classList.add('has-cursor')
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y
  addEventListener('pointermove', (e) => { x = e.clientX; y = e.clientY; c.classList.add('on') })
  document.addEventListener('pointerover', (e) => c.classList.toggle('big', !!e.target.closest('a,button,.swatch,.tilt,[tabindex]')))
  const loop = () => { cx += (x - cx) * 0.2; cy += (y - cy) * 0.2; c.style.transform = `translate3d(${cx}px,${cy}px,0)`; requestAnimationFrame(loop) }
  loop()
}

/* ---------- clock ---------- */
const pad = (n) => String(n).padStart(2, '0')
function tick() {
  let s = Math.max(0, Math.floor((DROP_AT - Date.now()) / 1000))
  const v = { d: Math.floor(s / 86400), h: Math.floor(s / 3600) % 24, m: Math.floor(s / 60) % 60, s: s % 60 }
  $$('[data-clock]').forEach((b) => (b.textContent = pad(v[b.dataset.clock])))
}

/* ---------- turnaround ---------- */
function setupTurn() {
  let i = 0
  const im = $('#turn-img'), stage = $('#turn-stage')
  TURNS.forEach((t) => { const p = new Image(); p.src = img(t.file) })
  $('#angles').innerHTML = TURNS.map((t, k) => `<button type="button" data-k="${k}">${t.id}</button>`).join('')
  const set = (k) => { i = (k + 4) % 4; im.src = img(TURNS[i].file); $$('#angles button').forEach((b, n) => b.setAttribute('aria-pressed', n === i)) }
  $('#angles').addEventListener('click', (e) => { const b = e.target.closest('[data-k]'); if (b) set(+b.dataset.k) })
  stage.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') set(i + 1); if (e.key === 'ArrowLeft') set(i - 1) })
  let sx = null
  stage.addEventListener('pointerdown', (e) => { sx = e.clientX })
  addEventListener('pointerup', () => (sx = null))
  stage.addEventListener('pointermove', (e) => { if (sx == null) return; if (Math.abs(e.clientX - sx) > 50) { set(i + (e.clientX > sx ? 1 : -1)); sx = e.clientX } })
  set(0)
}

/* ---------- waitlist ---------- */
const formHTML = () => `
  <div class="wl-fields">
    <label>Email<input type="email" name="email" autocomplete="email" inputmode="email" placeholder="you@domain.com" /></label>
    <label>Phone<input type="tel" name="phone" autocomplete="tel" inputmode="tel" placeholder="(555) 555-0193" /></label>
  </div>
  <div class="wl-fields">
    <label>Line<select name="line"><option value="mens">Men's</option><option value="womens">Women's</option></select></label>
    <label>Color<select name="color"></select></label>
  </div>
  <p class="wl-hint">Email or phone — at least one.</p>
  <p class="form-error" role="alert" hidden></p>
  <button type="submit" class="btn btn-solid wide"><span>Get contacted when it's live</span></button>
  <p class="fine">No payment. Nothing is for sale yet. We only reach out for the drop.</p>
  <div class="wl-ok" hidden><p class="ok-mark">✦</p><h3>You're on the list.</h3><p>Limited drop. Exclusive. We'll contact you the moment it's live.</p></div>`
function fillColors(form) {
  const line = form.line.value, cur = form.color.value || state.color
  form.color.innerHTML = colorsFor(line).map((c) => `<option value="${c.id}">${c.name}</option>`).join('')
  form.color.value = colorsFor(line).some((c) => c.id === cur) ? cur : 'black'
}
function syncForms() { $$('.wl-form').forEach((f) => { if (!f.dataset.done) { f.line.value = state.line; f.color.value = state.color; fillColors(f); f.color.value = colorsFor(state.line).some(c=>c.id===state.color) ? state.color : 'black' } }) }
function setupForms() {
  $$('.wl-form').forEach((form) => {
    form.innerHTML = formHTML()
    form.line.addEventListener('change', () => fillColors(form))
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const err = $('.form-error', form)
      const email = form.email.value.trim(), phone = form.phone.value.trim()
      const emailOk = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      const phoneOk = !phone || phone.replace(/\D/g, '').length >= 7
      const msg = !email && !phone ? 'Add an email or a phone number.' : !emailOk ? 'That email looks off.' : !phoneOk ? 'That phone number looks short.' : ''
      if (msg) { err.textContent = msg; err.hidden = false; return }
      err.hidden = true
      const color = COLORS.find((c) => c.id === form.color.value)
      const entry = { email, phone, line: LABEL[form.line.value], color: color.name, at: new Date().toISOString() }
      try { const all = JSON.parse(localStorage.getItem('o93-waitlist') || '[]'); all.push(entry); localStorage.setItem('o93-waitlist', JSON.stringify(all)) } catch {}
      const btn = $('button[type=submit]', form); btn.disabled = true; btn.firstElementChild.textContent = 'Sending…'
      try {
        await fetch(FORM_ENDPOINT, {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...entry, _subject: FORM_SUBJECT, _captcha: 'false', _template: 'table' }),
        })
      } catch {}
      form.dataset.done = 1
      $$(':scope > :not(.wl-ok)', form).forEach((n) => (n.hidden = true))
      $('.wl-ok', form).hidden = false
    })
  })
  syncForms()
  const modal = $('#wl-modal')
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-open-waitlist]')) return
    syncForms()
    modal.showModal ? modal.showModal() : $('#waitlist').scrollIntoView()
  })
  $('#modal-x').onclick = () => modal.close()
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.close() })
}

/* ---------- film ---------- */
function setupFilm() {
  const v = $('#hero-video'), s = $('#sound')
  if (reduce) v.pause()
  s.onclick = () => { v.muted = !v.muted; if (!v.muted) v.play(); s.setAttribute('aria-pressed', !v.muted); s.textContent = v.muted ? 'Sound off' : 'Sound on' }
}

setupForms(); setLine('mens'); setupTurn(); setupFilm(); setupParallax(); setupMagnetic(); setupCursor(); bindTilt()
tick(); setInterval(tick, 1000)
