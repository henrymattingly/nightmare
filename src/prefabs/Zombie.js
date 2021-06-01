class Zombie extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, score, frame)
    {
        super (scene, x, y, texture, score, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = .2; 
        this.health = 3;
        this.playanims = true;
    
        this.anims.create({
            key : 'ZombieFront',
            frameRate: 10,
            frames: this.anims.generateFrameNames('ZombieFront', {start: 0, end:4}),
            repeat: -1,
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
            this.score += 5;
        }
        if(this.y < game.config.height/2) //top
        {
            this.play('ZombieFront',true);
            this.y += this.speed; 
        }
        if(this.x < game.config.width/2) //right
        {
            this.play('ZombieRight', true)
            this.x += this.speed;
        }
        if(this.y > game.config.height/2) //bottom
        {
            this.play('ZombieBack',true)
            this.y -= this.speed; 
        }
        if(this.x > game.config.width/2) //left
        {
            this.play('ZombieLeft',true)
            this.x -= this.speed;
        }
    
    }

}