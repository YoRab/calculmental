import type { Socket } from "socket.io-client";


export type ServerToTeacher = {
    gameCreated: (code: string) => void
    gameDestroyed: () => void
    refreshPlayers: (players: Player[]) => void
    gameStatusUpdated: (state: GameState, chrono?: number) => void
    teamScoreUpdated: (team0: number, team1: number) => void
}

export type ServerToStudent = {
    gameNotFound: () => void;
    gameDestroyed: () => void
    playerCreated: (player: Player) => void
    gameStatusUpdated: (state: GameState, chrono?: number) => void
    newQcm: (qcm: {
        question: string;
        answers: {
            id: number;
            value: string;
            correct: boolean;
        }[];
    }) => void
    resultSent: (rank: number, score: number, team0: number, team1: number) => void
}


type TeacherToServer = {
    createGame: () => void
    destroyGame: (code: string) => void
    startGame: (code: string) => void
}

export type StudentToServer = {
    createPlayer: (code: string, pseudo: string) => void
    askForQcm: (index: number) => void
    updatePlayerStatus: (code: string, heart: number, score: number) => void
}

export type ServerToClientEvents = ServerToTeacher & ServerToStudent
export type ClientToServerEvents = TeacherToServer & StudentToServer

export type CustomSocket = Socket<ServerToClientEvents, ClientToServerEvents>

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
