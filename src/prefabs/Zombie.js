class Zombie extends Phaser.Physics.Arcade.Image
{
    constructor(scene, x, y, texture, frame) 
    {
        super (scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = .2; 
        this.health = 3;
    }

    preload()
    {
        this.load.spritesheet('ZombieFront', 'assets/ZombieFront.png',{
            frameWidth: 64,
            frameHeight: 64,
            start: 0,
            end: 4});
    }
    create()
    {
        this.anims.create({
            key : 'ZombieFront',
            frameRate: 10,
            frames: this.anims.generateFrameNames('ZombieFront', {start: 0, end:4})
        });
    }
    takeDamage()
    {
        this.health -= 1;
    }

    update()
    {
        if (this.health <= 0)
        {
            this.destroy();
        }
        if(this.y < game.config.height/2) //top
        {
            this.anims.play('ZombieFront');
            this.y += this.speed; 
        }
        if(this.x < game.config.width/2) //left
        {
            this.x += this.speed;
        }
        if(this.y > game.config.height/2) //bottom
        {
            this.y -= this.speed; 
        }
        if(this.x > game.config.width/2) //right
        {
            this.x -= this.speed;
        }
    
    }

}