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

      document.querySelector('.user-name').textContent = localStorage.getItem('user');



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

document.querySelector('.nav-item.penjualan').onclick = ((e) => {
location.href='/pmps-pages/penjualan/'
})

document.querySelector('.nav-item.data-admin').onclick = ((e) => {
location.href='/pmps-pages/admin/'
})
