/**
 * Created by jhtan on 7/12/15.
 */
( function () {
  var _game;

  var LivesGroup = function (game, options) {
    options = options || {};

    _game = game;

    this.element = game.add.group();

    this.lives = this.drawLives();
  };

  LivesGroup.prototype =  {
    get: function () {
      return this.element;
    },

    drawLives: function () {
      // Game Over :(
      // TODO Create a new class, maybe game?, and add default values to it.
      if(_game.lives === 0) {
        //alert('GAME OVER!.. :(');
        game.lives = 6;
        game.state.start('InitScreen');
        return;
      }

      for (var i = 1; i <= _game.lives; i++) {
        var live = new Live(_game, {
          x: 15 * i + ((i - 1) * 30),
          y: 15,
          key: 'live',
          group: this.element
        }).get();
        live.scale.setTo(0.6);
        live.alpha = 0.7;
        live.fixedToCamera = true;
      }
    }
  };

  window.LivesGroup = LivesGroup;
}).call(document);