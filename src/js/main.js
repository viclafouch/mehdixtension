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
    let widthRect = oRect.right - oRect.left;
    let heightRect = oRect.bottom - oRect.top;

    let div = document.createElement('div');
    let p = document.createElement('p');

    let h1 = document.createElement('h1');
    h1.textContent = "mehdixtension"
    div.append(h1);

    let closeSpan = document.createElement('span');
    closeSpan.classList.add('close-window');
    div.append(closeSpan);

    closeSpan.addEventListener('click', () => removePopup(), false)

    p.textContent = getSelectionTextHashed();
    div.append(p);
    div.classList.add('window-mehdixtension');
    div.style.visibility = 'hidden';

    div.id = "windowMehdixtension"

    div.style.position = 'absolute';

    div.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    document.body.append(div);

    // le petit doliprane entre mes calculs <3
    div.style.left = (oRect.left + (widthRect / 2)) - (div.offsetWidth / 2) + 'px';
    div.style.top = window.scrollY + oRect.top + heightRect + 10 + 'px';
    div // wait DOM position
    div.style.visibility = 'visible';
}

document.body.addEventListener('click', () => removePopup(), false)

function removePopup() {
    let actualWindow = document.getElementById('windowMehdixtension');
    if (actualWindow) {
        actualWindow.parentNode.removeChild(actualWindow);
    }
}

browser.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        switch (message.type) {
            case "getText":
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