import React, { FormEvent, useEffect, useState } from 'react'
import type { SocketPropsType } from '../../hooks/useSocket'
import { Player } from '../../types/types'
import Parallax from '../game/Parallax'
import './LobbyPlayer.css'
import fly2 from '../../assets/plane/fly2.png'
import redfly from '../../assets/redplane/fly2.png'

type LobbyPlayerType = {
    socketProps: SocketPropsType
    player: Player
}
const LobbyPlayer = ({ socketProps, player }: LobbyPlayerType) => {

    return <div className='LobbyPlayer' style={{
        '--fly2': `url(${player.team.id===0 ? fly2 : redfly})`, '--team-color': `${player.team.id===0 ? '#014b26'  :  '#5a1e26'}`
      } as React.CSSProperties}>
        <Parallax running={false} />
        <div className='LobbyPlayerContent'>
            <div>Félicitations {player.pseudo}, tu fais maintenant partie de l'escadrille
                <div className='LobbyTeamEmphase'>{player.team.label}</div>
            </div>
            <div>
                  <div className='PlayerContainer'>
                    <div className={`Player idle`} />
                  </div>
                </div>
        </div>
    </div>
}

export default LobbyPlayer
