class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        // set load path weehee
        this.load.path = 'assets/';

        // all the good good boys we need!!
        this.load.image('bg_1', 'bg_001.png');
        this.load.image('periMigrate', 'periMigrate.png');
        this.load.image('swanMigrate', 'swanMigrate.png');

        // temp for chapt 1 lol
        this.load.image('He', 'jeffrey_thomas.jpg');

    }

    create() {
        
        this.scene.start('tutorialScene');

    }

}