(function(){
  var playButton, rankingButton;

  window.BasicGame.InitScreen = function(game) {};
  window.BasicGame.InitScreen.prototype = {
    preload: function() {
      game.load.image('logo', 'assets/logo.png');
      game.load.image('play', 'assets/play.png');
      game.load.image('ranking', 'assets/ranking.png');
    },
    create: function() {
      game.add.sprite(60, 0, 'logo');
      playButton = game.add.sprite(300, 200, 'play');
      playButton.inputEnabled = true;
      rankingButton = game.add.sprite(300, 250, 'ranking');
      rankingButton.inputEnabled = true;

      playButton.events.onInputDown.add(function() {
        game.state.start('Story');
      }, this);

      rankingButton.events.onInputDown.add(function() {
        game.state.start('Rankings');
      }, this);
    },
    update: function() {

    }
  };
}).call(document);
