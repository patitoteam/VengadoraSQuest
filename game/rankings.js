(function(){
  var playButton, rankingButton;

  window.BasicGame.Rankings = function(game) {};
  window.BasicGame.Rankings.prototype = {
    preload: function() {
      game.load.image('rank_title', 'assets/rank_title.png');
      game.load.image('name', 'assets/name.png');
      game.load.image('score', 'assets/score.png');
    },
    create: function() {
      game.add.sprite(60, 0, 'rank_title');
      game.add.sprite(120, 70, 'name');
      game.add.sprite(320, 70, 'score');

      var i;
      var ranks = RankingController.get();
      for(i = 0; i < ranks.length; ++i) {
        game.add.text(120, ((i+1)*37)+70, ranks[i].name, { fill: '#aaaaaa' });
      }
      for(i = 0; i < ranks.length; ++i) {
        game.add.text(350, ((i+1)*37)+70, ranks[i].score, { fill: '#ffffff' });
      }
    },
    update: function() {

    }
  };
}).call(document);
