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
    this.load.image('fireball', 'assets/fireBall.png');

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
        this.fireGroup = this.add.group({
            runChildUpdate : true
        });
    }

    //create each fireball
    addFire()
    {
        let fireball = new Fire(this, 320, 205, 'fireball');
        this.fireGroup.add(fireball);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyW)){
            this.reaper.setTexture('reaperF');
            console.log("FACING FORWARD");
        }
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.reaper.setTexture('reaperB');
            console.log("FACING BACKWARD");
        }
        if(Phaser.Input.Keyboard.JustDown(keyD)){
            this.reaper.setTexture('reaperL');
            console.log("FACING RIGHT");
        }
        if(Phaser.Input.Keyboard.JustDown(keyA)){
            this.reaper.setTexture('reaperR');
            console.log("FACING LEFT");
        }
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.addFire();
            console.log("FIRE BALL");
        }
    }
}
