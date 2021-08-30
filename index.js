const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const options = {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  },
  allowEIO3: true
}

const io = require("socket.io")(server, options);

io.on('connection', (socket) => {
  console.log('Connected IO');

  socket.on('createMessage', data => {
    setTimeout(() => {
      socket.emit('newMessage', {
        text: data.text + ' to SERVER'
      })
    }, 1000);
  })

  socket.emit('newMessage', {
    text: 'Ура! Есть контакт'
  })
});



server.listen(3005, () => {
  console.log('listening on *:3005');
});