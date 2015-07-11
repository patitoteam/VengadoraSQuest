/**
 * Created by jhtan on 7/10/15.
 */

var robotClass = function (level) {
  robotsGroup = game.add.group();
  this.spawnRobots();

  return robotsGroup;
};

var spawnRobots = function () {
  var robot;

  var robotsXPositions = [70, 100, 1170, 1020, 120, 220, 1160, 1170];
  var robotsYPositions = [70, 100, 300, 300, 950, 950, 710, 800];
  var robotsVelocities = [0, 150, 300];

  for (var i = 0; i < robotsXPositions.length; i++) {
    // Create a cube using the new game.add.isoSprite factory method at the specified position.
    // The last parameter is the group you want to add it to (just like game.add.sprite)
    robot = game.add.isoSprite(robotsXPositions[i], robotsYPositions[i], 0, 'robot', 6, obstacleGroup);
    robot.anchor.set(0.5);

    // Enable the physics body on this cube.
    game.physics.isoArcade.enable(robot);

    // Collide with the world bounds so it doesn't go falling forever or fly off the screen!
    robot.body.collideWorldBounds = true;

    // Add a full bounce on the x and y axes, and a bit on the z axis.
    robot.body.bounce.set(1, 1, 0.2);

    // Send the cubes off in random x and y directions! Wheee!
    //robot.body.velocity.setTo(game.rnd.integerInRange(-150, 150), game.rnd.integerInRange(-150, 150), 0);
    robot.body.velocity.setTo(robotsVelocities[game.rnd.integerInRange(0, 2)], robotsVelocities[game.rnd.integerInRange(0, 2)], robotsVelocities[game.rnd.integerInRange(0, 2)]);

    // Animations.
    robot.animations.add('up-left', [0]);
    robot.animations.add('up-right', [1]);
    robot.animations.add('bottom-left', [3]);
    robot.animations.add('bottom-right', [2]);
  }
};

var animateRobots = function (robot) {
  if(robot.body.velocity.x >= 0 && robot.body.velocity.y == 0) {
    robot.animations.play('bottom-right');
  } else if(robot.body.velocity.x < 0 && robot.body.velocity.y == 0) {
    robot.animations.play('up-left');
  } else if(robot.body.velocity.y >= 0) {
    robot.animations.play('bottom-left');
  } else if(robot.body.velocity.y < 0) {
    robot.animations.play('up-right');
  }
};
