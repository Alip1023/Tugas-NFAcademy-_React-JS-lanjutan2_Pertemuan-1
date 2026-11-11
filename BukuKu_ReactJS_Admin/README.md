# BukuKu — React JS Lanjutan #1

Proyek website toko buku **BukuKu** berbasis React, Vite, React Router, dan Bootstrap. Fitur toko awal tetap dipertahankan. Ditambahkan area **Admin** untuk fitur **Read dan Create Genre serta Author**, sesuai instruksi tugas.

## Fitur tugas

- Dashboard Admin (`/admin`) menampilkan jumlah genre, author, dan buku, beserta data terbaru.
- **Read Genre** (`/admin/genres`): daftar, tanggal dibuat, deskripsi, pencarian.
- **Create Genre**: tombol **Tambah Genre**, formulir nama dan deskripsi, validasi wajib diisi dan nama duplikat.
- **Read Author** (`/admin/authors`): daftar penulis, email, biografi, tanggal dibuat, pencarian.
- **Create Author**: tombol **Tambah Author**, formulir nama, email opsional, biografi opsional, validasi.
- Data yang dibuat tersimpan dalam **localStorage** browser sehingga masih ada setelah refresh.
- Tampilan responsif, sidebar Admin, notifikasi sukses, dialog yang dapat ditutup dengan Escape.

> **Penting:** Proyek awal belum mempunyai backend/API/database ataupun autentikasi. Oleh sebab itu fungsi Read dan Create di sini memakai data contoh dan `localStorage` (hanya tersimpan pada browser/perangkat yang digunakan), **bukan data server**. Pengunjung yang membuka aplikasi dapat mengakses `/admin` karena autentikasi belum diimplementasikan. Jika tugas lanjutan mensyaratkan API/database/login, bagian ini harus dihubungkan ke backend.

## Persyaratan

- Node.js versi **20.19+ atau 22.12+** (sesuai kebutuhan Vite).
- npm.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Buka URL yang ditampilkan oleh Vite (umumnya `http://localhost:5173`). Klik menu **Admin** pada navbar toko, atau langsung ke `http://localhost:5173/admin`.

Jalankan pengujian data:

```bash
npm test
```

Build produksi:

```bash
npm run build
npm run preview
```

## Cara mencoba fitur Create dan Read

1. Di halaman `/admin/genres`, klik **Tambah Genre**.
2. Isi misalnya `Sastra Indonesia` dan deskripsi, lalu klik **Simpan Genre**.
3. Pastikan genre tampil pada tabel. Cari menggunakan input pencarian, lalu refresh untuk melihat data tetap ada.
4. Di halaman `/admin/authors`, klik **Tambah Author**.
5. Isi misalnya `Andrea Hirata` beserta email/biografi opsional, lalu simpan.
6. Pastikan author baru tampil di tabel. Coba masukkan nama sama untuk menguji pesan validasi.

## Struktur folder baru

```text
src/
  admin/
    AdminDataContext.jsx          # state dan penyimpanan data
    AdminLayout.jsx               # layout Admin, sidebar, topbar
    admin.css                     # gaya Admin yang responsif
    data/catalog.js               # contoh data, validasi, utilitas
    components/
      AdminIcon.jsx
      CreateDialog.jsx
    pages/
      Dashboard.jsx
      Genres.jsx
      Authors.jsx
```

## Pengumpulan tugas

1. Buat repository baru di GitHub dengan visibilitas **Private**.
2. Upload seluruh source code (jangan upload `node_modules` atau `dist`; sudah ada `.gitignore`).
3. Buka repository → **Settings → Collaborators** dan undang **username mentor yang ditentukan**.
4. Salin tautan repository ke Microsoft Word bersama nama/NIM, ekspor dokumen ke **PDF**, lalu kumpulkan PDF ke LMS.
5. **Jangan** mengubah repository menjadi Public hanya untuk mengirim link: undang mentor sebagai collaborator.

> Link GitHub dan undangan mentor belum dibuat otomatis dalam berkas ini, karena memerlukan akses ke akun GitHub dan username mentor.
