class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    

    preload(){
        //load all the still images in the game screen
    this.load.image('lanternBackground','assets/Background_Sign.png');
    this.load.image('treeTop', 'assets/treeTop.png');
    this.load.image('lightning', 'assets/lightning.png');
    this.load.image('waterball', 'assets/water.png');
    this.load.image('fire','assets/fire.png');
        //loads all the audio for the game
    this.load.audio('magic', 'assets/magic_sound.mp3');
    this.load.audio('wind', 'assets/boo.mp3');
    this.load.audio('lightning_sound', 'assets/lightning.mp3');
    this.load.audio('fire_sound', 'assets/fireblast.mp3');
    this.load.audio('water_sound', 'assets/waterblast.mp3');
    //load all sprite sheets for everything that is animated in the game
    this.load.spritesheet('leftTree', 'assets/Left_Tree_Sheet.png',
    {
        frameWidth: 544,
        frameHeight: 476,
        start: 0,
        end: 4
    });
    this.load.spritesheet('rightTree', 'assets/Right_Tree_Sheet.png',
    {
        frameWidth: 487.2,
        frameHeight: 476,
        start: 0,
        end: 4
    });

    this.load.spritesheet('Lantern', 'assets/Lantern_Sheet.png',{
        frameWidth: 148,
        frameHeight: 148,
        start: 0,
        end: 4});    

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
        //different spawn points for the monsters 
        const spawnPoints = [
            [game.config.width/2, 0], //top
            [0, game.config.height/2], //left
            [game.config.width/2, game.config.height], //bottom
            [game.config.width, game.config.height/2] //right
        ];
        //random spawnpoin in the array
        let i = Phaser.Math.Between(0, spawnPoints.length - 1);
        //sets the x and y to the array x and y points
        let [x,y] = spawnPoints[i];
        //all 3 monsters that could be spwaned
        const monsters = [
            'Zombie',
            'Ghost',
            'Troll'
        ];
        //randomly pick which monster to spawn next
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
        this.topTree = this.add.sprite(0, 0,'treeTop').setOrigin(0, 0);
        this.reaper = new player(this, centerX, centerY, 'ReaperFront').setOrigin(.5);
        this.score = 0; 

        this.sound.play('wind');

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //how the player aims using the mouse
        input = this.input;
        mouse = this.input.mousePointer;
        worldBounds = this.physics.world.bounds;
        
        this.currentWeapon = 'waterball';
        //change weapon, weapon speed, and sounds depending on which one is equiped
        this.input.keyboard.on('keydown-E', () => 
        { 
            this.currentWeapon = 'fire';
            this.projectileSpeed = 300;
            this.Damage = 5;
            this.magicsound = 'fire_sound';
        });

        this.input.keyboard.on('keydown-Q', () => 
        { 
            this.currentWeapon = 'lightning';
            this.projectileSpeed = 700;
            this.Damage = 1;
            this.magicsound = 'lightning_sound';
        });
        this.input.keyboard.on('keydown-W', () => 
        { 
            this.currentWeapon = 'waterball';
            this.projectileSpeed = 450;
            this.Damage = 3;
            this.magicsound = 'water_sound';
        });
        //create the animation the reaper uses for shooting projectiles
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
        //create the animation the trees, and lantern use for the game
        this.anims.create
        ({
            key: 'LTree',
            frameRate: 8,
            frames: this.anims.generateFrameNames('leftTree', {start: 0, end: 4})
        });
        this.anims.create
        ({
            key: 'RTree',
            frameRate: 8,
            frames: this.anims.generateFrameNames('rightTree', {start: 0, end: 4})
        });

        this.anims.create
        ({
            key: 'Lantern',
            frameRate: 4,
            frames: this.anims.generateFrameNames('Lantern', {start: 0, end: 4})
        });
        //create groups for monster and projectile so they can all be changed in one area
        this.projectileGroup = this.add.group({
           runChildUpdate: true 
        });

        this.monsterGroup = this.add.group({
            runChildUpdate: true
        });
        //spawn a new monster every 2 seconds
        this.time.addEvent({
            delay : 2000,
            callback: () => {
                this.addMonster();
            },
            loop: true,
        });
        //spawn things here 
        this.LeftTree = this.add.sprite(275, 750, 'leftTree');
        this.RightTree = this.add.sprite(885, 687, 'rightTree');
        this.lantern = this.add.sprite(425, 370, 'Lantern');
        this.text = this.add.text (0, 0, 'Damage Done: ');
        this.scoreLeft = this.add.text(0, 20, this.score,{fontSize: '72px', fill: '#ecf0f1'});
    }
    shootProjectile(animation)
    {
        //when space is pressed shoot projectile
        if(Phaser.Input.Keyboard.JustDown(keySPACE))
        {
            //adds projectil eot a group, shoots it towards the mouse position
            this.projectile = this.physics.add.sprite(centerX, centerY, this.currentWeapon);
            this.projectileGroup.add(this.projectile);
            this.physics.moveTo(this.projectile, input.x, input.y, this.projectileSpeed);
            //plays which ever sounds are equiped with projectile and plays the reaper animation for its
            //direction it is looking at.
            this.sound.play(this.magicsound);
            this.reaper.play(animation);
        }
    }
    update(){
        //angle lets the reaper know which direction to face to shoot the projectile
        let angle = Phaser.Math.Angle.Between(this.reaper.x, this.reaper.y, input.x, input.y);
        //plays the animations
        this.LeftTree.play('LTree', true);
        this.RightTree.play('RTree',true);
        this.lantern.play('Lantern',true);
        //checks where the mouse is and sends which animation to play for the reaper when space is pressed.
        if (angle > 1 && angle < 2.5)
        {
            this.shootProjectile('Front');
        }
        else if(angle < 1 && angle > -1)
        {
            this.shootProjectile('Right');
        }
        else if( angle < -1 && angle > -2.5)
        {
            this.shootProjectile('Back');

        }
        else
        {
            this.shootProjectile('Left');
        }
        //collision for the enemies and projectiles
        this.physics.world.overlap(this.monsterGroup, this.projectileGroup, (zombie,projectile) => {
            zombie.takeDamage();
            projectile.destroy();
            //update score/damage on hit
            this.score += 5;
            this.scoreLeft.text = this.score;
        });
        //when the reaper is killed send to game over screen
        if(this.physics.world.collide(this.monsterGroup, this.reaper)){
            this.scene.start('gameOverScene'); 
        }
    }
}