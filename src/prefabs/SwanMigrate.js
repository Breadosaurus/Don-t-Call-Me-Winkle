class SwanMigrate extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, x, y, num) {
        super(scene, path, x, y);
        this.setTexture('swanMigrate');

        // add sprite to scene
        scene.add.existing(this);

        // add physics
        scene.physics.add.existing(this);

        // can't be pushed
        this.body.setImmovable(true);

        // number label
        this.num = num;
    } // end constructor

    update() {
       
        
    } // end update()
}