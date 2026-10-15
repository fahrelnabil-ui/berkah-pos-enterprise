// 1. Definisikan daftar barang yang dibeli pelanggan di keranjang
const keranjangBelanja = [
  { nama: "Kopi Hitam", harga: 3000, qty: 2 }, // 3000 x 2 = 6000
  { nama: "Roti Cokelat", harga: 5000, qty: 1 }, // 5000 x 1 = 5000
];

// 2. Buat fungsi utama kasir
function prosesTransaksi(keranjang, uangDiterima) {
  // Hitung total belanja menggunakan .reduce()
  const totalBelanja = keranjang.reduce((total, item) => {
    return total + item.harga * item.qty;
  }, 0);

  // Periksa apakah uang pelanggan kurang
  if (uangDiterima < totalBelanja) {
    const kekurangan = totalBelanja - uangDiterima;
    return `Uang tunai kurang! Kurang sebesar Rp${kekurangan}`;
  }

  // Hitung kembalian
  const kembalian = uangDiterima - totalBelanja;

  // Kembalikan hasil ringkasan transaksi
  return {
    rincianBarang: keranjang,
    totalHarga: totalBelanja,
    uangTunai: uangDiterima,
    uangKembalian: kembalian,
    pesan: "Transaksi Berhasil! Terima kasih sudah berbelanja.",
  };
}

// 3. Simulasi transaksi: Pelanggan membayar dengan uang Rp20.000
const hasilTransaksi = prosesTransaksi(keranjangBelanja, 20000);

// 4. Cetak hasil transaksi ke konsol/layar
console.log(hasilTransaksi);
