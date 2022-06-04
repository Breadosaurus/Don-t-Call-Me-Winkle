class Story extends Phaser.Scene {
    constructor() {
        super("storyScene");

        /* structure and code for this scene will heavily reference
        Professor Nathan Altice's Dialogging example @ https://github.com/nathanaltice/Dialogging */
        
        // swan dialogue box and text position
        this.SWANBOX_X = game.config.width - 30;        
        this.SWANBOX_Y = game.config.height - 30;        
        this.SWANTEXT_X = this.swanBoxX + 200;
        this.SWANTEXT_Y = this.swanBoxY;
        this.SWANTEXT_WIDTH = 600;

        // swan positions
        this.sloaneX = 330;
        this.sloaneY = 740;
        this.siestaX = 340;
        this.siestaY = 700;
        this.kennethX = 320;
        this.kennethY = 740;

        // peri dialogue box and text position
        this.PERIBOX_X = game.config.width - 350;                                  
        this.PERIBOX_Y = 350;         
        this.PERITEXT_X = 0;
        this.PERITEXT_Y = 0;
        
        this.FONT_SIZE = 25;
        this.swanChoice = 'kenneth';
        this.choice = true;
    }

    create() {
        // define keys
        cursors = this.input.keyboard.createCursorKeys();
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);

        this.bg = this.add.image(0, 0, `bg`).setOrigin(0, 0);
        
        // adding NPC dialogue box
        this.swanBox = this.add.image(this.SWANBOX_X, this.SWANBOX_Y, 'swanBox').setOrigin(1, 1);

        // peri choice box
        this.periBox = this.add.image(this.PERIBOX_X, this.PERIBOX_Y, 'periBox').setScale(0.7);

        
        // add Peri sprite
        this.peri = this.physics.add.sprite(game.config.width - 20, game.config.height - 220, 'periStory').setScale(0.35).setOrigin(1, 1);

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
    } // end create()

    update() {
        // if choice segment is active, set swanChoice to chosen swan
        if (this.choice = true) {
            if (Phaser.Input.Keyboard.JustDown(key1)) {
                this.swanChoice = 'siesta';
            } else if (Phaser.Input.Keyboard.JustDown(key2)) {
                this.swanChoice = 'sloane';
            } else if (Phaser.Input.Keyboard.JustDown(key3)) {
                this.swanChoice = 'kenneth';
            }
            this.choice = false;
            
            // adding npc sprite
            this.swan = this.physics.add.sprite(this[`${this.swanChoice}X`], this[`${this.swanChoice}Y`], this.swanChoice).setOrigin(1, 1);
            
        }
    } // end update()

    // typewriter effect functions based on example from https://blog.ourcade.co/posts/2020/phaser-3-typewriter-text-effect-bitmap/
    typeText(text) {
        // currently typing
        this.typing = true;
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