var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 640,
    height: 480,
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update,

    },
};

var game = new Phaser.Game(config);

var graphics;
var path1;
var path2;
var path3;
var path4;
var ENEMY_SPEED = 1/1000;



let keyW, keyA, keyS, keyD;

function preload(){
    this.load.image('forest', 'assets/haunted_forest.png');
    this.load.image('reaperF', 'assets/RPFront.png');
    this.load.image('reaperB', 'assets/RPBack.png');
    this.load.image('reaperL', 'assets/RPLeft.png');
    this.load.image('reaperR', 'assets/RPRight.png');
}

var Enemy = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:
    
    function Enemy (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'enemy');
    },

    update: function (time, delta)
    {
        this.follower.t += ENEMY_SPEED * delta;

        path.getPoint(this.follower.t, this.follower.vec);

        this.setPosition(this.follower.x, this.follower.vec.y);

        if (this.follower.t >= 1)
        {
            this.setActive(false);
            this.setVisible(false);
        }

        if (time > this.nextEnemy)
        {
            var enemy = enemies.get();
            if (enemy)
            {
                enemy.setActive(true);
                enemy.setVisible(true);
            }

            enemy.startOnPath();

            this.nextEnemy = time + 2000;
        }

    },

    startOnPath: function()
    {
        this.follower.t = 0;

        path.getPoint(this.follower.t, this.follower.vec);

        this.setPosition(this.follower.vec.x, this.follower.vec.y);

    },

});
this.follower = { t: 0, vec: new Phaser.Math.Vector2()};

function create(){


    //keyboard input
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


    //create character and background
    this.background = this.add.tileSprite(0, 0, 640, 480, 'forest').setOrigin(0, 0);

    this.reaper = this.add.sprite(320, 240, 'reaperF'); //coords are center of the forest crossroads. 

    var graphics = this.add.graphics();

    //create path for enemies to follow
    path1 = this.add.path(320, 0);
    path1.lineTo(320, 240); 

    path2 = this.add.path(0, 240);
    path2.lineTo(320, 240);

    path3 = this.add.path(320, 640);
    path3.lineTo(320, 240);

    path4 = this.add.path(640, 240);
    path4.lineTo(320, 240);
    

    //graphics.lineStyle(3, 0xffffff, 1);
    path1.draw(graphics);
    path2.draw(graphics);
    path3.draw(graphics);
    path4.draw(graphics);
}

/*
enemies = this.add.group({classType: Enemy, runChildUpdate: true});
this.nextEnemy = 0;
*/

//change looking direction of reaper
function update(){
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
 
}