(function() {
  var _game;

  var Player = function(game, options) {
    options = options || {};
    _game = game;
    this.element = game.add.isoSprite(
      options.x || 0,
      options.y || 0,
      options.z || 0,
      'cube_',
      0,
      options.group || null
    );
    this.onBombMounted = options.onBombMounted || null;
    this.onExplosion = options.onExplosion || null;
    this.element.tint = options.tint || 0;
    this.element.anchor.set(0.5);
    // window.foobar = this.element;
    game.physics.isoArcade.enable(this.element);
    this.element.body.collideWorldBounds = true;
    this.canLeaveBomb = true;
    this.cursors = null;
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

      if (cursors.up.isDown) {
        this.element.body.velocity.y = -speed;
      }
      else if (cursors.down.isDown) {
        this.element.body.velocity.y = speed;
      }
      else {
        this.element.body.velocity.y = 0;
      }

      if (cursors.left.isDown) {
        this.element.body.velocity.x = -speed;
      }
      else if (cursors.right.isDown) {
        this.element.body.velocity.x = speed;
      }
      else {
        this.element.body.velocity.x = 0;
      }
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
      }.bind(this), 3000);
    }
  }

  window.Player = Player;
}).call(document);
