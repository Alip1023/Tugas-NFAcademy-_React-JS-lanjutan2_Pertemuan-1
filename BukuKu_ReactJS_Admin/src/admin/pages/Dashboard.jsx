import React from 'react'
import { Link } from 'react-router-dom'
import books from '../../books'
import { useAdminData } from '../AdminDataContext'
import { formatDate, initials } from '../data/catalog'
import AdminIcon from '../components/AdminIcon'

export default function Dashboard() {
  const { genres, authors } = useAdminData()
  const recentGenres = [...genres].slice(0, 3)
  const recentAuthors = [...authors].slice(0, 3)

  return (
    <div className="admin-dashboard">
      <div className="admin-page-label"><span /> OVERVIEW</div>
      <div className="admin-page-heading"><div><h1>Dashboard</h1><p>Pantau dan kelola data master toko buku kamu.</p></div><span className="admin-dashboard-status"><span /> Semua data siap dikelola</span></div>

      <section className="admin-welcome" aria-label="Selamat datang">
        <div className="admin-welcome-content">
          <span className="admin-welcome-pill"><AdminIcon name="sparkles" size={15}/> SELAMAT DATANG DI BUKUKU ADMIN</span>
          <h2>Kelola koleksi buku,<br/><em>jadi lebih sederhana.</em></h2>
          <p>Semua genre dan penulis dalam satu dashboard yang rapi. Mulai tambahkan data baru sekarang.</p>
          <div className="admin-welcome-buttons"><Link to="/admin/genres" className="admin-btn admin-btn-white">Kelola Genre <AdminIcon name="arrow" size={17}/></Link><Link to="/admin/authors" className="admin-btn admin-btn-white-outline">Kelola Author <AdminIcon name="arrowUp" size={16}/></Link></div>
        </div>
        <div className="admin-welcome-art" aria-hidden="true"><div className="admin-art-halo"/><div className="admin-art-sheet admin-art-sheet-back"/><div className="admin-art-sheet admin-art-sheet-front"><AdminIcon name="book" size={85}/><span>BUKUKU</span></div><div className="admin-art-small-star">✦</div></div>
      </section>

      <div className="admin-stat-grid">
        <StatCard label="Total Genre" count={genres.length} icon="tag" className="admin-stat-orange" detail="Kategori buku tersimpan" />
        <StatCard label="Total Author" count={authors.length} icon="users" className="admin-stat-blue" detail="Data penulis tersimpan" />
        <StatCard label="Total Buku" count={books.length} icon="book" className="admin-stat-purple" detail="Dalam katalog toko" />
      </div>

      <div className="admin-dashboard-columns">
        <section className="admin-panel">
          <div className="admin-panel-header"><div><span className="admin-small-label">DATA MASTER</span><h2>Genre Terbaru</h2></div><Link to="/admin/genres" className="admin-inline-link">Lihat semua <AdminIcon name="arrowUp" size={16}/></Link></div>
          <div className="admin-preview-list">
            {recentGenres.length ? recentGenres.map((genre, index) => <div className="admin-preview-item" key={genre.id}><div className={`admin-preview-icon admin-preview-icon-${index % 3}`}><AdminIcon name="tag" size={18}/></div><div className="admin-preview-copy"><strong>{genre.name}</strong><small>{genre.description || 'Belum ada deskripsi'}</small></div><span className="admin-preview-date">{formatDate(genre.createdAt)}</span></div>) : <p className="admin-preview-empty">Belum ada genre.</p>}
          </div>
          <Link to="/admin/genres" className="admin-panel-footer">Kelola data genre <AdminIcon name="arrow" size={17}/></Link>
        </section>
        <section className="admin-panel">
          <div className="admin-panel-header"><div><span className="admin-small-label">DATA MASTER</span><h2>Author Terbaru</h2></div><Link to="/admin/authors" className="admin-inline-link">Lihat semua <AdminIcon name="arrowUp" size={16}/></Link></div>
          <div className="admin-preview-list">
            {recentAuthors.length ? recentAuthors.map((author, index) => <div className="admin-preview-item" key={author.id}><div className={`admin-author-avatar admin-author-avatar-${index % 4}`}>{initials(author.name)}</div><div className="admin-preview-copy"><strong>{author.name}</strong><small>{author.bio || 'Belum ada biografi'}</small></div><span className="admin-preview-date">{formatDate(author.createdAt)}</span></div>) : <p className="admin-preview-empty">Belum ada author.</p>}
          </div>
          <Link to="/admin/authors" className="admin-panel-footer">Kelola data author <AdminIcon name="arrow" size={17}/></Link>
        </section>
      </div>
      <div className="admin-info-note"><AdminIcon name="info" size={17}/><span>Versi demonstrasi: penambahan genre dan author tersimpan di localStorage browser ini. Belum terhubung ke database atau akun pengguna.</span></div>
    </div>
  )
}

function StatCard({ label, count, icon, className, detail }) {
  return <article className={`admin-stat-card ${className}`}><div className="admin-stat-top"><span className="admin-stat-icon"><AdminIcon name={icon} size={23}/></span><AdminIcon name="arrowUp" size={18}/></div><div className="admin-stat-number">{count.toLocaleString('id-ID')}</div><strong>{label}</strong><span>{detail}</span></article>
}
