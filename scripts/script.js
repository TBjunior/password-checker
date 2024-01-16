function getBar() {
    const element = document.getElementById("bar")
    if (element != null) {
        return element
    }
    return null
}

function setBar() {
    const check1 = getCheck(1).checked
    const check2 = getCheck(2).checked
    const check3 = getCheck(3).checked
    const check4 = getCheck(4).checked
    const checksum = (check1?1:0)+(check2?1:0)+(check3?1:0)+(check4?1:0)
    if (checksum == 0) {
        var value = 5
    } else if (checksum == 1) {
        var value = 25
    } else if (checksum == 2) {
        var value = 50
    } else if (checksum == 3) {
        var value = 85
    } else {
        var value = 100
    }


    const bar = getBar()
    bar.style.width = value + "%"
    bar.classList.remove("bg-success", "bg-warning", "bg-danger")
    if (value > 80) {
        bar.classList.add("bg-success")
    } else if (value > 40) {
        bar.classList.add("bg-warning")
    } else {
        bar.classList.add("bg-danger")
    }
}

function getCheck(id) {
    return document.getElementById("check" + id)
}

async function loadWordlist() {
    const response = await fetch("./words.txt");
    globalThis.wordlist = await response.text();

    const response2 = await fetch("./passwordlist.txt");
    globalThis.rockyou = await response2.text()
}
// Rufe die Funktion beim Laden der Seite auf
window.addEventListener("load", loadWordlist);

function validatePassword(pw) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?"§/]).*$/;

    return regex.test(pw);
}

function checkPW(pw) {

    if (pw.length >= 12) {
        getCheck(1).checked = true
    } else {
        getCheck(1).checked = false
    }

    if (globalThis.wordlist.includes(pw)) {
        getCheck(2).checked = false
    } else {
        getCheck(2).checked = true
    }

    if (validatePassword(pw)) {
        getCheck(3).checked = true
    } else {
        getCheck(3).checked = false
    }
    if (globalThis.rockyou.includes(pw)) {
        getCheck(4).checked = false
    } else {
        getCheck(4).checked = true
    }

    setBar()

    }
