class Game1 extends Phaser.Scene {
    constructor() {
        super("startScene");
    }

    create() {

        this.clouds = this.add.tileSprite(0, 0, 825, 650, 'bg_1').setOrigin(0, 0).setSize(1050, 700);
        
        // peri in game
        this.periGame = new PlayerMigrate(this, game.config.width/2, game.config.height/2, 'periMigrate', 0, keyLEFT, keyRIGHT, keyUP, keyDOWN).setScale(0.4);
    
        // level complete condition
        this.formComplete = false;
    }

    update() {

        if (!this.formComplete) {
            this.periGame.update();
        }

        this.clouds.tilePositionX -= scrollSpeed;
        
    }
}