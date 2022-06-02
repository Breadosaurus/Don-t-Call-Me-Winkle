class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        // set load path weehee
        this.load.path = 'assets/';

        // all the good good visual boys we need!!
        this.load.image('bg_1', 'bg_001.png');
        this.load.image('bg_2', 'bg_002.png');
        this.load.image('bg_3', 'bg_003.png');
        this.load.image('clouds_1', 'bg_001_clouds.png');
        this.load.image('clouds_2', 'bg_002_clouds.png');
        this.load.image('clouds_3', 'bg_003_clouds.png');
        this.load.image('periMigrate', 'periMigrate.png');
        this.load.image('swanMigrate', 'swanMigrate.png');
        this.load.image('periStory', 'periStory.png');
        this.load.image('arrow', 'arrow.png');
        this.load.image('jeff', 'jeffrey_thomas.png');

        // load spritesheets
        this.load.spritesheet('periGreen', 'periGreen.png', {frameWidth: 56, frameHeight: 60, startFrame: 0, endFrame: 10});
        this.load.spritesheet('win', 'win.png', {frameWidth: 119, frameHeight: 119, startFrame: 0, endFrame: 3});

        // all the good good audio boys we need
        this.load.audio('menuSelect', 'menuSelect.mp3');
        this.load.audio('migStart', 'migrateStart.mp3');
        this.load.audio('spaceNPC', 'NPC_done.mp3');
        this.load.audio('periChoice', 'periChoice.mp3');

        // temp for chapt 1 lol
        //this.load.image('He', 'jeffrey_thomas.png');
        this.load.image('slowSwan', 'slowSwan.png');

        // preload migration map json file
        this.load.json('migrationMap', 'migrationMap.json');
    }

    create() {
        
        this.scene.start('tutorialScene');

    }

}