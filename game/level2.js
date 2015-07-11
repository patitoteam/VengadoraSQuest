(function() {
  window.BasicGame.Level2 = function (game) { };

  var player;
  var obstacleGroup, groundGroup;

  var map = [
    [10,1, 1, 1, 1, 1, 1,11],
    [2, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 2],
    [12,1, 1, 11, 0, 10, 1,2],
    [12,1, 1, 2, 0, 2, 1,2],
    [12,1, 1, 2, 0, 2, 1,2],
    [12,1, 1, 2, 0, 2, 1,13],
  ];

  BasicGame.Level2.prototype = {
    preload: function() {
      game.load.image('cube_', 'assets/cube.png');
      game.load.image('ground', 'assets/floor.png');
      game.load.image('wall1', 'assets/wall-y.png');
      game.load.image('wall2', 'assets/wall-x.png');
      game.load.image('wall3', 'assets/wall-t--y.png');
      game.load.image('wall4', 'assets/wall-t--x.png');
      game.load.image('wall5', 'assets/wall-t-py.png');
      game.load.image('wall6', 'assets/wall-t--x.png');
      game.load.image('wall7', 'assets/wall-tp-x.png');
      game.load.image('wall10', 'assets/wall-l-top.png');
      game.load.image('wall11', 'assets/wall-l-right.png');
      game.load.image('wall12', 'assets/wall-l-left.png');
      game.load.image('wall13', 'assets/wall-l-bottom.png');

      game.time.advancedTiming = true;
      game.plugins.add(new Phaser.Plugin.Isometric(game));
      game.world.setBounds(0, 0, 2048, 2048);
      game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
      game.iso.anchor.setTo(0.5, 0.1);
      game.iso.projectionAngle = 0.52359878;
    },
    create: function() {
      game.stage.background = 0xB91717;
      game.physics.isoArcade.gravity.setTo(0, 0, -1000);
      groundGroup = game.add.group();
      obstacleGroup = game.add.group();
      var floorTile, i, j;
      for (var xt = 2048; xt > 0; xt -= 35) {
        for (var yt = 2048; yt > 0; yt -= 35) {
          floorTile = game.add.isoSprite(xt, yt, 0, 'ground', 0, groundGroup);
          floorTile.anchor.set(0.5);
        }
      }
      var a1;
      for(i = 0; i < map.length; ++i) {
        for(j = 0; j < map[i].length; ++j) {
          if (map[i][j] !== 0) {
            a1 = game.add.isoSprite(j*65, i*65, 0, 'wall' + map[i][j], 0, obstacleGroup);
            a1.anchor.set(0.5);
            game.physics.isoArcade.enable(a1);
            a1.body.collideWorldBounds = true;
            a1.body.immovable = true;
          }
        }
      }
      player = new Player(this, {
        x: 100, y: 100, z: 0, group: obstacleGroup, tint: 0x00ff00
      });

      // Make the camera follow the player.
      game.camera.follow(player.get());

      // Set up our controls.
      this.cursors = game.input.keyboard.createCursorKeys();

      this.game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN,
        Phaser.Keyboard.SPACEBAR
      ]);
    },
    update: function() {
      var speed = 500;
      player.move(this.cursors, speed);
      game.physics.isoArcade.collide(obstacleGroup);
      game.iso.topologicalSort(obstacleGroup);
    },
    render: function() {}
  };
}).call(document);
