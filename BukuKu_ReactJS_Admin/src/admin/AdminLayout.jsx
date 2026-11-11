import React, { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAdminData } from './AdminDataContext'
import AdminIcon from './components/AdminIcon'
import './admin.css'

const navigation = [
  { path: '/admin', label: 'Dashboard', icon: 'dashboard', end: true },
  { path: '/admin/genres', label: 'Genre', icon: 'tag' },
  { path: '/admin/authors', label: 'Author', icon: 'users' },
]
const breadcrumbs = { '/admin': 'Dashboard', '/admin/genres': 'Genre', '/admin/authors': 'Author' }

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const { notice, setNotice } = useAdminData()

  useEffect(() => { setMenuOpen(false) }, [pathname])
  useEffect(() => {
    if (!notice) return undefined
    const timer = window.setTimeout(() => setNotice(''), 4800)
    return () => window.clearTimeout(timer)
  }, [notice, setNotice])

  return (
    <div className="admin-shell">
      {menuOpen && <button className="admin-mobile-overlay" aria-label="Tutup navigasi" onClick={() => setMenuOpen(false)} />}
      <aside className={`admin-sidebar ${menuOpen ? 'admin-sidebar-open' : ''}`} aria-label="Navigasi admin">
        <div className="admin-brand">
          <span className="admin-brand-mark"><AdminIcon name="book" size={23} /></span>
          <span><strong>BukuKu<span className="admin-brand-dot">.</span></strong><small>ADMIN WORKSPACE</small></span>
          <button className="admin-sidebar-close" onClick={() => setMenuOpen(false)} aria-label="Tutup menu"><AdminIcon name="x" /></button>
        </div>
        <div className="admin-side-section">MENU UTAMA</div>
        <nav className="admin-menu">
          {navigation.map(({ path, label, icon, end }) => (
            <NavLink key={path} to={path} end={end} className={({ isActive }) => `admin-menu-link ${isActive ? 'is-active' : ''}`}>
              <AdminIcon name={icon} size={19} /><span>{label}</span>
              {label !== 'Dashboard' && <span className="admin-link-chevron">›</span>}
            </NavLink>
          ))}
        </nav>
        <div className="admin-side-section admin-side-section-secondary">LAINNYA</div>
        <nav className="admin-menu">
          <Link to="/" className="admin-menu-link"><AdminIcon name="home" size={19} /><span>Kembali ke Toko</span><AdminIcon name="arrowUp" size={15} /></Link>
        </nav>
        <div className="admin-sidebar-bottom">
          <div className="admin-help-icon"><AdminIcon name="sparkles" size={19} /></div>
          <strong>Kelola toko lebih mudah</strong>
          <p>Atur data genre dan penulis buku dalam satu tempat.</p>
          <span className="admin-local-pill"><span /> Mode lokal</span>
        </div>
        <div className="admin-sidebar-foot">© {new Date().getFullYear()} BukuKu</div>
      </aside>

      <div className="admin-content-area">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button className="admin-menu-toggle" aria-label="Buka menu admin" onClick={() => setMenuOpen(true)}><AdminIcon name="menu" /></button>
            <div className="admin-breadcrumb"><span>Admin</span><span className="admin-breadcrumb-divider">/</span><strong>{breadcrumbs[pathname] ?? 'Halaman'}</strong></div>
          </div>
          <div className="admin-topbar-right">
            <span className="admin-today"><AdminIcon name="calendar" size={16}/>{new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())}</span>
            <span className="admin-topbar-divider" />
            <span className="admin-avatar">AD</span>
            <span className="admin-profile"><strong>Administrator</strong><small>Pengelola toko</small></span>
          </div>
        </header>
        <main className="admin-main"><Outlet /></main>
      </div>
      {notice && <div className="admin-toast" role="status"><span className="admin-toast-icon"><AdminIcon name="check" size={16}/></span>{notice}<button onClick={() => setNotice('')} aria-label="Tutup notifikasi"><AdminIcon name="x" size={16}/></button></div>}
    </div>
  )
}
