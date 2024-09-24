import { useState } from 'react'

import './App.css'
import LoginPage from './loginpage'
import ProtectedPage from './homepage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <LoginPage/>
  
    <ProtectedPage/>
    </>
  )
}

export default App
