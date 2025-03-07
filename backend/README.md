Backend

Como rodar o projeto:

1 - Acesse a pasta backend: cd backend

2 - Instale as dependências: npm install

3 - Configure o arquivo .env com a URI do seu MongoDB: MONGODB_URI=<sua_uri_do_mongo>
(No arquivo .env.example tem a URL que eu utilizei para fazer o projeto caso prefira utilizar ele mesmo).

4 - Inicie o servidor: npm run dev

A API ficará disponível em http://localhost:3000

Principais rotas:

/api/developers - Cadastro e edição de developers
/api/recruiter - Listagem e feedbacks dos developers
Observação: Certifique-se de que o MongoDB esteja online, usando MongoDB Atlas ou localmente.