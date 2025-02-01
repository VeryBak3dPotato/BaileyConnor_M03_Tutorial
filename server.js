
// Importing http module
const http = require('http');
const fs = require('fs');

// Creating a server
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // Setting the response header
  res.setHeader('Content-Type', 'text/html');

  // Find path of the requested URL
  let path = './views/';
  switch (req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    // Redirecting to /about
    case '/about-me':
      res.setHeader('Location', '/about');
      res.statusCode = 301;
      res.end();
      break;
    // Handling 404 page
    default:
      path += '404.html';
      res.statusCode = 404;
      break;
  }

  // Sending an HTML response
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      // res.write(data);
      res.end(data);
    }
  });

});

// Listening to the server
server.listen(3000, 'localhost', () => {
  console.log('Server is running on http://localhost:3000');
});