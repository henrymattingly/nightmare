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

    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);



    this.background = this.add.tileSprite(0, 0, 640, 480, 'forest').setOrigin(0, 0);
    this.reaper = this.add.sprite(320, 240, 'reaperF'); //coords are center of the forest crossroads. 
    this.fireball = this.add.sprite(320, 205, 'fireball');
    
    this.fireball.setActive(false);
    this.fireball.setVisible(false);

    var graphics = this.add.graphics();

    path1 = this.add.path(320, 0);
    path1.lineTo(320, 240); 

    path2 = this.add.path(0, 240);
    path2.lineTo(320, 240);

    path3 = this.add.path(320, 640);
    path3.lineTo(320, 240);

    path4 = this.add.path(640, 240);
    path4.lineTo(320, 240);
    

    graphics.lineStyle(3, 0xffffff, 1);
    path1.draw(graphics);
    path2.draw(graphics);
    path3.draw(graphics);
    path4.draw(graphics);

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
        }if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.fireball.setActive(true);
            this.fireball.setVisible(true);
            console.log("FIRE BALL");
        }
    }
}
