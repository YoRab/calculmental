import React, { useEffect, useState } from 'react'
import { BOMB_MOVING_DURATION, BULLET_MOVING_DURATION, EXPLOSION_DURATION } from '../../constants'
import { createCalcul, shuffle } from '../../utils'
import { BombType } from './Bomb'
import './Game.css'
import Infos from './Infos'
import Parallax from './Parallax'
import Qcm, { AnswerType } from './Qcm'
import Shooter from './Shooter'

type PlayerState = 'idle' | 'shooting' | 'dead'

const Game = () => {
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
            }, EXPLOSION_DURATION)
        }, BULLET_MOVING_DURATION)
    }

    const detonateBomb = () => {
        setBombData(prev => prev === undefined ? undefined : { ...prev, bomb: 'attacking' })
        setTimeout(() => {
            setPlayerLife(prev => prev - 1)
            setTimeout(() => {
                setBombData(undefined)
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

    const createBomb = () => {
        const { calcul, result } = createCalcul()
        setBombData({ calcul, bomb: 'resting' })
        setAnswers(shuffle([
            { id: 0, value: `${result}`, correct: true },
            { id: 1, value: `${Math.floor(Math.random() * 200 - 100)}`, correct: false },
            { id: 2, value: `${Math.floor(Math.random() * 200 - 100)}`, correct: false },
            { id: 3, value: `${Math.floor(Math.random() * 200 - 100)}`, correct: false },
        ]))
    }
    useEffect(() => {
        if (playerLife <= 0) {
            setPlayerState('dead')
        }
    }, [playerLife])

    return (
        <div className="Game">
            <button onClick={createBomb} style={{ position: 'absolute', 'top': 0, 'left': '50%', zIndex: '9' }}>Start !</button>
            <Parallax running={playerLife > 0} />
            <Infos score={score} playerLife={playerLife} />
            <Shooter playerState={playerState} playerLife={playerLife} bomb={bombData?.bomb} calcul={bombData?.calcul} />
            <Qcm answers={answers} onAnswered={onAnswered} />
        </div>
    )
}

export default Game
