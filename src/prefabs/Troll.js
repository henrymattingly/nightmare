class Troll extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, score, frame) 
    {
        super (scene, x, y, texture, score, frame);
        //adds physics to troll and speed and health
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = .2; 
        this.health = 16;

        //create animation for troll to use
        this.anims.create({
            key : 'Troll',
            frameRate: 10,
            frames: this.anims.generateFrameNames('Troll', {start: 0, end:4}),
            repeat: -1
        });
    }
    takeDamage()
    {
        this.health -= 1;
    }

    update()
    {   
        //checks location of troll and moves it to center of map
        if(this.y < game.config.height/2) //top
        {
            this.play('Troll', true);
            this.y += this.speed; 
        }
        if(this.x < game.config.width/2) //left
        {
            this.play('Troll', true);
            this.x += this.speed;
        }
        if(this.y > game.config.height/2) //bottom
        {
            this.play('Troll', true);
            this.y -= this.speed; 
        }
        if(this.x > game.config.width/2) //right
        {
            this.play('Troll', true);
            this.x -= this.speed;
        }
        if (this.health <= 0)
        {
            this.destroy();
        }
    
    }

}