var SHA256 = require("crypto-js/sha256");
var browser = browser || chrome

/**
 * Hash the selected range
 */
function getSelectionTextHashed() {
    let text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return SHA256(text).toString();
}

/**
 * Create a window in position of the selected range
 * @param {string} content
 */
function createPopup(content) {

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

    p.textContent = content;
    div.append(p);
    div.classList.add('window-mehdixtension');
    div.style.visibility = 'hidden';

    div.id = "windowMehdixtension"

    div.style.position = 'absolute';

    // Ignore click event
    div.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    document.body.append(div);

    // le petit doliprane entre mes calculs <3
    div.style.left = (oRect.left + (widthRect / 2)) - (div.offsetWidth / 2) + 'px';
    div.style.top = window.scrollY + oRect.top + heightRect + 10 + 'px';
    div.getBoundingClientRect(); // waiting DOM position completed
    div.style.visibility = 'visible';
}

/**
 * Remove the window if exists
 */
function removePopup() {
    let actualWindow = document.getElementById('windowMehdixtension');
    if (actualWindow) {
        actualWindow.parentNode.removeChild(actualWindow);
    }
}

document.body.addEventListener('click', () => removePopup(), false)

/**
 * Listen if browser received a message from background.js
 */
browser.runtime.onMessage.addListener(
    function (message) {
        switch (message.type) {
            case "getHash":
                createPopup(getSelectionTextHashed());
                break;
        }
    }
);


/**
 * Popup extension
 * Fetch when form is submitted and display hash
 */
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