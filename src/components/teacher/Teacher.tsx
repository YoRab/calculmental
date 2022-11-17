import React, { useEffect, useState } from 'react'
import type { SocketPropsType } from '../../hooks/useSocket'
import { GameState, Player } from '../../types/types'
import Parallax from '../game/Parallax'
import Start from './Start'
import './Teacher.css'
import WaitingRoom from './WaitingRoom'

type TeacherType = {
  socketProps: SocketPropsType
}

const Teacher = ({ socketProps }: TeacherType) => {
  const [code, setCode] = useState<string | undefined>(undefined)
  const [players, setPlayers] = useState<Player[]>([])
  const [gameStatus, setGameStatus] = useState<GameState>('ready')

  useEffect(() => {
    const { isConnected, addListener, removeListener, sendMessage } = socketProps

    addListener("gameCreated", (code: string) => {
      setCode(code)
    })

    addListener("gameDestroyed", (code: string) => {
      setCode(undefined)
      setPlayers([])
    })

    addListener("refreshPlayers", (players: Player[]) => {
      setPlayers(players)
    })

    addListener("gameStatusUpdated", (gameStatus: GameState) => {
      setGameStatus(gameStatus)
  })

    return () => {
      removeListener("gameCreated")
      removeListener("gameDestroyed")
      removeListener("refreshPlayers")
      removeListener("gameStatusUpdated")

    }
  }, [socketProps])

  return (
    <div className="Teacher">
      <Parallax running={true} />
      {code === undefined ? (
       <Start socketProps={socketProps} />
      ) : (
        <WaitingRoom gameStatus={gameStatus} socketProps={socketProps} code={code} players={players} />
      )}
    </div>
  )
}

export default Teacher
