(function() {
  var sentences = [
    {
      s: 'The was game so cool',
      good: false,
    },{
      s: 'Hi, the soccer game will be tomorrow',
      good: true,
    }, {
      s: 'My team the game won',
      good: false
    }
  ];

  window.BasicGame.MiddleLevel1 = function(fame) {
  };

  BasicGame.MiddleLevel1.prototype = {
    preload: function() {
      game.load.image('bonus', 'assets/bonus.png');
      game.load.image('mark', 'assets/mark.png');
      game.load.image('word', 'assets/word.png');
      game.load.image('G', 'assets/_G.png');
      game.load.image('A', 'assets/_A.png');
      game.load.image('M', 'assets/_M.png');
      game.load.image('E', 'assets/_E.png');
    },
    create: function() {
      var learnedWord = 'GAME';
      game.add.sprite(60, 0, 'bonus');

      game.add.sprite(0, 75, 'word');

      for(var i = 0; i < learnedWord.length; ++i) {
        game.add.sprite(90+(i*80), 100, learnedWord[i]);
      }
      game.add.sprite(0, 180, 'mark');
      for(i = 0; i < sentences.length; ++i) {
        game.add.text(90, 220+(i*50), sentences[i].s, {fill: '#aaaaaa'});
      }
    },
    update: function() {

    }
  };
}).call(document);
