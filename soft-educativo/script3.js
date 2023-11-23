const sujeito = document.querySelector('.sujeito')
const player = document.querySelector('.player')
const perguntas = [
  {
    pergunta: 'Há predicado verbo-nominal em:',
    alternativas: ["Ela descansava em casa.", "Todos cumpriram o juramento", "Ele vinha preocupado.", "Ele está abatido"],
    respostaCorreta: "Ele vinha preocupado."
  },
  {
    pergunta: 'A única oração com sujeito simples é:',
    alternativas: ["Existem algumas dúvidas.", "Compraram-se livros e revistas.", "Precisa-se de ajuda", "Faz muito frio."],
    respostaCorreta: "Existem algumas dúvidas."
  },
  {
    pergunta: 'O verbo ser, na oração: <br><br> “Eram cinco horas da manhã...”, é:',
    alternativas: ["pessoal e concorda com o sujeito indeterminado.", "impessoal e concorda com o objeto direto.", "impessoal e concorda com o sujeito indeterminado.", "Impessoal e concorda com a expressão numérica."],
    respostaCorreta: "Impessoal e concorda com a expressão numérica."
  },
  {
    pergunta: 'Assinale a única alternativa que possui um aposto enumerativo:',
    alternativas: ["Iracema, virgem dos lábios de mel, é a visão do índio pelo Romantismo.", "Pop, sertanejo e rock, esses estilos são muito tocados na rádio da cidade.", "Goiânia, capital de Goiás, é uma cidade linda.", "Três coisas são fundamentais para o sucesso: organização, disciplina e compromisso."],
    respostaCorreta: "Três coisas são fundamentais para o sucesso: organização, disciplina e compromisso."
  },
  {
    pergunta: 'A única alternativa que possui um adjunto adnominal destacado é:',
    alternativas: ["'O primeiro' beijo é inesquecível.", "Viajarei para o Havaí, 'paraíso dos deuses.'", "' Nunca' ouvi essa música.","Quebrei o vidro 'com uma pedra"],
    respostaCorreta: "'O primeiro' beijo é inesquecível."
  },
  {
    pergunta: 'Assinale a alternativa em que o trecho destacado traz uso de um adjunto adverbial de tempo:',
    alternativas: ["A 'proposta do Instituto Lado a Lado pela Vida,' que coordena a ação (…)", "'Nas redes sociais,' a campanha vai tratar da saúde integral do homem (…)", "'Com apoio do Senado Federal,' o evento vai reunir profissionais de saúde (…)", "'Durante todo o mês de novembro', serão realizadas atividades de orientação sobre o câncer de próstata (…)"],
    respostaCorreta: "'Durante todo o mês de novembro', serão realizadas atividades de orientação sobre o câncer de próstata (…)"
  },
  {
    pergunta: 'Qual alternativa possui uma oração sem sujeito?',
    alternativas: ["Tínhamos as mesmas aspirações.", "João está calado.", "Viajei a fim de reencontrá-lo.", "Está bastante frio em São Paulo."],
    respostaCorreta: "Está bastante frio em São Paulo."
  },
  {
    pergunta: 'Qual é a única frase que possui um verbo de ligação?',
    alternativas: ["Pedro trabalhava muito todos os dias.", "Aquele carro é caro.", "Ela quis viajar logo.", "João e Marcos torcem para o mesmo time.", "A professora insistiu no silêncio.	"],
    respostaCorreta: "Aquele carro é caro."
  },
  {
    pergunta: '"Nunca me faltou ajuda nas dificuldades”. Qual é o sujeito e o tipo de sujeito dessa oração?',
    alternativas: ["Nunca / Sujeito simples.", "Dificuldades / Sujeito simples.", "Ajuda nas dificuldades / Sujeito composto.", "Ajuda / Sujeito simples."],
    respostaCorreta: "Ajuda / Sujeito simples."
  },
  {
    pergunta: 'Na oração “Trabalhar no Tribunal de Justiça é um grande desejo meu”:',
    alternativas: ["O sujeito é “trabalhar”.", "O sujeito é oculto: eu.", "É uma oração sem sujeito.", "O sujeito é indeterminado."],
    respostaCorreta: "O sujeito é “trabalhar”."
  },
];
let indexPerguntaAtual = 0;
const temporizador = 30; 
let tempo = temporizador;
let vida1 = 100;
let vida2 = 100;
let numeroPergunta = 1;
let respostasCorretas = 0;
let quizFinalizado = false;


function exibirPergunta() {
  const perguntaAtual = perguntas[indexPerguntaAtual];
  document.getElementById('pergunta-titulo').textContent = "Questão " + numeroPergunta;
  document.getElementById('pergunta-texto').innerHTML = perguntaAtual.pergunta;

  const listaAlternativas = document.getElementById('alternativas-lista');
  listaAlternativas.innerHTML = "";

  perguntaAtual.alternativas.forEach((alternativa, index) => {
    const button = document.createElement('button');
    button.className = 'alternativa';
    button.textContent = alternativa;
    button.onclick = (function(alternativaClicada) {
      return function() {
        verificarResposta(alternativaClicada);
      };
    })(alternativa);

    listaAlternativas.appendChild(button);
  });
}

function atualizarContador() {
  tempo--;
  if (tempo >= 0) {
    const segundos = tempo % 60;
    const minutos = Math.floor(tempo / 60);
    document.getElementById('conta-regressiva').textContent = minutos.toString().padStart(2, '0') + ':' + segundos.toString().padStart(2, '0');
  } else {
    clearInterval(timer);
    if (!quizFinalizado) {
      desabilitarBotoesAlternativas();
      mostrarMensagemPerdeu();
    }
  }
}

const timer = setInterval(atualizarContador, 1000);
atualizarContador();

function desabilitarBotoesAlternativas() {
  const botoesAlternativas = document.querySelectorAll('.alternativa');
  botoesAlternativas.forEach(botao => {
    botao.disabled = true;
  });
}



function verificarResposta(resposta) {
  const perguntaAtual = perguntas[indexPerguntaAtual];
  if (resposta === perguntaAtual.respostaCorreta) {
    vida2 -= 10;
    sujeito.src = 'imagem/sujeito-ataque .gif';
    player.src = 'imagem/ocultodano.gif';

  } else if (resposta !== 'tempo_esgotado' && !quizFinalizado){
    vida1 -= 10;
    player.src = 'imagem/oculto-ataque.gif';
    sujeito.src = 'imagem/SUJEITODANO.gif';
  }

  if (tempo < 0) {
    // Tempo expirado, não permitir resposta
    return;
  }

  indexPerguntaAtual++;
  numeroPergunta++;

  if (indexPerguntaAtual < perguntas.length) {
    exibirPergunta();
    resetarTempo();
  } else {
    clearInterval(timer);
    quizFinalizado = true;
    exibirMensagemFinal();
  }

  atualizarVida();
  atualizarRespostasCorretas();
  if (indexPerguntaAtual === perguntas.length) {
    exibirMensagemFinal();
  }
}

function resetarTempo() {
  tempo = temporizador;
}

function atualizarRespostasCorretas() {
    
}

function atualizarVida() {
  vida1 = Math.max(0, Math.min(vida1, 100));
  vida2 = Math.max(0, Math.min(vida2, 100));

  document.getElementById('barraVida1').value = vida1;
  document.getElementById('barraVida2').value = vida2;
}

function exibirMensagemFinal() {
  let mensagem = "";

  if (vida1 > vida2) {
    mensagem = "Você ganhou!";
    
  } else if (vida1 < vida2) {
    mensagem = "Você perdeu!";
  } else {
    mensagem = "Deu empate!";
  }

  document.getElementById('contingencia').textContent = mensagem;
}

function mostrarMensagemPerdeu() {
  document.getElementById('mensagem-perdeu').style.display = 'block';
}

exibirPergunta();
