  const sujeito = document.querySelector('.sujeito')
  const player = document.querySelector('.player')
  const perguntas = [
    {
      pergunta: 'Assinale a alternativa abaixo que não desempenha a função de adjunto adverbial:',
      alternativas: ["Talvez Juan tivesse razão.", "Gosto muito de chocolate.", "Chegamos à cidade ao fim da noite.", "José, avô de Daniel, comprou um carro."],
      respostaCorreta: "José, avô de Daniel, comprou um carro."
    },
    {
      pergunta: 'Qual das frases abaixo não apresenta um aposto?',
      alternativas: ["A geografia, estudo da terra, é uma disciplina fundamental do currículo escolar.", "Joana apresentou seu trabalho na escola que recebeu nota máxima.", "Diana e Richard foram os vencedores, aquela na corrida, e este no atletismo.", "Na bolsa levava o que precisava: roupas, comida e remédios."],
      respostaCorreta: "Joana apresentou seu trabalho na escola que recebeu nota máxima."
    },
    {
      pergunta: 'Qual é a classe gramatical da palavra destacada na frase: "Ela estava muito cansada"?',
      alternativas: ["Adjetivo", "Advérbio", "Verbo", "Substantivo", "Pronome"],
      respostaCorreta: "Advérbio"
    },
    {
      pergunta: 'Identifique a função sintática da palavra destacada: "Pedro comprou um carro vermelho."',
      alternativas: ["Sujeito", "Predicado", "Objeto direto", "Adjunto adverbial", "Complemento verbal"],
      respostaCorreta: "Objeto direto"
    },
    {
      pergunta: 'Em "O menino correu tão rápido quanto um raio", a expressão "tão rápido quanto um raio" exerce que função sintática?',
      alternativas: ["Predicado", "Sujeito", "Objeto direto", "Adjunto adverbial de intensidade", "Adjunto adverbial de comparação"],
      respostaCorreta: "Adjunto adverbial de comparação"
    },
    {
      pergunta: 'Identifique a oração coordenada sindética adversativa na seguinte frase:<br><br>"Estudei bastante, mas não consegui entender a matéria."',
      alternativas: ["Estudei bastante", "Mas não consegui", "Não consegui entender", "A matéria", "Estudei bastante, mas"],
      respostaCorreta: "Mas não consegui"
    },
    {
      pergunta: 'Qual é o objeto direto na frase: "Eu vi o filme ontem."',
      alternativas: ["Eu", "Vi", "Filme", "Ontem", "O filme"],
      respostaCorreta: "O filme"
    },
    {
      pergunta: 'Na frase "A casa estava suja, pois ninguém a limpava há semanas", qual é a conjunção que introduz a oração subordinada causal?',
      alternativas: ["Porque", "Quando", "Pois", "Embora", "Enquanto"],
      respostaCorreta: "Pois"
    },
    {
      pergunta: 'Identifique a função sintática da expressão "com um sorriso no rosto" na seguinte frase:<br><br>"Ele falou com um sorriso no rosto."',
      alternativas: ["Objeto direto", "Adjunto adnonimal", "Sujeito", "Adjunto adverbial de modo", "Predicado"],
      respostaCorreta: "Adjunto adverbial de modo"
    },
    {
      pergunta: 'Identifique a função sintática do termo destacado na frase: "Ouvi um barulho estranho na sala."',
      alternativas: ["Sujeito", "Objeto direto", "Adjunto adnominal", "Predicado"],
      respostaCorreta: "Adjunto adverbial"
    },
  ];
  let indexPerguntaAtual = 0;
  const temporizador = 60; 
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
  }}

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
      player.src = 'imagem/zorodano.gif';

    } else if (resposta !== 'tempo_esgotado' && !quizFinalizado){
      vida1 -= 10;
      sujeito.src = 'imagem/SUJEITODANO.gif';
      player.src = 'imagem/zoroATAQUE.gif';
      
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
  if(vida1 > vida2){
    document.getElementById('mensagemdeavanço').style.display = 'block';

  }

  function mostrarMensagemPerdeu() {
    document.getElementById('mensagem-perdeu').style.display = 'block';
  }

  
  exibirPergunta();