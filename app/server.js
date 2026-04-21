const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';
const server = http.createServer((req, res) => {
    if (req.url === '/api/status') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'OK',
            environment: ENV,
            timestamp: new Date().toISOString(),
            version: process.env.APP_VERSION || '1.0.0'
        }));
    } else if (req.url === '/') {
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Erreur serveur');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});
server.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT} en mode ${ENV}`);
});

/*
docker run -d -p 3000:3000 -e APP_VERSION=2.0.0 -e NODE_ENV=production --name mon-app-prod app:prod
*/