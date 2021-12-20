'use strict'

let gSavedMemesURLs = [];
let gMemeURL;
let gSelectedMemeIdx;

function renderSavedMemes() {
    const memesURLs = loadFromStroage('memesURLsDB');
    if (!memesURLs || memesURLs.length === 0) return onNoSavedMemes()
    let strHTMLs = [];
    memesURLs.map((memeURL, idx) => {
        strHTMLs.push(
            `<div class="saved-imgs"><img  onclick="onOpenSavedMemesModal(${idx}, this)" src="${memeURL}" alt=""></div>`
        )
    })
    let elSavedMemes = document.querySelector('.saved-memes .memes-container')
    elSavedMemes.innerHTML = strHTMLs.join('');
}


function saveMemeURL(memeURL) {
    gSavedMemesURLs = loadFromStroage('memesURLsDB');
    if (!gSavedMemesURLs || gSavedMemesURLs.length === 0) gSavedMemesURLs = [];
    gSavedMemesURLs.push(memeURL)
    saveToStorage('memesURLsDB', gSavedMemesURLs);
}

function onNoSavedMemes() {
    let elSavedMemes = document.querySelector('.saved-memes .memes-container')
    elSavedMemes.innerHTML = '<h2>No Saved Memes!</h2>'
}

function onOpenSavedMemesModal(idx) {
    document.querySelector('.saved-memes').classList.toggle('menu-open')
    onSelectMeme(idx)
}

function onCloseSavedMemesModal() {
    document.querySelector('.saved-memes').classList.toggle('menu-open')
}

function onSelectMeme(idx) {
    gSavedMemesURLs = loadFromStroage('memesURLsDB')
    console.log(gSavedMemes);
    console.log(gSavedMemesURLs);
    console.log(idx);

    gSelectedMemeIdx = idx
    gMemeURL = gSavedMemesURLs[idx]
}



function onDeleteSavedMeme() {
    gSavedMemes.splice(gSelectedMemeIdx, 1)
    gSavedMemesURLs.splice(gSelectedMemeIdx, 1);
    saveToStorage('memesDB', gSavedMemes)
    saveToStorage('memesURLsDB', gSavedMemesURLs)
    renderSavedMemes();
    onCloseSavedMemesModal();
}

function onShareFacebookSavedMeme() {
    const url = gSavedMemesURLs[gSelectedMemeIdx]
    uploadImgFromSavedMemes(url);
}

function onDownloadSavedMeme(elLink) {
    gIsSharing = true;
    drawImgFromlocal()
    const data = gSavedMemesURLs[gSelectedMemeIdx]
    elLink.href = data
    elLink.download = 'my-img.jpg'
    gIsSharing = false;
}

function drawImgFromlocal() {
    var img = new Image()
    img.src = 'img/1.jpg';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

