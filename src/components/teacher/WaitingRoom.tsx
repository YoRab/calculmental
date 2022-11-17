import React, { useEffect, useState } from 'react'
import QRCode from "react-qr-code";

import type { SocketPropsType } from '../../hooks/useSocket'
import { GameState, Player } from '../../types/types'
import './WaitingRoom.css'
import fly2 from '../../assets/plane/fly2.png'
import redfly from '../../assets/redplane/fly2.png'

type WaitingRoomType = {
  socketProps: SocketPropsType
  code: string
  players: Player[]
  gameStatus: GameState
}

const WaitingRoom = ({ socketProps, code, players, gameStatus }: WaitingRoomType) => {

  const startGame = () => {
    socketProps.sendMessage("startGame", code);
  }

  return (
    <div className="WaitingRoom" >
      <div className='Escadrilles'>
        <h2>Escadrilles</h2>
        <div className='Teams'>
          <div className='Team1' style={{
            '--fly2': `url(${fly2})`,
          } as React.CSSProperties}>
            <div className='PlayerContainer'>
              <div className={`Player idle`} />
            </div>
            <div className="TeamPlayers">
              {players.filter(player => player.team.id === 0).map(player => (
                <div>
                  <div className='PlayerContainer'>
                    <div className={`Player idle`} />
                  </div>
                  <div>{player.pseudo}</div>

                </div>
              ))}
            </div>
          </div>
          <div className='Team2' style={{
            '--fly2': `url(${redfly})`,
          } as React.CSSProperties}>
            <div className='PlayerContainer'>
              <div className={`Player idle`} />
            </div>
            <div className="TeamPlayers">
              {players.filter(player => player.team.id === 1).map(player => (
                <div>
                  <div className='PlayerContainer'>
                    <div className={`Player idle`} />
                  </div>
                  <div>{player.pseudo}</div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='Qrcode'>
        <div className='BoxCode'>
          <div>{code}</div>
          <QRCode
            size={256}
            style={{ height: "auto", minWidth: "min(100%,240px)", width: "80%" }}
            value={`http://192.168.1.80:5173?code=${code}`}
            viewBox={`0 0 256 256`}
          />
        </div>
        <div className='BoxStart'>
          <button disabled={gameStatus!=="ready"} onClick={startGame}>{gameStatus==="ready"? "start" : "Préparation..."}</button>
        </div>
      </div>
    </div>
  )
}

export default WaitingRoom
