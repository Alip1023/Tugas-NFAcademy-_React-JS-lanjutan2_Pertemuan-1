import React from 'react'
import { NavLink } from 'react-router-dom'

const pages = [
  { to: '/', label: 'Home', icon: 'fa-house', end: true },
  { to: '/team', label: 'Team', icon: 'fa-user-tie' },
  { to: '/contact', label: 'Contact', icon: 'fa-envelope' },
  { to: '/admin', label: 'Admin', icon: 'fa-gauge-high' },
]

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4" to="/" aria-label="BukuKu, kembali ke Home">
          <i className="fas fa-book-open me-2"></i>BukuKu
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Buka menu navigasi">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {pages.map(({ to, label, icon, end }) => (
              <li className="nav-item" key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) => `nav-link${isActive ? ' active fw-semibold' : ''}`}
                >
                  <i className={`fas ${icon} me-2`} aria-hidden="true"></i>{label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
