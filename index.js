const templates = [
    [
        [1, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 1, 0],
        [1, 1, 1]
    ],
    [
        [1, 0],
        [1, 1],
        [1, 0]
    ],
    [
        [0, 1],
        [1, 1],
        [0, 1]
    ],
    [
        [0, 1],
        [1, 1]
    ],
    [
        [1, 0],
        [1, 1]
    ],
    [
        [1, 1],
        [1, 0]
    ],
    [
        [1, 1],
        [0, 1]
    ],
    [
        [0, 0, 1],
        [0, 0, 1],
        [1, 1, 1]
    ],
    [
        [1, 1, 1],
        [1, 0, 0],
        [1, 0, 0]
    ],
    [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 1]
    ],
    [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 1]
    ],
    [
        [0, 1],
        [0, 1],
        [1, 1]
    ],
    [
        [1, 1, 1],
        [0, 0, 1]
    ],
    [
        [1, 1, 1],
        [1, 0, 0]
    ],
    [
        [1, 1],
        [0, 1],
        [0, 1]
    ],
    [
        [1, 0],
        [1, 0],
        [1, 1]
    ],
    [
        [1]
    ],
    [
        [1, 1]
    ],
    [
        [1],
        [1]
    ],
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],
    [
        [1],
        [1],
        [1]
    ],
    [
        [1],
        [1],
        [1],
        [1]
    ],
    [
        [0, 1],
        [1, 1],
        [1, 0]
    ],
    [
        [0, 1, 1],
        [1, 1, 0]
    ],
    [
        [1, 1, 0],
        [0, 1, 1]
    ],
    [
        [1, 1],
        [1, 1],
    ],
    [
        [1, 0],
        [1, 1],
        [0, 1]
    ],
    [
        [1, 0, 1],
        [1, 1, 1]
    ],
    [
        [1, 1, 1],
        [1, 0, 1]
    ],
    [
        [1, 1, 1, 1]
    ],
    [
        [1, 1, 1, 1, 1]
    ],
    [
        [0, 1],
        [1, 0]
    ],
    [
        [1, 0],
        [0, 1]
    ],
    [
        [0, 0, 1],
        [0, 1, 0],
        [1, 0, 0]
    ],
    [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ]
];
let Correct = false;
let child, yy, yx, k, massiv;
let Success = 0;
let highScore = localStorage.getItem('High') * 1;
if (highScore === undefined) highScore = 0;
$("#high_score").text(highScore)
document.getElementById("score").innerText = localStorage.getItem('score') * 1 || 0;
let current, move = false;
let oldx = null,
    oldy = null;
let removeTemp = [];
temp = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
let cell = localStorage.getItem("temp")?.split(',');
if (cell ) {
    temp = []
    let h = 0;
    for (let i = 0; i < 9; i++) {
        let buf = []
        for (let j = 0; j < 9; j++) {
            buf.push(cell[h] * 1)
            h += 1;
        }
        temp.push(buf);
        buf = []
    }
}

function CountUp(id, son = 0) {
    let num = $(id).text() * 1;
    let finish = son + num;
    let m = setInterval(function() {
        num += 1;
        $("#score").text(num);
        if (num == finish) {
            clearInterval(m);
        }
    }, 30);
}

window.onload = function() {
    RedrawCells();
    LoadBlock();
};

function RedrawCells() {
    const katak = document.querySelectorAll("#katak .k1");
    let h = 0;
    for (let i = 0; i < temp.length; i++)
        for (let j = 0; j < temp[0].length; j++) {
            katak[h].id = `c${i}${j}`;
            if (temp[i][j] === 1)
                katak[h].innerHTML = "<div class='kf1'></div>";
            h += 1;
        }
}

function InsertNew(x, y, arra = []) {
    for (let i = x; i < x + arra.length; i++) {
        for (let j = y; j < y + arra[0].length; j++) {
            if (arra[i - x][j - y] === 1) {
                $(`#c${i - 1}${j - 1}`).html("<div class='kf1'></div>");
            }
        }
    }
}

function ViewHint(x, y, arra = []) {
    $('.k1').removeClass('hint');
    for (let i = x; i < x + arra.length; i++) {
        for (let j = y; j < y + arra[0].length; j++) {
            if (arra[i - x][j - y] === 1) {
                $(`#c${i - 1}${j - 1}`).addClass("hint")
            }
        }
    }
}

function MixArray(x, y, c = [], t = []) {
    let tx = t.length,
        ty = t[0].length;
    for (let i = x; i < x + tx; i++)
        for (let j = y; j < y + ty; j++)
            if (t[i - x][j - y] == 1) c[i - 1][j - 1] = 1;
    return c;
}

function CheckMix(x, y, c = [], t = []) {
    let tx = t.length,
        ty = t[0].length;
    if ((x <= 9 - tx + 1) & (x > 0) & ((y > 0) & (y <= 9 - ty + 1))) {
        for (let i = x; i < x + tx; i++)
            for (let j = y; j < y + ty; j++) {
                if ((t[i - x][j - y] == 1) && (c[i - 1][j - 1] == 1)) return false;
            }
        return true
    }
    return false
}


function Tpl(i, bool = true) {
    const el = templates[i];
    const elt = document.createElement("div");
    let flag = true;
    elt.className = "tplgrid " + (bool ? "marg" : "");
    elt.tabIndex = i;
    elt.style.gridTemplateColumns = `repeat(${el[0].length},1fr)`;
    for (let i = 0; i < el.length; i++) {
        for (let j = 0; j < el[0].length; j++) {
            const t = document.createElement("div");
            t.className = "tpl";
            if (flag) t.classList.add(bool ? "main" : "tplmain");
            flag = false;
            if (el[i][j] == 1)
                t.classList.add("rangli");
            elt.appendChild(t);
            if (bool) elt.onmousedown = Down;
        }
    }
    elt.setAttribute("moved", true)
    return elt;
}

function LoadBlock() {
    const ii = document.getElementById("ctrl_el");
    for (let i = 0; i < 3; i++)
        ii.appendChild(Tpl(Math.floor(Math.random() * (templates.length - 1))));
    Detect();
}

function Check3x3() {
    let flag;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            flag = true;
            for (let k = i * 3; k < i * 3 + 3; k++) {
                for (let l = j * 3; l < j * 3 + 3; l++) {
                    if (temp[k][l] !== 1) {
                        flag = false;
                        break;
                    }
                }
            }
            if (flag)
                for (let k = i * 3; k < i * 3 + 3; k++) {
                    flag = false;
                    for (let l = j * 3; l < j * 3 + 3; l++) {
                        removeTemp.push(`${k}${l}`);
                    }
                }
        }
    }
}

function CheckLine() {
    for (let i = 0; i < temp.length; i++)
        if (temp[i].join("") === "111111111") {
            for (let j = 0; j < 9; j++) {
                removeTemp.push(`${i}${j}`);
            }
        }
    for (let i = 0; i < temp.length; i++) {
        let flaga = true;
        for (let j = 0; j < temp.length; j++) {
            if (temp[j][i] === 0) {
                flaga = false;
                break;
            }
        }
        if (flaga)
            for (let p = 0; p < 9; p++) {
                removeTemp.push(`${p}${i}`);
            }
    }
}

document.onmouseup = function() {
    if (move) {

        current.style.transform = "scale(1)";
        $("#template1").css({ transform: 'scale(0)' })
        $('.k1').removeClass('hint')
        if (Correct) {

            $(current).remove();
            temp = MixArray(yy, yx, temp, massiv);
            localStorage.setItem("temp", temp);
            InsertNew(yy, yx, massiv);
            CheckLine();
            Check3x3();
            if (removeTemp.length != 0) {
                setTimeout(() => {
                    let d = (new Set(removeTemp));
                    d.forEach(el => {
                        temp[el[0] * 1][el[1] * 1] = 0;
                        $(`#c${el[0]}${el[1]} .kf1`).css({ transform: `scale(0)`, opacity: 0 });
                    });
                    let score = $("#score").text() * 1;
                    if (score + d.size > highScore) {
                        $("#high_score").text(score + d.size);
                        localStorage.setItem("High", score + d.size);
                    }
                    localStorage.setItem('score', score + d.size);
                    CountUp("#score", d.size);
                    removeTemp = [];
                    Detect();
                }, 80)
            } else {
                Detect();
            }
        }
        move = false;
        massiv = [];
        yx = null;
        yy = null;
        Correct = false;
    }
}

function Detect() {
    let GAMEOVER = true;
    let m = Array.from(document.querySelectorAll("#ctrl_el .tplgrid"));
    if (m.length > 0) {
        m.forEach(el => {
            const a = templates[el.getAttribute('tabindex')];
            let flag = false;
            for (let i = 0; i < temp.length; i++) {
                for (let j = 0; j < temp[0].length; j++) {
                    if (CheckMix(i + 1, j + 1, temp, a)) {
                        flag = true;
                        break
                    }
                }
            }
            if (flag) GAMEOVER = false;
            el.style.opacity = flag ? 1 : 0.2;
            el.setAttribute("moved", flag)
        });
        if (GAMEOVER) GameOver();
    } else {
        LoadBlock();
    }

}


function GameOver() {
    let gop = document.getElementById("GOP").style;
    gop.transform = "scale(1)";
    gop.opacity = 1;
    document.getElementById("restart").onclick = function() {
        $("#ctrl_el .tplgrid").remove();
        $("#score").text(0);
        $(".k1").html('');
        temp = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
        LoadBlock();
        this.onclick = function() {};
        gop.transform = "scale(0)";
        gop.opacity = 0;
    }
}

document.onmousemove = function(e) {
    if (move) {
        console.log("move")
        $("#template1").css({ left: `${e.pageX}px`, top: `${e.pageY - 150}px` });
        child = document.querySelector(".tplmain");
        yx = Math.floor((child.getBoundingClientRect().x - k.left + 25) / 50 + 1);
        yy = Math.floor((child.getBoundingClientRect().y - k.top + 25) / 50 + 1);
        if (yx !== oldx || yy !== oldy) {
            if (CheckMix(yy, yx, temp, massiv)) {
                ViewHint(yy, yx, massiv);
                Correct = true;
            } else {
                Correct = false;
                $('.k1').removeClass('hint');
            }
            oldx = yx;
            oldy = yy;
        }
    }
}

function Down(e) {
    if (this.getAttribute("moved") === 'true') {
        k = document.getElementById("katak").getBoundingClientRect();
        massiv = templates[this.tabIndex]
        move = this.getAttribute("moved");
        $("#template1").css({ left: `${e.pageX}px`, top: `${e.pageY - 150}px` })
        this.style.transform = "scale(0)";
        $("#template1").css({ transform: 'scale(1.7)' }).html("").append(Tpl(this.tabIndex, false))
        current = this;
        child = $('#template .tplmain');
    }
}
