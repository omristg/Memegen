'use strict'

function saveToStorage(key, val) {
    const json = JSON.stringify(val)
    localStorage.setItem(key, json);
}

function loadFromStroage(key) {
    const json = localStorage.getItem(key)
    return JSON.parse(json);
}