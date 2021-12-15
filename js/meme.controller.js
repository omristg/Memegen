'use strict'

let gElCanvas;
let gCtx;


function onInit() {
    gElCanvas = document.getElementById('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery();
    addListeners()
}


function renderMeme() {
    renderCanvas();
    const meme = getMeme()
    const { selectedImgId } = meme
    // TODO: fix the lower part on the container
    // TODO: make it work with all sizes
    let img = new Image()
    img.src = getImgUrl(selectedImgId)
    // console.log(img);
    gCtx.drawImage(
        img, 0, 0, gElCanvas.width, gElCanvas.width
    )
    renderText(meme)
}

function onText1Change(value) {
    setText1(value)
    renderMeme()
}

function onChangeFontSize(value) {
    setFontSize(value);
    renderMeme()
}

function onColorSelect(value) {
    setTextColor(value)
    renderMeme()
}

function renderText(meme) {
    const line1 = meme.lines[0]
    const txt1 = line1.txt
    gCtx.font = `400 ${line1.size}px Impact `;
    gCtx.textAlign = line1.align
    gCtx.fillStyle = line1.color
    gCtx.strokeStyle = 'black';
    gCtx.lineWidth = 1.5;
    gCtx.textBaseline = 'middle';

    gCtx.fillText(txt1, gElCanvas.width / 2, gElCanvas.height / 6);
    gCtx.strokeText(txt1, gElCanvas.width / 2, gElCanvas.height / 6);
}


function addListeners() {
    window.addEventListener('resize', () => { renderMeme() })
}



function renderCanvas() {
    const elCanvasContainer = document.querySelector('.canvas-container');
    // Change later, this is only sqare imgs
    gElCanvas.width = elCanvasContainer.offsetWidth
    gElCanvas.height = elCanvasContainer.offsetWidth
    gElCanvas.style.backgroundColor = 'white'
}


// // GALLERY 

function onImageSelect(imgId) {
    setImg(imgId);
    toggleGallery(false);
    toggleEditor(true);
    renderMeme()

}

function toggleEditor(action) {
    const displayAction = (action) ? 'block' : 'none';
    document.querySelector('.editor').style.display = displayAction
    // const displayAction = (action) ? '0' : '100%';
    // document.querySelector('.editor').style.right = displayAction
}

function toggleGallery(action) {
    const displayAction = (action) ? 'block' : 'none';
    document.querySelector('.gallery').style.display = displayAction
    // const displayAction = (action) ? '0' : '100%';
    // document.querySelector('.gallery').style.left = displayAction
}

function renderGallery() {
    const imgs = getImgs()
    console.log(imgs);
    let strHTMLs = [];
    imgs.map(img => {
        strHTMLs.push(
            `<img src="./img/${img.id}.jpg" onclick="onImageSelect(${img.id})" alt="">`
        )
    })
    document.querySelector('.imgs-container').innerHTML = strHTMLs.join('');
}

