class Zombie extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame) {
        super (scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = .2;
    }

    update()
    {
        this.y += this.speed;
        if(this.y >= game.config.height){
            this.destroy();
        }
    }
}