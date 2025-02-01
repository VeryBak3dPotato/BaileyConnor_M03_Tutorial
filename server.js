
// Importing http module
const http = require('http'); 

// Creating a server
const server = http.createServer((req, res) => {
  console.log('Server is running...');
});

// Listening to the server
server.listen(3000, 'localhost', () => {
  console.log('Server is running on http://localhost:3000');
});

