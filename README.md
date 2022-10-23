## API com Node, Typescript, Express, PostgreSQL e Prisma ORM para gerenciamento de reservas e hóspedes para hotéis

### Screenshot

![](./screenshot.png)

### Construído com

-   Node
-   Typescript
-   Express
-   PostgreSQL
-   Prisma
-   Swagger

API desenvolvida com Node, Express e Typescript.

Por meio da API, são disponibilizados recursos para as operações de inserção, alteração e
obtenção de hotéis, reservas e hóspedes, na forma de um CRUD.

Foi realizada a documentação via Swagger, conforme a imagem acima, que pode ser acessada
pelo endpoint "/api-docs".

Por meio do endpoint "/buscarHotel", utilizando-se o método HTTP GET, é retornada uma
listagem com todos os hotéis cadastrados.

Já o endpoint "/buscarHotel/{CNPJ}", método HTTP GET, que espera receber o CNPJ na própria
URL, são retornados os dados de um hotel específico.

Usando o método HTTP POST no endpoint "/cadastrarHotel", é preciso fornecer os dados do
hotel a ser cadastrado, no corpo da requisição, sendo eles o nome, CNPJ, país, estado e
cidade.

No endpoint "/atualizarHotel" com o método HTTP PUT, é preciso fornecer no corpo da
requisição os novos dados do hotel a ser atualizado, que será localizado a partir de seu
CNPJ por ser um dado único de cada elemento.

A aplicação retorna os erros com status code 404 caso o hotel não exista, ou 400 caso os
dados obrigatórios não tenham sido informados devidamente.

Também foram criados endpoints para a criação, alteração e obtenção de dados referentes ao
cadastramento de reservas e seus respectivos hóspedes.

Tendo em vista a relação de muitos para muitos entre reservas e hóspeses, visto que uma
reserva pode possuir inúmeros hóspedes ao mesmo tempo em que um hóspede pode se associar a
diversas reservas, foi elaborada uma tabela associativa, que vincula o ID de um hóspede ao
ID de uma reserva.

Neste aspecto, foi criado o endpoint "/buscarReservaHospede", com o método HTTP GET, que
retorna uma listagem com todas as reservas cadastradas, mas sem incluir os hóspedes de
cada uma.

Para obter maiores informações sobre uma reserva específica, é possível utilizar o
endpoint "/buscarReservaHospede/{reservationNumber}", pelo método HTTP GET, fornecendo na
URL o número da reserva, que é um dado único para cada reserva.

Para criar uma nova reserva, pode-se utilizar com o método HTTP POST o endpoint
"/cadastrarReservaHospede", que espera receber no corpo da requisição tanto os dados
referentes à reserva, como ID do hotel, número da reserva, apartamento, data de check-in,
data de check-out e status, quanto a listagem de hóspedes, com nome e sobrenome,
obrigatoriamente.

Vale ressaltar que foi criada uma tabela específica para o cadastramento de Hóspedes,
sendo que a API, ao receber esta requisição, verifica para cada hóspede informado se este
já existe na tabela de Hóspedes, e resgata o seu ID para vincular ele à reserva, e caso
não exista, faz o seu cadastro na tabela de Hóspedes e então estabelece a sua relação com
a reserva por meio da tabela associativa.

Por fim, é possível alterar os dados de uma reserva, inclusive adicionando, removendo ou
alterando os dados de cada um dos hóspedes informados no momento de seu cadastramento, por
meio do método HTTP PUT, endpoint "/atualizarReservaHospede", sendo passados os mesmos
dados exigidos para a criação de uma reserva.

Como o número da reserva é um dado único, a reserva é buscada por este campo, e
atualizados os dados conforme informado na requisição.

## Execução

Foi realizado o deploy da aplicação em cloud na plataforma Heroku, por meio do link:
https://reservas-hotel-api.herokuapp.com/api-docs/

Para executar a aplicação localmente, é preciso primeiro iniciar o container docker com a
instância do PostgreSQL, onde são persistidos os dados.

Para isso é preciso, com o docker em funcionamento, executar no terminal o comando "docker
run --name reservas -p 5432:5432 -e POSTGRES_DB=reservas_db -e POSTGRES_USER=admin -e
POSTGRES_PASSWORD=admin -d postgres:10-alpine".

Após, será necessário executar "docker start reservas" no terminal para iniciar o
container.

Então, após clonar o projeto, é preciso criar um arquivo com o nome ".env" que espera
receber uma variável de nome "DATABASE_URL" com a string de conexão com o banco de dados
executado no container docker.

Esta string de conexão possui o seguinte formato:
"postgresql://{user}:{password}@localhost:5432/reservas?schema=public"

Após, é preciso executar "npm install" para instalar todas as dependências, executar "npx
prisma generate" para inicializar o prisma, e então executar "npm run dev" para executar a
aplicação em modo de desenvolvimento.

Para executar a aplicação em modo de produção, é preciso executar "npm run build" para
executar a transpilação do projeto de Typescript para Javascript, e então executar "npm
start".

## Autor

-   GitHub - Vinícius dos Santos Verissimo (https://github.com/viniciusdsv93)
