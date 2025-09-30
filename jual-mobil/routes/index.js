var express = require("express");
var router = express.Router();

// --- DATABASE MOBIL SEDERHANA KITA ---
const dataMobil = [
  {
    id: 1,
    nama: "Daihatsu Ayla",
    kategori: "Hatchback",
    harga: "Mulai dari Rp 135.000.000",
    gambar: "/images/ayla.jpg",
    deskripsi: "Daihatsu Ayla adalah mobil LCGC yang irit bahan bakar, lincah untuk perkotaan, dan memiliki desain modern yang cocok untuk generasi muda.",
  },
  {
    id: 2,
    nama: "Daihatsu Terios",
    kategori: "SUV",
    harga: "Mulai dari Rp 240.000.000",
    gambar: "/images/terios.jpg",
    deskripsi: "Daihatsu Terios, sang petualang sejati. SUV 7-seater ini tangguh di segala medan, memiliki ground clearance tinggi, dan fitur keamanan lengkap.",
  },
  {
    id: 3,
    nama: "Daihatsu Sigra",
    kategori: "MPV",
    harga: "Mulai dari Rp 138.000.000",
    gambar: "/images/sigra.png",
    deskripsi: "Sebagai MPV keluarga yang lega dan efisien, Daihatsu Sigra menawarkan kenyamanan maksimal dengan kabin luas dan konsumsi BBM yang irit.",
  },
  {
    id: 4,
    nama: "Daihatsu Gran Max PU",
    kategori: "Commercial",
    harga: "Mulai dari Rp 160.000.000",
    gambar: "/images/granmax.jpg",
    deskripsi: "Andalan para pengusaha, Daihatsu Gran Max Pick Up memiliki bak terluas di kelasnya, sasis kuat, dan mesin bertenaga untuk segala kebutuhan niaga.",
  },
];
// --- END OF DATABASE ---

/* HALAMAN UTAMA - KATALOG MOBIL (DENGAN FILTER) */
router.get("/", function (req, res, next) {
  const kategoriFilter = req.query.kategori;
  let mobilTampil = dataMobil;

  if (kategoriFilter) {
    mobilTampil = dataMobil.filter((mobil) => mobil.kategori.toLowerCase() === kategoriFilter.toLowerCase());
  }

  res.render("index", {
    title: "Katalog Mobil",
    mobil: mobilTampil,
  });
});

/* HALAMAN DETAIL MOBIL */
router.get("/mobil/:id", function (req, res, next) {
  const mobilId = parseInt(req.params.id);
  const mobilDetail = dataMobil.find((mobil) => mobil.id === mobilId);

  if (mobilDetail) {
    res.render("detail", {
      title: mobilDetail.nama,
      mobil: mobilDetail,
    });
  } else {
    // Jika mobil tidak ditemukan, bisa arahkan ke halaman error
    next();
  }
});

/* API DATA MOBIL (JSON) */
router.get("/api/mobil", function (req, res, next) {
  res.json(dataMobil);
});

module.exports = router;
