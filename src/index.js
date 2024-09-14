const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

// função para rolagem de dados
async function rollDice() {
    return Math.floor(Math.random() *6) + 1;
};

// função para montagem do bloco da pista
async function getRandomBlock(){
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random <0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
    }

    return result
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} com valor ${diceResult} + ${attribute} de poder do personagem, resultando em  ${diceResult + attribute} pontos totais`);
}

async function playRaceEngine(character1, character2){
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`);

        // sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        // rolar dados
        let diceResult1 = await rollDice ();
        let diceResult2 = await rollDice ();

        // teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;
        
        if(block === "RETA"){
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE)
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE)

        };
        if(block === "CURVA"){
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE)
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE)
        };
        if(block === "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`🥊 ${character1.NOME} confrontou com ${character2.NOME} 🥊`);
            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

            //forma de if ternário
            // se resultado 1 for maior que o de 2 e o 2 for maior que zero, então subtraio 1, senão 0
            // character2.PONTOS -= powerResult1 > powerResult2 && character2.PONTOS > 0 ? 1 : 0;
            
            //outra forma reduzida de declarar o if - verificação se os personagens estão com pontos positivos

            if(powerResult1 > powerResult2 && character2.PONTOS > 0){
                console.log(
                    `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto!`
                );
                character2.PONTOS--
            };

            //if comum com a mesma lógica acima
            if(powerResult2 > powerResult1){
                if(character1.PONTOS >0){
                    console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto!`
                    );
                    character1.PONTOS-- 
                };
            };

            //if ternário dentro do console log onde será verificada a condição e, se verdadeira, a mensagem será exibida, senão, deixa em branco
            console.log(powerResult2 == powerResult1 ? "Confronto empatado! Nenhum ponto foi perdido" : "");
        };

        // verifica o vencedor
        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        }else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        };
        console.log("_____________________________________")
    };
};
 // declaração do vencedor
async function declareWinner(character1, character2) {
    console.log("Resultado final:")
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2   .PONTOS} ponto(s)`);

    // Usando if encadeado, não precisa das chaves
    if (character1.PONTOS > character2.PONTOS) 
        console.log(`\n${character1.NOME} venceu a corrida! Ahazou 💅`)
    else if (character2.PONTOS > character1.PONTOS)
        console.log(`\n${character2.NOME} venceu a corrida! Ahazou 💅`)
    else console.log(`Houve um empate, todas ganha! 💁‍♀️`);
}  

// função principal
(async function main() {
    console.log( `🏁 Corrida entre ${player1.NOME} e ${player2.NOME} começando ..\n`);

    // acontece o jogo
    await playRaceEngine(player1, player2);

    // faz a finalização e traz o resultado
    await declareWinner(player1, player2);

})();
