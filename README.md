# Trabalho Final - DevOps com Docker Compose e GitHub Actions

Trabalho de DevOps composto pelos integrantes:
Mariana Libânio Barbosa, Arthur Luther Azevedo Pendleton e Lucas Mateus Martins da Silva Vasconcelos.

## 🚀 Como Executar o Projeto

Para rodar a aplicação completa localmente em modo de desenvolvimento, certifique-se de ter o Docker e o Docker Compose instalados e execute:

```bash
# Construir as imagens e subir os containers
docker compose up --build
````
Após a inicialização, os serviços estarão disponíveis em:

Frontend (React): http://localhost:80

Backend (Node.js): http://localhost:3000

Banco de Dados (PostgreSQL): Porta 5432 (Interna)

## 🧪 Como Testar
Os testes automatizados foram implementados na camada de **Backend** utilizando as ferramentas **Jest** (framework de testes) e **Supertest** (para simulação de requisições HTTP), garantindo a confiabilidade dos endpoints antes do deploy.

🔄 Metodologia TDD (Test-Driven Development)
A implementação dos testes seguiu a abordagem orientada a testes (TDD). O ciclo aplicado durante o desenvolvimento foi:

🔴 RED: Criação dos testes falhos para rotas e endpoints antes mesmo da sua existência.

🟢 GREEN: Implementação do código da aplicação (framework Express) apenas com a lógica mínima necessária para fazer os testes passarem com sucesso.

### Executando os testes localmente
Para rodar a suíte de testes na sua máquina local, siga os passos abaixo:


1. Navegue até o diretório do backend:
   ```bash
   cd backend
   
- Certifique-se de instalar as dependências do projeto (incluindo as dependências de desenvolvimento):

npm install

- Execute o comando de testes:

npm run test

## O que está sendo testado?
A suíte de testes valida os seguintes critérios obrigatórios:

Endpoint Principal (/): Garante que a API está ativa, respondendo com o status HTTP 200 e retornando a mensagem em formato JSON.

Endpoint de integridade (/health): Valida se o serviço responde com status HTTP 200 e confirma o estado da aplicação (status: "UP"), essencial para o monitoramento e orquestração dos containers.

## 📦 Como Executar a Pipeline de CI/CD
A pipeline de CI/CD foi implementada utilizando **GitHub Actions** e é executada automaticamente a cada `push` ou `pull request` na branch `main`. O arquivo de workflow está localizado em `.github/workflows/ci.yml`.

A pipeline é composta por dois jobs executados em sequência:

**Job 1 — Testes Backend:** Sobe um container PostgreSQL, instala as dependências com `npm ci` e executa a suíte de testes com Jest. O segundo job só é iniciado se todos os testes passarem.

**Job 2 — Build Docker:** Cria o arquivo `.env` com as variáveis de ambiente, executa o `docker compose build` e valida que todos os containers sobem corretamente.

### Configuração de Secrets
As variáveis sensíveis são protegidas via **GitHub Secrets**, nunca expostas no código-fonte. Para configurar, acesse:

**Repositório → Settings → Secrets and variables → Actions → New repository secret**

Os secrets necessários são:

- `DB_USER` — Usuário do banco de dados
- `DB_PASSWORD` — Senha do banco de dados
- `DB_NAME` — Nome do banco de dados
- `API_URL` — URL base da API

### Acompanhando a execução
Após um `push` na branch `main`, acesse a aba **Actions** no repositório GitHub para acompanhar cada etapa da pipeline em tempo real.

## 🛠️ Explicação das Correções Realizadas
Durante o diagnóstico do ambiente inicial, foram identificadas e corrigidas as seguintes falhas críticas:

Containers fora de ordem & ECONNREFUSED: O backend quebrava ao tentar se conectar a um banco que ainda não tinha inicializado por completo. Foi implementado um healthcheck com pg_isready no banco e uma política de depends_on: service_healthy no backend.

Perda de persistência: O PostgreSQL perdia todas as informações ao sofrer um restart. Foi mapeado um volume Docker nomeado (pgdata) apontando para /var/lib/postgresql/data.

Isolamento de Redes: Foi criada uma rede interna isolada (app-network) do tipo bridge para garantir a comunicação segura e direta entre os containers através de seus nomes de serviço.

Segurança e Variáveis: Senhas e credenciais foram removidas do código fonte e movidas para um arquivo .env localizado na raiz, devidamente protegido pelo .gitignore.
