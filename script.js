const boxs = document.querySelectorAll('.box')
const statustxt = document.querySelector('#status')
const btnrestart = document.querySelector('#restart')


let x = "<img src='../images/x.png'>"
let o = "<img src='../images/O.png''>"

const win = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

]

let options = ["", "", "", "", "", "", "", "", ""]
let currentplayer = x;
let player = "X"
let running = false;
init()



function init() {
    boxs.forEach(box => box.addEventListener('click', boxclick))
    btnrestart.addEventListener('click', restartgame)
    statustxt.textContent = `${player} Your Turn`
    running = true;


}

function boxclick() {
    const index = this.dataset.index
    if (options[index] != "" || !running) {
        return;
    }
    updatebox(this, index)
    checkwinner();
}

function updatebox(box, index) {
    options[index] = player;
    box.innerHTML = currentplayer;

}

function changeplayer() {
    player = (player == 'X') ? "O" : "X";
    currentplayer = (currentplayer == x) ? o : x;
    statustxt.textContent = `${player} Your Turn`

}

function checkwinner() {
    let iswon = false;
    for (let i = 0; i < win.length; i++) {
        const condition = win[i];
        const box1 = options[condition[0]];
        const box2 = options[condition[1]];
        const box3 = options[condition[2]];

        if (box1 == "" || box2 == "" || box3 == "") {
            continue;
        }

        if (box1 == box2 && box2 == box3) {
            iswon = true;
            boxs[condition[0]].classList.add('win');
            boxs[condition[1]].classList.add('win');
            boxs[condition[2]].classList.add('win');
        }
    }
    if (iswon) {
        statustxt.textContent = `${player} Won..`;
        running = false;

    }
    else if (!options.includes("")) {
        statustxt.textContent = `Game Draw..!`;
        running = false;
    } else {
        changeplayer();
    }

}

function restartgame() {

    options = ["", "", "", "", "", "", "", "", ""]
    currentplayer = x;
    player = "X"
    running = true;
    statustxt.textContent = `${player} Your Turn`

    boxs.forEach(box=>{
        box.innerHTML="";
        box.classList.remove('win')
    })

}
