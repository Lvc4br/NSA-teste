# Mapa de arquivos, pastas e navegação

Este guia é o índice prático do código: mostra onde as telas, rotas, componentes visuais, estilos e dados ficam e onde fazer mudanças comuns.

Para instalação, execução, compilação e convenções de `import`/`export`, consulte o [README principal](./README.md).

## 1. Estrutura de pastas

```text
NSA-2.0/
├── index.html
├── package.json
├── public/                         arquivos públicos, como imagens
└── src/
    ├── main.jsx                    inicialização do React
    ├── App.jsx                     componente raiz
    ├── routes/
    │   └── AppRoutes.jsx           endereços e proteção das páginas
    ├── pages/                      telas completas
    │   ├── Attendance/
    │   ├── Dashboard/
    │   ├── Documents/
    │   ├── Grades/
    │   ├── Login/
    │   ├── Notifications/
    │   ├── Profile/
    │   ├── Requests/
    │   ├── Schedule/
    │   └── Subjects/
    ├── components/                 componentes reutilizados
    │   ├── common/
    │   └── layout/
    ├── context/                    estado compartilhado da aplicação
    ├── services/
    │   ├── api/                    chamadas HTTP preparadas para backend
    │   └── mock/                   dados locais de demonstração
    ├── hooks/                      hooks reutilizáveis
    ├── styles/                     estilos globais e responsivos
    └── utils/                      funções auxiliares
```

## 2. Fluxo da navegação

```text
index.html
└── src/main.jsx
    ├── BrowserRouter
    ├── AuthProvider
    └── src/App.jsx
        └── src/routes/AppRoutes.jsx
            ├── /login → src/pages/Login/Login.jsx (seleção demonstrativa de aluno/professor)
            └── rotas protegidas → src/pages/<Área>/<Área>.jsx
                └── / → painel do aluno ou painel demonstrativo do professor
```

- [`index.html`](./index.html) contém o ponto HTML onde a aplicação React é montada.
- [`src/main.jsx`](./src/main.jsx) inicia React, BrowserRouter, AuthProvider e CSS global.
- [`src/App.jsx`](./src/App.jsx) renderiza as rotas.
- [`src/routes/AppRoutes.jsx`](./src/routes/AppRoutes.jsx) define o endereço de cada tela e o componente `RequireAuth`.
- As páginas internas normalmente usam `AppLayout` para compartilhar sidebar e cabeçalho.

## 3. Rotas e telas atuais

| Área | Endereço | Arquivo da tela |
| --- | --- | --- |
| Login | `/login` | [`src/pages/Login/Login.jsx`](./src/pages/Login/Login.jsx) |
| Início | `/` | [`src/pages/Dashboard/Dashboard.jsx`](./src/pages/Dashboard/Dashboard.jsx) |
| Disciplinas | `/disciplinas` | [`src/pages/Subjects/Subjects.jsx`](./src/pages/Subjects/Subjects.jsx) |
| Notas | `/notas` | [`src/pages/Grades/Grades.jsx`](./src/pages/Grades/Grades.jsx) |
| Frequência | `/frequencia` | [`src/pages/Attendance/Attendance.jsx`](./src/pages/Attendance/Attendance.jsx) |
| Horário | `/horario` | [`src/pages/Schedule/Schedule.jsx`](./src/pages/Schedule/Schedule.jsx) |
| Documentos | `/documentos` | [`src/pages/Documents/Documents.jsx`](./src/pages/Documents/Documents.jsx) |
| Solicitações | `/solicitacoes` | [`src/pages/Requests/Requests.jsx`](./src/pages/Requests/Requests.jsx) |
| Notificações | `/notificacoes` | [`src/pages/Notifications/Notifications.jsx`](./src/pages/Notifications/Notifications.jsx) |
| Meu perfil | `/perfil` | [`src/pages/Profile/Profile.jsx`](./src/pages/Profile/Profile.jsx) |

O login de demonstração permite escolher **Aluno** ou **Professor**; ambos entram sem validação de usuário/senha. O painel inicial e o menu variam conforme o perfil. O painel de professor usa exemplos locais e ainda não registra chamadas nem notas. Notificações estão desativadas; o endereço `/notificacoes` mostra apenas um aviso até haver integração com dados por usuário. O perfil Escola continua desabilitado. Consulte o [README principal](./README.md) para instruções de teste, build, publicação e próximos passos.

O endereço e a importação da tela são configurados em `AppRoutes.jsx`. O link visível no menu é configurado separadamente no layout.

## 4. Sidebar, cabeçalho e layout

Arquivo: [`src/components/layout/AppLayout.jsx`](./src/components/layout/AppLayout.jsx).

| Parte da interface | Onde está no componente |
| --- | --- |
| Lista dos links principais | Constante `links`, no início do arquivo |
| Menu lateral | Elemento `<aside className="sidebar">` |
| Link para perfil e recolher menu | Bloco `sidebar-bottom` |
| Abrir/fechar menu mobile | Botões `mobile-menu` e `mobile-close`; estado `mobileOpen` |
| Recolher/expandir menu | Estado `collapsed` e botão `collapse-button` |
| Título e identificação do portal | Elemento `<header className="topbar">` |
| Atalho de notificações e avatar | Bloco `topbar-actions` |
| Conteúdo de cada página | `<main className="content">{children}</main>` |

Estilos relacionados em [`src/styles/globals.css`](./src/styles/globals.css):

| Aparência | Seletor ou regra |
| --- | --- |
| Sidebar | `.sidebar`, `.sidebar-collapsed` |
| Links do menu | `.nav`, `.nav-link`, `.nav-label` |
| Cabeçalho | `.topbar`, `.topbar-actions` |
| Conteúdo | `.main-area`, `.content` |
| Layout em telas menores | regras `@media` no final do arquivo |

### Adicionar item à sidebar

1. Crie a tela e registre sua rota em `src/routes/AppRoutes.jsx`.
2. Importe um ícone de `lucide-react` em `AppLayout.jsx`.
3. Inclua uma entrada no array `links`, seguindo o formato:

   ```jsx
   ["/materiais", "Materiais", BookOpen],
   ```

4. Teste a rota digitando `/materiais` e clicando no novo item do menu.

## 5. Hero e dashboard

Arquivo: [`src/pages/Dashboard/Dashboard.jsx`](./src/pages/Dashboard/Dashboard.jsx).

O hero é a seção `<section className="hero">` no início de `Dashboard`. Nela:

- A saudação usa `student.name`.
- Curso, módulo e turma usam `student.course`, `student.module` e `student.className`.
- A data está escrita diretamente no JSX dentro de `.hero-date`.

Os dados vêm de [`src/services/mock/mockData.js`](./src/services/mock/mockData.js). O estilo fica em `src/styles/globals.css`, nos seletores `.hero`, `.hero h2`, `.hero p` e `.hero-date`.

Outros componentes do dashboard:

| Bloco | Implementação | Dados ou destino |
| --- | --- | --- |
| Cartões de resumo | `Dashboard.jsx` e [`src/components/common/StatCard.jsx`](./src/components/common/StatCard.jsx) | `attendance`, `nextClass` e valores demonstrativos |
| Próxima aula | `Dashboard.jsx` | `nextClass`; link `/horario` |
| Notificações | `Dashboard.jsx` | `notifications`; link `/notificacoes` |
| Desempenho por disciplina | `Dashboard.jsx` | `grades`; link `/notas` |
| Acesso rápido | `Dashboard.jsx` | Links para notas, frequência, horário e documentos |
| Cabeçalho de painel | [`src/components/common/SectionHeader.jsx`](./src/components/common/SectionHeader.jsx) | Título e ação opcional |

## 6. Dados, sessão, API e estilos

| Arquivo/pasta | Responsabilidade |
| --- | --- |
| [`src/services/mock/mockData.js`](./src/services/mock/mockData.js) | Objetos e listas estáticas: aluno, frequência, próxima aula, notas, notificações, horário e disciplinas. |
| [`src/context/AuthContext.jsx`](./src/context/AuthContext.jsx) | Sessão demonstrativa, login/logout e estado `isAuthenticated`. |
| [`src/services/api/api.js`](./src/services/api/api.js) | Helper `apiRequest` para requisições HTTP e URL de API. |
| [`src/services/api/auth.js`](./src/services/api/auth.js) | Chamada inicial de login para futura integração. |
| [`src/styles/globals.css`](./src/styles/globals.css) | Variáveis, estilos globais, componentes visuais e breakpoints responsivos. |
| `src/hooks/` | Hooks React compartilhados, quando necessários. |
| `src/utils/` | Funções auxiliares compartilhadas, quando necessárias. |

O helper de API é um ponto inicial; as páginas atualmente consomem dados mockados. Não coloque segredos no frontend.

## 7. Criar uma tela do início ao fim

Exemplo: adicionar uma área “Materiais”.

1. Crie `src/pages/Materials/Materials.jsx`.
2. Importe React e `AppLayout`. Use `<AppLayout title="Materiais">` como contêiner da tela para reutilizar sidebar e cabeçalho.
3. Se necessário, defina dados de demonstração em `src/services/mock/mockData.js`.
4. Importe a tela em `src/routes/AppRoutes.jsx` e adicione `<Route path="/materiais" element={<Materials />} />` dentro de `<Route element={<RequireAuth />}>`.
5. Importe um ícone e adicione `["/materiais", "Materiais", Icone]` ao array `links` de `AppLayout.jsx`.
6. Crie estilos em `src/styles/globals.css`, preferindo nomes de classe específicos da tela.
7. Rode `npm run dev`, teste a tela em `/materiais` e valide com `npm run build`.

## 8. Atualizar uma parte existente

| Quero alterar... | Edite ou procure em... |
| --- | --- |
| Texto, estrutura ou formulário de uma tela | Componente correspondente em `src/pages/<Área>/` |
| Nome, ordem ou ícone de item do menu | Array `links` em `src/components/layout/AppLayout.jsx` |
| Endereço de uma tela | `src/routes/AppRoutes.jsx` |
| Hero ou painéis da página inicial | `src/pages/Dashboard/Dashboard.jsx` |
| Dados que aparecem nas páginas | `src/services/mock/mockData.js` |
| Aparência, cores ou responsividade | `src/styles/globals.css` |
| Login ou logout demonstrativo | `src/pages/Login/Login.jsx` e `src/context/AuthContext.jsx` |
| Componentes reutilizáveis | `src/components/common/` ou `src/components/layout/` |
| Requisições para backend | `src/services/api/` |

Depois de atualizar, confira no navegador e execute `npm run build`. Se adicionar dependências, use npm para atualizar `package.json` e `package-lock.json`; não altere `node_modules` manualmente.

## 9. Localizar código no VS Code

- **Ctrl+P**: abrir um arquivo pelo nome, como `AppLayout.jsx`.
- **Ctrl+Shift+F**: buscar em todo o projeto por `className="hero"`, `const links`, `path="/disciplinas"` ou pelo texto exibido na interface.
- **Ctrl+`**: abrir o terminal integrado.

## 10. Limitações funcionais atuais

- O login não valida credenciais; qualquer envio entra no perfil demonstrativo escolhido entre Aluno e Professor.
- A tela inicial e os itens do menu variam por perfil; o painel do professor é demonstrativo e não grava chamadas ou notas.
- Notificações estão temporariamente desativadas; não há itens falsos compartilhados entre os perfis.
- Escola continua desabilitada e identificada como “em construção”.
- Os dados acadêmicos são locais e estáticos.
- O protótipo de atestado/carta de horas não transmite nem armazena o documento.
- Proteção de rotas no frontend não é controle de acesso suficiente para produção; autenticação e autorização devem ser feitas no backend.
