class PlayerMigrate extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add sprite to scene 
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // this.setBounce(1, 1);

        // randomize function for hit sound
        // this.ouch_1 = scene.sound.add('ouch_1');
        // this.ouch_2 = scene.sound.add('ouch_2');
        this.bumped = false;

        // regular speed
        this.moveSpeed = 225;

        // speed boost
        // this.boostSpeed = 200;
        // this.formed_1 = scene.sound.add('surf_1');
        // this.formed_2 = scene.sound.add('surf_2');

    } // end constructor

    update() {
        // left/right/up/down mvt
        if(!this.bumped) {
            if (cursors.left.isDown) {
                this.setVelocityX(-this.moveSpeed);
                // this.setFlip(true, false);
                // this.anims.play('turn', true);
            } else if (cursors.right.isDown) {
                this.setVelocityX(this.moveSpeed);
                // this.resetFlip();
                // this.anims.play('turn', true);
            } else {
                this.setVelocityX(0);
            }

            if (cursors.up.isDown) {
                this.setVelocityY(-this.moveSpeed);
                // this.anims.play('up', true);
            } else if (cursors.down.isDown) {
                this.setVelocityY(this.moveSpeed);
            } 
            else {
                this.setVelocityY(0);
            }
        }
        // if (!this.boost) {
        //     this.y += scrollSpeed;
        // }
        
    } // end update()
}