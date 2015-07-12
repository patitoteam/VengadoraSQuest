(function() {
  window.game = new Phaser.Game(700, 500, Phaser.AUTO, 'game', null, false, true);

  // Initial lives of the player.
  game.lives = 6;

  game.state.add('InitScreen', BasicGame.InitScreen);
  game.state.add('Level1', BasicGame.Level1);
  game.state.add('Level2', BasicGame.Level2);
  game.state.add('Level2', BasicGame.Level2);

  game.state.start('InitScreen'); // :O
}).call(document);
