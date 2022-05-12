let config = {
    type: Phaser.AUTO,
    width: 825,
    height: 650,
    physics: {
        default: 'arcade',
        arcade: { fps: 60 }
    },
    scale: {autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Load, Start]
}
let game = new Phaser.Game(config); 

// reserve keyboard vars
let keyS, keySPACE, keyM, keyLEFT, keyRIGHT, keyUP, keyDOWN;

let borderUISize = game.config.height / 30; 
let borderPadding = borderUISize / 3; 

// set scroll speed
let scrollSpeed = 2.5; //1.6

let leftBound = game.config.height/30;
let rightBound = game.config.width - leftBound;

