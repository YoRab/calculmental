import React, { useEffect, useState } from 'react'
import './Qcm.css'

export type AnswerType = { id: number, value: string, correct: boolean }

type QcmType = {
    answers: AnswerType[]
    onAnswered: (answer: AnswerType) => void
}

const Qcm = ({ answers, onAnswered: onShoot }: QcmType) => {
    const [isShown, setIsShown] = useState(false)

    const onClick = (answer: AnswerType) => {
        setIsShown(false)
        onShoot(answer)
    }

    useEffect(() => {
        setIsShown(answers.length > 0)
    }, [answers])
    return (
        <div className={`Qcm ${isShown ? 'shown' : ''}`}>
            {
                answers.map(answer => (
                    <button key={answer.id} onClick={() => onClick(answer)}>{answer.value}</button>
                ))
            }
        </div>
    )
}

export default Qcm
