(function() {
  window.RankingController = {
    add: function(name, score) {
      if(!localStorage.ranks) {
        localStorage.setItem('ranks', '[]');
      }

      var ranks = JSON.parse(localStorage.ranks);
      ranks.push({name:name, score: score});
      localStorage.setItem('ranks', JSON.stringify(ranks));
    },
    get: function() {
      if(!localStorage.ranks) {
        localStorage.setItem('ranks', '[]');
      }

      var ranks = JSON.parse(localStorage.ranks);
      ranks.sort(function(a, b){ return b.score-a.score; });
      ranks.splice(10);

      return ranks;
    }
  };
}).call(document);
