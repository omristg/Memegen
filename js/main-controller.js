'use strict'

function onInit() {
    gElCanvas = document.getElementById('canvas')
    gCtx = gElCanvas.getContext('2d')
    initGallery();
    addListeners();
}


function onGoToSavedMemes() {
    foramtMeme();
    renderSavedMemes();
    onToggleNavModal(false)
    onToggleEditor(false);
    onToggleGallery(false);
    onToggleSaved(true)
}

function onGoToGallery() {
    foramtMeme();
    onToggleNavModal(false)
    onToggleEditor(false)
    onToggleSaved(false);
    onToggleGallery(true)
}

function onToggleSaved(action) {
    const displayAction = (action) ? 'block' : 'none';
    document.querySelector('.saved-memes').style.display = displayAction
}

function onToggleEditor(action) {
    const displayAction = (action) ? 'block' : 'none';
    document.querySelector('.editor').style.display = displayAction
}

function onToggleGallery(action) {
    const displayAction = (action) ? 'block' : 'none';
    document.querySelector('.gallery').style.display = displayAction
}

function onToggleNavModal(value) {
    if (value) document.body.classList.add('menu-open');
    else document.body.classList.remove('menu-open');
}

function addListeners() {
    window.addEventListener('resize', () => { renderMeme() })
}

