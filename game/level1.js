(function() {
  window.BasicGame.Level1 = function (game) { };

  var isoGroup,
    groundGroup,
    obstacleGroup,
    explosionGroup,
    player,
    theBomb,
    audioLevel1,
    audioComplete,
    audioGameover,
    audioLetter,
    audioScream,
    pip2;

  var map = [
    [10,1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1,11,],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,],
    [2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0,10, 1, 1, 0, 0, 0, 2,],
    [2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2,],
    [2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2,],
    [3, 1, 1, 1, 1, 1,13, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2,],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0,12, 1, 4, 1, 1, 1, 5,],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2,],
    [2, 0, 0, 0, 1, 1, 1, 1, 1, 1,13, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2,],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2,],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2,],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2,],
    [2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13, 0, 0, 0, 2,],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,],
    [12,1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13,],
  ];

  BasicGame.Level1.prototype ={
  preload: function () {
    // single images
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
    game.load.image('bomb', 'assets/bomb.png');
    game.load.image('letter_a', 'assets/letters/a.png');
    game.load.image('letter_e', 'assets/letters/a.png');
    game.load.image('letter_g', 'assets/letters/a.png');
    game.load.image('letter_m', 'assets/letters/a.png');

    game.load.spritesheet('robot', 'assets/robot.png', 120, 80);
    game.load.spritesheet('kid', 'assets/girl.png', 130, 150);
    // sprites
    game.load.spritesheet('robot', 'assets/robot.png', 120, 80);
    game.load.spritesheet('kid', 'assets/kid.png', 130, 150);
    game.load.spritesheet('sonic-bomb', 'assets/sonic-bomb.png', 130, 116);
    game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
    // audio
    game.load.audio('pip2', ['assets/pip2.ogg']);
    game.load.audio('level1_audio', ['assets/level1a.ogg']);
    game.load.audio('gameover', ['assets/gameover.ogg']);
    game.load.audio('complete', ['assets/complete.ogg']);
    game.load.audio('letter', ['assets/letter.ogg']);
    game.load.audio('scream', ['assets/scream.ogg']);

    game.time.advancedTiming = true;

    // Add and enable the plug-in.
    game.plugins.add(new Phaser.Plugin.Isometric(game));

    // In order to have the camera move, we need to increase the size of our world bounds.
    game.world.setBounds(0, 0, 4096, 4096);

    // Start the IsoArcade physics system.
    game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);

    // In order to have the camera move, we need to increase the size of our world bounds.

    // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
    // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
    game.iso.anchor.setTo(0.5, 0.1);
    game.iso.projectionAngle = 0.52359878;
  },

  create: function () {
    // Background color.
    game.stage.background = 0xB91717;
    // get explosion audio
    pip2 = game.add.audio('pip2');
    audioGameover = game.add.audio('gameover');
    audioComplete = game.add.audio('complete');
    audioLetter = game.add.audio('letter');
    audioScream = game.add.audio('scream');

    if(!audioLevel1) {
      audioLevel1 = game.add.audio('level1_audio');
      //audioLevel1.play();
    }

    // Physics.
    game.physics.isoArcade.gravity.setTo(0, 0, -1000);

    groundGroup = game.add.group();
    obstacleGroup = game.add.group();
    explosionGroup = game.add.group();
    window.obstacleGroup = obstacleGroup;

    // Letters of the level.
    this.letterGroup = new LetterGroup(game, {map: [
      [0, 0,  0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0,  0, 0, 0,  0, 0, 0],
      [0, 0,  0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0,  0, 0, 0,  0, 0, 0],
      [0, 0,'e', 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0,  0, 0, 0,  0, 0, 0],
      [0, 0,  0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0,  0, 0, 0,  0, 0, 0],
      [0, 0,  0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0,'a', 0, 0,  0, 0, 0],
      [0, 0,  0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0,  0, 0, 0,  0, 0, 0],
      [3, 0,  0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0,  0, 0, 0,  0, 0, 0],
      [0, 0,  0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0,  0, 0, 0,  0, 0, 0],
      [0, 0,  0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0,  0, 0, 0,'m', 0, 0],
      [0, 0,  0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0,  0, 0, 0,  0, 0, 0],
      [0, 0,  0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0,  0, 0, 0,  0, 0, 0],
      [0, 0,  0, 0, 0, 0, 0, 0,'g', 0, 0, 0, 0, 0, 0,  0, 0, 0,  0, 0, 0],
      [0, 0,  0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0,  0, 0, 0,  0, 0, 0],
      [0, 0,  0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0,  0, 0, 0,  0, 0, 0],
      [0, 0,  0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0,  0, 0, 0,  0, 0, 0],
      [0, 0,  0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0,  0, 0, 0,  0, 0, 0],
      [0, 0,  0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0,  0, 0, 0,  0, 0, 0],
      [0, 0,  0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0,  0, 0, 0,  0, 0, 0]
    ]});

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
      x: 830, y: 600, z: 0, group: obstacleGroup, tint: 0x00ff00,
      onBombMounted: onBombMounted.bind(this),
      onExplosion: onExplosion.bind(this)
    });
    game.player = player;

    // Make the camera follow the player.
    game.camera.follow(player.get());

    // Set up our controls.
    this.cursors = game.input.keyboard.createCursorKeys();

    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN,
      // Phaser.Keyboard.SPACEBAR
    ]);
    this.cursors.jump = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // Robots Creation
    this.robots = robotClass(this);
  },
  update: function () {
    // For show the position of the player ;) #FORDEBUG
    //console.log(player.get().isoPosition.x + ' - ' + player.get().isoPosition.y + ' - ' + player.get().isoPosition.z);
    // Show the veolocity of the player ;D #FORDEBUG
    //console.log(player.get().body.velocity.x + ' - ' + player.get().body.velocity.y + ' - ' + player.get().body.velocity.z);

    // Move the player at this speed.
    var speed = 500;
    player.move(this.cursors, speed);

    // Our collision and sorting code again.
    game.physics.isoArcade.collide(obstacleGroup);
    game.iso.topologicalSort(obstacleGroup);

    // Iterate the objects of the Letters Group.
    this.lettersGroup.forEach( function (letter) {

      // Collision between the player and a letter.
      if(Math.abs(player.get().isoPosition.x - letter.isoPosition.x) < 70 &&
        Math.abs(player.get().isoPosition.y - letter.isoPosition.y) < 70) {
        takeLetter(letter);
      }
    });

    // Animate the player.
    animatePlayer(player.get(), this.cursors);

    // Iterate the objects at obstacles group.
    obstacleGroup.forEach( function (obstacle) {

      // If the object is a robot.
      if(obstacle.key == 'robot') {

        // Animate the robots.
        animateRobots(obstacle);

        // Collision between the player and a robot, game over!.. :(
        if(Math.abs(player.get().isoPosition.x - obstacle.isoPosition.x) < 70 &&
          Math.abs(player.get().isoPosition.y - obstacle.isoPosition.y) < 70) {
          killPlayer(player, true);
        }
      }
    });
  },
  render: function () {
  //   game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
  //   groundGroup.forEach(function (tile) {
  //     game.debug.body(tile, 'rgba(255, 221, 235, 0.6)', false);
  //   });
  //   obstacleGroup.forEach(function (tile) {
  //     game.debug.body(tile, 'rgba(189, 221, 235, 0.6)', false);
  //   });
  }
};

  function onBombMounted(e) {
    console.log('mounted');
    theBomb = game.add.isoSprite(e.row*65, e.col*65, 0, 'sonic-bomb', 0, groundGroup);
    theBomb.anchor.set(0.5);

    theBomb.animations.add('bomb-sequence', [1,2,3,4], 6, true);
    theBomb.animations.play('bomb-sequence');
    pip2.play();
  }

  function onExplosion(e) {
    if(theBomb) {
      console.log('boom!!');
      var kaboom = game.add.isoSprite(theBomb.isoPosition.x-100, theBomb.isoPosition.y-20, 0,'kaboom',explosionGroup);
      kaboom.animations.add('kaboom', [1,2,3,4,5,6,7,8,9,10], 6, false);
      kaboom.animations.play('kaboom');
      setTimeout(function() {
        theBomb.destroy();
        kaboom.destroy();
        var explosions = [];
        obstacleGroup.forEach(function(tile) {
          if(!tile) return;
          if(tile.key === 'robot' || tile.key === 'kid') {
            var x1 = tile.isoPosition.x;
            var y1 = tile.isoPosition.y;
            var x2 = e.x; var y2 = e.y;

            var dist = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
            if(dist <= 250) {
              kaboom = game.add.isoSprite(tile.isoPosition.x-100, tile.isoPosition.y-20, 0,'kaboom',explosionGroup);
              kaboom.animations.add('kaboom', [1,2,3,4,5,6,7,8,9,10,11,12,13,14], 6, false);
              kaboom.animations.play('kaboom');
              explosions.push(kaboom);
              if(tile.key === 'kid') {
                setTimeout(function() {
                  killPlayer(player);
                }, 200);
              } else {
                tile.destroy();
              }
            }
          }
        });
        setTimeout(function() {
          for(var i = 0; i < explosions.length; ++i) {
            explosions[i].destroy();
          }
        }, 200);
      }, 200);

    }
  }

  function killPlayer(player, killedByRobot) {
    if(killedByRobot) {
      audioScream.play();
    }
    setTimeout(function() {
      audioLevel1.restart();
      game.state.start('Level1');
    }, 100);
  }

  function takeLetter(letter) {
    audioLetter.play();
    letter.kill();
  }

}).call(document);
