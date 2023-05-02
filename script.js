const mario = document.querySelector(".mario")
const pipe = document.querySelector(".pipe")
const score = document.querySelector("#score")
const startBoard = document.querySelector(".start-board")
const restartBoard = document.querySelector(".restart-board")
const count = document.querySelector(".count")
const countToStart = document.querySelector(".count-to-start")

const audioJump = new Audio("./assets/sounds/smb_jump-small.wav")
const audioDie = new Audio("./assets/sounds/smb_mariodie.wav")
const audioScore = new Audio("./assets/sounds/smb_coin.wav")
const audioBackground = new Audio("./assets/sounds/smb_starman.mp3")

let started = false
let currentScore = 0
let canAddScore = true

function startAudioBackground() {
  audioBackground.currentTime = 0
  audioBackground.play()
  audioBackground.loop = true
}

document.addEventListener("keydown", jump)
document.addEventListener("touchstart", jump)

function jump(event) {
  if (started && (event.keyCode === 32 || event.type === "touchstart")) {
    audioJump.play()
    mario.classList.add("jump")
    setTimeout(() => {
      mario.classList.remove("jump")
    }, 500)
  }
}

function checkCollision() {
  intervalId = setInterval(() => {
    const pipePosition = pipe.offsetLeft
    const marioPosition = Number(
      window.getComputedStyle(mario).bottom.replace("px", "")
    )

    if (pipePosition <= 145 && pipePosition > 0 && marioPosition < 80) {
      pipe.style.animation = "none"
      pipe.style.left = `${pipePosition}px`

      mario.style.animation = "none"
      mario.style.bottom = `${marioPosition}px`

      mario.src = "./assets/images/game-over.png"
      mario.style.width = "75px"
      mario.style.height = "90px"
      mario.style.marginLeft = "50px"

      audioBackground.pause()
      audioDie.play()

      restartBoard.style.display = "grid"

      clearInterval(intervalId)
    }

    if (pipePosition <= 0) {
      if (canAddScore) {
        audioScore.currentTime = 0
        audioScore.play()
        currentScore += 10
        score.textContent = currentScore
        canAddScore = false
      }
    } else {
      canAddScore = true
    }
  }, 10)
}

function startGame() {
  started = true
  startAudioBackground()
  startBoard.style.display = "none"
  countToStart.style.display = "block"

  let countInterval
  let counter = 4

  countInterval = setInterval(() => {
    if (counter > 0) {
      count.textContent = counter--
    } else {
      clearInterval(countInterval)
      count.textContent = "GO"
      let go = setTimeout(() => {
        count.style.display = "none"
        clearTimeout(go)
      }, 1000)
      pipe.style.animation = "pipe-animation 1.5s infinite linear"
      checkCollision()
    }
  }, 1000)
}

function restartGame() {
  location.reload()
}
