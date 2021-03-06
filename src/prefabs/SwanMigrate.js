class SwanMigrate extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, x, y, num) {
        super(scene, path, x, y);
        this.setTexture('swanMigrate');

        // add sprite to scene
        scene.add.existing(this);

        // add physics
        scene.physics.add.existing(this);

        // set hitbox
        this.body.setCircle(55, 15, 10);
        this.body.setMass(200);

        // number label
        this.num = num;
    } // end constructor

    update() {
       
        
    } // end update()
}