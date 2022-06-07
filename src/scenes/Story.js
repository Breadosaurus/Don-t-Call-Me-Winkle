class Story extends Phaser.Scene {
    constructor() {
        super("storyScene");

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
        this.CHOICEBOX_Y = 350;         
        this.CHOICETEXT_X = 510;
        this.CHOICETEXT_Y = 310;
        this.CHOICETEXT_WIDTH = 240;
        this.PERI_X = 735;
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
        //this.swan = null;
    }

    create() {
        // set practice mode to false if player chooses to socialize
        practice = false;

        // parts of scene (to establish sequence)
        this.choosingSwan = true;                   // choosing which swan to talk to
        this.swanTalking = false;                   // conversation is taking place
        this.choosingDialogue = false               // time to choose from dialogue options

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
        this.choiceBox = this.add.image(this.CHOICEBOX_X, this.CHOICEBOX_Y, 'periBox').setScale(0.7).setAlpha(0);
        this.choiceSpeaker = this.add.text(this.CHOICETEXT_X, this.CHOICETEXT_Y - 40, 'PERI', speakerConfig).setAlpha(0);
        this.choiceText = this.add.text(this.CHOICETEXT_X, this.CHOICETEXT_Y, '', dialogueConfig)
            .setWordWrapWidth(this.CHOICETEXT_WIDTH);

        // add Peri sprite
        this.peri = this.physics.add.sprite(game.config.width, this.PERI_Y, 'periStory').setOrigin(0, 1).setTint(0x777777);

        // create keys
        cursors = this.input.keyboard.createCursorKeys();
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);

        // add swans for choice segment
        this.kennethChoice = this.add.image(game.config.width/4, game.config.height - 150, 'kenneth').setScale(0.7).setOrigin(0.5, 1);
        this.siestaChoice = this.add.image(game.config.width/2, game.config.height - 150, 'siesta').setScale(0.7).setOrigin(0.5, 1);
        this.sloaneChoice = this.add.image(game.config.width*3/4, game.config.height - 150, 'sloane').setScale(0.7).setOrigin(0.5, 1);
        this.choiceGroup = { kenneth: this.kennethChoice,
                             siesta: this.siestaChoice,
                             sloane: this.sloaneChoice
        };

        // tint already-chosen swans grey
        for (let swan in this.choiceGroup) {
            if (swansTalked.includes(swan)) {
                this.choiceGroup[swan].setTint(0x777777);
            }
        }
    } // end create()

    update() {
        // if swan choice segment is active
        if (this.choosingSwan) {
            if (Phaser.Input.Keyboard.JustDown(key1) && !swansTalked.includes('kenneth')) {
                this.chooseSwan('kenneth');
            } else if (Phaser.Input.Keyboard.JustDown(key2) && !swansTalked.includes('siesta')) {
                this.chooseSwan('siesta');
            } else if (Phaser.Input.Keyboard.JustDown(key3) && !swansTalked.includes('sloane')) {
                this.chooseSwan('sloane');
            }

        // otherwise, if dialogue choice segment is active
        } else if (this.choosingDialogue) {
            if (Phaser.Input.Keyboard.JustDown(key1)) {
                this.chooseDialogue(1);
            } else if (Phaser.Input.Keyboard.JustDown(key2)) {
                this.chooseDialogue(2);
            } else if (Phaser.Input.Keyboard.JustDown(key3) && this.nextLine.dialogue[2]) {
                this.chooseDialogue(3);
            }
            
        // otherwise, if conversation has started
        } else if (this.swanTalking) {
            // if space key is pressed and dialogue has finished typing
            if (Phaser.Input.Keyboard.JustDown(cursors.space) && !this.typing) {
                // if end of dialogue
                if (this.dialogueLine > this.dialogue.length - 1) {
                    // add powerup
                    power = 'this.swanChoice';
                    // go to migration scene
                    this.scene.start('migrateScene');
                } else {
                    // fade out [SPACE] prompt
                    this.promptBlink.stop();

                    this.typeNextLine();
                }  
            }
        }
    } // end update()

    typeNextLine() {
        // store last speaker (if first line, set to peri)
        let lastSpeaker = this.nextLine ? this.nextLine.speaker : 'peri';
        
        // store next line from json file
        this.nextLine = this.dialogue[this.dialogueLine];

        // if different speaker, switch who's greyed out
        if (this.nextLine.speaker != lastSpeaker) {
            this[lastSpeaker].setTint(0x777777);
            this[this.nextLine.speaker].clearTint();
        }

        // if next line has multiple dialogue options, show choice text boxes and choices
        if (this.nextLine.speaker == 'peri' && this.nextLine.choice) {
            // show choice text box and text
            this.choiceBox.setAlpha(1);
            this.choiceSpeaker.setAlpha(1);
            this.choiceText.setAlpha(1).setText('');
            // add numbered choices
            for (let i = 1; i <= this.nextLine.dialogue.length; i++) {
                this.choiceText.text += `[${i}] ${this.nextLine.dialogue[i - 1]}\n`;
            }
            this.choosingDialogue = true;
        } else {
            this.speakerText.text = this.nextLine.speaker.toUpperCase();
            this.typeText(this.nextLine.branch ? this.nextLine.dialogue[this.choiceNum - 1] : this.nextLine.dialogue);
        }
    }

    // dialogue choice event handler
    chooseDialogue(option) {
        // lock choices
        this.choosingDialogue = false;

        // store # of chosen option
        this.choiceNum = option;

        // fade choice text box & text
        this.fadeChoice = this.tweens.add({
            targets: [this.choiceBox, this.choiceSpeaker, this.choiceText],
            alpha: { from: 1, to: 0 },
            duration: 200
        });

        // advance dialogue
        this.dialogueLine++;
        if (this.dialogueLine > this.dialogue.length - 1) {
            // add powerup
            power = 'this.swanChoice';

            // go to migration scene
            this.scene.start('migrateScene');
        } else this.typeNextLine();
    }

    // swan choice event handler
    chooseSwan(swan) {
        // lock swan choices
        this.choosingSwan = false;

        // record chosen swan in this.swanChoice and global swansTalked array
        this.swanChoice = swan;
        swansTalked.push(this.swanChoice);

        // store chosen swan's portion of dialogue in this.dialogue
        this.dialogue = this.cache.json.get('dialogue')[this.swanChoice];

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

        
        this.time.delayedCall(1500, () => {
            // add and move swan
            this[`${this.swanChoice}`] = this.physics.add.sprite(0, this[`${this.swanChoice}Y`], this.swanChoice).setOrigin(1, 1);
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
            });

            this.addBox.on('complete', () => {
                // move to next part of scene
                this.swanTalking = true;

                // start dialogue
                this.typeNextLine();
                // this.speakerText.text = this.swanChoice.toUpperCase();
                // this.typeText(this.dialogue[this.dialogueLine].dialogue);
            });
        }); 
    }

    // typewriter effect functions based on example from https://blog.ourcade.co/posts/2020/phaser-3-typewriter-text-effect-bitmap/
    typeText(text) {
        const lines = this.swanText.getWrappedText(text);
	    let wrappedText = lines.join('\n');
        let origLength;
    
        // currently typing
        this.typing = true;

        // clear text
        this.swanText.text = '';
        if (this.swanChoice == 'sloane') this.babiesText.text = '';

        // babies text for sloane
        if (this.swanChoice == 'sloane' && this.dialogue[this.dialogueLine].babies) {
            origLength = wrappedText.length;                                                // store length of just swan dialogue
            wrappedText += `. . . ${this.dialogue[this.dialogueLine].babies}`;                  // add babies lines to wrappedText
        }

        // store total length of dialogue (including babies lines if applicable)
        let length = wrappedText.length;          

        // timer that iterates thru letters in text
        let char = 0;
        this.textTimer = this.time.addEvent({
            delay: 10,
            callback: () => {
                // if sloane, check if next char is in babies line
                if (this.swanChoice == 'sloane' && char > origLength - 1) {
                    this.babiesText.text += wrappedText[char];
                } else {
                    this.swanText.text += wrappedText[char];
                }

                // increment char
                char++;

                // after reaching end of line
                if (this.textTimer.getRepeatCount() == 0) {
                    // fade prompt in and out
                    this.promptBlink = this.tweens.add({
                        targets: this.nextText,
                        alpha: {from: 0, to: 1},
                        callbackScope: this,
                        duration: 500,
                        loop: -1,
                        onStop: this.fadeOut,
                        yoyo: true
                    });

                    // no longer typing
                    this.typing = false;

                    // destroy timer
                    this.textTimer.destroy();
                }
            },
            repeat: length - 1,
            callbackScope: this
        });

        // advance dialogue line
        this.dialogueLine++;
    }

    // fade out targets
    fadeOut(tween, targets) {
        this.tweens.add({
            targets: targets,
            alpha: { from: targets.alpha, to: 0 },
            duration: 200,
            repeat: 0
        });
    }
}