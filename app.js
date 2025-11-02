let daftarMenu = [];

const formMenu = document.getElementById("formMenu");
const inputNama = document.getElementById("nama");
const inputHarga = document.getElementById("harga");
const inputDeskripsi = document.getElementById("deskripsi");
const inputFoto = document.getElementById("foto");

//get event di form
formMenu.addEventListener("submit", function (event) {
    event.preventDefault(); //supaya tidak reload

    const nama = inputNama.value;
    const harga = inputHarga.value;
    const deskripsi = inputDeskripsi.value;
    const foto = inputFoto.value;

    //tanbahkan validasi sederhana
    if (!nama) {
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
            <h2 class="text-xl font-bold mb-2">${makanan.nama}</h2>
            <p class="text-gray-700 mb-2">${makanan.deskripsi}</p>
            <p class="text-green-600 font-semibold mb-4">Rp ${makanan.harga}</p>
        `;  

        menuList.appendChild(card);
    });
}
