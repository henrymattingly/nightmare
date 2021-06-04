let config = {
    type : Phaser.CANVAS,
    width : 1150,
    height : 1000,
    physics : {
        default : 'arcade',
        arcade :{

        }
    },
    scene : [ Menu ,Control, Credits, Play, GameOver]
}
var game = new Phaser.Game(config);


let keySPACE, input, mouse, keyP, keyC, keyM, keyR;

let centerX = game.config.width/2;
let centerY = game.config.height/2;
var control = false;
var worldBounds;