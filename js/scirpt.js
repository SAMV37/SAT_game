const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const score_field = document.getElementById('score');

const enemy_one = new Image();
enemy_one.src = 'images/enemy_1.png';

const enemy_two = new Image();
enemy_two.src = 'images/enemy_2.png';

const enemy_three = new Image();
enemy_three.src = 'images/enemy_3.png';

const enemy_four = new Image();
enemy_four.src = 'images/enemy_4.png';

const background = new Image();
background.src = 'images/background.jpg';

var jumping = false;

const penguin = {
    x: 100,
    y: 570,
    height: 100,
    width: 50,
    //penguins jumping force
    force: 20,
    score: 0
};

const background_loop = {
    one: {
        x: 0
    },
    two: {
        x: canvas.width
    },
    three: {
        x: -canvas.height
    }
};

score_field.innerHTML = penguin.score;

const enemy = {
    enemy1: {
        x: canvas.width,
        y: 597,
        height: 75,
        width: 150,
        done: 0
    },
    enemy2: {
        x: canvas.width + 500,
        y: 554,
        height: 125,
        width: 95,
        done: 0
    },
    enemy3: {
        x: canvas.width + 1000,
        y: 535,
        height: 150,
        width: 75,
        done: 0
    },
    enemy4: {
        x: canvas.width + 1500,
        y: 590,
        height: 100,
        width: 100,
        done: 0
    }
};

function drawer() {
    context.clearRect(0,0,canvas.width, canvas.height);

    //drawing background
    context.drawImage(background, background_loop.one.x, 0, canvas.width, canvas.height);
    context.drawImage(background, background_loop.two.x, 0, canvas.width, canvas.height);

    //drawing hero
    context.fillRect(penguin.x, penguin.y, penguin.width, penguin.height);

    //drawing enemies
    context.drawImage(enemy_one, enemy.enemy1.x, enemy.enemy1.y, enemy.enemy1.width, enemy.enemy1.height);
    context.drawImage(enemy_two, enemy.enemy2.x, enemy.enemy2.y, enemy.enemy2.width, enemy.enemy2.height);
    context.drawImage(enemy_three, enemy.enemy3.x, enemy.enemy3.y, enemy.enemy3.width, enemy.enemy3.height);
    context.drawImage(enemy_four, enemy.enemy4.x, enemy.enemy4.y, enemy.enemy4.width, enemy.enemy4.height);

}

    function updater() {
        enemy.enemy1.x -= 5;
        enemy.enemy2.x -= 5;
        enemy.enemy3.x -= 5;
        enemy.enemy4.x -= 5;

        background_loop.one.x -= 5;

        if(background_loop.one.x <= -canvas.width){
            background_loop.one.x = canvas.width;
        }

        background_loop.two.x -= 5;

        if(background_loop.two.x <= -canvas.width){
            background_loop.two.x = canvas.width;
        }

        if (enemy.enemy1.x <= -750) {
            enemy.enemy1.x = canvas.width;
        }

        if (enemy.enemy2.x <= -750) {
            enemy.enemy2.x = canvas.width;
        }

        if (enemy.enemy3.x <= -750) {
            enemy.enemy3.x = canvas.width;
        }

        if (enemy.enemy4.x <= -750) {
            enemy.enemy4.x = canvas.width;
        }

    }

    function loop() {
        drawer();
        jump_engine();
        updater();
        collision_checker();
        score_checker();

        requestAnimationFrame(loop);
    }

    loop();

    document.addEventListener('keydown', function (event) {
        if (event.keyCode === 32) {
            if (penguin.y === 570) {
                jumping = true;
            }

        }
    }, false);

    function jump_engine() {
        if (jumping === true) {
            penguin.y -= penguin.force;
            //speed of falling
            penguin.force -= 0.7;
            if (penguin.y >= 570) {
                jumping = false;
                //resetting penguins jumping force
                penguin.force = 20;
                penguin.y = 570;
            }
        }
    }

    function collision_checker() {
        //Checking collision with enemy 1
        if (penguin.x >= enemy.enemy1.x - 40 && penguin.x <= enemy.enemy1.x + 140) {
            if (penguin.y >= 475 - (penguin.force - 25)) {
                alert("You lost");
            }
        }

        //Checking collision with enemy 2
        if (penguin.x >= enemy.enemy2.x - 40 && penguin.x <= enemy.enemy2.x + 85) {
            if (penguin.y >= 425 - (penguin.force - 20)) {
                alert("You lost");
            }
        }

        //Checking collision with enemy 3
        if (penguin.x >= enemy.enemy3.x - 40 && penguin.x <= enemy.enemy3.x + 65) {
            if (penguin.y >= 400 - (penguin.force - 20)) {
                alert("You lost");
            }
        }

        //Checking collision with enemy 4
        if (penguin.x >= enemy.enemy4.x - 40 && penguin.x <= enemy.enemy4.x + 90) {
            if (penguin.y >= 450 - (penguin.force - 20)) {
                alert("You lost");
            }
        }
    }


    function score_checker() {
        if (penguin.x >= enemy.enemy1.x - 40 && penguin.x <= enemy.enemy1.x + 140) {
            if (penguin.y <= 475 - (penguin.force - 20)) {
                if (enemy.enemy1.done === 0) {
                    penguin.score++;
                    score_field.innerHTML = penguin.score;
                    enemy.enemy1.done = 1;
                }
                enemy.enemy3.done = 0;
                enemy.enemy2.done = 0;
                enemy.enemy4.done = 0;
            }
        }

        if (penguin.x >= enemy.enemy2.x - 40 && penguin.x <= enemy.enemy2.x + 85) {
            if (penguin.y <= 425 - (penguin.force - 20)) {
                if (enemy.enemy2.done === 0) {
                    penguin.score++;
                    score_field.innerHTML = penguin.score;
                    enemy.enemy2.done = 1;
                }
                enemy.enemy1.done = 0;
                enemy.enemy3.done = 0;
                enemy.enemy4.done = 0;
            }
        }

        if (penguin.x >= enemy.enemy3.x - 40 && penguin.x <= enemy.enemy3.x + 65) {
            if (penguin.y <= 400 - (penguin.force - 20)) {
                if (enemy.enemy3.done === 0) {
                    penguin.score++;
                    score_field.innerHTML = penguin.score;
                    enemy.enemy3.done = 1;
                }
                enemy.enemy2.done = 0;
                enemy.enemy1.done = 0;
                enemy.enemy4.done = 0;
            }
        }

        if (penguin.x >= enemy.enemy4.x - 40 && penguin.x <= enemy.enemy4.x + 90) {
            if (penguin.y <= 450 - (penguin.force - 20)) {
                if (enemy.enemy4.done === 0) {
                    penguin.score++;
                    score_field.innerHTML = penguin.score;
                    enemy.enemy4.done = 1;
                }
                enemy.enemy2.done = 0;
                enemy.enemy3.done = 0;
                enemy.enemy1.done = 0;
            }
        }
    }
