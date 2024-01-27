import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updatCustomProperty.js"

const SPEED = 0.05
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]")

let nextCactusTime
export function setupCactus() {
    nextCactusTime = CACTUS_INTERVAL_MIN
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        cactus.remove() 
    })
}

export function updateCactus(delta, speedScale) {
    
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)
        if (getCustomProperty(cactus, "--left") <= -100) {
            cactus.remove()
        }
    })
    
    if (nextCactusTime <= 0) {
        createCactus()
        //cactus goes faster as the game continues
        nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
    }
    nextCactusTime -= delta
}

function createCactus() {
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true
    cactus.src = "images/cactus.png"
    cactus.classList.add("cactus")
    setCustomProperty(cactus, "--left", 100)
    worldElem.append(cactus)
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min +1) + min)  // this makes sure random number is between min and max

}