/**
 * Created by jhtan on 7/12/15.
 */
( function () {
  var _game;

  var Live = function (game, options) {
    options = options || {};

    _game = game;

    this.element = options.group.create(
      options.x,
      options.y,
      options.key
    );
  };

  Live.prototype =  {
    get: function () {
      return this.element;
    }
  };

  window.Live = Live;
}).call(document);