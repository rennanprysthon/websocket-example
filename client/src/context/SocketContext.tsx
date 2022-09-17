import {
  useContext,
  createContext,
  ReactNode
} from 'react'

import io from 'socket.io-client'

interface SocketContextProps {
  socket: any
}

export const SocketContext = createContext<SocketContextProps>({} as SocketContextProps)

interface SocketProviderProps {
  children: ReactNode
}

const socket = io('http://localhost:3333')

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext);

export default SocketProvider
