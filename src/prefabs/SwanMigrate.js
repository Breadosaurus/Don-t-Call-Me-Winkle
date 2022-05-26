class SwanMigrate extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, x, y, num) {
        super(scene, path, x, y);
        this.setTexture('swanMigrate');

        // add sprite to scene
        scene.add.existing(this);

        // add physics
        scene.physics.add.existing(this);

        // set hitbox
        this.body.setCircle(40, 30, 25);

        // can't be pushed
        this.body.setFriction(0);

        // number label
        this.num = num;
    } // end constructor

    update() {
       
        
    } // end update()
}