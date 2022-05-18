class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }

    create() {
        // define keys 
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

        // text styling
        let textConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '46px',
            color: '#b0e3f7',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5, 
            },
        } 

        this.add.text(50, 300, "Don't Call Me Winkle (Please ;^;)", textConfig).setDepth(5);
        // text wrap based on example from http://phaser.io/examples/v3/view/game-objects/text/word-wrap-by-width
        this.make.text({
            x: 50,
            y: 400,
            text:"Here's the deal: You are Periwinkle, a blue-gray gnatcatcher. You've just joined this new flock of mute swans, and they're trying to teach you their migration patterns. You will have two choices for each level: practice, or socialize! Depending on which you choose, you will progress your flight skills or increase your friendship meter with certain birds. Ready to migrate of mingle?!!!",
            style: {
                font: 'bold 25px Comic Sans MS',
                fill: '#b0e3f7',
                wordWrap: { width: 800 }
            }
        });
        this.add.text(50, 600, "Press P to MIGRATE or T to SOCIALIZE", textConfig);
    }

    update() {
        
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.sound.play('menuSelect');
            this.scene.start('game1Scene');
        }

        if (Phaser.Input.Keyboard.JustDown(keyT)) {
            this.sound.play('menuSelect');
            this.scene.start('story1Scene');
        }
    }

}