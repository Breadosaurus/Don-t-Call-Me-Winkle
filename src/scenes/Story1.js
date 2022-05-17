class Story1 extends Phaser.Scene {
    constructor() {
        super("story1Scene");
    }

    create() {
        // adding dialogue box
        this.add.rectangle(game.config.width/8, game.config.height*(2/3), game.config.width - 200, game.config.height/3, 0x2F3079).setOrigin(0,0)

        // adding npc sprite
        this.He = this.physics.add.sprite(0, game.config.height*(1/3), 'He').setOrigin(0.25, 0);

        // adding dialogue text
        // (x, y, 'text'). wrap size
        this.dialogue = this.add.text(game.config.width - this.He.x, (game.config.height*(2/3))+50, '').setWordWrapWidth(600);
        // typewriter effect based on example from https://blog.ourcade.co/posts/2020/phaser-3-typewriter-text-effect-bitmap/ 
        this.typewriteTextWrapped('Heeeeeey Periwinkle *yawn* ... How goes it? Having fuuuuun with the new flock?')

    }

    typewriteTextWrapped(text){    
        const lines = this.dialogue.getWrappedText(text)
        const wrappedText = lines.join('\n')

        this.typewriteText(wrappedText)
    }
    
    typewriteText(text) {
	
        const length = text.length
        const lines = this.dialogue.getWrappedText(text)
        const wrappedText = lines.join('\n')
        
        let i = 0
        this.time.addEvent({
            callback: () => {
                this.dialogue.text += text[i]
                ++i
            },
            repeat: length - 1,
            delay: 200
        
        })
    }




}