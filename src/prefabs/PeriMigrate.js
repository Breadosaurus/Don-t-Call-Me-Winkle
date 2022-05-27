class PeriMigrate extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // setup
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true, 0, 0);

        // hitbox
        this.setCircle(20, 10, 15);

        // set speed and acceleration
        this.speed = 270;
        this.setMaxVelocity(this.speed);
        this.accel = 1500;
        this.setDrag(this.accel);

        // set bounce and mass
        this.setBounce(1, 1);
        this.setMass(100);

        // peri cannot move at first
        this.move = false;
    } // end constructor

    update() {
        // left/right/up/down mvt
        if (this.move) {
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
        } else {
            this.setAcceleration(0);
        }
    } // end update()
}