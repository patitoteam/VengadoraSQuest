(function() {
  var _game;

  var Player = function(game, options) {
    options = options || {};
    _game = game;
    this.element = game.add.isoSprite(
      options.x || 0,
      options.y || 0,
      options.z || 0,
      'kid',
      0,
      options.group || null
    );
    this.onBombMounted = options.onBombMounted || null;
    this.onExplosion = options.onExplosion || null;
    // this.element.tint = options.tint || 0;

    this.element.anchor.set(0.5);
    // window.foobar = this.element;
    game.physics.isoArcade.enable(this.element);
    this.element.body.collideWorldBounds = true;
    this.canLeaveBomb = true;
    this.cursors = null;

    this.element.anchor.set(0.5,0.5);
    
    // Animations.
    this.element.animations.add('quiet', [21]);
    this.element.animations.add('bottom', [21, 22, 23, 24, 25, 26, 27], 11);
    this.element.animations.add('up', [7, 8, 9, 10, 11, 12, 13], 11);
    this.element.animations.add('up-left', [6, 0, 1, 2, 3, 4, 5], 11);
    this.element.animations.add('up-right', [6, 0, 1, 2, 3, 4, 5], 11);
    this.element.animations.add('bottom-left', [20, 14, 15, 16, 17, 18, 19], 11);
    this.element.animations.add('bottom-right', [20, 14, 15, 16, 17, 18, 19], 11);
    this.element.animations.add('quiet-bottom', [21], 11);
    this.element.animations.add('quiet-up', [7], 11);
    this.element.animations.add('quiet-bottom-left', [20], 11);
    this.element.animations.add('quiet-bottom-right', [20], 11);
    this.element.animations.add('quiet-up-left', [6], 11);
    this.element.animations.add('quiet-up-right', [6], 11);
  };

  Player.prototype = {
    get: function() {
      return this.element;
    },
    move: function(cursors, speed) {
      if(!this.cursors) {
        this.cursors = cursors;
        this.cursors.jump.onDown.add(fire.bind(this));
      }

      var direction = [0,0],
          magnitude;
      if (cursors.up.isDown) {
        direction[0]--;
        direction[1]--;
      }
      if (cursors.down.isDown) {
        direction[0]++;
        direction[1]++;
      }
      if (cursors.left.isDown) {
        direction[0]--;
        direction[1]++;
      }
      if (cursors.right.isDown) {
        direction[0]++;
        direction[1]--;
      }

      // computing unit vector of the direction...
      magnitude = Math.sqrt(Math.pow(direction[0],2) + Math.pow(direction[1],2));
      direction = [direction[0]/magnitude, direction[1]/magnitude];
      // so player will always move with a consistent speed
      this.element.body.velocity.x = direction[0]*speed;
      this.element.body.velocity.y = direction[1]*speed;
    }
  };

  function fire() {
    if(this.canLeaveBomb) {
      var player = this.element;
      var x = player.isoPosition.x;
      var y = player.isoPosition.y;
      var row = Math.floor(x / 65);
      var col = Math.floor(y / 65);

      if(this.onBombMounted) {
        this.onBombMounted({row:row, col:col});
      }

      this.canLeaveBomb = false;
      setTimeout(function() {
        if(this.onExplosion) {
          this.onExplosion({x: x, y: y});
        }
        this.canLeaveBomb = true;
      }.bind(this), 2800);
    }
  }

  window.Player = Player;
}).call(document);

var animatePlayer = function (player, cursors)  {

  // This variable is used when the player crash with a wall.
  var quiet = '';
  if(!player.body.touching.none) {
    quiet = 'quiet-';
  }

  // Change the animations.
  var velocity = player.body.velocity;
  if (velocity.x === 0 && velocity.y === 0 && velocity.z === 0) {
    if(cursors.down.isDown && cursors.left.isUp && cursors.right.isUp) {
      player.animations.play('quiet-bottom');
    } else if (cursors.up.isDown && cursors.left.isUp && cursors.right.isUp) {
      player.animations.play('quiet-up');
    } else if (cursors.down.isDown && cursors.right.isDown) {
      player.animations.play('quiet-bottom-right');
    } else if (cursors.down.isDown && cursors.left.isDown) {
      player.animations.play('quiet-bottom-left');
    } else if (cursors.up.isDown && cursors.left.isDown) {
      player.animations.play('quiet-up-left');
    } else if (cursors.up.isDown && cursors.right.isDown) {
      player.animations.play('quiet-up-right');
    }
  } else if(cursors.down.isDown && cursors.left.isUp && cursors.right.isUp) {
    player.animations.play(quiet + 'bottom');
  } else if (cursors.up.isDown && cursors.left.isUp && cursors.right.isUp) {
    player.animations.play(quiet + 'up');
  } else if(player.body.velocity.x >= 0 && player.body.velocity.y === 0) {
    player.scale.set(1,1);
    player.animations.play(quiet + 'bottom-right');
  } else if(player.body.velocity.x < 0 && player.body.velocity.y == 0) {
    player.scale.set(-1,1);
    player.animations.play(quiet + 'up-left');
  } else if(player.body.velocity.y >= 0) {
    player.scale.set(-1,1);
    player.animations.play(quiet + 'bottom-left');
  } else if(player.body.velocity.y < 0) {
    player.scale.set(1,1);
    player.animations.play(quiet + 'up-right');
  } else {
    player.animations.play('quiet');
  }
};
