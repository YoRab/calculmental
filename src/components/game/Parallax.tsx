import React from 'react'
import './Parallax.css'
import sky from '../../assets/bg/sky.png'
import clouds1 from '../../assets/bg/clouds_1.png'
import clouds2 from '../../assets/bg/clouds_2.png'
import clouds3 from '../../assets/bg/clouds_3.png'
import clouds4 from '../../assets/bg/clouds_4.png'
import rocks1 from '../../assets/bg/rocks_1.png'
import rocks2 from '../../assets/bg/rocks_2.png'

type ParallaxType = { running: boolean }

const Parallax = ({ running }: ParallaxType) => {
    const className = `Parallax ${running ? 'running' : ''}`
    return (
        <div className={className}>
            <div className='Sky' style={{ backgroundImage: `url(${sky})` }} />
            <div className='Clouds1' style={{ backgroundImage: `url(${clouds1})` }} />
            <div className='Clouds2' style={{ backgroundImage: `url(${clouds2})` }} />
            <div className='Rocks1' style={{ backgroundImage: `url(${rocks1})` }} />
            <div className='Clouds3' style={{ backgroundImage: `url(${clouds3})` }} />
            <div className='Rocks2' style={{ backgroundImage: `url(${rocks2})` }} />
            <div className='Clouds4' style={{ backgroundImage: `url(${clouds4})` }} />
        </div>
    )
}

export default Parallax
