import React, { useEffect, useState } from 'react'
import './Infos.css'


type ChronoType = {
    chrono: number
}

const getChronoLib = (chrono: number) => {
    const chronoDiz = Math.floor(chrono / 1000)
    if (chronoDiz < 10) {
        return `0${chronoDiz}:00`
    }
    return `${chronoDiz}:00`

}

const Chrono = ({ chrono }: ChronoType) => {
    const [msg, setMsg] = useState('')

    useEffect(() => {
        let timeouts: number[] = []
        for (let i = chrono; i >= 0; i -= 1000) {
            timeouts.push(setTimeout(() => { setMsg(getChronoLib(i)) }, chrono - i))
        }

        return () => {
            for (const timeout of timeouts) {
                clearTimeout(timeout)
            }
        }
    }, [])

    return (
        <div className="Chrono">
            {msg}
        </div >
    )
}

export default Chrono
