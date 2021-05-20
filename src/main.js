let config = {
    type : Phaser.CANVAS,
    width : 640,
    height : 480,
    physics : {
        default : 'arcade',
        arcade :{

        }
    },
    scene : [Play]
}
var game = new Phaser.Game(config);


let input, mouse;

let centerX = game.config.width/2;
let centerY = game.config.height/2;
var control = false;
var worldBounds;