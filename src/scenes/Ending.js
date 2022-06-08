class Ending extends Phaser.Scene {
    constructor() {
        super("endScene");

        /* structure and code for this scene will heavily reference
        Professor Nathan Altice's Dialogging example @ https://github.com/nathanaltice/Dialogging */
        
        // swan dialogue box and text position
        this.SWANBOX_X = game.config.width - 30;        
        this.SWANBOX_Y = game.config.height - 30;        
        this.SWANTEXT_X = 330;
        this.SWANTEXT_Y = 570;
        this.SWANTEXT_WIDTH = 600;

        this.NEXT_X = this.SWANBOX_X - 70;
        this.NEXT_Y = this.SWANBOX_Y - 50;

        // peri dialogue box and text position
        this.CHOICEBOX_X = 640;                                  
        this.CHOICEBOX_Y = 320;         
        this.CHOICETEXT_X = 500;
        this.CHOICETEXT_Y = this.CHOICEBOX_Y - 45;
        this.CHOICETEXT_WIDTH = 260;
        this.PERI_X = 650;
        this.PERI_Y = game.config.height - 250;

        // swan positions
        this.sloaneX = 330;
        this.sloaneY = 740;
        this.siestaX = 340;
        this.siestaY = 700;
        this.kennethX = 320;
        this.kennethY = 740;

        // character variables
        this.peri = null;

        // which ending?
        this.ending = null;
    }


    create() {
        // fade in from black
        this.cameras.main.fadeIn(400, 0, 0, 0);

        // calculate ending
        if (migrationsPassed > 1) {
            if (swansTalked.length > 1) {
                this.ending = 1;
                console.log('end 1');
            } else {
                this.ending = 2;
                console.log('end 2');
            }
        } else {
            if (swansTalked.length > 0) {
                this.ending = 3;
                console.log('end 3');
            } else {
                this.ending = 4;
                console.log('end 4');
            }
        }

        this.swanChoice = null;                     // chosen swan
        this.dialogue = [];                         // dialogue text array
        this.dialogueLine = 0;                      // current dialogue line #
        this.nextLine = null;                       // next line of dialogue
        this.choiceNum = null;                      // variable to hold chosen dialogue option

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

        // text style for speaker label
        let babiesConfig = {
            fontFamily: 'handwrite',
            fontSize: '21px',
            color: '#9e9c9a',
            align: 'left',
            autoRound: true,
            resolution: 2
        }

        // add background
        this.bg = this.add.image(0, 0, `bg`).setOrigin(0, 0);

        // add swan dialogue box and text
        this.swanBox = this.add.image(this.SWANBOX_X, this.SWANBOX_Y, 'swanBox').setOrigin(1, 1).setAlpha(0);
        this.speakerText = this.add.text(this.SWANTEXT_X, this.SWANTEXT_Y - 40, '', speakerConfig);
        this.swanText = this.add.text(this.SWANTEXT_X, this.SWANTEXT_Y, '', dialogueConfig)
            .setWordWrapWidth(this.SWANTEXT_WIDTH);
        this.nextText = this.add.text(this.NEXT_X, this.NEXT_Y, '[SPACE]', dialogueConfig).setOrigin(1, 1).setAlpha(0);

        // for sloane
        this.babiesText = this.add.text(this.SWANTEXT_X, this.SWANTEXT_Y + 95, '', babiesConfig).setAlpha(0);          
  
        // peri choice box
        this.choiceBox = this.add.image(this.CHOICEBOX_X, this.CHOICEBOX_Y, 'periBox').setScale(0.8).setAlpha(0);
        this.choiceSpeaker = this.add.text(this.CHOICETEXT_X, this.CHOICETEXT_Y - 40, 'PERI', speakerConfig).setAlpha(0);
        this.choiceText = this.add.text(this.CHOICETEXT_X, this.CHOICETEXT_Y, '', dialogueConfig)
            .setWordWrapWidth(this.CHOICETEXT_WIDTH)
            .setLineSpacing(8);

        // create keys
        cursors = this.input.keyboard.createCursorKeys();
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        if (this.ending == 3) {
            this.dialogue = this.cache.json.get('dialogue')['ending3'].intro;
        } else {
            this.dialogue = this.cache.json.get('dialogue')[`ending${this.ending}`];
        }

        // once scene has faded in
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {
            // add peri and dialogue box for endings 1 and 2
            if (this.ending == 1 || this.ending == 2) {
                // add and move peri
                this.peri = this.add.sprite(game.config.width, this.PERI_Y, 'periStory').setOrigin(0, 1).setTint(0x777777);
                this.time.delayedCall(200, () => {
                    this.tweens.add({
                        targets: this.peri,
                        x: 735,
                        duration: 500,
                        ease: 'Cubic'
                    })
                });

                // add dialogue box
                this.addBox = this.tweens.add({ 
                    targets: this.swanBox,
                    alpha: { from: 0, to: 1},
                    duration: 500,
                    ease: 'Linear'
                }).on('complete', () => {
                    this.swanTalking = true;            // dialogue has started
                    this.typeNextLine();                // start dialogue
                });

                // if ending 1, add group of swans
                if (this.ending == 1) {
                    // add and move swans
                    this.allSwans = [
                        this.sloane = this.add.image(0, this.sloaneY, 'sloane').setOrigin(1, 1),
                        this.siesta = this.add.image(-150, this.siestaY, 'siesta').setOrigin(1, 1),
                        this.kenneth = this.add.image(-260, this.kennethY, 'kenneth').setOrigin(1, 1)
                    ];
                    this.tweens.add({
                        startDelay: 100,
                        targets: this.allSwans,
                        x: {value: '+=570'},
                        duration: 500,
                        ease: 'Cubic'
                    });
                // if ending 2, clear peri tint and add siesta
                } else {
                    this.peri.clearTint();
                    this.siesta = this.add.image(0, this.siestaY, 'siesta').setOrigin(1, 1);
                }
                
            // endings 3 and 4 start with peri talking to himself
            } else {
                // dialogue has not started yet
                this.periTalking = false;

                // add Peri sprite to left of text box
                this.peri = this.add.image(0, 700, 'periStory').setOrigin(1, 1).setFlipX(true);

                this.addBox = this.tweens.add({
                    targets: this.swanBox,
                    alpha: { from: 0, to: 1},
                    duration: 500,
                    ease: 'Linear'
                }).on('complete', () => {
                    this.periTalking = true;            // dialogue has started
                    this.typeNextLine();                // start dialogue
                });

                // move peri
                this.time.delayedCall(200, () => {
                    this.tweens.add({
                        targets: this.peri,
                        x: 300,
                        duration: 500,
                        ease: 'Cubic'
                    })
                });
            }
        });
        
    } 

    update() {
        if (this.ending == 1) {
            if (Phaser.Input.Keyboard.JustDown(cursors.space) && !this.typing && this.swanTalking) {
                // if end of dialogue, go to endscreen
                if (this.dialogueLine > this.dialogue.length - 1) {
                    this.goToEndscreen();
                } else {
                    this.promptBlink.stop();    // fade out [SPACE] prompt
                    this.typeNextLine();        // continue dialogue
                }
            }
        } else if (this.ending == 2) {
            if (Phaser.Input.Keyboard.JustDown(cursors.space) && !this.typing && this.swanTalking) {
                // if end of dialogue, go to endscreen
                if (this.dialogueLine > this.dialogue.length - 1) {
                    this.goToEndscreen();
                } else {
                    this.promptBlink.stop();    // fade out [SPACE] prompt
                    this.typeNextLine();        // continue dialogue
                }
            }
        } else if (this.ending == 3) {
            // if swan choice segment is active
            if (this.choosingSwan) {
                if (Phaser.Input.Keyboard.JustDown(key1) && !swansTalked.includes('kenneth')) {
                    this.sound.play('kennethJingle');
                    this.chooseSwan('kenneth');
                } else if (Phaser.Input.Keyboard.JustDown(key2) && !swansTalked.includes('siesta')) {
                    this.sound.play('siestaJingle');
                    this.chooseSwan('siesta');
                } else if (Phaser.Input.Keyboard.JustDown(key3) && !swansTalked.includes('sloane')) {
                    this.sound.play('sloaneJingle');
                    this.chooseSwan('sloane');
                }
            } else if (Phaser.Input.Keyboard.JustDown(cursors.space) && !this.typing && !this.endingOn) {
                if (this.periTalking) {
                    this.periTalking = false;
                    // fade out peri and text box
                    this.promptBlink.stop();
                    this.tweens.add({
                        targets: [this.peri, this.swanBox, this.swanText, this.speakerText],
                        alpha: { from: 1, to: 0 },
                        duration: 200
                    }).on('complete', () => {
                        // prepare peri for later
                        this.peri.x = game.config.width;    
                        this.peri.y = this.PERI_Y;
                        this.peri.setAlpha(1).setFlipX(false).setOrigin(0, 1).setTint(0x777777);
                        this.showSwans();
                    });
                    
                } else if (this.swanTalking && !this.endingOn) {
                    // if end of dialogue, go to endscreen
                    if (this.dialogueLine > this.dialogue.length - 1) {
                        this.goToEndscreen();
                    } else {
                        this.promptBlink.stop();    // fade out [SPACE] prompt
                        this.typeNextLine();        // continue dialogue
                    }
                }
            }
        } else if (this.ending == 4) {
            if (this.periTalking && Phaser.Input.Keyboard.JustDown(cursors.space) && !this.typing && !this.endingOn) {
                // if end of dialogue, go to endscreen
                if (this.dialogueLine > this.dialogue.length - 1) {
                    this.goToEndscreen();
                } else {
                    this.promptBlink.stop();    // fade out [SPACE] prompt
                    this.typeNextLine();        // continue dialogue
                }  
            }
        }
        
        // check for input to switch scenes
        if (this.endingOn && Phaser.Input.Keyboard.JustDown(keyC)) {
            this.sound.play('menuSelect');
            this.credits = this.add.sprite(0, 0, 'credits').setOrigin(0, 0);
            this.credits.play('creditAnim');
            this.endingOn = false;
            
        }
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.sound.play('uiSelect');
            this.scene.start('tutorialScene');
        }
    }

    showSwans() {
        // show swans
        this.kennethChoice = this.add.image(game.config.width/4, game.config.height - 150, 'kenneth')
            .setScale(0.7).setOrigin(0.5, 1);
        this.siestaChoice = this.add.image(game.config.width/2, game.config.height - 150, 'siesta')
            .setScale(0.7).setOrigin(0.5, 1);
        this.sloaneChoice = this.add.image(game.config.width*3/4, game.config.height - 150, 'sloane')
            .setScale(0.7).setOrigin(0.5, 1);
        this.choiceGroup = {
            kenneth: this.kennethChoice,
            siesta: this.siestaChoice,
            sloane: this.sloaneChoice
        };

        // tint swans NOT talked to
        for (let swan in this.choiceGroup) {
            this.choiceGroup[swan].setAlpha(0);
            if (!swansTalked.includes(swan)) {
                this.choiceGroup[swan].setTint(0x777777);
            }
        }

        this.tweens.add({
            targets: Object.values(this.choiceGroup),
            alpha: { from: 0, to: 1 },
            duration: 500,
            ease: 'Linear'
        });

        this.choosingSwan = true;
    }

    typeNextLine() {
        // store last speaker (if first line, set to peri)
        let lastSpeaker = this.nextLine ? this.nextLine.speaker : 'peri';
        
        // store next line from json file
        this.nextLine = this.dialogue[this.dialogueLine];

        // sprite movements & tints for ending 1
        if (this.ending == 1) {
            if (this.dialogueLine == 0) {
                this.speakerText.x += 250;
                this.swanText.x += 250;
            } else if (this.dialogueLine == 1) {
                for (let swan of this.allSwans) {
                    swan.setTint(0x777777);
                }
                this.peri.clearTint();
            } else if (this.dialogueLine == 2) {
                this.speakerText.x -= 250;
                this.swanText.x -= 250;
                this.peri.setTint(0x777777);
                this.siesta.clearTint();
                // move ken & sloane offscreen
                this.tweens.add({
                    targets: [this.kenneth, this.sloane],
                    x: 0,
                    duration: 500,
                    ease: 'Cubic'
                });
                // move siesta to normal position
                this.tweens.add({
                    targets: this.siesta,
                    x: this.siestaX,
                    duration: 500,
                    ease: 'Cubic'
                });
            } else if (this.dialogueLine > 2 && this.dialogueLine < 5) {
                // move last speaker
                this.tweens.add({
                    targets: this[lastSpeaker],
                    x: 0,
                    duration: 300,
                    ease: 'Cubic'
                }).on('complete', () => {
                    // move next speaker
                    this.tweens.add({
                        targets: this[this.nextLine.speaker],
                        x: this[`${this.nextLine.speaker}X`],
                        duration: 300,
                        ease: 'Cubic'
                    });
                    this[this.nextLine.speaker].clearTint();
                });
            } else if (this.dialogueLine == 5) {
                this.sloane.setTint(0x777777);
                this.peri.clearTint();
            }
        } else if (this.ending == 2 && this.dialogueLine == 1) {
            // move siesta
            this.tweens.add({
                targets: this.siesta,
                x: this.siestaX,
                duration: 500,
                ease: 'Cubic'
            });
        } else {
            // if different speaker, switch who's greyed out
            if (this.nextLine.speaker != lastSpeaker) {
                this[lastSpeaker].setTint(0x777777);
                this[this.nextLine.speaker].clearTint();
            }
        }

        this.speakerText.text = this.nextLine.speaker.toUpperCase();
        this.typeText(this.nextLine.dialogue);
    }

    // typewriter effect functions based on example from https://blog.ourcade.co/posts/2020/phaser-3-typewriter-text-effect-bitmap/
    typeText(text) {
        const lines = this.swanText.getWrappedText(text);      // wrapped lines
	    let wrappedText = lines.join('\n');                    // add new line character to wrapped lines
        let origLength;                                        // only used in sloane's dialogue, to hold length minus babies lines
    
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

        // if talking to sloane
        if (this.swanChoice == 'sloane') {
            this.babiesText.text = '';                                                   // clear babies text
            // if babies talk in this line
            if (this.dialogue[this.dialogueLine].babies) {
                origLength = wrappedText.length;                                         // store length of just swan dialogue
                wrappedText += `. . . ${this.dialogue[this.dialogueLine].babies}`;       // add babies lines to wrappedText
            }
        }

        // store total length of dialogue
        let length = wrappedText.length;          

        // timer that iterates thru letters in text
        let char = 0;
        this.textTimer = this.time.addEvent({
            delay: 10,
            callback: () => {
                // if sloane, check if next char is in babies line
                if (this.swanChoice == 'sloane' && char > origLength - 1) {     
                    this.babiesText.text += wrappedText[char];                  // add char to babiesText
                } else {
                    this.swanText.text += wrappedText[char];                    // add char to swanText
                }

                char++;    // increment char

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

                    this.voice.stop();          // stop talking audio when typing also done
                    this.typing = false;        // no longer typing
                    this.textTimer.destroy();   // destroy timer
                }
            },
            repeat: length - 1,
            callbackScope: this
        });

        this.dialogueLine++;    // advance dialogue line
    } // end typeText()

    // swan choice event handler
    chooseSwan(swan) {
        // lock swan choices
        this.choosingSwan = false;

        // record chosen swan in this.swanChoice
        this.swanChoice = swan;

        // store chosen swan's portion of dialogue in this.dialogue
        this.dialogue = this.cache.json.get('dialogue')['ending3'][swan];

        // reset dialogue line
        this.dialogueLine = 0;

        // if chosen swan is sloane, set babies text to visible
        this.babiesText.setAlpha(1);

        for (swan in this.choiceGroup) {
            if (swan != this.swanChoice) {
                this.fadeUnchosen = this.tweens.add({
                    targets: this.choiceGroup[swan],
                    alpha: { from: 1, to: 0 },
                    duration: 200
                });
            } else {
                this.tweens.add({
                    targets: this.choiceGroup[swan],
                    startDelay: 500,
                    x: game.config.width/2,
                    duration: 500,
                    ease: 'Cubic'
                })
            }
        }

        // camera transition
        this.time.delayedCall(750, () => {
            this.cameras.main.fadeOut(400);                         // fade to black
            this.time.delayedCall(500, () => {
                this.choiceGroup[this.swanChoice].setAlpha(0);      // hide swan choice options
                this.cameras.main.fadeIn(400, 0, 0, 0);             // fade back in
            });
        });
        
        // wait until after camera transition
        this.time.delayedCall(1500, () => {
            // add and move swan
            this[`${this.swanChoice}`] = this.add.image(0, this[`${this.swanChoice}Y`], this.swanChoice).setOrigin(1, 1);
            this.tweens.add({
                startDelay: 100,
                targets: this[`${this.swanChoice}`],
                x: this[`${this.swanChoice}X`],
                duration: 500,
                ease: 'Cubic'
            });

            // move peri
            this.time.delayedCall(200, () => {
                this.tweens.add({
                    targets: this.peri,
                    x: this.PERI_X,
                    duration: 500,
                    ease: 'Cubic'
                })
            });
            
            // add swan text box
            this.addBox = this.tweens.add({
                targets: this.swanBox,
                alpha: { from: 0, to: 1},
                duration: 500,
                ease: 'Linear'
            }).on('complete', () => {
                // move to next part of scene
                this.swanTalking = true;

                // start dialogue
                // set text visible
                this.swanText.setAlpha(1);
                this.speakerText.setAlpha(1);
                this.typeNextLine();
            });
        }); 
    } // end chooseSwan()

    // fade out targets
    fadeOut(tween, targets) {
        this.tweens.add({
            targets: targets,
            alpha: { from: targets.alpha, to: 0 },
            duration: 200,
            repeat: 0
        });
    } // end fadeOut()

    goToEndscreen() {
        this.time.delayedCall(750, () => {
            this.cameras.main.fadeOut(400);                         // fade to black
            this.time.delayedCall(600, () => {
                this.end = this.add.sprite(0, 0, 'ending').setOrigin(0, 0);         // end screen sprite to "hold" animation
                this.end.play('endAnim', true);                     // play end screen animation
                this.cameras.main.fadeIn(400, 0, 0, 0);             // fade back in
            });
        });

    }
}