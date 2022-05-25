class Ending extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

    create() {
        this.jeff = this.add.image(game.config.width/2, game.config.height/2, 'jeff');

        this.add.text(game.config.width/2, game.config.height/5, 'ENDING!', {fontSize: 60, fontWeight: 'bold', color: '#8e87f1'}).setOrigin(0.5).setDepth(1);
    } 

    update() {

    }
}