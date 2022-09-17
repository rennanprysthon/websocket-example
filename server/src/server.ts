import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ["GET", "POST"]
  }
})

interface MessageProps {
  text: string
  key: string
}

const messages: MessageProps[] = []

io.on('connection', (socket) => {
  console.log('A user entered');

  socket.on('send-message', (text) => {
    const message: MessageProps = {
      key: messages.length + 1 + "",
      text
    }

    io.emit('receive-message', message)
    messages.push(message)
  })
})

server.listen(3333, () => {
  console.log('listening on port 3333')
})
