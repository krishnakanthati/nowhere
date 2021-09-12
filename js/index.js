let inputDir = { x: 0, y: 0 }

const moveSound = new Audio('turn.mp3')
const gameOverSound = new Audio('gameover.mp3')
const powerupSound = new Audio('powerups.mp3')
let speed = 2;
let lastPaintTime = 0;
let score = 14
let level = 0
let hiScore = localStorage.getItem("hiScore")

let next = document.querySelector(".next")
let now = document.querySelector(".now")

if (hiScore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiScore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiScore);
    hiScoreBox.innerHTML = "HiScore: " + hiscoreval;
}

let joe = { x: 1, y: 1 }

let foe = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
]

let speedup = [
    "https://img.icons8.com/doodle/50/000000/tree.png",
    "https://img.icons8.com/plasticine/60/000000/dog.png",
    "https://img.icons8.com/external-justicon-lineal-color-justicon/60/000000/external-lion-animal-justicon-lineal-color-justicon.png",
    "https://img.icons8.com/external-justicon-blue-justicon/60/000000/external-rocket-science-justicon-blue-justicon.png"
]

let levelup = [
    "https://img.icons8.com/fluency/50/000000/frankensteins-monster.png",
    "https://img.icons8.com/doodle/50/000000/homer-simpson.png",
    "https://img.icons8.com/plasticine/50/000000/morty-smith.png",
    "https://img.icons8.com/plasticine/50/000000/rick-sanchez.png",
    "https://img.icons8.com/color/50/000000/superman.png",
    "https://img.icons8.com/external-justicon-lineal-color-justicon/50/000000/external-girl-christmas-avatar-justicon-lineal-color-justicon.png",
    "https://img.icons8.com/color/50/000000/cute-monster.png",
    "https://img.icons8.com/external-justicon-lineal-color-justicon/50/000000/external-boy-christmas-avatar-justicon-lineal-color-justicon.png",
    "https://img.icons8.com/external-justicon-lineal-color-justicon/50/000000/external-bunny-christmas-avatar-justicon-lineal-color-justicon.png",
    "https://img.icons8.com/doodle/50/000000/super-mario.png"
]

let powerups = { x: 5, y: 5 }

let home = [
    { x: 18, y: 10 }
]

function main(ctime) {
    window.requestAnimationFrame(main)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine()
}

function encounter() {
    // Wall
    if (joe.x > 18 || joe.x < 0 || joe.y > 10 || joe.y < 0) {
        return true
    }
    // Foe
    if (
        joe.x === foe[0].x && joe.y === foe[0].y ||
        joe.x === foe[1].x && joe.y === foe[1].y ||
        joe.x === foe[2].x && joe.y === foe[2].y ||
        joe.x === foe[3].x && joe.y === foe[3].y
    ) {
        return true
    }
    else {
        if (foe[0].x != -1) {
            foe[0].x -= 1
            foe[0].y = foe[0].y
        } else {
            foe[0].y = Math.floor(Math.random() * (10 - 1)) + 1;
            foe[0].x = 18
        }
        if (foe[1].x != 18) {
            foe[1].x += 1
            foe[1].y = foe[1].y
        } else {
            foe[1].y = Math.floor(Math.random() * (10 - 1)) + 1;
            foe[1].x = -1
        }
        if (foe[2].y != -1) {
            foe[2].y -= 1
            foe[2].x = foe[2].x
        } else {
            foe[2].x = Math.floor(Math.random() * (18 - 1)) + 1;
            foe[2].y = 10
        }
        if (foe[3].y != 10) {
            foe[3].y += 1
            foe[3].x = foe[3].x
        } else {
            foe[3].x = Math.floor(Math.random() * (18 - 1)) + 1;
            foe[3].y = -1
        }
    }
}

function gameEngine() {

    if (encounter()) {
        gameOverSound.play()
        inputDir = { x: 0, y: 0 }
        alert("Game Over.")
        joe = { x: 0, y: 0 }
        score = 14
        level = 0
        scoreBox.innerHTML = "Score: " + score
    }

    // Powerups
    if (joe.x === powerups.x && joe.y === powerups.y) {
        score += 1

        if (score > hiscoreval) {
            hiscoreval = score
            localStorage.setItem("hiScore", JSON.stringify(hiscoreval))
            hiScoreBox.innerHTML = "Hi Score: " + hiscoreval
        }

        if (score === parseInt(score / 15, 15) * 15) {
            level += 1
            speed != 10 ? speed += 1 : speed = 5
            // levelBox.innerHTML = "Level " + level
        }
        scoreBox.innerHTML = "Score: " + score

        powerupSound.play()
        let a = 1
        let b = 17
        let p = 1
        let q = 9
        powerups = {
            x: Math.round(a + (b - a) * Math.random()), y: Math.round(p + (q - p) * Math.random())
        }
    }

    joe.x += inputDir.x
    joe.y += inputDir.y
    board.innerHTML = ""

    // Joe
    joeElement = document.createElement('div')
    joeElement.style.gridRowStart = joe.y
    joeElement.style.gridColumnStart = joe.x
    joeElement.classList.add('joe')
    board.appendChild(joeElement)

    // Home
    homeElement = document.createElement('div')
    homeElement.style.gridRowStart = home.y
    homeElement.style.gridColumnStart = home.x
    homeElement.classList.add('home')
    board.appendChild(homeElement)

    // Foe
    foe.forEach((e, index) => {
        foeElement = document.createElement('div')
        foeElement.style.gridRowStart = e.y
        foeElement.style.gridColumnStart = e.x
        foeElement.classList.add('foe')
        board.appendChild(foeElement)
    })

    // powerups
    powerupElement = document.createElement('div')
    powerupElement.style.gridRowStart = powerups.y
    powerupElement.style.gridColumnStart = powerups.x
    powerupElement.classList.add('powerups')
    board.appendChild(powerupElement)

    now.src = levelup[level]
    next.src = levelup[level + 1]
}

window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }
    moveSound.play()
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})