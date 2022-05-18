class Game1 extends Phaser.Scene {
    constructor() {
        super("game1Scene");
    }

    create() {

        this.clouds = this.add.tileSprite(0, 0, 825, 650, 'bg_1').setOrigin(0, 0).setSize(1050, 700);
        
        // define keys
        cursors = this.input.keyboard.createCursorKeys();
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // peri in game
        this.periGame = new PlayerMigrate(this, game.config.width/2, game.config.height/2, 'periMigrate', 0).setScale(0.4);

        // level complete condition
        this.formComplete = false;

        // for the sake of First Playable Build
        let dialogueConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '20px',
            color: '#e0eefb',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5, 
            },
        }
        this.box = this.add.rectangle(game.config.width/10, game.config.height/3, game.config.width - 200, game.config.height/3, 0x172230).setOrigin(0,0);
        this.migrateTutorial = this.add.text(this.box.x + 20, this.box.y + 30, " Welcome to migration practice! Here you will practice getting in formation with the flock. Use the left, right, up, and down arrow keys to move. Try to figure out your spot quick and avoid bumping into your flockmates! Good luck. \n\ \n\ \n\ (Press SPACE to begin)", dialogueConfig).setWordWrapWidth(600);
        this.pass = this.add.text(this.box.x + 20, this.box.y + 30, "Nice work! Can't wait to see you flex your skills for real. Take a break!! \n\ \n\ \n\ (Press T to socialize)", dialogueConfig).setWordWrapWidth(600).setAlpha(0);


    } // end create()

    update() {


        if (!this.formComplete && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('migStart');
            this.box.setAlpha(0);
            this.migrateTutorial.setAlpha(0);
            this.periGame.update();
        }

        this.clouds.tilePositionX -= scrollSpeed;
        
        // for the sake of FPB 
        if (this.formComplete) {
            this.box.setAlpha(1);
            this.pass.setAlpha(1);
            if (Phaser.Input.Keyboard.JustDown(keyT)) {
            this.sound.play('menuSelect');
            this.scene.start('story1Scene');
        }
        }
        
    } // end update()
}