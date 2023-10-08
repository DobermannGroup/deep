import fs from 'fs';
import https from 'https';
import WebSocket from 'ws';

const server = https.createServer({
  cert: fs.readFileSync('/etc/letsencrypt/live/deepaudio.uk/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/deepaudio.uk/privkey.pem')
});

const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  ws.on('message', message => {
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

server.listen(8080);
