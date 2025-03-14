listadeNumerosSorteados = [];
let numeroLimite = 50 ;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag,texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'o jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 50');
}

    exibirMensagemInicial();
function verificarChute() {
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto ) {
        exibirTextoNaTela('h1', 'Acertou!' );
        let palavratentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o Número secreto com ${tentativas} ${palavratentativa}!`;
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if (chute > numeroSecreto ) {
            exibirTextoNaTela('p', 'O Número secreto e menor');
        } else{
            exibirTextoNaTela('p', 'O Número secreto e maior');
        }
        tentativas++;
        limparcampo();
    }
}

function gerarNumeroAleatorio() {
    let numerEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listadeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite ) {
        listadeNumerosSorteados = [];
    }

    if  (listadeNumerosSorteados.includes(numerEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listadeNumerosSorteados.push(numerEscolhido);
        console.log(listadeNumerosSorteados)
        return numerEscolhido;
    }
}

function limparcampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarjogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparcampo() ;
    tentativas= 1 ;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}