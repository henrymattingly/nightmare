class Credits extends Phaser.Scene
{
    constructor()
    {
        super("CreditScene");
    }

    preload()
    {
        this.load.image('Credits', 'assets/credits.png')
    }

    create()
    {
        //load an image that tells player credits and sends back to main menu screen
        this.add.sprite(0, 0, 'Credits').setOrigin(0, 0);
        this.input.keyboard.on('keydown-M', () => this.scene.start("menuScene"));
    }
}