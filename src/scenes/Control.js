class Control extends Phaser.Scene
{
    constructor()
    {
        super("ControlScene");
    }

    preload()
    {
        this.load.image('Controls', 'assets/controlscene.png')
    }

    create()
    {
        //load an image that tells player controls and sends back to main menu screen
        this.add.sprite(0, 0, 'Controls').setOrigin(0, 0);
        this.input.keyboard.on('keydown-M', () => this.scene.start("menuScene"));
    }
}