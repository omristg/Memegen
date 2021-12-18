'use strict'

let gElCanvas;
let gCtx;
let gIsSharing = false;


function renderMeme() {
    renderCanvas();
    const meme = getMeme()
    const { selectedImgId } = meme

    // TODO: make it work with all sizes
    let img = new Image()
    img.src = getImgUrl(selectedImgId)
    // img.onload = () => {
    // }
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.width)
    renderText(meme);
}

function renderText(meme) {
    // TODO: change the lineSpace system
    let lineSpace = 1
    const lines = meme.lines
    lines.forEach((line, idx) => {
        gCtx.font = `${line.size}px ${line.font} `;

        gCtx.fillStyle = line.color
        gCtx.strokeStyle = line.stroke
        gCtx.lineWidth = line.size * 0.03
        gCtx.textBaseline = 'middle';

        const textMetrics = gCtx.measureText(line.txt)
        const textWidth = textMetrics.width
        const textPosX = getAlignment(line, textWidth)
        const textPosY = (gElCanvas.height / 5 * lineSpace) - line.vertical;

        gCtx.fillText(line.txt, textPosX, textPosY);
        gCtx.strokeText(line.txt, textPosX, textPosY);

        if (idx === meme.selectedLineIdx) {
            drawFocusRect(line, textWidth, textPosX, textPosY)
        }

        lineSpace += 1.2
    })
}

function getAlignment(line, textWidth) {
    let alignment
    switch (line.align) {
        case 'center':
            alignment = gElCanvas.width / 2;
            gCtx.textAlign = 'center'
            break
        case 'right':
            alignment = gElCanvas.width - textWidth;
            gCtx.textAlign = 'start';
            break
        case 'left':
            alignment = 0 + textWidth;
            gCtx.textAlign = 'end';
            break
    }
    return alignment
}

function drawFocusRect(line, textWidth, textPosX, textPosY) {
    if (gIsSharing) return
    const textHeight = line.size
    gCtx.beginPath();
    gCtx.fillStyle = '#c3c3c350';
    gCtx.strokeStyle = 'black';

    const opts = getRectAlignment(line.align, textPosX, textPosY, textWidth, textHeight)
    gCtx.rect(opts.fromX, opts.fromY, opts.toX, opts.toY);
    gCtx.fillRect(opts.fromX, opts.fromY, opts.toX, opts.toY);
    gCtx.stroke();
}

function getRectAlignment(lineAlign, textPosX, textPosY, textWidth, textHeight) {
    let opts = null
    switch (lineAlign) {
        case 'center':
            opts = {
                fromX: textPosX - (textWidth / 2) - 10,
                fromY: textPosY - (textHeight / 2) - 10,
                toX: textWidth + 20,
                toY: textHeight + 20,
            }
            break
        case 'left':
            opts = {
                fromX: 0,
                fromY: textPosY - (textHeight / 2) - 10,
                toX: textWidth + 20,
                toY: textHeight + 20,
            }
            break;
        case 'right':
            opts = {
                fromX: gElCanvas.width - textWidth - 10,
                fromY: textPosY - (textHeight / 2) - 10,
                toX: textWidth + 20,
                toY: textHeight + 20,
            }
            break
    }
    return opts
}

function onTextChange(value) {
    setText(value)
    renderMeme()
}

function onUpdateTxtInput() {
    const meme = getMeme();
    let elInput = document.querySelector('.text-input')
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

function onChangeFontSize(ev, value) {
    ev.preventDefault();
    setFontSize(value);
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
    // console.log(idx);
    // const meme = getMemeFromSaved(idx)
    // setImg(meme.imgId);
    // onToggleGallery(false);
    // onToggleSaved(false)
    // onToggleEditor(true);
    // renderMeme()
}

function reEditMeme(idx) {

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
    elLink.href = gElCanvas.toDataURL();
    gIsSharing = false;
    renderMeme()
}

function onShareFacebook() {
    console.log('sharefacebook');
    gIsSharing = true;
    renderMeme()
    uploadImg();
    gIsSharing = false;
    renderMeme()
}

function onUpdatePlaceholder(el) {
    el.value = '';
}






