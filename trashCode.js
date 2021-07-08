function mover(element) {

    element.onmousedown = function (e) {
        let arr = templates[element.tabIndex]
        let k = document.getElementById("katak").getBoundingClientRect();
        let child = element.querySelector(".main");
        element.classList.add("tplDrag");
        let thisY = e.offsetY;
        let thisX = e.offsetX;
        let mx = e.layerX;
        let my = e.layerY;
        document.onmousemove = function (e) {
            element.style.top = e.clientY - thisY - my + "px";
            element.style.left = e.clientX - thisX - mx + "px";
            let yx = Math.floor((child.getBoundingClientRect().x - k.left + 8) / 50 + 1);
            let yy = Math.floor((child.getBoundingClientRect().y - k.top + 8) / 50 + 1);
            if (yx !== oldx || yy !== oldy) {
                if (CheckMix(yy, yx, temp, arr)) {
                    ViewHint(yy, yx, arr)
                }
                oldx = yx;
                oldy = yy;
            }
            document.onmouseup = function () {
                $('.k1').removeClass('hint')
                if (CheckMix(yy, yx, temp, arr)) {
                    element.classList.remove("tplDrag");
                    element.style.transform = "scale(0)";
                    document.onmousemove = function () { };
                    setTimeout(() => {
                        $(element).remove()
                    }, 120);
                    temp = MixArray(yy, yx, temp, arr)
                    InsertNew(yy, yx, arr);
                } else {

                }

            };
        };
    };
}