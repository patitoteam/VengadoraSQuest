var game = new Phaser.Game(700,700, Phaser.AUTO, 'test', null, false, true);

var SPEED = 500;

var BasicGame = function (game) { };
BasicGame.Boot = function (game) { };

var isoGroup,
  groundGroup,
  obstacleGroup,
  player;

var map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,],
  [2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2,],
  [2, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 2,],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,],
  [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1,],
];

BasicGame.Boot.prototype ={
  preload: function () {
    game.load.image('cube_', 'assets/cube.png');
    game.load.image('ground', 'assets/floor.png');
    game.load.image('wall', 'assets/wall-y.png');
    game.load.image('wall2', 'assets/wall-x.png');
    game.load.spritesheet('robot', 'assets/robot.png', 120, 80);

    game.time.advancedTiming = true;

    // Add and enable the plug-in.
    game.plugins.add(new Phaser.Plugin.Isometric(game));

    // In order to have the camera move, we need to increase the size of our world bounds.
    game.world.setBounds(0, 0, 2048, 1024);

    // Start the IsoArcade physics system.
    game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);

    // In order to have the camera move, we need to increase the size of our world bounds.
    game.world.setBounds(0, 0, 2048, 1024);

    // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
    // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
    game.iso.anchor.setTo(0.5, 0.1);
    game.iso.projectionAngle = 0.52359878;
    game.time.advancedTiming = true;
  },

  create: function () {
    // Background color.
    game.stage.background = 0xB91717;

    // Physics.
    game.physics.isoArcade.gravity.setTo(0, 0, -1000);

    groundGroup = game.add.group();
    obstacleGroup = game.add.group();

    game.physics.isoArcade.gravity.setTo(0, 0, -1000);

    var floorTile, i, j;
    for (var xt = 1024; xt > 0; xt -= 35) {
      for (var yt = 1024; yt > 0; yt -= 35) {
        floorTile = game.add.isoSprite(xt, yt, 0, 'ground', 0, groundGroup);
        floorTile.anchor.set(0.5);
      }
    }

    var a1;
    for(i = 0; i < map.length; ++i) {
      for(j = 0; j < map[i].length; ++j) {
        if (map[i][j] === 1) {
          a1 = game.add.isoSprite(j*65, i*65, 0, 'wall', 0, obstacleGroup);
          a1.anchor.set(0.5);
          game.physics.isoArcade.enable(a1);
          a1.body.collideWorldBounds = true;
          a1.body.immovable = true;
        } else if (map[i][j] === 2) {
          a1 = game.add.isoSprite(j*65, i*65, 0, 'wall2', 0, obstacleGroup);
          a1.anchor.set(0.5);
          game.physics.isoArcade.enable(a1);
          a1.body.collideWorldBounds = true;
          a1.body.immovable = true;
        }
      }
    }

    // var a1;
    // for(var i = 125; i >= 5; i-=40) {
    //   a1 = game.add.isoSprite(i, 55, 0, 'wall', 0, obstacleGroup);
    //   a1.anchor.set(0.5);
    //   game.physics.isoArcade.enable(a1);
    //   a1.body.collideWorldBounds = true;
    //   a1.body.immovable = true;
    // }


    // Create another object as our 'player', and set it up just like the obstacles above.
    player = game.add.isoSprite(80, 80, 0, 'cube_', 0, obstacleGroup);
    player.tint = 0x00ff00;
    player.anchor.set(0.5);
    game.physics.isoArcade.enable(player);
    player.body.collideWorldBounds = true;

    // Make the camera follow the player.
    game.camera.follow(player);

    // Set up our controls.
    this.cursors = game.input.keyboard.createCursorKeys();

    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN,
      Phaser.Keyboard.SPACEBAR
    ]);

    // Robots Creation
    this.robots = robotClass(this);
  },
  update: function () {
    // Move the player at this speed.
    var speed = 500;

    if (this.cursors.up.isDown) {
      player.body.velocity.y = -speed;
    }
    else if (this.cursors.down.isDown) {
      player.body.velocity.y = speed;
    }
    else {
      player.body.velocity.y = 0;
    }

    if (this.cursors.left.isDown) {
      player.body.velocity.x = -speed;
    }
    else if (this.cursors.right.isDown) {
      player.body.velocity.x = speed;
    }
    else {
      player.body.velocity.x = 0;
    }

    // Our collision and sorting code again.
    game.physics.isoArcade.collide(obstacleGroup);
    game.iso.topologicalSort(obstacleGroup);
  },
  // render: function () {
  //   game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
  //   groundGroup.forEach(function (tile) {
  //     game.debug.body(tile, 'rgba(255, 221, 235, 0.6)', false);
  //   });
  //   obstacleGroup.forEach(function (tile) {
  //     game.debug.body(tile, 'rgba(189, 221, 235, 0.6)', false);
  //   });
  // }
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');
