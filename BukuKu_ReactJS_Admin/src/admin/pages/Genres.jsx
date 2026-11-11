import React, { useState } from 'react'
import { useAdminData } from '../AdminDataContext'
import { formatDate } from '../data/catalog'
import AdminIcon from '../components/AdminIcon'
import CreateDialog from '../components/CreateDialog'

export default function Genres() {
  const { genres } = useAdminData()
  const [search, setSearch] = useState('')
  const [createOpen, setCreateOpen] = useState(false)
  const filtered = genres.filter((genre) => `${genre.name} ${genre.description}`.toLocaleLowerCase('id-ID').includes(search.trim().toLocaleLowerCase('id-ID')))

  return (
    <div>
      <div className="admin-page-label"><span /> DATA MASTER</div>
      <div className="admin-page-heading admin-page-heading-with-action"><div><h1>Data Genre</h1><p>Atur kategori buku agar koleksi lebih mudah ditemukan.</p></div><button className="admin-btn admin-btn-primary admin-add-button" onClick={() => setCreateOpen(true)}><AdminIcon name="plus" size={19}/> Tambah Genre</button></div>
      <section className="admin-overview-banner"><span className="admin-overview-banner-icon"><AdminIcon name="tag" size={24}/></span><div><strong>{genres.length} Genre Tersimpan</strong><p>Kelola daftar kategori untuk membantu mengorganisasi koleksi.</p></div><span className="admin-banner-decoration" aria-hidden="true"><AdminIcon name="layers" size={50}/></span></section>
      <section className="admin-table-card" aria-label="Daftar genre">
        <div className="admin-table-head"><div><h2>Daftar Genre</h2><p>Menampilkan {filtered.length} dari {genres.length} genre</p></div><label className="admin-search"><AdminIcon name="search" size={19}/><span className="visually-hidden">Cari genre</span><input type="search" placeholder="Cari nama atau deskripsi..." value={search} onChange={(event) => setSearch(event.target.value)}/></label></div>
        <div className="admin-table-scroll"><table className="admin-table"><thead><tr><th>NO.</th><th>NAMA GENRE</th><th>DESKRIPSI</th><th>TANGGAL DIBUAT</th><th>STATUS</th></tr></thead><tbody>{filtered.map((genre, index) => <tr key={genre.id}><td className="admin-index">{String(index + 1).padStart(2, '0')}</td><td><div className="admin-genre-name"><span className={`admin-table-tag-icon admin-table-tag-${index % 4}`}><AdminIcon name="tag" size={17}/></span><strong>{genre.name}</strong></div></td><td className="admin-desc-cell">{genre.description || <span className="admin-muted">Belum ada deskripsi</span>}</td><td className="admin-date-cell">{formatDate(genre.createdAt)}</td><td><span className="admin-status-chip"><span/> Tersimpan</span></td></tr>)}</tbody></table></div>
        {!filtered.length && <div className="admin-empty"><AdminIcon name="search" size={30}/><h3>Genre tidak ditemukan</h3><p>Coba gunakan kata kunci lain atau tambahkan genre baru.</p><button onClick={() => setSearch('')}>Hapus pencarian</button></div>}
        <div className="admin-table-bottom"><span>Menampilkan <strong>{filtered.length}</strong> data</span><span>Data disimpan secara lokal</span></div>
      </section>
      {createOpen && <CreateDialog kind="genre" onClose={() => setCreateOpen(false)}/>}
    </div>
  )
}
