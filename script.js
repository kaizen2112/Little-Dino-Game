  const WORLD_WIDTH = 100
  const WORLD_HEIGHT = 30

  const worldElem = document.querySelector("[data-world]")


setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)

// update loop will run every frame of the elements in game
let lastTime
function update(time) {
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }
    
    const delta = time -lastTime  // delta is time between frames
    console.log(delta)

    lastTime = time
    window.requestAnimationFrame(update)
}
window.requestAnimationFrame(update)

//   scaling the game wworld according to the window
function setPixelToWorldScale() {
    let worldToPixelScale

    if ((window.innerWidth / window.innerHeight) < (WORLD_WIDTH / WORLD_HEIGHT)) {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH
    }
    else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT
    }

    worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
    worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}