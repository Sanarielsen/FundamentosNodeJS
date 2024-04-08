import http from 'node:http';

const users = [
  { id: 1, name: 'Lucas', email: 'lucas@email.com' },
  { id: 2, name: 'João', email: 'joao@email.com' },
  { id: 3, name: 'Maria', email: 'maria@email.com' }
]

const server = http.createServer((request, response) => {
  const { method, url } = request;

  if (method === 'GET' && url === '/users') {
    return response
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }
  if (method === 'POST' && url === '/users') {
    users.push({
      id: 4,
      name: 'José',
      email: 'zeze@mail.com'
    })
    
    return response.writeHead(201).end()
  }

  return response.writeHead(404).end();
});

server.listen(3333);

