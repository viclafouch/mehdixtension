(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var browser = browser || chrome

let contextMenuItem = {
    type: "normal",
    id: "Extension",
    enabled: true,
    title: "Mehdasher le texte",
    contexts: ['selection']
}

browser.contextMenus.create(contextMenuItem)

browser.contextMenus.onClicked.addListener(() => {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, { type: "getText" });
    });
})
},{}]},{},[1])