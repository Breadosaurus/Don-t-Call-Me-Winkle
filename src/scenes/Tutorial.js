class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }

    create() {
        // define keys 
        // keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        // keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

        // text styling
        let textConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '46px',
            color: '#8e87f1',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5, 
            },
        } 

        // add bg
        this.bg = this.add.tileSprite(0, 0, 824, 650, 'bg_1').setOrigin(0, 0).setSize(1050, 768);

        this.add.text(50, 200, "Don't Call Me Winkle (Please ;^;)", textConfig).setDepth(5);
        // text wrap based on example from http://phaser.io/examples/v3/view/game-objects/text/word-wrap-by-width
        this.make.text({
            x: 50,
            y: 300,
            text:"Here's the deal: You are Periwinkle, a blue-gray gnatcatcher. You've just joined this new flock of mute swans, and they're trying to teach you their migration patterns. \n\nYou will have two choices for each level: practice, or socialize! \n\nDepending on which you choose, you will progress your flight skills or increase your friendship bond with certain birds. \n\nReady to migrate or mingle?!!!",
            style: {
                font: 'bold 25px Comic Sans MS',
                fill: '#8e87f1',
                wordWrap: { width: 800 }
            }
        });
        this.add.text(50, 600, "Press 1 to PRACTICE or 2 to SOCIALIZE", textConfig);
    }

    update() {
        
        if (Phaser.Input.Keyboard.JustDown(key1)) {
            this.sound.play('menuSelect');
            this.scene.start('mig1Scene');
        }

        if (Phaser.Input.Keyboard.JustDown(key2)) {
            this.sound.play('menuSelect');
            this.scene.start('story1Scene');
        }
    }

}