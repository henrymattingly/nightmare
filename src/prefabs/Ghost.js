class Ghost extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, score, frame) 
    {
        super (scene, x, y, texture, score, frame);

        //add physics and set health and speed for ghost
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = 1; 
        this.health = 5;

        //create the animation the ghost uses
        this.anims.create({
            key : 'Ghost',
            frameRate: 10,
            frames: this.anims.generateFrameNames('Ghost', {start: 0, end:4}),
            repeat: -1
        });
    }
    takeDamage()
    {
        //getting hit by projectile takes damage
        this.health -= 1;
    }

    update()
    {
        //checks the location of the ghost and moves them toward the center of map
        if(this.y < game.config.height/2) //top
        {
            this.play('Ghost', true);
                this.y += this.speed; 
        }
        if(this.x < game.config.width/2) //left
        {
            this.play('Ghost', true);
            this.x += this.speed;
        }
        if(this.y > game.config.height/2) //bottom
        {
            this.play('Ghost', true);
            this.y -= this.speed; 
        }
        if(this.x > game.config.width/2) //right
        {
            this.play('Ghost', true);
            this.x -= this.speed;
        }
        if (this.health <= 0)
        {
            this.destroy();
        }
     }

}