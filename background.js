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
        browser.tabs.sendMessage(tabs[0].id, { type: "getHash" });
    });
})