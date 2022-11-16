import React from 'react'
import './Bullet.css'

import bullet1 from '../../assets/bullet/bullet1.png'
import bullet2 from '../../assets/bullet/bullet2.png'
import bullet3 from '../../assets/bullet/bullet3.png'
import bullet4 from '../../assets/bullet/bullet4.png'
import bullet5 from '../../assets/bullet/bullet5.png'
import { BULLET_MOVING_DURATION } from '../../constants'


const Bullet = () => {
    return (
        <div className='Bullet' style={{
            '--bullet-move-duration': `${BULLET_MOVING_DURATION}ms`,
            '--bullet1': `url(${bullet1})`,
            '--bullet2': `url(${bullet2})`,
            '--bullet3': `url(${bullet3})`,
            '--bullet4': `url(${bullet4})`,
            '--bullet5': `url(${bullet5})`,
        } as React.CSSProperties}></div>
    )
}

export default Bullet
