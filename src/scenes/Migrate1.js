class Game1 extends Phaser.Scene {
    constructor() {
        super("startScene");
    }

    create() {
        this.chapter = 1;
        this.paths = new Phaser.Curves.Path(this.cache.json.get('paths'));
        this.clouds = this.add.tileSprite(0, 0, 825, 650, 'bg_1').setOrigin(0, 0).setSize(1024, 768);
        
        // define keys
        cursors = this.input.keyboard.createCursorKeys();
        
        this.centerX = game.config.width/2;
        this.centerY = game.config.height/2;

        // add peri
        this.peri = new PeriMigrate(this, 653, 194, 'periMigrate', 0).setScale(0.2);

        this.points = [ this.centerX - 200, this.centerY, this.centerX, this.centerY - 200, this.centerX + 200, this.centerY ];
        this.path = new Phaser.Curves.CubicBezier(this.points);

        this.startPts = [
            [795, 130],
            [512, 257],
            [371, 321],
            [230, 384],
            [371, 448],
            [512, 511],
            [653, 575],
            [794, 638]
        ];

        // add swans
        for (let i = 0; i < 8; i++) {
            this[`swan${i}`] = new SwanMigrate(this, this.path, this.startPts[i][0], this.startPts[i][1]).setScale(0.15);
            this.physics.add.collider(this.peri, this[`swan${i}`]);
        }

        // this.swan1.startFollow({
        //     duration: 1000,
        //     rotateToPath: true
        // });

        // level complete condition
        this.formComplete = false;
    }

    update() {
        if (!this.formComplete) {
            this.peri.update();
        }

        this.clouds.tilePositionX -= scrollSpeed;
        
        

        // if peri stays within bounds of the correct spot for [x amt of time], this.formComplete = true
    }
}