import { getDinoRect, setDinoLose, setupDino, updateDino } from "./dino.js";
import { setupGround, updateGround } from "./ground.js";
import { getCactusRect, setupCactus, updateCactus } from "./cactus.js";

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00005;

const worldElem = document.querySelector("[data-world]");
const scoreElem = document.querySelector("[data-score]");
const startScreenElem = document.querySelector("[data-start-screen]");

setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleStart, { once: true }); // adding the press to start feature
document.addEventListener("touchstart", handleTouch, { once: true }); // Listen for touch to start

// update loop will run every frame of the elements in the game
let lastTime;
let speedScale;
let score;

function update(time) {
    if (lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }

    const delta = time - lastTime; // delta is the time between frames
    // console.log(delta)

    updateGround(delta, speedScale);
    updateDino(delta, speedScale);
    updateCactus(delta, speedScale);
    updateSpeedScale(delta);
    updateScore(delta);

    // update lose
    if (checkLose()) return handleLose();

    lastTime = time;
    window.requestAnimationFrame(update);
}

function checkLose() {
    const dinoRect = getDinoRect();
    return getCactusRect().some((rect) => isCollision(rect, dinoRect));
}

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    );
}

function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta) {
    score += delta * 0.01;
    scoreElem.textContent = Math.floor(score);
}

// press to start feature and go on
function handleStart() {
    lastTime = null;
    speedScale = 1;
    score = 0;

    setupGround();
    setupDino();
    setupCactus();
    startScreenElem.classList.add("hide");
    window.requestAnimationFrame(update);
}

function handleLose() {
    setDinoLose();
    // bhule jate space e chap pore abar on na hoye jay after losing the game. tai 100ms er delay
    setTimeout(() => {
        document.addEventListener("keydown", handleStart, { once: true });
        startScreenElem.classList.remove("hide");
    }, 100);
}

// scaling the game world according to the window
function setPixelToWorldScale() {
    let worldToPixelScale;

    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH;
    } else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
    }

    worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
    worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}

function handleTouch() {
    document.removeEventListener("keydown", handleStart, { once: true }); // Remove keydown listener
    document.removeEventListener("touchstart", handleTouch, { once: true }); // Remove touchstart listener
    handleStart();

    document.addEventListener("touchend", handleTouchEnd, { once: true }); // Add touchend listener
}

//triggering jump by touch
function handleTouchEnd() {
    onJump();
}

function onJump() {
    const dinoRect = getDinoRect();
    if (dinoRect.bottom === 0) {
        // Check if the dinosaur is on the ground before jumping
        yVelocity = JUMP_SPEED;
        isJumping = true;
    }
}
