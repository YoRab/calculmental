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
  const [teamScore, setTeamScore] = useState<[number, number]>([0, 0])
  const [chrono, setChrono] = useState(30000)

  useEffect(() => {
    const { isConnected, addListener, removeListener, sendMessage } = socketProps

    addListener("gameCreated", (code: string) => {
      setCode(code)
      setPlayers([])
      setTeamScore([0, 0])
    })

    addListener("gameDestroyed", (code: string) => {
      setCode(undefined)
      setPlayers([])
      setTeamScore([0, 0])
    })

    addListener("refreshPlayers", (players: Player[]) => {
      setPlayers(players)
    })

    addListener("gameStatusUpdated", (gameStatus: GameState, chrono?: number) => {
      setGameStatus(gameStatus)
      if (chrono) setChrono(chrono)
    })

    addListener("teamScoreUpdated", (team0: number, team1: number) => {
      setTeamScore([team0, team1])

    })

    return () => {
      removeListener("gameCreated")
      removeListener("gameDestroyed")
      removeListener("refreshPlayers")
      removeListener("gameStatusUpdated")
      removeListener("teamScoreUpdated")
    }
  }, [socketProps])

  return (
    <div className="Teacher">
      <Parallax running={gameStatus === 'running'} />
      {code === undefined ? (
        <Start socketProps={socketProps} />
      ) : (
        <WaitingRoom gameStatus={gameStatus} socketProps={socketProps} code={code} players={players} chrono={chrono} teamScore={teamScore} />
      )}
    </div>
  )
}

export default Teacher
