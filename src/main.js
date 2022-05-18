let config = {
    type: Phaser.AUTO,
    width: 1050,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: { fps: 60 }
    },
    scale: {autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Load, Tutorial, Game1, Story1 ]
}
let game = new Phaser.Game(config); 

// reserve keyboard vars
//let keyS, keySPACE, keyM, keyLEFT, keyRIGHT, keyUP, keyDOWN;
let keyP, keyT, keySPACE, key1, key2, key3;
let cursors;

let borderUISize = game.config.height / 30; 
let borderPadding = borderUISize / 3; 

// set scroll speed
let scrollSpeed = 2.5; //1.6

let leftBound = game.config.height/30;
let rightBound = game.config.width - leftBound;

