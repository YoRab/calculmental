import React, { FormEvent, useEffect, useState } from 'react'
import type { SocketPropsType } from '../../hooks/useSocket'
import Parallax from '../game/Parallax'
import './FormPseudo.css'


type FormPseudoType = {
    socketProps: SocketPropsType
    code: string
}
const FormPseudo = ({ socketProps, code }: FormPseudoType) => {
    const [pseudo, setPseudo] = useState<string>("")

    const sendPseudo = (e: FormEvent) => {
        e.preventDefault()
        if (pseudo.length > 2)
            socketProps.sendMessage("createPlayer", code, pseudo)
    }

    return <div className='FormPseudo'>
        <Parallax running={false} />
        <div className='FormPseudoContent'>
            <div className='AppName'>CalculFight</div>
            <div className='Slogan'>Prêt à rejoindre l'aventure ?</div>
            <form onSubmit={sendPseudo}>
                <label htmlFor="pseudo">Entrez votre pseudo</label>
                <input id="pseudo" type="text" value={pseudo} onChange={e => setPseudo(e.target.value)} />
                <input type="submit" value="Commencer !" />
            </form>
        </div>
    </div>
}

export default FormPseudo
