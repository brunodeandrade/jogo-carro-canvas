var Game = {};

Game.fps = 30;



function Sprite (img) {
    this.img = img;
    this.posX;
    this.posY;
    this.posXWidth;
    this.posYHeight;
}

function Obstaculo (img,tipo) {
  this.img = img;
  this.posX;
  this.posY;
  this.tipo = tipo;
  this.posXWidth;
  this.posYHeight;
  
}


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


Game.desenhar = function (texto,cor,x,y) {
  ctx.font = "bold 30px Arial";
  ctx.fillStyle = cor;
  ctx.textAlign = "center";
  ctx.fillText(texto, x, y);
}

Game.animarExplosao = function (contador) {

  imagem = this.explosoes[contador].img;
  sleep(10);
  Game.renderizarImagemNaPosicao(imagem,this.carro.posX-50,this.carro.posY);
  
}

Game.animarFumaca = function (contador) {
  imagem = this.fumacas[contador].img;
  var j;
  
  for(j = 0; j < this.obstaculos.length; j++) { 
    if(this.obstaculos[j].tipo == 0)
      Game.renderizarImagemNaPosicao(imagem,this.obstaculos[j].posX+10,this.obstaculos[j].posY-7);
  }
  
}

Game.finalizarJogo = function () {

  this.gameOver = true;
    ctx.fillStyle = "white";
    if(this.maiorPontuacao < this.pontuacao){
        this.maiorPontuacao = this.pontuacao;
      }
    this.context.fillRect(this.canvas.width/2 - 350, this.canvas.height/3, 750, 300)
    Game.desenhar("FIM DE JOGO!!","red",this.canvas.width/2-20,this.canvas.height/2);
    Game.desenhar("Sua Pontuacao: ","green",this.canvas.width/2-60,this.canvas.height/2 + 50);
    Game.desenhar(this.pontuacao,"green",this.canvas.width/2 + 140,this.canvas.height/2 + 50);
    Game.desenhar("Maior Pontuacao: ","green",this.canvas.width/2-60,this.canvas.height/2 + 100);
    Game.desenhar(this.maiorPontuacao,"green",this.canvas.width/2 + 140,this.canvas.height/2 + 100);
    
    Game.desenhar("Pressione Barra de Espaço para reinicar","black",this.canvas.width/2 - 20,this.canvas.height/2 + 150);

}

Game.desviarCarro = function () {

  this.velX = randomIntFromInterval(-25,25);

}

Game.perderPontos = function () {
  this.pontuacao -= 7;
}

Game.verificarColisao = function (obstaculo) {

  if(((obstaculo.posX + obstaculo.posXWidth) >= this.carro.posX) &&
    (obstaculo.posX <= (this.carro.posX + this.carro.posXWidth-10)) &&
    ((obstaculo.posY+10 + obstaculo.posYHeight) >= this.carro.posY) &&
    (obstaculo.posY+10 <= (this.carro.posY + this.carro.posYHeight))){
      switch(obstaculo.tipo){
        case 0:
          this.gameOver = true;
          break;
        case 1:
          Game.desviarCarro();
          break;
        case 2:
          Game.perderPontos();
          break;
        default:
          break;
      }

  }


}

Game.renderizarImagemNaPosicao = function (img,x,y) {
  
  img = img;
  ctx = this.context;
  ctx.drawImage(img, x, y);
}

Game.renderizarImagemObstaculos = function () {

  for(i = 0; i < this.obstaculos.length; i++){
    
    ctx.drawImage(this.obstaculos[i].img, this.obstaculos[i].posX, this.obstaculos[i].posY);
    
  }
  for(i = 0; i < this.obstaculos.length; i++){
    Game.verificarColisao(this.obstaculos[i]);
  }
}

Game.carregarImagemCarro = function () {
  this.carro.img.src = 'imagens/carro.png';
  this.carro.posX = 350;
  this.carro.posY = 500;
  this.carro.posXWidth =  43;
  this.carro.posYHeight =  90;

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

Game.carregarAnimacaoExplosao = function () {
  var i;
  for(i = 0; i < 32; i++) {
    explosao = new Sprite(new Image());
    explosao.img.src = 'imagens/explosao/expl_10_00'.concat(i).concat('.png');
    this.explosoes.push(explosao);
  }
}

Game.carregarFumacas = function () {
  var i;
  for(i = 0; i < 24; i++) {
    fumaca = new Sprite(new Image());
    fumaca.img.src = 'imagens/fumaca/blackSmoke'.concat(i).concat('.png');
    this.fumacas.push(fumaca);
  }
}
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

Game.carregarImagensObstaculos = function () {

  for(i = 0; i < this.quantidade_obstaculos_tipo_1; i ++) {
    obstaculo = new Obstaculo(new Image(),0);
    obstaculo.posY = -50;  

    if(i%5 == 0){
      obstaculo.img.src = 'imagens/ambulancia.png';
      obstaculo.tipo = 0;
      obstaculo.posXWidth =  43;
      obstaculo.posYHeight =  96;
    }
    else if(i%5 == 1) {
      obstaculo.img.src = 'imagens/carro_azul.png';
      obstaculo.tipo = 0;
      obstaculo.posXWidth =  50;
      obstaculo.posYHeight =  95;
    }
    else if(i%5 == 2) {
      obstaculo.img.src = 'imagens/policia.png'; 
      obstaculo.tipo = 0;
      obstaculo.posXWidth =  40;
      obstaculo.posYHeight =  66;
    }
    else if(i%5 == 3) {
      obstaculo.img.src = 'imagens/oleo.png';
      obstaculo.tipo = 1;
      obstaculo.posXWidth = 68;
      obstaculo.posYHeight = 55;
    }
    else if(i%5 == 4) {
      obstaculo.img.src = 'imagens/buraco.png';
      obstaculo.tipo = 2;
      obstaculo.posXWidth = 50;
      obstaculo.posYHeight = 50;
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
}

Game.calcularPosicaoRua = function () {

  for( i = 0; i < this.ruas.length; i++){

    if (this.ruas[i].posY > 600) {
      this.ruas[i].posY = -1420;
    }

    this.ruas[i].posY += this.velocidadeRuaEObstaculos;
    this.velocidadeRuaEObstaculos += 0.001;

    Game.renderizarImagemNaPosicao(this.ruas[i].img,this.ruas[i].posX,this.ruas[i].posY);
  }
}

Game.posicaoAdequadaDoObstaculoX = function () {

  var aceitavel = false;
  var cont = 0;
  do{
    var repete = false;
    posX = randomIntFromInterval(110,520);
    for(j = 0; j < this.obstaculos.length; j++){

      diferenca = posX - this.obstaculos[j].posX;
      diferenca = Math.abs(diferenca);

      if(diferenca <= 50 ){
        aceitavel = false;
        repete = true;
        break;
      }
      else{
        aceitavel = true;
      }
    }
    cont++;
  }while(repete && cont < 5000);  

  return posX;
  
  
}

Game.calcularPosicaoObstaculos = function () {

  for(i = 0; i < this.obstaculos.length; i++){

    if(this.obstaculos[i].posY > 600){
      this.obstaculos[i].posY = randomIntFromInterval(-800,-80);
      this.obstaculos[i].posX = Game.posicaoAdequadaDoObstaculoX();
      
      
    }
    if(this.obstaculos[i].tipo == 0)
      this.obstaculos[i].posY += this.velocidadeRuaEObstaculos+1;
    else {
      this.obstaculos[i].posY += this.velocidadeRuaEObstaculos;
    }
    // this.context.clearRect(this.obstaculos[i].posX,this.obstaculos[i].posY,58,102);
  }

}

Game.gerarPontuacao = function () {
  

  this.pontuacao++;
  this.context.clearRect(400,50,500,500);
  Game.desenhar("Pontos: ","black",700,150);
  Game.desenhar(this.pontuacao,"black",this.canvas.width/2+300,this.canvas.height/5+100);

}


/*INICIALIZA OS PARÂMETROS DO JOGO */

Game.initialize = function(inicio) {
  this.entities = [];
  this.canvas = document.getElementById("canvas");
  this.context = this.canvas.getContext("2d");
  document.addEventListener('keydown', Game.keyDown);
  document.addEventListener('keyup', Game.keyUp);
  this.quantidade_obstaculos_tipo_1 = 6;
  this.velY = 0;
  this.velX = 0;
  this.speed = 5;
  this.friction = 1;
  this.keys = [];
  this.carro = new Sprite(new Image());
  this.velocidadeRuaEObstaculos = 2;
  this.ruas = [];
  this.obstaculos = [];
  this.gameOver = false;
  this.pause = false;
  this.teclaLiberada = true;
  this.pontuacao = 0;
  this.pontuacaoTemp = 0;
  this.explosoes = [];
  this.fumacas = [];
  this.contadorExplosao = 0;
  this.contadorFumaca = 0;

  if(inicio){
    this.maiorPontuacao = 0;
  }


  this.ruas.push(Game.carregarImagemRua());
  this.ruas.push(Game.carregarImagemRua());
  Game.posicaoInicialRuas();
  Game.carregarImagemCarro();
  Game.carregarFumacas();
  Game.carregarAnimacaoExplosao();
  Game.carregarImagensObstaculos();
  for(i = 0; i < this.obstaculos.length; i++){
    if(this.obstaculos[i].tipo == 0)
      this.obstaculos[i].posX = Game.posicaoAdequadaDoObstaculoX();
    // this.context.clearRect(this.obstaculos[i].posX,this.obstaculos[i].posY,58,102);
  }
  

  this.antigaPosX = this.carro.posX;
  this.inicio = true;

};

Game.pausarJogo = function() {
  if(this.pause == false && !this.gameOver){
    Game.desenhar("PAUSE","white",this.canvas.width/2-20,this.canvas.height/2);
    this.pause = true;
  }
  else {
    this.pause = false;
  }
}

Game.reiniciarJogo = function() {
  if(this.gameOver) {
    this.gameOver = false;
    Game.initialize(false);
  }
}

Game.zerarVelocidade = function () {
  this.velX = 0;
}

Game.keyUp = function() {
  Game.zerarVelocidade();

}

Game.keyDown = function(e) {

  if(e.keyCode == 37) {
    Game.esquerda();
    // this.carro.posX -=1;
  }
                
  if(e.keyCode == 39) {
    Game.direita();
  }

  if(e.keyCode == 80) {
    Game.pausarJogo();
  }

  if(e.keyCode == 32){
    Game.reiniciarJogo();
  }

};

Game.draw = function() {
  // this.context.clearRect(0, 0, 800, 600);

  // Your code goes here

  // =====
  // Example
  if(!this.gameOver){
    if(!this.pause) {
      this.context.clearRect(0,0,100,600);
      Game.gerarPontuacao();
      Game.calcularPosicaoCarro();
      Game.calcularPosicaoObstaculos();


      Game.calcularPosicaoRua();

       if(this.contadorFumaca == 24){
        this.contadorFumaca = 0;
      }

        Game.animarFumaca(this.contadorFumaca);

        this.contadorFumaca++;
      if(!this.gameOver)
        Game.renderizarImagemObstaculos();
      Game.renderizarImagemNaPosicao(this.carro.img,this.carro.posX,this.carro.posY);

     
    }
  } else {
      if(this.contadorExplosao == 32) {
        Game.finalizarJogo();
      }
      else{
        Game.animarExplosao(this.contadorExplosao);
        this.contadorExplosao++;
      }
    }
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


