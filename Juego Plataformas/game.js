// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var text2;
var winningMessage;
var losingMessage;
var won = false;
var lose = false;
var currentScore = 0;
var currentLives = 2;
var winningScore = 100;

// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  createItem(180, 180, 'coin'); //la de la 3ª
  createItem(40, 240, 'coin');  //la de la 4ª
  createItem(500, 90, 'coin'); //la de la primera
  createItem(620, 200, 'coin'); //la que esta a medias
  createItem(500, 250, 'coin'); //la de debajo de la a medias
  createItem(320, 350, 'coin'); //la centrada
  createItem(550, 450, 'coin'); //abajo dcha
  createItem(230, 450, 'coin');  //abajo izq
  createItem(370, 500, 'poison');
  createItem(100, 375, 'poison');
  createItem(125, 50, 'star');

}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(450, 150, 'platform2'); //Plataforma 1ª
  platforms.create(600, 250, 'platform');   //La que esta a medias
  platforms.create(80, 80, 'platform2');  //La mas alta
  platforms.create(200, 130, 'platform');  // La 2ª más alta
  platforms.create(100, 230, 'platform'); //La 3ª del lado de la izq
  platforms.create(30, 290, 'platform'); //La 4ª del lado de la izq
  platforms.create(400, 300, 'platform2'); //La 3ª del lado de la dcha
  platforms.create(250, 400, 'platform2');//La centrada
  platforms.create(450, 500, 'platform'); //Abajo a la dcha
  platforms.create(100, 500, 'platform'); //Abajo a la izq
  platforms.setAll('body.immovable', true);
}


// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}

// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(500, 400, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

// when the player collects an item on the screen
function itemHandler(player, item) {
  item.kill();
  switch (item.key){
    case 'coin':
    currentScore = currentScore + 10; 
    break; 

    case 'poison':
    currentScore = currentScore -10;
    if (currentScore<=0){
      currentLives=currentLives-1;
    }
    break; 

    case 'star':
    currentScore = currentScore + 20; 
    break; 
  }  

  if (currentScore === winningScore) {
      createBadge();
  }
}

// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  
  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#b99';
    
    //Load images
    game.load.image('platform', 'platform_1.png');
    game.load.image('platform2', 'platform_2.png');
    
    //Load spritesheets
    game.load.spritesheet('player', 'mikethefrog.png', 32, 32);
    game.load.spritesheet('coin', 'coin.png', 36, 44);
    game.load.spritesheet('badge', 'badge.png', 42, 54);
    game.load.spritesheet('poison', 'poison.png', 32, 0);
    game.load.spritesheet('star', 'star.png', 32, 30);


  }

  // initial game set up
  function create() {
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
    text2 = game.add.text(650, 16, "LIVES: " + currentLives, { font: "bold 24px Arial", fill: "white" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
    losingMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    losingMessage.anchor.setTo(0.5, 1);
  }

  // while the game is running
  function update() {

    text.text = "SCORE: " + currentScore;
    text2.text = "LIVES: " + currentLives;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }
    
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -400;
    }
    // when the player winw the game
    if (won) {
      winningMessage.text = "YOU WIN!!!";
    }
    else if (currentLives <= 0){
      losingMessage.text = "GAME OVER!!!";
    }
  }

  function render() {

  }

};
