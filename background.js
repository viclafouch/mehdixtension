let contextMenuItem = {
    type: "normal",
    id: "Extension",
    visible: true,
    enabled: true,
    title: "Hasher",
    contexts: ['selection']
}

chrome.contextMenus.create(contextMenuItem)

chrome.contextMenus.onClicked.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "getText" }, function (response) {
            if (response) {
                alert(response)
            }
        });
    });
})