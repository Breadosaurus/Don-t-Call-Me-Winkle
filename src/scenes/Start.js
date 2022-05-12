class Start extends Phaser.Scene {
    constructor() {
        super("startScene");
    }

    create() {

        this.clouds = this.add.tileSprite(0, 0, 825, 650, 'bg_1').setOrigin(0, 0).setSize(1050, 700);
        
    }

    update() {

        this.clouds.tilePositionX -= scrollSpeed;
        
    }
}