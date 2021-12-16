'use strict'

let gElCanvas;
let gCtx;


function onInit() {
    gElCanvas = document.getElementById('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery();
    addListeners();

}


function renderMeme() {
    renderCanvas();
    const meme = getMeme()
    const { selectedImgId } = meme
    // TODO: fix the lower part on the container
    // TODO: make it work with all sizes
    let img = new Image()
    img.src = getImgUrl(selectedImgId)
    // img.onload = () => {
    // }
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.width)
    renderText(meme);
}

function onSwapLines() {
    swapLines()
    renderMeme();
}


function onTextChange(value) {
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

function onAddLine() {
    addLine();
    renderMeme();
}


function renderText(meme) {
    // TODO: change the lineSpace system
    let lineSpace = 1
    const lines = meme.lines
    lines.forEach((line, idx) => {
        gCtx.font = `${line.size}px Impact `;
        gCtx.textAlign = line.align
        gCtx.fillStyle = line.color
        gCtx.strokeStyle = 'black';
        gCtx.lineWidth = line.size * 0.03
        gCtx.textBaseline = 'middle';

        const textPosX = gElCanvas.width / 2;
        const textPosY = gElCanvas.height / 5 * lineSpace;
        const textMetrics = gCtx.measureText(line.txt)
        const textWidth = textMetrics.width

        gCtx.fillText(line.txt, textPosX, textPosY);
        gCtx.strokeText(line.txt, textPosX, textPosY);

        if (idx === meme.selectedLineIdx) {
            drawFocusRect(line, textWidth, textPosX, textPosY)
        }

        lineSpace += 1.2
    })
}


function drawFocusRect(line, textWidth, textPosX, textPosY) {
    const textHeight = line.size
    gCtx.beginPath();
    gCtx.rect(
        textPosX - (textWidth / 2) - 10,
        textPosY - (textHeight / 2) - 10,
        textWidth + 20,
        textHeight + 20
    );
    gCtx.fillStyle = '#c3c3c350'
    gCtx.fillRect(
        textPosX - (textWidth / 2) - 10,
        textPosY - (textHeight / 2) - 10,
        textWidth + 20,
        textHeight + 20
    );
    gCtx.stroke();
}

function showCoords(ev) {
}

function addListeners() {
    gElCanvas.addEventListener('mouseup', showCoords);
    window.addEventListener('resize', () => { renderMeme() })
}



function renderCanvas() {
    const elCanvasContainer = document.querySelector('.canvas-container');
    // Change later, this is only square imgs
    gElCanvas.width = elCanvasContainer.offsetWidth
    gElCanvas.height = elCanvasContainer.offsetWidth
    gElCanvas.style.backgroundColor = 'white'
}


// CHANGE THIS!!
function onUpdatePlaceholder(el) {
    console.log(el);
    el.placeholder = '1235'

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
    let strHTMLs = [];
    imgs.map(img => {
        strHTMLs.push(
            `<img src="./img/${img.id}.jpg" onclick="onImageSelect(${img.id})" alt="">`
        )
    })
    document.querySelector('.imgs-container').innerHTML = strHTMLs.join('');
}

