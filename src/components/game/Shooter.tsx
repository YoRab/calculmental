import React, { useRef } from 'react'
import Bomb, { BombType } from './Bomb'
import Bullet from './Bullet'
import './Shooter.css'

import dead from '../../assets/plane/dead.png'
import fly1 from '../../assets/plane/fly1.png'
import fly2 from '../../assets/plane/fly2.png'
import shoot1 from '../../assets/plane/shoot1.png'
import shoot2 from '../../assets/plane/shoot2.png'
import shoot3 from '../../assets/plane/shoot3.png'
import shoot4 from '../../assets/plane/shoot4.png'
import shoot5 from '../../assets/plane/shoot5.png'


type ShooterType = {
    playerState: 'idle' | 'shooting' | 'dead'
    playerLife: number
    bomb: BombType | undefined
    calcul: string | undefined
}
const Shooter = ({ playerState, playerLife, bomb, calcul }: ShooterType) => {
    const playerClassName = `Player ${playerState}`
    const playerAndAmmoClassName = `PlayerAndAmmoContainer life_${playerLife}`
    const lastCalcul = useRef(calcul)
    if (calcul) lastCalcul.current = calcul
    return (
        <div className="Shooter" style={{
            '--dead': `url(${dead})`,
            '--fly1': `url(${fly1})`,
            '--fly2': `url(${fly2})`,
            '--shoot1': `url(${shoot1})`,
            '--shoot2': `url(${shoot2})`,
            '--shoot3': `url(${shoot3})`,
            '--shoot4': `url(${shoot4})`,
            '--shoot5': `url(${shoot5})`,
        } as React.CSSProperties}>
            <div className={`Question`} data-hascalcul={!!lastCalcul.current}>{lastCalcul.current ?? '??'}</div>
            <div className='FlyingStuff'>
                <div className={playerAndAmmoClassName}>
                    <div className='PlayerContainer'>
                        <div className={playerClassName} />
                    </div>
                    {playerState === 'shooting' && (
                        <Bullet />
                    )}
                </div>
                <div className="Bombs">
                    {bomb && (
                        <Bomb bomb={bomb} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Shooter
