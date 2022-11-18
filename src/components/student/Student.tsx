import React, { useEffect, useState } from 'react'
import './Student.css'
import type { SocketPropsType } from '../../hooks/useSocket'
import { GameState, Player } from '../../types/types'
import FormPseudo from './FormPseudo'
import Parallax from '../game/Parallax'
import Game from '../game/Game'
import LobbyPlayer from './LobbyPlayer'
import CountDownPlayer from './CountDownPlayer'
import Results from './Results'


type StudentType = {
    socketProps: SocketPropsType
}
const Student = ({ socketProps }: StudentType) => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get("code")

    const [player, setPlayer] = useState<Player | undefined>(undefined)
    const [gameStatus, setGameStatus] = useState<GameState>('ready')
    const [qcm, setQcm] = useState<{
        question: string;
        answers: {
            id: number;
            value: string;
            correct: boolean;
        }[];
    } | undefined>(undefined)
    const [chrono, setChrono] = useState(45000)
    const [results, setResults] = useState<{rank: number, score: number, team0: number, team1: number}|undefined>(undefined)

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

        addListener("gameStatusUpdated", (gameStatus: GameState, chrono?: number) => {
            setGameStatus(gameStatus)
            if (chrono) setChrono(chrono)
        })


        addListener("resultSent", (rank: number, score: number, team0: number, team1: number) => {
            setResults({rank, score, team0, team1})
        })
        

        addListener("newQcm", (qcm: {
            question: string;
            answers: {
                id: number;
                value: string;
                correct: boolean;
            }[];
        }) => {
            setQcm(qcm)
        })

        return () => {
            removeListener("gameNotFound")
            removeListener("gameDestroyed")
            removeListener("playerCreated")
            removeListener("gameStatusUpdated")
            removeListener("resultSent")
        }
    }, [socketProps])
    // return <LobbyPlayer socketProps={socketProps} player={{team:{ id:'0', label: 'vert'}}} />
// return <CountDownPlayer player={player} socketProps={socketProps} />
    return player ? (gameStatus === "ready" ? <LobbyPlayer socketProps={socketProps} player={player} /> : gameStatus === "starting" ?
        (<CountDownPlayer player={player} socketProps={socketProps} />) :  gameStatus === 'running' ?<Game code={code} qcm={qcm} chrono={chrono} socketProps={socketProps} team={player.team.id}/> : <Results results={results!} />
    ) : code ? <FormPseudo socketProps={socketProps} code={code} /> : (
        <div className='NoCode'>
            <Parallax running={false} />
            <h2>Vous avez besoin d'un code pour pouvoir jouer...</h2></div>
    )

}

export default Student
