var game = new Phaser.Game(window.innerWidth-8, window.innerHeight-17, Phaser.AUTO, 'test', null, false, true);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

var isoGroup,
  groundGroup,
  wallGroup,
  player;

BasicGame.Boot.prototype ={
  preload: function () {
    game.load.image('cube_', 'assets/cube.png');
    game.load.image('ground', 'assets/ground_tile.png');
    game.load.image('wall', 'assets/wall.png');
    game.load.image('wall2', 'assets/wall2.png');

    game.time.advancedTiming = true;
    // Add and enable the plug-in.
    game.plugins.add(new Phaser.Plugin.Isometric(game));

    // Start the IsoArcade physics system.
    game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
    game.world.setBounds(0, 0, 2048, 1024);

    // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
    // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
    game.iso.anchor.setTo(0.3, 0.1);
  },
  create: function () {
    game.stage.background = 0xB91717;

    groundGroup = game.add.group();
    wallGroup = game.add.group();


    game.physics.isoArcade.gravity.setTo(0, 0, -500);

    var a2 = game.add.isoSprite(45, 24, 0, 'wall', 0, wallGroup);
    var a3 = game.add.isoSprite(85, 24, 0, 'wall', 0, wallGroup);
    var a4 = game.add.isoSprite(125, 24, 0, 'wall', 0, wallGroup);
    var a1;
    for(var i = 0; i < 4; ++i) {
      a1 = game.add.isoSprite(5+(i*40), 24, 0, 'wall', 0, wallGroup);
      game.physics.isoArcade.enable(a1);
      a1.body.collideWorldBounds = true;
      a1.body.immovable = true;
    }

    var a5 = game.add.isoSprite(125, 24, 0, 'wall2', 0, wallGroup);
    var a6 = game.add.isoSprite(-25, 60, 0, 'wall2', 0, wallGroup);
    var a7 = game.add.isoSprite(-25, 100, 0, 'wall2', 0, wallGroup);
    var a8 = game.add.isoSprite(-25, 140, 0, 'wall2', 0, wallGroup);
    var a9 = game.add.isoSprite(-25, 180, 0, 'wall2', 0, wallGroup);
    var a10 = game.add.isoSprite(-25, 220, 0, 'wall2', 0, wallGroup);
    var a11 = game.add.isoSprite(50, 60, 0, 'wall2', 0, wallGroup);
    var a12 = game.add.isoSprite(50, 100, 0, 'wall2', 0, wallGroup);
    var a13 = game.add.isoSprite(50, 140, 0, 'wall2', 0, wallGroup);
    var a14 = game.add.isoSprite(50, 180, 0, 'wall2', 0, wallGroup);
    var a15 = game.add.isoSprite(50, 220, 0, 'wall2', 0, wallGroup);
    var a16 = game.add.isoSprite(150, 60, 0, 'wall2', 0, wallGroup);
    var a17 = game.add.isoSprite(150, 100, 0, 'wall2', 0, wallGroup);
    var a18 = game.add.isoSprite(150, 140, 0, 'wall2', 0, wallGroup);
    var a19 = game.add.isoSprite(150, 180, 0, 'wall2', 0, wallGroup);
    var a20 = game.add.isoSprite(150, 220, 0, 'wall2', 0, wallGroup);

    isoGroup = game.add.group();
    var floorTile;
    for (var xt = 1024; xt > 0; xt -= 35) {
      for (var yt = 1024; yt > 0; yt -= 35) {
        floorTile = game.add.isoSprite(xt, yt, 0, 'ground', 0, groundGroup);
        floorTile.anchor.set(0.5);
      }
    }

    // Create another cube as our 'player', and set it up just like the cubes above.
    player = game.add.isoSprite(328, 328, 0, 'cube_', 0, wallGroup);
    player.tint = 0x00ff00;
    player.anchor.set(0.5);
    game.physics.isoArcade.enable(player);
    player.body.collideWorldBounds = true;

    // Set up our controls.
    this.cursors = game.input.keyboard.createCursorKeys();

    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN,
      Phaser.Keyboard.SPACEBAR
    ]);

    var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    space.onDown.add(function () {
      player.body.velocity.z = 300;
    }, this);
  },
  update: function () {
    // Move the player at this speed.
    var speed = 100;

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
    game.physics.isoArcade.collide(wallGroup);
    game.iso.topologicalSort(wallGroup);
  },
  render: function () {
    game.debug.text("Move with cursors, jump with space!", 2, 36, "#ffffff");
    game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
  }
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');
