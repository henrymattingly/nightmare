class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload()
    {
        this.load.image('title_screen', 'assets/title_screen.png')
    }

    create()
    {
        this.title = this.add.tileSprite(0, 0, 1150, 1000, 'title_screen').setOrigin(0, 0);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }

    update()
    {
        if(keyP.isDown)
        {
            this.scene.start("playScene");
        }
        if(keyC.isDown)
        {
            this.scene.start("ControlScene");
        }
    }
}