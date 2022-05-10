let order = [];

let clickedOrder = [];

let score = 0;

// 0 - green
// 1 - red
// 2 - yellow
// 3 - blue

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

let removeAllLightColor = ()=>{
    const colorGroup = [blue,red,green,yellow];
    colorGroup.forEach(element=>{
        element.classList.forEach(classItem=>{
            if(classItem === 'selected'){
                element.classList.remove('selected');
            }
        })
    })
}

let shuffleOrder = () =>{
    let colorOrder = Math.floor(Math.random()*4);
    order[order.length] = colorOrder;
    clickedOrder = [];
    for(let i in order){
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor,Number(i)+1);
    }
}

let lightColor = (element,timer)=>{
    timer = timer * 500;
    setTimeout(()=>{
        element.classList.add('selected');
    },timer - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    });
}

let checkOrder = ()=>{
    for(let i in clickedOrder){
        if(clickedOrder[i]!= order[i]){
            gameOver();

            break;
        }
    }
    if(clickedOrder.length == order.length){
        alert(`Pontuação ${score}\n você acertou! Iniciando próximo nivel`)
        nextLevel();
    }
}

let click = (color) =>{
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    setTimeout(()=>{
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);
}

let createColorElement = (color)=>{
    if(color === 0){
        return green;
    }else if(color === 1){
        return red;
    }else if(color === 2){
        return yellow;
    }else if(color === 3){
        return blue;
    }
}

let nextLevel = ()=>{
    removeAllLightColor();
    score++;
    shuffleOrder();
}

let gameOver = ()=>{
    alert(`Pontuação: ${score} \n Você perdeu o jogo`);
    order = [];
    clickOrder = [];
    playGame();
}

let playGame = ()=>{
    alert(`Bem vindo ao Genesis! Iniciando novo jogo!`)
    score = 0;

    nextLevel();
}
green.onclick = () => click(0);
red.onclick = () => click(1);
blue.onclick = () => click(2);
yellow.onclick = () => click(3);

playGame();