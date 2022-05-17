class Game1 extends Phaser.Scene {
    constructor() {
        super("game1Scene");
    }

    create() {

        this.clouds = this.add.tileSprite(0, 0, 825, 650, 'bg_1').setOrigin(0, 0).setSize(1050, 700);
        
        // define keys
        cursors = this.input.keyboard.createCursorKeys();
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

        // peri in game
        this.periGame = new PlayerMigrate(this, game.config.width/2, game.config.height/2, 'periMigrate', 0).setScale(0.4);

        // level complete condition
        this.formComplete = false;


    }

    update() {

        if (!this.formComplete) {
            this.periGame.update();
        }

        this.clouds.tilePositionX -= scrollSpeed;
        
        // for the sake of FPB 
        if (Phaser.Input.Keyboard.JustDown(keyT)) {
            // this.sound.play('storyChoice');
            this.scene.start('story1Scene');
        }
    }
}