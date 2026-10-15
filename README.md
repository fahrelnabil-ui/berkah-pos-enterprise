# 🛒 BerkahPOS Enterprise — Full-Stack Point of Sale & Inventory

Aplikasi sistem kasir (*Point of Sale*) dan manajemen inventaris berbasis web yang dirancang dengan arsitektur **Full-Stack JavaScript**. Proyek ini dibuat untuk mensimulasikan operasional kasir UMKM modern dengan fitur keamanan tingkat lanjut dan analitik data real-time.

---

## 🚀 Fitur Utama
* **Autentikasi Peran (Role-Based Access Control):** Pemisahan hak akses ketat antara **Owner (Admin)** dan **Kasir** menggunakan validasi PIN server.
* **Manajemen Inventaris & Restock:** Fitur pemantauan stok menipis secara otomatis, penambahan produk baru, dan restock barang cepat.
* **Mesin Transaksi & Cetak Struk:** Perhitungan keranjang belanja instan, validasi uang tunai, dan tata letak khusus cetak struk thermal (*thermal printer/PDF*).
* **Dashboard Analitik & Ekspor Data:** Grafik batang interaktif menggunakan **Chart.js** dan fitur unduh laporan transaksi ke format CSV/Excel.
* **Enterprise Dark Mode:** Tampilan antarmuka modern (*Luxury SaaS UI*) dengan dukungan mode terang dan gelap (*Dark/Light Mode*).

---

## 🛠️ Daftar Teknologi (*Tech Stack*)
* **Frontend:** HTML5, Tailwind CSS (Custom Configuration), JavaScript (ES6+), Chart.js, Google Fonts (Plus Jakarta Sans).
* **Backend:** Node.js, Express.js (REST API Architecture).
* **Database & Storage:** File-based JSON Database (`fs` module).

---

## ⚙️ Cara Menjalankan Proyek di Komputer Lokal

1. Pastikan **Node.js** sudah terinstal di komputer Anda.
2. Clone atau unduh repositori ini ke komputer Anda.
3. Buka terminal di dalam folder proyek, lalu instal dependensi Express:
   ```bash
   npm install express  