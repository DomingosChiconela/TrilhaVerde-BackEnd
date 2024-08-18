# TrilhaVerde 🌱

**TrilhaVerde** é uma aplicação desenvolvida para solucionar problemas relacionados à coleta ineficiente ou inexistente de resíduos sólidos em Moçambique. A aplicação proporciona aos usuários um ambiente seguro e uma interface intuitiva, promovendo a conscientização ambiental e incentivando práticas de reciclagem.

## Funcionalidades Principais

- **Educação Ambiental**: Uma seção dedicada à conscientização, ensinando sobre reciclagem, benefícios da reciclagem, tipos de resíduos, e como fazer a devida separação dos mesmos.
- **Módulo do Usuário**: Permite aos cidadãos publicar anúncios de resíduos disponíveis para venda, incluindo tipo, quantidade, preço e localização. Além disso, os usuários podem comprar resíduos de outros cidadãos e iniciar conversas via WhatsApp para negociar detalhes.
- **Módulo Administrativo**: Fornece aos administradores gráficos com insights para a gestão do sistema, além de ferramentas para moderar anúncios, gerenciar usuários e responder a feedbacks.

## Módulo do Usuário

- **Criação de Anúncios**: O usuário pode criar anúncios, informando o tipo de resíduo disponível, a quantidade, o preço desejado e a localização.
- **Compra de Resíduos**: Os usuários podem visualizar e comprar resíduos anunciados por outros usuários.
- **Comunicação via WhatsApp**: Se necessário, os usuários podem iniciar uma conversa no WhatsApp para esclarecer dúvidas ou negociar detalhes da transação.
- **Rastreamento em Tempo Real**: No dia acordado para a coleta, a aplicação disponibiliza um mapa com rastreamento em tempo real para ajudar o comprador a encontrar o local da coleta e permitir que o vendedor acompanhe o deslocamento do comprador até o local.
- **Avaliações e Feedbacks**: Após a transação, os usuários podem avaliar a outra parte e deixar feedbacks, ajudando a manter a qualidade do serviço.

## Módulo Administrativo

- **Painel de Insights**: Administradores têm acesso a diversos gráficos e relatórios que oferecem insights para a gestão do sistema.
- **Gestão de Feedbacks**: Possibilidade de visualizar e responder aos feedbacks dos usuários para melhorar continuamente o serviço.
- **Moderação de Anúncios**: Os administradores podem ver, editar ou remover anúncios duplicados ou inadequados.
- **Gerenciamento de Usuários**: Ferramentas para criar, editar e eliminar contas de usuários, garantindo a segurança e o bom funcionamento do sistema.

### Pré-requisitos
* **Node.js e npm (ou yarn):** Certifique-se de ter o Node.js e o npm (ou yarn) instalados em sua máquina.

 ### Estrutura do Projeto

- **`server.ts`**: Arquivo onde está a configuração do servidor.

- **`src/routes/`**: Diretório onde estão as rotas da aplicação.

- **`src/controllers/`**: Diretório onde estão os controladores que lidam com a lógica de negócios.

- **`src/middlewares/`**: Diretório onde estão os middlewares que executam lógica entre as requisições e respostas.

- **`src/utils/`**: Diretório onde estão utilitários e funções auxiliares.

  ### Instalação
1. **Clone o repositório:**
   ```bash
   git clone git@github.com:DomingosChiconela/TrilhaVerde-BackEnd.git
2. **acesse o projecto que a caba de clonar com o comando:**
   ```bash
   cd TrilhaVerde-BackEnd
   
3. **Instale as dependências**
    ```bash
    npm install 

4. **Para rodar a aplicação,use**
   ```bash
   npm run dev


Antes de rodar a aplicação, configure as **variáveis de ambiente**. Para saber quais variáveis são necessárias, acesse o arquivo **.env.template**, que contém um molde do que é necessário.
Aqui estão as variáveis de ambiente que você precisa configurar:
- **DATABASE_URL**: URL para acessar a sua base de dados.
- **PORT**: Porta em que o servidor estará rodando.
- **SECRET**: Chave secreta para autenticação.
- **REGION**: Região da AWS S3 para o upload de imagens.
- **ACCESSKEYID**: ID de acesso da AWS.
- **SECRETACCESSKEY**: Chave de acesso secreta da AWS.
  
As tres  variáveis acima são para configurar o armazenamento de imagens usando AWS S3. Você pode usar outros mecanismos de armazenamento de imagens se preferir.

Aseguir temos as variaveis apara configurar o envio de email , tambem sao opcionas podes fazer uso de outro modo ou mecanismo de envio o aqui esta se usando o nodemail como host o gamil
- **MAIL_HOST**: Host do servidor de e-mail.
- **MAIL_PORT**: Porta do servidor de e-mail.
-  **MAIL_USER**: Nome de usuário para autenticação no servidor de e-mail.
-  **MAIL_PASS**: Senha para autenticação no servidor de e-mail.
### Uso

Com o servidor rodando, você pode acessar a aplicação através de:

- **Cadastro de Usuário**
  - **Endpoint**: `http://localhost:<porta>/api/auth/signup`
  - **Método**: `POST`
  - **Corpo da Requisição**:
    ```json
    {
      "name": "John Doe",
      "email": "example@gmail.com",
      "password": "senhaSegura",
      "confirmPassword": "senhaSegura"
    }
    ```
  - **Resposta Bem-Sucedida**:
    - **Status**: `201 Created`
    - **Corpo da Resposta**:
      ```json
      {
        "message": "User created",
        "data": "newUser"
      }
      ```

- **Login**
  - **Endpoint**: `http://localhost:<porta>/api/auth/login`
  - **Método**: `POST`
  - **Corpo da Requisição**:
    ```json
    {
      "email": "example@gmail.com",
      "password": "senhaSegura"
    }
    ```
  - **Resposta Bem-Sucedida**:
    - **Status**: `200 OK`
    - **Corpo da Resposta**:
      ```json
      {
        "message": "authenticated user",
        "token": "seuToken"
      }
      ```

**Nota**: O token é importante para indicar que o usuário está autenticado. Armazene-o de alguma forma no lado do cliente, seja em cookies ou no localStorage. Em todas as próximas requisições, você deve passar o token no cabeçalho da requisição.


### Como Saber os Endpoints?

Para descobrir os endpoints disponíveis na aplicação, você deve acessar o arquivo `server.ts`. Este arquivo contém a configuração das rotas base da API, permitindo que você veja como os caminhos para cada tipo de rota são estruturados.

No `server.ts`, você encontrará a configuração das rotas base para diferentes módulos da aplicação, como mostrado abaixo:
   ```typescript
   app.use('/api/auth', authRoute);
   app.use('/api/user', userRoute);
   app.use('/api/residue', residueRoute);
   app.use('/api/profile', profileRoute);
   app.use('/api/post', postRoute);
   app.use('/api/admin/', adminRoute);
```


###Como descobrir quais dados são necessários em cada requisição?

1.**Identifique o Caminho Base e as Rotas**

No arquivo `server.ts`, você encontrará a configuração das rotas base para diferentes módulos da aplicação, citados a cima:

2. **Consulte o Router Associado**
   O módulo de rotas (authRoute) define rotas específicas e seus métodos:
   ```typescript
   authRoute.post("/signup", signup);
   authRoute.post("/login", login);
   ```
   Essas rotas (/signup e /login) são gerenciadas pelos métodos signup e login.
   
   3. **Verifique os Métodos e Esquemas no Controller**
      Os métodos como signup e login são definidos no arquivo de controladores (controllers). Cada método possui um esquema que define quais campos são necessários e suas validações.    Por exemplo, o método signup pode usar um esquema de validação como o Zod:
      ```typescript
      const signupSchema = z.object({
       name: z.string(),
       email: z.string().email("O email é obrigatório").toLowerCase(),
       password: z.string().min(8, "A senha não deve ter menos de 8 caracteres"),
       contact: z.string(),
       confirmPassword: z.string().min(8, "A senha não deve ter menos de 8 caracteres")
      });
   Este esquema define os campos necessários e as validações para a requisição de signup.


## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática opcional.
- **Express.js**: Framework web para Node.js que facilita a criação de APIs.
- **Prisma**: ORM (Object-Relational Mapping) para interagir com o banco de dados.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional (SQL).
- **bcrypt**: Biblioteca para hash e verificação de senhas.
- **jsonwebtoken**: Implementação de JSON Web Tokens para autenticação e troca de informações seguras.
- **Nodemailer**: Módulo para envio de emails através de servidores SMTP.
- **Multer-S3**: Middleware para manipulação de uploads de arquivos no Node.js, integrando com o AWS S3.
- **AWS S3**: Serviço de armazenamento na nuvem da Amazon para salvar e acessar arquivos.

  






