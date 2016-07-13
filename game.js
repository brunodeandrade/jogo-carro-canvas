var Game = {};

Game.fps = 30;



function Sprite (img) {
    this.img = img;
    this.posX;
    this.posY;
}

function Obstaculo (img,tipo) {
  this.img = img;
  this.posX;
  this.posY;
  this.tipo = tipo;
}


Game.renderizarImagemNaPosicao= function (img,x,y) {
  img = img;
  ctx = this.context;
  ctx.drawImage(img, x, y);
}

Game.renderizarImagemObstaculos= function () {

  for(i = 0; i < this.obstaculos.length; i++){
    ctx.drawImage(this.obstaculos[i].img, this.obstaculos[i].posX, this.obstaculos[i].posY);
  }
}

Game.carregarImagemCarro = function () {
  this.carro.img.src = 'imagens/carro.png';
  this.carro.posX = 350;
  this.carro.posY = 500;
  Game.renderizarImagemNaPosicao(this.carro.img,this.carro.posX,this.carro.posY);
};

Game.carregarImagemRua = function () {
  rua = new Sprite(new Image());
  rua.img.src = 'imagens/rua.png';
  rua.posX = 100;
  rua.posY = -420;
  return rua;
  // Game.renderizarImagemNaPosicao(this.rua.img,this.carro.posX,this.carro.posY);
};

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

Game.carregarImagensObstaculos = function () {

  for(i = 0; i < this.quantidade_obstaculos_tipo_1; i ++) {
    obstaculo = new Obstaculo(new Image(),0);
    obstaculo.posY = -50;  

    if(i%3 == 0){
      obstaculo.img.src = 'imagens/ambulancia.png';
    }
    else if(i%3 == 1) {
      obstaculo.img.src = 'imagens/carro_azul.png';
    }
    else if(i%3 == 2) {
      obstaculo.img.src = 'imagens/policia.png'; 
    }

    obstaculo.posX = randomIntFromInterval(110,520);
    obstaculo.posY = randomIntFromInterval(-500,-50);
    Game.renderizarImagemNaPosicao(obstaculo.img,obstaculo.posX,obstaculo.posY);
    this.obstaculos.push(obstaculo);
  }

  


}

Game.posicaoInicialRuas = function () {

  this.ruas[0].posY = -420;
  this.ruas[1].posY = -1440;

}

Game.esquerda = function() {
  if (this.velX > -this.speed) {
    this.velX-=5;
  }
}

Game.direita = function () {
  if (this.velX < this.speed) {
    this.velX+=5;
  }
}

Game.calcularPosicaoCarro = function () {
  if(this.carro.posX < 110){
    this.carro.posX = 110;
  }
  else if (this.carro.posX > 535){
    this.carro.posX = 535;
  }
  this.velX *= this.friction;
  this.context.clearRect(this.carro.posX,this.carro.posY,58,102);
  this.carro.posX += this.velX;
  // console.log("PosX: ",this.carro.posX);
}

Game.calcularPosicaoRua = function () {

  for( i = 0; i < this.ruas.length; i++){

    if (this.ruas[i].posY > 600) {
      this.ruas[i].posY = -1440;
    }

    this.ruas[i].posY += this.velocidadeRuaEObstaculos;
    this.velocidadeRua += 0.001;

    Game.renderizarImagemNaPosicao(this.ruas[i].img,this.ruas[i].posX,this.ruas[i].posY);
  }
}

Game.calcularPosicaoObstaculos = function () {

  for(i = 0; i < this.obstaculos.length; i++){

    if(this.obstaculos[i].posY > 600){
      this.obstaculos[i].posX = randomIntFromInterval(110,520);
      this.obstaculos[i].posY = randomIntFromInterval(-500,-80);
    }

    this.obstaculos[i].posY += this.velocidadeRuaEObstaculos+1;
    // this.context.clearRect(this.obstaculos[i].posX,this.obstaculos[i].posY,58,102);
  }

}


/*INICIALIZA OS PARÂMETROS DO JOGO */

Game.initialize = function() {
  this.entities = [];
  this.context = document.getElementById("canvas").getContext("2d");
  document.addEventListener('keydown', Game.keyDown);
  this.quantidade_obstaculos_tipo_1 = 5;
  this.velY = 0;
  this.velX = 0;
  this.speed = 5;
  this.friction = 1;
  this.keys = [];
  this.carro = new Sprite(new Image());
  this.velocidadeRuaEObstaculos = 2;
  this.ruas = [];
  this.obstaculos = [];

  this.ruas.push(Game.carregarImagemRua());
  this.ruas.push(Game.carregarImagemRua());
  Game.posicaoInicialRuas();
  Game.carregarImagemCarro();
  Game.carregarImagensObstaculos();

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
  Game.calcularPosicaoCarro();
  Game.calcularPosicaoObstaculos();
  Game.calcularPosicaoRua();
  Game.renderizarImagemNaPosicao(this.carro.img,this.carro.posX,this.carro.posY);
  Game.renderizarImagemObstaculos();
  // }

  // this.antigaPosX = this.carro.posX;
  
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


