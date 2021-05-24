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

    this.load.image('kylo', 'assets/kylo.png');

    this.load.audio('magic', 'assets/magic_sound.mp3');
    this.load.audio('zombie_sound', 'assets/zombie_sound.mp3');
    this.load.audio('wind', 'assets/wind.mp3');
    }


    create(){
        this.sound.play('wind');

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        input = this.input;
        mouse = this.input.mousePointer;
        worldBounds = this.physics.world.bounds;
        
        this.currentWeapon = 'waterball';

        this.input.keyboard.on('keydown-E', () => 
        { 
            this.currentWeapon = 'fire';
        });

        this.input.keyboard.on('keydown-Q', () => 
        { 
            this.currentWeapon = 'waterball';
        });
        this.input.keyboard.on('keydown-W', () => 
        { 
            this.currentWeapon = 'lightning';
        });



        //preload the player and background
        this.background = this.add.tileSprite(0, 0, 1150, 1000, 'forest').setOrigin(0, 0);
        this.reaper = new player(this, centerX, centerY, 'reaperF').setOrigin(.5);
        this.emptySprite = this.physics.add.sprite(centerX, centerY,'kylo').setOrigin(.5);


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


        //change the sprite of the zombie depending on spawn location
        if(x == game.config.width/2 && y == 0)
        {
            this.zombie = new Zombie(this, x, y, 'fire');
            this.zombieGroup.add(this.zombie);
        }
        if(x == 0 && y == game.config.height/2)
        {
            this.zombie = new Zombie(this, x, y, 'waterball')
            this.zombieGroup.add(this.zombie);
        }
        if(x == game.config.width/2 && y == game.config.height)
        {
            this.zombie = new Zombie(this, x, y, 'lightning')
            this.zombieGroup.add(this.zombie);
        }
        if(x == game.config.width && y == game.config.height/2)
        {
            this.zombie = new Zombie(this, x, y, 'zombie')
            this.zombieGroup.add(this.zombie);
        }
        console.log(i);
        this.sound.play('zombie_sound');
    }




    update(){

        let angle = Phaser.Math.Angle.Between(this.emptySprite.x, this.emptySprite.y, input.x, input.y);
        this.emptySprite.setRotation(angle + Math.PI /2);
        

        if(Phaser.Input.Keyboard.JustDown(keySPACE))
        {
            this.projectile = this.physics.add.sprite(centerX, centerY, this.currentWeapon);
            this.projectileGroup.add(this.projectile);
            this.physics.moveTo(this.projectile, input.x, input.y, 500);
            this.sound.play('magic');
        }  

        if(this.physics.world.collide(this.zombieGroup, this.projectileGroup)){
            this.zombieCollide();
        }
    }
    

    zombieCollide(){
       this.zombie.destroy();
       this.projectile.destroy();
    }
}