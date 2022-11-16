import React from 'react'
import './Infos.css'


const Heart = (props: any) => {
    return (<svg {...props} viewBox="0 0 32 29.6">
        <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
      c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
    </svg>)
}

type InfosType = {
    score: number
    playerLife: number
}

const Infos = ({ score, playerLife }: InfosType) => {

    return (
        <div className="Infos">
            <div className='Hearts'>
                <Heart className={playerLife > 0 ? (playerLife === 1 ? `heart_full heart_only` : `heart_full`) : 'heart_empty'} />
                <Heart className={playerLife > 1 ? 'heart_full' : 'heart_empty'} />
                <Heart className={playerLife > 2 ? 'heart_full' : 'heart_empty'} />
            </div>
            <div className='Score'>{score}pts</div>
            <div className='Chrono'>
                00:00
            </div>
        </div>
    )
}

export default Infos
