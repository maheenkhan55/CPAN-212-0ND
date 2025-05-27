const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

const server = http.createServer((req, res) => {
    let filePath = '';

    switch (req.url) {
        case '/':
            filePath = './pages/index.html';
            break;
        case '/about':
            filePath = './pages/about.html';
            break;
        case '/contact': 
            filePath = './pages/contact.html';
            break;
        default:
            filePath = './pages/404.html';
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            fs.readFile('./pages/404.html', (error404, content404) => {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(content404, 'utf-8');
            }); 
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

