# 📸 FotoRelatório - Web Application & PWA

O **FotoRelatório** é um aplicativo web progressivo (PWA) desenvolvido para a criação, gestão e exportação de **Relatórios Fotográficos Profissionais** formatados no padrão A4. Possui suporte a funcionamento **100% Offline** e instalação direta na tela inicial de dispositivos móveis (Android e iOS).

---

## 🚀 Principais Funcionalidades

- 📱 **Progressive Web App (PWA)**:
  - Funciona **100% offline** através do Service Worker (`sw.js`).
  - Instalável diretamente na tela inicial do celular ou tablet sem necessidade de loja de aplicativos.

- 📄 **Formatos de Relatório**:
  - **Simplificado**: Registro fotográfico rápido com campos de fotos e descrições.
  - **Completo**: Inclui informações detalhadas do serviço (Local/Instalação, Equipamento, TAG e Tipo de Serviço).
  - **Com Texto**: Adiciona capítulos de Introdução, Sumário NBR e Conclusão.

- 📐 **Padronização ABNT / NBR**:
  - Divisão perfeita de **2 campos de fotos por folha A4**.
  - Texto de Introdução e Conclusão com recuo regulamentar de parágrafo de **1,5 cm** e espaçamento entre linhas de **1,5**.
  - **Sumário automático (NBR 6027)** recalculando a paginação dinamicamente.
  - Módulos de fotos em grade com legenda individual ("Foto 01", "Foto 02", etc.).

- 💾 **Armazenamento Local & Privacidade**:
  - Salva rascunhos e relatórios finalizados no banco de dados interno do dispositivo (**IndexedDB**).
  - Nenhum dado ou foto é enviado para servidores externos.

- 🖨️ **Geração de PDF / Impressão**:
  - Layout otimizado para impressão em **A4 Portrait**.
  - Modo de pré-visualização que oculta botões e bordas de edição para um acabamento limpo.

---

## 📁 Estrutura do Projeto

```text
fotorelatorio/
│
├── index.html            # Tela inicial da aplicação
├── novoRelatorio.html    # Construtor e editor interativo de relatórios A4
├── meusRelatorios.html  # Lista e gerenciador de relatórios salvos no aparelho
├── manifest.json         # Configurações do PWA (ícones, nome, cores)
├── sw.js                 # Service Worker para controle do cache offline
├── README.md             # Documentação do projeto
│
├── css/
│   └── estilo.css        # Estilos globais e regras de impressão A4
│
├── js/
│   └── db.js             # Gerenciador do banco de dados local (IndexedDB)
│
└── icons/
    ├── icon-192.png      # Ícone do PWA (192x192)
    └── icon-512.png      # Ícone do PWA (512x512)
🛠️ Tecnologias Utilizadas
HTML5 & CSS3 (Flexbox, Grid Layout e @media print)
JavaScript (Vanilla JS - ES6+)
Service Worker API (Atendimento da estratégia Network-First com Fallback Cache)
IndexedDB API (Armazenamento local no navegador)
GitHub Pages (Hospedagem estática)
📲 Como Instalar e Executar
1. Executando Localmente
Basta clonar o repositório e abrir o arquivo index.html em qualquer navegador ou servidor local (XAMPP / Live Server):
git clone https://github.com/SEU_USUARIO/fotorelatorio.git
2. Acessando via GitHub Pages e Instalando no Celular
Acesse o link oficial do aplicativo: https://SEU_USUARIO.github.io/fotorelatorio/
Android (Chrome): Abra o menu de 3 pontos no topo e selecione "Instalar aplicativo" ou "Adicionar à Tela inicial".
iPhone (Safari): Toque no ícone de Compartilhar e escolha "Adicionar à Tela de Início".
📄 Licença
Este projeto é de uso livre para elaboração e gestão de relatórios técnicos e registros fotográficos.

---

### 📋 Como usar:
1. Crie um arquivo chamado **`README.md`** dentro da pasta raiz do seu projeto (`fotorelatorio/`).
2. Cole o conteúdo acima.
3. Altere onde diz `SEU_USUARIO` pelo seu nome de usuário no GitHub.
4. Faça o upload do arquivo para o seu repositório junto com os demais arquivos.