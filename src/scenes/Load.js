class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        // set load path weehee
        this.load.path = 'assets/';

        // migration assets
        this.load.image('bg_1', 'img/bg_001.png');
        this.load.image('bg_2', 'img/bg_002.png');
        this.load.image('bg_3', 'img/bg_003.png');
        this.load.image('clouds_1', 'img/bg_001_clouds.png');
        this.load.image('clouds_2', 'img/bg_002_clouds.png');
        this.load.image('clouds_3', 'img/bg_003_clouds.png');
        this.load.image('periMigrate', 'img/periMigrate.png');
        this.load.image('swanMigrate', 'img/swanMigrate.png');
        // story assets
        this.load.image('periStory', 'img/periStory.png');
        this.load.image('pilot', 'img/pilot.png');
        this.load.image('swan1', 'img/slowSwan.png');
        this.load.image('swan2', 'img/strongSwan.png');
        this.load.image('swan3', 'img/kindSwan.png');
        this.load.image('swanBox', 'img/textBox.png');
        this.load.image('vn_Bg', 'img/vnBg.png');
        // misc/ui
        this.load.image('titleScreen', 'img/title_001.png');
        this.load.image('ending', 'img/end_001.png');
        this.load.image('credits', 'img/credits0000.png');
        this.load.image('creditButton', 'img/credButton.png');
        this.load.image('start', 'img/startButton.png');
        this.load.image('credStrip', 'img/credStrip.png');
        this.load.image('menuStrip', 'img/menuStrip.png');

        
        this.load.image('jeff', 'img/jeffrey_thomas.png');

        // load texture atlas for animations
        this.load.atlas('peri_atlas', 'img/periSheet.png', 'json/periSheet.json');


        // migration sfx
        this.load.audio('win', 'audio/victory.mp3');
        this.load.audio('fail', 'audio/failForm.mp3');
        this.load.audio('bump1', 'audio/bump1.mp3');
        this.load.audio('bump2', 'audio/bump2.mp3');
        this.load.audio('bump3', 'audio/bump3.mp3');
        this.load.audio('bump4', 'audio/bump4.mp3');
        this.load.audio('bump5', 'audio/bump5.mp3');
        this.load.audio('bump6', 'audio/bump6.mp3');
        this.load.audio('flap', 'audio/wingBeat1.mp3');
        // ui sfx
        this.load.audio('menuSelect', 'audio/menuSelect.mp3');
        this.load.audio('migStart', 'audio/migrateStart.mp3');
        // story sfx
        this.load.audio('siesta', 'audio/siestaChosen.mp3');
        this.load.audio('sloane', 'audio/sloaneChosen.mp3');
        this.load.audio('kenneth', 'audio/kennethChosen.mp3');
        this.load.audio('siestaVoice', 'audio/siestaDialogue.mp3');
        this.load.audio('sloaneVoice', 'audio/sloaneDialogue.mp3');
        this.load.audio('kennethVoice', 'audio/kennethDialogue.mp3');
        this.load.audio('jettVoice', 'audio/jettDialogue.mp3');
        this.load.audio('periChoice', 'audio/periChoice.mp3');


        // preload migration map json file
        this.load.json('migrationMap', 'json/migrationMap.json');
        this.load.json('swanDialogue', 'json/swansDialogue.json');
        // this.load.json('periDialogue', 'json/periDialogue.json');
    }

    create() {
        
        this.scene.start('tutorialScene');

    }

}