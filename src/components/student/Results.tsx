import React, { FormEvent, useEffect, useState } from 'react'
import Parallax from '../game/Parallax'
import './Results.css'
type ResultsType = {
    results: { rank: number, score: number, team0: number, team1: number }
}
const Results = ({ results }: ResultsType) => {

    const winningTeam = results.team0>results.team1 ? {label : 'verte', pts : results.team0, color : '#007c3e'} :  {label : 'rouge', pts : results.team1, color : 'rgb(213 50 71)'} 
    const losingTeam = results.team0>results.team1 ? {label : 'rouge', pts : results.team1, color : 'rgb(213 50 71)'} :  {label : 'verte', pts : results.team0, color : '#007c3e'} 
    return <div className='StudentResults'>
        <Parallax running={false} />
        <div className='StudentResultsContent'>
            <div>Tu as terminé <strong>#{results?.rank}</strong> avec <strong>{results?.score} points</strong> !</div>
            <div>L'équipe <strong style={{color: winningTeam.color}}>{winningTeam.label}</strong> a remportée la partie avec <strong style={{color: winningTeam.color}}>{winningTeam.pts} points</strong> contre <strong style={{color: losingTeam.color}}>{losingTeam.pts} points</strong> pour l'équipe <strong style={{color: losingTeam.color}}>{losingTeam.label}</strong></div>
            <div><strong>Bravo à tous les participants !</strong></div>
        </div>
    </div>
}

export default Results
