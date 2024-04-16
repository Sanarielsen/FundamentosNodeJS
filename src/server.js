import http from 'node:http';
import { json } from './middlewares/json.js';

const users = [
  { id: 1, name: 'Lucas', email: 'lucas@email.com' },
  { id: 2, name: 'João', email: 'joao@email.com' },
  { id: 3, name: 'Maria', email: 'maria@email.com' }
]

const server = http.createServer( async (request, response) => {
  const { method, url } = request;

  await json(request, response);

  if (method === 'GET' && url === '/users') {
    return response
      .end(JSON.stringify(users))
  }
  if (method === 'POST' && url === '/users') {
    const { name, email } = request.body;

    users.push({
      id: 4,
      name,
      email
    })
    
    return response.writeHead(201).end();
  }

  return response.writeHead(404).end();
});

server.listen(3333);

