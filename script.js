const obj = require('./players.json');
const prompt = require('prompt-sync')();


// function rolarDado (qtd) { //forma anterior de rolar o dado
//     let i = 0;
//     let valor;
//     let resultado = 0;
//     do {
//         i += 1;
//         const min = 1;
//         const max = 20;
//         valor = (Math.floor(Math.random() * (max - min + 1)) + min)
//         console.log("dado", i,"=", valor);
//         resultado += valor
        
//     } while (i < qtd);
//     console.log("resultado = ",resultado);
// }

//rolarDado(2)

function rolarDado (qtd, faces) {
    let i = 0;
    let valor;
    let resultadoDado = 0;
    do {
        i += 1;
        const min = 1;
        valor = (Math.floor(Math.random() * (faces - min + 1)) + min)
        console.log("dado", i,"=", valor);
        resultadoDado += valor
        
    } while (i < qtd);
    if (valor == faces && faces == 20) {
        console.log(`${qtd}D${faces} = ${resultadoDado}\nCRÍTICO!`);
    } else {
        console.log(`${qtd}D${faces} = ${resultadoDado}\n`);
    }
    return resultadoDado;
}

function exibirPersonagem() {
    
    let i = 0;
    
    console.log("ESCOLHA O PERSONAGEM");
    
    obj.players.forEach(player => { //Exibe a lista de personagens disponíveis
        
        console.log(`${i} - Nome: ${player.nome}`);
        i += 1
        
    })

    let player = prompt("Digite o número do personagem: ");
    
    if(player == 0) {
        console.log(`Escolheu: ${obj.players[0].nome}\n`);
        return player

    } else if(player == 1) {
        console.log(`Escolheu: ${obj.players[1].nome}\n`)
        return player
        
    } else {
        console.log(`Escolheu: ${obj.players[2].nome}\n`)
        return player

    }

    //return //falta completar esse return pra ele enviar o resultado pra fora, senão vai enviar undefined
}


function testarAcerto(atacante, defensor, resultadoDado) { //TODO: tornar genérica – remover referência fixa a obj.players[0] e [1] quando tiver seletor de personagens.
    // let resultadoDado = rolarDado(1,20);

    let bonusAtaque = atacante.bonus_ataque;
    let defesa = defensor.defesa;

    let ataqueTotal = bonusAtaque + resultadoDado;

    console.log("---VAMOS TESTAR SE O ATAQUE ACERTA---");

    console.log(`Ataque: bônus(${bonusAtaque}) + dado(${resultadoDado}) = ${ataqueTotal}\nDefesa: ${defesa}`)

    if (ataqueTotal >= defesa) {
        console.log(`${atacante.nome} acertou, role o dano.`);
        // const acerto = true;
        return true;
    } else {
        console.log(`${atacante.nome} errou.`);
        // const acerto = false;
        return false;
    }
}


function calcularDano(atacante, resultadoDado) {
    // let resultadoDado = rolarDado(1,atacante.dado_dano);
    
    let bonusDano = atacante.bonus_dano;
    
    let danoTotal = bonusDano + resultadoDado

    console.log("------VAMOS VER QUAL FOI O DANO------");
    
    console.log(`Dano: bônus(${bonusDano}) + dado(${resultadoDado}) = ${danoTotal}`)
    
    // aplicarDano(player2, danoTotal);

    return danoTotal;

}

function aplicarDano(defensor, dano) {
    
    let hp = defensor.hp;

    let calculaHp = hp - dano;
    defensor.hp -= dano;
    
    console.log(`${defensor.nome} perdeu ${dano} HP e ficou com ${defensor.hp}.`)

    // console.log(`${defensor.nome} morreu.`)
}

// let player1 = obj.players[0];
// let player2 = obj.players[1];

// console.log(player1, player2)

// testarAcerto(player1, player2);

// exibirPersonagem()

function main() {

    let players = [];

    let indice1 = exibirPersonagem();
    let player1 = obj.players[indice1];
    players.push(player1);

    let indice2 = exibirPersonagem();
    var player2 = obj.players[indice2];
    players.push(player2);

    // console.log(players)
    // console.log(indice1, indice2)

    while(player1.hp > 0 && player2 > 0) {
        
        let turno = 0;
        let resultadoDado = rolarDado(1,20);
        
        if(turno == 0) {
            let acerto = testarAcerto(player1, player2, resultadoDado);
        
            if(acerto) {
                let resultadoDado = rolarDado(1,player1.dado_dano);
                
                let dano = calcularDano(player1, resultadoDado);
            
                aplicarDano(player2, dano);
                turno = 1;
        }} else {
            let acerto = testarAcerto(player2, player1, resultadoDado);
        
            if(acerto) {
                let resultadoDado = rolarDado(1,player2.dado_dano);
                
                let dano = calcularDano(player2, resultadoDado);
            
                aplicarDano(player1, dano);
                turno = 0;

            }
        }
    }
}

main()