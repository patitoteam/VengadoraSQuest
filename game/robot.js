/**
 * Created by jhtan on 7/10/15.
 */

var robotClass = function (level) {
  robotsGroup = game.add.group();
  this.spawnRobots();

  //var robot = game.add.isoSprite(70, 70, 0, 'robot', 6);
  //robot.anchor.set(0.5);
  //game.physics.isoArcade.enable(robot);
  //robot.body.collideWorldBounds = true;
  //
  //
  ////this.body.velocity = 0;
  ////this.body.x = 700;
  //
  //robot.update = function () {
  //  robot.body.velocity.x = 30;
  //};
  //
  //return robot;
  return robotsGroup;
};

var spawnRobots = function () {
  var robot;
  for (var xx = 70; xx <= 140; xx += 70) {
    for (var yy = 70; yy <= 70; yy += 70) {
      // Create a cube using the new game.add.isoSprite factory method at the specified position.
      // The last parameter is the group you want to add it to (just like game.add.sprite)
      //robot = game.add.isoSprite(xx, yy, 0, 'robot', 6, robotsGroup);
      robot = game.add.isoSprite(xx, yy, 0, 'robot', 6, obstacleGroup);
      robot.anchor.set(0.5);

      // Enable the physics body on this cube.
      game.physics.isoArcade.enable(robot);

      // Collide with the world bounds so it doesn't go falling forever or fly off the screen!
      robot.body.collideWorldBounds = true;

      // Add a full bounce on the x and y axes, and a bit on the z axis.
      robot.body.bounce.set(1, 1, 0.2);

      // Send the cubes off in random x and y directions! Wheee!
      robot.body.velocity.setTo(game.rnd.integerInRange(-150, 150), game.rnd.integerInRange(-150, 150), 0);
      //robot.body.velocity.setTo(150, 150, 0);
    }
  }
};