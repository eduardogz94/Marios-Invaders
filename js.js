var bucle;
var asd = false;
var vidaTanque = 100;
var velocidadTanque = 4;
var alturaTanque = 10
var largoTanque = 50;
var velocidadBalay = -5;
var velocidadBalax = 0;
var VelocidadBomba = 5;
var largoAvion = 10;
var alturaAvion = 5;
var velocidadAvion = 5;
var probTiro = 0.01;
var canvas = document.getElementById("canvas");
var music = document.getElementById("musica");
var ctx = canvas.getContext("2d");
var puntos = 0;
var superficie = canvas.height - alturaTanque;
var audio = new Audio();

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

class Puntos {
    constructor(x){ 
        this.x = x; 
        this.y = 25; 
        this.punto = 0; 
    }
    
    dibujar(){ 
        ctx.font = "25px Arial"; 
        ctx.fillText(this.punto.toString(), this.x, this.y); 
    }
}

class Cannon {
    constructor(x,y){
        this.x = x;
        this.w = 1;
        this.h = -20;
        this.y = y;
    }
    
    mover(dir){ 
        this.x += dir; 
    }
}

class Waluigi {
    constructor(x){
        this.bom = true;
        this.life = true;
        this.bomba = new enemyT();
        this.x = 0 - largoAvion * Math.random() * 1000;
        this.w = 30;
        this.h = 30;
        //this.y = Math.random() * 100 + 50;
        do{
            this.y = Math.random() * 200;
        }while(this.y < 35)
        this.xdir = velocidadAvion * Math.random() + 0.1;
        
    }
    
    dibujar(){ 
        ctx.save();
        ctx.drawImage(imageRepository.enemy, this.x , this.y, this.w, this.h);
        ctx.restore();
        this.bomba.dibujar();
    }
    
    mover(){ 
        this.x += this.xdir; 
        this.derecha = this.w + this.x; 
        this.fondo = this.h + this.y;
        if(this.x > canvas.width){
            this.restart();
            vidaTanque--;
        }
        
        this.bombardeo();
        this.bomba.mover();
    }
    
    bombardeo(){
        if(this.x < canvas.width && this.x > 0 && Math.random() < probTiro && this.bom){
            this.bomba.x = this.x;
            this.bomba.y = this.y;
            this.bomba.ydir = VelocidadBomba;
            if (Math.random() < 0.3){
                this.bomba.xdir = Math.random() * 5;    
            }
            
            else if (Math.random() < 0.6){
                this.bomba.xdir =0;
            }
            
            else if (Math.random() < 0.9){
                this.bomba.xdir = Math.random() * (-5);    
            }
            
            this.bom = false;
        }
    }
    
    restart(){
        this.x = 0 - largoAvion * Math.random() * 100;
        //this.y = Math.random()  * 100;
        this.bom = true;
    }

    dead(){
    ctx.save();
    ctx.drawImage(imageRepository.explo, this.x , this.y, this.w, this.h); 
    ctx.restore();
    audioHit();  
    }
}
 
class Wario {
    constructor(x){
        this.bom = true;
        this.life = true;
        this.bomba = new enemyB();
        this.x = 0 - largoAvion * Math.random() * 1000;
        this.w = 30;
        this.h = 30;
        //this.y = Math.random() * 100 + 50;
        do{
            this.y = Math.random() * 200;
        }while(this.y < 35)
        this.xdir = velocidadAvion * Math.random() + 0.1;
        
    }
    
    dibujar(){ 
        ctx.save();
        ctx.drawImage(imageRepository.sprite, this.x , this.y, this.w, this.h);
        ctx.restore();
        this.bomba.dibujar();
    }
    

    mover(){ 
        this.x += this.xdir; 
        this.derecha = this.w + this.x; 
        this.fondo = this.h + this.y;
        if(this.x > canvas.width){
            this.restart();
            vidaTanque--;
        }
        
        this.bombardeo();
        this.bomba.mover();
    }
    
    bombardeo(){
        if(this.x < canvas.width && this.x > 0 && Math.random() < probTiro && this.bom){
            this.bomba.x = this.x;
            this.bomba.y = this.y;
            this.bomba.ydir = VelocidadBomba;
            if (Math.random() < 0.3){
                this.bomba.xdir = 10;    
            }
            
            else if (Math.random() < 0.6){
                this.bomba.xdir =0;
            }
            
            else if (Math.random() < 0.9){
                this.bomba.xdir = 10;    
            }
            
            this.bom = false;
        }
    }
    
    restart(){
        this.x = 0 - largoAvion * Math.random() * 100;
        //this.y = Math.random()  * 100;
        this.bom = true;
    }

    dead(){
        audioWario();
        ctx.save;
        ctx.drawImage(imageRepository.explo, this.x , this.y, this.w, this.h);   
        ctx.restore();
    }
}

class Tanque {
    constructor(){
        this.x = (canvas.width - largoTanque) / 2;
        this.w = largoTanque;
        this.h = alturaTanque;
        this.y = superficie - 5;
    }
    
    dibujar(){         
            ctx.save();
            ctx.drawImage(imageRepository.spaceship,this.x , superficie - 50, 50,60);
            ctx.restore();
        }
    
    mover(dir){ 
        this.x += dir; 
        this.derecha = this.w + this.x; 
        this.fondo = this.h + this.y;
    }

}

class Bala extends Base {
    constructor(){
        super();
        this.t = 5;
        this.x = canvas.width * 2;
        this.y = canvas.height * 2;
        this.xdir = 0;
        this.ydir = 0;
    }
    
    mover(){
        this.x+=this.xdir;
        this.y+=this.ydir;
        this.fondo = this.y+this.t;
        this.derecha = this.x+this.t;
    }
    
    dibujar(){ 
        ctx.drawImage(imageRepository.bullet,this.x - 10, this.y - 20, 20, 30);
        }
    
    restart(){
        this.x = canvas.width * 1;
        this.y = canvas.height * 1;
        this.xdir = 0;
        this.ydir = 0;
    }
}

class enemyB extends Base {
    constructor(){
        super();
        this.t = 5;
        this.x = canvas.width * 2;
        this.y = canvas.height * 2;
        this.xdir = 0;
        this.ydir = 0;
    }
    
    mover(){
        this.x+=this.xdir;
        this.y+=this.ydir;
        this.fondo = this.y+this.t;
        this.derecha = this.x+this.t;
    }
    
    dibujar(){ 
        ctx.drawImage(imageRepository.red,this.x - 10, this.y - 20, 20, 30);
        }
    
    restart(){
        this.x = canvas.width * 1;
        this.y = canvas.height * 1;
        this.xdir = 0;
        this.ydir = 0;
    }
}

class enemyT extends Base {
    constructor(){
        super();
        this.t = 5;
        this.x = canvas.width * 2;
        this.y = canvas.height * 2;
        this.xdir = 0;
        this.ydir = 0;
    }
    
    mover(){
        this.x+=this.xdir;
        this.y+=this.ydir;
        this.fondo = this.y+this.t;
        this.derecha = this.x+this.t;
    }
    
    dibujar(){ 
        ctx.drawImage(imageRepository.green,this.x - 10, this.y - 20, 20, 30);
        }
    
    restart(){
        this.x = canvas.width * 1;
        this.y = canvas.height * 1;
        this.xdir = 0;
        this.ydir = 0;
    }
}

class Player extends Base {
    constructor(){
        super();
        this.j = 0;
        this.tiro = [];
        this.dir = 0;
        this.t = new Tanque();  
        this.p = new Puntos(25); 
        this.pv = new Puntos(canvas.width - 75);
        this.pv.punto = vidaTanque;
        this.c = new Cannon(this.t.x + 25,this.t.y - 46);
        for(var i=0;i<100;i++){
            this.tiro[i] = new Bala();
        }
    }
    
    disparo(){
        if(this.j == 100){
            this.j = 0;   
        }
           
        this.tiro[this.j].x = this.c.x;
        this.tiro[this.j].y = this.c.y;
        this.tiro[this.j].ydir = velocidadBalay;
        this.tiro[this.j].xdir = velocidadBalax;
        this.j++;
    }
    
    mover(){
        this.t.mover(this.dir);
        this.c.mover(this.dir);
        for(var i=0;i<100;i++){
            this.tiro[i].mover();
        }
        
        if(this.t.x <= 0){
            this.t.x = 0;
            this.c.x = this.t.x + largoTanque / 2;
        }
        
        if(this.t.x >= canvas.width - largoTanque){ 
            this.t.x = canvas.width - largoTanque;
            this.c.x = this.t.x + largoTanque / 2;
        }
    }
    
    dibujar(){ 
        this.p.dibujar();
        this.pv.dibujar();
        this.t.dibujar();
        for(var i=0;i<100;i++){
            this.tiro[i].dibujar();
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
                puntos++;
                jugador.p.punto = puntos;
            }

            if(jugador.tiro[i].choque(wario[j])){
                wario[j].dead();
                wario[j].restart();
                jugador.tiro[i].restart();
                puntos++;
                jugador.p.punto = puntos;
            }
            
            if(waluigi[i].bomba.choque(jugador.t) || wario[i].bomba.choque(jugador.t) ){
                vidaTanque--;
                waluigi[i].bomba.restart();
                wario[i].bomba.restart();
            }
            
            if(jugador.pv.punto == 0){
                asd = true;
                audioDead();
                musica.pause();
                }
        }
    }
}


function moverTanque(event){
    var tecla = event.keyCode;
    if(tecla == 38){ 
        velocidadBalax += 0.2; 
        jugador.tiro[jugador.j].xdir = velocidadBalax;
    }
    
    if(tecla == 40){ 
        velocidadBalax -= 0.2;
        jugador.tiro[jugador.j].xdir  = velocidadBalax;
    }
    
    if(tecla == 37){ 
        jugador.dir = -velocidadTanque; 
    }
    
    if(tecla == 39){ 
        jugador.dir = velocidadTanque; 
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
function dibujar(){ 
    ctx.clearRect(0,0,canvas.width, canvas.height); 
    jugador.dibujar();
    jugador.pv.punto = vidaTanque;
    for(var i=0;i<100;i++){
        waluigi[i].dibujar();
        wario[i].dibujar();
    }
}

function frame(){ 
    if(asd){ 
        dibujar(); 
    }
    
    else{ 
        jugador.mover();
        for(var i=0;i<100;i++){
            waluigi[i].mover();
            wario[i].mover();
        }
        dibujar();
        choque();
    }
    
    bucle = requestAnimationFrame(frame);
}

function pausar(){ 
    asd = true; 
}

function continuar(){ 
    asd = false; 
}

function reiniciar(){
    location.reload();
    iniciar();
}

function iniciar(){ 
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
    this.spaceship = new Image();
    this.sprite = new Image();
    this.enemy = new Image();
    this.bullet = new Image();
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
    this.spaceship.onload = function() {
        var w = jugador.width ;
        var h = jugador.height ;
        imageLoaded();
    }

    this.explo.onload = function(){
        imageLoaded();
    }

    this.enemy.onload = function() {
        var w = waluigi.width;
        var h = waluigi.height;
        imageLoaded();
    }
    this.bullet.onload = function(){
        var w = jugador.width;
        var h = jugador.height;
    }
    this.sprite.onload = function() {
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
    this.enemy.src = "mario.png";
    this.spaceship.src = "bueno.png";
    this.bullet.src = "bullet.png"
    this.sprite.src = "wario.png";
    this.red.src = "red.png";
    this.green.src = "green.png";
    this.explo.src = "explosion.png";
}