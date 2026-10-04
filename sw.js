/* =========================================================
   SERVICE WORKER - FotoRelatório PWA
   Estratégia: Network-First (Rede Primeiro com Fallback para Cache)
   ========================================================= */

const CACHE_NAME = 'fotorelatorio-v1.3'; // Atualizado para a versão com ícones

const ARQUIVOS_PARA_CACHE = [
  './',
  './index.html',
  './novoRelatorio.html',
  './meusRelatorios.html',
  './manifest.json',
  './css/estilo.css',
  './js/db.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// 1. INSTALAÇÃO: Baixa os arquivos e força a ativação imediata
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Força o novo Service Worker a assumir na hora
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ARQUIVOS_PARA_CACHE);
    })
  );
});

// 2. ATIVAÇÃO: Apaga caches antigos automaticamente e assume o controle das abas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((chaves) => {
      return Promise.all(
        chaves.map((chave) => {
          if (chave !== CACHE_NAME) {
            console.log('[SW] Apagando cache antigo:', chave);
            return caches.delete(chave); // Deleta versões anteriores do cache
          }
        })
      );
    }).then(() => self.clients.claim()) // Assume o controle de todas as páginas abertas na hora
  );
});

// 3. REQUISIÇÕES (FETCH): Busca da rede primeiro; se offline, busca do cache
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((respostaRede) => {
        // Se a rede respondeu com sucesso, atualiza a cópia no cache
        if (respostaRede && respostaRede.status === 200) {
          const respostaClone = respostaRede.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, respostaClone);
          });
        }
        return respostaRede;
      })
      .catch(() => {
        // Se estiver sem internet ou a rede falhar, usa o arquivo em cache
        return caches.match(event.request);
      })
  );
});