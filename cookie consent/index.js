const modal = document.getElementById("modal")
const modalBtn = document.getElementById("modal-close-btn")
const cookieForm = document.getElementById("info-form")
const modalLoading = document.getElementById("modal-inner-loading")
const modalText = document.getElementById("modal-text")
const modalInner = document.getElementById("modal-inner")
const declineBtn = document.getElementById("decline-btn")
const modelChoiceBtn = document.getElementById("modal-choice-btns")

setTimeout(function() {
    modal.style.display = 'inline'
}, 1500);

modalBtn.addEventListener("click", function() {
    modal.style.display = 'none'
})

declineBtn.addEventListener("mouseenter", function (){
    modelChoiceBtn.classList.toggle('reverse')
})

cookieForm.addEventListener('submit', function(e){
    e.preventDefault();

    const infoFormData = new FormData(cookieForm)

    modalText.innerHTML = `<div class="modal-inner-loading">
                                <img src="images/loading.svg" class="loading">
                                <p id="uploadText">
                                    Uploading your data to the dark web...
                                </p>
                            </div>`
    setTimeout(function() {
        document.getElementById("uploadText").innerText = `Making the sale...`
    }, 1500)

    setTimeout(function() {
        modalInner.innerHTML = `<h2>Thanks <span class="modal-display-name">${infoFormData.get('name')}</span you sucker! </h2>
        <p>We just sold the rights to your eternal soul.</p>
        <div class="idiot-gif">
            <img src="images/pirate.gif">
        </div>`
        modalBtn.disabled = false
    }, 1500)


})
