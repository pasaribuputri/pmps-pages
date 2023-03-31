const namaBulan = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ];
let mydate = new Date();
      let month = namaBulan[mydate.getMonth()];
      let day = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ][mydate.getDay()];
      let str =
        day +
        ", " +
        mydate.getDate() +
        " " +
        month +
        " " +
        mydate.getFullYear();
      const date = (document.querySelector(".current-date").textContent = str);


const toggleSidebar = document.querySelector(".toggleSidebar");
  const sidebar = document.querySelector(".sidebar");
  toggleSidebar.addEventListener("click", (e) => {
    sidebar.classList.toggle("active");
  });

  const coll = document.querySelector(".collapse-info-user");
  document.querySelector(".info-user").onclick = (e) => {
    coll.classList.toggle("active");
    document.querySelector(".info-user").classList.toggle("active");
  };

  const childMahasiswa = document.querySelector(".child.data-buku");
  const navMahasiswa = (document.querySelectorAll(".nav-item")[1].onclick =
    (e) => {
      childMahasiswa.classList.toggle("active");
      document.querySelectorAll(".nav-item")[1].classList.toggle("active");
    });

  // const childObat = document.querySelector(".child.obat");
  // const navObat = (document.querySelectorAll(".nav-item")[2].onclick = (
  //   e
  // ) => {
  //   childObat.classList.toggle("active");
  //   document.querySelectorAll(".nav-item")[2].classList.toggle("active");
  // });

  // const childLaporan = document.querySelector(".child.laporan");
  // const navLaporan = (document.querySelectorAll(".nav-item")[3].onclick = (
  //   e
  // ) => {
  //   childLaporan.classList.toggle("active");
  //   document.querySelectorAll(".nav-item")[3].classList.toggle("active");
  // });

console.log(document.querySelector('.nav-item-user.log-out'))
console.log(document.querySelector('.nav-item-user.pengeluaran-dana'));

document.querySelector('.nav-item-user.log-out').onclick = ((e)=>{
location.href='/pmps-pages/login/'
})

document.querySelector('.nav-item.dashboard').addEventListener('click', (e) => {
location.href='/pmps-pages/dashboard/'
})

document.querySelector('.nav-item-user.kategori').onclick = ((e) => {
location.href='/pmps-pages/kategori/'
})

document.querySelector('.nav-item-user.genre').onclick = ((e) => {
location.href='/pmps-pages/genre/'
})

document.querySelector('.nav-item-user.penerbit').onclick = ((e) => {
location.href='/pmps-pages/penerbit/'
})

document.querySelector('.nav-item-user.penjualan').onclick = ((e) => {
location.href='/pmps-pages/penjualan/'
})

document.querySelector('.nav-item-user.data-admin').onclick = ((e) => {
location.href='/pmps-pages/admin/'
})
