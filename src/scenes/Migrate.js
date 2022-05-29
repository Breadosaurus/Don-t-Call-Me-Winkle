class Migrate extends Phaser.Scene {
    constructor() {
        super("migrateScene");
    }

    create() {
        // store current chapter's portion of migration map json file in this.map
        this.map = this.cache.json.get('migrationMap')[`ch${chapter}`];

        // add background and clouds
        this.bg = this.add.tileSprite(0, 0, 1024, 768, `bg_${chapter}`).setOrigin(0, 0);
        this.clouds = this.add.tileSprite(0, 0, 1024, 768, `clouds_${chapter}`).setOrigin(0, 0);

        // set world bounds
        this.physics.world.setBounds(leftBound, topBound, game.config.width - leftBound*2, game.config.height - topBound*2);

        // add peri
        this.peri = new PeriMigrate(this, this.map[0].peri[0], this.map[0].peri[1], 'periMigrate', 0);
        
        // add zone representing peri's spot in form 1
        this.periZone = this.add.zone(this.map[1].peri[0], this.map[1].peri[1]).setSize(30, 30);
        this.physics.world.enable(this.periZone);

        // add arrow, set to invisible
        this.arrow = this.add.image(this.periZone.getBottomRight().x + 10, this.periZone.getBottomRight().y + 10, 'arrow').setOrigin(0, 0).setAlpha(0);

        // create group of swans
        this.swanGroup = this.physics.add.group();

        // create 8 swans; assign them names swan0 through swan8, and positions corresponding to the swanPos0 array
        // add each to swanGroup
        for (let i = 0; i < 8; i++) {
            this[`swan${i}`] = new SwanMigrate(this, null, this.map[0].swans[i][0], this.map[0].swans[i][1], i);
            this.swanGroup.add(this[`swan${i}`]);
        }
        
        // set colliders between peri and swans
        this.physics.add.collider(this.peri, this.swanGroup);

        // swans switch formations faster as chapters progress
        switch (chapter) {
            case 1:
                this.duration = 4000;
                break;
            case 2:
                this.duration = 3000;
                break;
            case 3:
                this.duration = 2000;
                break;
        }

        // create zone timer to measure how long peri has been in correct zone.
        // if peri stays within zone for 500 ms, end formation.
        this.zoneTimerConfig = { delay: 500, callback: () => {
            console.log("success");
            this.timeLimit.paused = true;
            // [ADD CODE HERE]                      // play formation complete sound

            this.formActive = false;                // form is complete

            // immobilize peri and move him to exact correct location
            this.peri.move = false;              
            this.peri.x = this.map[this.form].peri[0];
            this.peri.y = this.map[this.form].peri[1];
            this.pass++;                            // increment number of formations passed
            this.endForm();                         // move to next formation
        }, paused: true };
        this.zoneTimer = this.time.addEvent(this.zoneTimerConfig);

        // create time limit timer to measure whether peri passes formation in time
        // callback fires 2 seconds after swans stop moving
        this.timeLimitConfig = { delay: this.duration + 2000, callback: () => {
            console.log("failed");
            // if practice mode, don't move to next form; indicate which spot peri should be in
            if (practice) {
                // show correct spot
                this.tweens.add({
                    targets: this.arrow,
                    alpha: { from: 0, to: 1 },
                    yoyo: true,
                    repeat: -1
                });
            // if not practice mode, formation is failed; swans move to next formation
            } else {  
                this.zoneTimer.paused = true;
                this.formActive = false;            // form has ended
                this.peri.move = false;             // immobilize peri
                this.endForm();                     // move to next formation
            }
        }, paused: true }; 
        this.timeLimit = this.time.addEvent(this.timeLimitConfig);
        
        // formation active condition
        this.formActive = false; 

        // migration end condition
        this.endMigration = false;

        // current formation
        this.form = 1;

        // number of formations passed
        this.pass = 0;

        // power-ups
        switch (power) {
            case "slow": this.duration += 2000;
            break;

            case "strong": 
            break;

            case "help": 
            break;
        }

        // define keys
        cursors = this.input.keyboard.createCursorKeys();
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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

        this.tutorial = true;

        this.migrateTutorial = this.add.text(this.box.x + 20, this.box.y + 30,
            practice ? 
                "Welcome to migration practice! Here you will practice getting in formation with the flock. Use arrow keys to move. Try to figure out your spot quick and avoid bumping into your flockmates! Good luck. \n\n\n(Press SPACE to begin)" : 

                "Welcome to your first migration! Use arrow keys to move. Try to figure out your spot quick and avoid bumping into your flockmates! Good luck. \n\n\n(Press SPACE to begin)"
        , dialogueConfig).setWordWrapWidth(600);

        this.passPractice = this.add.text(this.box.x + 20, this.box.y + 30, 
            "Nice work! Now, here comes the real deal, hope you remember the formations!! \n\n\n\
            (Press SPACE to continue)"
        , dialogueConfig).setWordWrapWidth(600).setAlpha(0);

        this.passMigrate = this.add.text(this.box.x + 20, this.box.y + 30, null, dialogueConfig).setWordWrapWidth(600).setAlpha(0);
    }
        
//----------------------------------------------------------------------------------------------------
   
    update() {
        // update peri movement
        this.peri.update();

    //-------------------------------------------------------------------------------------------------    
        // if tutorial is active, space key starts migration
        if (this.tutorial && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('migStart');

            // hide tutorial
            this.box.setAlpha(0);
            this.migrateTutorial.setAlpha(0);
            this.tutorial = false;

            // peri can move now
            this.peri.move = true;

            // start time limit timer
            this.timeLimit.paused = false;

            // when swans are done moving, set formActive to true, activating the zone check
            this.time.delayedCall(this.duration, () => {
                this.formActive = true;
            });

            // move swans to formation 1
            for (let swan of this.swanGroup.getChildren()) {
                this.moveSwan(swan);
            }
        }

        // if migration is over, space key progresses you to next chapter or ending
        if (this.endMigration && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('menuSelect');
            // if this was practice mode, restart scene with practice mode OFF
            if (practice) {
                practice = false;
                this.scene.restart();
            // otherwise, progress to next chapter or ending
            } else {
                if (chapter < 3) {
                    chapter++;
                    practice = true;
                    this.scene.start("tutorialScene");
                } else this.scene.start("endScene");
            }
        }

        //-------------------------------------------------------------------------------------------------

        // if formation is active, start timer when peri is in correct zone.
        // if peri moves outside of zone, restart timer.
        if (this.formActive) {
            if (this.physics.overlap(this.peri, this.periZone) && this.zoneTimer.paused) {
                console.log("start timer");
                this.zoneTimer.paused = false;
            } else if (!this.physics.overlap(this.peri, this.periZone) && !this.zoneTimer.paused) {
                console.log("stop timer");
                this.zoneTimer.reset(this.zoneTimerConfig);
                this.time.addEvent(this.zoneTimer);
            }
        }
        
        // scroll background and clouds
        this.bg.tilePositionX -= scrollSpeed;
        this.clouds.tilePositionX -= scrollSpeed + 1.5;
    }

    //-------------------------------------------------------------------------------------------------

    endForm() {
        // if this was the last formation, chapter is complete: progress to next chapter after delay
        if (this.form == 3) {
            this.time.delayedCall(2000, () => {
                this.endMigration = true;

                // end message appears
                this.box.setAlpha(1);
                this.add.text(game.config.width/2, game.config.height/4, 
                    practice ? 'practice complete!':'stage complete!',
                {fontSize: 60, fontWeight: 'bold', color: '#8e87f1'}).setOrigin(0.5).setDepth(2);
                
                this.passMigrate.text = `You passed ${this.pass} out of 3 formations.\n\n${
                    this.pass == 0 ? "Don't give up!" :
                    this.pass == 1 ? "Getting there!" :
                    this.pass == 2 ? "Not bad!" :
                    "Fantastic flying!"}`
            
                this[`pass${practice ? 'Practice' : 'Migrate'}`].setAlpha(1);
            });

        } else {
            // if this was not the last formation, start next formation after delay
            this.time.delayedCall(1000, () => {
                this.form++;       
                console.log(`start formation ${this.form}`);                                   

                // reset zone timer
                console.log(`reset timer`);   
                this.zoneTimer.reset(this.zoneTimerConfig);
                this.time.addEvent(this.zoneTimer);

                // reset time limit timer
                this.timeLimit.reset(this.timeLimitConfig);
                this.time.addEvent(this.timeLimit);
                this.timeLimit.paused = false;

                // let peri move
                this.peri.move = true;

                // move swans
                for (let swan of this.swanGroup.getChildren()) {
                    this.moveSwan(swan);
                }

                // after swans have finished moving, set periZone to next correct spot
                this.time.delayedCall(this.duration, () => {
                    this.periZone.x = this.map[this.form].peri[0];
                    this.periZone.y = this.map[this.form].peri[1];
                    this.formActive = true;
                    console.log(`end formation ${this.form}`); 
                });
            });     
        }
    }

    //-------------------------------------------------------------------------------------------------
    
    // move swan to next spot
    moveSwan(swan) {
        // array containing swan's coordinates in current form and its coordinates in the next form
        let points = [
            swan.x, swan.y,
            this.map[this.form].swans[swan.num][0], this.map[this.form].swans[swan.num][1]
        ];

        // create path from the two endpoints defined above
        swan.path = new Phaser.Curves.Line(points);

        // move swan along path
        swan.startFollow({
            ease: 'Sine.easeInOut',
            duration: this.duration
        });
    }
}