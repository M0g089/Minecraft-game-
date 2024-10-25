const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game configuration
canvas.width = 800;
canvas.height = 600;
const blockSize = 40;
const worldWidth = 100;
const worldHeight = 50;

let camX = 0, camY = 0;

// Load textures
const textures = {
    dirt: new Image(),
    grass: new Image(),
    stone: new Image(),
    wood: new Image(),
    player: new Image(),
    background: new Image(),
};

textures.dirt.src = '<blockquote class="imgur-embed-pub" lang="en" data-id="a/rHfQUgx"  ><a href="//imgur.com/a/rHfQUgx">Dirt Texture</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>';
textures.grass.src = 'https://i.imgur.com/JprmFJd.png';
textures.stone.src = 'https://i.imgur.com/FzV2E6q.png';
textures.wood.src = 'https://i.imgur.com/BwWcK3Z.png';
textures.player.src = 'https://i.imgur.com/JvPcjYj.png';

// Player settings
let player = {
    x: 10,
    y: 10,
    width: blockSize,
    height: blockSize,
    inventory: [],
    draw() {
        ctx.drawImage(textures.player, (this.x - camX) * blockSize, (this.y - camY) * blockSize, this.width, this.height);
    },
    move(dx, dy) {
        let newX = this.x + dx;
        let newY = this.y + dy;
        if (newX >= 0 && newX < worldWidth && newY >= 0 && newY < worldHeight && world[newY][newX] === 0) {
            this.x = newX;
            this.y = newY;
        }
    }
};

// World generation
let world = [];
for (let y = 0; y < worldHeight; y++) {
    let row = [];
    for (let x = 0; x < worldWidth; x++) {
        if (y > worldHeight / 2) {
            row.push(1);  // Dirt
        } else if (y === Math.floor(worldHeight / 2)) {
            row.push(2);  // Grass
        } else {
            row.push(0);  // Air
        }
    }
    world.push(row);
}

// Block types
const blockTypes = {
    0: null,        // Air
    1: 'dirt',      // Dirt
    2: 'grass',     // Grass
    3: 'stone',     // Stone
    4: 'wood',      // Wood
};

// Draw the world
function drawWorld() {
    for (let y = 0; y < worldHeight; y++) {
        for (let x = 0; x < worldWidth; x++) {
            let blockType = blockTypes[world[y][x]];
            if (blockType) {
                ctx.drawImage(textures[blockType], (x - camX) * blockSize, (y - camY) * blockSize, blockSize, blockSize);
            }
        }
    }
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWorld();
    player.draw();
}

setInterval(gameLoop, 1000 / 30);  // 30 FPS

// Handle input
document.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowUp':
            player.move(0, -1);
            camY = Math.max(0, player.y - 5);
            break;
        case 'ArrowDown':
            player.move(0, 1);
            camY = Math.min(worldHeight - 15, player.y - 5);
            break;
        case 'ArrowLeft':
            player.move(-1, 0);
            camX = Math.max(0, player.x - 10);
            break;
        case 'ArrowRight':
            player.move(1, 0);
            camX = Math.min(worldWidth - 20, player.x - 10);
            break;
    }
});

// Start the game
document.getElementById('startGameBtn').addEventListener('click', () => {
    document.getElementById('mainMenu').style.display = 'none';
    canvas.style.display = 'block';
});