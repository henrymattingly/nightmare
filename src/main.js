let config = {
    type : Phaser.CANVAS,
    width : 640,
    height : 480,
    physics : {
        default : 'arcade',
        arcade :{

        }
    },
    scene : [Menu,Play]
}
var game = new Phaser.Game(config);


let keyW, keyA, keyS, keyD, keySPACE;
