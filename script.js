// ============================================================
// ARQUIVO COMENTADO PARA ESTUDO
// comentários explicando o que cada trecho faz.
// ============================================================

// ====================
// LOADING CINEMÁTICO
// ====================
// Este bloco controla a tela de abertura (splash/loading) do jogo:
// logos aparecendo, barra de progresso enchendo e a transição
// para a tela de seleção de personagem.

// Pega o elemento de áudio de fundo (a música do jogo) pelo id "bgMusic"
const music = document.getElementById("bgMusic");

// Pega a div/tela de loading (a primeira tela que aparece)
const loadingScreen = document.getElementById("loadingScreen");

// Pega a div/tela de seleção de personagem (aparece depois do loading)
const characterScreen = document.getElementById("characterScreen");

// Anima o logo do SENAC: fica visível (opacity 1) e desliza 80px para a esquerda
gsap.to("#senacLogo", {
  opacity: 1,
  x: -80,
  duration: 1.5,
});

// Anima o logo do Stranger Things: fica visível e desliza 80px para a direita
// (efeito de "abrir para os lados", como se os dois logos se afastassem do centro)
gsap.to("#strangerLogo", {
  opacity: 1,
  x: 80,
  duration: 1.5,
});

// Anima a barra de carregamento (elemento com classe .loadingFill) até 100% de largura,
// levando 7 segundos, com uma curva de desaceleração suave (ease "power2.out")
gsap.to(".loadingFill", {
  width: "100%",
  duration: 7,
  ease: "power2.out",
});

// Depois de 7 segundos (tempo do "carregamento" fake), inicia a transição de saída
setTimeout(() => {
  // Faz a tela de loading desaparecer suavemente (fade out) em 1 segundo
  gsap.to("#loadingScreen", {
    opacity: 0,

    duration: 1,

    // Quando a animação de fade terminar, executa este callback:
    onComplete: () => {
      // Esconde de vez a tela de loading (tira do fluxo da página)
      loadingScreen.style.display = "none";

      // Mostra a tela de seleção de personagem
      characterScreen.style.display = "block";

      // Chama a função que anima a entrada da tela de personagens
      startCharacterScreen();
    },
  });
}, 7000); // 7000ms = 7 segundos, tem que bater com a duration da barra acima

// ====================
// TELA PERSONAGENS
// ====================
// Função chamada assim que a tela de seleção de personagem é exibida.
// Ela cuida da música de fundo e das animações de entrada dos cards.

function startCharacterScreen() {
  // Define o volume da música de fundo para 40%
  music.volume = 0.4;

  // Começa a tocar a música de fundo
  music.play();

  // Anima todos os elementos com classe ".character-card"
  // (os cartões de cada personagem selecionável)
  gsap.fromTo(
    ".character-card",
    {
      // Estado inicial: invisível, um pouco menor e deslocado 50px para baixo
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    {
      // Estado final: totalmente visível, tamanho normal, na posição correta
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.08, // cada card começa a animação 0.08s depois do anterior (efeito cascata)
      ease: "back.out(1.7)", // efeito de "quicar" levemente ao final da animação
    },
  );

  // Anima o botão de seleção partindo de escala 0 (invisível) até o tamanho normal,
  // com 0.5s de atraso (aparece depois dos cards)
  gsap.from("#selectBtn", {
    scale: 0,

    duration: 1,

    delay: 0.5,
  });
}

// ====================
// BANCO DE DADOS DOS PERSONAGENS
// ====================
// Objeto central do jogo: cada chave (eleven, joyce, max...) representa um
// personagem e guarda todas as informações usadas nas outras partes do código
// (música, fundo, imagem do personagem, itens da loja, preços, etc).
// Isso evita ficar escrevendo "if (personagem === 'eleven') ..." espalhado
// pelo código: basta consultar personagens[chave] para pegar tudo daquele personagem.

const personagens = {
  eleven: {
    nome: "ELEVEN", // nome exibido na interface

    musica: "assets/som/Stranger-Things-Title.mp3", // trilha sonora deste personagem

    fundo: "assets/fundo/fundo_personagem/Eleven_fundo.png", // imagem de fundo da tela de jogo

    personagem: "assets/personagem/personagem_jogo/eleven.png", // sprite/imagem do personagem no jogo

    itemCentral: "assets/item/item_central/waffle.png", // objeto clicável central (o "cookie" do clicker)

    tituloLoja: "LOJA DA ELEVEN", // título mostrado no topo do painel da loja

    // Imagens dos 4 itens vendidos na loja deste personagem, na ordem em que aparecem
    loja: [
      "assets/item/item_loja/eleven/1.png",
      "assets/item/item_loja/eleven/2.png",
      "assets/item/item_loja/eleven/3.png",
      "assets/item/item_loja/eleven/4.png",
    ],

    // Nome, descrição e preço de cada um dos 4 itens acima (mesma ordem do array "loja")
    itensLoja: [
      { nome: "WAFFLE EXTRA", desc: "+1 por clique", preco: 10 },
      { nome: "PODER TELECINÉTICO", desc: "+8 por clique", preco: 50 },
      { nome: "GERADOR", desc: "+5 por segundo", preco: 100 },
      { nome: "FOCO MENTAL", desc: "+32 por clique", preco: 100 },
    ],
  },

  joyce: {
    nome: "JOYCE",

    musica: "assets/som/Stranger-Things-Title.mp3",

    fundo: "assets/fundo/fundo_personagem/Joyce_fundo.png",

    personagem: "assets/personagem/personagem_jogo/Joyce.png",

    itemCentral: "assets/item/item_central/machado.png",

    tituloLoja: "LOJA DA JOYCE",

    loja: [
      "assets/item/item_loja/joyce/1.png",
      "assets/item/item_loja/joyce/2.png",
      "assets/item/item_loja/joyce/3.png",
      "assets/item/item_loja/joyce/4.png",
    ],

    itensLoja: [
      { nome: "LUZES DE NATAL", desc: "+1 por clique", preco: 10 },
      { nome: "TELEFONE", desc: "+8 por clique", preco: 50 },
      { nome: "GERADOR", desc: "+5 por segundo", preco: 100 },
      { nome: "MACHADO", desc: "+32 por clique", preco: 100 },
    ],
  },

  max: {
    nome: "MAX",

    musica: "assets/som/Stranger-Things-Running-Up-That-Hill.mp3",

    fundo: "assets/fundo/fundo_personagem/Max_fundo2.png",

    personagem: "assets/personagem/personagem_jogo/Max.png",

    itemCentral: "assets/item/item_central/skate.png",

    tituloLoja: "LOJA DA MAX",

    loja: [
      "assets/item/item_loja/max/1.png",
      "assets/item/item_loja/max/2.png",
      "assets/item/item_loja/max/3.png",
      "assets/item/item_loja/max/4.png",
    ],

    itensLoja: [
      { nome: "SKATE", desc: "+1 por clique", preco: 10 },
      { nome: "FONE DE OUVIDO", desc: "+8 por clique", preco: 50 },
      { nome: "GERADOR", desc: "+5 por segundo", preco: 100 },
      { nome: "Running Up That Hill", desc: "+32 por clique", preco: 100 },
    ],
  },

  steve: {
    nome: "STEVE",

    musica: "assets/som/Stranger-Things-Title.mp3",

    fundo: "assets/fundo/fundo_personagem/Steve_fundo.png",

    personagem: "assets/personagem/personagem_jogo/Steve.png",

    itemCentral: "assets/item/item_central/tacos3.png",

    tituloLoja: "LOJA DO STEVE",

    loja: [
      "assets/item/item_loja/steve/1.png",
      "assets/item/item_loja/steve/2.png",
      "assets/item/item_loja/steve/3.png",
      "assets/item/item_loja/steve/4.png",
    ],

    itensLoja: [
      { nome: "TACO COM PREGOS", desc: "+1 por clique", preco: 10 },
      { nome: "OCULOS ESCUROS", desc: "+8 por clique", preco: 50 },
      { nome: "GERADOR", desc: "+5 por segundo", preco: 100 },
      { nome: "CARRO", desc: "+32 por clique", preco: 100 },
    ],
  },

  mike: {
    nome: "MIKE",

    musica: "assets/som/Stranger-Things-Title.mp3",

    fundo: "assets/fundo/fundo_personagem/Mike_fundo.png",

    personagem: "assets/personagem/personagem_jogo/Mike.png",

    itemCentral: "assets/item/item_central/walkie-talkie.png",

    tituloLoja: "LOJA DO MIKE",

    loja: [
      "assets/item/item_loja/mike/1.png",
      "assets/item/item_loja/mike/2.png",
      "assets/item/item_loja/mike/3.png",
      "assets/item/item_loja/mike/4.png",
    ],

    itensLoja: [
      { nome: "WALKIE-TALKIES", desc: "+1 por clique", preco: 10 },
      { nome: "BICICLETA", desc: "+8 por clique", preco: 50 },
      { nome: "GERADOR", desc: "+5 por segundo", preco: 100 },
      { nome: "MAPA DE HAWKINS", desc: "+32 por clique", preco: 100 },
    ],
  },

  hopper: {
    nome: "HOPPER",

    musica: "assets/som/Stranger-Things-Title.mp3",

    fundo: "assets/fundo/fundo_personagem/Hopper_fundo.jpg",

    personagem: "assets/personagem/personagem_jogo/jim.png",

    itemCentral: "assets/item/item_central/pistola.png",

    tituloLoja: "LOJA DO HOPPER",

    loja: [
      "assets/item/item_loja/hopper/1.png",
      "assets/item/item_loja/hopper/2.png",
      "assets/item/item_loja/hopper/3.png",
      "assets/item/item_loja/hopper/4.png",
    ],

    itensLoja: [
      { nome: "PISTOLA", desc: "+1 por clique", preco: 10 },
      { nome: "DISTINTIVO POLICIAL", desc: "+8 por clique", preco: 50 },
      { nome: "GERADOR", desc: "+5 por segundo", preco: 100 },
      { nome: "VIATURA POLICIAL", desc: "+32 por clique", preco: 100 },
    ],
  },

  lucas: {
    nome: "LUCAS",

    musica: "assets/som/Stranger-Things-Title.mp3",

    fundo: "assets/fundo/fundo_personagem/Lucas_fundo.png",

    personagem: "assets/personagem/personagem_jogo/Lucas.png",

    itemCentral: "assets/item/item_central/estilingue.png",

    tituloLoja: "LOJA DO LUCAS",

    loja: [
      "assets/item/item_loja/lucas/1.png",
      "assets/item/item_loja/lucas/2.png",
      "assets/item/item_loja/lucas/3.png",
      "assets/item/item_loja/lucas/4.png",
    ],

    itensLoja: [
      { nome: "ESTILINGUE", desc: "+1 por clique", preco: 10 },
      { nome: "BÚSSOLA", desc: "+8 por clique", preco: 50 },
      { nome: "GERADOR", desc: "+5 por segundo", preco: 100 },
      { nome: "FOGOS DE ARTIFICIO", desc: "+32 por clique", preco: 100 },
    ],
  },

  dustin: {
    nome: "DUSTIN",

    musica: "assets/som/Master-of-Puppets.mp3",

    fundo: "assets/fundo/fundo_personagem/Dustin_fundo3.jpg",

    personagem: "assets/personagem/personagem_jogo/Dustin.png",

    itemCentral: "assets/item/item_central/guitarra.png",

    tituloLoja: "LOJA DO DUSTIN",

    loja: [
      "assets/item/item_loja/dustin/1.png",
      "assets/item/item_loja/dustin/2.png",
      "assets/item/item_loja/dustin/3.png",
      "assets/item/item_loja/dustin/4.png",
    ],

    itensLoja: [
      { nome: "GUITARRA DO EDDIE", desc: "+1 por clique", preco: 10 },
      { nome: "BONÉ", desc: "+8 por clique", preco: 50 },
      { nome: "GERADOR", desc: "+5 por segundo", preco: 100 },
      { nome: "DART - DEMOGORGON", desc: "+32 por clique", preco: 100 },
    ],
  },

  kali: {
    nome: "KALI",

    musica: "assets/som/Stranger-Things-Title.mp3",

    fundo: "assets/fundo/fundo_personagem/Kali_fundo.png",

    personagem: "assets/personagem/personagem_jogo/Kali.png",

    itemCentral: "assets/item/item_central/borboleta.png",

    tituloLoja: "LOJA DA KALI",

    loja: [
      "assets/item/item_loja/kali/1.png",
      "assets/item/item_loja/kali/2.png",
      "assets/item/item_loja/kali/3.png",
      "assets/item/item_loja/kali/4.png",
    ],

    itensLoja: [
      { nome: "BORBOLETA", desc: "+1 por clique", preco: 10 },
      { nome: "CONTROLE MENTAL", desc: "+8 por clique", preco: 50 },
      { nome: "GERADOR", desc: "+5 por segundo", preco: 100 },
      { nome: "VISÕES PSÍQUICAS", desc: "+32 por clique", preco: 100 },
    ],
  },

  will: {
    nome: "WILL",

    musica: "assets/som/Will-The-Sorcerer.mp3",

    fundo: "assets/fundo/fundo_personagem/Will_fundo2.png",

    personagem: "assets/personagem/personagem_jogo/Will.png",

    itemCentral: "assets/item/item_central/mago.png",

    tituloLoja: "LOJA DO WILL",

    loja: [
      "assets/item/item_loja/will/42.png",
      "assets/item/item_loja/will/2.png",
      "assets/item/item_loja/will/3.png",
      "assets/item/item_loja/will/43.png",
    ],

    itensLoja: [
      { nome: "O FEITICEIRO", desc: "+1 por clique", preco: 10 },
      { nome: "DUNGEONS & DRAGONS", desc: "+8 por clique", preco: 50 },
      { nome: "GERADOR", desc: "+5 por segundo", preco: 100 },
      { nome: "CONTROLE MENTAL", desc: "+32 por clique", preco: 100 },
    ],
  },

  nancy: {
    nome: "NANCY",

    musica: "assets/som/Stranger-Things-Title.mp3",

    fundo: "assets/fundo/fundo_personagem/Nancy_fundo2.png",

    personagem: "assets/personagem/personagem_jogo/Nancy.png",

    itemCentral: "assets/item/item_central/espingarda.png",

    tituloLoja: "LOJA DA NANCY",

    loja: [
      "assets/item/item_loja/nancy/1.png",
      "assets/item/item_loja/nancy/2.png",
      "assets/item/item_loja/nancy/3.png",
      "assets/item/item_loja/nancy/4.png",
    ],

    itensLoja: [
      { nome: "ESPINGARDA", desc: "+1 por clique", preco: 10 },
      { nome: "COQUETEL MOLOTOVE", desc: "+8 por clique", preco: 50 },
      { nome: "GERADOR", desc: "+5 por segundo", preco: 100 },
      { nome: "CÂMERA FOTOGRÁFICA", desc: "+32 por clique", preco: 100 },
    ],
  },

  robin: {
    nome: "ROBIN",

    musica: "assets/som/Stranger-Things-Title.mp3",

    fundo: "assets/fundo/fundo_personagem/Robin_fundo.png",

    personagem: "assets/personagem/personagem_jogo/Robin.png",

    itemCentral: "assets/item/item_central/4.png",

    tituloLoja: "LOJA DA ROBIN",

    loja: [
      "assets/item/item_loja/robin/1.png",
      "assets/item/item_loja/robin/2.png",
      "assets/item/item_loja/robin/3.png",
      "assets/item/item_loja/robin/4.png",
    ],

    itensLoja: [
      { nome: "APRESENTADORA", desc: "+1 por clique", preco: 10 },
      { nome: "SORVETE SCOOP AHOY", desc: "+8 por clique", preco: 50 },
      { nome: "GERADOR", desc: "+5 por segundo", preco: 100 },
      { nome: "RÁDIO WSQK", desc: "+32 por clique", preco: 100 },
    ],
  },
}; // fim do objeto "personagens"

// ====================
// PERSONAGEM SELECIONADO
// ====================
// Este bloco cuida da tela onde o jogador escolhe o personagem:
// clique no card, pré-visualização do fundo e clique no botão "Escolher".

// Guarda qual personagem está selecionado no momento (chave do objeto "personagens")
let selectedCharacter = null;

// Pega todos os elementos com classe ".character-card" (os cards clicáveis de cada personagem)
const cards = document.querySelectorAll(".character-card");

// Pega o elemento que mostra o fundo em pré-visualização quando um card é clicado
const preview = document.getElementById("backgroundPreview");

// Fundos temporários
// Objeto separado só com os fundos, usado apenas para a pré-visualização
// na tela de seleção (antes de entrar no jogo). É redundante com o "fundo"
// que já existe dentro de "personagens", mas serve como fallback para
// personagens que ainda não têm ficha completa em "personagens".
const backgrounds = {
  eleven: "assets/fundo/fundo_personagem/Eleven_fundo.png",

  joyce: "assets/fundo/fundo_personagem/Joyce_fundo.png",

  steve: "assets/fundo/fundo_personagem/Steve_fundo.png",

  max: "assets/fundo/fundo_personagem/Max_fundo.png",

  hopper: "assets/fundo/fundo_personagem/Hopper_fundo.png",

  mike: "assets/fundo/fundo_personagem/Mike_fundo.png",

  lucas: "assets/fundo/fundo_personagem/Lucas_fundo.png",

  dustin: "assets/fundo/fundo_personagem/Dustin_fundo.png",

  kali: "assets/fundo/fundo_personagem/Kali_fundo.png",

  will: "assets/fundo/fundo_personagem/Will_fundo.png",

  nancy: "assets/fundo/fundo_personagem/Nancy_fundo.png",

  robin: "assets/fundo/fundo_personagem/Robin_fundo.png",
};

// Para cada card de personagem, registra um "escutador" de clique
cards.forEach((card) => {
  card.addEventListener("click", () => {
    // Remove a classe "selected" de todos os cards (desmarca todo mundo)
    cards.forEach((c) => {
      c.classList.remove("selected");
    });

    // Marca apenas o card que foi clicado agora
    card.classList.add("selected");

    // Guarda qual personagem foi escolhido, lendo o atributo data-char do card
    // (ex: <div class="character-card" data-char="eleven">)
    selectedCharacter = card.dataset.char;

    // MOSTRAR BOTÃO
    // Pega o botão "Escolher personagem"
    const selectBtn = document.getElementById("selectBtn");

    // Se o botão ainda não estiver visível, mostra ele com uma animação de entrada
    if (selectBtn.style.display !== "block") {
      selectBtn.style.display = "block";

      // Anima o botão: começa "achatado" (scale 0) e invisível, termina no tamanho normal
      gsap.fromTo(
        "#selectBtn",
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
        },
      );
    }

    // Torna visível a área de pré-visualização do fundo
    preview.style.opacity = "1";

    // Define a imagem de fundo da pré-visualização de acordo com o personagem selecionado
    preview.style.backgroundImage = `url('${personagens[selectedCharacter].fundo}')`;

    // Pequena animação de "zoom out" no fundo da pré-visualização ao trocar de personagem
    gsap.fromTo(
      "#backgroundPreview",
      {
        scale: 1.08,
      },
      {
        scale: 1,
        duration: 1,
      },
    );
  });
});

// ====================
// BOTÃO ESCOLHER
// ====================
// Este bloco roda quando o jogador confirma a escolha do personagem
// clicando no botão "Escolher". É aqui que a tela de jogo é montada
// com tudo relacionado ao personagem escolhido.

document.getElementById("selectBtn").addEventListener("click", () => {
  // Se nenhum personagem foi selecionado ainda, avisa e cancela
  if (!selectedCharacter) {
    alert("Escolha um personagem!");
    return;
  }

  // Salva no localStorage do navegador qual personagem foi escolhido
  // (fica salvo mesmo se a página for recarregada)
  localStorage.setItem("personagemSelecionado", selectedCharacter);

  // Busca a ficha completa do personagem escolhido dentro do objeto "personagens"
  const dados = personagens[selectedCharacter];

  // Se o personagem escolhido ainda não tiver ficha em "personagens", avisa e cancela
  if (!dados) {
    alert("Personagem ainda não implementado.");
    return;
  }

  // Anima a saída (fade out) da tela de seleção de personagem
  gsap.to("#characterScreen", {
    opacity: 0,
    duration: 1,

    // Quando o fade out terminar, monta a tela de jogo:
    onComplete() {
      // Esconde a tela de seleção de personagem
      document.getElementById("characterScreen").style.display = "none";

      // Mostra a tela de jogo
      document.getElementById("gameScreen").style.display = "block";

      // NOVO: aplica o fundo do personagem escolhido
      // Usa o campo "fundo" da ficha do personagem (dados.fundo) como
      // imagem de fundo da tela de jogo — é isso que faz cada
      // personagem ter seu próprio cenário.
      document.getElementById("gameScreen").style.backgroundImage =
        `url('${dados.fundo}')`;

      // Define a imagem do personagem exibida na tela de jogo
      document.getElementById("characterImage").src = dados.personagem;

      // Define a imagem do objeto clicável central (o "cookie" do clicker)
      document.getElementById("clickObject").src = dados.itemCentral;

      // Define o título exibido no topo do painel da loja
      document.querySelector("#shopPanel h2").textContent = dados.tituloLoja;

      // Pega todos os elementos de imagem dos itens da loja (ícones)
      const imagens = document.querySelectorAll(".shopIcon");
      // Pega todos os elementos que mostram o nome de cada item da loja
      const nomes = document.querySelectorAll(".shopNome");
      // Pega todos os elementos que mostram a descrição de cada item da loja
      const descs = document.querySelectorAll(".shopDesc");
      // Pega todos os elementos que mostram o preço de cada item da loja
      const precos = document.querySelectorAll(".shopPreco");

      // Para cada ícone de item da loja, define a imagem correspondente
      // usando o array "loja" da ficha do personagem (mesma ordem/índice)
      imagens.forEach((img, indice) => {
        img.src = dados.loja[indice];
      });

      // Para cada item de "itensLoja" (nome, descrição, preço),
      // preenche o texto correspondente na tela — assim a loja
      // deixa de mostrar sempre os textos fixos da Eleven e passa
      // a mostrar os textos do personagem escolhido.
      dados.itensLoja.forEach((item, indice) => {
        nomes[indice].textContent = item.nome;
        descs[indice].textContent = item.desc;
        precos[indice].textContent = item.preco;
      });

      // TROCAR MÚSICA
      // Pega de novo o elemento de áudio (variável local, sombreando a "music" global)
      const music = document.getElementById("bgMusic");

      // Troca a fonte do áudio para a música do personagem escolhido
      music.src = dados.musica;
      music.load(); // recarrega o elemento de áudio com a nova fonte
      music.play(); // começa a tocar

      // Controle de mudo e volume base usados mais abaixo (som ligado/desligado)
      let muted = false;
      let baseVolume = 0.4;

      // Faz um fade out do volume da música atual antes de trocar
      gsap.to(music, {
        volume: 0,
        duration: 1,

        // Quando o volume chegar a 0:
        onComplete() {
          music.pause(); // pausa a música antiga

          music.src = dados.musica; // garante a música do personagem

          music.load(); // recarrega

          // Toca a música; se o navegador bloquear autoplay, apenas loga no console
          music.play().catch(() => {
            console.log("Autoplay bloqueado");
          });

          music.volume = 0; // começa mudo

          // Faz um fade in até o volume base (0.4)
          gsap.to(music, {
            volume: baseVolume,
            duration: 2,
          });
        },
      });

      // ====================
      // VARIÁVEIS DE ESTADO DO JOGO (economia/progresso)
      // ====================

      const energiaNecessaria = 500; // quantidade de energia necessária para vencer
      let energia = 0; // energia atual do jogador
      let totalCliques = 0; // contador de cliques totais
      let energiaTotalColetada = 0; // soma histórica de toda energia já ganha
      let energiaGasta = 0; // soma de tudo que já foi gasto na loja

      const inicioJogo = Date.now(); // marca o instante (timestamp) em que o jogo começou

      const energyText = document.getElementById("energyText"); // elemento que mostra a energia atual na tela

      const clickObject = document.getElementById("clickObject"); // objeto central clicável

      // Sempre que o objeto central for clicado:
      clickObject.addEventListener("click", (e) => {
        energia += energiaPorClique; // soma a energia ganha por clique
        totalCliques++; // incrementa contador de cliques
        energiaTotalColetada += energiaPorClique; // soma ao total histórico

        energyText.textContent = energia + " ENERGIA"; // atualiza o texto na tela

        atualizarBarra(); // atualiza a barra de progresso (e verifica vitória)

        criarMaisUm(e); // cria o efeito visual "+1" flutuando no clique
        criarParticulas(e); // cria partículas visuais no ponto do clique
        atualizarStats(); // atualiza o painel de estatísticas

        // Pequena animação de "squeeze" no objeto clicado (efeito de clique)
        gsap.fromTo(
          "#clickObject",
          {
            scale: 1,
          },
          {
            scale: 0.9,
            duration: 0.08,
            yoyo: true, // volta ao estado inicial depois
            repeat: 1, // repete uma vez (ida e volta)
          },
        );
      });

      // Painel de estatísticas (abrir/fechar)
      const statsPanel = document.getElementById("statsPanel");

      // Ao clicar no botão de estatísticas, mostra o painel com animação
      document.getElementById("statsBtn").addEventListener("click", () => {
        statsPanel.classList.remove("hidden"); // remove a classe que esconde o painel

        // Anima a entrada do painel (escala + opacidade) com efeito de "estouro" leve
        gsap.fromTo(
          "#statsPanel",
          {
            scale: 0.8,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
        );

        atualizarStats(); // garante que os números exibidos estejam atualizados
      });

      // Ao clicar no botão de fechar estatísticas, anima a saída e depois esconde
      document.getElementById("closeStats").addEventListener("click", () => {
        gsap.to("#statsPanel", {
          scale: 0.8,
          opacity: 0,
          duration: 0.2,

          onComplete() {
            statsPanel.classList.add("hidden"); // some de vez com o painel
          },
        });
      });

      // A cada 300ms, cria um "esporo" (partícula de fundo decorativa flutuando)
      setInterval(criarEsporo, 300);

      // Cria uma partícula decorativa (esporo) subindo pela tela, estilo "Upside Down"
      function criarEsporo() {
        const container = document.getElementById("particlesBackground"); // container das partículas de fundo

        const p = document.createElement("div"); // cria um novo elemento div

        p.className = "spore"; // aplica a classe de estilo do esporo

        // Posição inicial: X aleatório na largura da tela, Y no fundo da tela
        p.style.left = Math.random() * window.innerWidth + "px";
        p.style.top = window.innerHeight + "px";

        const tamanho = 3 + Math.random() * 6; // tamanho aleatório entre 3 e 9px

        p.style.width = tamanho + "px";
        p.style.height = tamanho + "px";

        container.appendChild(p); // adiciona a partícula na tela

        // Anima a partícula subindo até sair da tela por cima, com leve deslocamento lateral
        gsap.to(p, {
          y: -(window.innerHeight + 100), // sobe até sumir da tela

          x: "+=30", // desloca 30px para a direita ao longo do percurso

          duration: 10 + Math.random() * 8, // duração aleatória entre 10 e 18 segundos

          ease: "none", // movimento com velocidade constante (sem aceleração)

          opacity: 0, // vai sumindo enquanto sobe

          onComplete() {
            p.remove(); // remove a partícula do DOM ao terminar (evita acumular elementos)
          },
        });
      }

      // ====================
      // INVENTÁRIO / ITENS COMPRADOS
      // ====================

      let waffles = 0; // quantidade comprada do item 1
      let poderes = 0; // quantidade comprada do item 2
      let baterias = 0; // quantidade comprada do item 3 (gerador)
      let focoMental = 0; // quantidade comprada do item 4

      let energiaPorClique = 1; // quanto de energia cada clique gera (aumenta com upgrades)
      atualizarInventario(); // desenha o inventário assim que o jogo começa

      // Atualiza o HTML do painel de inventário com os valores atuais
      function atualizarInventario() {
        document.getElementById("inventoryList").innerHTML = `
       <div class="itemInventario">
        <img src="assets/item/item_central/waffle.png" alt="Waffle">
        <span>Waffles: <strong>${waffles}x</strong> (+${waffles})</span>
       </div>

     <div class="itemInventario">
      <img src="assets/icone/seus-itens/energia-atual.png" alt="Poderes">
      <span>Poderes: <strong>${poderes}x</strong> (+${poderes})</span>
     </div>

     <div class="itemInventario">
      <img src="assets/icone/seus-itens/baterias.png" alt="Baterias">
      <span>Baterias: <strong>${baterias}x</strong></span>
     </div>

     <div class="itemInventario">
      <img src="assets/icone/seus-itens/foco-mental.png" alt="Foco Mental">
      <span>Foco Mental: <strong>${focoMental}x</strong></span>
     </div>

      <hr>

     <div id="energiaClique">
      <img src="assets/icone/seus-itens/energia-atual.png" alt="Energia por Clique">
      <span>Energia por clique</span>

      <strong>${energiaPorClique}</strong>
     </div>
       `;
      }

      // Atualiza os números exibidos no painel de estatísticas
      function atualizarStats() {
        // Calcula a porcentagem de progresso rumo à vitória (limitado a 100%)
        const porcentagem = Math.min((energia / energiaNecessaria) * 100, 100);

        document.getElementById("statEnergy").textContent = energia;

        document.getElementById("statClicks").textContent = totalCliques;

        document.getElementById("statProgress").textContent =
          porcentagem.toFixed(1) + "%"; // arredonda para 1 casa decimal

        document.getElementById("statTotalEnergy").textContent =
          energiaTotalColetada;

        document.getElementById("statPlayTime").textContent =
          obterTempoJogado();

        document.getElementById("statSpentEnergy").textContent = energiaGasta;
      }

      // Calcula e formata o tempo de jogo decorrido no formato MM:SS
      function obterTempoJogado() {
        const segundos = Math.floor((Date.now() - inicioJogo) / 1000); // segundos totais desde o início

        const minutos = Math.floor(segundos / 60); // parte inteira em minutos
        const restoSegundos = segundos % 60; // segundos restantes (0-59)

        return (
          String(minutos).padStart(2, "0") + // garante 2 dígitos (ex: "05")
          ":" +
          String(restoSegundos).padStart(2, "0")
        );
      }

      // Abrir e fechar loja
      const shopPanel = document.getElementById("shopPanel");

      // Ao clicar no botão da loja, remove a classe que esconde o painel
      document.getElementById("shopBtn").addEventListener("click", () => {
        shopPanel.classList.remove("hidden");
      });

      // Ao clicar em fechar loja, adiciona de volta a classe que esconde o painel
      document.getElementById("closeShop").addEventListener("click", () => {
        shopPanel.classList.add("hidden");
      });
      // Fim Abrir e fechar loja

      // Comprar Waffle
      // Função de compra do item 1 (upgrade de energia por clique)
      function comprarWaffle() {
        const custo = 10; // preço fixo deste item

        // Só compra se tiver energia suficiente
        if (energia >= custo) {
          energia -= custo; // desconta o custo da energia atual

          energiaGasta += custo; // soma ao total gasto (estatística)

          waffles++; // incrementa a quantidade comprada

          energiaPorClique += 1; // aumenta o ganho de energia por clique
          energyText.textContent = energia + " ENERGIA"; // atualiza texto na tela

          atualizarBarra();
          atualizarInventario();
          atualizarStats();
        }
      }

      // Expõe a função no escopo global (window) para que o atributo
      // onclick="comprarWaffle()" no HTML consiga encontrá-la
      window.comprarWaffle = comprarWaffle;
      // Fim Comprar Waffle

      // Comprar Poder
      // Função de compra do item 2 (upgrade maior de energia por clique)
      function comprarPoder() {
        const custo = 50;

        if (energia >= custo) {
          energia -= custo;

          energiaGasta += custo;

          poderes++;

          energiaPorClique += 8;

          atualizarInventario();
          atualizarStats();
          atualizarBarra();

          energyText.textContent = energia + " ENERGIA";
        }
      }
      window.comprarPoder = comprarPoder;
      // Fim Comprar Poder

      // Foco Mental
      // Função de compra do item 4 (upgrade ainda maior de energia por clique)
      function comprarFocoMental() {
        const custo = 100;

        if (energia >= custo) {
          energia -= custo;

          energiaGasta += custo;

          focoMental++;

          energiaPorClique += 32;

          atualizarInventario();
          atualizarStats();
          atualizarBarra();

          energyText.textContent = energia + " ENERGIA";
        }
      }

      window.comprarFocoMental = comprarFocoMental;
      // Fim Foco Mental

      // Comprar Gerador
      // Função de compra do item 3 (bateria = gera energia automaticamente com o tempo)
      function comprarBateria() {
        const custo = 100;

        if (energia >= custo) {
          energia -= custo;

          energiaGasta += custo; 

          baterias++; // cada bateria comprada gera energia passiva (ver o setInterval abaixo)

          atualizarInventario();
          atualizarStats();
          atualizarBarra();

          energyText.textContent = energia + " ENERGIA";
        }
      }
      window.comprarBateria = comprarBateria;
      // Fim Comprar Gerador

      // Energia Automática
      // A cada 1 segundo, gera energia passiva com base na quantidade de baterias,
      // atualiza a interface e verifica se o tempo limite (derrota) foi atingido
      setInterval(() => {
        energia += baterias * 5; // cada bateria dá +5 de energia por segundo
        energyText.textContent = energia + " ENERGIA";

        atualizarBarra();
        atualizarStats();
        atualizarTimer();

        // ==========================
        // TESTE DE DERROTA
        // ==========================

        const segundos = Math.floor((Date.now() - inicioJogo) / 1000);

        // Se o tempo limite foi atingido e o jogo ainda não acabou, mostra a tela de derrota
        if (segundos >= tempoLimite && !jogoFinalizado) {
          jogoFinalizado = true;

          mostrarTelaDerrota();
        }
      }, 1000);
      // Fim Energia Automática

      const tempoLimite = 200; // tempo limite em segundos para vencer (03:19 minutos)

      // Atualiza o cronômetro visual (tempo restante) e muda a aparência conforme o tempo aperta
      function atualizarTimer() {
        const segundosPassados = Math.floor((Date.now() - inicioJogo) / 1000);

        // Tempo restante, nunca menor que 0
        const restante = Math.max(tempoLimite - segundosPassados, 0);

        const minutos = Math.floor(restante / 60);

        const segundos = restante % 60;
        const timer = document.getElementById("timerText"); // texto do cronômetro
        const painel = document.getElementById("timerPanel"); // painel/moldura do cronômetro

        // Atualiza o texto no formato MM:SS
        document.getElementById("timerText").textContent =
          String(minutos).padStart(2, "0") +
          ":" +
          String(segundos).padStart(2, "0");

        // Mais de 60s restantes: estado normal (branco)
        if (restante > 60) {
          timer.style.color = "white";
          painel.style.borderColor = "#b30000";

          document.querySelector("#timerPanel span").textContent = "⏳ TEMPO RESTANTE";

          // Remove quaisquer animações de "aviso" que estivessem rodando no painel/texto
          gsap.killTweensOf("#timerPanel");
          gsap.killTweensOf("#timerText");

          painel.style.transform = "translateX(-50%)";
          timer.style.opacity = 1;

          // Entre 31s e 60s restantes: estado de atenção (amarelo)
        } else if (restante > 30) {
          timer.style.color = "#ffd54a";
          painel.style.borderColor = "#ffd54a";

          // Entre 11s e 30s restantes: estado de alerta (vermelho claro + pulsando)
        } else if (restante > 10) {
          timer.style.color = "#ff4444";
          painel.style.borderColor = "#ff4444";

          document.querySelector("#timerPanel span").textContent = "⚠ TEMPO RESTANTE";

          // Só inicia a animação de pulso se ainda não estiver pulsando
          // (evita empilhar várias animações iguais rodando ao mesmo tempo)
          if (!painel.classList.contains("pulse")) {
            painel.classList.add("pulse");

            gsap.to("#timerPanel", {
              scale: 1.04,
              duration: 0.6,
              repeat: -1, // repete infinitamente
              yoyo: true, // vai e volta (efeito pulsante)
            });
          }

          // 10s ou menos: estado crítico (vermelho forte + tremendo)
        } else {
          timer.style.color = "#ff0000";

          painel.style.borderColor = "#ff0000";

          document.querySelector("#timerPanel span").textContent = "⚠ TEMPO ESGOTANDO";

          // Só inicia a animação de tremor se ainda não estiver tremendo
          if (!painel.classList.contains("shake")) {
            painel.classList.add("shake");

            // Faz o painel tremer horizontalmente (+4px, ida e volta, sem parar)
            gsap.to("#timerPanel", {
              x: "+=4",
              duration: 0.05,
              repeat: -1,
              yoyo: true,
            });

            // Faz o texto piscar (variação de opacidade)
            gsap.to("#timerText", {
              opacity: 0.4,
              duration: 0.4,
              repeat: -1,
              yoyo: true,
            });
          }
        }
      }

      // Cria o efeito visual "+1" que sobe e desaparece no local do clique
      function criarMaisUm(e) {
        const plus = document.createElement("div");
        plus.innerText = "+1";

        const container = document.getElementById("clickEffects");
        const rect = container.getBoundingClientRect(); // posição/tamanho do container na tela

        plus.style.position = "absolute";
        // Calcula a posição relativa ao container, usando a posição do clique (e.clientX/Y)
        plus.style.left = e.clientX - rect.left + "px";
        plus.style.top = e.clientY - rect.top + "px";

        // Escolhe uma cor aleatória dentre as 4 opções
        const cores = ["#00ff88", "#00e5ff", "#ffcc00", "#ff4dff"];

        const cor = cores[Math.floor(Math.random() * cores.length)];
        const tamanho = 50 + Math.random() * 35; // tamanho aleatório da fonte (comentário original diz 20–35px, mas a fórmula gera 50–85px)
        const brilho = 10 + Math.random() * 20; // intensidade aleatória do brilho (glow)

        plus.style.color = cor;
        plus.style.fontSize = tamanho + "px";
        plus.style.textShadow = `0 0 ${brilho * 2}px ${cor}`; // aplica o efeito de brilho/glow
        plus.style.fontWeight = "900";
        plus.style.letterSpacing = "1px";
        plus.style.filter = "brightness(1.2)";
        plus.style.transform = "scale(1)";

        container.appendChild(plus); // adiciona o elemento "+1" na tela

        // Anima o "+1" subindo e desaparecendo
        gsap.to(plus, {
          y: -80,
          opacity: 0,
          duration: 1,
          onComplete() {
            plus.remove(); // remove do DOM ao terminar, evitando acumular elementos
          },
        });
      }

      // som
      // Ícone que representa som ligado/desligado
      const soundIcon = document.getElementById("soundIcon");

      // Ao clicar no botão de som, alterna entre mudo e com som
      soundBtn.addEventListener("click", () => {
        muted = !muted; // inverte o estado atual

        if (muted) {
          music.volume = 0;
          soundIcon.src = "assets/icone/som_desligado.png"; // imagem de som desligado
        } else {
          music.volume = baseVolume;
          soundIcon.src = "assets/icone/som_ligado.png"; // imagem de som ligado
        }
      });

      let jogoFinalizado = false; // trava para impedir que vitória/derrota disparem mais de uma vez

      // Atualiza a barra de progresso de energia e verifica se o jogador venceu
      function atualizarBarra() {
        let porcentagem = (energia / energiaNecessaria) * 100;

        if (porcentagem > 100) {
          porcentagem = 100; // nunca deixa passar de 100%
        }

        document.getElementById("progressFill").style.width = porcentagem + "%";

        // Se atingiu a energia necessária e o jogo ainda não tinha acabado, é vitória
        if (energia >= energiaNecessaria && !jogoFinalizado) {
          jogoFinalizado = true;
          mostrarTelaVitoria();
        }
      }

      // Monta e anima a tela de vitória, com estatísticas finais do jogador
      function mostrarTelaVitoria() {
        // ==========================
        // PERSONAGEM
        // ==========================

        // Lista de personagens "femininos", usada para escolher a arte de fundo certa da tela de vitória
        const femininos = ["eleven", "max", "joyce", "nancy", "robin", "kali"];

        // Escolhe a imagem do portal/fundo final de acordo com o gênero do personagem escolhido
        const imagemPortal = femininos.includes(selectedCharacter)
          ? "assets/fundo/fundo_final/fundo_final_ganhou_menina.png"
          : "assets/fundo/fundo_final/fundo_final_ganhou_menino.png";

        // ==========================
        // ELEMENTOS
        // ==========================

        const tela = document.getElementById("victoryScreen"); // tela de vitória inteira
        const img = document.getElementById("victoryImage"); // imagem de fundo da vitória

        const titulo = document.getElementById("victoryTitle"); // título "Você venceu"
        const subtitulo = document.getElementById("victorySubtitle"); // subtítulo

        const card = document.getElementById("victoryStats"); // card com as estatísticas finais

        const itens = document.querySelectorAll(".victoryItem"); // cada linha de estatística dentro do card

        const botao = document.getElementById("restartBtn"); // botão de reiniciar

        // ==========================
        // PREPARAÇÃO
        // ==========================

        img.src = imagemPortal; // define a imagem de fundo escolhida acima

        img.style.opacity = 0; // começa invisível para depois animar entrando

        titulo.style.opacity = 0;
        subtitulo.style.opacity = 0;

        card.style.display = "none"; // escondido até a hora certa de animar
        card.style.opacity = 0;

        botao.style.opacity = 0;

        // Zera a opacidade de cada item de estatística individualmente
        itens.forEach((item) => (item.style.opacity = 0));

        // Estatísticas
        // Preenche os números finais mostrados na tela de vitória

        document.getElementById("victoryTime").textContent = obterTempoJogado();

        // toLocaleString("pt-BR") formata o número com separador de milhar no padrão brasileiro
        document.getElementById("victoryClicks").textContent =
          totalCliques.toLocaleString("pt-BR");

        document.getElementById("victoryEnergy").textContent =
          energia.toLocaleString("pt-BR");

        document.getElementById("victorySpent").textContent =
          energiaGasta.toLocaleString("pt-BR");

        // ==========================
        // FADE DO GAME
        // ==========================

        // Some com a tela de jogo (fade out) antes de mostrar a tela de vitória
        gsap.to("#gameScreen", {
          opacity: 0,

          duration: 1,

          onComplete() {
            document.getElementById("gameScreen").style.display = "none";

            tela.style.display = "flex"; // mostra a tela de vitória

            // Anima a entrada (fade in) da tela de vitória
            gsap.fromTo(
              tela,
              {
                opacity: 0,
              },
              {
                opacity: 1,
                duration: 1,
              },
            );
          },
        });

        // Música
        // Reduz gradualmente o volume da música até 0 (silêncio) ao vencer
        gsap.to(music, {
          volume: 0,
          duration: 2,
        });

        // ==========================
        // IMAGEM
        // ==========================
        // A partir daqui, uma sequência de animações "encadeadas no tempo" (delayedCall),
        // cada uma disparando em um instante específico, criando o efeito cinematográfico
        // de vitória: imagem aparece -> escurece -> título -> subtítulo -> card -> stats -> botão.

        // Depois de 1.2s, faz a imagem de fundo da vitória aparecer (fade in)
        gsap.delayedCall(1.2, () => {
          gsap.to(img, {
            opacity: 1,
            duration: 1,
          });
        });

        // ==========================
        // ESCURECER IMAGEM
        // ==========================

        // Depois de 5.2s, escurece a imagem (baixa a opacidade para dar destaque ao texto que vem a seguir)
        gsap.delayedCall(5.2, () => {
          gsap.to(img, {
            opacity: 0.35,
            duration: 1,
          });
        });

        // ==========================
        // TÍTULO
        // ==========================

        // Depois de 6.2s, mostra o título
        gsap.delayedCall(6.2, () => {
          gsap.to(titulo, {
            opacity: 1,
            duration: 1,
          });
        });

        // ==========================
        // SUBTÍTULO
        // ==========================

        // Depois de 7s, mostra o subtítulo
        gsap.delayedCall(7, () => {
          gsap.to(subtitulo, {
            opacity: 1,
            duration: 1,
          });
        });

        // ==========================
        // CARD
        // ==========================

        // Depois de 8.3s, mostra o card de estatísticas subindo suavemente
        gsap.delayedCall(8.3, () => {
          card.style.display = "block";

          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
            },
          );
        });

        // ==========================
        // ESTATÍSTICAS
        // ==========================

        // Depois de 9.2s, revela cada linha de estatística uma por vez (stagger)
        gsap.delayedCall(9.2, () => {
          gsap.to(itens, {
            opacity: 1,
            stagger: 0.4,
            duration: 0.5,
          });
        });

        // ==========================
        // BOTÃO
        // ==========================

        // Depois de 11s, mostra o botão de reiniciar
        gsap.delayedCall(11, () => {
          gsap.to(botao, {
            opacity: 1,
            duration: 0.8,
          });
        });
      }

      // Botão de reiniciar da tela de vitória
      const btn = document.getElementById("restartBtn");
      const victoryScreen = document.getElementById("victoryScreen");

      btn.disabled = true; // começa desabilitado até a animação de entrada terminar
      // btn.textContent = "INICIANDO NOVA MISSÃO..."; // linha desativada pelo autor original

      btn.addEventListener("click", reiniciarJogo);

      // No mesmo instante (11s) em que o botão aparece na tela de vitória, ele é reabilitado
      gsap.delayedCall(11, () => {
        gsap.to(btn, {
          opacity: 1,
          duration: 0.8,
        });

        btn.disabled = false;
      });

      // Anima a saída de todos os elementos de vitória/derrota e recarrega a página
      // (forma mais simples de "reiniciar" o jogo do zero)
      function reiniciarJogo() {
        gsap.to("#victoryStats", { opacity: 0, y: 30, duration: 0.6 });
        gsap.to("#victoryTitle", { opacity: 0, duration: 0.5 });
        gsap.to("#victorySubtitle", { opacity: 0, duration: 0.5 });
        gsap.to("#victoryImage", { opacity: 0, duration: 1 });

        gsap.to("#victoryScreen, #defeatScreen", {
          opacity: 0,
          delay: 1,
          duration: 1,
          onComplete: () => location.reload(), // recarrega a página inteira
        });
      }

      // Monta e anima a tela de derrota (quando o tempo acaba antes de vencer).
      // É praticamente um espelho de mostrarTelaVitoria(), mas usando os
      // elementos "defeat*" em vez de "victory*", e sem escolher imagem por gênero.
      function mostrarTelaDerrota() {
        const tela = document.getElementById("defeatScreen");

        const img = document.getElementById("defeatImage");

        const titulo = document.getElementById("defeatTitle");

        const subtitulo = document.getElementById("defeatSubtitle");

        const card = document.getElementById("defeatStats");

        const itens = card.querySelectorAll(".victoryItem"); // reaproveita a mesma classe ".victoryItem" dentro do card de derrota

        const botao = document.getElementById("restartDefeatBtn");

        // ==========================
        // PREPARAÇÃO
        // ==========================

        img.style.opacity = 0;

        titulo.style.opacity = 0;

        subtitulo.style.opacity = 0;

        card.style.display = "none";
        card.style.opacity = 0;

        botao.style.opacity = 0;

        itens.forEach((item) => (item.style.opacity = 0));

        // Preenche as estatísticas finais na tela de derrota (mesmos dados da vitória)
        document.getElementById("defeatTime").textContent = obterTempoJogado();

        document.getElementById("defeatClicks").textContent =
          totalCliques.toLocaleString("pt-BR");

        document.getElementById("defeatEnergy").textContent =
          energia.toLocaleString("pt-BR");

        document.getElementById("defeatSpent").textContent =
          energiaGasta.toLocaleString("pt-BR");

        // Mesmo esquema de fade da tela de jogo para a tela de derrota
        gsap.to("#gameScreen", {
          opacity: 0,

          duration: 1,

          onComplete() {
            document.getElementById("gameScreen").style.display = "none";

            tela.style.display = "flex";

            gsap.fromTo(
              tela,
              {
                opacity: 0,
              },
              {
                opacity: 1,
                duration: 1,
              },
            );
          },
        });

        // Reduz o volume da música ao perder
        gsap.to(music, {
          volume: 0,
          duration: 2,
        });

        // Mesma sequência cinematográfica de delayedCalls usada na vitória:
        // imagem -> escurece -> título -> subtítulo -> card -> stats -> botão
        gsap.delayedCall(1.2, () => {
          gsap.to(img, {
            opacity: 1,
            duration: 1,
          });
        });

        gsap.delayedCall(5.2, () => {
          gsap.to(img, {
            opacity: 0.35,
            duration: 1,
          });
        });

        gsap.delayedCall(6.2, () => {
          gsap.to(titulo, {
            opacity: 1,
            duration: 1,
          });
        });

        gsap.delayedCall(7, () => {
          gsap.to(subtitulo, {
            opacity: 1,
            duration: 1,
          });
        });

        gsap.delayedCall(8.3, () => {
          card.style.display = "block";

          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
            },
          );
        });

        gsap.delayedCall(9.2, () => {
          gsap.to(itens, {
            opacity: 1,
            stagger: 0.4,
            duration: 0.5,
          });
        });

        gsap.delayedCall(11, () => {
          gsap.to(botao, {
            opacity: 1,
            duration: 0.8,
          });
        });
      }

      // Botão de reiniciar específico da tela de derrota, usando a mesma função reiniciarJogo()
      const restartDefeatBtn = document.getElementById("restartDefeatBtn");

      restartDefeatBtn.addEventListener("click", reiniciarJogo);

      // Cria pequenas partículas espalhadas que voam para fora do ponto clicado
      // (efeito visual complementar ao "+1" criado em criarMaisUm)
      function criarParticulas(e) {
        const container = document.getElementById("clickEffects");
        const rect = container.getBoundingClientRect();

        // Cria 6 partículas por clique
        for (let i = 0; i < 6; i++) {
          const p = document.createElement("div");

          p.classList.add("particle");

          // Posiciona a partícula exatamente no ponto do clique (relativo ao container)
          p.style.left = e.clientX - rect.left + "px";
          p.style.top = e.clientY - rect.top + "px";

          container.appendChild(p);

          // Ângulo e distância aleatórios, para que cada partícula voe numa direção diferente
          const angle = Math.random() * Math.PI * 2; // ângulo aleatório entre 0 e 360°
          const distance = 30 + Math.random() * 50; // distância aleatória entre 30 e 80px

          // Anima a partícula se afastando do ponto de clique (usando seno/cosseno para
          // converter ângulo + distância em deslocamento X/Y) e sumindo (opacity 0)
          gsap.to(p, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            duration: 0.6,
            onComplete() {
              p.remove(); // remove a partícula do DOM ao terminar a animação
            },
          });
        }
      }
      
    }, // fim do onComplete do fade da #characterScreen
  }); // fim do gsap.to("#characterScreen", ...)
}); // fim do addEventListener do botão "selectBtn"
