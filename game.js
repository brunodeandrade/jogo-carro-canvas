var Game = {};

Game.fps = 30;


function Sprite (img) {
    this.img = img;
    this.posX;
    this.posY;
}


Game.renderizarImagemNaPosicao= function (img,x,y) {
  img = img;
  ctx = this.context;
  // this.carro.img.onload = function(){
      ctx.drawImage(img, x, y);
  // }
}

Game.carregarImagemCarro = function () {
  this.carro.img.src = 'imagens/carro.png';
  this.carro.posX = 350;
  this.carro.posY = 500;
  Game.renderizarImagemNaPosicao(this.carro.img,this.carro.posX,this.carro.posY);
};

Game.carregarImagemRua = function () {
  this.rua.img.src = 'imagens/rua.png';
  this.rua.posX = 100;
  this.rua.posY = -200;
  Game.renderizarImagemNaPosicao(this.rua.img,this.carro.posX,this.carro.posY);
};

Game.esquerda = function() {
  if (this.velX > -this.speed) {
    this.velX-=10;
  }
}

Game.direita = function () {
  if (this.velX < this.speed) {
    this.velX+=10;
  }
}

Game.calcularPosicao = function () {
  if(this.carro.posX < 0){
    this.carro.posX = 0;
  }
  else if (this.carro.posX > 740){
    this.carro.posX = 740
  }
  this.velX *= this.friction;
  this.context.clearRect(this.carro.posX,this.carro.posY,58,102);
  this.carro.posX += this.velX;
  console.log("PosX: ",this.carro.posX);
}

Gasme.calcularPosicaoRua = function () {




}


/*INICIALIZA OS PARÂMETROS DO JOGO */

Game.initialize = function() {
  this.entities = [];
  this.context = document.getElementById("canvas").getContext("2d");
  document.addEventListener('keydown', Game.keyDown);
  this.velY = 0,
  this.velX = 0,
  this.speed = 5,
  this.friction = 0.9,
  this.keys = [];
  this.carro = new Sprite(new Image());
  this.rua = new Sprite(new Image());
  Game.carregarImagemCarro();
  Game.carregarImagemRua();
  this.antigaPosX = this.carro.posX;
  this.inicio = true;
  // Game.renderizarImagemNaPosicao(this.carro.img,this.carro.posX,this.carro.posY);
  // =====
  // Example
  this.rect_x = 0;
  this.rect_y = 0;
  // =====
};



Game.keyDown = function(e) {

  
  if(e.keyCode == 37) {
    Game.esquerda();
    // this.carro.posX -=1;
  }
                
  if(e.keyCode == 39) {
    Game.direita();
  }

};

Game.draw = function() {
  // this.context.clearRect(0, 0, 800, 600);

  // Your code goes here

  // =====
  // Example
  Game.calcularPosicao();
  Game.calcularPosicaoRua();
  
  Game.renderizarImagemNaPosicao(this.rua.img,this.rua.posX,this.rua.posY);
  if(this.antigaPosX != this.carro.posX) {
    Game.renderizarImagemNaPosicao(this.carro.img,this.carro.posX,this.carro.posY);

  }

  this.antigaPosX = this.carro.posX;
  
  //this.context.fillRect(this.rect_x, this.rect_y, 100, 100)
  //=====
};


Game.update = function() {
  // Your code goes here

  // =====
  // Example
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


