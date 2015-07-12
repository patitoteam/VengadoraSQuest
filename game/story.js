(function() {
  var _game;
  var index = 0;
  var messages = [
    'After a war between humans and robots...',
    'The robots defeat their masters,',
    'and stole a very valuable thing..',
    'The human language!!...',
    'now your mission is to help Vengadora to recover it!'
  ];

  var text;
  var interval;
  BasicGame.Story = function(game) {
    _game = game;
  };

  BasicGame.Story.prototype = {
    preload: function() {
      game.load.image('story', 'assets/story.png');
    },
    create: function() {
      var pic = game.add.sprite(85, 0, 'story');
      pic.scale.setTo(0.9);

      interval = setInterval(function() {
        if(text) text.destroy();

        text = game.add.text(40, 400, messages[index], { fill: '#aaaaaa', font:'22px monospace' });
        index++;
        if(index > messages.length) {
          clearInterval(interval);
          game.state.start('Level1');
        }
      },3000);
    },
    update: function() {
    }
  };

}).call(document);
