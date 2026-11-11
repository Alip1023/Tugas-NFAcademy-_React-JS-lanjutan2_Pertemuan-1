import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="py-4 mt-auto">
      <div className="container">
        <div className="row g-3 align-items-center">
          <div className="col-md-5">
            <h2 className="h5 fw-bold mb-2">BukuKu</h2>
            <p className="small mb-0">Toko buku simpel untuk kebutuhan belajar dan inspirasi.</p>
          </div>
          <div className="col-md-3">
            <h3 className="h6 fw-bold">Menu</h3>
            <Link className="footer-link" to="/">Home</Link>
            <Link className="footer-link" to="/team">Team</Link>
            <Link className="footer-link" to="/contact">Contact</Link>
          </div>
          <div className="col-md-4">
            <h3 className="h6 fw-bold">Founder</h3>
            <p className="small mb-1">Dimas Alip Priyono</p>
            <p className="small mb-1">Universitas Trisakti</p>
            <p className="small mb-0">NIM 064102400032</p>
          </div>
        </div>
        <hr />
        <p className="small text-center mb-0">© {new Date().getFullYear()} BukuKu</p>
      </div>
    </footer>
  )
}

export default Footer
