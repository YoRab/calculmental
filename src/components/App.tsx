import React from 'react'
import { useSocket } from '../hooks/useSocket';
import './App.css'
import Game from './game/Game'

const HOST = "http://127.0.0.1:4001";

const App = () => {

  const { isConnected, addListener, removeListener, sendMessage } = useSocket(HOST);

  return (
    <div className="App">
      <Game />
    </div>
  )
}

export default App
