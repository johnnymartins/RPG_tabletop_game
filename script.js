const obj = require('./players.json');


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
    let resultado = 0;
    do {
        i += 1;
        const min = 1;
        valor = (Math.floor(Math.random() * (faces - min + 1)) + min)
        console.log("dado", i,"=", valor);
        resultado += valor
        
    } while (i < qtd);
    if (valor == faces && faces == 20) {
        console.log(`${qtd}D${faces} = ${resultado}\nCRÍTICO!`);
    } else {
        console.log(`${qtd}D${faces} = ${resultado}\n`);
    }
    return resultado;
}

//rolarDado(1, 8)

function exibirPersonagem() {
    
    obj.players.forEach(player => {
        console.log(`Nome: ${player.nome}`);
        
    })
    return //falta completar esse return pra ele enviar o resultado pra fora, senão vai enviar undefined
}

//exibirPersonagem()


function testarAcerto(atacante, defensor) { //TODO: tornar genérica – remover referência fixa a obj.players[0] e [1] quando tiver seletor de personagens.
    let resultadoDado = rolarDado(1,20);

    // atacante = obj.players[0]
    // defensor = obj.players[1]

    let bonusAtaque = atacante.bonus_ataque;
    let defesa = defensor.defesa;

    let ataqueTotal = bonusAtaque + resultadoDado;

    console.log("---VAMOS TESTAR SE O ATAQUE ACERTA---");

    console.log(`Ataque: bônus(${bonusAtaque}) + dado(${resultadoDado}) = ${ataqueTotal}\nDefesa: ${defesa}`)

    if (ataqueTotal >= defesa) {
        console.log(`${atacante.nome} acertou, role o dano.`);
        calcularDano(player1);
    } else {
        console.log(`${atacante.nome} errou.`)
    }
}


function calcularDano(atacante) {
    let resultadoDado = rolarDado(1,atacante.dado_dano);
    
    let bonusDano = atacante.bonus_dano;
    
    let danoTotal = bonusDano + resultadoDado

    console.log("------VAMOS VER QUAL FOI O DANO------");
    
    console.log(`Dano: bônus(${bonusDano}) + dado(${resultadoDado}) = ${danoTotal}`)
    
    aplicarDano(player2, danoTotal);

    return danoTotal;

}


function aplicarDano(defensor, dano) {
    let hp = defensor.hp;

    let calculaHp = hp - dano
    defensor[hp] = calculaHp;

    console.log(`${defensor.nome} perdeu ${dano} HP e ficou com ${calculaHp}.`)
}

let player1 = obj.players[0];
let player2 = obj.players[1];

testarAcerto(player1, player2);
