import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignIn from './components/signIn'
import SignUp from './components/signUp'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route path='/' element={<SignIn />}/>
      <Route path='/signup' element={<SignUp />}/>
     </Routes>
    </>
  )
}

export default App
