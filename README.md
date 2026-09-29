# Workout Planner (com MongoDB)

Aplicativo de linha de comando para montar treinos, com persistência em MongoDB via Mongoose.

## Demonstração

![Demo do Workout Planner](./assets/demo.gif)

![Treino salvo no MongoDB Atlas](./assets/atlas.png)

## Pré-requisitos

- [Node.js](https://nodejs.org) instalado (v18 ou mais recente).
- Uma conta gratuita no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).

## Passo 1 — Criar o cluster no MongoDB Atlas

1. Acesse [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register) e crie uma conta (pode usar login com Google/GitHub).
2. Ao entrar, clique em **"Build a Database"** (ou "Create" se já tiver um projeto).
3. Escolha o plano **M0 (Free)** — não pede cartão de crédito.
4. Escolha o provedor de nuvem (AWS/Google/Azure, tanto faz) e a região mais próxima de você.
5. Clique em **"Create Deployment"** e aguarde alguns segundos até o cluster ficar pronto.

## Passo 2 — Criar o usuário do banco

Ainda na tela de criação (ou em **Database Access** no menu lateral, se já pulou essa etapa):

1. Defina um **usuário** e uma **senha** para a aplicação se conectar. **Anote os dois** — você vai precisar deles daqui a pouco.
2. Esse usuário **não é o seu login do Atlas** — é uma credencial separada, só para a aplicação.
3. Em permissões, deixe "Read and write to any database" (padrão).

## Passo 3 — Liberar o acesso de rede

Em **Network Access** no menu lateral:

1. Clique em **"Add IP Address"**.
2. Para facilitar (já que é um projeto de estudo/portfólio), clique em **"Allow Access from Anywhere"** (`0.0.0.0/0`). Em um projeto de produção real isso não seria recomendado, mas aqui evita dor de cabeça.
3. Confirme.

## Passo 4 — Pegar a connection string

1. Vá em **Database** (ou **Clusters**) no menu lateral e clique no botão **"Connect"** do seu cluster.
2. Selecione a opção **"Drivers"**.
3. Em "Driver", escolha **Node.js**; em "Version", deixe a mais recente.
4. Vai aparecer uma string parecida com esta:
   ```
   mongodb+srv://<db_username>:<db_password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```
5. Clique no botão de copiar ao lado dela.

## Passo 5 — Configurar o projeto localmente

1. Clone o repositório e entre na pasta:
   ```
   git clone <https://github.com/LuizFaquimOli/Portifolio-workouts>
   cd Portifolio-workouts
   ```
2. Instale as dependências:
   ```
   npm install
   ```
3. Copie o arquivo de exemplo de variáveis de ambiente:
   ```
   cp .env.example .env
   ```
4. Abra o arquivo **`.env`** que acabou de criar. Ele terá uma linha assim:
   ```
   MONGO_URI=mongodb+srv://usuario:senha@cluster0.xxxxx.mongodb.net/workoutDB?retryWrites=true&w=majority
   ```
   Substitua **exatamente** estas duas partes pela string que você copiou no Passo 4, já com seu usuário e senha reais no lugar de `<db_username>` e `<db_password>`:
   - `usuario` → o nome de usuário que você criou no Passo 2
   - `senha` → a senha que você criou no Passo 2

   O resto da URL (endereço do cluster) você pega direto da string copiada do Atlas — não precisa inventar nada ali.

   > ⚠️ Se sua senha tiver caracteres especiais como `@`, `:` ou `/`, eles precisam ser "URL-encoded" (ex: `@` vira `%40`). Se der erro de conexão estranho, esse costuma ser o motivo.

## Passo 6 — Popular o banco com os exercícios (seed)

Rode, uma única vez (ou sempre que quiser resetar o catálogo):
```
npm run seed
```
Saída esperada no terminal:
```
Conectado ao MongoDB com sucesso!
64 exercícios inseridos com sucesso.
```

## Passo 7 — Rodar a aplicação

```
npm start
```
Você deve ver o menu principal (`=== OPÇÕES DE TREINO ===`). Navegue pelas opções normalmente.

## Como testar se está tudo funcionando

**1. Confira se os exercícios foram inseridos:**
No Atlas, vá em **Database** → clique em **"Browse Collections"** no seu cluster. Você deve ver um banco `workoutDB` com uma coleção `exercises` contendo os documentos.

**2. Rode um fluxo completo pelo app:**
Escolha uma divisão de treino (ex: opção `2` para PPL), escolha um grupo (ex: `1` para Pull), escolha `2` ou `3` exercícios, e confirme a montagem. No final deve aparecer:
```
Treino salvo no banco de dados com sucesso!
```

**3. Confirme que o treino foi salvo de verdade:**
Volte em "Browse Collections" no Atlas — agora deve existir também uma coleção `trainings`, com um documento novo contendo os exercícios que você escolheu.

Se os três passos acima funcionarem, o projeto está 100% configurado e conectado corretamente.

## Problemas comuns

| Erro | Causa provável |
|---|---|
| `Authentication failed` | Usuário ou senha errados no `.env`, ou você esqueceu de trocar `<db_username>`/`<db_password>` |
| Conexão trava ou dá timeout | Seu IP não está liberado em "Network Access" |
| Erro de parsing na URI | Caractere especial na senha sem URL-encode |
| `exercises` aparece vazia no app | Você esqueceu de rodar `npm run seed` |

## Coleções criadas no MongoDB

- **exercises**: catálogo de exercícios (`nome`, `grupoMuscular`, `categoria`).
- **trainings**: treinos que o usuário montou e salvou (histórico).

## Autor
 
Desenvolvido por **Luiz Otávio Faquim de Oliveira**.
 
- [GitHub](https://github.com/LuizFaquimOli)
- [LinkedIn](https://www.linkedin.com/in/luiz-ot%C3%A1vio-faquim-de-oliveira-51a37b275/)