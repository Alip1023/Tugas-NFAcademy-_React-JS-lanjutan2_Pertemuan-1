import React, { createContext, useContext, useState } from 'react'
import { initialAuthors, initialGenres, loadCollection, makeEntry, saveCollection, STORAGE_KEYS } from './data/catalog'

const AdminDataContext = createContext(null)

export function AdminDataProvider({ children }) {
  const [genres, setGenres] = useState(() => loadCollection(STORAGE_KEYS.genres, initialGenres))
  const [authors, setAuthors] = useState(() => loadCollection(STORAGE_KEYS.authors, initialAuthors))
  const [notice, setNotice] = useState('')

  function addGenre(values) {
    const result = makeEntry('genre', values, genres)
    if (!result.ok) return result
    const next = [result.entry, ...genres]
    setGenres(next)
    const saved = saveCollection(STORAGE_KEYS.genres, next)
    setNotice(saved ? 'Genre berhasil ditambahkan.' : 'Genre ditambahkan, tetapi browser tidak mengizinkan penyimpanan permanen.')
    return { ok: true }
  }

  function addAuthor(values) {
    const result = makeEntry('author', values, authors)
    if (!result.ok) return result
    const next = [result.entry, ...authors]
    setAuthors(next)
    const saved = saveCollection(STORAGE_KEYS.authors, next)
    setNotice(saved ? 'Author berhasil ditambahkan.' : 'Author ditambahkan, tetapi browser tidak mengizinkan penyimpanan permanen.')
    return { ok: true }
  }

  return (
    <AdminDataContext.Provider value={{ genres, authors, notice, setNotice, addGenre, addAuthor }}>
      {children}
    </AdminDataContext.Provider>
  )
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext)
  if (!ctx) throw new Error('useAdminData hanya dapat digunakan di dalam AdminDataProvider')
  return ctx
}
