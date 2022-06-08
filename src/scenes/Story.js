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
        this.CHOICEBOX_Y = 320;         
        this.CHOICETEXT_X = 500;
        this.CHOICETEXT_Y = this.CHOICEBOX_Y - 45;
        this.CHOICETEXT_WIDTH = 260;
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
    } // end constructor()

    create() {
        this.cameras.main.fadeIn(400, 0, 0, 0);

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

        this.choiceConfig = {
            fontFamily: 'handwrite',
            fontSize: 40, 
            fontWeight: 'bold', 
            color: '#4e5f8e', 
            stroke: '#eef7ff', 
            strokeThickness: 8
        }

        // add background
        this.bg = this.add.image(0, 0, `bg${chapter}`).setOrigin(0, 0);
        
        // add swan dialogue box and text
        this.swanBox = this.add.image(this.SWANBOX_X, this.SWANBOX_Y, 'swanBox').setOrigin(1, 1).setAlpha(0);
        this.speakerText = this.add.text(this.SWANTEXT_X, this.SWANTEXT_Y - 40, '', speakerConfig);
        this.swanText = this.add.text(this.SWANTEXT_X, this.SWANTEXT_Y, '', dialogueConfig)
            .setWordWrapWidth(this.SWANTEXT_WIDTH);
        this.nextText = this.add.text(this.NEXT_X, this.NEXT_Y, '[SPACE]', dialogueConfig).setOrigin(1, 1).setAlpha(0);

        // create text box and black tint for ending
        this.black = this.add.rectangle(0, 0, game.config.width, game.config.height, '0x000000', 0.8).setAlpha(0).setDepth(1).setOrigin(0);
        this.powerBox = this.add.image(game.config.width / 2, game.config.height / 2, 'swanBox').setAlpha(0).setDepth(2);
        this.powerText = this.add.text(280, 330, '', dialogueConfig).setWordWrapWidth(600).setAlpha(0).setDepth(2);

        // for sloane
        this.babiesText = this.add.text(this.SWANTEXT_X, this.SWANTEXT_Y + 95, '', babiesConfig).setAlpha(0);          
  
        // peri choice box
        this.choiceBox = this.add.image(this.CHOICEBOX_X, this.CHOICEBOX_Y, 'periBox').setScale(0.8).setAlpha(0);
        this.choiceSpeaker = this.add.text(this.CHOICETEXT_X, this.CHOICETEXT_Y - 40, 'PERI', speakerConfig).setAlpha(0);
        this.choiceText = this.add.text(this.CHOICETEXT_X, this.CHOICETEXT_Y, '', dialogueConfig)
            .setWordWrapWidth(this.CHOICETEXT_WIDTH)
            .setLineSpacing(8);

        // add Peri sprite
        this.peri = this.add.sprite(game.config.width, this.PERI_Y, 'periStory').setOrigin(0, 1).setTint(0x777777);

        // add swans for choice segment
        this.kennethChoice = this.add.image(game.config.width/4, game.config.height - 150, 'kenneth').setScale(0.7).setOrigin(0.5, 1);
        this.siestaChoice = this.add.image(game.config.width/2, game.config.height - 150, 'siesta').setScale(0.7).setOrigin(0.5, 1);
        this.sloaneChoice = this.add.image(game.config.width*3/4, game.config.height - 150, 'sloane').setScale(0.7).setOrigin(0.5, 1);
        this.choiceGroup = { kenneth: this.kennethChoice,
                             siesta: this.siestaChoice,
                             sloane: this.sloaneChoice
        };

        this.choiceLabels = [
            this.prompt = this.add.text(game.config.width/2, game.config.height/5, 'Who will you talk to?', this.choiceConfig).setOrigin(0.5),
            this.kennethNum = this.add.text(this.kennethChoice.x, game.config.height - 70, '[1]', this.choiceConfig).setOrigin(0.5),
            this.siestaNum = this.add.text(this.siestaChoice.x, game.config.height - 70, '[2]', this.choiceConfig).setOrigin(0.5),
            this.sloaneNum = this.add.text(this.sloaneChoice.x, game.config.height - 70, '[3]', this.choiceConfig).setOrigin(0.5)
        ];

        // tint already-chosen swans grey
        for (let swan in this.choiceGroup) {
            if (swansTalked.includes(swan)) {
                this.choiceGroup[swan].setTint(0x777777);
            }
        }

        // add sounds
        this.choiceSFX = this.sound.add('periChoice');
        this.periVoice = this.sound.add('periVoice', {  
            loop: true
        }); 

        // create keys
        cursors = this.input.keyboard.createCursorKeys();
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
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
                    this.endScene();            // go to end of scene
                } else {
                    this.promptBlink.stop();    // fade out [SPACE] prompt
                    this.typeNextLine();        // next line
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
    } // end typeNextLine()

    // dialogue choice event handler
    chooseDialogue(option) {
        this.typing = true;
        // lock choices
        this.choosingDialogue = false;

        // play choice SFX
        this.choiceSFX.play();

        // store # of chosen option
        this.choiceNum = option;

        // fade choice text box & text
        this.fadeChoice = this.tweens.add({
            targets: [this.choiceBox, this.choiceSpeaker, this.choiceText],
            alpha: { from: 1, to: 0 },
            duration: 200
        }).on('complete', () => {
            this.time.delayedCall(400, () => {
                this.dialogueLine++;
                if (this.dialogueLine > this.dialogue.length - 1) {
                    // end scene
                    this.endScene();
                } else this.typeNextLine();
            }); 
        });
    } // end chooseDialogue()

    endScene() {
        // lock space key
        this.swanTalking = false;

        // set powerup
        power = 'this.swanChoice';
        this.powerIcon = this.add.image(this.powerText.x - 75, this.powerBox.y, `${this.swanChoice}Power`).setAlpha(0).setDepth(2).setScale(0.5);

        // play sound
        this.powerSFX.play();

        // set text
        this.powerText.text = `${this.swanChoice.toUpperCase()} gave you a powerup!\n\nDuring the next migration, `;
        this.powerText.text +=
            this.swanChoice == 'kenneth' ?
                'you will be shown your spot in each formation.' :
                this.swanChoice == 'siesta' ?
                    'swans will switch formation more slowly.' :
                    // if siesta:
                    'you can fly past swans without colliding.';

        let toFade = [this.peri, this.choiceBox, this.choiceText, this[`${this.swanChoice}`], this.swanBox, this.swanText, this.speakerText, this.babiesText, this.nextText];
        toFade = toFade.filter(obj => obj.alpha != 0);
        // fade out everything under the black layer except for bg
        this.tweens.add({
            targets: toFade,
            alpha: { from: 1, to: 0 },
            duration: 400
        });

        // fade in text box and black tint
        this.tweens.add({
            targets: [this.black, this.powerBox, this.powerText, this.powerIcon],
            alpha: { from: 0, to: 1 },
            duration: 400
        }).on('complete', () => {
            cursors.space.once('down', () => {
                this.cameras.main.fadeOut(400);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                    this.time.delayedCall(200, () => {
                        this.scene.start('migrateScene');
                    });
                });
            });
        });
    }

    // swan choice
    chooseSwan(swan) {
        // lock swan choices
        this.choosingSwan = false;
    
        // record chosen swan in this.swanChoice and global swansTalked array
        this.swanChoice = swan;
        swansTalked.push(swan);

        // add swan sfx
        this[`${this.swanChoice}Voice`] = this.sound.add(`${this.swanChoice}Voice`, {  
            loop: true
        }); 
        this.powerSFX = this.sound.add(`${this.swanChoice}Jingle`);

        // play swan jingle
        this.powerSFX.play();

        // store chosen swan's portion of dialogue in this.dialogue
        this.dialogue = this.cache.json.get('dialogue')[swan];

        if (swan == 'sloane') {
            // if chosen swan is sloane, set babies text to visible
            this.babiesText.setAlpha(1);
        }

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
        
        this.tweens.add({
            targets: this.choiceLabels,
            alpha: { from: 1, to: 0 },
            duration: 200
        });

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
            this[`${this.swanChoice}`] = this.add.sprite(0, this[`${this.swanChoice}Y`], this.swanChoice).setOrigin(1, 1);
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
            this.tweens.add({
                targets: this.swanBox,
                alpha: { from: 0, to: 1},
                duration: 500,
                ease: 'Linear'
            }).on('complete', () => {
                // move to next part of scene
                this.swanTalking = true;

                // start dialogue
                this.typeNextLine();
            });
        }); 
    } // end chooseSwan()

    // typewriter effect functions originally based on example from https://blog.ourcade.co/posts/2020/phaser-3-typewriter-text-effect-bitmap/
    typeText(text) {
        const lines = this.swanText.getWrappedText(text);      // wrapped lines
	    let wrappedText = lines.join('\n');                    // add new line character to wrapped lines
        let origLength;                                        // only used in sloane's dialogue, to hold length minus babies lines
    
        // currently typing
        this.typing = true;

        let speaker = this.dialogue[this.dialogueLine].speaker;
        this[`${speaker}Voice`].play();
        this[`${speaker}Voice`].setSeek(Phaser.Math.Between(1, 11));         // randomize playback position so voice varies between chunks of dialogue

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

                    // pause voice
                    this[`${speaker}Voice`].stop();

                    this.typing = false;        // no longer typing
                    this.textTimer.destroy();   // destroy timer
                    this.dialogueLine++;    // advance dialogue line
                }
            },
            repeat: length - 1,
            callbackScope: this
        });

        
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