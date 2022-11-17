import React, { FormEvent, useEffect, useState } from 'react'
import type { SocketPropsType } from '../../hooks/useSocket'
import { Player } from '../../types/types'
import Parallax from '../game/Parallax'
import './CountdownPlayer.css'
import fly2 from '../../assets/plane/fly2.png'
import redfly from '../../assets/redplane/fly2.png'

type CountDownPlayerType = {
    socketProps: SocketPropsType
    player: Player
}
const CountDownPlayer = ({ socketProps, player }: CountDownPlayerType) => {
    const [timerState, setTimerState] = useState(0)
    useEffect(() => {
        const timeoutId1 = setTimeout(() => {
            setTimerState(1)
        }, 5000)

        const timeoutId2 = setTimeout(() => {
            setTimerState(2)
        }, 6000)

        const timeoutId3 = setTimeout(() => {
            setTimerState(3)
        }, 7000)

        const timeoutId4= setTimeout(() => {
            setTimerState(4)
        }, 8000)

        const timeoutId5 = setTimeout(() => {
            setTimerState(5)
        }, 9000)

        return () => {
            clearTimeout(timeoutId1)
            clearTimeout(timeoutId2)
            clearTimeout(timeoutId3)
            clearTimeout(timeoutId4)
            clearTimeout(timeoutId5)
        }
    }, [])
    
    return <div className='LobbyPlayer' style={{
        '--fly2': `url(${player.team.id===0 ? fly2 : redfly})`,
      } as React.CSSProperties}>
        <Parallax running={false} />
        <div className='LobbyPlayerContent'>
            <div>Mission :  NOM LECON
            </div>
            <div>
                  <div className='PlayerContainer'>
                    <div className={`Player idle`} />
                  </div>
                  <div>{player.pseudo}</div>

                </div>

                <div className={`timer timer${timerState}`}>
                    <div className='timer1'>Attention au décollage</div>
                    <div className='timer2'>5</div>
                    <div className='timer3'>4</div>
                    <div className='timer4'>3</div>
                    <div className='timer5'>2</div>
                    <div className='timer+'>1</div>
                </div>
        </div>
    </div>
}

export default CountDownPlayer
