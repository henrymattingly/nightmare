class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }

    preload()
    {
        this.load.image('END', 'assets/endscreen.png');
    }

    create()
    {
        this.title = this.add.tileSprite(0, 0, 1150, 1000, 'END').setOrigin(0, 0);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update()
    {
        if(keyM.isDown)
        {
            this.scene.start("menuScene");
        }
        if(keyR.isDown)
        {
            this.scene.start("playScene");
        }
    }
}