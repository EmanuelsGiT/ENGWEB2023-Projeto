# Project Report: Web Application 

## 1. Introdução
No âmbito da unidade curricular de Engenharia Web foi nos proposto a elaboração de uma aplicação web. 
Para a realização deste projeto utilizaram-se três servidores, sendo que o primeiro estaria encarregue da aplicação, o segundo estaria encarregue pela a autenticação dos utilizadores, que utiliza os Json Web Tokens (JWT) e o terceiro seria uma API para que fosse possível fazer a comunicação com a MongoDB. Todos estes servidores foram feitos utilizando a framework Express que é uma framework popular de aplicação web de Node.js  
O tema escolhido pelo grupo foi relativo às Inquirições de Génere. 
Para que tal possa ser bem sucedido, o grupo teve de aplicar o conhecimento adquirido ao longo das várias aulas práticas e teóricas.

## 2. Arquitetura Aplicacional
The three servers are designed to work together to create a fully functional web application. They can be hosted on separate servers or combined into a single deployment, depending on the project's requirements. Here is an overview of how the servers integrate:

1. The client interacts with Server 1 by sending HTTP requests for specific routes.
2. Server 1 handles these requests and renders dynamic HTML views using Pug templates.
3. The client can authenticate by sending a request to Server 2's authentication endpoints.
4. Server 2 validates the user's credentials, generates a JWT token upon successful authentication, and sends it back to the client.
5. The client includes the JWT token in subsequent requests to access protected routes.
6. Server 3 receives these requests, validates the JWT token, and performs the requested database operations using MongoDB.
7. Server 3 sends back the appropriate responses to the client, indicating the success or failure of the API request

## 3. Servidor da Aplicação: 
O servidor da aplicação é responsável por carregar as páginas para que o utilizador possa interagir. Estas páginas foram todas criadas utilizando a linguagem Pug. Pug foi escolhido para gerar as interfaces porque é uma linguagem que permite uma geração dinâmica e reutilizável de HTML. Como já foi mencionado acima o servidor foi construído utilizando a framework Express e por isso suporta a recessão de pedidos de várias rotas. As respostas a estes pedidos são páginas Pug que são enviadas para o cliente

Key Features of Server 1:
- Handles routing and request handling using Express.
- Utilizes Pug templates for rendering dynamic HTML views.
- Supports features such as template inheritance, conditionals, loops, and variables.

## 4. Servidor de Autenticação: JWT
Este segundo servidor está encarregue da autenticação dos utilizadores, e fá-lo utilizando Json Web Tokens (JWT). JWT é um método padrão para transmitir informação de forma segura entre serviços sob a forma de objetos JSON. Este é frequentemente utilizado para autenticação e autorização em aplicações web. Portanto, este servidor trata do registo, login e da geração/validação do token de um utilizador.

Key Features of Server 2:
- Implements user registration and login endpoints.
- Generates JWT tokens upon successful authentication.
- Validates JWT tokens for secure access to protected routes.
- Manages user authentication state and session management.

## 5. Servidor da API: Comunicação  com MongoDB
Este servidor é responsável pela comunicação com a MongoDB que é uma base de dados NoSQL (não relacional) bastante popular. Este servidor comunica com o server de aplicação através do JWT para que a informação seja fornecida de forma segura. Esta informação trata-se de pedidos gerados pela aplicação que pode ser o armazenamento, leitura ou edição de dados.

Key Features of Server 3:
- Implements RESTful API endpoints using Express.
- Utilizes the MongoDB driver or an ORM (Object-Relational Mapping) library to interact with the database.
- Supports CRUD operations (Create, Read, Update, Delete) for data manipulation.
- Provides data validation and error handling for robust API communication.

## 6. Conclusão
Através do desenvolvimento deste projeto pudemos aplicar os conhecimentos adquiridos
nas aulas, e aprofundar a nossa compreensão do modo
de funcionamento da framework Express, da utilização dos JWT e de Pug.
Reconhecemos que existem alguns aspetos que podiam vir a ser melhorados no projeto mais concretamente a parte de segurança dos dados. Consideramos que desenvolvemos um bom trabalho, que implementa todas as funcionalidades
exigidas. 
