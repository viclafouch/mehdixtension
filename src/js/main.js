var SHA256 = require("crypto-js/sha256");

function getSelectionTextHashed() {
    let text = "ss";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }

    return SHA256(text).toString();
}

chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        switch (message.type) {
            case "getText":
                sendResponse(getSelectionTextHashed());
                break;
        }
    }
);