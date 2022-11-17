import React, { useEffect, useState } from 'react'
import { BOMB_MOVING_DURATION, BULLET_MOVING_DURATION, EXPLOSION_DURATION } from '../../constants'
import { SocketPropsType } from '../../hooks/useSocket'
import { BombType } from './Bomb'
import './Game.css'
import Infos from './Infos'
import Parallax from './Parallax'
import Qcm, { AnswerType } from './Qcm'
import Shooter from './Shooter'

type PlayerState = 'idle' | 'shooting' | 'dead'

type GameType = {
    qcm: {
        question: string;
        answers: {
            id: number;
            value: string;
            correct: boolean;
        }[];
    } | undefined
    chrono: number
    socketProps: SocketPropsType
    code: string | null
}

const Game = ({ code, qcm, chrono, socketProps }: GameType) => {
    const [playerState, setPlayerState] = useState<PlayerState>('idle')
    const [playerLife, setPlayerLife] = useState(3)
    const [score, setScore] = useState(0)
    const [bombData, setBombData] = useState<{ bomb: BombType; calcul: string } | undefined>(undefined)
    const [answers, setAnswers] = useState<AnswerType[]>([])

    const shoot = () => {
        setPlayerState('shooting')
        setBombData(prev => prev === undefined ? undefined : { ...prev, bomb: 'targeted' })
        setTimeout(() => {
            setScore(prev => prev + 1)
            setPlayerState('idle')
            setTimeout(() => {
                setBombData(undefined)
                socketProps.sendMessage("askForQcm", 0)
            }, EXPLOSION_DURATION)
        }, BULLET_MOVING_DURATION)
    }

    const detonateBomb = () => {
        setBombData(prev => prev === undefined ? undefined : { ...prev, bomb: 'attacking' })
        setTimeout(() => {
            setPlayerLife(prev => prev - 1)
            setTimeout(() => {
                setBombData(undefined)
                if (playerLife > 0)
                    socketProps.sendMessage("askForQcm", 0)
            }, EXPLOSION_DURATION)
        }, BOMB_MOVING_DURATION)
    }

    const onAnswered = (answer: AnswerType) => {
        if (answer.correct) {
            shoot();
        } else {
            detonateBomb();
        }
    }

    useEffect(() => {
        if (qcm === undefined) {
            socketProps.sendMessage("askForQcm", 0)
            return
        }
        setBombData({ calcul: qcm.question, bomb: 'resting' })
        setAnswers(qcm.answers)
    }, [qcm])

    useEffect(() => {
        if (playerLife <= 0) {
            setPlayerState('dead')
        }
    }, [playerLife])

    useEffect(() => {
        socketProps.sendMessage("updatePlayerStatus", code, playerLife, score)
    }, [score, playerLife, code])

    return (
        <div className="Game">
            <Parallax running={playerLife > 0} />
            <Infos score={score} playerLife={playerLife} chrono={chrono} />
            <Shooter playerState={playerState} playerLife={playerLife} bomb={bombData?.bomb} calcul={bombData?.calcul} />
            <Qcm answers={answers} onAnswered={onAnswered} />
            {playerLife === 0 && (
                <div className='ModalLost'>
                    <div>Tu y étais presque !</div>
                    <div>Score personnel : {score}pts</div>
                    <div>Les résultats finaux arrivent à la fin du décompte</div>
                    <div>
                        <h3>Astuce !</h3>
                        <p>bla bla bla</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Game
