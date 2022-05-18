class Migrate1 extends Phaser.Scene {
    constructor() {
        super("mig1Scene");
    }

    create() {
        // current chapter
        this.chapter = 1;

        // current formation
        this.form = 1;
        this.paths = new Phaser.Curves.Path(this.cache.json.get('paths'));
        this.clouds = this.add.tileSprite(0, 0, 824, 650, 'bg_1').setOrigin(0, 0).setSize(1050, 768);
        
        // define keys
        cursors = this.input.keyboard.createCursorKeys();
        //-------------------------------------------------------------------------------------------------
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //-------------------------------------------------------------------------------------------------

        this.centerX = game.config.width/2;
        this.centerY = game.config.height/2;

        // this.topBound = 50;
        // this.btmBound = game.config.height - 50;
        // this.leftBound = 200;
        // this.rightBound = game.config.width - 200;

        // store ch1 portion of json file in this.map
        this.map = this.cache.json.get('migrationMap').ch1;

        // add peri
        this.peri = new PeriMigrate(this, this.map[0].peri[0], this.map[0].peri[1], 'periMigrate', 0).setScale(0.2).setInteractive();
        
        this.periZone = this.add.zone(this.map[1].peri[0], this.map[1].peri[1]).setSize(25, 25);

        this.physics.world.enable(this.periZone);

        this.points = [];
        this.path = new Phaser.Curves.Spline(this.points);

        // add swans
        // create 8 swans; assign them names swan0 through swan8, and positions corresponding to the swanPos0 array
        for (let i = 0; i < 8; i++) {
            this[`swan${i}`] = new SwanMigrate(this, null, this.map[0].swans[i][0], this.map[0].swans[i][1], i).setScale(0.19);
            this.physics.add.collider(this.peri, this[`swan${i}`]);
            this.moveSwan(this[`swan${i}`]);
        }

        // formation complete condition
        this.formComplete = false; 

        this.zoneTimerConfig = { delay: 1000, callback: () => {
            this.endForm();
        }, paused: true };

        this.zoneTimer = this.time.addEvent(this.zoneTimerConfig);



//-------------------------------------------------------------------------------------------------
        // for the sake of First Playable Build
        let dialogueConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '20px',
            color: '#e0eefb',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5, 
            },
        }
        this.box = this.add.rectangle(game.config.width/10, game.config.height/3, game.config.width - 200, game.config.height/3, 0x172230).setOrigin(0,0);
        this.migrateTutorial = this.add.text(this.box.x + 20, this.box.y + 30, " Welcome to migration practice! Here you will practice getting in formation with the flock. Use the left, right, up, and down arrow keys to move. Try to figure out your spot quick and avoid bumping into your flockmates! Good luck. \n\ \n\ \n\ (Press SPACE to begin)", dialogueConfig).setWordWrapWidth(600);
        this.pass = this.add.text(this.box.x + 20, this.box.y + 30, "Nice work! Can't wait to see you flex your skills for real. Take a break!! \n\ \n\ \n\ (Press T to socialize)", dialogueConfig).setWordWrapWidth(600).setAlpha(0);
//----------------------------------------------------------------------------------------------------



    }

    update() {
        
        this.peri.update();


    //-------------------------------------------------------------------------------------------------    
        if (!this.formComplete && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('migStart');
            this.box.setAlpha(0);
            this.migrateTutorial.setAlpha(0);            
        }
    //-------------------------------------------------------------------------------------------------

        if (!this.formComplete) {
            if (this.physics.overlap(this.peri, this.periZone)) {
                this.zoneTimer.paused = false;
            } else if (!this.zoneTimer.paused) {
                this.zoneTimer.reset(this.zoneTimerConfig);
            };
        }
        
        this.clouds.tilePositionX -= scrollSpeed;

    //-------------------------------------------------------------------------------------------------
        if (this.formComplete && this.form == 3) {
            this.time.delayedCall(2000, () => {
                this.box.setAlpha(1);
                this.pass.setAlpha(1);
            });
            if (Phaser.Input.Keyboard.JustDown(keyT)) {
                this.sound.play('menuSelect');
                this.scene.start('story1Scene');
                
            }
        }
        
    //-------------------------------------------------------------------------------------------------

    }

    endForm() {
        this.formComplete = true;

        // play formation complete sound


        // if this was the last formation, chapter is complete: progress to next chapter
        if (this.form == 3) {
            this.time.delayedCall(2000, () => {
                this.add.text(game.config.width/2, game.config.height/4,'stage complete!', {fontSize: 60, fontWeight: 'bold', color: '#8e87f1'}).setOrigin(0.5).setDepth(1);
                //this.scene.start('story2Scene');
       
            });

        } else {
            this.time.delayedCall(1000, () => {
                this.form++;
                this.periZone.x = this.map[this.form].peri[0];
                this.periZone.y = this.map[this.form].peri[1];
                this.formComplete = false;
                this.zoneTimer.remove();
                this.zoneTimer = this.time.addEvent(this.zoneTimerConfig);

                for (let i = 0; i < 8; i++) {
                    this.moveSwan(this[`swan${i}`]);
                };
            });     
        }
    }

    moveSwan(swan) {
        let points = [
            swan.x, swan.y,
            this.map[this.form].swans[swan.num][0], this.map[this.form].swans[swan.num][1]
        ];
        swan.path = new Phaser.Curves.Spline(points);
        swan.startFollow({
            ease: 'Sine.easeInOut',
            duration: 3000
        });
    }
}