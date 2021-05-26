class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    

    preload(){

    this.load.image('forest', 'assets/background.png');

    this.load.image('reaperF', 'assets/RPFront.png');
    this.load.image('reaperB', 'assets/RPBack.png');
    this.load.image('reaperL', 'assets/RPLeft.png');
    this.load.image('reaperR', 'assets/RPRight.png');


    this.load.image('lightning', 'assets/lightning.png');
    this.load.image('waterball', 'assets/water.png');
    this.load.image('fire','assets/fire.png');


    this.load.image('zombie', 'assets/zombie.png');


    this.load.audio('magic', 'assets/magic_sound.mp3');
    this.load.audio('zombie_sound', 'assets/zombie_sound.mp3');
    this.load.audio('wind', 'assets/wind.mp3');


    this.load.spritesheet('ReaperFront', 'assets/ReaperFront.png',{
        frameWidth: 120,
        frameHeight: 32,
        start: 0,
        end: 4});
    this.load.spritesheet('ReaperBack', 'assets/ReaperBack.png',{
        frameWidth: 640,
        frameHeight: 640,
        start: 0,
        end: 4});
    this.load.spritesheet('ReaperRight', 'assets/ReaperRight.png',{
        frameWidth: 640,
        frameHeight: 640,
        start: 0,
       end: 4});
    this.load.spritesheet('ReaperLeft', 'assets/ReaperLeft.png',{
        frameWidth: 640,
        frameHeight: 640,
        start: 0,
        end: 4});
    
    }


    create(){
        //preload the player and background
        this.background = this.add.tileSprite(0, 0, 1150, 1000, 'forest').setOrigin(0, 0);
        this.reaper = new player(this, centerX, centerY, 'reaperF').setOrigin(.5);
        this.score = 0;
        this.scoreLeft = this.add.text(0, 0, this.score,{fontSize: '32px', fill: '#ecf0f1'}); 

        this.sound.play('wind');

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        input = this.input;
        mouse = this.input.mousePointer;
        worldBounds = this.physics.world.bounds;
        
        this.currentWeapon = 'waterball';

        this.input.keyboard.on('keydown-E', () => 
        { 
            this.currentWeapon = 'fire';
            this.projectileSpeed = 300;
            this.fireDamage;
        });

        this.input.keyboard.on('keydown-Q', () => 
        { 
            this.currentWeapon = 'lightning';
            this.projectileSpeed = 700;
            this.LightningDamage;
        });
        this.input.keyboard.on('keydown-W', () => 
        { 
            this.currentWeapon = 'waterball';
            this.projectileSpeed = 450;
            this.waterBallDamage;
        });

        this.reaperAni = this.add.sprite(centerX, centerY, 'ReaperFront').setOrigin(0,0);

        this.anims.create({
            key: 'Front',
            frameRate: 10,
            frames: this.anims.generateFrameNames('ReaperFront', {start: 0, end:4})
        });
        this.anims.create({
            key: 'Back',
            frameRate: 10,
            frames: this.anims.generateFrameNames('ReaperBack', {start: 0, end:4})
        });
        this.anims.create({
            key: 'Right',
            frameRate: 10,
            frames: this.anims.generateFrameNames('ReaperRight', {start: 0, end:4})
        });
        this.anims.create({
            key: 'Left',
            frameRate: 10,
            frames: this.anims.generateFrameNames('ReaperLeft', {start: 0, end:4})
        });

        this.projectileGroup = this.add.group({
           runChildUpdate: true 
        });
    


        this.zombieGroup = this.add.group({
            runChildUpdate: true
        });

        this.time.addEvent({
            delay : 2000,
            callback: () => {
                this.addMonster();
            },
            loop: true,
        });
    }

    addMonster(){
        const spawnPoints = [
            [game.config.width/2, 0], //top
            [0, game.config.height/2], //left
            [game.config.width/2, game.config.height], //bottom
            [game.config.width, game.config.height/2] //right
        ];

        let i = Phaser.Math.Between(0, spawnPoints.length - 1);

        let [x,y] = spawnPoints[i];

        const monsters = [
            'zombie',
            'waterball',
            'lightning',
            'fire'
        ];

        let j = Phaser.Math.Between(0, monsters.length -1);


        //change the sprite of the zombie depending on spawn location
        if(x == game.config.width/2 && y == 0) //top
        {
            this.zombieGroup.add(new Zombie(this, x, y, monsters[j]));
        }
        if(x == 0 && y == game.config.height/2) //left
        {
            this.zombieGroup.add(new Zombie(this, x, y, monsters[j]));
        }
        if(x == game.config.width/2 && y == game.config.height) //bottom
        {
            this.zombieGroup.add(new Zombie(this, x, y, monsters[j]));
        }
        if(x == game.config.width && y == game.config.height/2) //right
        {
            this.zombieGroup.add(new Zombie(this, x, y, monsters[j]));

        }
        this.sound.play('zombie_sound');
    }



    shootProjectile(animation)
    {
        if(Phaser.Input.Keyboard.JustDown(keySPACE))
        {
            this.projectile = this.physics.add.sprite(centerX, centerY, this.currentWeapon);
            this.projectileGroup.add(this.projectile);
            this.physics.moveTo(this.projectile, input.x, input.y, this.projectileSpeed);
            this.sound.play('magic');
            this.reaperAni.play(animation);
        }
    }
    update(){

        let angle = Phaser.Math.Angle.Between(this.reaper.x, this.reaper.y, input.x, input.y);

        if (angle > 1 && angle < 2.5)
        {
            this.reaper.setTexture('reaperF');
            this.shootProjectile('Front');
        }
        else if(angle < 1 && angle > -1)
        {
            this.reaper.setTexture('reaperR');
            this.shootProjectile('Right');
        }
        else if( angle < -1 && angle > -2.5)
        {
            this.reaper.setTexture('reaperB')
            this.shootProjectile('Back');

        }
        else
        {
            this.reaper.setTexture('reaperL');
            this.shootProjectile('Left');
        }


        this.physics.world.overlap(this.zombieGroup, this.projectileGroup, (zombie,projectile) => {
            zombie.takeDamage();
            projectile.destroy();
            this.score += 5;
            this.scoreLeft.text = this.score;
        });
        if(this.physics.world.collide(this.zombieGroup, this.reaper)){
            this.scene.start('gameOverScene'); 
        }
    }
}