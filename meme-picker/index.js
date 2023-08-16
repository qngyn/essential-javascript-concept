import { catsData } from './catData.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifChecked = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const closeBtn = document.getElementById('meme-modal-close-btn')

getImageBtn.addEventListener('click', renderCat)

function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
            emotionsArray.push(emotion)
            }
    }   
    }
    return emotionsArray
}


function renderEmotionsRadios(cats){
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input type = "radio" id = "${emotion}" value="${emotion}" name= "emotions">
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)

emotionRadios.addEventListener('change', function(e) {
    const radiosArray = document.getElementsByClassName("radio")
    for (let radio of radiosArray) {
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
})


function getMatchingCat() {
    if (document.querySelector('input[type="radio"]:checked')) {
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifChecked.checked

        const catData = catsData.filter(function(cat){
            return (cat.emotionTags.includes(selectedEmotion) && cat.isGif === isGif)
        })

        return catData
    }
}

function getSingleCat() {
    const catsArray = getMatchingCat()
    if (catsArray.length === 1) {
        return catsArray[0]
    } else {
        const i = Math.floor(Math.random() * catsArray.length)
        return catsArray[i]
    }
}

function renderCat() {
    const catObject = getSingleCat()
    memeModalInner.innerHTML = `<img class="cat-img" src="./images/${catObject.image}" alt="${catObject.alt}">`
    memeModal.style.display = 'flex'
    closeBtn.addEventListener('click', function(){
        memeModal.style.display = 'none'
    })

}

