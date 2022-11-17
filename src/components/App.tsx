import React from 'react'
import { useSocket } from '../hooks/useSocket';
import './App.css'
import Student from './student/Student';
import Teacher from './teacher/Teacher';

const App = () => {

  const pathname = window.location.pathname
const isTeacher = pathname.includes('teacher')

  const socketProps = useSocket();

  return (
    <div className="App">
      {isTeacher ? (<Teacher socketProps={socketProps} />) : (<Student socketProps={socketProps} />)}
    </div>
  )
}

export default App
