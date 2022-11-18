import React, { useEffect, useState } from 'react'
import type { SocketPropsType } from '../../hooks/useSocket'
type StartType = {
  socketProps: SocketPropsType
}

const Start = ({ socketProps }: StartType) => {

  const createGame = () => {
    socketProps.sendMessage("createGame")
  }

  return (
    <div className="Start">
      <div className='AppName'>CalculFight</div>
      <button onClick={createGame}>Créer une session</button>
    </div>
  )
}

export default Start


