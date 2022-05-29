class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }

    create() {
        // define keys 
        cursors = this.input.keyboard.createCursorKeys();

        // text styling
        let textConfig = {
            fontFamily: 'handwrite',
            fontSize: '46px',
            color: '#8e87f1',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5, 
<<<<<<< HEAD
            },
            autoRound: true,
=======
            }
>>>>>>> d4578936c3e08b687d118fc8d9ac0611de74e4c2
        } 

        // add bg
        this.bg = this.add.tileSprite(0, 0, 1024, 768, `bg_${chapter}`).setOrigin(0, 0);

        this.add.text(50, 200, "Periwinkle", textConfig).setDepth(5);
        // text wrap based on example from http://phaser.io/examples/v3/view/game-objects/text/word-wrap-by-width
        this.make.text({
            x: 50,
            y: 300,
            text:"Here's the deal: You are Periwinkle, a blue-gray gnatcatcher. You've just joined this new flock of mute swans, and they're trying to teach you their migration patterns. \n\nYou will have two choices for each level: practice, or socialize! \n\nDepending on which you choose, you will progress your flight skills or increase your friendship bond with certain birds. \n\nReady to migrate or mingle?!!!",
            style: {
                font: 'bold 25px Comic Sans MS',
                fill: '#8e87f1',
                wordWrap: { width: 800 },
                autoRound: true,
            }
        });
        this.add.text(50, 600, "Press 1 to PRACTICE or 2 to SOCIALIZE", textConfig);
    }

    update() {
        
        if (Phaser.Input.Keyboard.JustDown(cursors.one)) {
            this.sound.play('menuSelect');
            this.scene.start('migrateScene');
        }

        if (Phaser.Input.Keyboard.JustDown(cursors.two)) {
            this.sound.play('menuSelect');
            this.scene.start('storyScene');
        }
    }

}