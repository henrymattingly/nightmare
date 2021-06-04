class GameOver extends Phaser.Scene
{
    constructor()
    {
        super("gameOverScene");
    }

    preload()
    {
        this.load.image('END', 'assets/endscreen.png');
        this.load.audio('Death', 'assets/deathSound.mp3');
    }

    create()
    {
        //loads the game over screen, stops all sounds, and option to play again after death
        this.sound.play('Death');
        this.add.sprite(0, 0, 'END').setOrigin(0, 0);
        this.input.keyboard.on('keydown-R', () => this.scene.start("playScene"));
        this.input.keyboard.on('keydown-M', () => this.scene.start("menuScene"));
        this.game.sound.stopAll();
    }
}