'use strict'

let gFilterBy = ''

function initGallery() {
    onGoToGallery();
    filterGallery();
    loadKeysMapFromStaroge();
    renderSearchKeywords();
    renderKeywordCountMap();
}

function onFilterBy(value) {
    gFilterBy = value;
    filterGallery();
}

function filterGallery() {
    const imgs = getImgs();
    gFilterBy = gFilterBy.toLowerCase();
    let filteredImgs = imgs.filter(img => {
        return img.keywords.includes(gFilterBy)
    })
    if (!gFilterBy) filteredImgs = imgs;
    renderGallery(filteredImgs);
}

function renderGallery(imgs) {
    let strHTMLs = [];
    imgs.map(img => {
        strHTMLs.push(
            `<img src="./img/${img.id}.jpg" onclick="onImageSelect(${img.id})" alt="">`
        )
    })
    document.querySelector('.imgs-container').innerHTML = strHTMLs.join('');
}

function renderSearchKeywords() {
    const keywordsMap = getKeywordsMap();
    let strHTML = '';
    for (const keyword in keywordsMap) {
        strHTML += `<option value="${keyword}">${keyword}</option>\n`
    }
    let elDataList = document.getElementById('search-keywords')
    elDataList.innerHTML = strHTML;
}

function renderKeywordCountMap() {
    const map = getKeywordsMap()
    let strHTML = '';
    for (const word in map) {
        const fontSize = map[word]
        strHTML += `<span onclick="onKeywordClick('${word}')" style="font-size: ${fontSize * 2}px;">${word}</span>`
    }
    let elMap = document.querySelector('.keywords');
    elMap.innerHTML = strHTML;
}

function onKeywordClick(word) {
    updateKeywordSize(word)
    renderKeywordCountMap();
    gFilterBy = word;
    filterGallery();
}

function onImageSelect(imgId) {
    setImg(imgId);
    onToggleGallery(false);
    onToggleSaved(false)
    onToggleEditor(true);
    renderMeme()
}

