const dino = document.querySelector('.dino');
const cactu = document.querySelector('.cactus');
const nuvem = document.querySelector('.nuvens');
const restartBtn = document.querySelector('.restart-btn');

const pulo = () => {
    dino.classList.add('pulo');
    setTimeout(() => {
        dino.classList.remove('pulo');
    }, 500);
};

let filaDeCactos = []; // array onde vai armazenar os cactow novos

function criarCacto() { 
    const cacto = document.createElement('img');
    cacto.src = './img/cactus_1.png';
    cacto.classList.add('cactus');
    cacto.style.right = '-60px';
    cacto.style.bottom = '0';
    cacto.style.position = 'absolute';
    cacto.style.animation = 'cactusAnimation 1.5s linear forwards';

    document.querySelector('.gameBoard').appendChild(cacto);
    filaDeCactos.push(cacto); //vai inserir o cacto no final da fila 

    const checkCactoPosition = setInterval(() => {
        const cactoLeft = cacto.getBoundingClientRect().left;
        const gameBoardWidth = document.querySelector('.gameBoard').offsetWidth;

        // Se o cacto estiver totalmente fora da tela (left > largura do gameBoard)
        if (cactoLeft >= gameBoardWidth) {
            cacto.remove();
            filaDeCactos.shift();
            clearInterval(checkCactoPosition); // Para o verificador
        }
    }, 10); // Verifica a cada 10ms
}

const intervaloGeradorCactos = setInterval(() => {
    if (filaDeCactos.length < 3) criarCacto(); // para nao colocar mais de 3 cactos na fila por vez
}, Math.random() * 2000 + 2000);

const loop = setInterval(() => {
    const cactuPosition = cactu.offsetLeft;
    const nuvemPosition = nuvem.offsetLeft;
    const dinoPosition = +window.getComputedStyle(dino).bottom.replace('px', '');

    if (cactuPosition <= 120 && cactuPosition > 0 && dinoPosition < 80) {
        cactu.style.animation = 'none';
        cactu.style.left = `${cactuPosition}px`;

        filaDeCactos.forEach(cacto => {
            const currentPosition = cacto.offsetLeft;
            cacto.style.animation = 'none';
            cacto.style.left = `${currentPosition}px`;
        });

        dino.style.animation = 'none';
        dino.style.bottom = `${dinoPosition}px`;

        nuvem.style.animation = 'none';
        nuvem.style.left = `${nuvemPosition}px`;

        dino.src = './img/i morreu.png';

        clearInterval(loop);
        clearInterval(intervaloGeradorCactos);

        restartBtn.style.display = 'block';
    }
}, 10);

document.addEventListener('keydown', (event) => {
    if (event.key === 'w' || event.key === 'W' || event.key === ' ' || event.key === 'ArrowUp') {
        pulo();
    }
});

function reiniciarJogo() {
    location.reload();
}

restartBtn.addEventListener('click', reiniciarJogo);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        reiniciarJogo();
    }
});