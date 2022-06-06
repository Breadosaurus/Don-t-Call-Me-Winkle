class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        // set load path weehee
        this.load.path = 'assets/';

        // load migration assets
        this.load.image('sky1', 'img/sky1.png');
        this.load.image('sky2', 'img/sky2.png');
        this.load.image('sky3', 'img/sky3.png');
        this.load.image('clouds1', 'img/clouds1.png');
        this.load.image('clouds2', 'img/clouds2.png');
        this.load.image('clouds3', 'img/clouds3.png');
        this.load.image('periMigrate', 'img/periMigrate.png');
        this.load.image('swanMigrate', 'img/swanMigrate.png');
        this.load.image('arrow', 'img/arrow.png');
        this.load.image('textbox', 'img/textbox2.png')
        this.load.spritesheet('periGreen', 'img/periGreen.png', {frameWidth: 56, frameHeight: 60, startFrame: 0, endFrame: 10});
        this.load.spritesheet('win', 'img/win.png', {frameWidth: 119, frameHeight: 119, startFrame: 0, endFrame: 3});

        // load story assets
        this.load.image('bg', 'img/bg.png');
        this.load.image('jet', 'img/jet.png');
        this.load.image('periStory', 'img/periStory.png');
        this.load.image('sloane', 'img/sloane.png');
        this.load.image('siesta', 'img/siesta.png');
        this.load.image('kenneth', 'img/kenneth.png');
        this.load.image('swanBox', 'img/swanBox.png');
        this.load.image('periBox', 'img/periBox.png');
        //this.load.image('jeff', 'img/jeffrey_thomas.png');

        // all the good good audio boys we need
        this.load.audio('menuSelect', 'audio/menuSelect.mp3');
        this.load.audio('migStart', 'audio/migrateStart.mp3');
        this.load.audio('spaceNPC', 'audio/NPC_done.mp3');
        this.load.audio('periChoice', 'audio/periChoice.mp3');


        // preload migration map json file
        this.load.json('migrationMap', 'json/migrationMap.json');
        this.load.json('dialogue', 'json/dialogue.json');
    }

    create() {
         // create animations
         this.anims.create({
            key: 'periGreen',
            frames: this.anims.generateFrameNumbers('periGreen', {start: 0, end: 10, first: 0}),
            duration: 700
        });
        this.anims.create({
            key: 'win',
            frames: this.anims.generateFrameNumbers('win', {start: 0, end: 3, first: 0}),
            fps: 30
        });
        this.scene.start('tutorialScene');

    }
}