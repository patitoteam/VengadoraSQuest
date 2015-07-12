/**
 * Created by jhtan on 7/12/15.
 */
( function () {
  var _game;

  var LetterGroup = function (game, options) {
    options = options || {};
    _game = game;
    this.element = game.add.group();
    this.map = options.map;
    this.letters = this.addLettersByMap();
  };

  LetterGroup.prototype = {
    get: function () {
      return this.element;
    },

    addLettersByMap: function () {
      var letters = [];

      for (var i = 0; i < this.map.length; ++i) {
        for (var j = 0; j < this.map[i].length; ++j) {
          if (this.map[i][j] >= 'a' && this.map[i][j] <= 'z') {
            var lettersTile = new Letter(_game, {
              x: j * 65,
              y: i * 65,
              z: 0,
              key: 'letter_' + this.map[i][j],
              frame: 0,
              group: this.element
            }).get();
            lettersTile.anchor.set(0.5);
            letters.push(lettersTile);
          }
        }
      }

      return letters;
    }
  };

  window.LetterGroup = LetterGroup;
}).call(document);