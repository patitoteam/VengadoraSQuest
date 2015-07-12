(function() {
  window.game = new Phaser.Game(700, 500, Phaser.AUTO, 'game', null, false, true);

  // Initial lives of the player.
  game.lives = 6;

  game.state.add('InitScreen', BasicGame.InitScreen);
  game.state.add('Story', BasicGame.Story);
  game.state.add('Rankings', BasicGame.Rankings);
  game.state.add('Level1', BasicGame.Level1);
  game.state.add('Level2', BasicGame.Level2);
  game.state.add('Level2', BasicGame.Level2);
  game.state.add('MiddleLevel1', BasicGame.MiddleLevel1);

  game.state.start('MiddleLevel1'); // :O
}).call(document);
