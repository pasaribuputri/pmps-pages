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

