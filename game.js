var Game = {};

Game.fps = 30;


Game.initialize = function() {
  this.entities = [];
  this.context = document.getElementById("canvas").getContext("2d");
  document.addEventListener('keydown', Game.keyDown);

var img = new Image();
img.src = 'imagens/carro.png';
img.onload = function(){
   this.context.drawImage(img, 0, 500);
}

  // =====
  // Example
  this.rect_x = 0;
  this.rect_y = 0;
  // =====
};

Game.keyDown = function(e) {
  if(e.keyCode == 37)
    {

    }
                
    if(e.keyCode == 39)
    {

    }
};

Game.draw = function() {
  this.context.clearRect(0, 0, 800, 600);

  // Your code goes here

  // =====
  // Example
  this.context.fillRect(this.rect_x, this.rect_y, 100, 100)
  //=====
};


Game.update = function() {
  // Your code goes here

  // =====
  // Example
  console.log("X: ",this.rect_x);
  console.log("Y: ",this.rect_y);
  // this.rect_x += 1
  // if (this.rect_x >= 800) {
  //   this.rect_x = -100
  // }

  // this.rect_y += 1
  // if (this.rect_y >= 600) {
  //   this.rect_y = -100
  // }
  // =====
};


