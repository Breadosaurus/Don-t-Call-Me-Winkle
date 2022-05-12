class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        
        this.load.path = 'assets/';

        this.load.image('bg_1', 'bg_001.png');

    }

    create() {

        this.scene.start('startScene');

    }

}