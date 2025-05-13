//Play Board é a tela
const paybord = document.querySelector(".play-board");
//Placar atual
const scoreElement = document.querySelector(".score");
//Recorde
const highScoreElement = document.querySelector(".high-score");
//Controle de movimento
const controls = document.querySelectorAll (".controls i");



//cadastro de variaveis
let gameOver = false;
//Variavel p armazenar as coordenadas X e Y da Comida 
let foodX, foodY;
//Armazena as coordenadas X e Y da cabeça da cobra (posição)
let snakeX = 5, snakeY = 5;
/*variavel p armazenar a velocidade nas direções 
X e Y inicialmente em 0, pq a cobra está parada */
let velocityX = 0,velocityY = 0;
//
let snakeBody =[];
/*variavel p armazenar o id do intervalo que será usado
 para atualizar o jogo em um determinado ritmo */
let setIntervlId;
//uma variavel p manter o controle da pontuação atual do player
let score = 0






//Obtenha pontuação alta do armazenamento local
let higtScore = localStorage.getItem("high-score") || 0;
/* Se o localStorage retornar null (caso ele não exista), 
a variavel highScore será = 0*/

// Posição aleatoria entre 1 e 30 para a comida
/* Gera Coordenadas aleatórias para a nova posição da comida */
const updateFoodPosition = () => {
    // Math.random() = retorna um numero de ponto flutuante pseudoaleatório entre 0 e 1
    // * 30: Multiplica o número aleatório por 30 para obter um valor entre 0 e quase 30
    //  Math.floor(): Arredonda o resultado para o número inteiro mais proximo (entre 0 e 29)
    // + 1: Adiciona 1 para garantir que as coordenadas da comida estejam entre 1 e 30.
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

//Função para lidar com o Fim do Jogo
/* Função handleGameOver =  quando a cobra colide consigo mesma
ou com as paredes do tabuleiro */

const handleGameOver = () => {
    clearInterval(setIntervlId);
    alert("Game Over! 😫 Aperto Ok para iniciar novamente... ");
    location.reload();
}

const changeDirection = e => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

//Começar o game 
const initGame = () => {
    if (gameOver) return handleGameOver ();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    //Quando a cobra se alimentaa
    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]);
        score++;
        higtScore = score >= higtScore ? score : higtScore

        localStorage.setItem("high-score" , higtScore);
        scoreElement.innerHTML = `Score: ${score}`;
        highScoreElement.innerHTML = `High Score: ${higtScore}`;

    }
    snakeX += velocityX;
    snakeY += velocityY;

    for (let i = snakeBody.length - 1; i > 0; i --) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }


    //add div para cada parte do corpo da cobra 
    for (let i = 0; i <snakeBody.length; i++) {
        html += `<div class="head" style="grid-area: ${snakeBody [i][1]} / ${snakeBody [i][0]}"></div>`;

        //verificar se a cabeça da cobra atingiu ou colidiu com o corpo 
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true
        }
        paybord.innerHTML = html;

    }

}

updateFoodPosition();
setIntervlId = setInterval (initGame, 100);
document.addEventListener("keyup", changeDirection);