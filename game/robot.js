/**
 * Created by jhtan on 7/10/15.
 */

var robot = function (level) {
  var sprite = game.add.sprite(500, 500, 'robot', 2);
  game.physics.isoArcade.enable(sprite);

  return sprite;
};
