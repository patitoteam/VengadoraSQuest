(function() {
  window.game = new Phaser.Game(400, 400, Phaser.AUTO, 'test', null, false, true);

  game.state.add('Level1', BasicGame.Level1);
  game.state.add('Level2', BasicGame.Level2);

  game.state.start('Level1'); // :O
}).call(document);
