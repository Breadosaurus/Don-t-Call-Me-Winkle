class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");

        // place peri and jett x, y coords
        this.peri_X = 735;        
        this.peri_Y = game.config.height - 250;
        this.jett_X = 310;
        this.jett_Y = 730;

        // dialogue box placement
        this.jettBox_X = game.config.width - 30;           
        this.jettBox_Y = game.config.height - 30;

        // jett text configs
        this.jettText_X = 330; 
        this.jettText_Y = 570;
        this.textWrapWidth = 600;
        this.prompt = '[SPACE]';
        this.prompt_X = this.jettBox_X - 70;
        this.prompt_Y = this.jettBox_Y - 50;
        this.typeSpeed = 50;

        // just jett and peri will talk
        this.jett = null;
        this.peri = null;

    } // end constructor()

    create() {
        // fade in scene
        this.cameras.main.fadeIn(400, 0, 0, 0);
        
        practice = true;

        // sequence of scenes
        this.titleActive = true;
        this.creditsActive = false;
        this.tutorialActive = false;
        this.decision = false;

        // define keys 
        cursors = this.input.keyboard.createCursorKeys();
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        // text style for dialogue
        let dialogueConfig = {
            fontFamily: 'handwrite',
            fontSize: '26px',
            color: '#4e5f8e',
            align: 'left',
            autoRound: true,
            resolution: 2
        }

        // text style for speaker label
        let speakerConfig = {
            fontFamily: 'handwrite',
            fontSize: '32px',
            color: '#4e5f8e',
            align: 'left',
            autoRound: true,
            resolution: 2
        }
        
        this.dialogue = [];                  // dialogue text array
        this.dialogueLine = 0;               // current dialogue line #
        this.nextLine = null;                // next line of dialogue

        this.bg = this.add.image(0, 0, `bg`).setOrigin(0, 0);       // set bg under title screen

        // add text box and text
        this.textBox = this.add.image(this.jettBox_X, this.jettBox_Y, 'swanBox').setOrigin(1, 1).setAlpha(0);
        this.speakerText = this.add.text(this.jettText_X, this.jettText_Y - 40, '', speakerConfig);
        this.swanText = this.add.text(this.jettText_X, this.jettText_Y, '', dialogueConfig)
            .setWordWrapWidth(this.textWrapWidth);
        this.nextText = this.add.text(this.prompt_X, this.prompt_Y, '[SPACE]', dialogueConfig).setOrigin(1, 1).setAlpha(0);

        if (chapter == 1) {                         // add title screen only if chapter 1
            // add title screen to initiate game
            this.title = this.add.sprite(0, 0, 'titleScreen').setOrigin(0, 0);
            this.title.play('titleAnim', true);

            // start and credit buttons
            this.startButton = this.add.image(50, 500, 'startButton').setOrigin(0, 0);
            this.creditButton = this.add.image(50, 600, 'creditButton').setOrigin(0, 0);
        } else {
            this.titleActive = false;

            // add and move jett
            this.jett = this.add.image(0, this.jett_Y, 'jett').setOrigin(1, 1);
            this.tweens.add({
                startDelay: 100,
                targets: this.jett,
                x: this.jett_X,
                duration: 500,
                ease: 'Cubic'
            });

            // move peri
            this.time.delayedCall(200, () => {
                this.peri = this.add.image(game.config.width, this.peri_Y, 'periStory').setOrigin(0, 1).setTint(0x777777);
                this.tweens.add({
                    targets: this.peri,
                    x: this.peri_X,
                    duration: 500,
                    ease: 'Cubic'
                })
            });
            
            // add swan text box
            this.tweens.add({
                targets: this.textBox,
                alpha: { from: 0, to: 1 },
                duration: 500,
                ease: 'Linear'
            }).on('complete', () => {
                this.decision = true;
                this.makeDecision();
            });       
        }

        // text wrap in dialogue based on example from http://phaser.io/examples/v3/view/game-objects/text/word-wrap-by-width
    } // end create()

    update() {
        // if tutorial hasn't been seen yet, assuming chapters haven't increased past 1
        if (this.titleActive) {
            if (Phaser.Input.Keyboard.JustDown(keyS)) {
                this.sound.play('uiSelect');
                this.titleActive = false;       // end title segment
                this.tutorialActive = true;     // move to tutorial segment
                this.startTutorial();
            }
            // credits input while title screen is active
            if (Phaser.Input.Keyboard.JustDown(keyC)) {
                this.creditsActive = true;
                this.sound.play('menuSelect');
                this.tweens.add({                       // add press effect! 
                    targets: this.creditButton,
                    scale: 0.9,
                    duration: 100,
                    ease: 'Cubic',
                    yoyo: true
                }).on('complete', () => {
                    // camera fade-to-black transition
                    this.time.delayedCall(400, () => {
                        this.cameras.main.fadeOut(400);
                        this.time.delayedCall(400, () => {
                            this.credits = this.add.sprite(0, 0, 'credits').setOrigin(0, 0);
                            this.credits.play('creditAnim');
                            this.endingOn = false;
                            this.cameras.main.fadeIn(400, 0, 0, 0);
                        });
                    });
                });
            }

        // otherwise, if tutorial segment is active
        } else if (this.tutorialActive) {
            // if space key is pressed and during tutorial
            if (Phaser.Input.Keyboard.JustDown(cursors.space) && !this.typing) {
                // if end of dialogue
                if (this.dialogueLine > this.dialogue.length - 1) {
                    // end tutorial, start choice
                    this.tutorialActive = false;
                    this.decision = true;
                    this.makeDecision();                   
                } else {
                    this.promptBlink.stop();    // fade out [SPACE] prompt
                    this.typeNextLine();        // type next line
                }  
            }
        } 

        // input check while credits screen is active
        if (Phaser.Input.Keyboard.JustDown(keyM) && this.creditsActive) {
            this.sound.play('uiSelect');
            this.time.delayedCall(750, () => {
                this.cameras.main.fadeOut(400);
                this.time.delayedCall(500, () => {
                    this.scene.restart();
                    this.cameras.main.fadeIn(400, 0, 0, 0);
                });
            });
                
        }

        // send player to chosen activity when choice screen is active
        if (this.decision) {
            if (Phaser.Input.Keyboard.JustDown(key1)) {
                this.sound.play('uiSelect');
                this.scene.start('migrateScene');
            } else if (Phaser.Input.Keyboard.JustDown(key2)) {
                this.sound.play('uiSelect');
                this.scene.start('storyScene');
            }
        }
    } // end update()

    startTutorial() {
        // grab tutorial section of dialogue json
        //this.tutorialTxt = this.cache.json.get('dialogue')['tutorial'];
        this.dialogue = this.cache.json.get('dialogue')['tutorial'];

        this.tweens.add({                       // "press" start button
            targets: this.startButton,
            scale: 0.9,
            duration: 100,
            ease: 'Cubic',
            yoyo: true
        }).on('complete', () => {
            // camera fade-to-black transition
            this.time.delayedCall(750, () => {
                this.cameras.main.fadeOut(400);
                this.time.delayedCall(500, () => {
                    this.title.destroy();               // destroy title screen to minimize computing stress lol
                    this.startButton.destroy();
                    this.creditButton.destroy();
                    this.cameras.main.fadeIn(400, 0, 0, 0);
                });
            });
        });
        
        // wait until after camera transition
        this.time.delayedCall(1500, () => {

            // add and move jett
            this.jett = this.add.image(0, this.jett_Y, 'jett').setOrigin(1, 1);
            this.tweens.add({
                startDelay: 100,
                targets: this.jett,
                x: this.jett_X,
                duration: 500,
                ease: 'Cubic'
            });

            // move peri
            this.time.delayedCall(200, () => {
                this.peri = this.add.image(game.config.width, this.peri_Y, 'periStory').setOrigin(0, 1).setTint(0x777777);
                this.tweens.add({
                    targets: this.peri,
                    x: this.peri_X,
                    duration: 500,
                    ease: 'Cubic'
                })
            });
            
            // add swan text box
            this.tweens.add({
                targets: this.textBox,
                alpha: { from: 0, to: 1 },
                duration: 500,
                ease: 'Linear'
            }).on('complete', () => {
                // move to next part of scene
                this.tutorialActive = true;

                // start dialogue
                this.typeNextLine();
            });
        });
    } // end startTutorial()

    makeDecision() {
        // reset dialogue line and load choice dialogue
        this.dialogueLine = 0;
        this.dialogue = this.cache.json.get('dialogue')['choice'];

        // start dialogue
        this.typeNextLine();
    }

    typeNextLine() {
        // store last speaker (if first line, set to peri)
        let lastSpeaker = this.nextLine ? this.nextLine.speaker : 'peri';
        
        // store next line from json file
        this.nextLine = this.dialogue[this.dialogueLine];

        // if different speaker, switch who's greyed out
        if (this.nextLine.speaker !== lastSpeaker) {
            this[lastSpeaker].setTint(0x777777);
            this[this.nextLine.speaker].clearTint();
        }
        
        this.speakerText.text = this.nextLine.speaker.toUpperCase();
        this.typeText(this.nextLine.branch ? this.nextLine.dialogue[this.choiceNum - 1] : this.nextLine.dialogue);
           
    } // end typeNextLine()


    // typewriter effect functions originally based on example from https://blog.ourcade.co/posts/2020/phaser-3-typewriter-text-effect-bitmap/
    typeText(text) {
        const lines = this.swanText.getWrappedText(text);      // wrapped lines
	    let wrappedText = lines.join('\n');                    // add new line character to wrapped lines
    
        // currently typing
        this.typing = true;

        // speaking sfx
        this.voice = this.sound.add(`${this.dialogue[this.dialogueLine].speaker}Voice`, {    // add appropriate speaker's voice
            loop: true
        }); 
        this.voice.play();
        this.voice.setSeek(Phaser.Math.Between(1, 11));         // randomize playback position so voice varies between chunks of dialogue


        // clear text
        this.swanText.text = '';

        // store total length of dialogue
        let length = wrappedText.length;          

        // timer that iterates thru letters in text
        let char = 0;
        this.textTimer = this.time.addEvent({
            delay: 10,
            callback: () => {
                this.swanText.text += wrappedText[char];    // add char to swanText
                char++;                                     // increment char

                // if decision, change prompt text
                if (this.decision) {
                    this.nextText.text = '[1] or [2]';
                }

                // after reaching end of line
                if (this.textTimer.getRepeatCount() == 0) {    
                    this.promptBlink = this.tweens.add({    // fade prompt in and out
                        targets: this.nextText,
                        alpha: {from: 0, to: 1},
                        callbackScope: this,
                        duration: 500,
                        loop: -1,
                        onStop: this.fadeOut,
                        yoyo: true
                    });

                    // pause voice
                    this.voice.stop();

                    this.typing = false;        // no longer typing
                    this.textTimer.destroy();   // destroy timer
                }
            },
            repeat: length - 1,
            callbackScope: this
        });

        this.dialogueLine++;    // advance dialogue line
    } // end typeText()

    // fade out targets
    fadeOut(tween, targets) {
        this.tweens.add({
            targets: targets,
            alpha: { from: targets.alpha, to: 0 },
            duration: 200,
            repeat: 0
        });
    } // end fadeOut()

}