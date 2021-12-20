'use strict'

let gElCanvas;
let gCtx;
let gIsSharing = false;
let gEvStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']


function renderMeme(init) {
    renderCanvas();
    const meme = getMeme()
    const { selectedImgId } = meme

    // TODO: make it work with all sizes
    let img = new Image()
    img.src = getImgUrl(selectedImgId)
    img.onload = () => {
    }
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.width)
    if (init === 'init') setInitialLinePos()
    renderText(meme);
}



function renderText(meme) {
    const lines = meme.lines;
    lines.forEach((line, idx) => {
        gCtx.font = `${line.size}px ${line.font} `;
        gCtx.fillStyle = line.color
        gCtx.strokeStyle = line.stroke
        gCtx.lineWidth = line.size * 0.03
        gCtx.textAlign = 'center'
        gCtx.textBaseline = 'middle';

        const linePos = getLinePos(idx)
        const textPosX = linePos.x
        const textPosY = linePos.y

        gCtx.fillText(line.txt, textPosX, textPosY);
        gCtx.strokeText(line.txt, textPosX, textPosY);

        if (idx === meme.selectedLineIdx) {
            drawFocusRect(line, linePos)
        }
    })
}



function drawFocusRect(line, linePos) {
    if (gIsSharing) return

    const textWidth = getTextWidth();
    const textHeight = line.size
    const fromX = linePos.x - (textWidth / 2) - 10
    const fromY = linePos.y - (textHeight / 2) - 10

    gCtx.beginPath();
    gCtx.fillStyle = '#c3c3c350';
    gCtx.strokeStyle = 'black';

    gCtx.rect(fromX, fromY, textWidth + 20, textHeight + 20)
    gCtx.fillRect(fromX, fromY, textWidth + 20, textHeight + 20);
    gCtx.stroke();
}


function onReachedMaxLines() {
    console.log('maximum');
    let elPopup = document.querySelector('.popup')
    elPopup.style.opacity = 1
    elPopup.innerText = '4 lines max!'
    setTimeout(() => {
        elPopup.style.opacity = 0
    }, 1500)
}

function onTextChange(value) {
    setText(value)
    renderMeme()
}

function onUpdateTxtInput() {
    let elInput = document.querySelector('.text-input')
    const meme = getMeme();
    elInput.value = meme.lines[meme.selectedLineIdx].txt;
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

function onVerticalChange(ev, diff) {
    ev.preventDefault();
    setVerticalChange(diff);
    renderMeme();
}

function onDeleteLine(ev) {
    ev.preventDefault();
    DeleteLine();
    onUpdateTxtInput();
    renderMeme();

}

function onChangeFontSize(ev, diff) {
    ev.preventDefault();
    setFontSize(diff);
    renderMeme()
}

function onAlign(ev, value) {
    ev.preventDefault();
    setAlignment(value);
    renderMeme();
}

function onPseudoBtn(ev) {
    ev.preventDefault();
}

function onColorSelect(value) {
    setTextColor(value)
    renderMeme()
}

function onSave() {
    gIsSharing = true;
    renderMeme();
    const memeURL = gElCanvas.toDataURL();
    saveMemeURL(memeURL);
    saveMeme();
    gIsSharing = false;
    renderMeme();
    renderSavedPopup();
}

function renderSavedPopup() {
    let elPopup = document.querySelector('.popup')
    elPopup.classList.add('shown');
    elPopup.innerText = 'Meme Saved!'
    setTimeout(() => {
        elPopup.classList.remove('shown');
    }, 1500)

}

function onSelectFontFamily(font) {
    setFontFamily(font)
    renderMeme();
}

function onStrokeColor(strokeColor) {
    setStrokeColor(strokeColor);
    renderMeme();
}


function renderCanvas() {
    const elCanvasContainer = document.querySelector('.canvas-container');
    // Change later, this is only square imgs
    gElCanvas.width = elCanvasContainer.offsetWidth
    gElCanvas.height = elCanvasContainer.offsetWidth
}

// TODO: Fix later
function onReEditMeme(idx) {
    // const meme = getMemeFromSaved(idx)
    // console.log(meme);
    // setReRenderedMeme(meme);
    // onToggleGallery(false);
    // onToggleSaved(false)
    // onToggleEditor(true);
    // renderMeme();
}


function onOpenShareModal(ev) {
    ev.preventDefault();
    document.querySelector('.editor').classList.toggle('share-modal-open')
}

function onCloseShareModal() {
    document.querySelector('.editor').classList.toggle('share-modal-open')
}

function onDownload(elLink) {
    gIsSharing = true;
    renderMeme()
    drawImgFromlocal()
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.jpg'
    gIsSharing = false;
    renderMeme()
}

function drawImgFromlocal() {
    var img = new Image()
    img.src = 'img/1.jpg';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function onShareFacebook() {
    gIsSharing = true;
    renderMeme()
    uploadImg();
    gIsSharing = false;
    renderMeme()
}

function onUpdatePlaceholder(el) {
    el.value = '';
}

//  Drag and Touch

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    setLineDrag(true)
    gEvStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
    setTimeout(() => {
        document.body.style.cursor = 'default'
    }, 700)
}

function onMove(ev) {
    const selectedLine = getSelectedLine();

    if (!selectedLine.isDrag) return
    document.body.style.cursor = 'grabbing'
    const evPos = getEvPos(ev)
    const dx = evPos.x - gEvStartPos.x
    const dy = evPos.y - gEvStartPos.y
    moveLine(dx, dy);
    gEvStartPos = evPos
    renderMeme();
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}