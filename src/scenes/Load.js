class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        // set load path weehee
        this.load.path = 'assets/';

        // all the good good visual boys we need!!
        this.load.image('bg_1', 'img/bg_001.png');
        this.load.image('bg_2', 'img/bg_002.png');
        this.load.image('bg_3', 'img/bg_003.png');
        this.load.image('clouds_1', 'img/bg_001_clouds.png');
        this.load.image('clouds_2', 'img/bg_002_clouds.png');
        this.load.image('clouds_3', 'img/bg_003_clouds.png');
        this.load.image('periMigrate', 'img/periMigrate.png');
        this.load.image('swanMigrate', 'img/swanMigrate.png');
        this.load.image('periStory', 'img/periStory.png');
        this.load.image('slowSwan', 'img/slowSwan.png');
        this.load.image('strongSwan', 'img/strongSwan.png');

        this.load.image('jeff', 'img/jeffrey_thomas.png');

        // all the good good audio boys we need
        this.load.audio('menuSelect', 'audio/menuSelect.mp3');
        this.load.audio('migStart', 'audio/migrateStart.mp3');
        this.load.audio('spaceNPC', 'audio/NPC_done.mp3');
        this.load.audio('periChoice', 'audio/periChoice.mp3');


        // preload migration map json file
        this.load.json('migrationMap', 'json/migrationMap.json');
        this.load.json('swanDialogue', 'json/swanDialogue.json');
        this.load.json('periDialogue', 'json/periDialogue.json');
    }

    create() {
        
        this.scene.start('tutorialScene');

    }

}