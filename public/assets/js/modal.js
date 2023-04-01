const buttonLogin = document.querySelector('#log-in');
const modal = document.querySelector('.modal-wrapper');
const maskModal = document.querySelector('.mask-modal');

// buttonLogin.addEventListener('submit', (e) => {
//     e.preventDefault()
//     modal.classList.toggle('active');
//     maskModal.classList.toggle('active');
// });

const closeModal = () => {
    modal.classList.toggle('active');
    maskModal.classList.toggle('active');
}

const openModalTambah = () => {
    modal.classList.toggle('active');
    maskModal.classList.toggle('active');
}

