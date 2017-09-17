// 这是我们的玩家要躲避的敌人 
var Enemy = function(x,y,speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    this.speed=speed;
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    if(player.won==false){
        this.x = this.x + this.speed*dt;
        if(this.x>505) this.x=-101;
        this.checkCollisions();    
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {    
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//敌人和玩家遭遇，游戏重新开始
Enemy.prototype.checkCollisions = function(){
     if(player.x>this.x-30&&player.x<this.x+30)
        if(player.y>this.y-30&&player.y<this.y+30){
          game.replay();
        }
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x,y){
    //玩家赢了标志
    this.won=false;
    //玩家位置
    this.x = x;
    this.y = y;
    this.speed=20;
    //玩家活动边界
    this.borderleft=0;
    this.borderright=400;
    this.bordertop=0;
    this.borderbottom=400;
    this.sprite = 'images/char-pink-girl.png';
};

Player.prototype.update = function(dt){
    
};
Player.prototype.render = function(){
    //玩家顺利抵达河流边
   if(this.y==0&&this.won==false){
        this.won=true;
    }
    //玩家获胜
    if(this.won==true){
        ctx.drawImage(Resources.get('images/Star.png'),210,200);
        ctx.drawImage(Resources.get('images/Star.png'),110,200);
        ctx.drawImage(Resources.get('images/Star.png'),310,200);

        game.showBtnStart();
    }

    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};
//玩家依靠键盘移动位置
Player.prototype.handleInput = function(direction){
    if(this.won==false){
         switch(direction){
            case "left":
                this.x = (this.x-this.speed)<this.borderleft?this.borderleft:this.x-this.speed;
                break;
            case "right":
                this.x = (this.x+this.speed)>this.borderright?this.borderright:this.x+this.speed;
                break;
            case "up":
                this.y = (this.y-this.speed)<this.bordertop?this.bordertop:this.y-this.speed;
                break;
            case "down":
                this.y = (this.y+this.speed)>this.borderbottom?this.borderbottom:this.y+this.speed;
                break;
        }
    }   
};
// 现在实例化你的所有对象
var enemy_bug1 = new Enemy(0,60,50);
var enemy_bug2 = new Enemy(-150,145,45);
var enemy_bug3 = new Enemy(-400,230,40);
var enemy_bug4 = new Enemy(-360,60,50);
var enemy_bug5 = new Enemy(-450,145,45);
var enemy_bug6 = new Enemy(-580,230,40);   

// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var allEnemies = [];
allEnemies.push(enemy_bug1);
allEnemies.push(enemy_bug2);
allEnemies.push(enemy_bug3);
allEnemies.push(enemy_bug4);
allEnemies.push(enemy_bug5);
allEnemies.push(enemy_bug6);

// 把玩家对象放进一个叫 player 的变量里面
var player = new Player(200,400);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//游戏重新开始按钮
var Game = function(){
    this.btnplayX = 410;
    this.btnplayY = 400;
    this.btnStart = 'images/Key.png';
};
//显示重新开始游戏按钮
Game.prototype.showBtnStart = function(){
    ctx.drawImage(Resources.get(this.btnStart),this.btnplayX,this.btnplayY);
};
//游戏开始，玩家位置、敌人位置和速度
Game.prototype.replay = function(){
   player.x=200;
   player.y=400;
   player.won=false;
   var k=0,x=0,y=0,speed=0;
   allEnemies.forEach(function(enemy){
    k++;
    switch(k){
        case 1:
            x=0;y=60;speed=50;
            break;
        case 2:
            x=-150;y=145;speed=45;
            break;
        case 3:
            x=-400;y=230;speed=40;
            break;
        case 4:
            x=-360;y=60;speed=50;
            break;
        case 5:
            x=-450;y=145;speed=45;
            break;
        case 6:
            x=-580;y=230;speed=40;
            break;
    }
    enemy.y = y;
    enemy.x = x;
    enemy.speed = speed;
   });
};

var game = new Game();
