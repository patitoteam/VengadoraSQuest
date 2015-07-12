(function() {
  window.game = new Phaser.Game(700, 500, Phaser.AUTO, 'game', null, false, true);

  game.state.add('InitScreen', BasicGame.InitScreen);
  game.state.add('Story', BasicGame.Story);
  game.state.add('Rankings', BasicGame.Rankings);
  game.state.add('Level1', BasicGame.Level1);
  game.state.add('Level2', BasicGame.Level2);
  game.state.add('Level2', BasicGame.Level2);

  game.state.start('InitScreen'); // :O
}).call(document);
