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





## Uso/Instalação

Primeiro, clone o repositório com o comando:
\```bash
git clone https://github.com/DomingosChiconela/TrilhaVerde-BackEnd
\```


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

  






