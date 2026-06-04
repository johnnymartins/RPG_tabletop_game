const obj = require('./players.json');



// function rolarDado (qtd) {
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
    if (valor == faces) {
        console.log(`${qtd}D${faces} = ${resultado}`);
        console.log("CRÍTICO!")
    } else {
        console.log(`${qtd}D${faces} = ${resultado}`);
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



// const readline = require("readline").createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// readline.question(`Escolha seu personagem: `, playerEscolhido => {
//     console.log(playerEscolhido);
// })

// let playerEscolhido = prompt("Escolha seu personagem: ", exibirPersonagem())


function testarAcerto(atacante, defensor) { //TODO: tornar genérica – remover referência fixa a obj.players[0] e [1] quando tiver seletor de personagens.
    let resultadoDado = rolarDado(1,20);

    // atacante = obj.players[0]
    // defensor = obj.players[1]

    let bonusAtaque = atacante.bonus_ataque;
    let defesa = defensor.defesa;

    let ataqueTotal = bonusAtaque + resultadoDado;

    console.log(`Ataque: bônus(${bonusAtaque}) + dado(${resultadoDado}) = ${ataqueTotal}\nDefesa: ${defesa}`)

    if (ataqueTotal >= defesa) {
        console.log("Acertou, role o dano.");
    } else {
        console.log("Ataque falhou.")
    }
}

let player1 = obj.players[0].nome;
let player2 = obj.players[1].nome;




testarAcerto(player1, player2);
