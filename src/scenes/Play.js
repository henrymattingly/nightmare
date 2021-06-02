class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    

    preload(){
        
    this.load.image('lanternBackground','assets/Background.png');
    this.load.image('trees', 'assets/Trees.png');

    this.load.spritesheet('Lantern', 'assets/Lantern_Sheet.png',{
        frameWidth: 64,
        frameHeight: 64,
        start: 0,
        end: 4});    



    this.load.image('lightning', 'assets/lightning.png');
    this.load.image('waterball', 'assets/water.png');
    this.load.image('fire','assets/fire.png');


    //this.load.image('zombie', 'assets/zombie.png');


    this.load.audio('magic', 'assets/magic_sound.mp3');
    this.load.audio('zombie_sound', 'assets/zombie_sound.mp3');
    this.load.audio('wind', 'assets/boo.mp3');


    this.load.spritesheet('ReaperFront', 'assets/ReaperFront.png',{
        frameWidth: 64,
        frameHeight: 64,
        start: 0,
        end: 4});
    this.load.spritesheet('ReaperBack', 'assets/ReaperBack.png',{
        frameWidth: 64,
        frameHeight: 64,
        start: 0,
        end: 4});
    this.load.spritesheet('ReaperRight', 'assets/ReaperRight.png',{
        frameWidth: 64,
        frameHeight: 64,
        start: 0,
       end: 4});
    this.load.spritesheet('ReaperLeft', 'assets/ReaperLeft.png',{
        frameWidth: 64,
        frameHeight: 64,
        start: 0,
        end: 4});

    this.load.spritesheet('Ghost', 'assets/Ghost.png',{
        frameWidth: 64,
        frameHeight: 64,
        start: 0,
        end: 4});

    this.load.spritesheet('ZombieFront', 'assets/ZombieFront.png',{
        frameWidth: 64,
        frameHeight: 64,
        start: 0,
        end: 4});
    this.load.spritesheet('ZombieBack', 'assets/ZombieBack.png',{
        frameWidth: 64,
        frameHeight: 64,
        start: 0,
        end: 4});
    this.load.spritesheet('ZombieLeft', 'assets/ZombieLeft.png',{
        frameWidth: 64,
        frameHeight: 64,
        start: 0,
        end: 4});
    this.load.spritesheet('ZombieRight', 'assets/ZombieRight.png',{
        frameWidth: 64,
        frameHeight: 64,
        start: 0,
        end: 4});

    this.load.spritesheet('Troll', 'assets/Troll.png',{
        frameWidth: 64,
        frameHeight: 64,
        start: 0,
        end: 4});
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
            'Zombie',
            'Ghost',
            'Troll'
        ];

        let j = Phaser.Math.Between(0, monsters.length -1);

        //change the sprite of the depending on spawn location
        if(x == game.config.width/2 && y == 0) //top
        {
            if(j == 0)
            {
                this.monsterGroup.add(new Zombie(this, x, y, monsters[j]));
            }
            else if(j == 1)
            {
                this.monsterGroup.add(new Ghost(this, x, y, monsters[j]));
            }
            else 
            {
                this.monsterGroup.add(new Troll(this, x, y, monsters[j]));
            }
        }
        if(x == 0 && y == game.config.height/2) //left
        {
            if(j == 0)
            {
                this.monsterGroup.add(new Zombie(this, x, y, monsters[j]));
            }
            else if(j == 1)
            {
                this.monsterGroup.add(new Ghost(this, x, y, monsters[j]));
            }
            else 
            {
                this.monsterGroup.add(new Troll(this, x, y, monsters[j]));
            }
        }
        if(x == game.config.width/2 && y == game.config.height) //bottom
        {
            if(j == 0)
            {
                this.monsterGroup.add(new Zombie(this, x, y, monsters[j]));
            }
            else if(j == 1)
            {
                this.monsterGroup.add(new Ghost(this, x, y, monsters[j]));
            }
            else 
            {
                this.monsterGroup.add(new Troll(this, x, y, monsters[j]));
            }
        }
        if(x == game.config.width && y == game.config.height/2) //right
        {
            if(j == 0)
            {
                this.monsterGroup.add(new Zombie(this, x, y, monsters[j]));
            }
            else if(j == 1)
            {
                this.monsterGroup.add(new Ghost(this, x, y, monsters[j]));
            }
            else 
            {
                this.monsterGroup.add(new Troll(this, x, y, monsters[j]));
            }

        }
    }


    create(){
        //preload the player and background
        this.Background = this.add.tileSprite(0, 0, 1150, 1000, 'lanternBackground').setOrigin(0, 0);
        
        //this.lantern = this.add.sprite(408, 355, 'Lantern').setOrigin(0,0);
        this.reaper = new player(this, centerX, centerY, 'ReaperFront').setOrigin(.5);
        this.score = 0; 

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

        

        this.reaper.anims.create({
            key: 'Front',
            frameRate: 10,
            frames: this.anims.generateFrameNames('ReaperFront', {start: 0, end:4})
        });
        this.reaper.anims.create({
            key: 'Back',
            frameRate: 10,
            frames: this.anims.generateFrameNames('ReaperBack', {start: 0, end:4})
        });
        this.reaper.anims.create({
            key: 'Right',
            frameRate: 10,
            frames: this.anims.generateFrameNames('ReaperRight', {start: 0, end:4})
        });
        this.reaper.anims.create({
            key: 'Left',
            frameRate: 10,
            frames: this.anims.generateFrameNames('ReaperLeft', {start: 0, end:4})
        });

        this.projectileGroup = this.add.group({
           runChildUpdate: true 
        });

        this.monsterGroup = this.add.group({
            runChildUpdate: true
        });

        this.time.addEvent({
            delay : 2000,
            callback: () => {
                this.addMonster();
            },
            loop: true,
        });
        this.trees = this.add.tileSprite(0, 0, 1150, 1000, 'trees').setOrigin(0, 0);
        this.text = this.add.text (0,0, 'Damage Done: ');
        this.scoreLeft = this.add.text(0, 20, this.score,{fontSize: '72px', fill: '#ecf0f1'});
    }

   



    shootProjectile(animation)
    {
        if(Phaser.Input.Keyboard.JustDown(keySPACE))
        {
            this.projectile = this.physics.add.sprite(centerX, centerY, this.currentWeapon);
            this.projectileGroup.add(this.projectile);
            this.physics.moveTo(this.projectile, input.x, input.y, this.projectileSpeed);
            this.sound.play('magic');
            this.reaper.play(animation);
        }
    }
    update(){

        let angle = Phaser.Math.Angle.Between(this.reaper.x, this.reaper.y, input.x, input.y);

        if (angle > 1 && angle < 2.5)
        {
            //this.reaper.setTexture('reaperF');
            this.shootProjectile('Front');
        }
        else if(angle < 1 && angle > -1)
        {
            //this.reaper.setTexture('reaperR');
            this.shootProjectile('Right');
        }
        else if( angle < -1 && angle > -2.5)
        {
            //this.reaper.setTexture('reaperB')
            this.shootProjectile('Back');

        }
        else
        {
            //this.reaper.setTexture('reaperL');
            this.shootProjectile('Left');
        }


        this.physics.world.overlap(this.monsterGroup, this.projectileGroup, (zombie,projectile) => {
            zombie.takeDamage();
            projectile.destroy();
            this.score += 5;
            this.scoreLeft.text = this.score;
        });
        if(this.physics.world.collide(this.monsterGroup, this.reaper)){
            this.scene.start('gameOverScene'); 
        }
    }
}