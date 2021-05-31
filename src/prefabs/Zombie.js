class Zombie extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame) 
    {
        super (scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = .2; 
        this.health = 3;
    
        this.anims.create({
            key : 'ZombieFront',
            frameRate: 10,
            frames: this.anims.generateFrameNames('ZombieFront', {start: 0, end:4})
        });
        this.anims.create({
            key : 'ZombieBack',
            frameRate: 10,
            frames: this.anims.generateFrameNames('ZombieBack', {start: 0, end:4})
        });
        this.anims.create({
            key : 'ZombieLeft',
            frameRate: 10,
            frames: this.anims.generateFrameNames('ZombieLeft', {start: 0, end:4})
        });
        this.anims.create({
            key : 'ZombieRight',
            frameRate: 10,
            frames: this.anims.generateFrameNames('ZombieRight', {start: 0, end:4})
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
            this.play('ZombieFront');
            this.y += this.speed; 
        }
        if(this.x < game.config.width/2) //left
        {
            this.play('ZombieLeft')
            this.x += this.speed;
        }
        if(this.y > game.config.height/2) //bottom
        {
            this.play('ZombieBack')
            this.y -= this.speed; 
        }
        if(this.x > game.config.width/2) //right
        {
            this.play('ZombieRight')
            this.x -= this.speed;
        }
    
    }

}