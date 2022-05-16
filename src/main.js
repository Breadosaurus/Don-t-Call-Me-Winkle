let config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    physics: {
        default: 'arcade',
        arcade: { fps: 60 }
    },
    scale: {autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Load, Game1]
}
let game = new Phaser.Game(config);

let cursors;

let borderUISize = game.config.height / 30; 
let borderPadding = borderUISize / 3; 

// set scroll speed
let scrollSpeed = 2.5; //1.6

let leftBound = game.config.height/30;
let rightBound = game.config.width - leftBound;

