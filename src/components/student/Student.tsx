import React, { useEffect, useState } from 'react'
import './Student.css'
import type { SocketPropsType } from '../../hooks/useSocket'
import { GameState, Player } from '../../types/types'
import FormPseudo from './FormPseudo'
import Parallax from '../game/Parallax'
import Game from '../game/Game'
import LobbyPlayer from './LobbyPlayer'
import CountDownPlayer from './CountDownPlayer'


type StudentType = {
    socketProps: SocketPropsType
}
const Student = ({ socketProps }: StudentType) => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get("code")

    const [player, setPlayer] = useState<Player | undefined>(undefined)
    const [gameStatus, setGameStatus] = useState<GameState>('ready')

    useEffect(() => {
        const { isConnected, addListener, removeListener, sendMessage } = socketProps

        addListener("gameNotFound", () => {
            alert('Impossible de se connecter... Réessaie de scanner le QrCode ;)')
        })

        addListener("gameDestroyed", () => {
            setPlayer(undefined)
        })

        addListener("playerCreated", (player: Player) => {
            setPlayer(player)
            setGameStatus('ready')
        })

        addListener("gameStatusUpdated", (gameStatus: GameState) => {
            setGameStatus(gameStatus)
        })

        return () => {
            removeListener("gameNotFound")
            removeListener("gameDestroyed")
            removeListener("playerCreated")
            removeListener("gameStatusUpdated")
        }
    }, [socketProps])
    // <Game />
    return player ? (gameStatus === "ready" ? <LobbyPlayer socketProps={socketProps} player={player} /> : gameStatus === "starting" ?
        (<CountDownPlayer player={player} socketProps={socketProps} />) : <Game />
    ) : code ? <FormPseudo socketProps={socketProps} code={code} /> : (
        <div className='NoCode'>
            <Parallax running={false} />
            <h2>Vous avez besoin d'un code pour pouvoir jouer...</h2></div>
    )

}

export default Student
