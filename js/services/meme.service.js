'use strict'


let gKeywordSearchCountMap = null
let gSavedMemes = [];
let gNextLineSpace = 2.2;




const gImgs = [
    {
        id: 1,
        url: './img/1.jpg',
        keywords: ['funny', 'famous', 'people',]

    },
    {
        id: 2,
        url: './img/2.jpg',
        keywords: ['dog', 'love', 'happy', 'animals']
    },
    {
        id: 3,
        url: './img/3.jpg',
        keywords: ['baby', 'dog', 'cute', 'animals']
    },
    {
        id: 4,
        url: './img/4.jpg',
        keywords: ['funny', 'cat', 'animals']
    },
    {
        id: 5,
        url: './img/5.jpg',
        keywords: ['funny', 'baby', 'people']
    },
    {
        id: 6,
        url: './img/6.jpg',
        keywords: ['funny', 'face', 'people']
    },
    {
        id: 7,
        url: './img/7.jpg',
        keywords: ['funny', 'baby', 'people', 'face']
    },
    {
        id: 8,
        url: './img/8.jpg',
        keywords: ['funny', 'face', 'people']
    },
    {
        id: 9,
        url: './img/9.jpg',
        keywords: ['funny', 'baby', 'face', 'people']
    },
    {
        id: 10,
        url: './img/10.jpg',
        keywords: ['funny', 'face', 'famous', 'obama', 'people']
    },
    {
        id: 11,
        url: './img/11.jpg',
        keywords: ['people', 'two']
    },
    {
        id: 12,
        url: './img/12.jpg',
        keywords: ['face', 'famous', 'people']
    },
    {
        id: 13,
        url: './img/13.jpg',
        keywords: ['famous', 'face', 'people',]
    },
    {
        id: 14,
        url: './img/14.jpg',
        keywords: ['movies', 'face', 'serious', 'people']
    },
    {
        id: 15,
        url: './img/15.jpg',
        keywords: ['tv', 'face', 'people']
    },
    {
        id: 16,
        url: './img/16.jpg',
        keywords: ['tv', 'funny', 'face', 'people']
    },
    {
        id: 17,
        url: './img/17.jpg',
        keywords: ['famous', 'russia', 'people']
    },
    {
        id: 18,
        url: './img/18.jpg',
        keywords: ['two', 'movies', 'fictional']
    },
]

let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,

    lines: [
        {
            txt: 'Type something',
            size: 30,
            align: 'center',
            color: 'white',
            font: 'impact',
            stroke: 'black',
            isDrag: false,
            pos:{ x: 10, y: 10}
        }
    ]
}


function formatMeme() {
    gMeme = {
        selectedImgId: 1,
        selectedLineIdx: 0,

        lines: [
            {
                txt: 'Type something',
                size: 30,
                align: 'center',
                color: 'white',
                font: 'impact',
                stroke: 'black',
                isDrag: false,
                pos:{ x: 10, y: 10}
            }
        ]
    }
}

function addLine() {
    if (gMeme.lines.length === 4) return onReachedMaxLines()

    gMeme.lines.push(
        {
            txt: '',
            size: 30,
            align: 'center',
            color: 'white',
            font: 'impact',
            stroke: 'black',
            isDrag: false,
            pos: getNewLinePos()
        }
    )
    gNextLineSpace += 1.2
    gMeme.selectedLineIdx++
}

function setReRenderedMeme(meme) {
    console.log(meme);
    gMeme = meme
    console.log(gMeme);
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function setLineDrag(isDrag) {
    const selectedLine = getSelectedLine()
    selectedLine.isDrag = isDrag;
}


function setLinePos(textPosX, textPosY, textWidth, lineHeight) {
    const selectedLine = getSelectedLine()
    selectedLine.pos = { x: textPosX, y: textPosY, width: textWidth, height: lineHeight }
}

function getTextWidth() {
    const selectedLine = getSelectedLine()
    const textMetrics = gCtx.measureText(selectedLine.txt)
    return textMetrics.width
}



function isLineClicked(evPos) {
    const selectedLine = getSelectedLine()

    const { x } = selectedLine.pos;
    const { y } = selectedLine.pos;
    const width = getTextWidth()
    const height = selectedLine.size

    if (evPos.x > x - (width / 2) && evPos.x < x + (width / 2) &&
        evPos.y > y - (height / 2) && evPos.y < y + (height / 2)) return true
}



function setInitialLinePos() {
    let line = gMeme.lines[0]
    line.pos = { x: gElCanvas.width / 2, y: gElCanvas.height / 5 }
}

function moveLine(dx, dy) {
    let selectedLine = getSelectedLine()
    selectedLine.pos.x += dx;
    selectedLine.pos.y += dy;
}


function getLinePos(idx) {
    const selectedLine = gMeme.lines[idx]
    return selectedLine.pos
}

function getNewLinePos() {
    const pos = {
        x: gElCanvas.width / 2,
        y: gElCanvas.height / 5.5 * gNextLineSpace
    }
    return pos
}




function loadKeysMapFromStaroge() {
    gKeywordSearchCountMap = loadFromStroage('keysDB')
    if (!gKeywordSearchCountMap) createKeywordMap()
}

function createKeywordMap() {

    let keywordsArray = [];
    gImgs.forEach(img => {
        img.keywords.forEach(keyword => {
            keywordsArray.push(keyword)
        })
    })
    gKeywordSearchCountMap = keywordsArray.reduce((acc, keyword) => {
        if (!acc[keyword]) acc[keyword] = 1;
        else acc[keyword]++
        return acc
    }, {})
    saveToStorage('keysDB', gKeywordSearchCountMap)
}

function getKeywordsMap() {
    return gKeywordSearchCountMap
}

function updateKeywordSize(keywords) {
    let keywordsSize = gKeywordSearchCountMap[keywords]
    if (keywordsSize > 29) return
    gKeywordSearchCountMap[keywords]++
}

function setFontFamily(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function setStrokeColor(strokeColor) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = strokeColor;
}

function setVerticalChange(diff) {
    let selectedLine = getSelectedLine();
    selectedLine.pos.y -= diff
}


function DeleteLine() {
    const selecetdLineIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(selecetdLineIdx, 1);
    gMeme.selectedLineIdx--;
    if (!gMeme.lines.length) {
        addLine();
    }
    if (gMeme.selectedLineIdx < 0) gMeme.selectedLineIdx = 0;
    gNextLineSpace -= 1.2;
}


function setAlignment(value) {
    const textWidth = getTextWidth()
    let alignment
    switch (value) {
        case 'center':
            alignment = gElCanvas.width / 2;
            break
        case 'right':
            alignment = gElCanvas.width - textWidth / 2 - 10
            break
        case 'left':
            alignment = 0 + textWidth / 2 + 10
            break
    }
    let selectedLine = getSelectedLine();
    selectedLine.pos.x = alignment
}

function swapLines() {
    if (gMeme.lines.length === 1) return
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0;
    return
}

function setFontSize(diff) {
    let selectedLine = getSelectedLine();
    selectedLine.size += diff

}

function setTextColor(value) {
    const currLine = gMeme.selectedLineIdx
    gMeme.lines[currLine].color = `${value}`;
}

function setText(txt) {
    const currLine = gMeme.selectedLineIdx
    gMeme.lines[currLine].txt = txt
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId;
}

function saveMeme() {
    gSavedMemes.push(gMeme)
    saveToStorage('memesDB', gSavedMemes);
}

function getSavedMemes() {
    return gSavedMemes;
}

function getMemeFromSaved(idx) {
    const memes = loadMemes()
    const meme = memes[idx]
    return meme
}

function loadMemes() {
    const memes = loadFromStroage('memesDB')
    return memes
}

function getMeme() {
    return gMeme;
}

function findImgById(imgId) {
    return gImgs.find(img => img.id === imgId)
}

function getImgUrl(imgId) {
    const img = findImgById(imgId)
    return img.url
}

function getImgs() {
    return gImgs
}