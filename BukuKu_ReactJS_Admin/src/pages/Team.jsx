import React from 'react'

function Team() {
  return (
    <>
      <section className="page-header-simple">
        <div className="container">
          <p className="eyebrow">Founder</p>
          <h1>Informasi pemilik toko</h1>
        </div>
      </section>

      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="founder-card">
              <div className="founder-avatar">D</div>
              <h2>Dimas Alip Priyono</h2>
              <p className="founder-role">Founder BukuKu</p>
              <ul className="founder-details">
                <li><strong>Universitas:</strong> Universitas Trisakti</li>
                <li><strong>NIM:</strong> 064102400032</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Team
