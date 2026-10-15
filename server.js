const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, "database.json");

app.use(express.json());
app.use(express.static(__dirname));

// Data Akun Pengguna (PIN disimpan di Server agar aman)
const AKUN_PENGGUNA = [
  { pin: "123456", role: "owner", nama: "Admin Owner" },
  { pin: "111111", role: "kasir", nama: "Kasir Toko" }
];

const dataAwal = {
  daftarProduk: [
    { id: 1, nama: "Kopi Susu Gula Aren", harga: 18000, stok: 10, minStok: 3, terjual: 0 },
    { id: 2, nama: "Roti Bakar Cokelat", harga: 15000, stok: 3, minStok: 3, terjual: 0 },
    { id: 3, nama: "Teh Tarik Dingin", harga: 12000, stok: 8, minStok: 2, terjual: 0 },
    { id: 4, nama: "Kentang Goreng", harga: 14000, stok: 2, minStok: 4, terjual: 0 }
  ],
  totalOmzet: 0,
  riwayatTransaksi: []
};

function bacaDatabase() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(dataAwal, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}

function simpanDatabase(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// FITUR BARU: API Login Validasi PIN
app.post("/api/login", (req, res) => {
  const { pin } = req.body;
  const akunDitemukan = AKUN_PENGGUNA.find(akun => akun.pin === pin);

  if (!akunDitemukan) {
    return res.status(401).json({ sukses: false, pesan: "PIN salah! Silakan coba lagi." });
  }

  res.json({
    sukses: true,
    role: akunDitemukan.role,
    nama: akunDitemukan.nama
  });
});

// API GET: Ambil semua data
app.get("/api/data", (req, res) => {
  const db = bacaDatabase();
  res.json(db);
});

// API POST: Tambah produk baru
app.post("/api/produk", (req, res) => {
  const { nama, harga, stok } = req.body;
  const db = bacaDatabase();

  db.daftarProduk.push({
    id: Date.now(),
    nama: nama,
    harga: Number(harga),
    stok: Number(stok),
    minStok: 3,
    terjual: 0
  });

  simpanDatabase(db);
  res.json({ pesan: "Produk berhasil ditambahkan", db });
});

// API POST: Restock barang
app.post("/api/restock", (req, res) => {
  const { id, tambahan } = req.body;
  const db = bacaDatabase();

  const produk = db.daftarProduk.find(p => p.id === Number(id));
  if (produk) {
    produk.stok += Number(tambahan);
    simpanDatabase(db);
  }
  res.json({ pesan: "Stok berhasil ditambah", db });
});

// API DELETE: Hapus produk
app.delete("/api/produk/:id", (req, res) => {
  const idHapus = Number(req.params.id);
  const db = bacaDatabase();

  db.daftarProduk = db.daftarProduk.filter(p => p.id !== idHapus);
  simpanDatabase(db);
  res.json({ pesan: "Produk dihapus", db });
});

// API POST: Proses transaksi kasir
app.post("/api/transaksi", (req, res) => {
  const { keranjang, uangDiterima } = req.body;
  const db = bacaDatabase();

  const totalBelanja = keranjang.reduce((total, item) => total + (item.harga * item.qty), 0);

  if (uangDiterima < totalBelanja) {
    return res.status(400).json({ error: "Uang tunai kurang!" });
  }

  keranjang.forEach(itemBelanja => {
    const produk = db.daftarProduk.find(p => p.id === itemBelanja.id);
    if (produk) {
      produk.stok -= itemBelanja.qty;
      produk.terjual = (produk.terjual || 0) + itemBelanja.qty;
    }
  });

  const notaBaru = {
    noNota: "INV-" + Math.floor(10000 + Math.random() * 90000),
    waktu: new Date().toLocaleString("id-ID"),
    item: keranjang.map(i => `${i.nama} (${i.qty}x)`).join(", "),
    total: totalBelanja,
    tunai: uangDiterima,
    kembalian: uangDiterima - totalBelanja
  };

  db.riwayatTransaksi.unshift(notaBaru);
  db.totalOmzet += totalBelanja;
  simpanDatabase(db);

  res.json({ pesan: "Transaksi berhasil", nota: notaBaru, db });
});

// API POST: Reset database ke awal
app.post("/api/reset", (req, res) => {
  simpanDatabase(dataAwal);
  res.json({ pesan: "Database direset ke awal", db: dataAwal });
});

app.listen(PORT, () => {
  console.log(`================================================`);
  console.log(`🚀 Server POS + Login aktif di: http://localhost:${PORT}`);
  console.log(`🔑 PIN Owner: 123456 | PIN Kasir: 111111`);
  console.log(`================================================`);
});