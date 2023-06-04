let z = 0;

var divs = document.getElementsByTagName("div");
for (var i = 0; i < divs.length; i++) {
    if (divs[i].className == "moveable") dragElement(divs[i]);
}
document.addEventListener("keydown", function (event) {
    const input = document.getElementById("keyInput");
    // console.log(event.key, event.key.length);
    if (event.key == "Escape") return input.blur();
    if (input == document.activeElement) return;
    if (event.key == "0") return document.getElementById("10button")?.click();
    if (event.key == "1") return document.getElementById("11button")?.click();
    if (event.key.toLowerCase() == "o") return document.getElementById("oembutton")?.click();
    if (event.key.toLowerCase() == "c") return document.getElementById("copybutton")?.click();
    if (event.key.toLowerCase() == "h") return document.getElementById("homebutton")?.click();
    if (event.key.toLowerCase() == "b") return document.getElementById("backbutton")?.click();
    if (event.key == "F1" || event.key == "?") {
        z++;
        document.getElementById("cardHelp").style.zIndex = z;
        document.getElementById("cardHelp").style.visibility = "visible";
        return;
    }
    if (event.key.toLowerCase() == "i") {
        z++;
        document.getElementById("cardInfo").style.zIndex = z;
        document.getElementById("cardInfo").style.visibility = "visible";
        return;
    }
    if (event.key == " ") return input.focus();
});

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    elmnt.onmousedown = zSet;
    if (document.getElementById(elmnt.id + "title")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "title").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function zSet() {
        z++;
        document.getElementById(elmnt.id).style.zIndex = z;
    }

    function dragMouseDown(e) {
        if (document.elementFromPoint(e.clientX, e.clientY).className.includes("btn")) return; // avoid moving the card when mouse is on a button (= allow pressing buttons)
        // z++;
        // document.getElementById(elmnt.id).style.zIndex = z;
        e = e || window.event;
        e.preventDefault(); // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement; // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault(); // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY; // set the element's new position:

        if (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) return; // mouse is off webpage

        if (Number.parseInt(elmnt.style.top) <= 2) elmnt.style.top = "1px";
        if (Number.parseInt(elmnt.style.top) <= 1 && pos2 > 0) return;

        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
