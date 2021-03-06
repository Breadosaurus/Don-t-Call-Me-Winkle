class Migrate extends Phaser.Scene {
    constructor() {
        super("migrateScene");
    }

    create() {
        // fade in scene
        this.cameras.main.fadeIn(400, 0, 0, 0);

        // store current chapter's portion of migration map json file in this.map
        this.map = this.cache.json.get('migrationMap')[`ch${chapter}`];

        // if practice, clear powerup 
        if (practice) power = null;

        // add background and clouds
        this.bg = this.add.tileSprite(0, 0, 1024, 768, `sky${chapter}`).setOrigin(0, 0);
        this.clouds = this.add.tileSprite(0, 0, 1024, 768, `clouds${chapter}`).setOrigin(0, 0);
        
        // create sounds
        this.bump1 = this.sound.add('bump1');
        this.bump2 = this.sound.add('bump2');
        this.bump3 = this.sound.add('bump3');
        this.bump4 = this.sound.add('bump4');
        this.bump5 = this.sound.add('bump5');
        this.bump6 = this.sound.add('bump6');
        this.win = this.sound.add('win');

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
        
        

        if (power != 'sloane') {                   // SLOANE POWERUP: you don't collide with other swans
            // set colliders between peri and swans
            this.physics.add.collider(this.peri, this.swanGroup, () => {
                // randomize collision sfx (later)
                if (!this.bumped) {
                    this.bumped = true;
                    let sound = Phaser.Math.Between(1, 6);
                    this[`bump${sound}`].play();
                    this.time.delayedCall(700, () => {
                        this.bumped = false;
                    });
                }  
            });
        }
    
        // swans switch formations faster as chapters progress
        switch (chapter) {
            case 1:
                this.duration = 3500;
                break;
            case 2:
                this.duration = 3000;
                break;
            case 3:
                this.duration = 2500;
                break;
        }

        // SIESTA POWERUP: swans take longer to switch formations, giving you extra time
        if (power == 'siesta') {
            this.duration += 1000;
        }

        // create zone timer to measure how long peri has been in correct zone.
        // if peri stays within zone for 700 ms, end formation.
        this.zoneTimerConfig = { delay: 700, callback: () => {
            this.timeLimit.paused = true;
            
            this.win.play();              // trumpets from heaven!! (play success sound :))

            if (this.arrowTween && this.arrowTween.isPlaying()) {          // fade out arrow if visible
                this.arrowTween.stop();
            }

            this.peri.anims.stop();
            this.peri.anims.setProgress(0);

            this.formActive = false;                    // form is complete
            this.peri.x = this.map[this.form].peri[0];  // immobilize peri and move him to exact correct location
            this.peri.y = this.map[this.form].peri[1];
            this.peri.move = false;

            this.pass++;                                // increment number of formations passed

            // add frame around peri, fade out after anim
            let frame = this.add.sprite(this.peri.x -5, this.peri.y, 'win');
            frame.anims.play('win');
            frame.on('animationcomplete', () => {
                this.fadeOut(null, frame);
            });

            this.time.delayedCall(2000, () => {
                frame.destroy();
                this.endForm();                             // move to next formation
            })
        }, paused: true };
        this.zoneTimer = this.time.addEvent(this.zoneTimerConfig);

        // create time limit timer to measure whether peri passes formation in time
        // callback fires 1.5 seconds after swans stop moving
        this.timeLimitConfig = { delay: this.duration + 1500, callback: () => {
            // if peri is currently in zone, don't trigger callback
            if (!this.physics.overlap(this.peri, this.periZone)){
                // if practice mode, don't move to next form; indicate which spot peri should be in
                if (practice) {
                    // show correct spot
                    this.arrowTween = this.tweens.add({
                        targets: this.arrow,
                        duration: 700,
                        alpha: { from: 0, to: 1 },
                        ease: 'Cubic',
                        yoyo: true,
                        loop: -1,
                        callbackScope: this,
                        onStop: this.fadeOut
                    });
                // if not practice mode, formation is failed; swans move to next formation
                } else {  
                    this.zoneTimer.paused = true;
                    this.formActive = false;            // form has ended
                    this.sound.play('fail');            // play fail sound :(
                    this.peri.move = false;             // immobilize peri
                    this.time.delayedCall(2000, () => {
                        this.endForm();                     // move to next formation
                    })
                }
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

        // define keys
        cursors = this.input.keyboard.createCursorKeys();

//-------------------------------------------------------------------------------------------------
        
        // dialogue appearance
        let dialogueConfig = {
            fontFamily: 'handwrite',
            fontSize: '24px',
            color: '#4e5f8e',
            align: 'left',
            padding: {
                top: 10,
                bottom: 5, 
            },
            autoRound: true,
            resolution: 2.5
        }
        this.box = this.add.image(game.config.width/2, game.config.height/2, 'swanBox').setOrigin(0.5,0.5);

        this.tutorial = true;

        this.migrateTutorial = this.add.text(this.box.x, this.box.y -4,
            practice ? 
                "Welcome to migration practice! Here, you can take your time and practice finding your spot in the formation. Use the arrow keys to fly around, and try not to bump into anyone. Good luck!\n\n(Press SPACE to begin)" : 

                `Welcome to your ${chapter == 1 ? 'first' : chapter == 2 ? 'second' : 'third and final'} migration! Remember, use the arrow keys to find your spot in the formation before time runs out. Good luck!\n\n(Press SPACE to begin)`
        , dialogueConfig).setWordWrapWidth(600);
        this.migrateTutorial.setOrigin(0.5,0.5);
        this.passPractice = this.add.text(this.box.x, this.box.y - 4, 
            "Nice work! Now, here comes the real deal, hope you remember the formations!! \n\n\(Press SPACE to continue)"
        , dialogueConfig).setWordWrapWidth(600).setAlpha(0);
        this.passPractice.setOrigin(0.5,0.5); 
        this.passMigrate = this.add.text(this.box.x + 20, this.box.y + 30, null, dialogueConfig).setWordWrapWidth(600).setAlpha(0);
    }
        
//----------------------------------------------------------------------------------------------------
   
    update() {
        // update peri movement
        this.peri.update();

    //-------------------------------------------------------------------------------------------------    
        // if tutorial is active, space key starts migration
        if (this.tutorial && Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.sound.play('migStart');

            // hide tutorial
            this.box.setAlpha(0);
            this.migrateTutorial.setAlpha(0);
            this.tutorial = false;

            // KENNETH POWERUP: shows correct spot before switching formations
            if (power == 'kenneth') {
                this.arrowTween = this.tweens.add({
                    targets: this.arrow,
                    duration: 700,
                    alpha: { from: 0, to: 1 },
                    ease: 'Cubic',
                    yoyo: true,
                    loop: -1,
                    callbackScope: this,
                    onStop: this.fadeOut
                });
            }
            
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
        if (this.endMigration && Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.sound.play('menuSelect');
            // if this was practice mode, restart scene with practice mode OFF and no powerups
            if (practice) {
                practice = false;
                this.scene.restart();
            // otherwise, progress to next chapter or ending
            } else {
                // fade to black
                this.cameras.main.fadeOut(400);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                    // go to next scene
                    this.time.delayedCall(200, () => {
                        if (chapter < 3) {
                            chapter++;
                            practice = true;
                            this.scene.start("tutorialScene");
                        } else this.scene.start("endScene");
                    })
                }); 
                
            }
        }

        //-------------------------------------------------------------------------------------------------

        // if formation is active, start timer when peri is in correct zone.
        // if peri moves outside of zone, restart timer.
        if (this.formActive) {
            if (this.physics.overlap(this.peri, this.periZone)) {
                if (this.zoneTimer.paused) {
                    this.zoneTimer.paused = false;
                    this.peri.anims.stop();
                    this.peri.anims.play('periGreen');
                }
            } else if (!this.zoneTimer.paused) {
                this.peri.anims.reverse();
                this.peri.anims.stopOnFrame(0);
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
            // end of migration
            this.endMigration = true;
            
            // increment # formations passed
            if (this.pass > 1) {
                migrationsPassed++;
            }

            // end message appears
            this.box.setAlpha(1);
            this.add.text(game.config.width/2, game.config.height/6, 
                practice ? 'PRACTICE COMPLETE!':'MIGRATION COMPLETE!',
            {fontFamily: 'handwrite', fontSize: 60, fontWeight: 'bold', color: '#4e5f8e', stroke: '#eef7ff', strokeThickness: 8}).setOrigin(0.5).setDepth(2);
            
            this.passMigrate.text = `You passed ${this.pass} out of 3 formations.\n\n${
                this.pass == 0 ? "Don't give up!" :
                this.pass == 1 ? "Getting there!" :
                this.pass == 2 ? "Not bad!" :
                "Fantastic flying!"}`
            this.passMigrate.setOrigin(0.5,0.5);
            this.passMigrate.setPosition(game.config.width/2, game.config.height/2 - 4);
            this[`pass${practice ? 'Practice' : 'Migrate'}`].setAlpha(1);

        } else {
            // if this was not the last formation, start next formation
            this.form++;                                    

            // reset zone timer
            this.zoneTimer.reset(this.zoneTimerConfig);
            this.time.addEvent(this.zoneTimer);

            // reset time limit timer
            this.timeLimit.reset(this.timeLimitConfig);
            this.time.addEvent(this.timeLimit);
            this.timeLimit.paused = false;

            // let peri move
            this.peri.move = true;

            // KENNETH POWERUP: shows correct spot before switching formations
            if (power == 'kenneth') {
                this.arrowTween = this.tweens.add({
                    targets: this.arrow,
                    duration: 700,
                    alpha: { from: 0, to: 1 },
                    ease: 'Cubic',
                    yoyo: true,
                    loop: -1,
                    callbackScope: this,
                    onStop: this.fadeOut
                });
            }   

            // move zone and arrow
            this.periZone.x = this.map[this.form].peri[0];
            this.periZone.y = this.map[this.form].peri[1];
            this.arrow.x = this.periZone.getBottomRight().x + 10;
            this.arrow.y = this.periZone.getBottomRight().y + 10;

            // move swans
            for (let swan of this.swanGroup.getChildren()) {
                this.moveSwan(swan);
            }

            // after swans have finished moving, start zone checks
            this.time.delayedCall(this.duration, () => {
                this.formActive = true;
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

    fadeOut(tween, targets) {
        this.tweens.add({
            targets: targets,
            alpha: { from: targets.alpha, to: 0 },
            duration: 500,
            repeat: 0
        });
    }

}