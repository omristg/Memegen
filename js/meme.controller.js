'use strict'

let gElCanvas;
let gCtx;
let gIsDownloading = false;


function onInit() {
    gElCanvas = document.getElementById('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery();
    addListeners();
}

// function renderKeywordCountMap() {
//     const map = getKeywordMap()
//     let strHTML = `${map.funny}`
//     let elMap = document.querySelector('.keywords');
//     elMap.innerHTML = strHTML;
// }

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

function onSwapLines(ev) {
    ev.preventDefault();
    swapLines();
    onUpdateTxtInput();
    renderMeme();
}

function onAddLine(ev) {
    ev.preventDefault();
    addLine();
    onUpdateTxtInput();
    renderMeme();
}

function onUpdateTxtInput() {
    const meme = getMeme();
    let elInput = document.querySelector('.text-input')
    elInput.value = meme.lines[meme.selectedLineIdx].txt;
}

function onDeleteLine(ev) {
    ev.preventDefault();
    DeleteLine();
    onUpdateTxtInput();
    renderMeme();

}

function onChangeFontSize(ev, value) {
    ev.preventDefault();
    setFontSize(value);
    renderMeme()
}

function onAlign(ev, value) {
    ev.preventDefault();
    console.log(value);
}

function onTextChange(value) {
    setText(value)
    renderMeme()
}

function onPseudoBtn(ev) {
    ev.preventDefault();

}

function onStroke(ev) {
    ev.preventDefault();
}


function onColorSelect(value) {
    setTextColor(value)
    renderMeme()
}


function renderText(meme) {
    // TODO: change the lineSpace system
    let lineSpace = 1
    const lines = meme.lines
    lines.forEach((line, idx) => {
        gCtx.font = `${line.size}px ${line.font} `;
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
    if (gIsDownloading) return
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

function onSelectFontFamily(font) {
    setFontFamily(font)
    renderMeme();
}

function onSetStrokeColor(strokeColor) {
    setStrokeColor(strokeColor)
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
}

function onOpenShareModal(ev) {
    ev.preventDefault();
    document.querySelector('.editor').classList.toggle('share-modal-open')
}

function onCloseShareModal() {
    document.querySelector('.editor').classList.toggle('share-modal-open')
}

function onDownload(elLink) {
    gIsDownloading = true;
    renderMeme()
    elLink.href = gElCanvas.toDataURL();
    gIsDownloading = false;
    renderMeme()
}

function onShareFacebook() {
    console.log('sharefacebook');
    gIsDownloading = true;
    renderMeme()
    uploadImg();
    gIsDownloading = false;
    renderMeme()
}

function onUpdatePlaceholder(el) {
    el.value = '';
}


// // GALLERY 

function onReturnToGallery() {
    onToggleNavModal(false)
    onToggleEditor(false)
    onToggleGallery(true)
}

function onImageSelect(imgId) {
    setImg(imgId);
    onToggleGallery(false);
    onToggleEditor(true);
    renderMeme()

}

function onToggleEditor(action) {
    const displayAction = (action) ? 'block' : 'none';
    document.querySelector('.editor').style.display = displayAction
    // const displayAction = (action) ? '0' : '100%';
    // document.querySelector('.editor').style.right = displayAction
}

function onToggleGallery(action) {
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

function onToggleNavModal(value) {
    if (value) document.body.classList.add('menu-open');
    else  document.body.classList.remove('menu-open');
}
