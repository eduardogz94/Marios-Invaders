// game variables
var bucle;
var game = false;
var Lives = 100;
//sprites variables
var movementSpeed = 4;
var pipeHeight = 10
var pipeWidth = 50;
var blueSpeedy = -5;
var blueSpeedx = 0;
var shellSpeed = 5;
var invadersHeight = 10;
var invadersSpeed = 5;
var shellChance = 0.01;
//global variables
var canvas = document.getElementById("canvas");
var music = document.getElementById("musica");
var ctx = canvas.getContext("2d");
var points = 0;
var surface = canvas.height - pipeHeight; //superficie
var audio = new Audio();

//base classes
class Base {
    choque(obj){
        if(this.fondo < obj.y || this.y > obj.fondo || this.derecha < obj.x || this.x > obj.derecha){ 
            return false; 
        }
        
        else { 
            return true; 
        }
    }
}

class Points {
    constructor(x){ 
        this.x = x; 
        this.y = 25; 
        this.punto = 0; 
    }
    
    draw(){ 
        ctx.font = "25px Arial"; 
        ctx.fillText(this.punto.toString(), this.x, this.y); 
    }
}

//sprites clases
class Invaders {
    constructor(x){
        this.bom = true;
        this.life = true;
        this.bomba = new Green();
        this.x = 0 - invadersHeight * Math.random() * 1000;
        this.w = 30;
        this.h = 30;
        do{
            this.y = Math.random() * 200;
        }while(this.y < 35)
        this.xdir = invadersSpeed * Math.random() + 0.1;
        
    }
    
    move(){ 
        this.x += this.xdir; 
        this.derecha = this.w + this.x; 
        this.fondo = this.h + this.y;
        if(this.x > canvas.width){
            this.restart();
            Lives--;
        }
        
        this.bombardeo();
        this.bomba.move();
    }
    
    bombardeo(){
        if(this.x < canvas.width && this.x > 0 && Math.random() < shellChance && this.bom){
            this.bomba.x = this.x;
            this.bomba.y = this.y;
            this.bomba.ydir = shellSpeed;
            if (Math.random() < 0.3){
                this.bomba.xdir = Math.random() * 5;    
            }
            
            else if (Math.random() < 0.6){
                this.bomba.xdir = 0;
            }
            
            else if (Math.random() < 0.9){
                this.bomba.xdir = Math.random() * (-5);    
            }
            
            this.bom = false;
        }
    }
    
    restart(){
        this.x = 0 - invadersHeight * Math.random() * 100;
        this.bom = true;
    }
}

class Waluigi extends Invaders {
    draw(){ 
        ctx.save();
        ctx.drawImage(imageRepository.waluigi, this.x , this.y, this.w, this.h);
        ctx.restore();
        this.bomba.draw();
    }

    dead(){
        ctx.save();
        ctx.drawImage(imageRepository.explo, this.x , this.y, this.w, this.h); 
        ctx.restore();
        audioHit();  
    }

}
class Wario extends Invaders {
    draw(){ 
        ctx.save();
        ctx.drawImage(imageRepository.wario, this.x , this.y, this.w, this.h);
        ctx.restore();
        this.bomba.draw();
    }
    
    dead(){
        audioWario();
        ctx.save;
        ctx.drawImage(imageRepository.explo, this.x , this.y, this.w, this.h);   
        ctx.restore();
    }
}
//shell class
class Shell extends Base {
    constructor(){
        super();
        this.t = 5;
        this.x = canvas.width * 2;
        this.y = canvas.height * 2;
        this.xdir = 0;
        this.ydir = 0;
    }
    
    move(){
        this.x+=this.xdir;
        this.y+=this.ydir;
        this.fondo = this.y+this.t;
        this.derecha = this.x+this.t;
    }
    
    restart(){
        this.x = canvas.width * 1;
        this.y = canvas.height * 1;
        this.xdir = 0;
        this.ydir = 0;
    }
}

class Red extends Shell {
    draw(){ 
        ctx.drawImage(imageRepository.red,this.x - 10, this.y - 20, 20, 30);
     }
}

class Green extends Shell {
    draw(){ 
        ctx.drawImage(imageRepository.green,this.x - 10, this.y - 20, 20, 30);
     }
}

class Blue extends Shell {
    draw(){ 
        ctx.drawImage(imageRepository.blue,this.x - 10, this.y - 20, 20, 30);
      }
}
//pipe class
class Cannon {
    constructor(x,y){
        this.x = x;
        this.w = pipeWidth;
        this.h = pipeHeight;
        this.y = surface - 5;
    }
    
    draw(){         
        ctx.save();
        ctx.drawImage(imageRepository.pipe,this.x , surface - 50, 50,60);
        ctx.restore();
 }

    mover(dir){ 
        this.x += dir; 
        this.derecha = this.w + this.x; 
        this.fondo = this.h + this.y;
    }
}

class Player extends Base {
    constructor(){
        super();
        this.j = 0;
        this.tiro = [];
        this.dir = 0; 
        this.p = new Points(25); 
        this.pv = new Points(canvas.width - 75);
        this.pv.punto = Lives;
        this.c = new Cannon(450,360);
        for(var i=0;i<100;i++){
            this.tiro[i] = new Blue();
        }
    }
    
    disparo(){
        if(this.j == 100){
            this.j = 0;   
        }
           
        this.tiro[this.j].x = this.c.x;
        this.tiro[this.j].y = this.c.y;
        this.tiro[this.j].ydir = blueSpeedy;
        this.tiro[this.j].xdir = blueSpeedx;
        this.j++;
    }
    
    move(){
        this.c.mover(this.dir);
        for(var i=0;i<100;i++){
            this.tiro[i].move();
        }
        
        if(this.c.x <= 0){
            this.c.x = 0;
        }
        
        if(this.c.x >= canvas.width - pipeWidth){ 
            this.c.x = canvas.width - pipeWidth;
        }
    }
    
    draw(){ 
        this.p.draw();
        this.pv.draw();
        this.c.draw();
        for(var i=0;i<100;i++){
            this.tiro[i].draw();
        }
    }

}

var jugador = new Player();
var waluigi = [];
var wario = [];

//funciones de evento/movimientos
function choque(){
    for(var i=0;i<100;i++){
        for(var j=0;j<100;j++){
            if(jugador.tiro[i].choque(waluigi[j])){
                waluigi[j].dead();
                waluigi[j].restart();
                jugador.tiro[i].restart();
                points++;
                jugador.p.punto = points;
            }

            if(jugador.tiro[i].choque(wario[j])){
                wario[j].dead();
                wario[j].restart();
                jugador.tiro[i].restart();
                points++;
                jugador.p.punto = points;
            }
            
            if(waluigi[i].bomba.choque(jugador.c) || wario[i].bomba.choque(jugador.c) ){
                Lives--;
                waluigi[i].bomba.restart();
                wario[i].bomba.restart();
            }
            
            if(jugador.pv.punto == 0){
                game = true;
                audioDead();
                musica.pause();
                }
        }
    }
}


function moverTanque(event){
    var tecla = event.keyCode;
    if(tecla == 38){ 
        blueSpeedx += 0.2; 
        jugador.tiro[jugador.j].xdir = blueSpeedx;
    }
    
    if(tecla == 40){ 
        blueSpeedx -= 0.2;
        jugador.tiro[jugador.j].xdir  = blueSpeedx;
    }
    
    if(tecla == 37){ 
        jugador.dir = -movementSpeed; 
    }
    
    if(tecla == 39){ 
        jugador.dir = movementSpeed; 
    }
    if(tecla == 32){
        jugador.disparo(); 
    }
}

function pararTanque(event){
    var tecla = event.keyCode;
    if(tecla == 37 || tecla == 39){ 
        jugador.dir = 0; 
    }
}

//funciones de control
function draw(){ 
    ctx.clearRect(0,0,canvas.width, canvas.height); 
    jugador.draw();
    jugador.pv.punto = Lives;
    for(var i=0;i<100;i++){
        waluigi[i].draw();
        wario[i].draw();
    }
}

function frame(){ 
    if(game){ 
        draw(); 
    }
    
    else{ 
        jugador.move();
        for(var i=0;i<100;i++){
            waluigi[i].move();
            wario[i].move();
        }
        draw();
        choque();
    }
    
    bucle = requestAnimationFrame(frame);
}

function pausar(){ 
    game = true; 
}

function continuar(){ 
    game = false; 
}

function restart(){
    location.reload();
    start();
}

function start(){ 
    var modal = document.getElementById("modal"); 
    modal.style.display = "none";
    for(var i=0;i<100;i++){
        waluigi[i] = new Waluigi();
        wario[i] = new Wario();
    }
    frame(); 
}

function audioHit(){
    audio.src = "waluigi.mp3";
    audio.play();
}

function audioDead(){
    audio.src = "mariodead.mp3";
    audio.play();
}

function audioWario(){
    audio.src = "wario.mp3";
    audio.play();
}
var imageRepository = new function() {
    
    // Define images
    this.pipe = new Image();
    this.wario = new Image();
    this.waluigi = new Image();
    this.blue = new Image();
    this.red = new Image();
    this.green = new Image();
    this.explo = new Image();

    // Ensure all images have loaded before starting the game
    var numImages = 7;
    var numLoaded = 0;
    function imageLoaded() {
        numLoaded++;
        if (numLoaded === numImages) {
            window.init();
        }
    }

    //function onload
    this.pipe.onload = function() {
        var w = jugador.width ;
        var h = jugador.height ;
        imageLoaded();
    }

    this.explo.onload = function(){
        imageLoaded();
    }

    this.waluigi.onload = function() {
        var w = waluigi.width;
        var h = waluigi.height;
        imageLoaded();
    }
    this.blue.onload = function(){
        var w = jugador.width;
        var h = jugador.height;
    }
    this.wario.onload = function() {
        var w = wario.width;
        var h = wario.height;
        imageLoaded();
    }

    this.red.onload = function(){
        var w = jugador.width;
        var h = jugador.height;
        imageLoaded();
    }

    this.green.onload = function(){
        var w = jugador.width;
        var h = jugador.height;
        imageLoaded();
    }

    // Set images src
    this.waluigi.src = "mario.png";
    this.pipe.src = "bueno.png";
    this.blue.src = "blue.png"
    this.wario.src = "wario.png";
    this.red.src = "red.png";
    this.green.src = "green.png";
    this.explo.src = "explosion.png";
}