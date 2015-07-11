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
    this.element.tint = options.tint || 0;
    this.element.anchor.set(0.5);
    // this.element.body.collideWorldBounds = true;
  };

  Player.prototype = {
    get: function() {
      return this.element;
    },
    move: function(cursors, speed) {
      if (cursors.up.isDown) {
        player.body.velocity.y = -speed;
      }
      else if (cursors.down.isDown) {
        player.body.velocity.y = speed;
      }
      else {
        player.body.velocity.y = 0;
      }

      if (cursors.left.isDown) {
        player.body.velocity.x = -speed;
      }
      else if (cursors.right.isDown) {
        player.body.velocity.x = speed;
      }
      else {
        player.body.velocity.x = 0;
      }
    }
  };

  window.Player = Player;
}).call(document);
