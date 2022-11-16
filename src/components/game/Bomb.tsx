import React, { useEffect, useState } from 'react'
import './Bomb.css'

import boom1 from '../../assets/missile/boom1.png'
import boom2 from '../../assets/missile/boom2.png'
import boom3 from '../../assets/missile/boom3.png'
import boom4 from '../../assets/missile/boom4.png'
import boom5 from '../../assets/missile/boom5.png'
import boom6 from '../../assets/missile/boom6.png'
import boom7 from '../../assets/missile/boom7.png'
import boom8 from '../../assets/missile/boom8.png'
import boom9 from '../../assets/missile/boom9.png'
import fly1 from '../../assets/missile/fly1.png'
import fly2 from '../../assets/missile/fly2.png'
import fly3 from '../../assets/missile/fly3.png'
import fly4 from '../../assets/missile/fly4.png'
import fly5 from '../../assets/missile/fly5.png'
import fly6 from '../../assets/missile/fly6.png'
import fly7 from '../../assets/missile/fly7.png'
import fly8 from '../../assets/missile/fly8.png'
import fly9 from '../../assets/missile/fly9.png'
import fly10 from '../../assets/missile/fly10.png'
import { BOMB_MOVING_DURATION, BULLET_MOVING_DURATION, EXPLOSION_DURATION } from '../../constants'

export type BombType = 'resting' | 'targeted' | 'attacking'

type BombComponentType = {
    bomb: BombType
}

const Bomb = ({ bomb }: BombComponentType) => {
    const [isShown, setIsShown] = useState(false)
    const [bombAnimState, setBombAnimState] = useState<'resting' | 'booming'>('resting')

    useEffect(() => {
        setIsShown(true)
    }, [])

    useEffect(() => {
        if (bomb !== 'resting') {
            const timeoutId = setTimeout(() => {
                setBombAnimState('booming')
            }, bomb === 'targeted' ? BULLET_MOVING_DURATION : BOMB_MOVING_DURATION)
            return () => {
                clearTimeout(timeoutId)
            }
        }
    }, [bomb])

    return (
        <div className={`BombContainer  ${bomb === 'attacking' ? 'attacking' : ''} ${isShown ? 'shown' : ''}`} style={
            {
                '--boom1': `url(${boom1})`,
                '--boom2': `url(${boom2})`,
                '--boom3': `url(${boom3})`,
                '--boom4': `url(${boom4})`,
                '--boom5': `url(${boom5})`,
                '--boom6': `url(${boom6})`,
                '--boom7': `url(${boom7})`,
                '--boom8': `url(${boom8})`,
                '--boom9': `url(${boom9})`,
                '--fly1': `url(${fly1})`,
                '--fly2': `url(${fly2})`,
                '--fly3': `url(${fly3})`,
                '--fly4': `url(${fly4})`,
                '--fly5': `url(${fly5})`,
                '--fly6': `url(${fly6})`,
                '--fly7': `url(${fly7})`,
                '--fly8': `url(${fly8})`,
                '--fly9': `url(${fly9})`,
                '--fly10': `url(${fly10})`,
                animationDuration: `${BOMB_MOVING_DURATION}ms`,
                "--boom-duration": `${EXPLOSION_DURATION}ms`
            } as React.CSSProperties}>
            <div className={`Bomb ${bombAnimState}`}></div>
        </div>
    )
}

export default Bomb
