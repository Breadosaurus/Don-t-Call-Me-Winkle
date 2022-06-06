class Ending extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

    create() {
        // define keys
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        this.end = this.add.sprite(0, 0, 'ending').setOrigin(0, 0);         // end screen sprite to "hold" animation
        this.end.play('endAnim', true);                     // play end screen animation

        // lock C input when menu is the only option
        this.endingOn = true;
        

    }

    update() {
        // check for input to switch scenes
        if (this.endingOn && Phaser.Input.Keyboard.JustDown(keyC)) {
            this.sound.play('menuSelect');
            this.credits = this.add.sprite(0, 0, 'credits').setOrigin(0, 0);
            this.credits.play('creditAnim');
            this.endingOn = false;
            
        }
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.sound.play('uiSelect');
            this.scene.start('tutorialScene');
        }

    }
}