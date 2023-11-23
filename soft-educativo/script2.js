const sujeito = document.querySelector('.sujeito')
const player = document.querySelector('.player')
const perguntas = [
  {
    pergunta: 'Aponte a correta análise do termo destacado:<br><br>" “Ao fundo, as pedrinhas claras pareciam “tesouros abandonados”.',
    alternativas: ["predicativo do sujeito", "adjunto adnominal", " objeto direto", "complemento nominal"],
    respostaCorreta: "predicativo do sujeito"
  },
  {
    pergunta: '"Não faças a outrem o que não queres que te façam." <br><br> Na oração “não faças a outrem o", a expressão outrem é:',
    alternativas: ["objeto direto preposicionado", "objeto indireto", "adjunto adverbial de modo", "predicativo do sujeito"],
    respostaCorreta: "objeto indireto"
  },
  {
    pergunta: 'Em “Motoristas, mantenham à direita!”, há um erro de acentuação gráfica, pois o termo “direita” é:',
    alternativas: ["adjunto adnominal", "objeto direto", "objeto indireto", "aposto do sujeito"],
    respostaCorreta: "objeto direto"
  },
  {
    pergunta: 'A oração que apresenta complemento nominal é:',
    alternativas: ["Os pobres necessitam de ajuda.", "Sejamos úteis à sociedade.", "Os homens aspiram à paz.", "Os pedidos foram feitos por nós."],
    respostaCorreta: "Sejamos úteis à sociedade."
  },
  {
    pergunta: 'Assinale a alternativa correta quanto à função sintática do termo destacado: A aldeia era povoada “de indígenas”:',
    alternativas: ["agente da passiva", "complemento nominal", "adjunto adverbial", "objeto indireto"],
    respostaCorreta: "agente da passiva"
  },
  {
    pergunta: 'Assinale a alternativa em que o trecho grifado traz uso de um adjunto adverbial de tempo:',
    alternativas: ["“A proposta do Instituto Lado a Lado pela Vida, que coordena a ação (…)”", "“Nas redes sociais, a campanha vai tratar da saúde integral do homem (…)”", "“Com apoio do Senado Federal, o evento vai reunir profissionais de saúde (…)”", "“Durante todo o mês de novembro, serão realizadas atividades de orientação sobre o câncer de próstata (…)"],
    respostaCorreta: "“Durante todo o mês de novembro, serão realizadas atividades de orientação sobre o câncer de próstata (…)"
  },
  {
    pergunta: '"O artesanato, "uma das mais ricas expressões culturais de um povo", no Mato Grosso do Sul, evidencia crenças, hábitos, tradições e demais referências culturais do Estado."<br>No contexto, o trecho destacado veicula a ideia de:',
    alternativas: ["explicação.", "proporção.", "concessão.", "finalidade."],
    respostaCorreta: "explicação."
  },
  {
    
    pergunta: 'O agente da passiva foi corretamente destacado em todas as opções, execeto em:',
    alternativas: ["O presídio tinha sido cercado 'pelos soldados'", "ela é autorizada 'pela oganizadora festa'", "O time foi derrotado 'para desespero da torcida'", "O mestre foi homenageado 'pelos alunos'"],
    respostaCorreta: "O time foi derrotado 'para desespero da torcida'"
  },
  {
    pergunta: 'Dentre as opções abaixo assinale aquela em que há objeto direto preposicionado:',
    alternativas: ["Passou aos filhos a herança recebida dos pais;", "Naquela tempo era muito fácil viajar para o Exterior.", "Amou a seu pai, com a mais plena grandeza da alma;", "Em dias ensolarados, gosto de ver nuvens flutuarem nos céus de agosto."],
    respostaCorreta: "Amou a seu pai, com a mais plena grandeza da alma;"
  },
  {
    pergunta: 'Assinale a análise do termo destacado: <br> <br>"A terra era povoada "de selvagens""',
    alternativas: ["Objeto direto", "Objeto indireto", "complemento nominal", "agente da passiva"],
    respostaCorreta: "agente da passiva"
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
    player.src = 'imagem/luffydano.gif';

  } else if (resposta !== 'tempo_esgotado' && !quizFinalizado){
    vida1 -= 10;
    player.src = 'imagem/luffy ataque.gif';
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


