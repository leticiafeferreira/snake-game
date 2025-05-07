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
    clearInterval(setIntervalId);
    alert("Game Over! 😫 Aperto Ok para iniciar novamente... ");
    location.reload();
}