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

    this.element.animations.add('front-walk', [1,2,3,4,5,6], 6, true);
    this.element.animations.play('front-walk');
  };

  Player.prototype = {
    get: function() {
      return this.element;
    },
    move: function(cursors, speed) {
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

  window.Player = Player;
}).call(document);
