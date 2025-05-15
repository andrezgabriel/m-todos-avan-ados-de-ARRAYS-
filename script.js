const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let nomes = [];

function perguntar(question) {
  return new Promise(resolve => rl.question(question, answer => resolve(answer)));
}

async function adicionarNome() {
  const nome = await perguntar("Digite o nome para adicionar: ");
  if (nome && nome.trim() !== "") {
    nomes.push(nome.trim());
    console.log("Nome adicionado!");
  } else {
    console.log("Nome inválido.");
  }
  console.log("Lista atualizada:", nomes);
}

async function filtrarNomes() {
  const letra = await perguntar("Digite a letra inicial para filtrar nomes: ");
  if (letra && letra.trim() !== "") {
    const letraMinuscula = letra.trim().toLowerCase();
    const filtrados = nomes.filter(nome => nome.toLowerCase().startsWith(letraMinuscula));
    console.log(`Nomes que começam com '${letra}':`, filtrados);
  } else {
    console.log("Letra inválida.");
  }
}

async function buscarNome() {
  const busca = await perguntar("Digite o nome para buscar: ");
  if (busca && busca.trim() !== "") {
    const encontrado = nomes.find(nome => nome.toLowerCase() === busca.trim().toLowerCase());
    if (encontrado) {
      console.log(`Nome encontrado: ${encontrado}`);
    } else {
      console.log("Nome não encontrado.");
    }
  } else {
    console.log("Nome inválido.");
  }
}

function transformarNomes() {
  const maiusculas = nomes.map(nome => nome.toUpperCase());
  console.log("Lista com nomes em maiúsculas:", maiusculas);
}

function verificarNomes() {
  const todosMaioresQueTres = nomes.every(nome => nome.length > 3);
  console.log("Todos os nomes têm mais de 3 caracteres?", todosMaioresQueTres);
}

async function menu() {
  let opcao;
  do {
    opcao = await perguntar(
      "\nEscolha uma opção:\n" +
      "1 - Adicionar nome\n" +
      "2 - Filtrar nomes por letra inicial\n" +
      "3 - Buscar um nome específico\n" +
      "4 - Transformar nomes em maiúsculas\n" +
      "5 - Verificar se todos os nomes têm mais de 3 caracteres\n" +
      "6 - Sair\n" +
      "Opção: "
    );

    switch (opcao) {
      case "1":
        await adicionarNome();
        break;
      case "2":
        await filtrarNomes();
        break;
      case "3":
        await buscarNome();
        break;
      case "4":
        transformarNomes();
        break;
      case "5":
        verificarNomes();
        break;
      case "6":
        console.log("Encerrando programa.");
        rl.close();
        break;
      default:
        console.log("Opção inválida. Tente novamente.");
    }
  } while (opcao !== "6");
}

// Inicia o programa
menu();
