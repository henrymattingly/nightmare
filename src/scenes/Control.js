class Control extends Phaser.Scene{
    constructor(){
        super("ControlScene");
    }

    preload()
    {
        this.load.image('Controls', 'assets/controlscene.png')
    }

    create()
    {
        this.title = this.add.tileSprite(0, 0, 1150, 1000, 'Controls').setOrigin(0, 0);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }

    update()
    {
        if(keyM.isDown)
        {
            this.scene.start("menuScene");
        }
    }
}