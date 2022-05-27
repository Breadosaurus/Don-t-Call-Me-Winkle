class Story extends Phaser.Scene {
    constructor() {
        super("storyScene");
    }

    create() {
        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        //keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        // choice picker collision object???
        // this.choiceSelect = this.physics.add.sprite((game.config.width - this.periBox.width) + 20, this.periBox.y + 30, 'He').setOrigin(0, 0).setAlpha(0);

        this.bg = this.add.tileSprite(0, 0, 1024, 768, 'bg_1').setOrigin(0, 0);
        
        // adding NPC dialogue box
        this.NPCbox = this.add.rectangle(game.config.width/8, game.config.height*(2/3), game.config.width - 200, game.config.height/3, 0xe0eefb).setOrigin(0,0);

        // peri choice box
        this.periBox = this.add.rectangle(game.config.width - game.config.width/2.7, game.config.height*(2/3) - game.config.height/2, game.config.width/4, game.config.height/2.2, 0xe0eefb).setOrigin(0, 0).setAlpha(0);

        // adding npc sprite
        this.slowSwan = this.physics.add.sprite(120, game.config.height - 200, 'slowSwan').setScale(0.45);
        // add Peri sprite
        this.peri = this.physics.add.sprite(game.config.width - 100, game.config.height/2 + 20, 'periStory').setScale(0.4).setAlpha(0.5);


        // text style for dialogue
        let dialogueConfig = {
            fontFamily: 'handwrite',
            fontSize: '25px',
            color: '#172230',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5, 
            },
            autoRound: true,
            resolution: 2
        }

        // set up typewriter text for NPC
        // (x, y, 'text'). wrap size
        // this.NPCdialogue = this.add.text((game.config.width/3)+20, (game.config.height*(2/3))+30, '', dialogueConfig).setWordWrapWidth(600).setOrigin(0, 0);
        

        // NPC dialogue checks + dialogue :: really scuffed cuz im not sure how to organize yet
        this.slowCheck1 = true;
        // this.slowLine1 = this.typewriteTextWrapped('Heeeeeey Periwinkle *yawn* ... How goes it? Having fuuuuun with the new flock?');
        this.slowLine1 = this.add.text(game.config.width/3.4, (game.config.height*(2/3))+30, "Heeeeeey Periwinkle *yawn* ... How goes it? Having fuuuuun with the new flock? \n\ \n\ \n\ \n\ \n\ (Press SPACE to continue)", dialogueConfig).setWordWrapWidth(600).setOrigin(0, 0);
        this.slowCheck2 = false;
        this.slowLine2 = this.add.text(game.config.width/3.4, (game.config.height*(2/3))+30, "Let me cut you off there little guy, you’re going a liiiitle too fast for me *yawn* Now see, I take it nice and slow and I don’t have to worry about anything. I don’t bump into other birds and I have all the time I want to get to my spot. It’s just me, this pillow, and the sky above me. Understand? (And don’t ask where I got the feathers for the pillow)...", dialogueConfig).setWordWrapWidth(600).setOrigin(0, 0).setAlpha(0);
        this.slowCheck3 = false;
        this.slowLine3 = this.add.text(game.config.width/3.4, (game.config.height*(2/3))+30, "Exaaaactly. Now let’s taaaaalk abooouutt-  *snore*", dialogueConfig).setWordWrapWidth(600).setOrigin(0, 0).setAlpha(0);

        // peri choices
        this.periChoice1 = false;
        this.choices1 = this.add.text(this.periBox.x + 20, this.periBox.y + 30, " 1] Yeah! \n\ 2] No. \n\ 3] Kinda? ", dialogueConfig).setAlpha(0).setWordWrapWidth(game.config.width/4 - 50);
        this.periChoice2 = false;
        this.choices2 = this.add.text(this.periBox.x + 20, this.periBox.y + 30, " 1] I do! \n\ 2] Uh... \n\ 3] Feathers?", dialogueConfig).setAlpha(0).setWordWrapWidth(game.config.width/4 - 50);
        this.periClose = false;
        this.periCloseText = this.add.text(this.periBox.x + 20, this.periBox.y + 30, "...??? \n\ \n\ \n\ Guess I'll go get ready to migrate...[SPACE]", dialogueConfig).setAlpha(0).setWordWrapWidth(game.config.width/4 - 50);

        

    } // end create()

    update() {
        // slow bird starts convo (not canon)
        if (this.slowCheck1) {
            // if space is pressed then: fade NPC and their dialogue
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.sound.play('spaceNPC');
                this.slowSwan.setAlpha(0.5);
                this.NPCbox.setAlpha(0.5);
                this.slowLine1.setAlpha(0.5);
                this.slowCheck1 = false;
                this.periChoice1 = true
            }
        }

        // peri response :: choice 1
        if (this.periChoice1) {
            // if NPC not talking: Peri and choices visible
            this.peri.setAlpha(1);
            this.periBox.setAlpha(1);
            this.choices1.setAlpha(1);
            if (Phaser.Input.Keyboard.JustDown(key1)) {
                this.sound.play('periChoice');
                this.peri.setAlpha(0.5);
                this.periBox.setAlpha(0);
                this.choices1.setAlpha(0);
                this.periChoice1 = false;
                this.slowCheck2 = true;
            }
            if (Phaser.Input.Keyboard.JustDown(key2)) {
                this.sound.play('periChoice');
                this.peri.setAlpha(0.5);
                this.periBox.setAlpha(0);
                this.choices1.setAlpha(0);
                this.periChoice1 = false;
                this.slowCheck2 = true;
            }
            if (Phaser.Input.Keyboard.JustDown(key3)) {
                this.sound.play('periChoice');
                this.peri.setAlpha(0.5);
                this.periBox.setAlpha(0);
                this.choices1.setAlpha(0);
                this.periChoice1 = false;
                this.slowCheck2 = true;
            }

        }

        if (this.slowCheck2) {
            // if Peri done choice 1: NPC say line 2
            this.slowLine1.setAlpha(0);
            this.slowLine2.setAlpha(1);
            this.slowSwan.setAlpha(1);
            this.NPCbox.setAlpha(1);

            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.sound.play('spaceNPC');
                this.slowSwan.setAlpha(0.5);
                this.NPCbox.setAlpha(0.5);
                this.slowLine2.setAlpha(0.5);
                this.slowCheck2 = false;
                this.periChoice2 = true;
            }

        }

        // peri response :: choice 2
        if (this.periChoice2) {
            this.peri.setAlpha(1);
            this.periBox.setAlpha(1);
            this.choices2.setAlpha(1);
            if (Phaser.Input.Keyboard.JustDown(key1)) {
                this.sound.play('periChoice');
                this.peri.setAlpha(0.5);
                this.periBox.setAlpha(0);
                this.choices2.setAlpha(0);
                this.periChoice2 = false;
                this.slowCheck3 = true;
            }
            if (Phaser.Input.Keyboard.JustDown(key2)) {
                this.sound.play('periChoice');
                this.peri.setAlpha(0.5);
                this.periBox.setAlpha(0);
                this.choices2.setAlpha(0);
                this.periChoice2 = false;
                this.slowCheck3 = true;
            }
            if (Phaser.Input.Keyboard.JustDown(key3)) {
                this.sound.play('periChoice');
                this.peri.setAlpha(0.5);
                this.periBox.setAlpha(0);
                this.choices2.setAlpha(0);
                this.periChoice2 = false;
                this.slowCheck3 = true;
            }

        }

        if (this.slowCheck3) {
            // if Peri done choice 2: NPC say line 3
            this.slowLine1.setAlpha(0);
            this.slowLine2.setAlpha(0);
            this.slowLine3.setAlpha(1);
            this.slowSwan.setAlpha(1);
            this.NPCbox.setAlpha(1);

            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.sound.play('spaceNPC');
                this.slowSwan.setAlpha(0.5);
                this.NPCbox.setAlpha(0.5);
                this.slowLine3.setAlpha(0.5);
                this.slowCheck3 = false;
                this.periClose = true;
            }

        }

        if (this.periClose) {
            this.peri.setAlpha(1);
            this.periBox.setAlpha(1);
            this.periCloseText.setAlpha(1);

            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.sound.play('menuSelect');
                practice = false;
                this.scene.start('migrateScene');
            }
        }

    } // end update()

    // typewriter effect functions based on example from https://blog.ourcade.co/posts/2020/phaser-3-typewriter-text-effect-bitmap/
    typewriteText(text) {
	
        const length = text.length;
        
        let i = 0;
        this.time.addEvent({
            callback: () => {
                this.dialogue.text += text[i]
                ++i
            },
            repeat: length - 1,
            delay: 50
        
        });
    }

    typewriteTextWrapped(text){    
        const lines = this.dialogue.getWrappedText(text);
        const wrappedText = lines.join('\n');

        this.typewriteText(wrappedText);
    }
}