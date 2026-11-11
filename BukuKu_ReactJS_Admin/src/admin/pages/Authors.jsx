import React, { useState } from 'react'
import { useAdminData } from '../AdminDataContext'
import { formatDate, initials } from '../data/catalog'
import AdminIcon from '../components/AdminIcon'
import CreateDialog from '../components/CreateDialog'

export default function Authors() {
  const { authors } = useAdminData()
  const [search, setSearch] = useState('')
  const [createOpen, setCreateOpen] = useState(false)
  const filtered = authors.filter((author) => `${author.name} ${author.email} ${author.bio}`.toLocaleLowerCase('id-ID').includes(search.trim().toLocaleLowerCase('id-ID')))

  return (
    <div>
      <div className="admin-page-label"><span /> DATA MASTER</div>
      <div className="admin-page-heading admin-page-heading-with-action"><div><h1>Data Author</h1><p>Kelola informasi penulis buku dengan mudah dan teratur.</p></div><button className="admin-btn admin-btn-primary admin-add-button" onClick={() => setCreateOpen(true)}><AdminIcon name="plus" size={19}/> Tambah Author</button></div>
      <section className="admin-overview-banner admin-overview-banner-author"><span className="admin-overview-banner-icon"><AdminIcon name="users" size={24}/></span><div><strong>{authors.length} Author Tersimpan</strong><p>Semua informasi penulis tersusun rapi di dalam satu tempat.</p></div><span className="admin-banner-decoration" aria-hidden="true"><AdminIcon name="users" size={50}/></span></section>
      <section className="admin-table-card" aria-label="Daftar author">
        <div className="admin-table-head"><div><h2>Daftar Author</h2><p>Menampilkan {filtered.length} dari {authors.length} penulis</p></div><label className="admin-search"><AdminIcon name="search" size={19}/><span className="visually-hidden">Cari author</span><input type="search" placeholder="Cari nama, email, atau bio..." value={search} onChange={(event) => setSearch(event.target.value)}/></label></div>
        <div className="admin-table-scroll"><table className="admin-table"><thead><tr><th>NO.</th><th>NAMA PENULIS</th><th>EMAIL</th><th>BIOGRAFI</th><th>TANGGAL DIBUAT</th></tr></thead><tbody>{filtered.map((author, index) => <tr key={author.id}><td className="admin-index">{String(index + 1).padStart(2, '0')}</td><td><div className="admin-author-name"><span className={`admin-author-avatar admin-author-avatar-${index % 4}`}>{initials(author.name)}</span><strong>{author.name}</strong></div></td><td className="admin-email-cell">{author.email ? <a href={`mailto:${author.email}`}>{author.email}</a> : <span className="admin-muted">Belum diisi</span>}</td><td className="admin-desc-cell">{author.bio || <span className="admin-muted">Belum ada biografi</span>}</td><td className="admin-date-cell">{formatDate(author.createdAt)}</td></tr>)}</tbody></table></div>
        {!filtered.length && <div className="admin-empty"><AdminIcon name="search" size={30}/><h3>Author tidak ditemukan</h3><p>Coba gunakan kata kunci lain atau tambahkan author baru.</p><button onClick={() => setSearch('')}>Hapus pencarian</button></div>}
        <div className="admin-table-bottom"><span>Menampilkan <strong>{filtered.length}</strong> data</span><span>Data disimpan secara lokal</span></div>
      </section>
      {createOpen && <CreateDialog kind="author" onClose={() => setCreateOpen(false)}/>}
    </div>
  )
}
