class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");

        // place peri and jett x, y coords
        this.peri_X = game.config.width - 100;        
        this.peri_Y = game.config.height - 100;
        this.jett_X = game.config.width - 900;
        this.jett_Y = game.config.height/3;

        // dialogue box placements and font
        this.jettBox_X = this.jet_X + 50;           
        this.jettBox_Y = this.jet_y;
        this.dialogFont = 'handwrite';
        // jett text configs
        this.jettText_X = this.jetBox_X + 100;
        this.jettText_Y = this.jetBox_Y + 100;
        this.textSize = 25;
        this.textWrapWidth = 600;
        this.prompt = '[SPACE]';
        this.prompt_X = game.config.width/3.4 + 620;
        this.prompt_Y = game.config.height*(2/3)+130;
        this.typeSpeed = 50;


        // dialogue configuration
        this.dialogConvo = 0;			// current "conversation" []?
        this.dialogLine = 0;			// current line of conversation
        this.dialogSpeaker = null;		// current speaker
        this.dialogLastSpeaker = null;	// last speaker
        this.dialogTyping = false;		// flag to lock player input while text is "typing"
        this.dialogText = null;			// the actual dialog text
        this.nextText = null;	

        // participators
        this.jett = null;
        this.peri = null; 
        this.tweenDuration = 500;
    }

    create() {
        // define keys 
        cursors = this.input.keyboard.createCursorKeys();

        // grab tutorial section of dialogue json
        this.tutorialTxt = this.cache.json.get('swansDialogue')[`tutorial`];

        // text styling
        // let textConfig = {
        //     fontFamily: 'handwrite',
        //     fontSize: '46px',
        //     color: '#8e87f1',
        //     align: 'center',
        //     padding: {
        //         top: 5,
        //         bottom: 5, 
        //     },
        //     autoRound: true,
        // } 

        // add title screen to initiate game
        this.title = this.add.sprite(0, 0, 1024, 768, 'titleScreen').setOrigin(0, 0);

        // add dialogue box for Pilot Swan
        this.jet = this.add.sprite(game.config.width/3, game.config.height)
        // this.add.text(50, 200, "Periwinkle", textConfig).setDepth(5);
        // // text wrap based on example from http://phaser.io/examples/v3/view/game-objects/text/word-wrap-by-width
        // this.make.text({
        //     x: 50,
        //     y: 300,
        //     text:"Here's the deal: You are Periwinkle, a blue-gray gnatcatcher. You've just joined this new flock of mute swans, and they're trying to teach you their migration patterns. \n\nYou will have two choices for each level: practice, or socialize! \n\nDepending on which you choose, you will progress your flight skills or increase your friendship bond with certain birds. \n\nReady to migrate or mingle?!!!",
        //     style: {
        //         font: 'bold 25px Comic Sans MS',
        //         fill: '#8e87f1',
        //         wordWrap: { width: 800 },
        //         autoRound: true,
        //     }
        // });
        // this.add.text(50, 600, "Press 1 to PRACTICE or 2 to SOCIALIZE", textConfig);
    }

    update() {
        
        if (Phaser.Input.Keyboard.JustDown(key1)) {
            this.sound.play('menuSelect');
            this.scene.start('migrateScene');
        }

        if (Phaser.Input.Keyboard.JustDown(key2)) {
            this.sound.play('menuSelect');

            this.scene.start('storyScene');
        }
    }

}