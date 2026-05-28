//const players = require('./players.json');

function rolarDado (qtd) {
    let i = 0;
    let valor;
    let resultado = 0;
    do {
        i += 1;
        const min = 1;
        const max = 20;
        valor = (Math.floor(Math.random() * (max - min + 1)) + min)
        console.log("dado", i,"=", valor);
        resultado += valor
        
    } while (i < qtd);
    console.log("resultado = ",resultado);
}

rolarDado(2)
