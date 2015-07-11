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
    this.element.anchor.set(0.5);
    // window.foobar = this.element;
    game.physics.isoArcade.enable(this.element);
    this.element.body.collideWorldBounds = true;

    this.element.anchor.set(0.5,0.5);
    this.element.animations.add('2-walk', [1,2,3,4,5,6], 6, true);
    this.element.animations.add('3-walk', [7,8,9,8], 6, true);
    this.element.animations.add('6-walk', [17, 18, 19, 20, 21], 6, true);
    this.element.animations.add('8-walk', [11, 12, 13, 14, 15, 16], 6, true);
    this.element.animations.add('9-walk', [26, 25, 24, 25], 6, true);
    this.element.animations.play('6-walk');
  };

  Player.prototype = {
    get: function() {
      return this.element;
    },
    move: function(cursors, speed) {
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

      // computing animation      
      this.element.scale.set(1,1,1);
      if (direction[0] === 1 && direction[1] === 1) {
        this.element.animations.play('2-walk');
      } else if (direction[0] === -1 && direction[1] === -1) {
        this.element.animations.play('8-walk');
      } else if (direction[0] === -1 && direction[1] === 1) {
        this.element.animations.play('6-walk');
        this.element.scale.set(-1,1,1);
      } else if (direction[0] === 1 && direction[1] === -1) {
        this.element.animations.play('6-walk');        
      } else if (direction[0] === 1 && direction[1] === 0) {
        this.element.animations.play('9-walk');
        this.scale.set(-1,1,1);
      }

      // computing unit vector of the direction...
      magnitude = Math.sqrt(Math.pow(direction[0],2) + Math.pow(direction[1],2));
      direction = [direction[0]/magnitude, direction[1]/magnitude];
      this.element.body.velocity.x = direction[0]*speed;
      this.element.body.velocity.y = direction[1]*speed;
    }
  };

  window.Player = Player;
}).call(document);
