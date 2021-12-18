'use strict'

let gSavesMemesURLs = [];

function renderSavedMemes() {
    const memesURLs = loadFromStroage('memesURLsDB');
    if (!memesURLs || memesURLs.length === 0) return onNoSavedMemes()
    let strHTMLs = [];
    memesURLs.map((memeURL, idx) => {
        strHTMLs.push(
            `<div class="saved-imgs"><img onclick="onReEditMeme(${idx})" src="${memeURL}" alt=""></div>`
        )
    })
    let elSavedMemes = document.querySelector('.saved-memes .memes-container')
    elSavedMemes.innerHTML = strHTMLs.join('');
}


function saveMemeURL(memeURL) {
    gSavesMemesURLs = loadFromStroage('memesURLsDB');
    if (!gSavesMemesURLs || gSavesMemesURLs.length === 0) gSavesMemesURLs = [];
    gSavesMemesURLs.push(memeURL)
    saveToStorage('memesURLsDB', gSavesMemesURLs);
}

function onNoSavedMemes() {
    let elSavedMemes = document.querySelector('.saved-memes .memes-container')
    elSavedMemes.innerHTML = '<h2>No Saved Memes!</h2>'
}