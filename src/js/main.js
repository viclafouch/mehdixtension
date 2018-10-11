var SHA256 = require("crypto-js/sha256");
var browser = browser || chrome

function getSelectionTextHashed() {
    let text = "ss";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return SHA256(text).toString();
}

function createPopup() {

    let s = window.getSelection();
    let oRange = s.getRangeAt(0);
    let oRect = oRange.getBoundingClientRect();

    let div = document.createElement('div');
    let p = document.createElement('p');

    let h1 = document.createElement('h1');
    h1.textContent = "mehdixtension"
    div.append(h1);

    p.textContent = getSelectionTextHashed();
    div.append(p);

    div.style.position = 'absolute';
    div.style.left = oRect.left + 'px';
    div.style.right = oRect.right + 'px';
    div.style.top = oRect.top + 'px';
    div.classList.add('window-mehdixtension');

    return document.body.append(div);
}

browser.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        switch (message.type) {
            case "getText":
                // console.log(getSelectionTextHashed());
                createPopup();
                break;
        }
    }
);

if (document.getElementById('hashForm')) {
    let form = document.getElementById('hashForm');
    let hashInput = form.getElementsByTagName('input')[0];
    let hashType = form.getElementsByTagName('select')[0];

    form.addEventListener('submit', event => {
        event.preventDefault();
        if (hashInput.value) {
            fetch(`https://www.victor-de-la-fouchardiere.fr/mehdixtension.php?text=${hashInput.value}&type=${hashType.value}`)
                .then(x => x.json())
                .then(json => {
                    if (!json.response) throw new Error();
                    document.getElementById('hash').textContent = json.response
                    document.getElementById('hash').style.color = 'green'
                    form.reset();
                })
                .catch(() => {
                    document.getElementById('hash').textContent = 'Une erreur est survenue'
                    document.getElementById('hash').style.color = 'red'
                })
        }

    }, false)
}