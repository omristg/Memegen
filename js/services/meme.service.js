'use strict'


// TODO: add the Global keyMap

const gImgs = [
    {
        id: 1,
        url: './img/1.jpg',
        keywords: ['funny', 'Donald Trump', 'face']

    },
    {
        id: 2,
        url: './img/2.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 3,
        url: './img/3.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 4,
        url: './img/4.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 5,
        url: './img/5.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 6,
        url: './img/6.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 7,
        url: './img/7.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 8,
        url: './img/8.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 9,
        url: './img/9.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 10,
        url: './img/10.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 11,
        url: './img/11.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 12,
        url: './img/12.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 13,
        url: './img/13.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 14,
        url: './img/14.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 15,
        url: './img/15.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 16,
        url: './img/16.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 17,
        url: './img/17.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 18,
        url: './img/18.jpg',
        keywords: ['funny', 'cat']
    },
]

let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,

    lines: [
        {
            txt: 'Type something',
            size: 40,
            align: 'center',
            color: 'white',
        },
        {
            txt: 'type another',
            size: 30,
            align: 'left',
            color: 'blue',
        }
    ]
}

function setFontSize(value) {
    const prevSize = gMeme.lines[0].size
    gMeme.lines[0].size = (value) ? prevSize + 5 : prevSize - 5;
}

function setTextColor(value) {
    gMeme.lines[0].color = `${value}`;
}

function setText1(value) {
    gMeme.lines[0].txt = value
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId;
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