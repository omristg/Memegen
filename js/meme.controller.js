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
    // console.log(img);
    gCtx.drawImage(
        img, 0, 0, gElCanvas.width, gElCanvas.width
    )
    renderText(meme)
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
    console.log('hi');
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
    lines.forEach(line => {
        gCtx.font = `400 ${line.size}px Impact `;
        gCtx.textAlign = line.align
        gCtx.fillStyle = line.color
        gCtx.strokeStyle = 'black';
        gCtx.lineWidth = 1.5;
        gCtx.textBaseline = 'middle';

        const width = gElCanvas.width / 2;
        const height = gElCanvas.height / (6 + lineSpace);
        const textMetrics = gCtx.measureText(line.txt)
        console.log(textMetrics);

        gCtx.fillText(line.txt, width, height);
        gCtx.strokeText(line.txt, width, height);
        // drawFocusRect(textMetrics)

        lineSpace -= 5.5
    })
}



function drawFocusRect(textMetrics, width, height) {
    const { selectedLineIdx } = getMeme()
    console.log(selectedLineIdx);

    // const left = metrics.actualBoundingBoxLeft * -1;
    // const top = metrics.actualBoundingBoxAscent * -1;
    // const right = metrics.actualBoundingBoxRight;
    // const bottom = metrics.actualBoundingBoxDescent;
    
    gCtx.beginPath();
    gCtx.rect(
        100,
        50,
        textMetrics.width,
        textMetrics.fontBoundingBoxAscent
    );
    gCtx.stroke();
}

function showCoords(ev) {
    console.log(ev);
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

