class Start extends Phaser.Scene {
    constructor() {
        super("startScene");
    }

    create() {

        this.clouds = this.add.tileSprite(0, 0, 825, 650, 'bg_1').setOrigin(0, 0);
        
    }

    update() {

        this.clouds.tilePositionX -= scrollSpeed;
        
    }
}