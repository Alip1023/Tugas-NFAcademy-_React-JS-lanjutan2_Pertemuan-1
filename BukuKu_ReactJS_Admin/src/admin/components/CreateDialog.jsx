import React, { useEffect, useRef, useState } from 'react'
import AdminIcon from './AdminIcon'
import { useAdminData } from '../AdminDataContext'

const blank = { name: '', description: '', email: '', bio: '' }

export default function CreateDialog({ kind, onClose }) {
  const [values, setValues] = useState(blank)
  const [error, setError] = useState('')
  const firstInput = useRef(null)
  const dialogRef = useRef(null)
  const { addGenre, addAuthor } = useAdminData()
  const isGenre = kind === 'genre'

  useEffect(() => {
    firstInput.current?.focus()
    function handleEscape(event) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab' && dialogRef.current) {
        const elements = [...dialogRef.current.querySelectorAll('button:not([disabled]), input:not([disabled]), textarea:not([disabled])')]
        const first = elements[0]
        const last = elements[elements.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }
    document.addEventListener('keydown', handleEscape)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', handleEscape); document.body.style.overflow = originalOverflow }
  }, [onClose])

  function update(event) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  function submit(event) {
    event.preventDefault()
    const result = isGenre ? addGenre(values) : addAuthor(values)
    if (!result.ok) { setError(result.message); return }
    onClose()
  }

  return (
    <div className="admin-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="admin-modal-title" ref={dialogRef}>
        <div className="admin-modal-head">
          <span className="admin-modal-icon"><AdminIcon name={isGenre ? 'tag' : 'users'} size={22} /></span>
          <button className="admin-icon-button" onClick={onClose} aria-label="Tutup formulir"><AdminIcon name="x" size={21} /></button>
        </div>
        <h2 id="admin-modal-title">Tambah {isGenre ? 'Genre' : 'Author'} Baru</h2>
        <p className="admin-modal-description">{isGenre ? 'Lengkapi informasi genre untuk mengelompokkan koleksi buku.' : 'Isi informasi penulis agar mudah dikelola dalam katalog.'}</p>
        <form onSubmit={submit} noValidate>
          <div className="admin-form-field">
            <label htmlFor="record-name">Nama {isGenre ? 'genre' : 'author'} <span>*</span></label>
            <input ref={firstInput} id="record-name" name="name" value={values.name} onChange={update} maxLength={100} placeholder={isGenre ? 'Contoh: Sastra Indonesia' : 'Contoh: Andrea Hirata'} required />
            <small>Minimal 2 karakter, tidak boleh sama dengan data yang sudah ada.</small>
          </div>
          {isGenre ? (
            <div className="admin-form-field">
              <label htmlFor="genre-description">Deskripsi <span className="admin-optional">(opsional)</span></label>
              <textarea id="genre-description" name="description" value={values.description} onChange={update} maxLength={300} rows={4} placeholder="Tulis deskripsi singkat genre..." />
            </div>
          ) : (
            <>
              <div className="admin-form-field"><label htmlFor="author-email">Email <span className="admin-optional">(opsional)</span></label><input id="author-email" name="email" type="email" value={values.email} onChange={update} maxLength={150} placeholder="penulis@email.com" /></div>
              <div className="admin-form-field"><label htmlFor="author-bio">Biografi singkat <span className="admin-optional">(opsional)</span></label><textarea id="author-bio" name="bio" value={values.bio} onChange={update} maxLength={300} rows={3} placeholder="Ceritakan sedikit tentang penulis..." /></div>
            </>
          )}
          {error && <p className="admin-form-error" role="alert"><AdminIcon name="info" size={17}/>{error}</p>}
          <div className="admin-modal-actions">
            <button type="button" className="admin-btn admin-btn-ghost" onClick={onClose}>Batal</button>
            <button type="submit" className="admin-btn admin-btn-primary"><AdminIcon name="plus" size={18}/>Simpan {isGenre ? 'Genre' : 'Author'}</button>
          </div>
        </form>
      </section>
    </div>
  )
}
