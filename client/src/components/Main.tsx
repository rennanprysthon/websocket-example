import { useEffect, useRef, useState, useCallback } from 'react'
import { useSocket } from '../context/SocketContext'

interface MessageProps {
  text: string
  key: string
}

const Main = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [messages, setMessages] = useState<MessageProps[]>([])
  const { socket } = useSocket()

  useEffect(() => {
    socket.on('connected', () => {
      console.log('conected')
    })

    socket.emit('enter-user', 'entrou')

    socket.on('receive-message', (message: MessageProps) => {
      setMessages(prev => [...prev, message])
    })
  }, [socket])

  const sendMessage = useCallback(() => {
    const { current: inputElement } = inputRef

    if (inputElement) {
      const { value } = inputElement
      if (value.trim() === '') return;

      socket.emit('send-message', value)
      inputElement.value = ''
      inputElement.focus()
    }
  }, [socket])

  return (
    <div className="bg-blue-500 min-h-screen flex flex-col items-center justify-center">
      <input type="text" ref={inputRef} />
      <button onClick={sendMessage}>Send message</button>
      <ul className="text-white font-bold">
        {messages && messages.map(message => (
          <li key={message.key}>
            {message.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Main 
