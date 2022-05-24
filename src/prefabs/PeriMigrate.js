class PeriMigrate extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add sprite to scene 
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCircle(20, 4, 15);

        // this.setBounce(1, 1);

        // randomize function for hit sound
        // this.ouch_1 = scene.sound.add('ouch_1');
        // this.ouch_2 = scene.sound.add('ouch_2');
        this.bumped = false;

        this.move = false;
        // regular speed
        this.moveSpeed = 225;

        // speed boost
        // this.boostSpeed = 200;
        // this.formed_1 = scene.sound.add('surf_1');
        // this.formed_2 = scene.sound.add('surf_2');


    } // end constructor

    update() {
        // left/right/up/down mvt
        if (this.scene.formComplete) {
            this.setVelocity(0);
            this.x = this.scene.map[this.scene.form].peri[0];
            this.y = this.scene.map[this.scene.form].peri[1];
        } else if (this.move) {
            if (cursors.left.isDown) {
                this.setVelocityX(-this.moveSpeed);
                // this.anims.play('turn', true);
            } else if (cursors.right.isDown) {
                this.setVelocityX(this.moveSpeed);
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