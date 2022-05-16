class SwanMigrate extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, x, y) {
        super(scene, path, x, y);
        this.setTexture('swanMigrate');
        // add sprite to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
       
        this.body.setImmovable(true);

    } // end constructor

    update() {
       
        
    } // end update()
}