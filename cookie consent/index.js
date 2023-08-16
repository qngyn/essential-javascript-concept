const modal = document.getElementById("modal")
const modalBtn = document.getElementById("modal-close-btn")
const cookieForm = document.getElementById("info-form")
setTimeout(function() {
    modal.style.display = 'inline'
}, 1500);

modalBtn.addEventListener("click", function() {
    modal.style.display = 'none'
})

cookieForm.addEventListener('submit', function(e){
    e.preventDefault();
})
