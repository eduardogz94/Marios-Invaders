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
    colision(obj){
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
        this.point = 0; 
    }
    
    draw(){ 
        ctx.font = "25px Arial"; 
        ctx.fillText(this.point.toString(), this.x, this.y); 
    }
}

//sprites clases
class Invaders {
    constructor(x){
        this.shellReady = true;
        this.life = true;
        this.shell = new Shell();
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
        
        this.shellDraw();
        this.shell.move();
    }
    
    shellDraw(){
        if(this.x < canvas.width && this.x > 0 && Math.random() < shellChance && this.shellReady){
            this.shell.x = this.x;
            this.shell.y = this.y;
            this.shell.ydir = shellSpeed;
            if (Math.random() < 0.3){
                this.shell.xdir = Math.random() * 5;    
            }
            
            else if (Math.random() < 0.6){
                this.shell.xdir = 0;
            }
            
            else if (Math.random() < 0.9){
                this.shell.xdir = Math.random() * (-5);    
            }
            
            this.shellReady = false;
        }
    }
    
    restart(){
        this.x = 0 - invadersHeight * Math.random() * 100;
        this.shellReady = true;
    }
}

class Waluigi extends Invaders {
    constructor(){
        super();
        this.shell = new Red();
    }

    draw(){ 
        ctx.save();
        ctx.drawImage(imageRepository.waluigi, this.x , this.y, this.w, this.h);
        ctx.restore();
        this.shell.draw();
    }

    dead(){
        audioHit();
        ctx.save();
        ctx.drawImage(imageRepository.explo, this.x , this.y, this.w, this.h); 
        ctx.restore();  
    }

}
class Wario extends Invaders {
    constructor(){
        super();
        this.shell = new Green();
    }

    draw(){ 
        ctx.save();
        ctx.drawImage(imageRepository.wario, this.x , this.y, this.w, this.h);
        ctx.restore();
        this.shell.draw();
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
        ctx.drawImage(imageRepository.red,this.x , this.y , 19, 24);
     }
}

class Green extends Shell {
    draw(){ 
        ctx.drawImage(imageRepository.green,this.x, this.y, 12, 22);
     }
}

class Blue extends Shell {
    draw(){ 
        ctx.drawImage(imageRepository.blue,this.x - 2, this.y - 32, 15, 25);
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
        ctx.drawImage(imageRepository.pipe,this.x - 10, surface - 20, 30,30);
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
        this.shot = [];
        this.dir = 0; 
        this.p = new Points(25); 
        this.pv = new Points(canvas.width - 75);
        this.pv.point = Lives;
        this.c = new Cannon(450,360);
        for(var i=0;i<100;i++){
            this.shot[i] = new Blue();
        }
    }
    
    pipeShell(){
        if(this.j == 100){
            this.j = 0;   
        }
           
        this.shot[this.j].x = this.c.x;
        this.shot[this.j].y = this.c.y;
        this.shot[this.j].ydir = blueSpeedy;
        this.shot[this.j].xdir = blueSpeedx;
        this.j++;
    }
    
    move(){
        this.c.mover(this.dir);
        for(var i=0;i<100;i++){
            this.shot[i].move();
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
            this.shot[i].draw();
        }
    }

}

var supermario = new Player();
var waluigi = [];
var wario = [];

//funciones de evento/movimientos
function colision(){
    for(var i=0;i<100;i++){
        for(var j=0;j<100;j++){
            if(supermario.shot[i].colision(waluigi[j])){
                waluigi[j].dead();
                waluigi[j].restart();
                supermario.shot[i].restart();
                points++;
                supermario.p.point = points;
            }

            if(supermario.shot[i].colision(wario[j])){
                wario[j].dead();
                wario[j].restart();
                supermario.shot[i].restart();
                points++;
                supermario.p.point = points;
            }
            
            if(waluigi[i].shell.colision(supermario.c) || wario[i].shell.colision(supermario.c) ){
                Lives--;
                waluigi[i].shell.restart();
                wario[i].shell.restart();
            }
            
            if(supermario.pv.point == 0){
                game = true;
                audioDead();
                musica.pause();
                }

            if(supermario.pv.point == 150){

            }
        }
    }
}


function movePipe(event){
    var key = event.keyCode;
    if(key == 38){ 
        blueSpeedx += 0.5; 
        supermario.shot[supermario.j].xdir = blueSpeedx;
    }
    
    if(key == 40){ 
        blueSpeedx -= 0.5;
        supermario.shot[supermario.j].xdir  = blueSpeedx;
    }
    
    if(key == 37){ 
        supermario.dir = -movementSpeed; 
    }
    
    if(key == 39){ 
        supermario.dir = movementSpeed; 
    }
    if(key == 32){
        supermario.pipeShell(); 
    }
}

function stopPipe(event){
    var key = event.keyCode;
    if(key == 37 || key == 39){ 
        supermario.dir = 0; 
    }
}

//funciones de control
function draw(){ 
    ctx.clearRect(0,0,canvas.width, canvas.height); 
    supermario.draw();
    supermario.pv.point = Lives;
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
        supermario.move();
        for(var i=0;i<100;i++){
            waluigi[i].move();
            wario[i].move();
        }
        draw();
        colision();
    }
    
    bucle = requestAnimationFrame(frame);
}

function pause(){ 
    game = true; 
}

function play(){ 
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
    audio.src = "animation/waluigi.mp3";
    audio.play();
}

function audioDead(){
    audio.src = "animation/mariodead.mp3";
    audio.play();
}

function audioWario(){
    audio.src = "animation/wario.mp3";
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
        var w = supermario.width ;
        var h = supermario.height ;
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
        var w = supermario.width;
        var h = supermario.height;
    }
    this.wario.onload = function() {
        var w = wario.width;
        var h = wario.height;
        imageLoaded();
    }

    this.red.onload = function(){
        var w = supermario.width;
        var h = supermario.height;
        imageLoaded();
    }

    this.green.onload = function(){
        var w = supermario.width;
        var h = supermario.height;
        imageLoaded();
    }
    // Set images src
    this.waluigi.src = "images/mario.png";
    this.pipe.src = "images/bueno.png";
    this.blue.src = "images/blue.png"
    this.wario.src = "images/wario.png";
    this.red.src = "images/red.png";
    this.green.src = "images/green.png";
    this.explo.src = "images/explosion.png";
}