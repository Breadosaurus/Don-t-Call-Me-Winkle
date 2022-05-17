class Migrate1 extends Phaser.Scene {
    constructor() {
        super("startScene");
    }

    create() {
        // current chapter
        this.chapter = 1;

        // current formation
        this.formation = 1;
        this.paths = new Phaser.Curves.Path(this.cache.json.get('paths'));
        this.clouds = this.add.tileSprite(0, 0, 824, 650, 'bg_1').setOrigin(0, 0).setSize(1024, 768);
        
        // define keys
        cursors = this.input.keyboard.createCursorKeys();
        
        this.centerX = game.config.width/2;
        this.centerY = game.config.height/2;

        // this.topBound = 50;
        // this.btmBound = game.config.height - 50;
        // this.leftBound = 200;
        // this.rightBound = game.config.width - 200;

        this.swanPos0 = [
            [824,100],
            //[824,650], (peri)
            [512,242],
            [356,313],
            [200,384],
            [356,455],
            [512,526],
            [668,597],
            [824,668]
        ];

        this.swanPos1 = [ 
            [824,668], 
            [200,384], 
            [824,100],
            [408,289],
            [616,195],
            [408,479], 
            //[616,573], (peri)
            [824,289], 
            [824,479]
        ];

        this.periPos0 = [668,171];

        // add peri
        this.peri = new PeriMigrate(this, this.periPos0[0], this.periPos0[1], 'periMigrate', 0).setScale(0.2).setInteractive();
        
        this.periPos1 = [616,573];
        this.periZone = this.add.zone(this.periPos1[0], this.periPos1[1]).setSize(25, 25);

        this.physics.world.enable(this.periZone);

        this.points = [];
        this.path = new Phaser.Curves.Spline(this.points);

        // add swans
        // create 8 swans; assign them names swan0 through swan8, and positions corresponding to the swanPos0 array
        for (let i = 0; i < 8; i++) {
            let points = [
                this.swanPos0[i][0], this.swanPos0[i][1],
                this.swanPos1[i][0], this.swanPos1[i][1]
            ];
            let path = new Phaser.Curves.Spline(points);
            this[`swan${i}`] = new SwanMigrate(this, path, this.swanPos0[i][0], this.swanPos0[i][1]).setScale(0.19);
            this[`swan${i}`].startFollow({
                ease: 'Sine.easeInOut',
                duration: 3000
            });
            this.physics.add.collider(this.peri, this[`swan${i}`]);
        }

        // formation complete condition
        this.formComplete = false; 

        this.zoneTimerConfig = { delay: 1000, callback: () => {
            this.formComplete = true;
            console.log("form complete");
        }, paused: true };

        this.zoneTimer = this.time.addEvent(this.zoneTimerConfig);
    }

    update() {
        this.peri.update();

        if (!this.formComplete) {
            if (this.physics.overlap(this.peri, this.periZone)) {
                this.zoneTimer.paused = false;
            } else if (!this.zoneTimer.paused) {
                this.zoneTimer.reset(this.zoneTimerConfig);
            };
        }
        
        

        this.clouds.tilePositionX -= scrollSpeed;
        // if peri stays within bounds of the correct spot for [x amt of time], this.formComplete = true
    }
}