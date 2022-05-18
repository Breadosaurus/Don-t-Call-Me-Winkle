class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        // set load path weehee
        this.load.path = 'assets/';

        // all our good good boys we need!!
        this.load.image('bg_1', 'bg_001.png');
        this.load.image('periMigrate', 'periMigrate.png');
        this.load.image('swanMigrate', 'swanMigrate.png');

        // preload migration map json file
        this.load.json('migrationMap', 'migrationMap.json');
    }

    create() {

        this.scene.start('startScene');

    }

}