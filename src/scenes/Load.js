class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        // set load path weehee
        this.load.path = 'assets/';

        // load ui assets
        this.load.image('titleScreen', 'img/title_001.png');
        this.load.image('ending', 'img/end_001.png');
        this.load.image('credits', 'img/credits0000.png');
        this.load.image('creditButton', 'img/credButton.png');
        this.load.image('startButton', 'img/startButton.png');
        this.load.image('credStrip', 'img/credStrip.png');
        this.load.image('menuStrip', 'img/menuStrip.png');
        
        // load migration assets
        this.load.image('sky1', 'img/sky1.png');
        this.load.image('sky2', 'img/sky2.png');
        this.load.image('sky3', 'img/sky3.png');
        this.load.image('clouds1', 'img/clouds1.png');
        this.load.image('clouds2', 'img/clouds2.png');
        this.load.image('clouds3', 'img/clouds3.png');
        this.load.image('periMigrate', 'img/periMigrate.png');
        this.load.image('swanMigrate', 'img/swanMigrate.png');
        this.load.image('arrow', 'img/arrow.png');
        this.load.image('textbox', 'img/textbox2.png')
        this.load.spritesheet('periGreen', 'img/periGreen.png', {frameWidth: 56, frameHeight: 60, startFrame: 0, endFrame: 10});
        this.load.spritesheet('win', 'img/win.png', {frameWidth: 119, frameHeight: 119, startFrame: 0, endFrame: 3});

        // load story assets
        this.load.image('bg', 'img/bg.png');
        this.load.image('jett', 'img/jett.png');
        this.load.image('periStory', 'img/periStory.png');
        this.load.image('sloane', 'img/sloane.png');
        this.load.image('siesta', 'img/siesta.png');
        this.load.image('kenneth', 'img/kenneth.png');
        this.load.image('swanBox', 'img/swanBox.png');
        this.load.image('periBox', 'img/periBox.png');
        //this.load.image('jeff', 'img/jeffrey_thomas.png');

        // load font
        this.load.bitmapFont('handwrite', 'font/handwrite.png', 'font/handwrite.xml');

        // load texture atlas for animations
        this.load.atlas('peri_atlas', 'img/periSheet.png', 'json/periSheet.json');

        // preload migration map json file
        this.load.json('migrationMap', 'json/migrationMap.json');
        this.load.json('dialogue', 'json/dialogue.json');

        // migration sfx
        this.load.audio('win', 'audio/victory.mp3');
        this.load.audio('fail', 'audio/failForm.mp3');
        this.load.audio('bump1', 'audio/bump1.mp3');
        this.load.audio('bump2', 'audio/bump2.mp3');
        this.load.audio('bump3', 'audio/bump3.mp3');
        this.load.audio('bump4', 'audio/bump4.mp3');
        this.load.audio('bump5', 'audio/bump5.mp3');
        this.load.audio('bump6', 'audio/bump6.mp3');
        this.load.audio('flap', 'audio/flap.mp3');
        
        // ui sfx
        this.load.audio('menuSelect', 'audio/menuSelect.mp3');
        this.load.audio('uiSelect', 'audio/uiSelect.mp3');
        this.load.audio('migStart', 'audio/migrateStart.mp3');
        
        // story sfx
        this.load.audio('siestaJingle', 'audio/siestaChosen.mp3');
        this.load.audio('sloaneJingle', 'audio/sloaneChosen.mp3');
        this.load.audio('kennethJingle', 'audio/kennethChosen.mp3');
        this.load.audio('siestaVoice', 'audio/siestaDialogue.mp3');
        this.load.audio('sloaneVoice', 'audio/sloaneDialogue.mp3');
        this.load.audio('kennethVoice', 'audio/kennethDialogue.mp3');
        this.load.audio('jettVoice', 'audio/jettDialogue.mp3');
        this.load.audio('periChoice', 'audio/periChoice.mp3');
        this.load.audio('periVoice', 'audio/periVoice.mp3');
        this.load.audio('ken, siesta, & sloaneVoice', 'audio/victory.mp3');


    }

    create() {
         // create animations
         this.anims.create({
            key: 'periGreen',
            frames: this.anims.generateFrameNumbers('periGreen', {start: 0, end: 10, first: 0}),
            duration: 700
        });
        this.anims.create({
            key: 'win',
            frames: this.anims.generateFrameNumbers('win', {start: 0, end: 3, first: 0}),
            fps: 30
        });

        this.anims.create({         // title screen animation
            key: 'titleAnim',
            frames: this.anims.generateFrameNames('peri_atlas', {
                prefix: 'title_',
                start: 1,
                end: 11,
                zeroPad: 3
            }),
            frameRate: 5,
            repeat: -1,
        });
        this.anims.create({         // end screen animation
            key: 'endAnim',
            frames: this.anims.generateFrameNames('peri_atlas', {
                prefix: 'end_',
                start: 1,
                end: 8,
                zeroPad: 3
            }),
            frameRate: 3.5,
            repeat: -1,
        });
        this.anims.create({         // credits screen animation
            key: 'creditAnim',
            frames: this.anims.generateFrameNames('peri_atlas', {
                prefix: 'credits',
                start: 0,
                end: 5,
                zeroPad: 4
            }),
            frameRate: 4,
            repeat: -1,
        });
        this.anims.create({         // peri wing flapping movement animation
            key: 'wings',
            frames: this.anims.generateFrameNames('peri_atlas', {
                prefix: 'flap_',
                start: 1,
                end: 11,
                zeroPad: 3
            }),
            frameRate: 8,
            repeat: 1,
        });
        
        // start first real game scene
        this.scene.start('endScene');
    }
}