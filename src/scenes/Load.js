class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        // set load path weehee
        this.load.path = 'assets/';

        // all the good good visual boys we need!!
        this.load.image('bg_1', 'bg_001.png');
        this.load.image('periMigrate', 'periMigrate.png');
        this.load.image('swanMigrate', 'swanMigrate.png');
        this.load.image('periStory', 'periStory.png');

        // all the good good audio boys we need
        this.load.audio('menuSelect', 'menuSelect.mp3');
        this.load.audio('migStart', 'migrateStart.mp3');
        this.load.audio('spaceNPC', 'NPC_done.mp3');
        this.load.audio('periChoice', 'periChoice.mp3');

        // temp for chapt 1 lol
        this.load.image('He', 'jeffrey_thomas.png');

        // preload migration map json file
        this.load.json('migrationMap', 'migrationMap.json');
    }

    create() {
        
        this.scene.start('tutorialScene');

    }

}