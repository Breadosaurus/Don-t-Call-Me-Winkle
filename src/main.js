let config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    physics: {
        default: 'arcade',
        arcade: { 
            debug: false,
            fps: 60 }
        },
    scale: {autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: false,
    scene: [Load, Tutorial, Migrate, Story, Ending]
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let cursors;
let key1, key2, key3, keySPACE;

let borderUISize = game.config.height / 30; 
let borderPadding = borderUISize / 3; 

// set scroll speed
let scrollSpeed = 1.5;

let leftBound = 20;
let rightBound = game.config.width - leftBound;
let topBound = 20;
let btmBound = game.config.height - topBound;

// start game in practice mode (turns off after player completes first practice or story)
let practice = true;

// start game at chapter 1
let chapter = 0;

// variable to hold power ups
let power;

// variable for which swan is chosen if socializing
let swanChoice = "jet"