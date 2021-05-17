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
    this.load.image('fireballRight', 'assets/fireBallRight.png');
    this.load.image('fireballLeft', 'assets/fireBallLeft.png');
    this.load.image('fireballFront', 'assets/fireBallFront.png');
    this.load.image('fireballDown', 'assets/fireBallDown.png');

    }


    create(){

        //player controls
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //preload the player and background
        this.background = this.add.tileSprite(0, 0, 640, 480, 'forest').setOrigin(0, 0);
        this.reaper = new player(this, 288, 215, 'reaperF').setOrigin(0, 0);

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
    }

    //create each fireball
    addFireFront()
    {
        let fireballfront = new FireFront(this, 320, 205, 'fireballFront');
        this.fireGroupfront.add(fireballfront);
    }
    addFireBack()
    {
        let fireballback = new FireBack(this, 320, 260, 'fireballDown');
        this.fireGroupback.add(fireballback);
    }
    addFireLeft()
    {
        let fireballleft = new FireLeft(this, 300, 250, 'fireballLeft');
        this.fireGroupleft.add(fireballleft);
    }
    addFireRight()
    {
        let fireballright = new FireRight(this, 340, 250, 'fireballRight');
        this.fireGroupright.add(fireballright);
    }

    update(){
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
    }
    
}
