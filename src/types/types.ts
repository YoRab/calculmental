
export type Team = {
    id: number,
    label: string
}

export type Player = {
    id: string
    pseudo: string
    team: Team
    heart: number
    score: number
}

export type Teacher = {
    id: string
}

export type GameState = 'ready' | 'starting' | 'running' | 'results'

export type Game = {
    code: string
    teacher: Teacher
    players: Player[]
    state: GameState
}
