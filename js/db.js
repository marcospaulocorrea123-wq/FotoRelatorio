/* =========================================================
   BANCO DE DADOS LOCAL (IndexedDB) - FotoRelatório
   ========================================================= */

const DB_NAME = "FotoRelatorioDB";
const DB_VERSION = 1;
const STORE_NAME = "relatorios";

// Abre ou cria o banco de dados IndexedDB
function abrirDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = function(event) {
      resolve(event.target.result);
    };

    request.onerror = function(event) {
      reject("Erro ao abrir banco de dados local: " + event.target.error);
    };
  });
}

// Salva ou atualiza um relatório no aparelho
async function salvarRelatorioNoDB(relatorio) {
  const db = await abrirDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    // Se id for nulo/undefined, remove a propriedade para o autoIncrement funcionar
    if (relatorio.id === undefined || relatorio.id === null) {
      delete relatorio.id;
    } else {
      relatorio.id = Number(relatorio.id);
    }

    const request = store.put(relatorio);

    request.onsuccess = function(event) {
      resolve(event.target.result); // Retorna o ID do relatório
    };

    request.onerror = function(event) {
      reject("Erro ao salvar relatório no banco de dados: " + event.target.error);
    };
  });
}

// Busca TODOS os relatórios salvos no aparelho
async function obterTodosRelatoriosDoDB() {
  const db = await abrirDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = function(event) {
      resolve(event.target.result || []);
    };

    request.onerror = function(event) {
      reject("Erro ao buscar a lista de relatórios: " + event.target.error);
    };
  });
}

// Busca um relatório específico pelo ID
async function obterRelatorioDoDB(id) {
  const db = await abrirDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(Number(id));

    request.onsuccess = function(event) {
      resolve(event.target.result);
    };

    request.onerror = function(event) {
      reject("Erro ao buscar relatório id " + id + ": " + event.target.error);
    };
  });
}

// Exclui um relatório pelo ID
async function excluirRelatorioDoDB(id) {
  const db = await abrirDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(Number(id));

    request.onsuccess = function() {
      resolve(true);
    };

    request.onerror = function(event) {
      reject("Erro ao excluir relatório id " + id + ": " + event.target.error);
    };
  });
}