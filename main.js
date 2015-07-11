(function() {
  window.game = new Phaser.Game(400, 400, Phaser.AUTO, 'test', null, false, true);

  game.state.add('Level1', BasicGame.Level1);
  game.state.start('Level1');
}).call(document);
