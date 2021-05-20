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

    }


    create(){

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
        this.background = this.add.tileSprite(0, 0, 640, 480, 'forest').setOrigin(0, 0);
        this.reaper = new player(this, centerX, centerY, 'reaperF').setOrigin(.5);
        this.emptySprite = this.physics.add.sprite(centerX, centerY,'kylo').setOrigin(.5);


        this.zombieGroup = this.add.group({
            runChildUpdate: true
        });




        this.time.delayedCall(2000, () => {
            this.addMonster();
        });

    }

    addMonster(){
        const spawnPoints = [
            [320,0], //top
            [100,100], 
            [200,200],
        ];
        let i = Phaser.Math.Between(0, spawnPoints.length);

        let [x,y] = spawnPoints[i];
        let zombie = new Zombie(this, x, y, 'zombie');
        this.zombieGroup.add(zombie);
    }






    update(){
        let angle = Phaser.Math.Angle.Between(this.emptySprite.x, this.emptySprite.y, input.x, input.y);
        this.emptySprite.setRotation(angle + Math.PI /2);
        
        //if(mouse.isDown && control == false)
        if(mouse.isDown)
        {
            let projectile = this.physics.add.sprite(centerX, centerY, this.currentWeapon);
            this.physics.moveTo(projectile, input.x, input.y, 500);
            //control = true;
        }
/*
        if(projectile.x > worldBounds.width || projectile.y > worldBounds.height || projectile.x < 0 || projectile.y < 0){
            control = false;
        }
*/

        //this.physics.world.overlap(this.zombiegroup, this.reaper, this.zombieCollide, null, this);
        //this.physics.world.overlap(this.zombie, this.waterball, this.zombieCollide, null, this);
    }
    
    zombieCollide(){
        this.zombie.destroy();
    }
}
