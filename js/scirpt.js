const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const score_field = document.getElementById('score');

var jumping = false;

const penguin = {
    x: 100,
    y: 670,
    height: 100,
    width: 50,
    //penguins jumping force
    force: 20,
    score: 0
};

score_field.innerHTML = penguin.score;

const enemy = {
    enemy1: {
        x: canvas.width,
        y: 670,
        height: 100,
        width: 50,
        done: 0
    },
    enemy2: {
        x: canvas.width + 500,
        y: 670,
        height: 100,
        width: 50,
        done: 0
    },
    enemy3: {
        x: canvas.width + 1000,
        y: 670,
        height: 100,
        width: 50,
        done: 0
    }
};

function drawer(){
    context.clearRect(0,0,canvas.width, canvas.height);
    context.fillStyle = 'green';
    context.fillRect(0, 770, canvas.width, 30);
    context.fillStyle = 'black';
    context.fillRect(penguin.x, penguin.y, penguin.width, penguin.height);
    context.fillStyle = 'red';
    context.fillRect(enemy.enemy1.x, enemy.enemy1.y, enemy.enemy1.width, enemy.enemy1.height);
    context.fillRect(enemy.enemy2.x, enemy.enemy2.y, enemy.enemy2.width, enemy.enemy2.height);
    context.fillRect(enemy.enemy3.x, enemy.enemy3.y, enemy.enemy3.width, enemy.enemy3.height);
}

function updater(){
    enemy.enemy1.x -= 5;
    enemy.enemy2.x -= 5;
    enemy.enemy3.x -= 5;

    if(enemy.enemy1.x <= -300){
        enemy.enemy1.x = canvas.width;
    }

    if(enemy.enemy2.x <= -300){
        enemy.enemy2.x = canvas.width;
    }

    if(enemy.enemy3.x <= -300){
        enemy.enemy3.x = canvas.width;
    }

}

function loop(){
    drawer();
    jump_engine();
    updater();
    collision_checker();
    score_checker();

    requestAnimationFrame(loop);
}

loop();

document.addEventListener('keydown', function(event) {
    if(event.keyCode === 32){
        if(penguin.y === 670){
            jumping = true;
        }

    }
}, false);

function jump_engine(){
    if(jumping === true){
        penguin.y -= penguin.force;
        //speed of falling
        penguin.force -= 0.7;
        if(penguin.y >= 670){
            jumping = false;
            //resetting penguins jumping force
            penguin.force = 20;
            penguin.y = 670;
        }
    }
}

function collision_checker() {
    //Checking collision with enemy 1
    if(penguin.x >= enemy.enemy1.x - 40 && penguin.x <= enemy.enemy1.x + 40){
        if(penguin.y >= 550 - (penguin.force - 20)){
            alert("You lost");
        }
    }

    //Checking collision with enemy 2
    if(penguin.x >= enemy.enemy2.x - 40 && penguin.x <= enemy.enemy2.x + 40){
        if(penguin.y >= 550 - (penguin.force - 20)){
            alert("You lost");
        }
    }

    //Checking collision with enemy 3
    if(penguin.x >= enemy.enemy3.x - 40 && penguin.x <= enemy.enemy3.x + 40){
        if(penguin.y >= 550 - (penguin.force - 20)){
            alert("You lost");
        }
    }
}


function score_checker() {
    if(penguin.x >= enemy.enemy1.x - 40 && penguin.x <= enemy.enemy1.x + 40){
        if(penguin.y <= 550 - (penguin.force - 20)){
            if(enemy.enemy1.done === 0) {
                penguin.score++;
                score_field.innerHTML = penguin.score;
                enemy.enemy1.done = 1;
            }
            enemy.enemy3.done = 0;
            enemy.enemy2.done = 0;
        }
    }

    if(penguin.x >= enemy.enemy2.x - 40 && penguin.x <= enemy.enemy2.x + 40){
        if(penguin.y <= 550 - (penguin.force - 20)){
            if(enemy.enemy2.done === 0) {
                penguin.score++;
                score_field.innerHTML = penguin.score;
                enemy.enemy2.done = 1;
            }
            enemy.enemy1.done = 0;
            enemy.enemy3.done = 0;
        }
    }

    if(penguin.x >= enemy.enemy3.x - 40 && penguin.x <= enemy.enemy3.x + 40){
        if(penguin.y <= 550 - (penguin.force - 20)){
            if(enemy.enemy3.done === 0) {
                penguin.score++;
                score_field.innerHTML = penguin.score;
                enemy.enemy3.done = 1;
            }
            enemy.enemy2.done = 0;
            enemy.enemy1.done = 0;
        }
    }
}
