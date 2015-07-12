/**
 * Created by jhtan on 7/12/15.
 */
( function () {
  var _game;

  var Letter = function (game, options) {
    options = options || {};

    _game = game;

    this.element = game.add.isoSprite(
      options.x,
      options.y,
      options.z,
      options.key,
      options.frame || 0,
      options.group || 0
    );

    this.element.update = function () {
      // Collision between the player and a letter.
      if(Math.abs(_game.player.get().isoPosition.x - this.element.isoPosition.x) < 70 &&
        Math.abs(_game.player.get().isoPosition.y - this.element.isoPosition.y) < 70) {
        this.element.kill(); // Kill the letter!.. :O
        _game.letters++;
        //console.log('letrita!');
      }
    }.bind(this);
  };

  Letter.prototype = {
    get: function () {
      return this.element;
    }
  };

  window.Letter = Letter;
}).call(document);