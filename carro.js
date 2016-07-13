var Carro = {};

Carro.initialize = function(context) {
  this.entities = [];
  this.context = document.getElementById("canvas").getContext("2d");
  context1 = document.getElementById("canvas").getContext("2d");

  document.addEventListener('keydown', Game.keyDown);
  var img = new Image();
  img.src = 'imagens/carro.png';
  img.onload = function(){
      context1.drawImage(img, 0, 400);
  }

  // =====
  // Example
  this.rect_x = 0;
  this.rect_y = 0;
  // =====
};
