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
       <button onClick={createGame}>Start</button>
    </div>
  )
}

export default Start
