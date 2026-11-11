import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import books from '../books'

const bookStyles = ['book-gradient-one', 'book-gradient-two', 'book-gradient-three', 'book-gradient-four']

function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}

function Home() {
  const [cart, setCart] = useState([])
  const [form, setForm] = useState({
    nama: '',
    email: '',
    metode: 'transfer',
  })
  const [message, setMessage] = useState('')

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart],
  )

  function addToCart(buku, mode = 'cart') {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === buku.id)

      if (existing) {
        return currentCart.map((item) =>
          item.id === buku.id
            ? { ...item, qty: mode === 'buy' ? item.qty + 1 : item.qty + 1 }
            : item,
        )
      }

      return [...currentCart, { ...buku, qty: 1 }]
    })

    if (mode === 'buy') {
      document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  function updateQty(id, change) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(0, item.qty + change) } : item,
        )
        .filter((item) => item.qty > 0),
    )
  }

  function handleInputChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleCheckout(event) {
    event.preventDefault()

    if (!cart.length) {
      setMessage('Keranjang masih kosong. Silakan pilih buku terlebih dahulu.')
      return
    }

    setMessage(
      `Terima kasih, ${form.nama || 'Pembeli'}! Pembayaran via ${form.metode} berhasil diproses. Total ${formatRupiah(total)}.`,
    )
    setCart([])
    setForm({ nama: '', email: '', metode: 'transfer' })
  }

  return (
    <>
      <section className="hero-section">
        <div className="container hero-inner">
          <div>
            <p className="eyebrow">BukuKu</p>
            <h1>Baca lebih banyak, beli lebih mudah.</h1>
            <p className="hero-copy">
              Koleksi buku pilihan untuk kebutuhan belajar, inspirasi, dan hiburan dengan proses pembelian yang cepat.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary-solid" onClick={() => document.getElementById('produk')?.scrollIntoView({ behavior: 'smooth' })}>
                Lihat produk
              </button>
              <Link className="btn btn-secondary-outline" to="/contact">
                Hubungi kami
              </Link>
            </div>
          </div>
          <div className="hero-card">
            <span className="mini-label">Best seller</span>
            <h3>{books[0].title}</h3>
            <p>{books[0].description}</p>
            <strong>{formatRupiah(books[0].price)}</strong>
          </div>
        </div>
      </section>

      <section id="produk" className="catalog-section container py-5">
        <div className="section-heading">
          <p className="eyebrow">Produk</p>
          <h2>Pilih buku favoritmu</h2>
        </div>

        <div className="shop-layout">
          <div className="product-grid">
            {books.map((buku, index) => (
              <article className="product-card" key={buku.id}>
                <div className={`book-cover ${bookStyles[index % bookStyles.length]}`}>
                  <img src={buku.image} alt={buku.title} />
                  <span>{buku.title}</span>
                </div>
                <div className="product-body">
                  <h3>{buku.title}</h3>
                  <p className="author">{buku.author}</p>
                  <p className="description">{buku.description}</p>
                  <div className="product-footer">
                    <strong>{formatRupiah(buku.price)}</strong>
                    <div className="product-actions">
                      <button className="btn btn-primary-solid small" onClick={() => addToCart(buku, 'buy')}>
                        Beli
                      </button>
                      <button className="btn btn-secondary-outline small" onClick={() => addToCart(buku)}>
                        Keranjang
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="cart-panel">
            <h3>Keranjang</h3>
            {cart.length === 0 ? (
              <p className="empty-cart">Belum ada buku dipilih.</p>
            ) : (
              <div className="cart-items">
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{formatRupiah(item.price)}</p>
                    </div>
                    <div className="qty-controls">
                      <button type="button" onClick={() => updateQty(item.id, -1)}>-</button>
                      <span>{item.qty}</span>
                      <button type="button" onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="cart-summary">
              <span>Total</span>
              <strong>{formatRupiah(total)}</strong>
            </div>
            <button className="btn btn-primary-solid full-width" onClick={() => document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })}>
              Lanjut bayar
            </button>
          </aside>
        </div>
      </section>

      <section id="checkout" className="checkout-section">
        <div className="container">
          <div className="checkout-card">
            <div className="section-heading left">
              <p className="eyebrow">Pembayaran</p>
              <h2>Isi data pembeli</h2>
            </div>

            <form className="checkout-form" onSubmit={handleCheckout}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="nama">Nama lengkap</label>
                  <input id="nama" name="nama" type="text" value={form.nama} onChange={handleInputChange} placeholder="Masukkan nama" required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={handleInputChange} placeholder="contoh@email.com" required />
                </div>
                <div className="col-12">
                  <label htmlFor="metode">Metode pembayaran</label>
                  <select id="metode" name="metode" value={form.metode} onChange={handleInputChange}>
                    <option value="transfer">Transfer bank</option>
                    <option value="ewallet">E-wallet</option>
                    <option value="cod">COD</option>
                  </select>
                </div>
              </div>

              <div className="checkout-footer">
                <div>
                  <small>Total tagihan</small>
                  <strong>{formatRupiah(total)}</strong>
                </div>
                <button type="submit" className="btn btn-primary-solid">
                  Bayar sekarang
                </button>
              </div>

              {message && <p className="success-message">{message}</p>}
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
