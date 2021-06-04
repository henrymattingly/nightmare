class Menu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }

    preload()
    {
        this.load.image('title_screen', 'assets/title_screen.png')
        this.load.audio('MenuMusic', 'assets/menuSound.mp3');
    }
    
    create()
    {
        //loads the main menu and buttons to go to different screens
        this.sound.play('MenuMusic');
        this.title = this.add.tileSprite(0, 0, 1150, 1000, 'title_screen').setOrigin(0, 0);
        this.input.keyboard.on('keydown-P', () => this.scene.start("playScene"));
        this.input.keyboard.on('keydown-C', () => this.scene.start("ControlScene"));
        this.input.keyboard.on('keydown-X', () => this.scene.start("CreditScene"));
    }
}