class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    

    preload(){
    this.load.image('forest', 'assets/haunted_forest.png');
    this.load.image('reaperF', 'assets/RPFront.png');
    this.load.image('reaperB', 'assets/RPBack.png');
    this.load.image('reaperL', 'assets/RPLeft.png');
    this.load.image('reaperR', 'assets/RPRight.png');
    //this.load.image('fireballRight', 'assets/fireBallRight.png');
    //this.load.image('fireballLeft', 'assets/fireBallLeft.png');
    //this.load.image('fireballFront', 'assets/fireBallFront.png');
    this.load.image('fireballDown', 'assets/fireBallDown.png');
    this.load.image('waterball', 'assets/water.png');
    this.load.image('fire','assets/fire.png');
    this.load.image('zombieDown', 'assets/zombieFront.png');

    this.load.image('kylo', 'assets/kylo.png');

    }


    create(){

        input = this.input;
        //player controls
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        this.currentWeapon = 'fire';

        this.input.keyboard.on('keydown-Q', () => 
        { 
            this.currentWeapon = 'waterball';
        });


        mouse = this.input.mousePointer;

        //preload the player and background
        this.background = this.add.tileSprite(0, 0, 640, 480, 'forest').setOrigin(0, 0);
        this.reaper = new player(this, centerX, centerY, 'reaperF').setOrigin(.5);
        this.zombie = new Zombie(this, 320, 0, 'zombieDown');
        this.emptySprite = this.physics.add.sprite(centerX, centerY,'kylo').setOrigin(.5);


        //make the fireballs in a group
        this.fireGroupfront = this.add.group({
            runChildUpdate : true
        });
        this.fireGroupback = this.add.group({
            runChildUpdate : true
        });
        this.fireGroupleft = this.add.group({
            runChildUpdate : true
        });
        this.fireGroupright = this.add.group({
            runChildUpdate : true
        });

    worldBounds = this.physics.world.bounds;

        this.zombieGroup = this.add.group({
            runChildUpdate: true
        });




        this.time.delayedCall(2000, () => {
            this.addZombie();
        });

    }

    addZombie(){
        const spawnPoints = [
            [320,0],
            [100,100],
            [200,200],
        ];
        let i = Phaser.Math.Between(0, spawnPoints.length);

        let [x,y] = spawnPoints[i];
        let zombie = new Zombie(this, x, y, 'zombieDown');
        this.zombieGroup.add(zombie);
    }






    //create each fireball
    addFireFront()
    {
        let fireballfront = new FireFront(this, 320, 205, 'fire');
        this.fireGroupfront.add(fireballfront);
    }
    addFireBack()
    {
        let fireballback = new FireBack(this, 320, 260, 'fireballDown');
        this.fireGroupback.add(fireballback);
    }
    addFireLeft()
    {
        let fireballleft = new FireLeft(this, 300, 250, 'waterball');
        this.fireGroupleft.add(fireballleft);
    }
    addFireRight()
    {
        let fireballright = new FireRight(this, 340, 250, 'fireballRight');
        this.fireGroupright.add(fireballright);
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
        if(this.waterball.x > worldBounds.width || this.waterball.y > worldBounds.height || this.waterball.x < 0 || this.waterball.y < 0){
            control = false;
        }
*/
        //this.zombie.update();
        if(Phaser.Input.Keyboard.JustDown(keyW)){
            this.reaper.setTexture('reaperB');
            this.addFireFront();
            console.log("FACING FORWARD");
        }
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.reaper.setTexture('reaperF');
            this.addFireBack();
            console.log("FACING BACKWARD");
        }
        if(Phaser.Input.Keyboard.JustDown(keyD)){
            this.reaper.setTexture('reaperR');
            this.addFireRight();
            console.log("FACING RIGHT");
        }
        if(Phaser.Input.Keyboard.JustDown(keyA)){
            this.reaper.setTexture('reaperL');
            this.addFireLeft();
            console.log("FACING LEFT");
        }
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.addFireFront();
            console.log("FIRE BALL");
        }

        this.physics.world.overlap(this.zombie, this.reaper, this.zombieCollide, null, this);
        this.physics.world.overlap(this.zombie, this.waterball, this.zombieCollide, null, this);
    }
    
    zombieCollide(){
        this.zombie.destroy();
    }
}
