import React, { useEffect, useState } from 'react'
import QRCode from "react-qr-code";

import type { SocketPropsType } from '../../hooks/useSocket'
import { GameState, Player } from '../../types/types'
import './WaitingRoom.css'
import fly2 from '../../assets/plane/fly2.png'
import redfly from '../../assets/redplane/fly2.png'
import Chrono from '../game/Chrono';

type WaitingRoomType = {
  socketProps: SocketPropsType
  code: string
  players: Player[]
  gameStatus: GameState,
  chrono: number
  teamScore: [number, number]
}

const TEAMS = [{ id: 0, className: 'Team1', fly: fly2, color: '#014b26' }, { id: 1, className: 'Team2', fly: redfly, color: '#5a1e26' }]

const Heart = (props: any) => {
  return (<svg {...props} viewBox="0 0 32 29.6">
    <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
    c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
  </svg>)
}

const WaitingRoom = ({ socketProps, code, players, gameStatus, chrono, teamScore }: WaitingRoomType) => {

  const startGame = () => {
    socketProps.sendMessage("startGame", code);
  }

  const totalScore = (teamScore[0] + teamScore[1]) || 1
  console.log(code)

  return (
    <div className="WaitingRoom" >
      <div className='RoomChrono'>
        {(gameStatus === 'running' || gameStatus === "results") && <Chrono chrono={chrono} />}
      </div>
      <div className='RoomOther'>
        <div className='Escadrilles'>
          <h2>Escadrilles</h2>
          <div className='Teams'>
            {TEAMS.map(team => {
              return (<div key={team.className} className={team.className} style={{
                '--fly2': `url(${team.fly})`, '--team-color': `${team.color}`, '--team-width': `${teamScore[team.id] / totalScore * 100}%`
              } as React.CSSProperties}>
                <div className='TeamBloc'>
                  <div className='TeamGauge'></div>
                  <div className='PlayerContainer'>
                    <div className={`Player idle`} />
                  </div>
                  <div className='TeamScore'>{teamScore[team.id]} pts</div>
                </div>
                <div className="TeamPlayers">
                  {players.filter(player => player.team.id === team.id).map(player => (
                    <div key={player.id} style={{ width: '80px', minWidth: '80px'}}>
                      <div className='TeamPlayerScore'>{player.score}pts</div>
                      <div className='TeamPlayerHearts'>
                        <Heart className={player.heart > 0 ? 'heart_full' : 'heart_empty'} />
                        <Heart className={player.heart > 1 ? 'heart_full' : 'heart_empty'} />
                        <Heart className={player.heart > 2 ? 'heart_full' : 'heart_empty'} />
                      </div>
                      <div className={`PlayerContainer ${player.heart === 0 ? 'greyed' : ''}`}>
                        <div className={`Player idle`} />
                      </div>
                      <div className='TeamPlayerPseudo'>{player.pseudo}</div>

                    </div>
                  ))}
                </div>
              </div>
              )
            })}
          </div>
        </div>
        {(gameStatus === 'ready' || gameStatus === 'starting') ? (
          <div className='Qrcode'>
            <div className='BoxCode'>
              <h2>Scannez le QrCode pour rejoindre la session</h2>
              <QRCode
                size={256}
                style={{ height: "auto", minWidth: "min(100%,240px)", width: "80%" }}
                value={`http://yohannrabatel.ddns.net:5173?code=${code}`}
                viewBox={`0 0 256 256`}
              />
            </div>
            <div className='BoxStart'>
              <button disabled={gameStatus !== "ready"} onClick={startGame}>{gameStatus === "ready" ? "Démarrer la session" : "Préparation..."}</button>
            </div>
          </div>) : (

          <div className='Ranking'>
            <h2>Classement personnel</h2>
            <div className='RankingPlayers'>
            {players.sort((a,b) => b.score - a.score).map((player, i) => (
              <div className="RankingPlayer" key={player.id} style={{
                '--fly2': `url(${player.team.id===0 ? fly2 : redfly})`
              } as React.CSSProperties}>
                <div className="RankingPlayerRank">{i+1}.</div>
                <div className={`PlayerContainer RankingPlayerContainer`}>
                        <div className={`Player idle`} />
                      </div>
                <div className="RankingPlayerPseudo">{player.pseudo}</div>
                <div className="RankingPlayerScore">{player.score}pts</div>
                </div>
            ))}
            </div>
          </div>

        )}
      </div >
    </div>
  )
}

export default WaitingRoom
