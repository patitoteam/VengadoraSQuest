var X = 0, Y = 1;
var mainState = ( function () {
  
  var isoGroup,
      floor,
      tiles = [
	1,1,1,1,
	0,0,0,0,
	1,1,1,1,
	1,1,1,1
      ];

  var preload = function () {
    game.load.spritesheet('dude', 'assets/dude.png', 88,101);
    game.plugins.add(new Phaser.Plugin.Isometric(game));
    game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
    game.iso.anchor.setTo(0.5, 0.2);
  }
  
  var create = function () {
    game.stage.backgroundColor = "#555";
    game.physics.isoArcade.gravity.setTo(0,0,-1000);
    cube = game.add.isoSprite(100, 100, 100, 'dude', 0, isoGroup);
    cube.anchor.set(.5);
    game.physics.isoArcade.enable(cube);
    cube.body.collideWorldBounds = true;
    cursor = game.input.keyboard.createCursorKeys();
    cursor.jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    for (var i=0; i<tiles.size(); i++) {

    }
  }
  
  var update = function () {
    var direction = [0,0];
    cursor.jump.onDown.add( function () {
      if (cube.body.blocked.down) {
	cube.body.velocity.z = 200;
      }
    } );

    if (cursor.right.isDown) {
      direction[X]++;
      direction[Y]--;
    }

    if (cursor.left.isDown) {
      direction[X]--;
      direction[Y]++;
    }

    if (cursor.up.isDown) {
      direction[X]--;
      direction[Y]--;
    }

    if (cursor.down.isDown) {
      direction[X]++;
      direction[Y]++;
    }

    direction = Geometry.unitVector(direction);
    cube.body.velocity.x = direction[X]*100;
    cube.body.velocity.y = direction[Y]*100;
  };
  
  return { preload : preload,
           create : create,
           update : update };
  
})();

var game = new Phaser.Game(400, 300, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');
