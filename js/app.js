"use strict";
//角色类
var Character = function(x,y,sprite){
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};
//此为游戏必须的函数，用来画出屏幕上的角色
Character.prototype.render=function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //玩家获胜
    if(Won==true){
        ctx.drawImage(Resources.get('images/Star.png'),210,200);
        ctx.drawImage(Resources.get('images/Star.png'),110,200);
        ctx.drawImage(Resources.get('images/Star.png'),310,200);

        game.showBtnStart();
    }
};

// 这是我们的玩家要躲避的敌人 
var Enemy = function(x,y,speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    var enemy = Object.create(Enemy.prototype);
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    Character.call(enemy,x,y,'images/enemy-bug.png');
    enemy.speed = speed;
    return enemy;
};
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    if(Won==false){
        this.x = this.x + this.speed*dt;
        if(this.x>505) this.x=-101;
        this.checkCollisions();    
    }
};

//敌人和玩家遭遇，游戏重新开始
Enemy.prototype.checkCollisions = function(){
     if(Math.abs(player.x-this.x)<70 && Math.abs(player.y-this.y)<70){
          game.replay();
     }
};


// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x,y){
    var player = Object.create(Player.prototype);
    Character.call(player,x,y,'images/char-pink-girl.png');
    //玩家位置
    return player;
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(dt){
    if(this.y==0&&Won==false){
        Won=true;
    }    
};

//玩家赢了标志
var Won=false;
//玩家活动边界
var BorderLeft=0;
var BorderRight=400;
var BorderTop=0;
var BorderBottom=400;
var PlayerStepWidth=101;
var PlayerStepHeigth=83;

//玩家依靠键盘移动位置
Player.prototype.handleInput = function(direction){
    if(Won==false){
         switch(direction){
            case "left":
                this.x = (this.x-PlayerStepWidth)<BorderLeft?BorderLeft:this.x-PlayerStepWidth;
                break;
            case "right":
                this.x = (this.x+PlayerStepHeigth)>BorderRight?BorderRight:this.x+PlayerStepHeigth;
                break;
            case "up":
                this.y = (this.y-PlayerStepHeigth)<BorderTop?BorderTop:this.y-PlayerStepHeigth;
                break;
            case "down":
                this.y = (this.y+PlayerStepWidth)>BorderBottom?BorderBottom:this.y+PlayerStepWidth;
                break;
        }
    }   
};

// 游戏设置
var Game = function(){
    //游戏重新开始按钮
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
   allEnemies = [];
   this.addEnemyBugs();
   this.resetPlayer();
};

//添加玩家的敌人
Game.prototype.addEnemyBugs = function(){    
   for(var i=0;i<10;i++){
        var random  = parseInt(10*Math.random()%3);
        var x = random*(-150);
        var y = random*85+60;
        var speed = 70-10*random;
        var enemy_bug= new Enemy(x,y,speed); 
        allEnemies.push(enemy_bug);
    }
};

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

//重置玩家状态
Game.prototype.resetPlayer = function(){
   player.x=200;
   player.y=400;
   Won=false;
};

//
var game = new Game();
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var allEnemies = [];
game.addEnemyBugs();

// 把玩家对象放进一个叫 player 的变量里面
var player = new Player(200,400);

