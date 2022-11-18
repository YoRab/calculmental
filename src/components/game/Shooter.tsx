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


import reddead from '../../assets/redplane/dead.png'
import redfly1 from '../../assets/redplane/fly1.png'
import redfly2 from '../../assets/redplane/fly2.png'
import redshoot1 from '../../assets/redplane/shoot1.png'
import redshoot2 from '../../assets/redplane/shoot2.png'
import redshoot3 from '../../assets/redplane/shoot3.png'
import redshoot4 from '../../assets/redplane/shoot4.png'
import redshoot5 from '../../assets/redplane/shoot5.png'

type ShooterType = {
    playerState: 'idle' | 'shooting' | 'dead'
    playerLife: number
    bomb: BombType | undefined
    calcul: string | undefined
    team: number
}
const Shooter = ({ playerState, playerLife, bomb, calcul, team }: ShooterType) => {
    const playerClassName = `Player ${playerState}`
    const playerAndAmmoClassName = `PlayerAndAmmoContainer life_${playerLife}`
    const lastCalcul = useRef(calcul)
    if (calcul) lastCalcul.current = calcul
    return (
        <div className="Shooter" style={{
            '--dead': `url(${team === 0 ? dead : reddead})`,
            '--fly1': `url(${team === 0 ? fly1 : redfly1})`,
            '--fly2': `url(${team === 0 ? fly2 : redfly2})`,
            '--shoot1': `url(${team === 0 ? shoot1 : redshoot1})`,
            '--shoot2': `url(${team === 0 ? shoot2 : redshoot2})`,
            '--shoot3': `url(${team === 0 ? shoot3 : redshoot3})`,
            '--shoot4': `url(${team === 0 ? shoot4 : redshoot4})`,
            '--shoot5': `url(${team === 0 ? shoot5 : redshoot5})`,
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
