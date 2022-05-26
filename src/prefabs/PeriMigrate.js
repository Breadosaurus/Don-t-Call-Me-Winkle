class PeriMigrate extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // setup
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        // hitbox
        this.setCircle(27, 2, 7);

        this.speed = 270;
        this.accel = 1500;
        this.setDrag(this.accel);

        // 
        this.setMaxVelocity(this.speed);


        // this.setBounce(1, 1);

        // randomize function for hit sound
        // this.ouch_1 = scene.sound.add('ouch_1');
        // this.ouch_2 = scene.sound.add('ouch_2');
        this.bumped = false;

        this.move = false;
        // regular speed
        

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
                this.setAccelerationX(-this.accel);
                // this.anims.play('turn', true);
            } else if (cursors.right.isDown) {
                this.setAccelerationX(this.accel);
                // this.anims.play('turn', true);
            } else {
                this.setAccelerationX(0);
            }

            if (cursors.up.isDown) {
                this.setAccelerationY(-this.accel);
                // this.anims.play('up', true);
            } else if (cursors.down.isDown) {
                this.setAccelerationY(this.accel);
            } else {
                this.setAccelerationY(0);
            }
        }
        // if (!this.boost) {
        //     this.y += scrollSpeed;
        // }
        
    } // end update()
}