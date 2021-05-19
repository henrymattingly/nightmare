class FireFront extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame) {
        super (scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.moveSpeed = 4;
    }
    update(){
        this.y -= this.moveSpeed;
        if(this.y == game.config.height)
        {
            this.destroy();
        }
    }
}