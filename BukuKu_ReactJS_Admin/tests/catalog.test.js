import test from 'node:test'
import assert from 'node:assert/strict'
import {
  initialGenres, initialAuthors, makeEntry, normalize, validateEntry,
  loadCollection, saveCollection, STORAGE_KEYS,
} from '../src/admin/data/catalog.js'

test('data contoh Genre dan Author dapat dibaca', () => {
  assert.equal(initialGenres.length, 5)
  assert.equal(initialAuthors.length, 9)
  assert.equal(initialGenres[0].name, 'Pemrograman')
})

test('create genre berhasil dengan data valid dan normalisasi spasi', () => {
  const result = makeEntry('genre', { name: '  Sastra  Indonesia ', description: '  Novel dan puisi  ' }, initialGenres)
  assert.equal(result.ok, true)
  assert.equal(result.entry.name, 'Sastra Indonesia')
  assert.equal(result.entry.description, 'Novel dan puisi')
  assert.ok(result.entry.id.startsWith('g-'))
})

test('nama kosong, terlalu pendek, atau duplikat ditolak', () => {
  assert.equal(validateEntry('genre', { name: '  ' }, initialGenres).ok, false)
  assert.equal(validateEntry('author', { name: 'A' }, initialAuthors).ok, false)
  assert.equal(validateEntry('genre', { name: ' PEMROGRAMAN ' }, initialGenres).ok, false)
})

test('create author dan validasi email', () => {
  assert.equal(makeEntry('author', { name: 'Nama Baru', email: 'tidak-valid' }, initialAuthors).ok, false)
  const result = makeEntry('author', { name: '  Nama   Baru', email: 'hello@example.com', bio: 'Penulis' }, initialAuthors)
  assert.equal(result.ok, true)
  assert.equal(result.entry.name, 'Nama Baru')
  assert.equal(result.entry.email, 'hello@example.com')
})

test('penyimpanan localStorage bisa dibaca kembali dan menangani JSON rusak', () => {
  const data = new Map()
  globalThis.window = { localStorage: { getItem: (k) => data.get(k) ?? null, setItem: (k, v) => data.set(k, v) } }
  assert.deepEqual(loadCollection(STORAGE_KEYS.genres, initialGenres), initialGenres)
  assert.equal(saveCollection(STORAGE_KEYS.genres, [{ id: 'g-42', name: 'Sastra' }]), true)
  assert.deepEqual(loadCollection(STORAGE_KEYS.genres, initialGenres), [{ id: 'g-42', name: 'Sastra' }])
  data.set(STORAGE_KEYS.genres, 'invalid-json')
  assert.deepEqual(loadCollection(STORAGE_KEYS.genres, initialGenres), initialGenres)
  assert.equal(normalize(' Halo   Dunia '), 'Halo Dunia')
  delete globalThis.window
})
