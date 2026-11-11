import React from 'react'

function Contact() {
  function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const subject = encodeURIComponent(form.get('subjek'))
    const message = encodeURIComponent(
      `Nama: ${form.get('nama')}\nEmail: ${form.get('email')}\n\n${form.get('pesan')}`,
    )

    window.location.href = `mailto:hello@booksales.id?subject=${subject}&body=${message}`
  }

  return (
    <>
      <section className="page-header-simple">
        <div className="container">
          <p className="eyebrow">Contact</p>
          <h1>Hubungi kami</h1>
        </div>
      </section>

      <section className="container py-5">
        <div className="row g-4">
          <div className="col-lg-7">
            <div className="card shadow-sm p-3 p-md-4 border-0 rounded-4">
              <h2 className="h4 fw-bold mb-3">Kirim pesan</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="nama">Nama</label>
                  <input className="form-control" id="nama" name="nama" type="text" required />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input className="form-control" id="email" name="email" type="email" required />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="subjek">Topik</label>
                  <select className="form-select" id="subjek" name="subjek" required defaultValue="">
                    <option value="" disabled>Pilih topik pesan</option>
                    <option>Pertanyaan buku</option>
                    <option>Bantuan pesanan</option>
                    <option>Lainnya</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="pesan">Pesan</label>
                  <textarea className="form-control" id="pesan" name="pesan" rows="4" required></textarea>
                </div>
                <button className="btn btn-orange" type="submit">Kirim via email</button>
              </form>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="info-box">
              <h2 className="h4 fw-bold mb-4">Informasi kontak</h2>
              <p><i className="fas fa-envelope me-2"></i><a href="mailto:hello@booksales.id">hello@booksales.id</a></p>
              <p><i className="fas fa-clock me-2"></i>Senin–Jumat, 09.00–17.00 WIB</p>
              <p><i className="fas fa-location-dot me-2"></i>Jakarta, Indonesia</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
