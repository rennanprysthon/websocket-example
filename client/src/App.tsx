import SocketProvider from './context/SocketContext'
import Main from './components/Main'

function App() {
  return (
    <SocketProvider>
      <Main />
    </SocketProvider>
  )
}

export default App
