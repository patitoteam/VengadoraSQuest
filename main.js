var mainState = ( function () {
    
    var preload = function () {
	// load sprite images:
	// game.load.spritesheet('name', 'directory', sizex, sizey);	
    }
    
    var create = function () {
	// start the physics engine
        // game.physics.startSystem(Phaser.Physics.ARCADE);

	// tiled image as background
        // game.add.tileSprite(0,0, width, height, image, 0);

        game.stage.backgroundColor = "#5f5";

	// create a sprite:
	// var pepe = game.add.sprite(x, y, 'pepe');
	// pepe.anchor.setTo(0.5,0.5);

	// enable physics for pepe
	// game.physics.enable(pepe, Phaser.Physics.ARCADE);

	// add animation to pepe.
	// sprite.animations.add('walk', [0,1,2,1], fps);
    }
    
    var update = function () {
    };
    
    return { preload : preload,
             create : create,
             update : update };
    
})();

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');
// width = 800. accessible from game.world.width
// height = 600 acccessible from game.world.height
