class player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame) {
        super (scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

    }

    preload(){
        this.load.image('reaperF', 'assets/RPFront.png');
        this.load.image('reaperB', 'assets/RPBack.png');
        this.load.image('reaperL', 'assets/RPLeft.png');
        this.load.image('reaperR', 'assets/RPRight.png');
    
        }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyW)){
            this.reaper.setTexture('reaperF');
            //console.log("FACING FORWARD");
        }
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            //this.reaper.setTexture('reaperB');
            console.log("FACING BACKWARD");
        }
        if(Phaser.Input.Keyboard.JustDown(keyD)){
            //this.reaper.setTexture('reaperL');
            console.log("FACING RIGHT");
        }
        if(Phaser.Input.Keyboard.JustDown(keyA)){
            //this.reaper.setTexture('reaperR');
            console.log("FACING LEFT");
        }if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            //this.fireball.setActive(true);
            //this.fireball.setVisible(true);
            //console.log("FIRE BALL");
        }
    }
}