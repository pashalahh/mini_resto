let daftarMenu = [];
let daftarPesanan = [];

const formMenu = document.getElementById("formMenu");
const inputNama = document.getElementById("nama");
const inputHarga = document.getElementById("harga");
const inputDeskripsi = document.getElementById("deskripsi");
const inputFoto = document.getElementById("foto");

//get event di form
formMenu.addEventListener("submit", function (event) {
    event.preventDefault(); //supaya tidak reload

    const nama = inputNama.value.trim();
    const harga = parseInt(inputHarga.value);
    const deskripsi = inputDeskripsi.value.trim();
    const foto = inputFoto.value.trim() || 'https://via.placeholder.com/400x300?text=No+Image';

    //tanbahkan validasi sederhana
    if (!nama || isNaN(harga) || harga <= 0) {
        alert("Nama menu harus diisi");
        return;
    }

    const makanan = {
        id: Date.now(),
        nama: nama,
        harga: harga,
        deskripsi: deskripsi,
        foto: foto,
    }

    daftarMenu.push(makanan);
    formMenu.reset();

    tampilkanMenu();

    // console.log(daftarMenu);

    //reset form
    formMenu.reset();
});

const menuList = document.getElementById("menuList");

//Fungsi untuk menampilkan daftar menu
function tampilkanMenu() {
    menuList.innerHTML = ""; //kosongkan dulu

    daftarMenu.forEach(function (makanan) {
        const card = document.createElement("div");
        card.className = "bg-white rounded-lg shadow p-4 overflow-hidden flex flex-col";

        card.innerHTML = `
            <img src="${makanan.foto}" alt="${makanan.nama}" class="h-48 w-full object-cover rounded-md mb-4">
            <div class="p-3 flex-1">
                <h2 class="font-semibold text-lg">${makanan.nama}</h2>
                <p class="text-sm text-gray-500">${makanan.deskripsi || '-'}</p>
                <p class="font-bold text-blue-600 mt-2">Rp ${makanan.harga.toLocaleString()}</p>
            </div>
            <button class="bg-green-500 text-white py-2 hover:bg-green-600">Tambah ke Pesanan</button>

        `;  

        const btn = card.querySelector('button');
        btn.addEventListener('click', () => tambahPesanan(makanan));

        menuList.appendChild(card);
    });

}


const orderList = document.getElementById('orderList'); 
const totalHarga = document.getElementById('totalHarga'); 

// Fungsi untuk menambah pesanan
function tambahPesanan(makanan) {
    const found = daftarPesanan.find(item => item.id === makanan.id);

    if (found) {
        found.jumlah += 1;
    } else {
        daftarPesanan.push({ ...makanan, jumlah: 1 });
    }

    tampilkanPesanan();
}

function tampilkanPesanan() {
    orderList.innerHTML = '';
    let total = 0;

    daftarPesanan.forEach(item => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center py-2';

        li.innerHTML = `
            <div>
                <p class="font-semibold">${item.nama}</p>
                <p class="text-sm text-gray-500">Rp ${item.harga.toLocaleString()} × ${item.jumlah}</p>
            </div>
            <div class="flex gap-2">
                <button class="bg-gray-500 text-white px-3 rounded decrease">-</button>
                <button class="bg-gray-500 text-white px-3 rounded increase">+</button>
                <button class="bg-red-500 text-white px-3 rounded delete">Hapus</button>
            </div>
        `;

        //untuk tombol hapus
        li.querySelector('.delete').addEventListener('click', () => hapusPesanan(item.id));

        //untuk tombol tambah atau kurang jumlah
        li.querySelector('.increase').addEventListener('click', () => ubahJumlah(item.id, 1));
        li.querySelector('.decrease').addEventListener('click', () => ubahJumlah(item.id, -1));

        total += item.harga * item.jumlah;
        orderList.appendChild(li);
    });

    totalHarga.textContent = `Total: Rp ${total.toLocaleString()}`;
}

// Fungsi untuk menghapus pesanan
function hapusPesanan(id) {
    daftarPesanan = daftarPesanan.filter(item => item.id !== id);
    tampilkanPesanan(); 
}

//mengubah jumlah pesanan
function ubahJumlah(id, delta) {
    const item = daftarPesanan.find(i => i.id === id);
    if (!item) return;

    item.jumlah += delta;
    if (item.jumlah <= 0) {
        hapusPesanan(id); 
    } else {
        tampilkanPesanan(); 
    }
}