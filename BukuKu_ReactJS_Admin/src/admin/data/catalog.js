import books from '../../books.js'

export const STORAGE_KEYS = {
  genres: 'bukuku_admin_genres_v1',
  authors: 'bukuku_admin_authors_v1',
}

const sampleTime = '2026-10-01T08:00:00.000Z'

// Data awal untuk contoh tampilan. Data tambahan disimpan di browser pengguna.
export const initialGenres = [
  { id: 'g-1', name: 'Pemrograman', description: 'Bahasa pemrograman, framework, dan pengembangan aplikasi.', createdAt: sampleTime },
  { id: 'g-2', name: 'Teknologi', description: 'Perkembangan teknologi dan sistem informasi.', createdAt: sampleTime },
  { id: 'g-3', name: 'Desain', description: 'UI/UX, desain antarmuka, dan kreativitas digital.', createdAt: sampleTime },
  { id: 'g-4', name: 'Data & Analitik', description: 'Pengolahan data, basis data, dan analisis.', createdAt: sampleTime },
  { id: 'g-5', name: 'Pengembangan Diri', description: 'Referensi untuk meningkatkan keterampilan pribadi.', createdAt: sampleTime },
]

export const initialAuthors = books.map((book) => ({
  id: `a-${book.id}`,
  name: book.author,
  email: '',
  bio: `Penulis buku “${book.title}”.`,
  createdAt: sampleTime,
}))

export function loadCollection(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return fallback
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return fallback
    return parsed.filter((item) => item && typeof item.id === 'string' && typeof item.name === 'string')
  } catch {
    return fallback
  }
}

export function saveCollection(key, collection) {
  try {
    window.localStorage.setItem(key, JSON.stringify(collection))
    return true
  } catch {
    return false
  }
}

export function normalize(value) {
  return String(value ?? '').trim().replace(/\s+/g, ' ')
}

export function validateEntry(kind, raw, existing) {
  const name = normalize(raw.name)
  const field = kind === 'genre' ? 'genre' : 'author'
  if (!name) return { ok: false, message: `Nama ${field} wajib diisi.` }
  if (name.length < 2) return { ok: false, message: `Nama ${field} minimal 2 karakter.` }
  if (existing.some((item) => normalize(item.name).toLocaleLowerCase('id-ID') === name.toLocaleLowerCase('id-ID'))) {
    return { ok: false, message: `Nama ${field} sudah terdaftar.` }
  }
  if (kind === 'author' && normalize(raw.email) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalize(raw.email))) {
    return { ok: false, message: 'Masukkan alamat email yang valid.' }
  }
  return { ok: true, name }
}

export function makeEntry(kind, raw, existing, now = new Date().toISOString()) {
  const validation = validateEntry(kind, raw, existing)
  if (!validation.ok) return validation
  const id = `${kind === 'genre' ? 'g' : 'a'}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
  const entry = kind === 'genre'
    ? { id, name: validation.name, description: normalize(raw.description), createdAt: now }
    : { id, name: validation.name, email: normalize(raw.email), bio: normalize(raw.bio), createdAt: now }
  return { ok: true, entry }
}

export function formatDate(value) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '—' : new Intl.DateTimeFormat('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric',
  }).format(date)
}

export function initials(name) {
  return normalize(name).split(' ').slice(0, 2).map((word) => word[0]?.toUpperCase() ?? '').join('')
}
