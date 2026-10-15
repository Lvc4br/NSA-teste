# NSA 2.0 — Portal acadêmico

Frontend de demonstração de um portal acadêmico construído com React e Vite. Há áreas de demonstração para aluno e professor, mas ainda não existe autenticação real, persistência acadêmica nem integração efetiva com a ETEC.

Este guia explica como o projeto funciona, como executar e compilar, como módulos JavaScript são importados/exportados e como manter a aplicação. Para localizar cada tela e componente visual, consulte o [Mapa de arquivos e navegação](./README-NAVEGACAO.md).

## Requisitos

- Node.js 20 ou superior
- npm (instalado junto com Node.js)

## Instalar e executar

Abra a pasta do projeto no VS Code e inicie um terminal integrado (**Ctrl+`**). Execute:

```bash
npm install
npm run dev
```

Abra no navegador o endereço local informado pelo Vite, normalmente `http://localhost:5173`.

O servidor de desenvolvimento fica rodando no terminal. Para parar, use **Ctrl+C**.

O aplicativo inicia com uma sessão demonstrativa de aluno. Para testar outro perfil, abra **Meu perfil → Deslogar da conta** e, na tela de login, escolha o tipo de acesso desejado.

## Perfis demonstrativos

O seletor de perfil do login permite escolher **Aluno** ou **Professor**. O campo de usuário e a senha ainda não são validados: qualquer valor permite entrar no perfil escolhido. **Escola** permanece desabilitado.

| Perfil | Exemplo | O que aparece após entrar |
| --- | --- | --- |
| Aluno | Luca, Desenvolvimento de Sistemas, 2º módulo, turma DS-2A | Painel acadêmico existente com frequência, desempenho e próxima aula. |
| Professor | Nilson Almeida, Banco de Dados e Desenvolvimento de Sistemas | Painel demonstrativo com aulas do dia, turmas e chamadas pendentes. A agenda e as pendências são exemplos locais. |

A sessão fica no `sessionStorage` do navegador. Ao sair, a sessão é encerrada e o perfil salvo é removido. Não use esses perfis ou esse fluxo para autenticar usuários reais.

## Comandos disponíveis

Os comandos são definidos na seção `scripts` de [`package.json`](./package.json).

| Comando | Uso |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento com atualização automática. |
| `npm run build` | Verifica e gera a versão de produção dentro de `NSA-2.0/`. |
| `npm run preview` | Serve localmente a compilação existente em `NSA-2.0/` para conferência. Rode `npm run build` antes. |

`node_modules/` contém dependências instaladas e `NSA-2.0/` é gerada pela compilação. Não edite essas pastas manualmente; ambas estão listadas em [`.gitignore`](./.gitignore).

## Estado e avaliação do projeto

O NSA 2.0 é um protótipo de interface acadêmica, adequado para demonstração e evolução, mas ainda não para uso com dados ou usuários reais.

| Verificação | Resultado |
| --- | --- |
| Build de produção (`npm run build`) | Aprovado; gera os arquivos em `NSA-2.0/`. |
| Auditoria de dependências (`npm audit`) | 0 vulnerabilidades reportadas na verificação atual. |
| Testes automatizados e lint | Não há scripts de teste ou lint configurados no projeto. |
| Integração e autenticação | Não implementadas; telas e sessão usam dados locais de demonstração. |

O build atual conclui com avisos do React Router sobre diretivas `use client` ignoradas pelo bundler; eles não impedem a compilação. A avaliação geral é **protótipo funcional, não pronto para produção**: antes de uso real, implemente backend e autorização, persistência segura, testes dos fluxos e tratamento de erros. A auditoria de dependências é um resultado pontual e não substitui revisões futuras nem uma avaliação de segurança completa.

Para publicar no subdiretório `/NSA-2.0/` do servidor:

1. Execute `npm run build`.
2. No Cyberduck, abra a pasta remota correspondente ao diretório público do site, por exemplo `/usr/share/nginx/html/NSA-2.0/`.
3. Envie **o conteúdo** da pasta local `NSA-2.0/` gerada pelo build. `index.html`, `assets/`, `icons/` e `images/` devem ficar diretamente dentro da pasta remota; não crie uma segunda pasta `NSA-2.0` dentro dela.
4. Substitua os arquivos antigos, especialmente `index.html` e os arquivos de `assets/`.
5. Abra `http://seu-dominio/NSA-2.0/` e atualize sem cache (`Ctrl+F5`).

O caminho-base em [`vite.config.js`](./vite.config.js) e o `basename` do roteador em [`src/main.jsx`](./src/main.jsx) estão configurados para `/NSA-2.0/`. Se o endereço ou subdiretório de publicação mudar, ajuste os dois em conjunto e gere um novo build. O servidor também deve servir arquivos estáticos e devolver `index.html` nas rotas internas da SPA, se links diretos para essas rotas forem usados.

## Como o projeto funciona

O navegador carrega `index.html`, que fornece o elemento raiz. [`src/main.jsx`](./src/main.jsx) inicializa o React, o roteador e o contexto de sessão. [`src/App.jsx`](./src/App.jsx) renderiza o conjunto de rotas definido em [`src/routes/AppRoutes.jsx`](./src/routes/AppRoutes.jsx). A rota selecionada exibe um componente em `src/pages/`.

As páginas internas usam o layout compartilhado [`src/components/layout/AppLayout.jsx`](./src/components/layout/AppLayout.jsx), que fornece menu lateral, cabeçalho e área de conteúdo. Seus estilos globais e responsivos ficam em [`src/styles/globals.css`](./src/styles/globals.css).

```text
index.html → src/main.jsx → src/App.jsx → src/routes/AppRoutes.jsx → src/pages/
```

### Login, perfis e tela inicial

- [`src/pages/Login/Login.jsx`](./src/pages/Login/Login.jsx) contém o formulário e o seletor de perfil.
- [`src/context/AuthContext.jsx`](./src/context/AuthContext.jsx) mantém o usuário demonstrativo e a sessão de navegador; `logIn(role)` escolhe o perfil e `logOut()` encerra a sessão.
- [`src/routes/AppRoutes.jsx`](./src/routes/AppRoutes.jsx) protege as telas com `RequireAuth`.
- [`src/pages/Dashboard/Dashboard.jsx`](./src/pages/Dashboard/Dashboard.jsx) mostra o painel do aluno ou do professor, conforme o perfil autenticado.
- [`src/components/layout/AppLayout.jsx`](./src/components/layout/AppLayout.jsx) compartilha cabeçalho e layout, com navegação diferente para professor.
- [`src/pages/Profile/Profile.jsx`](./src/pages/Profile/Profile.jsx) mostra os dados de demonstração e permite sair.
- [`src/services/mock/mockData.js`](./src/services/mock/mockData.js) guarda os perfis e dados locais de exemplo.

O painel do professor atualmente exibe agenda, status de chamadas e contadores demonstrativos. Não há telas de registro de chamada ou lançamento de notas para professor e as ações não salvam dados.

Notificações estão temporariamente desativadas para ambos os perfis. Foram removidas do menu e dos painéis; a rota `/notificacoes` mostra um aviso em vez de dados compartilhados de exemplo. A funcionalidade deve ser retomada com armazenamento e entrega de notificações específicos por usuário/perfil quando a camada de dados for implementada.

## Módulos: importar e exportar código

O projeto usa módulos JavaScript ES Modules. O `import` disponibiliza código de outro arquivo; `export` torna funções, valores ou componentes disponíveis para outros arquivos.

### Exportação padrão (default)

Use `export default` quando o arquivo fornece um componente ou função principal:

```jsx
// src/components/common/ExampleCard.jsx
export default function ExampleCard() {
  return <article>Exemplo</article>;
}
```

Importe sem chaves; o nome local pode ser escolhido pelo arquivo consumidor:

```jsx
import ExampleCard from "../../components/common/ExampleCard";
```

É o padrão usado por páginas, layouts e componentes principais, como `AppLayout` e `Dashboard`.

### Exportações nomeadas

Use `export` antes de cada função ou valor que o módulo oferece:

```js
// src/services/api/api.js
export async function apiRequest(path, options = {}) {
  // implementação
}
```

Importe pelo mesmo nome, entre chaves:

```js
import { apiRequest } from "./api";
```

Para exportar vários dados de demonstração de um só arquivo:

```js
export const student = { name: "Luca" };
export const subjects = [];
```

E use apenas os dados necessários:

```js
import { student, subjects } from "../../services/mock/mockData";
```

Não misture `import` com `require` neste projeto. Ao criar um arquivo, confira se o caminho relativo está correto: `./` indica a mesma pasta; `../` sobe um nível.

## Atualizar e manter o projeto

Fluxo sugerido para uma alteração:

1. Localize a tela, componente, rota, dados ou estilo que deseja mudar usando o [mapa de arquivos](./README-NAVEGACAO.md).
2. Faça uma alteração pequena e relacionada à funcionalidade.
3. Mantenha componentes reutilizáveis em `src/components/`, páginas em `src/pages/`, dados de demonstração em `src/services/mock/` e CSS em `src/styles/`.
4. Com `npm run dev` ativo, confira a alteração no navegador.
5. Antes de considerar o trabalho pronto, rode `npm run build`.

Para atualizar ou instalar uma dependência, use npm em vez de alterar `node_modules/` diretamente. Exemplo:

```bash
npm install nome-do-pacote
```

O npm atualiza `package.json` e `package-lock.json`; inclua os dois no controle de versão quando ambos forem modificados.

Configurações locais podem usar variáveis com prefixo `VITE_`, por exemplo `VITE_API_URL`. Crie um arquivo `.env.local` para valores locais e **não inclua senhas, tokens ou outros segredos no frontend**: variáveis Vite podem ser entregues ao navegador. O `.env.local` está ignorado pelo Git.

## Integração com API e próximos passos

[`src/services/api/api.js`](./src/services/api/api.js) centraliza chamadas HTTP e [`src/services/api/auth.js`](./src/services/api/auth.js) contém uma chamada inicial de login. São pontos de integração, não significam que já exista um servidor conectado.

- O login de aluno e professor é demonstrativo: não valida usuário ou senha, não usa tokens e não representa autorização.
- O perfil Escola ainda está em construção e desabilitado.
- Dados de aluno, professor, agenda, notas, frequência e turmas são exemplos locais em `src/services/mock/mockData.js`.
- Notificações estão desativadas; ao implementá-las com a integração ao banco de dados, elas devem ser associadas ao usuário e às permissões apropriadas, sem reutilizar avisos globais de demonstração entre perfis.
- O painel do professor é somente leitura e não registra chamadas, notas, avaliações ou materiais.
- O envio de atestado/carta de horas é apenas um protótipo: o arquivo não é transmitido nem armazenado.
- A proteção de rotas do frontend não substitui autenticação e autorização no backend.

Ordem sugerida para continuar o desenvolvimento:

1. Definir os requisitos e permissões de aluno, professor e escola; não confiar no seletor de perfil como mecanismo de autorização.
2. Implementar backend e autenticação real; validar a identidade e o perfil no servidor.
3. Criar modelos/API de turmas, alunos, aulas, chamadas, avaliações, materiais e notificações, substituindo os dados mock.
4. Criar telas de professor para abrir uma turma, registrar/editar chamada, lançar notas e publicar materiais; apresentar estados de carregamento, sucesso e erro.
5. Implementar notificações persistidas e direcionadas ao usuário/perfil, com regras de leitura e entrega.
6. Definir persistência, auditoria e regras para documentos e dados pessoais.
7. Adicionar testes dos fluxos por perfil, das permissões e dos formulários; validar `npm run build` e a publicação no subdiretório configurado.

Nunca inclua credenciais ou segredos em código entregue ao navegador.

## Documentação relacionada

- [Mapa de arquivos e navegação](./README-NAVEGACAO.md): localização das páginas, rotas, sidebar, hero, estilos e instruções para adicionar áreas.
- [package.json](./package.json): dependências e comandos do projeto.
