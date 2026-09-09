import './style.css'

const grid = document.getElementById('grid')
const empty = document.getElementById('empty')
const errorEl = document.getElementById('error')
const searchInput = document.getElementById('search')
let projects = []

/** Resolve public assets for both Pages subpath and custom-domain root. */
function assetUrl(path) {
  const base = import.meta.env.BASE_URL || './'
  const cleaned = String(path).replace(/^\/+/, '')
  return new URL(cleaned, base).href
}

function isValidUrl(value) {
  try {
    const u = new URL(value)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

function normalizeProjects(raw) {
  if (!Array.isArray(raw)) {
    console.warn('[project_dashboard] projects.json must be an array')
    return []
  }
  const seen = new Set()
  const result = []
  for (const item of raw) {
    if (!item || typeof item !== 'object') {
      console.warn('[project_dashboard] skip non-object item', item)
      continue
    }
    const { id, name, url, cover } = item
    if (!id || !name || !url || !cover) {
      console.warn('[project_dashboard] skip item missing required fields', item)
      continue
    }
    if (!isValidUrl(url)) {
      console.warn('[project_dashboard] skip item with invalid url', item)
      continue
    }
    if (seen.has(id)) {
      console.warn('[project_dashboard] skip duplicate id', id)
      continue
    }
    seen.add(id)
    result.push({ id: String(id), name: String(name), url: String(url), cover: String(cover) })
  }
  return result
}

function createCard(project) {
  const article = document.createElement('article')
  article.className = 'group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-3 shadow-card backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg'
  const coverLink = document.createElement('a')
  coverLink.href = project.url
  coverLink.className = 'card-cover aspect-[16/10]'
  coverLink.setAttribute('aria-label', '打开 ' + project.name)
  coverLink.addEventListener('click', (event) => {
    event.preventDefault()
    const win = window
    win.open(project.url, '_blank', 'noopener,noreferrer')
  })
  const img = document.createElement('img')
  img.src = assetUrl(project.cover)
  img.alt = project.name + ' 封面'
  img.loading = 'lazy'
  img.className = 'h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]'
  coverLink.appendChild(img)
  const footer = document.createElement('div')
  footer.className = 'flex items-start justify-between gap-3 px-1 pb-1 pt-3'
  const title = document.createElement('h2')
  title.className = 'min-w-0 flex-1 text-base font-semibold leading-snug text-ink-900 sm:text-lg'
  title.textContent = project.name
  const copyBtn = document.createElement('button')
  copyBtn.type = 'button'
  copyBtn.className = 'copy-btn shrink-0'
  copyBtn.textContent = '复制链接'
  copyBtn.addEventListener('click', async () => {
    const original = '复制链接'
    try {
      await navigator.clipboard.writeText(project.url)
      copyBtn.textContent = '已复制'
      copyBtn.classList.add('is-success')
      window.setTimeout(() => {
        copyBtn.textContent = original
        copyBtn.classList.remove('is-success')
      }, 1600)
    } catch (err) {
      console.warn('[project_dashboard] clipboard failed', err)
      copyBtn.textContent = '复制失败'
      window.setTimeout(() => {
        copyBtn.textContent = original
      }, 1800)
    }
  })
  footer.append(title, copyBtn)
  article.append(coverLink, footer)
  return article
}

function render(list) {
  grid.replaceChildren()
  empty.classList.toggle('hidden', list.length > 0)
  for (const project of list) grid.appendChild(createCard(project))
}

function applySearch() {
  const q = searchInput.value.trim().toLowerCase()
  if (!q) {
    render(projects)
    return
  }
  render(projects.filter((p) => p.name.toLowerCase().includes(q)))
}

async function init() {
  try {
    const res = await fetch(assetUrl('projects.json'), { cache: 'no-store' })
    if (!res.ok) throw new Error('HTTP ' + res.status)
    const data = await res.json()
    projects = normalizeProjects(data)
    errorEl.classList.add('hidden')
    applySearch()
  } catch (err) {
    console.error('[project_dashboard] failed to load projects.json', err)
    errorEl.classList.remove('hidden')
    empty.classList.add('hidden')
  }
}

searchInput.addEventListener('input', applySearch)
init()
